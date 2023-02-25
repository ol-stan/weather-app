<template>
  <div class="select-city">
    <fieldset class="select-city-block">
      <legend class="select-city-label">{{ $t('select-city.label') }}</legend>
      <input v-model="city" class="select-city-input" type="text" :placeholder="$t('select-city.placeholder')"
        autocomplete="off" @focus="getCities" @input="getCities" @keyup.backspace="checkCityValue">
      <span class="select-city-autocomplete">
        <span v-if="cities" class="select-city-autocomplete-wrapper">
          <span class="select-city-autocomplete-item" v-for="item in cities"
            :key="item.name + '-' + item.lat + '-' + item.lon" @click="citySelected(item)">
            {{ item.name }}
            <span v-if="item.state">({{ item.state }})</span> {{ item.country }}
          </span>
        </span>
      </span>
    </fieldset>
  </div>
</template>

<script>
import { ref } from 'vue'
import { apiKey } from '../../utils/apiKey'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

export default {
  name: 'SelectCity',
  emits: ['citySelect'],
  setup(_props, { emit }) {
    const city = ref('')
    const cities = ref(null)
    const { locale } = useI18n()

    const getCities = async () => {
      if (!city.value) return cities.value = null

      const url = 'https://api.openweathermap.org/geo/1.0/direct'

      await axios.get(url, {
        params: {
          q: city.value,
          limit: 5,
          appid: apiKey,
          lang: locale.value === 'ua' ? 'uk' : locale.value
        }
      }).then(response => {
        cities.value = response.data
      })
    }

    const checkCityValue = () => {
      if (city.value) return

      cities.value = null
    }

    const citySelected = (data) => {
      city.value = data.name
      cities.value = null
      emit('citySelect', data)
    }

    return {
      city,
      cities,
      checkCityValue,
      getCities,
      citySelected,
    }
  }
}
</script>

<style scoped lang="scss">
.select-city {
  position: relative;
  margin: 0 56px 0 0;
  padding: 0;
  max-width: 320px;
  width: 100%;
  z-index: 2;

  &-block {
    margin: 0;
    padding: 2px;
    border: 2px solid var(--primary-color);
    border-radius: 4px;
  }

  &-label {
    margin: 0 8px;
    padding: 0 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-color);
  }

  &-input {
    font-size: 16px;
    line-height: 1.25;
    border: none;
    border-radius: 4px;
    padding: 8px;
    width: 100%;

    .night-mode & {
      color: var(--white-color);
      background: var(--dark-color);
    }
  }

  &-autocomplete {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  &-autocomplete-wrapper {
    max-height: 120px;
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: var(--white-color);
    border: 1px solid var(--primary-color);
    border-radius: 4px;
    overflow-y: auto;

    .night-mode & {
      color: var(--white-color);
      background: var(--dark-color);
    }
  }

  &-autocomplete-item {
    display: inline-block;
    margin: 2px;
    padding: 4px 8px;
    background-color: var(--light-color);
    border-radius: 4px;
    cursor: pointer;

    .night-mode & {
      background: var(--dark-color);
    }
  }
}
</style>
