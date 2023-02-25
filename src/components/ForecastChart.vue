<template>
  <div>
    <canvas ref="chartRef" id="chart"></canvas>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import Chart from 'chart.js/auto'

export default {
  name: 'ForecastChart',
  props: {
    forecast: { type: [Array, null], required: true, default: null }
  },
  setup(props) {
    const chartRef = ref(null)
    const chart = ref(null)

    const createChart = () => {
      if (chart.value) {
        chart.value.destroy()
      }
      if (chartRef.value && props.forecast) {
        const labels = [...props.forecast.map(data => {
          if (data.dt) {
            const hours = new Date(data.dt * 1000).getHours()
            return hours + ':00'
          } else {
            return `${data.date.slice(6, 8)}.${data.date.slice(4, 6)}`
          }

        })]
        chart.value = new Chart(chartRef.value, {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: 'Temperature (°C)',
              data: props.forecast.map(data => data.main.temp),
              borderColor: '#77a0f8',
              backgroundColor: '#77a0f8',
              fill: false
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: false,
            },
            scales: {
              x: {
                grid: {
                  display: false
                }
              },
              y: {
                beginAtZero: false,
                grid: {
                  display: false
                }
              }
            }
          }
        })
      }
    }

    watchEffect(() => {
      createChart()
    })

    return {
      chartRef
    }
  }
}
</script>

<style scoped>
#chart {
  height: 160px !important;
}
</style>
