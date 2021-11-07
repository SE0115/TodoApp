<template>
  <input
    :id="todoEl.id"
    :checked="todoEl.done"
    type="checkbox"
    @change="doneToggle(todoEl)" />
  <label :for="todoEl.id">{{ todoEl.title.split('__@dateSet-expire__Info:')[0] }}</label>
  <EditTodo
    v-if="editMode"
    :origin-el="todoEl"
    :edit-mode="editMode"
    @update-mode="updateMode" />
  <div class="utils">
    <button
      v-if="!editMode"
      class="editBtn"
      @click="editBtn">
      <i class="far fa-edit"></i>
    </button>
    <button
      v-if="!editMode"
      class="removeBtn"
      @click="removeTodo(todoEl)">
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>
</template>

<script>
import EditTodo from './EditTodo'

export default {
    components: {
        EditTodo
    },
    props: {
        todoEl: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            editMode: false
        }
    },
    methods: {
      async removeTodo(El) {
        await this.$store.dispatch('todo/removeTodo', El)
      },
      async doneToggle(El) {
        El.done = !El.done
        await this.$store.dispatch('todo/editTodo', El)
      },
      editBtn() {
        this.editMode = true
      },
      updateMode(Mode) {
          this.editMode = Mode 
      }
    }
}
</script>
<style lang="scss" scoped>
input {
    margin-right: 10px;
}
input:checked + label {
    text-decoration: line-through;
    font-style: italic;
}
.utils {
  .editBtn, .removeBtn {
    display: none;
  }
}
</style>