<template>
  <div>
    <div>{{ movie.Title }}</div>
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