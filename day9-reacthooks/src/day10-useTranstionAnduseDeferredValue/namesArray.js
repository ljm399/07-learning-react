import {faker} from '@faker-js/faker'
// const nameArray = Array(10).map(() => {
//   console.log('nh')
// 这种方式更直观
const nameArray = Array.from({ length: 100 }, () => {
  return faker.person.fullName();
});

export default nameArray