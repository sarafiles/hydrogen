import {type ServerEvent} from '@shopify/hydrogen';
import {useEffect, useRef, useState} from 'react';

import {Button} from '~/components';

type ServerEvents = {
  mainRequests: ServerEvent[];
  subRequests: Record<string, ServerEvent[]>;
};

export default function Network() {
  // Store server event data that can arrive at anytime across renders
  const serverEvents = useRef<ServerEvents>({
    mainRequests: [],
    subRequests: {},
  });

  // For triggering a react render
  const [_t, setTimestamp] = useState<number>();

  useEffect(() => {
    const evtSource = new EventSource('/server-network-debug', {
      withCredentials: true,
    });

    function requestHandler(event: MessageEvent) {
      const data = JSON.parse(event.data) as unknown as ServerEvent;

      serverEvents.current.mainRequests = [
        ...serverEvents.current.mainRequests,
        {
          ...data,
          url: data.url.replace(location.origin, ''),
        },
      ];
      setTimeout(() => {
        setTimestamp(new Date().getTime());
      }, 0);
    }
    evtSource.addEventListener('Request', requestHandler);

    function subRequestHandler(event: MessageEvent) {
      const data = JSON.parse(event.data) as unknown as ServerEvent;

      let groupEvents = serverEvents.current.subRequests[data.id] || [];
      groupEvents = [...groupEvents, data];
      serverEvents.current.subRequests = {
        ...serverEvents.current.subRequests,
        [data.id]: groupEvents,
      };
      setTimeout(() => {
        setTimestamp(new Date().getTime());
      }, 0);
    }
    evtSource.addEventListener('Sub request', subRequestHandler);

    return () => {
      evtSource.removeEventListener('Request', requestHandler);
      evtSource.removeEventListener('Sub request', subRequestHandler);
      evtSource.close();
    };
  }, []);

  return (
    <>
      <Button
        as="button"
        onClick={() => {
          serverEvents.current = {
            mainRequests: [],
            subRequests: {},
          };
          setTimestamp(new Date().getTime());
        }}
      >
        Clear
      </Button>
      <ChartServerEvents serverEvents={serverEvents.current} />
    </>
  );
}

function ChartServerEvents({serverEvents}: {serverEvents: ServerEvents}) {
  return (
    <>
      {serverEvents &&
        serverEvents.mainRequests.map((mainRequest: ServerEvent) => {
          const subRequests = serverEvents.subRequests[mainRequest.id] || [];

          let maxSubRequestDuration = 0;
          let totalDuration = 0;
          subRequests.forEach((subRequest: ServerEvent) => {
            const duration = subRequest.endTime - subRequest.startTime;
            if (duration > maxSubRequestDuration) {
              maxSubRequestDuration = duration;
              totalDuration =
                maxSubRequestDuration +
                (subRequest.startTime - mainRequest.startTime);
            }
          });
          const ttfb = mainRequest.endTime - mainRequest.startTime;
          const timeWidth = (ttfb / totalDuration) * 100;

          return (
            <details key={mainRequest.id}>
              <summary>
                <div
                  className="flex"
                  style={{
                    backgroundColor: '#0599de',
                  }}
                >
                  <div
                    style={{
                      overflow: 'hidden',
                      backgroundColor: '#00a846',
                      width: `${timeWidth}%`,
                    }}
                  >
                    {mainRequest.url}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: `${100 - timeWidth}%`,
                    }}
                  >
                    <div>TTFB: {ttfb}ms</div>
                    <div>{totalDuration}ms</div>
                  </div>
                </div>
              </summary>
              {subRequests.map((subRequest: ServerEvent, idx: number) => {
                const waitTime = subRequest.startTime - mainRequest.startTime;
                const subRequestDuration =
                  subRequest.endTime - subRequest.startTime;
                return (
                  <div
                    key={idx}
                    className={`flex${idx % 2 === 0 ? ' opacity-80' : ''}`}
                  >
                    <div
                      style={{
                        width: `${(waitTime / totalDuration) * 100}%`,
                      }}
                    >
                      &nbsp;
                    </div>
                    <div
                      style={{
                        width: `${(subRequestDuration / totalDuration) * 100}%`,
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {subRequest.url} {subRequestDuration}ms
                      </div>
                      <div
                        style={{
                          backgroundColor: '#00a846',
                          width: '100%',
                        }}
                      >
                        &nbsp;
                      </div>
                    </div>
                  </div>
                );
              })}
            </details>
          );
        })}
    </>
  );
}
