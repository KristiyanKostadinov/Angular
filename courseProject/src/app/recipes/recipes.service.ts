import {Recipe} from "./recipes.model";


export class RecipesService{
  private recipes: Recipe[] = [
    new Recipe("Test RECIPE", "Test", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=375,341"),
    new Recipe("Another Test", "Test", "https://www.simplyrecipes.com/thmb/mbN8mXZ0srgAT1YrDU61183t0uM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg")
  ];

  getRecipes(){
    return this.recipes.slice();
  }
}
