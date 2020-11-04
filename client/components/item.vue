<template>
  <div class="shop-block" :class="{'shop-block_default': !isLarge, 'shop-block_other': isLarge}">
    <div class="shop-block__date">{{ date.date }}<br>{{ date.time }}</div>
    <div class="shop-block__items" v-if="element.items">
      <ol>
        <li v-for="item of element.items">{{ item.name }}</li>
      </ol>
    </div>
    <div class="shop-block__items" v-if="element.name">{{ element.name }}</div>
    <div v-if="element.address">{{ element.address }}</div>
    <div v-if="element.comment">{{ element.comment }}</div>
    <div class="shop-block__controls">
      <button @click="remove"><svg-icon name="cross" class="map__editIcon" aria-hidden="true"/></button>
<!--      <button @click="edit"><svg-icon name="edit" class="map__editIcon" aria-hidden="true"/></button>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "item",
  props: {
    element: {
      type: Object,
      require: true
    },
    type: {
      type: String,
      require: true
    }
  },
  computed: {
    date() {
      const date = new Date(this.element.date);
      return {
        date: ('00' + date.getDate()).slice(-2) + '.' + ('00' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear(),
        time: ('00' + date.getHours()).slice(-2) + ':' + ('00' + date.getMinutes()).slice(-2)
      };
    },
    isLarge() {
      return this.type === 'meeting';
    }
  },
  methods: {
    remove() {
      this.$axios.$delete('/'+this.type+'/'+this.element.id);
      this.$emit('remove', {type: this.type, id: this.element.id});
    },
    edit() {
      //
    }
  }
}
</script>

<style scoped>
.map__editIcon {
  width: 22px;
  height: 22px;
  vertical-align: middle;
}

.shop-block {
  border: 1px solid var(--color-gray2);
  border-radius: 5px;
  padding: 20px 0;
  display: grid;
  align-items: stretch;
}

.shop-block_default {
  grid-template-columns: auto 1fr auto;
}

.shop-block_other {
  grid-template-columns: auto 1fr 1fr 1fr auto;
}

.shop-block > div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

.shop-block > div:not(:first-child) {
  border-left: 1px solid var(--color-gray2);
}

.shop-block__date {
  text-align: right;
}

.shop-block__items {
  justify-self: start;
}

.shop-block__items ol {
  margin-left: 10px;
}

.shop-block__controls button {
  border: none;
}

.shop-block__controls button:not(:last-child) {
  margin-right: 10px;
}
</style>