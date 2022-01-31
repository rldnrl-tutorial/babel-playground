// import "core-js";

const p = Promise.resolve(10);

const obj = {
  a: 10,
  b: 20,
  c: 30,
};
const array = Object.values(obj);
const exist = array.includes(20);
