const getData = () =>
  JSON.parse(localStorage.getItem('users')) || [];

const setData = (data) => {
  localStorage.setItem('users', JSON.stringify(data));
};

export { getData, setData };
