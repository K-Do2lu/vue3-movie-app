<template>
  <div>
    <div
      :style="{ backgroundImage: `url(${movie.Poster})` }"
      class="movie">
      <div class="info">
        <div class="year">
          {{ movie.Year }}
        </div>
        <div class="title">
          {{ movie.Title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => ({})  // function() { return {} } 과 동일 
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/scss/main";

.movie {
  $width:200px;
  width: $width;
  height: $width * 3/2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  position: relative;
  &:hover::after { // & - 가상선택자, ::after - 가상요소
    content: "";
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    border: 6px solid $primary;

  }
  .info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: rgba($black, 0.3);
    padding: 14px;
    text-align: center;
    backdrop-filter: blur(10px);
    .year {
      color: $primary;

    }
    .title {
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>