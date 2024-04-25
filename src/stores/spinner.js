import { defineStore } from "pinia";
import { ref } from "vue";

export const useSpinnerStore = defineStore("spinner", () => {
  const spinner = ref(false);

  return {
    spinner,
  };
});
