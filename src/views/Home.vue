<template>
  <div class="home">
    <DropZone />
  </div>
</template>

<script>
import DropZone from '@/components/DropZone.vue';

export default {
  name: 'Home',
  methods: {

  },
  components: {
    DropZone,
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
}
h1 {
    font-size: 40px;
    margin-bottom: 32px;
}


</style>