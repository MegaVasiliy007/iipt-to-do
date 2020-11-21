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
        <Item v-for="shop of shop" :element="shop" :key="shop.id" type="shop" @remove="remove" @edit="openUpdateThing"/>
    </div>
    <div class="todo__list" v-if="tab === 1">
      <Item v-for="meeting of meeting" :element="meeting" :key="meeting.id" type="meeting" @remove="remove" @edit="openUpdateThing"/>
    </div>
    <div class="todo__list" v-if="tab === 2">
      <Item v-for="task of task" :element="task" :key="task.id" type="task" @remove="remove" @edit="openUpdateThing"/>
    </div>
    <Modal v-if="showModal" @close="closeModal">
      <template v-slot:body>
        <div class="modal__content" v-if="tab === 0">
          Дата и время
          <input type="date" v-model="create.date" class="form__input form__date" :class="{form__input_error: errors.date}" :min="calcMinDate"> <input v-model="create.time" class="form__input" :class="{form__input_error: errors.time}" type="time"><br>
          <span v-show="errors.date || errors.time" class="form__errorText">Не указана дата или время</span><br>
          Список покупок
          <ol>
            <li v-for="(val, ind) in items">
              <input :disabled="val.id === undefined" type="checkbox" v-model="val.done">
              <input type="text" v-model.trim="val.name" @change="updateItems(ind)" class="form__input" :class="{form__input_error: errors.items}">
              <button :disabled="items.length < 2 || ind === items.length - 1"  @click="removeItem(ind)" class="button__list"><svg-icon name="cross" class="map__removeIcon" aria-hidden="true"/></button>
            </li>
          </ol>
          <span v-show="errors.items" class="form__errorText">Пустой список покупок</span><br>
        </div>
        <div class="modal__content" v-if="tab === 1">
          Дата и время
          <input type="date" v-model="create.date" class="form__input form__date" :class="{form__input_error: errors.date}" :min="calcMinDate"> <input v-model="create.time" class="form__input" :class="{form__input_error: errors.time}" type="time"><br>
          <span v-show="errors.date || errors.time" class="form__errorText">Не указана дата или время</span><br>
          Название
          <input type="text" v-model.trim="create.name" class="form__input" :class="{form__input_error: errors.name}" placeholder="Написать..."><br>
          <span v-show="errors.name" class="form__errorText">Не указано название или слишком длинное</span><br>
          Адрес
          <input type="text" v-model.trim="create.address" class="form__input" :class="{form__input_error: errors.address}" placeholder="Написать..."><br>
          <span v-show="errors.address" class="form__errorText">Не указан адрес</span><br>
          Комментарий
          <input type="text" v-model.trim="create.comment" class="form__input" :class="{form__input_error: errors.comment}" placeholder="Написать..."><br>
          <span v-show="errors.comment" class="form__errorText">Не указан комментарий</span><br>
        </div>
        <div class="modal__content" v-if="tab === 2">
          Дата и время
          <input type="date" v-model="create.date" class="form__input form__date" :class="{form__input_error: errors.date}" :min="calcMinDate"> <input v-model="create.time" class="form__input" :class="{form__input_error: errors.time}" type="time"><br>
          <span v-show="errors.date || errors.time" class="form__errorText">Не указана дата или время</span><br>
          Список задач
          <ol>
            <li v-for="(val, ind) in items">
              <input :disabled="val.id === undefined" type="checkbox" v-model="val.done">
              <input type="text" v-model.trim="val.name" @change="updateItems(ind)" class="form__input" :class="{form__input_error: errors.items}">
              <button :disabled="items.length < 2 || ind === items.length - 1" @click="removeItem(ind)" class="button__list"><svg-icon name="cross" class="map__removeIcon" aria-hidden="true"/></button>
            </li>
          </ol>
          <span v-show="errors.items" class="form__errorText">Пустой список задач</span><br>
        </div>
      </template>
      <template v-slot:footer>
        <button class="button" @click="closeModal">Закрыть</button>
        <button v-if="create.id" class="button" @click="updateThing">{{ createButtonOrEdit }}</button>
        <button v-else class="button" @click="createThing">{{ createButtonOrEdit }}</button>
      </template>
    </Modal>
  </main>
</template>

<script>
import Item from '../components/item';
import Modal from '../components/modal';
import {mapGetters} from 'vuex';

