import axios from 'axios'
export default {
  // namespaced: 스토어 모듈임을 명시하는 속성(boolean)
  namespaced: true,

  // state: 데이터를 의미한다.
  state: () => ({ // function() { return {}} 이거랑 () => ({}) 이거랑 동일하다.
    movies: []
  }),

  // getters: state를 사용하여 computed와 동일한 기능을 수행한다.
  getters:{},

  // mutations: methods와 동일한 기능을 수행한다.
  // 주의사항: mutations를 통해서만 state의 값을 변경할 수 있다. 다른 곳에서는 값을 변경할 수 없다. 
  mutations: {
    updateState(state, payload) { 
      // updateState 메소드는 mutations에서 state를 갱신할 때, 일일히 해당 데이터의 메소드를 만드는 것이 귀찮으니까 
      // 한번에 모든 state의 값을 갱신할 수 있는 기능을 담당하는 메소드다. 
      // Object.keys: 키값으로 배열을 만들어 반환함 => ['movies', 'message', 'loading]
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      }) 

    },
    resetMovies(state) {
      state.movies = []
    }
  },

  // actions: 값을 변경하는 메소드는 mutations에 작성하고 나머지 메소드는 actions에 작성한다.
  // 주의사항
  // 1. actions는 비동기적으로 작동한다. 
  // 2. actions는 state가 아닌 context에 접근이 가능하다. (context가 state를 포함하는 더 큰 개념)
  // 3. context는 state, getters, commit을 포함하고 있다. 
  // 4. 객체 구조분해를 사용하면 context = {state, getters, commit} 이다. 
  actions:{
    async searchMovies({commit}, payload) { 
      // context 또는 payload라는 매개변수의 이름은 언제든지 바뀔 수 있다.
      // 첫번째 매개변수(= context): state, mutations, getters 활용을 위한 매개변수
      // 두번째 매개변수(= payload): 다른 곳으로부터 들어오는 데이터, 매개변수 
      // 공식문서를 좀 읽어야 한다. 
      const {title, type, number, year} = payload
      const OMDB_API_KEY = '7035c60c'

      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`) 
      const {Search, totalResults } = res.data // imdb API에 보면 res 안에 저런 데이터가 들어있음 
      commit('updateState', {
        movies: Search
      })
    }
  }
}