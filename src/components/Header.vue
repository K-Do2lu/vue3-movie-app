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
          active-class="active"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
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
          href: '/movie/tt4520988'
        },
        {
          name: 'About',
          href: '/about'
        },
      ]
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
  .logo {
    margin-right: 40px;
  }
}
</style>