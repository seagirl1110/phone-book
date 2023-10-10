<template>
  <div id="app">
    <div class="center-container">
      <AppBtn @click="openUserAddForm" class="btn-add">Добавить</AppBtn>
      <PhoneBook :users="users" />
      <UserAddForm :users="sortedUsersFlatList" :isShowForm="isShowUserAddForm"
        @add-new-user="addNewUser" @close-user-add-from="closeUserAddForm" />
    </div>
  </div>
</template>

<script>
import AppBtn from './components/AppBtn';
import PhoneBook from './components/PhoneBook/App';
import UserAddForm from './components/UserAddForm';
import { getData, setData } from './api/index';

export default {
  name: 'App',
  components: {
    PhoneBook,
    AppBtn,
    UserAddForm,
  },

  created() {
    this.users = getData();
  },

  data() {
    return {
      users: [],
      isShowUserAddForm: false,
    };
  },

  methods: {
    openUserAddForm() {
      this.isShowUserAddForm = true;
    },

    closeUserAddForm() {
      this.isShowUserAddForm = false;
    },

    addNewUser(name, phone, bossID) {
      const newUser = {
        id: new Date().getTime(),
        name,
        phone,
        isBoss: false,
        employees: [],
      };
      if (bossID !== null) {
        const boss = this.findBoss(this.users, bossID);
        boss.isBoss = true;
        boss.employees.push(newUser);
      } else {
        this.users.push(newUser);
      }
      setData(this.users);
    },

    findBoss(users, id) {
      let boss = users.find(user => user.id === id);
      if (typeof boss !== 'undefined') {
        return boss;
      }
      users.forEach((user) => {
        if (user.employees.length > 0) {
          const found = this.findBoss(user.employees, id);
          if (found !== null) {
            boss = found;
          }
        }
      });
      return boss;
    },

    getUsersFlatList(users) {
      let list = [];
      users.forEach((user) => {
        list.push(user);
        if (user.employees.length > 0) {
          list = [...list, ...this.getUsersFlatList(user.employees)];
        }
      });
      return list;
    },
  },

  computed: {
    sortedUsersFlatList() {
      return (this.getUsersFlatList(this.users)
        .sort((user1, user2) => user1.name.localeCompare(user2.name)));
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<style scoped>
.center-container {
  width: 100%;
  max-width: 800px;
  margin: 30px auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.btn-add {
  width: 100px;
}
</style>
