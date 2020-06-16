// Global app controller
// URL for API: http://forkify-api.herokuapp.com/

import Search from './models/Search';

// Global state
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
const state = {};

const search = new Search('pizza');

console.log(search);
search.getResults();
