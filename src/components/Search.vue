<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="Search for movies, series, & more" 
      @keyup.enter="apply" />
    <div class="selects">
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name" 
        class="form-select">
        <option
          v-if="filter.name == 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10, // 한 페이지당 읽어올 데이터의 수를 정의
      year: '',
      filters: [
        {
          name:'type',
          items:['movie', 'series','episode']
        },
        {
          name: 'number',
          items: [10,20,30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            const thisYear = new Date().getFullYear() // 현재 년도를 가져옴
            for (let i = thisYear; i >= 1985; i -= 1) {
              years.push(i)
            }
            return years
          })()
        }
      ]
    }
  },
  methods: {
    async apply() { // search movies...
      this.$store.dispatch('movie/searchMovies', { 
        // store의 movie 모듈에서 searchMovies 라는 actions를 실행하며, 
        // payload 라는 매개변수에 아래의 4가지 데이터를 전달(=dispatch)한다. 
        // 아래의 4가지 데이터는 v-model로 연동되어 검색에 따라서 값이 바뀌는 데이터다. 
        title:this.title,
        type:this.type,
        number:this.number,
        year:this.year
      }) 
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  > * {
     margin-right: 10px;
     font-size: 15px;
     &:last-child {
       margin-right: 0 ;
     }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0  ;
  }
}
</style>