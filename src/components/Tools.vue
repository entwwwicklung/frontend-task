<template>
  <div class="tools-panel">
    <RectangleTool />
  </div>
</template>

<script>

import RectangleTool from '@/components/RectangleTool.vue';

export default {
  name: "Tools",
  data() {
    return {
    }
  },
  components: {
    RectangleTool
  },
  methods: {

  },

};
</script>

<style scoped>
    .tools-panel {
        width: 2rem;
        height: 10rem;
        margin: 0 0 0 0;
        padding: 0.1rem;
        background-color: whitesmoke;
        position: absolute;
        z-index: 999;
    }
</style>