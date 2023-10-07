<template>
  <ul class="users">
    <li v-for="user in users" :key="user.id" class="user">
      <div class="user__info-wrapper">
        <div class="user__info user-info--name" @click="toggleShowEmployess">
          <div class="user__is-boss">{{ user.isBoss ? '+' : '' }}</div>
          <div>{{ user.name }}</div>
        </div>
        <div class="user__info user-info--phone">{{ user.phone }}</div>
      </div>
      <UsersList v-if="user.employees.length > 0" :users="user.employees" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'UsersList',
  data() {
    return {
      isShowEployess: false,
    };
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleShowEmployess() {
      this.isShowEployess = !this.isShowEployess;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.users {
  list-style-type: none;
}

.user__info-wrapper {
  display: flex;
}

.user__info {
  display: flex;
  column-gap: 10px;
  padding: 10px;
  border: 1px solid #cccccc;
}

.user-info--name {
  flex: 1 1 150px;
}

.user-info--phone {
  flex: 0 1 170px;
}

.user__is-boss {
  width: 10px;
}

.users .users {
  margin-left: 10px;
}
</style>
