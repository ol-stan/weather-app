<template>
  <div class="weather-wrapper">
    <div v-if="isLoading" style="display: flex; align-items: center; justify-content: center; min-height: 420px;">
      <AppLoader />
    </div>
    <template v-else>
      <SelectCity v-if="change" @citySelect="changeCity" />
      <span v-if="message" class="message">{{ message }}</span>
      <div v-if="weather" class="weather-current">
        <div class="weather-header">
          <h2 class="weather-title">
            {{ city.name || weather.name }}
            <span v-if="city.state">({{ city.state }})&nbsp;</span>
            <span v-if="city.country">{{ city.country }}</span>
          </h2>
          <div class="weather-state">
            <button class="weather-state-button" :class="{ 'active': !weekState }" :disabled="!weekState"
              @click="weekState = false, getForecastData()">{{ $t('buttons.week-state.day') }}</button>
            <button class="weather-state-button" :class="{ 'active': weekState }" :disabled="weekState"
              @click="weekState = true, getForecastData()">{{ $t('buttons.week-state.week') }}</button>
          </div>
        </div>

        <div class="weather-details">
          <div class="weather-details-main">
            <div class="weather-details-temperature" :title="weather.main.temp">
              {{ Math.round(weather.main.temp) }}
              <span class="weather-details-metric">°C</span>
            </div>
            <div class="weather-details-icon">
              <img :src="getWeatherIconUrl(weather.weather[0].icon)" :title="weather.weather[0].description"
                :alt="weather.weather[0].description">
            </div>
          </div>
          <div class="weather-details-other">
            <div class="weather-details-item">
              {{ $t('weather-card.details-item.temp-feels') }} {{ Math.round(weather.main.feels_like) }}°C
            </div>
            <div class="weather-details-item">
              {{ $t('weather-card.details-item.wind-speed') }} {{ Math.round(weather.wind.speed) }} {{ $t('metrics.m-s')
              }}
            </div>
            <div class="weather-details-item">
              {{ $t('weather-card.details-item.pressure') }} {{ weather.main.pressure }} {{ $t('metrics.hpa') }}
            </div>
            <div class="weather-details-item">
              {{ $t('weather-card.details-item.humidity') }} {{ weather.main.humidity }}%</div>
          </div>
        </div>
      </div>
      <ForecastWeather :forecast="forecastData" />
      <div class="weather-chart">
        <ForecastChart :forecast="forecastData" :weekState="weekState" />
      </div>
    </template>
  </div>
</template>

<script>
import SelectCity from '@/components/SelectCity.vue'
import ForecastChart from '@/components/ForecastChart.vue'
import ForecastWeather from '@/components/ForecastWeather.vue'
import AppLoader from '@/components/AppLoader.vue'

import { reactive, ref, onMounted, watchEffect } from 'vue'
import { apiKey } from '../../utils/apiKey'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

