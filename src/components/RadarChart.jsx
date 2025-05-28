import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";

const RadarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "radar",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: {
                display: true,
                color: "rgba(200, 200, 200, 0.2)",
              },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                backdropColor: "transparent",
                color: (context) => {
                  if (context.tick && context.tick.value >= 80) {
                    return "#10B981"; // Green for high values
                  } else if (context.tick && context.tick.value >= 60) {
                    return "#F59E0B"; // Yellow for medium values
                  }
                  return "#EF4444"; // Red for low values
                },
                stepSize: 20,
                showLabelBackdrop: false,
              },
              pointLabels: {
                color: "#6B7280",
                font: {
                  size: 12,
                },
              },
              grid: {
                color: "rgba(200, 200, 200, 0.2)",
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                color: "#6B7280",
                font: {
                  size: 12,
                },
                padding: 20,
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.dataset.label}: ${context.raw}%`;
                },
              },
            },
            datalabels: {
              display: false, // Disable by default, can be enabled if needed
            },
          },
          elements: {
            line: {
              tension: 0.1,
              borderWidth: 2,
            },
            point: {
              radius: 4,
              hoverRadius: 6,
            },
          },
        },
        plugins: [
          {
            id: "customCenterText",
            afterDraw: (chart) => {
              if (chart.data.labels.length > 5) {
                // Only show center text for "all" view
                const ctx = chart.ctx;
                const width = chart.width;
                const height = chart.height;

                ctx.restore();
                const fontSize = (height / 100).toFixed(2);
                ctx.font = `${fontSize}em sans-serif`;
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";

                const text = "Skill Levels";
                const textX = Math.round(width / 2);
                const textY = Math.round(height / 2);

                ctx.fillStyle = "#6B7280";
                ctx.fillText(text, textX, textY);
                ctx.save();
              }
            },
          },
        ],
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="relative h-full w-full">
      <canvas ref={chartRef} />
    </div>
  );
};

export default React.memo(RadarChart);
