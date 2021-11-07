<template>
  <div class="printArea">
    <div class="todo gridPattern">
      <span class="title">Todo List</span>
      <button
        class="clearBtn"
        @click="clear(doEls)">
        clear
      </button>
      <button
        class="toggleBtn"
        @click="allToggle(doEls)">
        <i class="fas fa-exchange-alt"></i>
      </button>
      <div class="inner">
        <div
          v-if="doEls.length === 0"
          class="empty">
          <i class="fas fa-ghost"></i>
          <span>No Todo Data</span>
        </div>
        <ul>
          <li
            v-for="El in doEls"
            :key="El"
            @click.self="doneToggle(El)">
            <TodoEl :todo-el="El" />
          </li>
        </ul>
      </div>
    </div>
    <div
      class="done gridPattern">
      <span class="title">Done List</span>
      <button
        class="clearBtn"
        @click="clear(doneEls)">
        clear
      </button>
      <button
        class="toggleBtn"
        @click="allToggle(doneEls)">
        <i class="fas fa-exchange-alt"></i>
      </button>
      <div class="inner">
        <div
          v-if="doneEls.length === 0"
          class="empty">
          <i class="fas fa-ghost"></i>
          <span>No Done Data</span>
        </div>
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
    },
    clear(Els) {
      Els.forEach( async (El) => {
        await this.$store.dispatch('todo/removeTodo', El)
      })
    },
    allToggle(Els) {
      Els.forEach( async (El) => {
        El.done = !El.done
        await this.$store.dispatch('todo/editTodo', El)
      })
    }
  }
}
</script>

<style lang="scss">
.printArea{
  display: flex;
  justify-content: space-between;
}
.todo, .done {
  width: 49%;
  position: relative;
  margin-top: 40px;
  padding: 10px 0;
  border-radius: 8px;
  background-color: #e6e6fa;
  // background-color: #FBDF73;
  height: 430px;
  .title {
    width: 100%;
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    position: absolute;
    top: -30px;
    left: 0;
  }
  .clearBtn {
    position: absolute;
    top: -30px;
    left: 5px;
    background-color: #FBDF73;
    padding: 3px;
    border-radius: 10px;
    width: 50px;
  }
  .toggleBtn {
    position: absolute;
    top: -30px;
    right: 5px;
    background-color: #FBDF73;
    padding: 3px;
    border-radius: 10px;
    width: 50px;
  }
  .inner {
    height: 100%;
    overflow: auto;  
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .empty {
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #abbeec;
    display: flex;
    flex-direction: column;
    align-items: center;
    i {
      font-size: 50px;
      margin-bottom: 10px;
    }
    span {
      text-align: center;
    }
  }
}
ul {
  margin: 0 auto;
  width: 90%;
  li {
    position: relative;
    line-height: 30px;
    font-size: 18px;
    padding: 10px 7px 10px 10px;
    border-radius: 5px;
    &:hover {
      background-color: #abbeec;
      .utils {
        background-color: #abbeec;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 5px;
        display: flex;
        padding: 5px;
        .editBtn, .removeBtn {
          display: inline-block;
          font-size: 20px;
          line-height: 30px;     
        }
        .removeBtn {
          margin-left: 10px;
        }
      }
    }
  }
  li + li {
    margin-top: 5px;
  }
}
.gridPattern {
  background-image: linear-gradient(90deg, transparent 19px, rgba(255,255,255, .4) 1px), linear-gradient(transparent 19px, rgba(255,255,255, .4) 1px);
  background-size: 20px 20px;
}
@media screen and (max-width: 500px) {
  .printArea{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .todo, .done {
      width: 100%;
      min-height: 50px;
      max-height: 300px;   
    }
  }  
}
</style>