<template>
  <main class="page_login container">
    <h1 class="srOnly">Регистрация и авторизация</h1>
    <form class="form">

      <div class="form__component" :class="{form__component_active: !isRegistration}">
        <button @click="toggleComponent" type="button" class="form__toggleButton" aria-label="Авторизация"></button>
        <h2 class="form__title form__title_auth">Авторизация</h2>
        <div class="form__group">
          <label>
            <span class="srOnly">Логин</span>
            <input v-model.trim="authLogin" type="text" class="form__input" :class="{form__input_error: authError}" placeholder="Логин">
          </label>
          <label>
            <span class="srOnly">Пароль</span>
            <input v-model.trim="authPassword" type="password" class="form__input" :class="{form__input_error: authError}" placeholder="Пароль">
            <span v-show="authError" class="form__errorText">Неверный логин и/или пароль</span>
          </label>
        </div>
        <button @click.prevent="authorization" class="form__button form__button_auth button_accent">Войти</button>
      </div>

      <div class="form__component" :class="{form__component_active: isRegistration}">
        <button @click="toggleComponent" type="button" class="form__toggleButton" aria-label="Регистрация"></button>
        <h2 class="form__title form__title_reg">Регистрация</h2>
        <div class="form__group">
          <label>
            <span class="srOnly">Логин</span>
            <input v-model.trim="login" type="text" class="form__input loginError" :class="{form__input_error: loginEmptyError}"placeholder="Логин">
          </label>
          <label>
            <span class="srOnly">Пароль</span>
            <input v-model.trim="password" type="password" class="form__input passwordError" :class="{form__input_error: passwordEmptyError}"  placeholder="Пароль">
          </label>
          <label>
            <span class="srOnly">Повторить пароль</span>
            <input v-model.trim="passwordTwo" type="password" class="form__input passwordError" :class="{form__input_error: passwordMatchError}" placeholder="Повторить пароль">
            <span v-show="passwordMatchError" class="form__errorText">Пароли не совпадают</span>
          </label>
        </div>
        <button @click.prevent="registration" class="form__button form__button_auth button_accent">Зарегистрироваться</button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  name: 'Login',
  head: {
    title: 'Авторизация - South Seaside',
  },
  beforeMount() {
    if (this.$store.getters['session/isLogin']) this.$router.replace({path: '/todo'});
  },
  data() {
    return {
      authError: false,
      loginEmptyError: false,
      passwordEmptyError: false,
      passwordMatchError: false,
      isRegistration: false,
      authLogin: '',
      authPassword: '',
      login: '',
      password: '',
      passwordTwo: '',
    }
  },
  watch: {
    authLogin() {
      this.authError = this.isEmpty(this.authLogin);
    },
    authPassword() {
      this.authError = this.isEmpty(this.authPassword);
    },
    login() {
      this.loginEmptyError = this.isEmpty(this.login);
    },
    password() {
      this.passwordEmptyError = this.isEmpty(this.password);
    },
    passwordTwo() {
      this.passwordMatchError = this.isEmpty(this.passwordTwo);
    },
  },
  methods: {
    isEmpty(field) {
      return !field.length;
    },
    async authorization() {
      const data = await this.$axios.$post('/auth/login', {login: this.authLogin, password: this.authPassword});
      const {status } = data;

      if (status) {
        this.$store.commit('session/setLogin', {login: this.authLogin});
        this.$router.push({ path: '/todo' });
      } else {
        this.authError = true;
      }
    },
    async registration() {
      if (!this.login.length) {
        this.loginEmptyError = true;
        return;
      }

      if (!this.password.length) {
        this.passwordEmptyError = true;
        return;
      }

      if (this.password !== this.passwordTwo) {
        this.passwordMatchError = true;
        return;
      }

      const data = await this.$axios.$post('/auth/registration', {login: this.login, password: this.password});

	    const {status, user} = data;

	    if (status) {
		    this.$store.commit('session/setLogin', {login: this.login});
		    this.$router.push({ path: '/todo' });
	    } else {
		    this.authError = true;
	    }
    },
    toggleComponent() {
      this.isRegistration = !this.isRegistration;
    }
  }
}
</script>

<style scoped>
  .page_login {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-white);
  }

  .form {
    width: 100%;
    max-width: 500px;
    margin: 70px 0;
    border-radius: 5px;
    background-color: #fff;
    overflow: hidden;
  }

  @media (min-width: 1200px) {
    .form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 80%;
      max-width: none;
      border: 1px solid var(--color-gray2);
    }
  }

  .form__component {
    position: relative;
    text-align: center;
  }

  .form__component_active {
    min-height: 40vh;
    padding: 24px 12px;
  }

  @media (min-width: 1200px) {
    .form__component_active {
      height: 414px;
      min-height: 0;
      padding: 16px 84px 32px 84px;
    }
  }

  .form__toggleButton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .form__component_active .form__toggleButton {
    display: none;
  }

  .form__group {
    display: none;
    grid-gap: 12px;
    width: 100%;
  }

  .form__component_active .form__group {
    display: grid;
  }

  .form__title {
    font-size: 24px;
    font-weight: 400;
    background-size: cover;
    padding: 24px 0;
    color: #000;
    transition: padding .15s;
    background-position: center 10%;
  }

  .form__title_auth {
    background-image: url("~static/images/image.png");
    background-color: var(--color-green2);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
  }

  .form__title_reg {
    background-image: url("~static/images/image.png");
    background-color: var(--color-green2);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
  }

  .form__component_active .form__title {
    background: none;
    margin-bottom: 34px;
    padding: 0;
    color: var(--color-gray1);
  }

  @media (min-width: 1200px) {
    .form__title {
      padding: 16px 0 36px 0;
      height: 100%;
      cursor: pointer;
    }

    .form__component_active .form__title {
      height: auto;
      margin-bottom: 26px;
      cursor: default;
    }

    .form__component_active .form__title_auth {
      margin-bottom: 74px;
    }
  }

  .form__button {
    display: none;
    width: 100%;
    margin-top: 30px;
  }

  @media (min-width: 1200px) {
    .form__button {
      margin-top: 24px;
    }

    .form__button_auth {
      margin-top: 96px;
    }
  }

  .form__component_active .form__button {
    display: block;
  }
</style>
