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
export default {
    data() {
        return {
            newTodoEl: ''
        }
    },
    methods: {
      async addTodo() {
        const addEl = this.newTodoEl
        await this.$store.dispatch('todo/createTodo', addEl)
        this.newTodoEl =''
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
  font-size: 18px;
  margin: 20px 10px 20px 0;
  border-bottom: 3px solid #bf6c85;
}
.addBtn {
  i {
    color: #bf6c85;
    font-size: 30px;
  }
}
</style>