export default {
  name: 'WeatherCard',
  components: { AppLoader, ForecastChart, ForecastWeather, SelectCity },
  emits: ['changedCity'],
  props: {
    cityProp: { type: [Object, null], required: true, default: null },
    change: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    const city = reactive({ ...props.cityProp })
    const weather = ref(null)
    const forecast = ref(null)
    const forecastData = ref(null)
    const message = ref('')
    const weekState = ref(false)
    const isLoading = ref(false)
    const { locale } = useI18n()
    const isDay = ref(true)

    const setIsDay = () => {
      const sunriseTimestamp = weather.value?.sys.sunrise * 1000
      const sunsetTimestamp = weather.value?.sys.sunset * 1000
      const now = Date.now()
      if (sunriseTimestamp && sunsetTimestamp) {
        isDay.value = now > sunriseTimestamp && now < sunsetTimestamp
      }
    }

    const getForecastData = () => {
      const sortedForecast = [...forecast.value?.list.sort((a, b) => a.dt - b.dt)]
      if (!weekState.value) {
        forecastData.value = [...sortedForecast].slice(0, 8)
      } else {
        const days = sortedForecast.map(item => new Date(item.dt * 1000).getDate())
        const setHoursForIcon = [11, 12, 13, 14, 15, 16]
        const uniqueDays = days.reduce((acc, val) => {
          acc[val] = (acc[val] || 0) + 1
          return acc
        }, {})

        const uniqueSetDates = Object.keys(uniqueDays)
          .filter((key) => uniqueDays[key] >= 4)
          .map((key) => Number(key))

        const forecast5days = uniqueSetDates.map(day => {
          const today = { date: null, day: null, temp: [], wind: [], humidity: [], icon: null, description: null }
          sortedForecast.forEach(item => {
            const itemDay = new Date(item.dt * 1000).getDate()
            const itemHour = new Date(item.dt * 1000).getHours()
            if (uniqueSetDates.includes(itemDay) && day === itemDay) {
              if (today.date === null) {
                const year = String(new Date(item.dt * 1000).getFullYear())
                const month = String(new Date(item.dt * 1000).getMonth() + 1).padStart(2, '0')
                today.date = year + month + String(day).padStart(2, '0')
              }
              if (today.icon === null && setHoursForIcon.includes(itemHour)) {
                today.icon = item.weather[0].icon
                today.description = item.weather[0].description
              }
              today.day = day
              today.temp.push(item.main.temp)
              today.wind.push(item.wind.speed)
              today.humidity.push(item.main.humidity)
            }
          })
          return today
        })

        const adaptForecastData = forecast5days.map(item => {
          return {
            dt: null,
            date: item.date,
            main: {
              temp: Math.round(item.temp.reduce((acc, curr) => acc + curr, 0) / item.temp.length),
              humidity: Math.round(item.humidity.reduce((acc, curr) => acc + curr, 0) / item.humidity.length)
            },
            wind: { speed: item.wind.reduce((acc, curr) => acc + curr, 0) / item.wind.length },
            weather: [{
              description: item.description,
              icon: item.icon
            }]

          }
        })

        forecastData.value = [...adaptForecastData.sort((a, b) => a.date - b.date)]
      }
    }

    const fetchWetherForecast = async () => {
      isLoading.value = true
      const url = 'https://api.openweathermap.org/data/2.5'
      const urlWeather = url + '/weather'
      const urlForecast = url + '/forecast'

      message.value = ''

      await axios.get(urlWeather, {
        params: {
          lat: city.lat,
          lon: city.lon,
          appid: apiKey,
          units: 'metric',
          lang: locale.value === 'ua' ? 'uk' : locale.value
        }
      }).then(response => {
        weather.value = response.data
        setIsDay()
      })
        .catch(error => {
          message.value = `Sorry, weather for location ${city.name} not found, try another location`
          console.log(error)
        })

      await axios.get(urlForecast, {
        params: {
          lat: city.lat,
          lon: city.lon,
          appid: apiKey,
          units: 'metric',
          lang: locale.value == 'ua' ? 'uk' : locale.value
        }
      }).then(response => {
        forecast.value = response.data
        getForecastData()
      })
        .catch(error => {
          message.value = `Sorry, forecast for location ${city.name} not found, try another location`
          console.log(error)
        })
      isLoading.value = false
    }

    const getWeatherIconUrl = (iconCode) => {
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    }

    onMounted(() => {
      fetchWetherForecast()
      setIsDay()
    })

    const changeCity = (data) => {
      city.name = locale.value == 'ua' && data.local_names?.uk ? data.local_names.uk : data.name
      city.state = data.state || null
      city.country = data.country
      city.lon = data.lon
      city.lat = data.lat
      city.isFavorite = data.isFavorite || false
      city.local_names = data.local_names
      fetchWetherForecast()
      setIsDay()
      emit('changedCity', city)
    }

    watchEffect(() => {
      if (isDay.value) {
        document.body.classList.remove('night-mode')
      } else {
        document.body.classList.add('night-mode');
      }
    });

    return {
      city,
      weather,
      forecast,
      forecastData,
      message,
      weekState,
      isLoading,
      changeCity,
      getForecastData,
      getWeatherIconUrl
    }
  }

}
</script>

<style scoped lang="scss">
.weather-wrapper {
  min-height: 420px;
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.weather-state {
  display: flex;
  padding: 10px;
  gap: 10px;

  &-button {
    padding: 4px 8px;
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-color);
    white-space: nowrap;
    background: transparent;
    border: 2px solid var(--primary-color);
    border-radius: 4px;
    cursor: pointer;

    &.active {
      color: var(--text-color);
      font-weight: 700;
      border: none;
      cursor: default;

      .night-mode & {
        color: var(--text-color-nm);
      }
    }
  }
}

.weather-title {
  margin: 16px 0;
  padding: 0;
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

.weather-details {
  display: flex;
  gap: 32px;

  &-main {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 8px;
  }

  &-temperature {
    min-width: 96px;
    text-align: center;
    font-size: 48px;
    font-weight: bold;
  }

  &-metric {
    display: inline-block;
    margin: 8px 0;
    font-weight: normal;
    font-size: 16px;
    vertical-align: top;
  }

  &-icon {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-other {
    display: grid;
    align-content: center;
    grid-column-gap: 24px;
    grid-row-gap: 6px;
    grid-template-columns: repeat(4, auto);

    @media screen and (max-width: 767px) {
      grid-template-columns: repeat(2, auto);
    }

    @media screen and (max-width: 580px) {
      grid-template-columns: auto;
    }
  }

  &-item {
    font-size: 14px;
  }
}
</style>
