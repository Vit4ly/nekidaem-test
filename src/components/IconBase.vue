<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height">
    <use :href="uri"></use>
  </svg>
</template>

<script>
import sprite from "@/assets/images/icons.svg";

export default {
  name: "IconBase",
  props: {
    title: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: 18,
    },
  },
  computed: {
    uri() {
      return `${sprite}#${this.title}`;
    },
  },
};
</script>

<style lang="scss" scoped>
use {
  fill: currentColor;
}
</style>
