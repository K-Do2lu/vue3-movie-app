<template>
  <div
    :style="{
      width: `${size}rem`, // default => 2rem
      height: `${size}rem`, // default => 2rem
      zIndex 
      // vue 스타일 바인딩에서는 대쉬 케이스를 카멜케이스로 자동변환함
      // z-index == zIndex, 'z-index': zIndex와 동일
      // html에서 데이터 바인딩으로 사용할 때에는 대쉬 케이스만 사용.
      // Movie.vue에서 확인가능 

    }"
    :class="{ absolute, fixed }"
    class="spinner-border text-primary"></div>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 2
    },
    absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.spinner-border {
  // margin 부터 right 까지 absolute 또는 fixed일 때, 
  // 가운데 배치를 위해 사용되는 css
  margin: auto; 
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &.absolute{
    position: absolute;
  }
  &.fixed {
    position: fixed;
  }
}
</style>