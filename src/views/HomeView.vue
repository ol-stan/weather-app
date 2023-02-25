<template>
  <div class="home">
    <div class="weather-card-add" v-if="cities.list?.length < 5">
      <button class="button-add" :title="$t('buttons.add-card-title')" @click="addWeatherCard">
        <span class="button-add-plus">+</span>
        <span class="button-add-text">{{ $t('buttons.add-card') }}</span>
      </button>
    </div>
    <template v-if="cities.list?.length">
      <div class="weather" v-for="city in cities.list" :key="city.cardId">
        <div class="weather-card-header">
          <div class="weather-card-time">
            {{ `${$t('weather-card.header-text')} ${city.name} ${formatTime(new Date())}` }}
          </div>
          <div class="weather-card-actions">
            <button class="remove-button" v-if="city.cardId !== 1"
              @click="setRemoveModalData(city.name), showModal = true">
              {{ $t('buttons.remove-card') }}
            </button>
            <button class="favorite-button" @click="toggleFavorite(city.lat, city.lon)"
              :title="city.isFavorite ? $t('buttons.remove-from-favorite') : $t('buttons.add-to-favorite')">
              <FullStarSvg v-if="city.isFavorite" :size="32" />
              <EmptyStarSvg v-else :size="32" />
            </button>
          </div>
        </div>

        <div v-if="showModal" class="overlay">
          <div class="modal">
            <button class="modal-close-button" @click="showModal = false">
              <CloseSvg :size="20" />
            </button>
            <h2 v-if="modalData.title" class="modal-title">{{ modalData.title }}</h2>
            <div v-if="modalData.text" class="modal-description">{{ modalData.text }}</div>
            <div class="modal-actions">
              <button v-if="modalData.buttons.ok" class="button" @click="showModal = false">
                {{ modalData.buttons.ok }}
              </button>
              <button v-if="modalData.buttons.remove" class="button button--remove"
                @click="removeWeatherCard(city.cardId)">
                {{ modalData.buttons.remove }}
              </button>
            </div>
          </div>
        </div>

        <WeatherCard :cityProp="city" :change="true" @changedCity="updateCity(city.cardId, $event)" />

      </div>
    </template>
  </div>
</template>

<script>
import WeatherCard from '@/components/WeatherCard.vue'
import EmptyStarSvg from '@/components/svg/EmptyStarSvg.vue'
import FullStarSvg from '@/components/svg/FullStarSvg.vue'
import CloseSvg from '@/components/svg/CloseSvg.vue'

import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'WeaterCard',
  components: { CloseSvg, EmptyStarSvg, FullStarSvg, WeatherCard },
  setup() {
    const favoritesCityList = ref([])
    const defaultCity = ref({})
    const cities = reactive({ list: [] })
    const modalData = reactive({ title: null, text: null, buttons: { ok: null, remove: null } })
    const showModal = ref(false)
    const { t } = useI18n()

    const formatTime = (now) => {
      const date = [
        String(now.getDate()).padStart(2, '0'),
        String(now.getMonth() + 1).padStart(2, '0'),
        now.getFullYear()
      ]
      const time = [String(now.getHours()).padStart(2, '0'), String(now.getMinutes()).padStart(2, '0')]

      return date.join('.') + ' ' + time.join(':')
    }

    const getFavoritesCity = () => {
      return JSON.parse(localStorage.getItem('favoritesCityLLK')) || []
    }

    const checkFavoritesCity = () => {
      if (favoritesCityList.value?.length) {
        favoritesCityList.value.forEach((llk) => {
          const [lat, lon] = llk.split('&')
          cities.list.map(item => {
            if (String(item.lat) === String(lat) && String(item.lon) === String(lon)) {
              item.isFavorite = true
            }
          })
        })
      }
    }

    const setDefaultCity = async () => {
      defaultCity.value = { cardId: 1, name: 'Kyiv', state: null, country: null, lat: 50.4333, lon: 30.5167, isFavorite: false }
      await fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
          defaultCity.value.name = data.city
          defaultCity.value.country = data.country
          defaultCity.value.lat = data.latitude
          defaultCity.value.lon = data.longitude
        }).then(() => {
          cities.list.push(defaultCity.value)
          checkFavoritesCity()
        })
        .catch(error => {
          console.error('Error ipapi:', error)
        })
    }

    onMounted(() => {
      favoritesCityList.value = getFavoritesCity()
      setDefaultCity()
    })

    const addWeatherCard = () => {
      cities.list.push({ ...defaultCity.value, cardId: Date.now() })
    }

    const setRemoveModalData = (text) => {
      modalData.title = t('modals.remove-card.title')
      modalData.text = t('modals.remove-card.text') + `${text}?`
      modalData.buttons.ok = t('modals.remove-card.button-cancel')
      modalData.buttons.remove = t('modals.remove-card.button-remove')
    }

    const removeWeatherCard = (id) => {
      showModal.value = false
      cities.list = cities.list.filter(item => item.cardId !== id)
    }

    const updateCity = (id, data) => {
      cities.list.map(item => {
        if (item.cardId === id) {
          item.name = data.name
          item.state = data.state
          item.country = data.country
          item.lat = data.lat
          item.lon = data.lon
          item.isFavorite = data.isFavorite || false
          checkFavoritesCity()
        }
      })
    }

    const favoritesLimit = () => {
      modalData.title = t('modals.favorites-limit.title')
      modalData.text = t('modals.favorites-limit.text')
      modalData.buttons.ok = t('modals.favorites-limit.button-cancel')
      modalData.buttons.remove = null
      showModal.value = true
    }

    const toggleFavorite = (lat, lon) => {
      if (!lat || !lon) return

      cities.list.map(item => {
        if ((item.lat === lat && item.lon === lon)) {
          if (!item.isFavorite && favoritesCityList.value.length >= 5) {
            return favoritesLimit()
          }
          item.isFavorite = !item.isFavorite
          const latLonKey = `${lat}&${lon}`
          if (favoritesCityList.value.includes(latLonKey)) {
            favoritesCityList.value = favoritesCityList.value.filter(llk => llk !== latLonKey)
          } else {
            favoritesCityList.value.push(latLonKey)
          }
          localStorage.setItem('favoritesCityLLK', JSON.stringify(favoritesCityList.value))
        }
      })
    }

    return {
      cities,
      modalData,
      showModal,
      formatTime,
      addWeatherCard,
      setRemoveModalData,
      removeWeatherCard,
      updateCity,
      toggleFavorite
    }
  }
}

