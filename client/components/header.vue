<template>
  <header class="header container header_active">
    <Logo @click.native="closeMenu" class="header__logo" :menu="menu" />

    <button @click="openMenu" class="header__burger" :aria-expanded="menu || 'false'" aria-label="Открыть меню" aria-controls="nav">
      <svg-icon name='burger' class='burger__icon' aria-hidden="true"/>
    </button>

    <nav id="nav" class="nav" :class="{nav_active: menu}">
      <button @click="closeMenu" class="nav__close" aria-label="Закрыть меню"><svg-icon name="cross" class="nav__crossIcon" aria-hidden="true"/></button>
      <ul @click="closeMenu" class="nav__list">
        <li><n-link to='/todo' class="nav__link" :class="{nav__link_active: isPage('todo')}">Списки</n-link></li>
        <li v-if='!isLogin'>
          <n-link to='/login' class="nav__link" :class="{nav__link_active: isPage('login')}">Вход <svg-icon name="login" class="nav__loginIcon" aria-hidden="true"/></n-link>
        </li>
        <li v-else>
          <button @click="logout" class="nav__link button__exit">Выйти<svg-icon name="logout" class="nav__loginIcon" aria-hidden="true"/></button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
  import Logo from './logo'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Header',
    components: {
      Logo
    },
    computed: {
      ...mapGetters('session', ['isLogin']),
    },
    data() {
      return {
        menu:  false
      }
    },
    methods: {
      isPage(page) {
        return this.$route.name.toLowerCase() === page
      },
      openMenu() {
        this.menu = !this.menu
        document.querySelector('body').classList.toggle('fixed')
        document.querySelector('.nav__close').focus()
      },
      closeMenu() {
        this.menu = false
        document.querySelector('body').classList.remove('fixed')
        document.querySelector('.header__burger').focus()
      },
      logout() {
        this.$store.commit('session/setLogin', { login: null });
        this.$router.replace({path: '/login'});
      }
    }
  }
</script>

<style scoped>
.header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 24px 0;
  z-index: 100;
  color: #fff;
  transition: background-color .2s;
}

.header_active {
  color: var(--color-gray1);
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 129, 167, 0.25);
}

.header_active .burger__icon {
  fill: var(--color-gray1);
}

.burger__icon {
  width: 32px;
  height: 16px;
  fill: #fff;
  transition: fill .1s;
}

.burger__icon:hover {
  fill: var(--color-accent);
}

.nav {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  right: -100%;
  background-color: var(--color-green1);
  opacity: 0.93;
  z-index: 110;
  transition: all .3s;
}

.nav_active {
  right: 0;
}

.nav *:active {
  color: var(--color-gray1);
  fill: var(--color-gray1);
}

.nav__link_active {
  color: var(--color-gray1) !important;
}

.nav__close {
  position: absolute;
  top: 26px;
  right: 15px;
}

.nav__crossIcon {
  width: 24px;
  height: 24px;
  fill: #fff;
}

.nav__loginIcon {
  display: none;
}

.nav__list {
  display: grid;
  grid-row-gap: 60px;
  align-self: center;
  text-align: center;
  margin: 0 auto;
}

.nav__link {
  font-weight: 700;
  font-size: 48px;
  color: #fff;
}

.button__exit {
	border: none;
	padding: inherit;
}

@media (min-width: 1200px) {
  .header__burger, .nav__close {
    display: none;
  }

  .nav {
    position: static;
    width: auto;
    background: none;
  }

  .nav__list {
    grid-auto-flow: column;
    grid-column-gap: 40px;
    margin: 0;
  }

  .nav__link {
    font-weight: 400;
    font-size: 18px;
  }

  .nav__link_active,
  .nav__link_active .nav__loginIcon{
    color: var(--color-accent) !important;
    fill: var(--color-accent) !important;
  }

  .nav__loginIcon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-left: 8px;
    fill: #fff
  }

  .header_active .nav__link,
  .header_active .nav__loginIcon{
    color: var(--color-gray1);
    fill: var(--color-gray1)
  }

  .nav__link:hover {
    color: var(--color-accent);
  }

  .nav__link:hover > .nav__loginIcon {
    fill: var(--color-accent);
  }
}
</style>
