<template>
  <main class="page__todo container">
    <div>
      TODO
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'todo',
  head: {
    title: 'Карта - South Seaside',
  },
  computed: {
    ...mapGetters('session', ['isLogin'])
  },
  beforeMount() {
    if (!this.$store.getters['session/isLogin']) this.$router.replace({path: '/login'});
  },
  data() {
    return {
    }
  },
  methods: {

  },
};
</script>

<style scoped>
  .page__todo {
    margin: 42px 0 80px 0;
    font-family: var(--Exo2);
  }

  .map__info {
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
  }

  .map__editIcon {
    width: 22px;
    height: 22px;
    vertical-align: middle;
  }

  @media (min-width: 1200px) {
    .page__todo {
      margin-top: 80px;
    }

    .map__info {
      font-size: 32px;
    }

    .map__editIcon {
      width: 24px;
      height: 24px;
      margin-top: 3px;
    }
  }

  .map__formButton:focus .map__editIcon,
  .map__editIcon:hover {
    fill: var(--color-accent);
    stroke: var(--color-accent);
  }

  .map__editIcon_saveIcon {
    fill: #fff;
    stroke: var(--color-gray1);
  }

  .map__formButton:focus .map__editIcon_saveIcon,
  .map__editIcon_saveIcon:hover {
    fill: #fff;
  }

  .formInfo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .formInfo__group {
    display: grid;
    grid-gap: 12px;
    width: 100%;
    max-width: 300px;
    margin-right: 4px;
  }

  @media (min-width: 1200px) {
    .formInfo__group {
      grid-template-columns: 1fr 1fr;
      max-width: 650px;
    }
  }

  .map__formButton {
    margin-left: 16px;
  }

  .map__toggle {
    display: flex;
    width: 100%;
    margin-top: 22px;
    margin-bottom: 16px;
    overflow-x: auto;
  }

  .map__toggle::-webkit-scrollbar{
    width: 0;
  }

  @media (min-width: 580px) {
    .map__toggle {
      justify-content: center;
    }
  }

  @media (min-width: 1200px) {
    .map__toggle {
      margin: 36px 0;
    }
  }

  .map__toggleButton {
    font-size: 18px;
    font-weight: 600;
    flex-shrink: 0;
    outline: #015F7A;
  }

  .map__toggleButton + .map__toggleButton {
    margin-left: 28px;
  }

  .map__toggleButton_active {
    color: var(--color-accent);
  }

  @media (min-width: 1200px) {
    .map__toggleButton + .map__toggleButton {
      margin-left: 70px;
    }
  }
</style>
