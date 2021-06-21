<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute />
      <img
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    ...mapState('about', [ // state의 about이라는 모듈 안에 있는 데이터를 가져온다는 의미
      // 전개연산자(...)를 사용하는 이유는 
      // mapState()에서 반환된 결과가 computed 객체데이터 내부에서 등록 되도록 하기 위함. 
      'image',
      'name',
      'email',
      'phone',
      'blog'
    ]
    ),
  },
  mounted() { // 라이프 사이클에서는 비동기 처리가 안됨
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  },
}
</script>
<style lang="scss" scoped>

.about {
  text-align: center;
  .photo {
    width:250px;
    height: 250px;
    margin: 40px auto 20px; //상 중 하
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;

    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .name {
    font-size: 40px;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 20px;
  }
}
</style>