<template>
  <input
    v-model="editText"
    type="text"
    @keyup.enter="editComplete(originEl)"
    @keyup.esc="$emit('updateMode', false)" />
  <div class="edit_utils">
    <button
      class="complete"
      @click="editComplete(originEl)">
      <i class="fas fa-check"></i>
    </button>
    <button
      class="cancel"
      @click="$emit('updateMode', false)">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script>
export default {
    props: {
        originEl: {
            type: Object,
            required: true
        }
    },
    emits: ['updateMode'],
    data() {
        return {
            editText: this.originEl.title
        }
    },
    methods: {
        addTodo() {
            console.log('수정된 내용: ', this.editText)
            this.editText =''
        },
        async editComplete(El) {
            this.editText = this.editText.trim()
            if (this.editText.length !== 0) {
                El.title = this.editText
                await this.$store.dispatch('todo/editTodo', El)
                this.$emit('updateMode', false)
            }
            this.editText = ''
        }
    }
}
</script>

<style lang="scss" scoped>
input{
    height: 30px;
    box-sizing: border-box;
    height: 80%;
    width: calc(100% - 20px);
    font-size: 18px;
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 10px;
    padding: 0 50px 0 10px;
    z-index: 1;
}
.edit_utils {
    position: absolute;
    top: 10px;
    bottom: 10px;
    right: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
    z-index: 2;
    .complete, .cancel {
        font-size: 20px;
    }
    .cancel {
        margin-left: 10px;
    }
}
</style>