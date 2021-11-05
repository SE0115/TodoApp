<template>
  <input
    v-model="editText"
    type="text"
    @keyup.enter="editComplete(originEl)" />
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
            El.title = this.editText
            await this.$store.dispatch('todo/editTodo', El)
            this.editText = ''
            this.$emit('updateMode', false)
        }
    }
}
</script>

<style scoped>
input{
    height: 30px;
    width: calc(100% - 50px);
    font-size: 18px;
    background-color: #ffffff;
    /* background-color: #e7d3ee; */
    position: absolute;
    top: 50%;
    margin-top: -15px;
    left: 30px;
    padding-left: 10px;
}
button {
    position: absolute;
    font-size: 20px;
    top: 10px;
    right: 17px;
}
.complete {
    right: 40px;
}
</style>