<template>
  <button
      :class="{close: inputIsOpen}"
      @click="openInp"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: "AppBtn"
}
</script>

<style scoped lang="scss">
.close {
  margin-right: 10px;
  padding: 3px 10px;
  font-weight: 200;
  font-size: 12px;
  color: #ffffff;
  background: rgb(117, 117, 112);
}
</style>
