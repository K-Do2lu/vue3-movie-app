export default {
  // namespaced: 스토어 모듈임을 명시하는 속성(boolean)
  namespaced: true,

  // state: 데이터를 의미한다.
  state: () => ({ // function() { return {}} 이거랑 () => ({}) 이거랑 동일하다.
    movies: []

  }),

  // getters: state를 사용하여 computed와 동일한 기능을 수행한다.
  getters:{
    movieIds(state) {
      return state.movies.map(m => m.imdbID) 
      // (m => m.imdbID)의 의미: 매개변수 m을 받아서 m.imdbID로 반환한다. 
    }
  },

  // mutations: methods와 동일한 기능을 수행한다.
  // 주의사항: mutations를 통해서만 state의 값을 변경할 수 있다. 다른 곳에서는 값을 변경할 수 없다. 
  mutations: {
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
    searchMovies(context) { // 매개변수를 context 대신 객체 구조분해하여 {state, getters, commit} 이렇게 작성 가능하며, 사용할 매개변수만 작성할 수 있다. 
      context.state,
      context.getters,
      context.commit
    }
  }
}