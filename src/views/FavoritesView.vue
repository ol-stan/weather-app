<template>
  <div class="favorites">
    <h1>{{ $t('pages.favorites.title') }}</h1>
    <div v-if="isLoading" style="display: flex; align-items: center; justify-content: center; min-height: 420px;">
      <AppLoader />
    </div>
    <template v-else>
      <div class="favorites-content" v-if="cities?.length">
        <div class="weather" v-for="(city, index) in cities" :key="index">
          <WeatherCard :cityProp="city[0]" :change="false" />
        </div>
      </div>
      <div v-else class="favorites-noitems">
        <p class="favorites-noitems-text">{{ $t('pages.favorites.no-items') }}</p>
      </div>
    </template>
  </div>
</template>

<script>
import AppLoader from '@/components/AppLoader.vue'
import WeatherCard from '@/components/WeatherCard.vue'

import { onMounted, ref } from 'vue'
import { apiKey } from '../../utils/apiKey'
import axios from 'axios'

export default {
  name: 'FavoritesView',
  components: { AppLoader, WeatherCard },
  setup() {
    const favorites = ref([])
    const cities = ref([])
    const isLoading = ref(false)

    const getCity = async (lat, lon) => {
      isLoading.value = true
      await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => {
          cities.value.push(response.data)
        })
      isLoading.value = false
    }

    const getCities = () => {
      if (favorites.value?.length) {
        favorites.value.forEach((llk) => {
          const [lat, lon] = llk.split('&')
          getCity(lat, lon)
        })
      }
    }

    onMounted(() => {
      favorites.value = JSON.parse(localStorage.getItem('favoritesCityLLK')) || []
      getCities()
    })

    return { isLoading, cities }
  }
}
</script>

<style scoped lang="scss">
.favorites-noitems {
  margin: 16px 0;
  padding: 10px;
  border-radius: 4px;
  background: var(--light-color);

  &-text {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.25;
  }
}
</style>
