<template>
  <div :class="[selectedRectangle == rect ? 'active' : '', 'item']">
    <span
      @click="setSelectedRectangle(rect)"
    >Rectangle {{rect}}</span>
    <font-awesome-icon 
      icon="fa-solid fa-xmark"
      @click="deleteRectangle(rect)"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "RectangleItem",
  data() {
    return {}
  },
  props: {
    rect: null
  },
  computed: {
    ...mapGetters('editor', [
      'selectedRectangle',
    ])
  },
  methods: {
    ...mapActions('editor', [
        'deleteRectangle',
        'setSelectedRectangle',
    ]),
  },

};
</script>

<style scoped>
  .fa-xmark {
    color: red;
    width: 1rem;
  }
  span {
    display: inline-block;
    margin-right: 0.6rem;
  }
  .item {
    margin-bottom: 0.6rem;
    padding: 0.6rem;
    background-color: gainsboro;
  }
  .active {
    background-color: lightgreen;
  }
</style>
