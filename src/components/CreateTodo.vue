<template>
  <div>
    <input
      v-model="newTodoEl"
      type="text"
      placeholder="추가 내용 입력 ^^"
      @keyup.enter="addTodo" />
    <button
      class="addBtn"
      @click="addTodo">
      <i class="far fa-plus-square"></i>
    </button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            newTodoEl: ''
        }
    },
    methods: {
      async addTodo() {
        await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'apikey': 'FcKdtJs202110',
            'username': 'KimSiEun'
          },
          data: {
            'title': this.newTodoEl
          }
        })
        console.log(this.newTodoEl)
        this.newTodoEl=''
        
      }
    }
}
</script>

<style lang="scss" scoped>
div {
  display: flex;
  justify-content: center;
}
input {
  width: 80%;
  height: 30px;
  text-align: center;
  margin: 10px 10px 0 0;
  border-bottom: 3px solid #bf6c85;
  &::placeholder {
    font-size: 18px;
  }
}
.addBtn {
  i {
    color: #bf6c85;
    font-size: 30px;
  }
}
</style>