</script>

<style lang="scss">
.home {
  min-height: 100vh;
}

.weather {
  position: relative;
  margin: 0 0 16px 0;
  padding: 8px;
  border: 2px solid var(--light-color);
  border-radius: 4px;
}

.weather-card {

  &-add {
    position: fixed;
    bottom: 42px;
    right: 5%;
    padding: 2px;
    background: var(--white-color);
    border-radius: 50%;
    z-index: 3;

    @media screen and (max-width: 520px) {
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10px;
      background: var(--primary-color);
      border-radius: 0;
    }
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    @media screen and (max-width: 520px) {
      flex-direction: column-reverse;
      align-items: stretch;
      gap: 0;
    }
  }

  &-time {
    margin: 0 8px 0 0;
    padding: 4px;
    font-size: 15px;
    line-height: 1.25;
    font-weight: 500;
  }

  &-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
  }

}

// Buttons styles

.button {
  margin: 0;
  padding: 8px 16px;
  font-size: 16px;
  line-height: 1;
  font-weight: bold;
  color: var(--primary-color);
  background: var(--white-color);
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--white-color);
    background-color: var(--primary-color);
  }

  &--remove {
    &:hover {
      border-color: var(--error-color);
      background-color: var(--error-color);
    }
  }
}

.button-add {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 16px;
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
  color: var(--primary-color);
  background: transparent;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--white-color);
    background-color: var(--primary-color);
  }

  .night-mode & {
    background: var(--dark-color);

    &:hover {
      color: var(--white-color);
      background-color: var(--primary-color-nm);
    }
  }

  @media screen and (max-width: 520px) {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 8px 16px;
    font-size: 16px;
    background: var(--white-color);
    border-radius: 4px;

    &:hover {
      color: var(--white-color);
      background-color: var(--success-color);
    }
  }

  &-plus {
    display: inline-block;
    opacity: 1;

    @media screen and (max-width: 520px) {
      display: none;
      opacity: 0;
    }
  }

  &-text {
    display: none;
    opacity: 0;

    @media screen and (max-width: 520px) {
      display: inline-block;
      opacity: 1;
    }
  }
}

.remove-button {
  margin: 0;
  padding: 2px 4px;
  font-size: 14px;
  line-height: 1;
  color: var(--dark-grey-color);
  border: none;
  background: transparent;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--error-color);
    text-decoration: none;
  }
}

.favorite-button {
  margin: 0 0 0 auto;
  padding: 4px;
  background: var(--white-color);
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--light-color);
  }

  .night-mode & {
    background: var(--dark-color);

    &:hover {
      background-color: var(--light-color-nm);
    }
  }
}

// Modal styles

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(119, 160, 248, 0.4);
  z-index: 5;

  .night-mode & {
    background-color: rgba(119, 160, 248, 0.2);
  }
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 420px;
  width: calc(100% - 20px);
  padding: 20px;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background-color: var(--white-color);
  box-shadow: 0 2px 4px var(--light-color);

  .night-mode & {
    background-color: var(--dark-color);
    box-shadow: 0 2px 4px var(--light-color-nm);
  }

  &-title {
    margin: 8px 0 24px 0;
    padding: 0 32px 0 0;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.25;
  }

  &-description {
    margin: 0 0 24px 0;
    padding: 0;
    font-size: 16px;
    line-height: 1.25;
  }

  &-actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 20px;
  }

  &-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 8px;
    border: none;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--light-color);
    }

    .night-mode & {
      background-color: var(--light-color);
    }

    svg {
      transition: all 0.3s ease;
    }
  }
}
</style>
