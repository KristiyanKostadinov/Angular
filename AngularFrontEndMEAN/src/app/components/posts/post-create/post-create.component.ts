import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {PostService} from "../post.service";

@Component({
  templateUrl:"post-create.component.html",
  selector:"app-post-create",
  styleUrls:["post-create.component.css"]
})

export class PostCreateComponent{
  public enteredTitle: string = '';
  public enteredContent: string = '';
  public postsService: PostService;


  constructor(postsService: PostService) {
    this.postsService = postsService;
  }

  onAddPost(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}

