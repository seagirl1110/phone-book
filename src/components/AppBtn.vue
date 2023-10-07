<template>
  <button @click="onClick" class="btn"><slot></slot></button>
</template>

<script>
export default {
  name: 'Btn',
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped>
.btn {
  margin: 10px;
  padding: 5px 10px;
  background-color: #efefef;
  outline: none;
  border: 1px solid #2c3e50;
  border-radius: 2px;
  cursor: pointer;
}
</style>
