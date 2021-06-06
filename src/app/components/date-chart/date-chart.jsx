import { useEffect } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import { colorizeDatasets } from './colors';

export function DateChart ({ datasets, id }) {
  const chartId = id || 'date-chart';

  useEffect(() => {
    const chart = new Chart(chartId, {
      type: 'line',
      data: {
        datasets: colorizeDatasets(datasets)
      },
      options: {
        aspectRatio: 1.5,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'yyyy-MM-dd'
            },
            adapters: {
              date: {
                zone: 'utc'
              }
            }
          }
        }
      }
    });
    return () => chart.destroy();
  });

  return (
    <ChartWrapper>
      <canvas id={chartId}/>
    </ChartWrapper>
  );
}

// the chart wrapper must obey the chart.js lib constraints for responsiveness
// https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note
const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
`;
