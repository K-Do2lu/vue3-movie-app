<template>
  <div class="container">
    <!-- container: 부트스트랩에서 제공하는 클래스로 컨텐츠를 가운데 정렬한다-->
    <!-- container: 반응형 레이아웃으로 제작되어 있다. 부트스트랩 공식문서에서 확인가능-->
    <h1>
      <span>OMDb API</span><br /> 
      THE OPEN <br />
      MOVIE DATABASE
    </h1>
    <p>
      The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users. <br />
      If you find this service useful, please consider making a one-time donation or become a patron.
    </p>
  </div>
</template>
<style lang="scss" scoped>

.container {
  padding-top: 40px;
}
h1 {
  line-height: 1;
  font-family: "Oswald", sans-serif;
  font-size: 80px;
  span {
    color: $primary ;
  }
}

p {
  margin: 30px 0;
  color: $gray-600;
}
</style>