<template>
  <div class="container">
    <tempalte v-if="loading"> 
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader 
        :size="3"
        :z-index="9" 
        fixed /> <!-- fixed와 같은 boolean속성은 명시하는 것을 true로  인식 -->
    </tempalte>
    <div
      v-else
      class="movie-details">
      <div 
        :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})`}"
        class="poster">
        <Loader
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div 
              v-for="{Source: name, Value: score} in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <img
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3> 
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3> 
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3> 
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from '~/components/Loader'

export default {
  components: {
    Loader,
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    theMovie() {
      return this.$store.state.movie.theMovie
    },
    loading() {
      return this.$store.state.movie.loading
    }
  },
  created() {
    console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithId', {
      // movie/tt123456
      id: this.$route.params.id 
    })
  },
  methods: {
    requestDiffSizeImage(url, size = 700) {
      // url을 사용한 이미지 리사이징
      if(!url || url === 'N/A') { // 포스터 정보가 없어서 배경이미지를 대체해야 되는 경우 
        this.imageLoading = false
        return '' // 포스터가 없는경우 빈 문자데이터를 반환함(아무것도 표시안됨) 
      } 
      //아래의 코드는 위의 if 조건문에 걸리지 않으면 실행될 코드 => 이미지 리사이징
      const src = url.replace('SX300', `SX${size}`)
      this.$loadImage(src)
        .then(() => {
          this.imageLoading = false
        })
      return src
      // loadImage는 비동기 메소드인데 await,async 키워드를 이 메소드에 달면 
      // 이미지 주소가 로딩이 끝나고 나서 반환된다는 문제점이 생김
      // 이미지 주소는 우선 반환되고 이미지 로딩을 비동기로 분리해서 처리하기 위해서 then()을 사용함 
      // 이런 경우가 async/await를 사용할 수 없는 상황임.
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/scss/main";

.container{
  padding-top: 40px;
}
.skeletons {
  display: flex;
  .poster {
    flex-shrink: 0; // 감소너비를 사용하지 않음 => 화면이 줄어도 포스터 안줄어듬
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;

  }
  .specs {
    flex-grow: 1; // flex는 기본적으로 최소 width를 사용함. 1로 설정하면 최대 width를 사용함
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      margin-top: 20px;
      width: 60%;
      height: 30px;
    }
    &.plot {
      margin-top: 20px;
      width: 100%;
      height: 250px;
    }
    &.etc {
      margin-top: 20px;
      width: 50%;
      height: 50px;
    }
  }
}
.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
    position: relative;
  }
  .specs {
    flex-grow: 1;
    .title {
      color: black;
      font-family: 'Oswald', sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color:$primary;
      span {
        &::after { // 점 표시 
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot{
      margin-top: 20px;
    }
    .ratings{
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3{
      margin: 24px 0 6px;
      color: black;
      font-family: 'Oswald',sans-serif;
      font-size: 20px;
    }
  }
  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * 3/2;
      margin-right: 40px;
    }
  }
  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }
  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>