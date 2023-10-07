const usersList = JSON.parse(localStorage.getItem('users')) || [
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
];

const saveUsers = localStorage.setItem('users', JSON.stringify(usersList));

export { usersList, saveUsers };
