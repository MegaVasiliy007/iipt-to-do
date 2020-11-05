<template>
  <footer class="footer container">
    <Logo class="footer__logo" />
    <ul class="social" aria-labelledby="socialDescription">
      <li>
        <a href="https://t.me/" target="_blank" rel="noopener" aria-label="Телеграм">
          <svg-icon name="telegram" class="social__icon" aria-hidden="true"/>
        </a>
      </li>
      <li>
        <a href="https://vk.com/" target="_blank" rel="noopener" aria-label="Вконтакте">
          <svg-icon name="vk" class="social__icon" aria-hidden="true"/>
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Инстаграм">
          <svg-icon name="instagram" class="social__icon" aria-hidden="true"/>
        </a>
      </li>
    </ul>

    <p id="socialDescription" class="srOnly">Список наших соцсетей, где мы выкладываем самую свежую информацию</p>
  </footer>
</template>

<style scoped>
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 30px 0;
    background-color: var(--color-green1);
  }

  .footer__logo {
    color: #fff;
    z-index: 0;
  }

  .social {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 20px;
  }

  .social__icon {
    width: 28px;
    height: 28px;
    fill: #fff;
  }

  .social__icon:hover {
    opacity: 0.7;
  }
</style>

<script>
  import Logo from './logo'

  export default {
    name: 'Footer',
    components: {
      Logo
    },
  }
</script>
