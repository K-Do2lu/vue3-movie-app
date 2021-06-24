// serverless function은 node js 환경에서 동작한다. 
// 그러므로 node js 환경에서는 import/export를 사용하지 않고 
// require/exports 라는 객체를 이용한다. 
const axios = require('axios') // axios 사용을 위한 패키지 가져오기 
const { OMDB_API_KEY } = process.env

exports.handler = async function(event) { // 사용 가능한 매개변수는 event와 context가 있다.  
  // serverless 함수는 반드시 비동기로 동작해야 한다.
  // 아래 내용은 영화 검색기능 부분인 _fetchMovies() 함수의 내용을 복붙한 후 수정한 코드다.
  console.log(event)
  // payload를 받아오는 방법 - 데이터를 주고 받을때, 용량의 문제로 데이터가 문자타입으로 넘어온다. 
  // payload는 JSON 객체 형태를 갖고 있기 때문에 JSON.parse()를 통하여 다시 JSON화 시켜준다. 
  const payload = JSON.parse(event.body)
  const { title, type, year, page, id} = payload

  //const OMDB_API_KEY = '7035c60c' ==> .env파일에서 넘어오도록 전역변수를 위에 설정함

  const url = id  // id값이 있는 경우와 없는 경우를 나눈 삼항연산자
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try { // 비동기 함수이므로 아래의 코드를 비동기 형태로 최적화 한다. 
    const {data} = await axios.get(url)
    if(data.Error) {
      return { 
        // netlify serverless 함수에 맞는 형태로 수정한다. 
        // netlify serverless 함수는 statusCode와 body를 반드시 반환해야 한다. 
        // body는 문자열만 작성할 수 있다. 
        statusCode: 400,
        body: data.Error // Error는 에러 메세지를 담고 있다 === 문자데이터
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data) 
      // data는 json 형태의 데이터를 갖고 있기 때문에
      // stringify를 사용하여 문자 형식으러 변경한다. 
    }

  } catch (error) {
    return {
      statusCode: error.response.status, // axios 공식문서 참조
      body: error.message
    }
  }
}