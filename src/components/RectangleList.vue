<template>
  <div class="rectangle-list">
    <div :key="rect" v-for="rect in rectangles">
      <RectangleItem 
        :rect="rect"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import RectangleItem from '@/components/RectangleItem.vue'

export default {
  name: "RectangleList",
  computed: {
    ...mapState('editor', ['rectangles'])
  },
  methods: {
    ...mapActions('editor', [
        'setRectangleToolActive'
    ]),
  },
  components: {
    RectangleItem
  }

};
</script>

<style scoped>
    .rectangle-list {
        position: absolute;
        top: 0;
        right: 0;
        background-color: whitesmoke;
        z-index: 999;
        padding: 0.6rem;
    }
</style>
