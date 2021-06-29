import axios from 'axios'
import _uniqBy from 'lodash/uniqBy' 
// lodash: npm i lodash 명령어를 통해서 설치, 공식문서 있으니 구글링 권장 
// uniqBy: 객체 데이터가 담긴 배열에서 특정 값(ex. key)을 기준으로 설정하여 
//         배열의 중복값을 제거하는 라이브러리

// 언더바(_)를 갖는 변수명은 해당 파일에서만 사용하는 변수임을 명시함 
const _defaultMessage = 'Search for the movie title!'

export default {
  // namespaced: 스토어 모듈임을 명시하는 속성(boolean)
  namespaced: true,

  // state: 데이터를 의미한다.
  state: () => ({ // function() { return {}} 이거랑 () => ({}) 이거랑 동일하다.
    movies: [],
    message: _defaultMessage,
    loading: false, // 로딩 아이콘을 표시하기위한 값
    theMovie: {} // 단일 영화의 상세 정보를 담기위한 객체 
  }),

  // getters: state를 사용하여 computed와 동일한 기능을 수행한다.(일방통행 - state 값 변경 불가)
  getters:{},

  // mutations: methods와 동일한 기능을 수행한다.(쌍방통행 - state 값 변경 가능 )
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
    resetMovies(state) { // 상태(state)값 초기화 
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },

  // actions: mutations에 작성되는 이외의 메소드는 actions에 작성한다.(일방통행 - state 값 변경 불가)
  // context라는 매개변수를 통해 state, getters, mutations에 접근하여 데이터를 사용할 수 있다.  
  
  // 알아야 할 것
  // 1. actions는 비동기적으로 사용할 수 있다. 
  // 2. actions는 state가 아닌 context에 접근이 가능하다. (context가 state를 포함하는 더 큰 개념)
  // 3. context는 state, getters, commit, dispatch을 포함하고 있다. 
  // 4. context를 객체 구조분해하면 context = {state, getters, commit, dispatch} 이다. 
  // 5. commit은 mutations에 접근할 때 사용한다. 
  // 6. dispatch는 actions에 접근할 때 사용한다. 
  actions:{
    async searchMovies({state, commit}, payload) { // 여러 영화의 정보를 가져오는 API 메소드
      // context 또는 payload라는 매개변수의 이름은 언제든지 바뀔 수 있다.
      // 첫번째 매개변수(= context): state, mutations, getters, commit 활용을 위한 매개변수
      // 두번째 매개변수(= payload): 다른 곳으로부터 들어오는 데이터, 매개변수 
      // 공식문서를 좀 읽어야 한다. 
      
      if (state.loading) return
      // 최초에는 loading === false 
      // return 키워드만 남겨두면 메소드가 종료됨. 
      // searchMovies 함수를 동시에 여러번 실행되는 것을 방지하기 위함 

      commit('updateState', { // updateState() - mutations에 등록되어 있는 함수 
        message: '', // message 초기화, message가 넘어온다. 
        loading: true // 로딩 아이콘을 표시하기위한 값 
      })

      try {
        const res = await _fetchMovies({
          ...payload,
          page: 1
        })
        const {Search, totalResults } = res.data // imdb API에 보면 res 안에 저런 데이터가 들어있음 
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID') // imdbID라는 키를 기준으로 중복 값을 걸러준다. 
        })
        const total = parseInt(totalResults, 10) // totalResults를 10진법의 숫자로 변형한다.
        const pageLength = Math.ceil(total/10) // total을 10으로 나눈값을 올림처리 - 페이지 개수 설정
        
        // 추가요청 
        if (pageLength > 1) {
          for(let page = 2; page <= pageLength; page += 1) {
            if(page > (payload.number / 10)) break  // 한 페이지에서 읽는 데이터의 수를 검증 number 기본값은 10
            const res = await _fetchMovies({
              ...payload,
              page // page: page 와 동일한 표현식
            })
            const {Search} = res.data
            commit('updateState', { 
              // 기존의 movies의 데이터를 포함하고
              // 새로 불러온 페이지의 검색결과를 추가하는 방법 
              movies: [
                ...state.movies,
                ..._uniqBy(Search, 'imdbID')
              ] // ... = 전개연산자 
            }) 
          }
        }
      } catch(error) { // error객체를 안쓰고 구조분해를 통해 {message}로 또한 사용가능 
        commit('updateState', {
          movies: [],
          message: error.message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({state, commit}, payload) {
      if(state.loading) return

      commit('updateState', {
        theMovie: {}, //메소드가 실행될 때마다 객체를 초기화
        loading: true
      })

      try{
        const res = await _fetchMovies(payload)
        console.log("res = ", res)
        commit('updateState', {
          theMovie: res.data
        })
      }catch (error){
        commit('updateState',{
          theMovies: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

// 언더바로 시작하는 함수는 현재 파일에서만 사용되는 함수임을 의미한다. 
// fetchMovies(): 영화 데이터를 가져오는 메소드
// 기존에 searchMovies안에 있던 내용인데 분리함.
async function _fetchMovies(payload) {
  // GET이 아니라 POST를 사용하는 이유 - 보안
  // GET - 데이터를 URL에 포함시켜서 넘김 
  // POST - 데이터를 문자열로 변환하여 body에 담아서 전달함. URL에 표시안됨
  return await axios.post('/.netlify/functions/movie', payload) // 매개변수 - 전달할 페이지, 전달할 데이터

  // serverless 함수 사용으로 인해 더이상 사용하지 않는 코드 
  // const { title, type, year, page, id} = payload
  // const OMDB_API_KEY = '7035c60c'
  // const url = id  // id값이 있는 경우와 없는 경우를 나눈 삼항연산자
  // ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
  // : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  // return new Promise((resolve, reject) => {
  //   axios.get(url) 
  //   .then((res) => {
  //     if(res.data.Error) {
  //       reject(res.data.Error)
  //     }
  //     resolve(res)
  //   })
  //   .catch((err) => {
  //     reject(err.message)
  //   }) 
  // })
}