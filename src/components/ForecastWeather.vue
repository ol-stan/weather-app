<template>
  <div class="weather-forecast" v-if="forecast">
    <div class="weather-forecast-item" v-for="item in forecast" :key="item.dt || item.date">
      <div class="weather-forecast-time">{{ item.dt ? formatTime(item.dt) : formatDate(item.date) }}</div>
      <div class="weather-forecast-temperature" :title="item.main.temp">
        {{ Math.round(item.main.temp) }}
        <span class="weather-forecast--metric">°C</span>
      </div>
      <div class="weather-forecast-icon">
        <img :src="`https://openweathermap.org/img/w/${item.weather[0].icon}.png`" :alt="item.weather[0].description"
          :title="item.weather[0].description">
      </div>
      <div class="weather-forecast-element weather-forecast-element--with-icon"
        :title="$t('weather-card.details-item.wind-speed')">
        {{ Math.round(item.wind.speed) }} {{ $t('metrics.m-s') }}
      </div>
      <div class="weather-forecast-element">{{ $t('weather-card.details-item.humidity') }} {{ item.main.humidity }}%</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForecastWeather',
  props: {
    forecast: { type: [Array, null], required: true, default: null }
  },
  setup() {
    const formatTime = (unixTime) => {
      return new Date(unixTime * 1000).getHours() + ':00'
    }

    const formatDate = (date) => {
      const formatedDate = new Date(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`)

      return formatedDate.toLocaleDateString("en-US", { day: "numeric", month: "long" })
    }

    return { formatTime, formatDate }
  }

}
</script>

<style scoped lang="scss">
.weather-forecast {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  overflow-x: auto;
  margin: 16px 8px;
  gap: 16px;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 18%;
    min-width: 112px;
    width: 100%;
    padding: 6px;
    background: var(--light-color);
    border-radius: 4px;

    .night-mode & {
      background: var(--light-color-nm);
    }
  }

  &-time {
    margin: 0 0 4px 0;
    color: var(--dark-grey-color);
  }

  &-temperature {
    margin: 4px 0 0 0;
    font-size: 18px;
    font-weight: 500;
  }

  &-element {
    margin: 0 0 4px 0;
    text-align: center;

    &--with-icon {
      position: relative;
      padding: 0 0 0 32px;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 24px;
        height: 24px;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiMyMDIwMjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyMi44OCA3NC43OCIgdmlld0JveD0iMCAwIDEyMi44OCA3NC43OCI+PHBhdGggZD0iTTI4LjY5IDUzLjM4Yy0xLjYxIDAtMi45MS0xLjMtMi45MS0yLjkxczEuMy0yLjkxIDIuOTEtMi45MWg1MS4zN2MuMjEgMCAuNDIuMDIuNjIuMDcgMS44NC4yOCAzLjU2LjggNS4xIDEuNjMgMS43LjkyIDMuMTUgMi4xOSA0LjI3IDMuODkgMy44NSA1LjgzIDMuMjggMTEuMjQuNTYgMTUuMjQtMS43NyAyLjYxLTQuNDcgNC41NS03LjQ1IDUuNTctMyAxLjAzLTYuMzIgMS4xMy05LjMyLjAzLTQuNTQtMS42Ni04LjIyLTUuODktOC43Ni0xMy41NWEyLjkgMi45IDAgMCAxIDIuNy0zLjA5IDIuOSAyLjkgMCAwIDEgMy4wOSAyLjdjLjM1IDQuOTQgMi40MSA3LjU2IDQuOTQgOC40OCAxLjcxLjYyIDMuNjcuNTQgNS40OC0uMDggMS44NC0uNjMgMy40OC0xLjc5IDQuNTItMy4zMiAxLjQ5LTIuMTkgMS43MS01LjI4LS42MS04Ljc5YTUuOTg2IDUuOTg2IDAgMCAwLTIuMTgtMS45OGMtLjkxLS40OS0xLjk3LS44MS0zLjEzLS45OWgtNTEuMnYuMDF6TTE1LjQxIDI3LjIxYy0xLjYxIDAtMi45MS0xLjMtMi45MS0yLjkxczEuMy0yLjkxIDIuOTEtMi45MWg1MS4yMWMxLjE3LS4xOCAyLjIzLS41IDMuMTQtLjk5Ljg3LS40NyAxLjYxLTEuMTIgMi4xOC0xLjk4IDIuMzItMy41MSAyLjA5LTYuNi42MS04Ljc5LTEuMDQtMS41My0yLjY4LTIuNjktNC41Mi0zLjMyLTEuODEtLjYyLTMuNzgtLjctNS40OC0uMDgtMi41Mi45Mi00LjU5IDMuNTQtNC45NCA4LjQ4YTIuOSAyLjkgMCAwIDEtMy4wOSAyLjcgMi45IDIuOSAwIDAgMS0yLjctMy4wOWMuNTQtNy42NiA0LjIyLTExLjg5IDguNzYtMTMuNTUgMy0xLjA5IDYuMzItLjk5IDkuMzIuMDMgMi45OCAxLjAyIDUuNjggMi45NyA3LjQ1IDUuNTcgMi43MiA0IDMuMjkgOS40MS0uNTYgMTUuMjQtMS4xMiAxLjctMi41NyAyLjk3LTQuMjcgMy44OS0xLjU0LjgzLTMuMjYgMS4zNS01LjEgMS42My0uMi4wNC0uNDEuMDctLjYyLjA3SDE1LjQxdi4wMXpNMi45MSA0MC4zQzEuMyA0MC4zIDAgMzguOTkgMCAzNy4zOWMwLTEuNjEgMS4zLTIuOTEgMi45MS0yLjkxaDEwNy4wN2MxLjE3LS4xOCAyLjIzLS41IDMuMTMtLjk5Ljg3LS40NyAxLjYxLTEuMTIgMi4xOC0xLjk4IDIuMzItMy41MSAyLjA5LTYuNi42MS04Ljc5LTEuMDQtMS41My0yLjY4LTIuNjktNC41Mi0zLjMyLTEuODEtLjYyLTMuNzgtLjctNS40OC0uMDgtMi41Mi45Mi00LjU5IDMuNTQtNC45NCA4LjQ4YTIuOSAyLjkgMCAwIDEtMy4wOSAyLjcgMi45IDIuOSAwIDAgMS0yLjctMy4wOWMuNTQtNy42NiA0LjIyLTExLjg5IDguNzYtMTMuNTUgMy0xLjA5IDYuMzItLjk5IDkuMzIuMDMgMi45OCAxLjAyIDUuNjggMi45NyA3LjQ1IDUuNTcgMi43MiA0IDMuMjkgOS40MS0uNTYgMTUuMjQtMS4xMiAxLjctMi41NyAyLjk3LTQuMjcgMy44OS0xLjU0LjgzLTMuMjYgMS4zNS01LjEgMS42My0uMi4wNC0uNDEuMDctLjYyLjA3SDIuOTF2LjAxeiIvPjwvc3ZnPg==");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }

      .night-mode & {
        &::before {
          content: '';
          background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNlY2VjZWMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyMi44OCA3NC43OCIgdmlld0JveD0iMCAwIDEyMi44OCA3NC43OCI+PHBhdGggZD0iTTI4LjY5IDUzLjM4Yy0xLjYxIDAtMi45MS0xLjMtMi45MS0yLjkxczEuMy0yLjkxIDIuOTEtMi45MWg1MS4zN2MuMjEgMCAuNDIuMDIuNjIuMDcgMS44NC4yOCAzLjU2LjggNS4xIDEuNjMgMS43LjkyIDMuMTUgMi4xOSA0LjI3IDMuODkgMy44NSA1LjgzIDMuMjggMTEuMjQuNTYgMTUuMjQtMS43NyAyLjYxLTQuNDcgNC41NS03LjQ1IDUuNTctMyAxLjAzLTYuMzIgMS4xMy05LjMyLjAzLTQuNTQtMS42Ni04LjIyLTUuODktOC43Ni0xMy41NWEyLjkgMi45IDAgMCAxIDIuNy0zLjA5IDIuOSAyLjkgMCAwIDEgMy4wOSAyLjdjLjM1IDQuOTQgMi40MSA3LjU2IDQuOTQgOC40OCAxLjcxLjYyIDMuNjcuNTQgNS40OC0uMDggMS44NC0uNjMgMy40OC0xLjc5IDQuNTItMy4zMiAxLjQ5LTIuMTkgMS43MS01LjI4LS42MS04Ljc5YTUuOTg2IDUuOTg2IDAgMCAwLTIuMTgtMS45OGMtLjkxLS40OS0xLjk3LS44MS0zLjEzLS45OWgtNTEuMnYuMDF6TTE1LjQxIDI3LjIxYy0xLjYxIDAtMi45MS0xLjMtMi45MS0yLjkxczEuMy0yLjkxIDIuOTEtMi45MWg1MS4yMWMxLjE3LS4xOCAyLjIzLS41IDMuMTQtLjk5Ljg3LS40NyAxLjYxLTEuMTIgMi4xOC0xLjk4IDIuMzItMy41MSAyLjA5LTYuNi42MS04Ljc5LTEuMDQtMS41My0yLjY4LTIuNjktNC41Mi0zLjMyLTEuODEtLjYyLTMuNzgtLjctNS40OC0uMDgtMi41Mi45Mi00LjU5IDMuNTQtNC45NCA4LjQ4YTIuOSAyLjkgMCAwIDEtMy4wOSAyLjcgMi45IDIuOSAwIDAgMS0yLjctMy4wOWMuNTQtNy42NiA0LjIyLTExLjg5IDguNzYtMTMuNTUgMy0xLjA5IDYuMzItLjk5IDkuMzIuMDMgMi45OCAxLjAyIDUuNjggMi45NyA3LjQ1IDUuNTcgMi43MiA0IDMuMjkgOS40MS0uNTYgMTUuMjQtMS4xMiAxLjctMi41NyAyLjk3LTQuMjcgMy44OS0xLjU0LjgzLTMuMjYgMS4zNS01LjEgMS42My0uMi4wNC0uNDEuMDctLjYyLjA3SDE1LjQxdi4wMXpNMi45MSA0MC4zQzEuMyA0MC4zIDAgMzguOTkgMCAzNy4zOWMwLTEuNjEgMS4zLTIuOTEgMi45MS0yLjkxaDEwNy4wN2MxLjE3LS4xOCAyLjIzLS41IDMuMTMtLjk5Ljg3LS40NyAxLjYxLTEuMTIgMi4xOC0xLjk4IDIuMzItMy41MSAyLjA5LTYuNi42MS04Ljc5LTEuMDQtMS41My0yLjY4LTIuNjktNC41Mi0zLjMyLTEuODEtLjYyLTMuNzgtLjctNS40OC0uMDgtMi41Mi45Mi00LjU5IDMuNTQtNC45NCA4LjQ4YTIuOSAyLjkgMCAwIDEtMy4wOSAyLjcgMi45IDIuOSAwIDAgMS0yLjctMy4wOWMuNTQtNy42NiA0LjIyLTExLjg5IDguNzYtMTMuNTUgMy0xLjA5IDYuMzItLjk5IDkuMzIuMDMgMi45OCAxLjAyIDUuNjggMi45NyA3LjQ1IDUuNTcgMi43MiA0IDMuMjkgOS40MS0uNTYgMTUuMjQtMS4xMiAxLjctMi41NyAyLjk3LTQuMjcgMy44OS0xLjU0LjgzLTMuMjYgMS4zNS01LjEgMS42My0uMi4wNC0uNDEuMDctLjYyLjA3SDIuOTF2LjAxeiIvPjwvc3ZnPg==");
        }
      }


    }
  }
}
</style>
