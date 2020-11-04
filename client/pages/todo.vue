<template>
  <main class="page__todo container">
	  <div class="todo__info">
		  <div><button class="button__list" @click="changeTab" data-index="0" :class="{button__list_active: tab === 0}">Покупки</button> - <button class="button__list" @click="changeTab" data-index="1" :class="{button__list_active: tab === 1}">Встречи</button> - <button class="button__list" @click="changeTab" data-index="2" :class="{button__list_active: tab === 2}">Задачи</button></div>
		  <button class="button__create button">Создать {{ createButton }}</button>
	  </div>
<div class="todo__list">
	  <div v-if="tab === 0">
		  <table>
			  <tr v-for="shop of shops">
				  <td>{{ new Date(shop.date) }}</td>
				  <td>
					  <ul>
						  <li v-for="item of shop.items">{{ item.name }} </li>
					  </ul>
				  </td>
				  <td>1</td>
			  </tr>
		  </table>
	  </div>
	  <div v-if="tab === 1">
		  1
	  </div>
	  <div v-if="tab === 2">
		  2
	  </div>
</div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'todo',
  head: {
    title: 'Списки - ToDo',
  },
  computed: {
    ...mapGetters('session', ['isLogin', 'getLogin']),
	  createButton() {
    	switch (this.tab) {
    		case 0:
    			return 'список покупок';
		    case 1:
			    return 'встречу';
		    case 2:
			    return 'список задач';
	    }
	  },
  },
  async beforeMount() {
    if (!this.$store.getters['session/isLogin']) this.$router.replace({path: '/login'});

    const shop = await this.$axios.$get('/shop', { params: { login: this.getLogin } });
    this.shops = shop.shops;
  },
  data() {
    return {
    	tab: 0,
	    shops: null,
	    meeting: null,
	    tasks: null
    }
  },
  methods: {
  	changeTab(e) {
  		this.tab = +e.currentTarget.dataset.index;
	  }
  },
};
</script>

<style scoped>
  .page__todo {
    margin: 42px 0 80px 0;
	  display: flex;
	  justify-content: center;
  }

  .todo__info {
	  flex-direction: column;
    font-size: 16px;
    font-weight: 400;
  }

  .map__editIcon {
    width: 22px;
    height: 22px;
    vertical-align: middle;
  }

  .button__create {
	  margin-left: 10%;
	  width: 80%;
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

  }

  @media (min-width: 1200px) {
    .page__todo {
      margin-top: 80px;
    }

    .todo__info {
      font-size: 32px;
    }

    .map__editIcon {
      width: 24px;
      height: 24px;
      margin-top: 3px;
    }
  }
</style>
