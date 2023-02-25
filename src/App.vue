<template>
  <AppHeader />
  <main class="main">
    <div class="layout">
      <div class="language">
        <button class="language-button" v-if="$i18n.locale == 'en'" @click="$i18n.locale = 'ua'">Ua</button>
        <button class="language-button" v-if="$i18n.locale == 'ua'" @click="$i18n.locale = 'en'">En</button>
      </div>
      <nav class="navigation">
        <router-link to="/">{{ $t('nav.home') }}</router-link>
        <router-link to="/favorites">{{ $t('nav.fav') }}</router-link>
      </nav>

      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="route" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </main>
  <AppFooter />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'App',
  components: { AppHeader, AppFooter }
}
</script>

<style lang="scss">
:root {
  --primary-color: #77a0f8;
  --primary-color-nm: #001238;
  --text-color: #202020;
  --text-color-nm: #ececec;
  --white-color: #fdfdfd;
  --dark-color: #1f1f1f;
  --light-color: #f5f5f5;
  --light-color-nm: #1a1818;
  --grey-color: #d2d2de;
  --grey-color-nm: #37373a;
  --dark-grey-color: #a5a5a5;
  --dark-grey-color-nm: #252222;
  --success-color: #056e46;
  --yellow-color: #f5f103;
  --warning-color: #e2a90d;
  --error-color: #c20505;
}

* {
  box-sizing: border-box;

  &:before,
  &:after {
    box-sizing: border-box;
  }

  &::-webkit-scrollbar-track {
    background: var(--white-color);
  }

  &::-webkit-scrollbar {
    width: 10px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid transparent;
    background-clip: content-box;
    background-color: var(--grey-color);
  }
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  color: var(--text-color);

  &.night-mode {
    color: var(--text-color-nm);
  }
}

.main {
  width: 100%;
  min-height: calc(100vh - 160px);
  margin: 0;
  padding: 0 0 20px 0;
  background: var(--primary-color);

  .night-mode & {
    background: var(--primary-color-nm);
  }
}

.layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
}

.language {
  display: flex;
  justify-content: flex-end;
  margin: 0;
  padding: 0;

  &-button {
    padding: 4px 8px;
    min-width: 40px;
    font-weight: 500;
    color: var(--primary-color);
    background: var(--white-color);
    border: 1px solid var(--primary-color);
    border-radius: 4px;
    cursor: pointer;

    .night-mode & {
      background: var(--dark-color);
    }
  }
}

.navigation {
  margin: 0 20px;
  padding: 0;

  a {
    display: inline-block;
    padding: 8px 20px;
    font-weight: bold;
    color: var(--white-color);
    border-radius: 4px 4px 0 0;

    &.router-link-exact-active {
      color: var(--text-color);
      background: var(--white-color);
      text-decoration: none;

      .night-mode & {
        color: var(--white-color);
        background: var(--dark-color);
      }
    }
  }
}

.content {
  margin: 0;
  padding: 20px;
  background: var(--white-color);
  border-radius: 4px;

  .night-mode & {
    background: var(--dark-color);
  }
}

.route {

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-active {
    transition: all 0.3s ease-out;
  }

  &-leave-active {
    transition: all 0.3s ease-in;
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
  }
}

.message {
  display: inline-block;
  padding: 4px 0;
  font-size: 14px;
  color: var(--error-color);
}
</style>
