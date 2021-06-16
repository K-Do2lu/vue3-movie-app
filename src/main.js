import {createApp} from 'vue'
import App from './App'
import router from './routes/index.js'
import store from './store'
import loadImage from './plugins/loadImage'
// 원래는 './store/index.js' 이렇게 경로를 작성해야 하는데, 
// 어떤 폴더안에 있는 index.js 파일을 가져올 때는 파일명을 생략할 수 있다. 
// 그러므로 자주 사용되는 파일을 만들 때 index라는 이름을 사용하는 것이 좋다. 

createApp(App)
  .use(router) // 플러그인 $route, $router
  .use(store) // 플러그인 $store
  .use(loadImage) // 플러그인 $loadImage
  .mount('#app')
