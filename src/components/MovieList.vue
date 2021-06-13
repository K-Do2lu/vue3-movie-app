<template>
  <div class="container">
    <div class="inner">
      <div class="message">
        {{ message }}
      </div>
      <div class="movies">
        <MovieItem
          v-for="movie in movies" 
          :key="movie.imdbID"
          :movie="movie" /> <!-- v-for의 movies는 computed로부터 오는 것 --> 
      </div>
    </div>
  </div>
</template>
<script>
import MovieItem from '~/components/MovieItem'
export default {
  components: {
    MovieItem,
  },
  computed: {
    movies() {
      // movies는 movies.js의 state 중 하나로 비어있는 배열이다. 
      // Search.vue에서 apply() 메소드가 발동하면
      // movie.js에서 searchMovies()라는 actions가 발동하게 된다.
      // 그로인해 movie.js의 updateState()라는 mutations가 동작하여
      // movies라는 빈 배열은 imdbAPI로 부터 받아온 데이터로 채워진다.
      // 그렇게 채워진 movies 배열을 지금 여기서 읽어 오는 것이다.   
      // 이 메소드가 computed 옵션에 정의된 이유는 가장 최신의 movies를 읽어오기 위함이다.  
      return this.$store.state.movie.movies
    },
    message() {
      return this.$store.state.movie.message
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  .movies{
    display: flex;
    flex-wrap: wrap; // flex 줄바꿈 처리 
    justify-content: center;
  }
}
</style>