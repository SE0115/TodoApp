<template>
  <div>
    <input
      v-model="newTodoEl"
      type="text"
      placeholder="Add todo :)"
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
        this.newTodoEl = this.newTodoEl.trim()
        if(this.newTodoEl.length !== 0) {
          const addEl = this.newTodoEl
          await this.$store.dispatch('todo/createTodo', addEl)
        }
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
  border-bottom: 3px solid #f69698;
}
.addBtn {
  i {
    color: #f69698;
    font-size: 30px;
  }
}
</style>