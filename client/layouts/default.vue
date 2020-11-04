<template>
  <div class="page__body">
    <Header/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Header from '~/components/header.vue';
import Footer from '~/components/footer.vue';

export default {
  components: {
    Header,
    Footer
  },
  head: {
    link: [
      {
        rel: 'preload',
        href: require('~/static/fonts/exo-2-regular.woff2'),
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous'
      },
      {
        rel: 'preload',
        href: require('~/static/fonts/exo-2-bold.woff2'),
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous'
      },
      {
        rel: 'icon',
        href: require('~/static/images/favicon.png'),
        type: 'image/png',
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
  }
}
</script>

// Global styles
<style>
  :root {
    /* Colors */
    --color-accent: #00AFB9;
    --color-green1:  #095334;
    --color-green2: #D1EDE2;
    --color-gray1:  #333333;
    --color-gray2:  #BDBDBD;
    --color-error:  #EB5757;
    --color-white:  #FFFFFF;

    /* Fonts */
    --openSans: 'Open Sans', 'Arial', sans-serif;
    --Exo2:     'Exo 2', sans-serif;

    /* Other */
    --container-width: 92%;
    --header-height:  80px;
  }

  @media (min-width: 1200px) {
    :root {
      --container-width: 1180px;
    }
  }

  * {
    margin: 0;
    padding: 0;
    line-height: 1.32;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .page__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    font: normal 16px/132% var(--openSans);
    color: var(--color-gray1);
    word-break: break-word;
    overflow-x: hidden;
  }

  main {
    flex: 1;
    padding-top: var(--header-height);
  }

  ul {
    list-style: none;
  }

  a {
    color: var(--color-gray1);
    text-decoration: none;
  }

  h1 {
    font-family: var(--Exo2);
    font-size: 48px;
  }

  h2 {
    font-family: var(--Exo2);
    font-size: 32px;
    font-weight: 600;
  }

  button,
  .button {
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
    color: var(--color-gray1);
    cursor: pointer;
    transition: background-color .1s;
    background-color: transparent;
    outline: none;
    border: none;
  }

  .button_accent {
    padding: 8px 0;
    background-color: var(--color-accent);
    border-radius: 5px;
    color: #fff;
  }

  .button_accent:hover, .button_accent:focus {
    background-color: var(--color-green1);
  }

  svg {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .icon {
    fill: var(--color-gray1);
  }

  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }

  .container{
    padding-left:  calc(50% - var(--container-width) / 2) !important;
    padding-right: calc(50% - var(--container-width) / 2) !important;
  }

  .srOnly {
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    word-wrap: normal !important;
  }

  .fixed {
    overflow: hidden;
  }

  /* Forms */
  .form__input {
    width: 100%;
    padding: 8px 12px;
    font-family: var(--Exo2);
    font-size: 14px;
    border: 1px solid var(--color-gray2);
    border-radius: 5px;
  }

  .form__input:focus {
    border-color: var(--color-gray1);
    outline: none;
  }

  .form__input_error {
    border-color: var(--color-error) !important;
    color: var(--color-error);
  }

  .form__input_error::placeholder {
    color: var(--color-error);
  }

  .form__errorText {
    display: none;
    margin-top: 2px;
    font-size: 14px;
    line-height: 1.5;
    text-align: left;
    color: var(--color-error);
    transition: visibility .1s;
  }

  .form__input_error + .form__errorText {
    display: block;
  }

  *::placeholder {
    font-family: var(--Exo2);
    color: var(--color-gray2);
  }
</style>

// Fonts
<style>
  /* open-sans-regular - latin_cyrillic */
  @font-face {
    font-family: 'Open Sans';
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local('Open Sans Regular'), local('OpenSans-Regular'),
      url('~static/fonts/open-sans-regular.woff2') format('woff2'),
      url('~static/fonts/open-sans-regular.woff') format('woff');
  }

  /* exo-2-regular - latin_cyrillic */
  @font-face {
    font-family: 'Exo 2';
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local(''),
      url('~static/fonts/exo-2-regular.woff2') format('woff2'),
      url('~static/fonts/exo-2-regular.woff') format('woff');
  }

  /* exo-2-semi-bold - latin_cyrillic */
  @font-face {
    font-family: 'Exo 2';
    font-display: swap;
    font-style: normal;
    font-weight: 600;
    src: local(''),
      url('~static/fonts/exo-2-semi-bold.woff2') format('woff2'),
      url('~static/fonts/exo-2-semi-bold.woff') format('woff');
  }

  /* exo-2-bold - latin_cyrillic */
  @font-face {
    font-family: 'Exo 2';
    font-display: swap;
    font-style: normal;
    font-weight: 800;
    src: local(''),
      url('~static/fonts/exo-2-bold.woff2') format('woff2'),
      url('~static/fonts/exo-2-bold.woff') format('woff');
  }
</style>
