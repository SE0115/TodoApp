import axios from 'axios'
export default {
    namespaced: true,
    // data
     state: () => ({
        todoEls: []
    }),
    // computed
    getters: {
        todoEls(state) {
            return state.todoEls
        }
    },
    // 변이 메소드 (데이터 수정 권한 o)
    mutations: {
        assignState(state, payload) {
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        addTodoEl(state, todoEl) {
            state.todoEls.push(todoEl)
        },
        removeTodoEl(state, id) {
            state.todoEls = state.todoEls.filter(El => El.id !== id)
        }
    },
    // 액션 메소드 (데이터 수정 권한 x, 비동기)
    actions: {
        async getTodo({ commit }) {
            const { data } = await axios({
                url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
                method: 'GET',
                headers: {
                'content-type': 'application/json',
                'apikey': 'FcKdtJs202110',
                'username': 'KimSiEun'
                }
            })
            commit('assignState', {todoEls: data})
        },
        async createTodo({ commit }, addEl) {
            const { data } = await axios({
              url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                'apikey': 'FcKdtJs202110',
                'username': 'KimSiEun'
              },
              data: {
                'title': addEl
              }
            })
            commit('addTodoEl', data)
        },
        async removeTodo({ commit }, removeEl) {
            await axios({
                url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${removeEl.id}`,
                method: 'DELETE',
                headers: {
                  'content-type': 'application/json',
                  'apikey': 'FcKdtJs202110',
                  'username': 'KimSiEun'
                }
            })
            commit('removeTodoEl', removeEl.id)
        }
    }
}