<template>
  <div class="printArea">
    <div
      class="todo">
      <span>Todo List</span>
      <ul>
        <li
          v-for="El in doEls"
          :key="El"
          @click.self="doneToggle(El)">
          <TodoEl :todo-el="El" />
        </li>
      </ul>
    </div>
    <div
      class="done">
      <span>Done List</span>
      <ul>
        <li
          v-for="El in doneEls"
          :key="El"
          @click.self="doneToggle(El)">
          <TodoEl :todo-el="El" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TodoEl from './TodoEl'

export default {
  components: {
    TodoEl
  },
  computed: {
    doEls() {
      return this.$store.getters['todo/toDoEls']
    },
    doneEls() {
      return this.$store.getters['todo/doneEls']
    }
  },
  async created() {
    await this.$store.dispatch('todo/getTodo')
  },
  methods: {
    async doneToggle(El) {
      El.done = !El.done
      await this.$store.dispatch('todo/editTodo', El)
    }
  }
}
</script>

<style lang="scss">
.printArea{
  display: flex;
  justify-content: space-between;
  // flex-wrap: wrap;
}
.todo, .done {
  width: 49%;
  // min-width: 400px;
  position: relative;
  margin-top: 40px;
  padding: 10px 0;
  border-radius: 8px;
  background-color: #e6e6fa;
  // box-shadow: 3px 3px 8px rgba(0,0,0,.3);
  min-height: 440px;
  span {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    top: -27px;
    left: 0;
  }
}
ul {
  margin: 0 auto;
  width: 90%;
  li {
    position: relative;
    // height: 30px;
    line-height: 30px;
    font-size: 18px;
    padding: 10px 7px 10px 10px;
    border-radius: 5px;
    &:hover {
      background-color: #abbeec;
      .editBtn {
        display: inline-block;
        position: absolute;
        font-size: 20px;
        line-height: 30px;
        top: 11px;
        right: 40px;
      }
      .removeBtn {
        display: inline-block;
        position: absolute;
        font-size: 20px;
        line-height: 30px;
        top: 11px;
        right: 10px;
      }
    }
  }
  li + li {
    margin-top: 5px;
  }
}

</style>