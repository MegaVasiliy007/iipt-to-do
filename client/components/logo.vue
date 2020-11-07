<template>
  <n-link to="/" v-if="!isIndex" class="logo" :class="{logo_white: menu}" title="На главную" >
    <img src="~static/images/favicon.png" class="logo__icon" alt="logo">
    <span>T o D o</span>
  </n-link>

  <div v-else class="logo" :class="{logo_white: menu}" >
    <img src="~static/images/favicon.png" class="logo__icon" alt="logo">
    <span>T o D o</span>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
    props: ['menu'],
    computed: {
      isIndex() {return this.$route.name === 'index'},
    },
  }
</script>

<style scoped>
  .logo {
    display: flex;
    align-items: center;
    font-size: 18px;
    z-index: 200;
    transition: color .3s;
  }

  .logo_white {
    color: #fff;
  }

  .logo__icon {
    width: 30px;
    height: 32px;
    margin-right: 6px;
  }

  .logo__anchor{
    fill: #fff;
  }
</style>
