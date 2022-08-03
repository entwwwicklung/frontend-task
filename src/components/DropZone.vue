<template>
  <div
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="drop"
    @change="selectedFile" 
    :class="{ 'active-dropzone': active }"
    class="dropzone"
  >
    <span>Drag & Drop File</span>
    <span>OR</span>
    <label for="dropzoneFile">Select File</label>
    <input type="file" id="dropzoneFile" class="dropzoneFile" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "DropZone",
  data() {
    return {
        active: false
    }
  },
  methods: {
    ...mapActions('editor', [
        'setFile'
    ]),
    toogleActive() {
        this.active = !this.active;
    },
    drop(e) {
        this.toogleActive();
        this.setFile(e.dataTransfer.files[0]);
        this.$router.push('Editor')
    },
    selectedFile() {
        this.setFile(document.querySelector(".dropzoneFile").files[0]);
        this.$router.push('Editor')
    }
  }
};
</script>

<style scoped lang="scss">
.dropzone {
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  border: 2px dashed lightgray;
  background-color: #fff;
  transition: 0.3s ease all;
  label {
    padding: 8px 12px;
    color: #fff;
    background-color: #41b883;
    transition: 0.3s ease all;
  }
  input {
    display: none;
  }
}
.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: #41b883;
  label {
    background-color: #fff;
    color: #41b883;
  }
}
</style>