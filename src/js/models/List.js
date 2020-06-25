import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };
    this.items.push(item);
  }

  deleteItem(id) {
    // [2,4,8].splice(1,1) -> return 4, original array is [2,8]
    // [2,4,8].slice(1,1) -> return 4, original array is [2,4,8]
    const index = this.items.findIndex((el) => el.id === id);
    this.items.splice(index, 1);
  }
}
