<template>
  <RouterLink
    to="/"
    class="logo">
    <span>OMDbAPI</span>.com
  </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: $black; // main.scss의 bootstrap의 variables 파일에서 넘어오는 변수
  text-decoration: none;
  &:hover { //가상 클래스 선택자 
    color: $black;
  }
  span {
    color: $primary;
  }
}
</style>