//v-if="items.length > 1 && ind !== items.length - 1"
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
      return this.create.id ? 'Сохранить' : this.createButton;
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
      errors: {
        date: false,
        time: false,
        items: false,
        name: false,
        address: false,
        comment: false
      },
      items: []
    }
  },
  methods: {
    changeTab(e) {
      this.tab = +e.currentTarget.dataset.index;
    },
    openCreateThing() {
      this.showModal = true;
      if (this.tab !== 1) this.items = [{name: '', done: 0}];
    },
    async createThing() {
      this.errors.date = !this.create.date;
      this.errors.time = !this.create.time;
      this.errors.items = this.tab !== 1 && !this.items.filter(el => el.name).length;
      if (this.tab === 1) {
        this.errors.name = !this.create.name || this.create.name.length > 255;
        this.errors.address = !this.create.address;
        this.errors.comment = !this.create.comment;
      }

      if (Object.values(this.errors).filter(Boolean).length) return;

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
    openUpdateThing({ type, id }) {
      this.showModal = true;
      const element = this[type].find(el => el.id === id);
      const date = new Date(element.date)
      this.create = {
        ...element,
        items: undefined,
        date: date.getFullYear() + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2),
        time: ('00' + date.getHours()).slice(-2) + ':' + ('00' + date.getMinutes()).slice(-2)
      };
      if (type !== 'meeting') this.items = [...element.items, {name: '', done: 0}];
    },
    async updateThing() {
      this.errors.date = !this.create.date;
      this.errors.time = !this.create.time;
      this.errors.items = this.tab !== 1 && !this.items.filter(el => el.name).length;
      if (this.tab === 1) {
        this.errors.name = !this.create.name;
        this.errors.address = !this.create.address;
        this.errors.comment = !this.create.comment;
      }

      if (Object.values(this.errors).filter(Boolean).length) return;

      const params = { login: this.getLogin, ...(!!this.create.name && this.create), id: undefined, time: undefined, date: Date.parse(this.create.date+'T'+this.create.time)};

      if (this.items.filter(el => el.name).length) {
        params.items = this.items.filter(el => el.name);
      }

      if (this.tab === 0) {
        const data = await this.$axios.$put('/shop/'+this.create.id, params);
        this.shop[this.shop.findIndex(el => el.id === this.create.id)] = data.shop;
      }
      if (this.tab === 1 && this.create.name && this.create.address && this.create.comment) {
        const data = await this.$axios.$put('/meeting/'+this.create.id, params);
        this.meeting[this.meeting.findIndex(el => el.id === this.create.id)] = data.meeting;
      }
      if (this.tab === 2) {
        const data = await this.$axios.$put('/task/'+this.create.id, params);
        this.task[this.task.findIndex(el => el.id === this.create.id)] = data.task;
      }

      this.closeModal();
    },
    updateItems(ind) {
      if (ind+1 !== this.items.length) return;
      this.items.push({name: '', done: 0});
    },
    removeItem(ind) {
      this.items.splice(ind, 1);
    },
    remove({ type, id }) {
      this[type].splice(this[type].indexOf(id), 1);
    },
    closeModal() {
      this.showModal = false;
      this.create = {};
      this.errors = {
        date: false,
        time: false,
        items: false,
        name: false,
        address: false,
        comment: false
      };
    }
  },
};
</script>

<style scoped>
.page__todo {
  margin: 42px 0 80px 0;
}

.form__input {
  width: calc(100% - 40px);
}

.todo__info {
  font-size: 16px;
  font-weight: 400;
}

.todo__info-inner {
  text-align: center;
}

.map__removeIcon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.map__removeIcon:hover {
  fill: red;
}

.button__create {
  display: block;
  min-width: 320px;
  margin: 10px auto 0;
}

.button__list {
  border: none;
  padding: inherit;
  font-size: 28px;
  color: #000;
}

.button__list:disabled .map__removeIcon {
  fill: var(--color-gray1);
}

.button__list:disabled {
  cursor: default;
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

.form__date {
  margin-bottom: 10px;
}

@media (min-width: 1200px) {
  .page__todo {
    margin-top: 80px;
  }

  .todo__info {
    font-size: 32px;
  }

  .map__removeIcon {
    width: 16px;
    height: 16px;
    margin-top: 3px;
  }
}
</style>
