import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
    }
  }

  calcTime() {
    // Assuming that we need 15 mins for each 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    // Assuming starter servings are 4
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'teaspoons',
      'teaspoon',
      'ounces',
      'ounce',
      'cups',
      'pounds',
    ];
    const unitsShort = [
      'tbsp',
      'tbsp',
      'tsp',
      'tsp',
      'oz',
      'oz',
      'cup',
      'pound',
    ];

    const calcDivisionString = (str = '0/1') => {
      const arrDiv = str.split('/');
      return parseFloat(arrDiv[0] / arrDiv[1]);
    };

    const sumFractions = ([int = '0', frac = '0/1']) => {
      const sum = parseInt(int, 10) + calcDivisionString(frac);
      return parseFloat(sum);
    };

    const newIngredients = this.ingredients.map((el) => {
      // 1. Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2. Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3. Parse ingredients into count, unit and, ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex((el2) => unitsShort.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // There is a unit
        // Ex. 4 1/2 cups, arrCount = [4, 1/2];
        // Ex. 4 cups, arrCount = [4];
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          if (arrCount[0].includes('-')) {
            // Get float from fractions string w/hyphen (Ex. '4-1/2' to 4.5)
            const arrSum = arrCount[0].split('-');
            count = sumFractions(arrSum);
          } else if (arrCount[0].includes('/')) {
            // Get float from fraction string (Ex. '1/2' to 0.5)
            count = calcDivisionString(arrCount[0]);
          } else {
            count = parseInt(arrCount[0], 10);
          }
        } else {
          // Get float from fractions in array (Ex. ['4', 1/2'] to 4.5)
          count = sumFractions(arrCount);
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' '),
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is NO unit, but 1st element is a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' '),
        };
      } else if (unitIndex === -1) {
        // There is NO unit and NO number in 1st position
        objIng = {
          count: 1,
          unit: '',
          ingredient,
        };
      }
      return objIng;
    });
    this.ingredients = newIngredients;
  }
}
