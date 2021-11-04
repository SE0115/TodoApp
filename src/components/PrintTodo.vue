<template>
  <ul>
    <li
      v-for="todoEl in $store.state.todo.todoEls"
      :key="todoEl">
      <input
        :id="todoEl.id"
        :checked="todoEl.done"
        type="checkbox"
        @change="doneToggle(todoEl)" />
      <label :for="todoEl.id">{{ todoEl.title.split('__@dateSet-expire__Info:')[0] }}</label>
      <button
        class="removeBtn"
        @click="removeTodo(todoEl)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
    async created() {
      await this.$store.dispatch('todo/getTodo')
    },
    methods: {
      async removeTodo(El) {
        await this.$store.dispatch('todo/removeTodo', El)
      },
      async doneToggle(El) {
        await this.$store.dispatch('todo/doneToggle', El)
      }
    }
}
</script>

<style lang="scss" scoped>
ul {
  margin: 0 auto;
  margin-top: 20px;
  width: 90%;
  li {
    position: relative;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    padding: 10px;
    border-radius: 5px;
    input {
      margin-right: 10px;
    }
    input:checked + label {
      text-decoration: line-through;
    }
    .removeBtn {
      display: none;
    }
    &:hover {
      background-color: #e6e6fa;
      .removeBtn {
        display: inline-block;
        position: absolute;
        font-size: 20px;
        line-height: 30px;
        top: 12px;
        right: 10px;
      }
    }
  }
  li + li {
    margin-top: 5px;
  }
}

</style>