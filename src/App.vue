<template>
  <TodoHeader />
  <CreateTodo />
  <PrintTodo />
</template> 

<script>
import TodoHeader from '~/components/TodoHeader'
import CreateTodo from '~/components/CreateTodo'
import PrintTodo from '~/components/PrintTodo'

export default {
    components: {
        TodoHeader,
        CreateTodo,
        PrintTodo
    },
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
h1 {
  font-size: 40px;
  text-align: center;
}
</style>