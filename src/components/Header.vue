<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <!-- 반복문을 활용한 네비게이션 만들기 -->
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <!-- RouterLink: Vue에서 a태그 대신 사용하는 컴포넌트-->
        <RouterLink 
          :to="nav.href"
          :class="{ active: isMatch(nav.path) }"
          active-class="active"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo'
export default {
  components: {
    Logo
  }, 
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/ // /movie로 시작하는 경로인 경우의 정규표현식
        },
        {
          name: 'About',
          href: '/about'
        },
      ]
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ])
  },
  methods: {
    isMatch(path) {
      if(!path) return false
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      this.$router.push('/about') //<RouterLink/>와 to 옵션을 사용하지 않고 링크를 만드는 방법
    }
  }
}
</script>
<style lang="scss" scoped>

header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 65px;
    height: 65px;
    padding: 7px; 
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 10px;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($primary, 1%);
    }
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  @include media-breakpoint-down(sm) { // 부트스트랩 반응형
    .nav{
      display: none;
    }
  }
}
</style>