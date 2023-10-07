<template>
  <div id="app">
    <AppBtn @click="openUserAddForm">Добавить</AppBtn>
    <!-- <AppBtn @click="usersFlatList(users)">New users</AppBtn> -->
    <PhoneBook :users="users" />
    <UserAddForm :users="usersFlatList" :isShowForm="isShowUserAddForm" @add-new-user="AddNewUser"
      @close-user-add-from="closeUserAddForm" />
  </div>
</template>

<script>
import AppBtn from './components/AppBtn';
import PhoneBook from './components/PhoneBook';
import UserAddForm from './components/UserAddForm';

export default {
  name: 'App',
  components: {
    PhoneBook,
    AppBtn,
    UserAddForm,
  },
  data() {
    return {
      users: [
        {
          id: 1,
          name: 'Марина',
          phone: '+7 941 123 21 42',
          isBoss: false,
          employees: [],
        },
        {
          id: 2,
          name: 'Петр',
          phone: '+7 941 123 21 42',
          isBoss: false,
          employees: [],
        },
        {
          id: 3,
          name: 'Алексей',
          phone: '+7 941 123 21 42',
          isBoss: true,
          employees: [
            {
              id: 4,
              name: 'Иван',
              phone: '+7 941 123 21 42',
              isBoss: true,
              employees: [
                {
                  id: 5,
                  name: 'Ирина',
                  phone: '+7 941 123 21 42',
                  isBoss: false,
                  employees: [],
                },
              ],
            },
          ],
        },
        {
          id: 6,
          name: 'Борис',
          phone: '+7 941 123 21 42',
          isBoss: false,
          employees: [],
        },
      ],
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
        const index = this.users.findIndex(user => user.id === bossID);
        this.users[index].isBoss = true;
        this.users[index].employees.push(newUser);
      } else {
        this.users.push(newUser);
      }
    },
    getUsersFlatList(users) {
      let list = [];
      users.forEach((user) => {
        list.push(user);
        if (user.employees.length > 0) {
          list = [...list, ...this.getUsersFlatList(user.employees)];
        }
      });
      console.log(list);
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
