import {createStore} from 'vuex'
import movie from './movie'
import about from './about'

export default createStore({
  modules: {
    movie, // 원래는 movie: movie로 입력되는 건데 키와 값이 동일하면 생략가능 
    about
  }
})