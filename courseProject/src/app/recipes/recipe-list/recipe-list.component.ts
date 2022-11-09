import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipes.model";
import {RecipesService} from "../recipes.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {
 @Output() pastRecipe = new EventEmitter<Recipe>()
  recipes: Recipe[] ;
  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.recipes=this.recipeService.getRecipes();
  }

  onRecipeSelected(recipe: Recipe){
      this.pastRecipe.emit(recipe);
  }
}
