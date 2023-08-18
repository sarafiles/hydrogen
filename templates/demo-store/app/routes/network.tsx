import {type ServerEvent} from '@shopify/hydrogen';
import {useEffect, useRef, useState} from 'react';
import type {Waterfall, WaterfallItems} from 'flame-chart-js';

import {Button} from '~/components';
import {FlameChartWrapper} from '~/components/FlameChartWrapper';

type ServerEvents = {
  smallestStartTime: number;
  mainRequests: ServerEvent[];
  subRequests: Record<string, ServerEvent[]>;
};

export default function Network() {
  // Store server event data that can arrive at anytime across renders
  const serverEvents = useRef<ServerEvents>({
    smallestStartTime: 0,
    mainRequests: [],
    subRequests: {},
  });

  // For triggering a react render
  const [timestamp, setTimestamp] = useState<number>();

  useEffect(() => {
    const evtSource = new EventSource('/server-network-debug', {
      withCredentials: true,
    });

    function requestHandler(event: MessageEvent) {
      const data = JSON.parse(event.data) as unknown as ServerEvent;

      if (
        data.url.includes('server-network-debug') ||
        data.url.includes('network')
      )
        return;

      if (serverEvents.current.smallestStartTime === 0) {
        serverEvents.current.smallestStartTime = data.startTime;
      } else {
        serverEvents.current.smallestStartTime = Math.min(
          data.startTime,
          serverEvents.current.smallestStartTime,
        );
      }

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

      if (
        data.url.includes('server-network-debug') ||
        data.url.includes('network')
      )
        return;

      if (serverEvents.current.smallestStartTime === 0) {
        serverEvents.current.smallestStartTime = data.startTime;
      } else {
        serverEvents.current.smallestStartTime = Math.min(
          data.startTime,
          serverEvents.current.smallestStartTime,
        );
      }

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
        className="mb-4"
        onClick={() => {
          serverEvents.current = {
            smallestStartTime: 0,
            mainRequests: [],
            subRequests: {},
          };
          setTimestamp(new Date().getTime());
        }}
      >
        Clear
      </Button>
      <FlameChart key={timestamp} serverEvents={serverEvents.current} />
    </>
  );
}

function FlameChart({serverEvents}: {serverEvents: ServerEvents}) {
  if (serverEvents.mainRequests.length === 0) return null;

  const calcDuration = (time: number) => time - serverEvents.smallestStartTime;
  let items: WaterfallItems = [];

  serverEvents.mainRequests.forEach((mainRequest: ServerEvent) => {
    const mainResponseStart = calcDuration(mainRequest.endTime);
    let mainResponseEnd = mainResponseStart;

    const subRequestItems: WaterfallItems = [];
    const subRequests = serverEvents.subRequests[mainRequest.id] || [];
    subRequests.forEach((subRequest: ServerEvent) => {
      const subRequestEnd = calcDuration(subRequest.endTime);
      mainResponseEnd = Math.max(mainResponseEnd, subRequestEnd);

      subRequestItems.push({
        name: subRequest.url,
        intervals: 'request',
        timing: {
          requestStart: calcDuration(subRequest.startTime),
          requestEnd: subRequestEnd,
        },
      });
    });

    items.push({
      name: mainRequest.url,
      intervals: 'mainRequest',
      timing: {
        requestStart: calcDuration(mainRequest.startTime),
        responseStart: mainResponseStart,
        responseEnd: mainResponseEnd,
      },
    });
    items = items.concat(subRequestItems);
  });

  const data: Waterfall = {
    items,
    intervals: {
      mainRequest: [
        {
          name: 'server',
          color: '#99CC00',
          type: 'block',
          start: 'requestStart',
          end: 'responseStart',
        },
        {
          name: 'streaming',
          color: '#33CCFF',
          type: 'block',
          start: 'responseStart',
          end: 'responseEnd',
        },
      ],
      request: [
        {
          name: 'request',
          color: '#FFCC00',
          type: 'block',
          start: 'requestStart',
          end: 'requestEnd',
        },
      ],
    },
  };
  return (
    <FlameChartWrapper
      height={300}
      waterfall={data}
      settings={{
        styles: {
          waterfallPlugin: {
            defaultHeight: 300,
          },
        },
      }}
    />
  );
}
