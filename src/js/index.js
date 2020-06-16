// Global app controller
// URL for API: http://forkify-api.herokuapp.com/

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

// Global state
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
const state = {};

const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput(); // TODO in searchView
  console.log(query);
  if (query) {
    // 2. Create new Search object and add to state
    state.search = new Search(query);

    // 3. Prepare UI for results

    // 4. Search for recipes
    await state.search.getResults();

    // 5. Render results on UI
    console.log(state.search.result);
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});
