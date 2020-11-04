<template>
  <main class="page_home">
      <section class="hero__content">
        <h1 class="hero__title">Спланируй свой день на максимум</h1>
        <p class="hero__subtitle">Покупки - Встречи - Задачи</p>
        <n-link :to="link" class="hero__button button_accent button">Спланировать</n-link>
      </section>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'index',
    head: {
      title: 'South Seaside',
    },
    computed: {
      ...mapGetters('session', ['isLogin']),
      link() {
        return this.isLogin ? '/todo' : '/login'
      }
    }
  };
</script>

<style>
  .page_home {
    background-image: url('~static/images/hero.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  /* Hero */
  .hero__content {
    position: absolute;
    top: 22%;
    margin-left:  calc(50% - var(--container-width) / 2);
    color: #000;
    z-index: 2;
  }

  @media (min-width: 375px) {
    .hero__content {
      top: 34%;
    }
  }

  .hero__subtitle {
    max-width: 400px;
    margin-top: 0.6em;
    font-size: 20px;
  }

  .hero__button {
    width: 178px;
    margin-top: 94px;
    font-size: 18px;
  }

  @media (min-width: 1200px) {
    .hero__title {
      font-size: 68px;
    }

    .hero__subtitle {
      font-size: 28px;
    }

    .hero__button {
      margin-top: 72px;
    }
  }
</style>

