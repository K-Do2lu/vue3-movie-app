<template>
  <Header />
  <router-view />
  <!-- router-view: 라우팅 요소가 출력되는 태그-->
  <Footer />
</template> 

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
@import "~/scss/main"; // scss 파일 연동 

</style>