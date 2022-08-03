<template>
  <div 
		@click="setRectangleToolActive"
		:class="[rectangleToolActive ? 'active' : '', 'rectangle-tool']"
	>
    <font-awesome-icon 
			icon="fa-solid fa-vector-square"
		/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "RectangleTool",
  data() {
    return {}
  },
	computed: mapGetters('editor', ['rectangleToolActive']),
  methods: {
    ...mapActions('editor', [
        'setRectangleToolActive'
    ]),

  },

};
</script>

<style scoped>
    .rectangle-tool {
			width: 1.8rem;
			height: 1.8rem;
			background-color: whitesmoke;
    }
		.rectangle-tool:hover {
			background-color: gainsboro;
		}
		.active {
			border: 1px inset black;
			background-color: gainsboro;
		}
		.fa-vector-square {
			width: 90%;
			height: 90%;
			margin-left: auto;
			margin-right: auto;
    }

</style>
