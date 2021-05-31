import {createRouter, createWebHashHistory} from 'vue-router'
import Home from './Home'
import About from './About'


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
      path: '/about', // about 페이지 경로 
      component: About // about 페이지에 연결할 컴포넌트 
    }
  ]
})