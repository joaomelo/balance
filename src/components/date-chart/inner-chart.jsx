import { useEffect } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import { colorizeDatasets } from './colors';

export function InnerChart ({ datasets, id, ...rest }) {
  const chartId = id || 'date-chart';

  useEffect(() => {
    const chart = new Chart(chartId, {
      type: 'line',
      data: {
        datasets: colorizeDatasets(datasets)
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'yyyy-MM-dd'
            }
          }
        }
      }
    });
    return () => chart.destroy();
  });

  return (
    <ChartWrapper {...rest}>
      <canvas id={chartId}/>
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  // try to make the chart as big as possible inside its parent
  width: 100%;
  height: 100%;
  flex-grow: 1;

  // the chart wrapper must obey the chart.js lib constraints for responsiveness
  // https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note
  position: relative;
`;
