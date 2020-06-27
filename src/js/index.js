// Global app controller
// URL for API: http://forkify-api.herokuapp.com/

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

// Global state
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
const state = {};

// SEARCH CONTROLLER
const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput();
  console.log(query);
  if (query) {
    // 2. Create new Search object and add to state
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4. Search for recipes
      await state.search.getResults();

      // 5. Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      console.log('Error searching recipes!', error);
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

// RECIPE CONTROLLER

const controlRecipe = async () => {
  // 1. Get id from url hash
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // 2. Create new Recipe object and add to state
    state.recipe = new Recipe(id);

    // 3. Prepare UI for recipe
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    try {
      // 4. Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // 5. Calc servings/time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // 6. Render recipe on UI
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      console.log('Error processing recipe!', error);
    }
  }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach((event) => {
  window.addEventListener(event, controlRecipe);
});

// LIST CONTROLLER

const controlList = () => {
  // Create a new list IF there is none yet
  // Add each ingredient to the list
  // Render each ingredient on the list
};

// Handling recipe btn clicks
elements.recipe.addEventListener('click', (e) => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease when button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase when button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  }
});
