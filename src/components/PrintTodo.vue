<template>
  <ul>
    <li
      v-for="todoEl in todoEls"
      :key="todoEl">
      {{ todoEl.title }}
      <button
        class="removeBtn"
        @click="removeTodo(todoEl)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            todoEls: []
        }
    },
    async created() {
        const { data } = await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'apikey': 'FcKdtJs202110',
            'username': 'KimSiEun'
          }
        })

        this.todoEls = data
    },
    methods: {
      async removeTodo(todoEl) {
        console.log(todoEl)
        await axios({
          url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoEl.id}`,
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'apikey': 'FcKdtJs202110',
            'username': 'KimSiEun'
          }
        })
      }
    }
    
}
</script>

<style lang="scss" scoped>
* {
  // border: 1px solid red;
}
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