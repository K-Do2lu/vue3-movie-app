<template>
  <div>
    <div
      :style="{ backgroundImage: `url(${movie.Poster})` }"
      class="movie">
      <Loader 
        v-if="imageLoading" 
        :size="1.5"
        absolute />
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
import Loader from '~/components/Loader'

export default {
  components: {
    Loader,
  },
  props: {
    movie: {
      type: Object,
      default: () => ({})  // function() { return {} } 과 동일 
    }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  mounted() { 
    // created를 사용하지 않는 이유 = 컴포넌트가 생성된 직후 = HTML 구조가 연결된 직후가 아님
    // mounted는 HTML 구조가 연결된 직후를 의미함. 기억할 것.
    this.init()
  },
  methods: {
    async init() { // 이미지가 로딩될 동안 작동할 함수 
      // const img = document.createElement('img')
      // img.src = this.movie.Poster // img.src에 포스터의 이미지 주소가 들어감 
      // img.addEventListener('load', () => { // 화살표 함수로 작성해야 전역변수의 느낌으로 this를 통해 접근 가능 
      // // 만약 function() {return} 이런 형식으로 사용하면 this는 메소드 내의 변수에만 접근 가능하기 때문
      //   this.imageLoading = false // 이미지 로딩이 완료되면 false로 바꿈 
      // }) 이 부분이 loadImage.js에 정의한 plugin으로 대체됨. 아래는 플러그인 호출하는 코드
      
      await this.$loadImage(this.movie.Poster)
      // loadImage 플러그인이 비동기로 promise를 반환하기 때문에 async와 await 키워드를 붙여줌
      this.imageLoading = false

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