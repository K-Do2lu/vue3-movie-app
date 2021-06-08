import {createStore} from 'vuex'
import movie from './movie'
import about from './about'

export default createStore({
  modules: {
    // 원래는 movie: movie로 입력되는건데 키와 값이 동일하면 생략가능 
    // 여기에 등록된 movie라는 이름이, search.vue 컴포넌트에서 apply 메소드에서 사용된 경로의 movie/searchMovies의 movie다. 
    movie, 
    about
  }
})