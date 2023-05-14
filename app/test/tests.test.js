const modelFilter = require('../components/Filter');
const brandFilter = require('../components/Filter');

const testArray = [
  {
    createdAt: "2022-03-30T05:50:53.201Z",
    name: "Test Name",
    image: "http://placeimg.com/640/480/sports",
    price: "802.00",
    description: "Repudiandae minima non molestiae. Vitae in qui sed. Est voluptas facilis corrupti autem molestiae quaerat provident neque. Possimus sit minus dolor iste.\n \rVoluptas temporibus corporis autem dolores culpa omnis fugiat impedit. Ipsa et minima vel eveniet nam et eaque. Dolor ut assumenda corrupti necessitatibus enim corporis ea eos eligendi. Vel quia esse et animi.\n \rQuas rerum quas vel. Vel rerum nam minima harum est dicta deleniti illo repellendus. Velit totam earum. Nostrum ut incidunt nulla magni et quia et.",
    model: "TestModel",
    brand: "TestBrand",
    id: 1
  },
  {
    createdAt: "2022-03-30T05:50:53.201Z",
    name: "TestName1",
    image: "http://placeimg.com/640/480/sports",
    price: "802.00",
    description: "Repudiandae minima non molestiae. Vitae in qui sed. Est voluptas facilis corrupti autem molestiae quaerat provident neque. Possimus sit minus dolor iste.\n \rVoluptas temporibus corporis autem dolores culpa omnis fugiat impedit. Ipsa et minima vel eveniet nam et eaque. Dolor ut assumenda corrupti necessitatibus enim corporis ea eos eligendi. Vel quia esse et animi.\n \rQuas rerum quas vel. Vel rerum nam minima harum est dicta deleniti illo repellendus. Velit totam earum. Nostrum ut incidunt nulla magni et quia et.",
    model: "TestModel1",
    brand: "TestBrand1",
    id: 1
  },
  {
    createdAt: "2022-03-30T05:50:53.201Z",
    name: "TestName2",
    image: "http://placeimg.com/640/480/sports",
    price: "802.00",
    description: "Repudiandae minima non molestiae. Vitae in qui sed. Est voluptas facilis corrupti autem molestiae quaerat provident neque. Possimus sit minus dolor iste.\n \rVoluptas temporibus corporis autem dolores culpa omnis fugiat impedit. Ipsa et minima vel eveniet nam et eaque. Dolor ut assumenda corrupti necessitatibus enim corporis ea eos eligendi. Vel quia esse et animi.\n \rQuas rerum quas vel. Vel rerum nam minima harum est dicta deleniti illo repellendus. Velit totam earum. Nostrum ut incidunt nulla magni et quia et.",
    model: "TestModel2",
    brand: "TestBrand2",
    id: 1
  }
]

test('Get model from test array', () => {
  expect(modelFilter(testArray, "TestModel")).toBe(true);
});

test('Get brand from test array', () => {
  expect(brandFilter(testArray, "TestName")).toBe(true);
});