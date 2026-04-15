import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface HeatmapProps {
  data: { date: string; count: number }[];
  title: string;
  colorScale?: string[];
}

export const Heatmap: React.FC<HeatmapProps> = ({ data, title }) => {
  const today = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(today.getFullYear() - 1);

  return (
    <div className="heatmap-container">
      {title && <h3 className="text-sm font-mono mb-4 opacity-70">{title}</h3>}
      <CalendarHeatmap
        startDate={lastYear}
        endDate={today}
        values={data}
        showWeekdayLabels={true}
        classForValue={(value) => {
          if (!value || value.count === 0) return 'color-empty';
          if (value.count > 10) return 'color-scale-4';
          if (value.count > 5) return 'color-scale-3';
          if (value.count > 2) return 'color-scale-2';
          return 'color-scale-1';
        }}
        tooltipDataAttrs={(value: any) => {
          return {
            'data-tooltip-id': 'heatmap-tooltip',
            'data-tooltip-content': value.date ? `${value.date}: ${value.count} contributions` : 'No contributions',
          };
        }}
      />
      <Tooltip id="heatmap-tooltip" />
      <style>{`
        .react-calendar-heatmap .color-empty { fill: rgba(255, 255, 255, 0.03); }
        .react-calendar-heatmap .color-scale-1 { fill: #0e4429; }
        .react-calendar-heatmap .color-scale-2 { fill: #006d32; }
        .react-calendar-heatmap .color-scale-3 { fill: #26a641; }
        .react-calendar-heatmap .color-scale-4 { fill: #39d353; }
        
        .react-calendar-heatmap rect {
          rx: 1.5;
          ry: 1.5;
        }

        .react-calendar-heatmap text {
          font-size: 6px;
          fill: rgba(255, 255, 255, 0.3);
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </div>
  );
};
