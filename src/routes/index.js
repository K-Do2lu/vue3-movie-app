import {createRouter, createWebHashHistory} from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'


export default createRouter({
  // Hash, History 모드 설정 
  // -Hash 모드: https://google.com/#/home 처럼 # 기호를 사용하는 주소체계 
  history:createWebHashHistory(), 

  // page 담당 
  routes: [
    {
      path: '/', // 최상위 페이지(메인 페이지) 경로설정 
      component: Home // 메인 페이지에 연결할 컴포넌트 
    },
    {
      // movie/tt123456 의 형태로 사용할 수 있음
      path: '/movie/:id', // 파라미터를 정의하여 영화의 ID값을 받아와 사용함 ==> Movie.vue에서 넘어옴
      component: Movie 
    },
    {
      path: '/about', 
      component: About 
    },
    {
      // vue router next 공식문서 - dynamic route matching - 404 처리 참고
      path:'/:notFound(.*)', // 404 not found 처리, notFound 라는 문자는 대체가능
      component: NotFound
    }
  ]
})