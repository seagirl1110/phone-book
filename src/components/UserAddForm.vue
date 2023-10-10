<template>
  <div v-show="isShowForm" class="form-wrapper">
    <div class="form">
      <div class="form__header">
        <div class="form__title">Добавление пользователя</div>
        <AppBtn @click="onCloseBtnClick" class="form__btn-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path fill="#2c3e50" d="M19.7 4.3c-0.4-0.4-1-0.4-1.4 0l-6 6-6-6c-0.4-0.4-1-0.4-1.4
              0s-0.4 1 0 1.4l6 6-6 6c-0.4 0.4-0.4 1 0 1.4 0.4 0.4 1 0.4 1.4 0l6-6 6 6c0.4 0.4 1 0.4
              1.4 0s0.4-1 0-1.4l-6-6 6-6c0.4-0.4 0.4-1 0-1.4z" />
          </svg>
        </AppBtn>
      </div>

      <div class="form__item form-item">
        <label for="name" class="form-item__label">Имя</label>
        <input v-model="nameValue" @input="validateFormData" type="text" id="name"
          class="form-item__data">
      </div>

      <div class="form__item form-item">
        <label for="phone" class="form-item__label">Телефон</label>
        <input v-model="phoneValue" @input="validateFormData" type="tel" v-mask="'+7 ### ### ## ##'"
          placeholder="+7 999 000 00 00" id="phone" class="form-item__data">
      </div>

      <div class="form__item form-item">
        <div class="form-item__label">Начальник</div>
        <select v-model="bossValue" name="boss" class="form-item__data">
          <option :value=null class="form-item__value"></option>
          <option v-for="user in users" :key="user.id" :value="user.id" class="form-item__value">
            {{ user.name }}
          </option>
        </select>
      </div>

      <div v-if="formErrors.length > 0" v-for="error in formErrors" :key="error"
        class="form__error-data">
        {{ error}}
      </div>

      <AppBtn @click="onSaveBtnClick">Сохранить</AppBtn>
    </div>
  </div>
</template>

<script>
import AppBtn from './AppBtn';

export default {
  name: 'UserAddForm',
  components: {
    AppBtn,
  },
  data() {
    return {
      nameValue: null,
      phoneValue: null,
      bossValue: null,
      formErrors: [],
    };
  },

  props: {
    users: {
      type: Array,
    },
    isShowForm: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    onCloseBtnClick() {
      this.$emit('close-user-add-from');
    },

    onSaveBtnClick() {
      if (!this.validateFormData()) {
        return;
      }
      this.$emit('add-new-user', this.nameValue, this.phoneValue, this.bossValue);
      this.nameValue = null;
      this.phoneValue = null;
      this.bossValue = null;
    },

    validateFormData() {
      this.formErrors = [];
      if (this.nameValue === null || this.nameValue.trim() === '') {
        this.formErrors.push('Не заполнено поле "Имя"');
      }
      if (this.phoneValue === null || this.phoneValue.trim() === '') {
        this.formErrors.push('Не заполнено поле "Телефон"');
      } else if (this.phoneValue.length < 16) {
        this.formErrors.push('Телефонный номер введен не полностью');
      }
      return this.formErrors.length === 0;
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(177, 185, 192, 0.9);
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
  width: 100%;
  max-width: 350px;
  height: auto;
  min-height: 300px;
  margin: 20px;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #a3acdc;
  border-radius: 10px;
  box-shadow: 0 0 10px #2a5178;
}

.form__header,
.form__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px 10px;
}

.form-item__data {
  width: 180px;
  height: 30px;
  padding: 5px 10px;
}

.form__btn-close {
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
}

.form__error-data {
  color: #ec928f;
}
</style>
