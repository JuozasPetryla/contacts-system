<template>
  <md-dialog
    :md-active="imageDropOpen"
    md-content="Hello"
    class="h-full w-full mx-auto my-auto z-50 p-12"
  >
    <div class="p-12">
      <div
        v-if="!hideAll"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
        class="w-96 h-96 border-2 border-dashed border-light-gray flex flex-col justify-center items-center text-center"
        :style="isDragging && 'border-color: green'"
      >
        <label for="fileInput" class="cursor-pointer block">
          <div v-if="isDragging">Palikite failus čia.</div>
          <div v-else>
            Tempkite failus čia arba
            <u class="hover-pointer">spauskite čia</u> norint įkelti nuotrauką.
          </div>
        </label>
        <input
          type="file"
          name="file"
          id="fileInput"
          @change="onChange"
          accept=".jpg,.jpeg,.png"
          class="h-full w-full hidden"
          ref="file"
        />
      </div>
      <div class="preview-container mt-4" v-if="files.length">
        <div
          @click="remove(files.indexOf(file))"
          v-for="file in files"
          :key="file.name"
          class="preview-card"
        >
          <div>
            <p>
              {{ file.name }}
            </p>
          </div>
          <div>
            <button class="ml-2" type="button" title="Remove file">
              <b>×</b>
            </button>
          </div>
        </div>
      </div>
      <BaseIconButton @click="closeImageDrop" class="absolute top-2 right-2">
        <img src="../../assets/Plus Math.svg" class="rotate-45" />
      </BaseIconButton>
      <BaseButton
        @click="
          closeImageDrop();
          getFile(files);
        "
        v-if="hideAll"
        class="mt-12"
        >OKAY</BaseButton
      >
    </div>
  </md-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["imageDropOpen"]),
  },
  data() {
    return {
      isDragging: false,
      files: [],
      hideAll: false,
    };
  },
  methods: {
    onChange() {
      this.files.push(...this.$refs.file.files);
      this.hideAll = true;
      return;
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove(i) {
      this.files.splice(i, 1);
      this.hideAll = false;
    },

    ...mapActions(["closeImageDrop", "getFile"]),
  },
};
</script>

<style>
</style>