<template>
  <div id="app">
    <AppBtn @click="openUserAddForm">Добавить</AppBtn>
    <PhoneBook :users="users" />
    <UserAddForm :users="usersFlatList" :isShowForm="isShowUserAddForm" @add-new-user="AddNewUser"
      @close-user-add-from="closeUserAddForm" />
  </div>
</template>

<script>
import AppBtn from './components/AppBtn';
import PhoneBook from './components/PhoneBook';
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
    AddNewUser(name, phone, bossID) {
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
      let boss = null;
      users.forEach((user) => {
        if (user.id === id) {
          boss = user;
        }
        if (user.employees.length > 0) {
          const found = this.findBoss(user.employees, id);
          if (found) {
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
    usersFlatList() {
      return this.getUsersFlatList(this.users);
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
  margin-top: 60px;
  padding: 10px;
}
</style>
