<template>
  <main class="page__todo container">
    <div class="todo__info">
      <div class="todo__info-inner">
        <button class="button__list" @click="changeTab" data-index="0" :class="{button__list_active: tab === 0}">
          Покупки
        </button>
        -
        <button class="button__list" @click="changeTab" data-index="1" :class="{button__list_active: tab === 1}">
          Встречи
        </button>
        -
        <button class="button__list" @click="changeTab" data-index="2" :class="{button__list_active: tab === 2}">
          Задачи
        </button>
      </div>
      <button @click="openCreateThing" class="button__create button">{{ createButton }}</button>
    </div>
    <div class="todo__list" v-if="tab === 0">
        <Item v-for="shop of shop" :element="shop" :key="shop.id" type="shop" @remove="remove"/>
    </div>
    <div class="todo__list" v-if="tab === 1">
      <Item v-for="meeting of meeting" :element="meeting" :key="meeting.id" type="meeting" @remove="remove"/>
    </div>
    <div class="todo__list" v-if="tab === 2">
      <Item v-for="task of task" :element="task" :key="task.id" type="task" @remove="remove"/>
    </div>
    <Modal v-if="showModal" @close="closeModal">
      <template v-slot:body>
        <div class="modal__content" v-if="tab === 0">
          Дата и время
          <input type="date" v-model="create.date" :min="calcMinDate"> <input v-model="create.time" type="time"><br>
          Список покупок
          <ol>
            <li v-for="(val, ind) in items">
              <input type="text" v-model.trim="val.name" @change="updateItems(ind)" class="form__input">
              <button v-if="items.length > 1" @click="removeItem(ind)" class="button__list"><svg-icon name="cross" class="map__editIcon" aria-hidden="true"/></button>
            </li>
          </ol>
        </div>
        <div class="modal__content" v-if="tab === 1">
          Дата и время
          <input type="date" v-model="create.date" :min="calcMinDate"> <input v-model="create.time" type="time"><br>
          Название
          <input type="text" v-model.trim="create.name" class="form__input" placeholder="Написать...">
          Адрес
          <input type="text" v-model.trim="create.address" class="form__input" placeholder="Написать...">
          Комментарий
          <input type="text" v-model.trim="create.comment" class="form__input" placeholder="Написать...">
        </div>
        <div class="modal__content" v-if="tab === 2">
          Дата и время
          <input type="date" v-model="create.date" :min="calcMinDate"> <input v-model="create.time" type="time"><br>
          Список задач
          <ol>
            <li v-for="(val, ind) in items">
              <input type="text" v-model.trim="val.name" @change="updateItems(ind)" class="form__input">
              <button v-if="items.length > 1" @click="removeItem(ind)" class="button__list"><svg-icon name="cross" class="map__editIcon" aria-hidden="true"/></button>
            </li>
          </ol>
        </div>
      </template>
      <template v-slot:footer>
        <button class="button" @click="closeModal">Закрыть</button>
        <button class="button" @click="createThing">{{ createButtonOrEdit }}</button>
      </template>
    </Modal>
  </main>
</template>

<script>
import Item from '../components/item';
import Modal from '../components/modal';
import {mapGetters} from 'vuex';

export default {
  name: 'todo',
  head: {
    title: 'Списки - ToDo',
  },
  components: {
    Item,
    Modal
  },
  computed: {
    ...mapGetters('session', ['isLogin', 'getLogin']),
    createButtonOrEdit() {
      return this.createButton;
    },
    createButton() {
      return 'Создать ' + this.createButtonText;
    },
    createButtonText() {
      switch (this.tab) {
        case 0:
          return 'список покупок';
        case 1:
          return 'встречу';
        case 2:
          return 'список задач';
      }
    },
    calcMinDate() {
      const date = new Date();
      return date.getFullYear() + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);
    }
  },
  async beforeMount() {
    if (!this.$store.getters['session/isLogin']) this.$router.replace({path: '/login'});

    const shop = await this.$axios.$get('/shop', {params: {login: this.getLogin}});
    this.shop = shop.shops;

    const meetings = await this.$axios.$get('/meeting', {params: {login: this.getLogin}});
    this.meeting = meetings.meetings;

    const tasks = await this.$axios.$get('/task', {params: {login: this.getLogin}});
    this.task = tasks.tasks;
  },
  data() {
    return {
      tab: 0,
      shop: null,
      meeting: null,
      task: null,
      showModal: false,
      create: {},
      items: []
    }
  },
  methods: {
    changeTab(e) {
      this.tab = +e.currentTarget.dataset.index;
    },
    openCreateThing() {
      this.showModal = true;
      if (this.tab !== 1) this.items = [{name: ''}];
    },
    async createThing() {
      if (!this.create.date || !this.create.time || (!this.create.name && !this.items.filter(el => el.name).length)) return;

      const params = { login: this.getLogin, ...(!!this.create.name && this.create), time: undefined, date: Date.parse(this.create.date+'T'+this.create.time)};

      if (this.items.filter(el => el.name).length) {
        params.items = this.items.filter(el => el.name).map(el => el.name);
      }

      if (this.tab === 0) {
        const data = await this.$axios.$post('/shop', params);
        this.shop.push(data.shop);
      }
      if (this.tab === 1 && this.create.name && this.create.address && this.create.comment) {
        const data = await this.$axios.$post('/meeting', params);
        this.meeting.push(data.meeting);
      }
      if (this.tab === 2) {
        const data = await this.$axios.$post('/task', params);
        this.task.push(data.task);
      }

      this.closeModal();
    },
    updateItems(ind) {
      console.log(ind);
      if (ind+1 !== this.items.length) return;
      this.items.push({name: ''});
    },
    removeItem(ind) {
      console.log(ind);
      this.items.splice(ind, 1);
    },
    // updateThing() {
    //
    // },
    remove({ type, id }) {
      this[type].splice(this[type].indexOf(id), 1);
    },
    closeModal() {
      this.showModal = false;
      this.create = {};
    }
  },
};
</script>

<style scoped>
.page__todo {
  margin: 42px 0 80px 0;
}

.form__input {
  width: calc(100% - 28px);
}

.todo__info {
  font-size: 16px;
  font-weight: 400;
}

.todo__info-inner {
  text-align: center;
}

.map__editIcon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.button__create {
  display: block;
  max-width: 320px;
  margin: 10px auto 0;
}

.button__list {
  border: none;
  padding: inherit;
  font-size: 28px;
  color: #000;
}

.button__list:hover {
  color: var(--color-accent);
}

.button__list_active {
  color: var(--color-accent) !important;
}

.todo__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-top: 32px;
}

.modal__content {
  color: var(--color-accent);
  font-size: 21px;
}

.modal__content ol {
  margin-left: 20px;
  color: #000;
  font-size: 18px;
}

@media (min-width: 1200px) {
  .page__todo {
    margin-top: 80px;
  }

  .todo__info {
    font-size: 32px;
  }

  .map__editIcon {
    width: 16px;
    height: 16px;
    margin-top: 3px;
  }
}
</style>
