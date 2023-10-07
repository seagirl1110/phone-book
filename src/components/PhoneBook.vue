<template>
  <div class="phone-book">
    <div class="phone-book__header">
      <div class="phone-book__name">Имя</div>
      <div class="phone-book__phone">Телефон</div>
    </div>
    <UsersList :users="users" />
  </div>
</template>

<script>
import UsersList from './UsersList';

export default {
  name: 'PhoneBook',
  components: {
    UsersList,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.phone-book {
  width: 100%;
  max-width: 700px;
}

.phone-book__header {
  display: flex;
}

.phone-book__name,
.phone-book__phone {
  flex: 1 1 150px;
  padding: 10px 15px;
  border: 1px solid #cccccc;
}

.phone-book__name {
  flex: 1 1 150px;
}
.phone-book__phone {
  flex: 0 1 170px;
}
</style>
