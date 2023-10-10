<template>
  <div class="phone-book">
    <div class="phone-book__header">
      <div @click="setSortValue('name')" class="phone-book__name">Имя</div>
      <div @click="setSortValue('phone')" class="phone-book__phone">Телефон</div>
    </div>

    <UsersList :users="sortedUsers" />
  </div>
</template>

<script>
import UsersList from './UsersList';

export default {
  name: 'App',
  data() {
    return {
      sort: {
        value: null,
        ascDirection: true,
      },
    };
  },

  components: {
    UsersList,
  },

  props: {
    users: {
      type: Array,
      required: true,
    },
  },

  methods: {
    setSortValue(value) {
      if (this.sort.value === value) {
        this.sort.ascDirection = !this.sort.ascDirection;
      } else {
        this.sort.value = value;
        this.sort.ascDirection = true;
      }
    },

    sortUsers(users) {
      let copyUsersList = JSON.parse(JSON.stringify(users));
      if (this.sort.value === 'name') {
        copyUsersList.sort((user1, user2) => {
          let result = user1.name.localeCompare(user2.name);
          if (!this.sort.ascDirection) {
            result *= (-1);
          }
          return result;
        });
      } else if (this.sort.value === 'phone') {
        copyUsersList.sort((user1, user2) => {
          const phone1 = Number(user1.phone.replace(/\D/g, ''));
          const phone2 = Number(user2.phone.replace(/\D/g, ''));
          let result = phone1 - phone2;
          if (!this.sort.ascDirection) {
            result *= (-1);
          }
          return result;
        });
      }
      copyUsersList = copyUsersList.map((user) => {
        const copyUser = JSON.parse(JSON.stringify(user));
        if (copyUser.employees.length > 0) {
          copyUser.employees = this.sortUsers(copyUser.employees);
        }
        return copyUser;
      });
      return copyUsersList;
    },
  },

  computed: {
    sortedUsers() {
      return this.sortUsers(this.users);
    },
  },
};
</script>

<style scoped>
.phone-book {
  width: 100%;
  margin: 10px;
}

.phone-book__header {
  display: flex;
}

.phone-book__name,
.phone-book__phone {
  flex: 1 1 150px;
  padding: 10px 15px;
  border: 1px solid #cccccc;
  cursor: pointer;
}

.phone-book__name {
  flex: 1 1 150px;
}

.phone-book__phone {
  flex: 0 1 170px;
}
</style>
