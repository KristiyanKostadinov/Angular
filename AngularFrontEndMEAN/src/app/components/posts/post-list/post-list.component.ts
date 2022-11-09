import {Component, OnDestroy, OnInit} from "@angular/core";
import {Post} from "../../../types";
import {PostService} from "../post.service";
import {Subscription} from "rxjs";

@Component({
  templateUrl: "post-list.component.html",
  selector: "app-post-list",
  styleUrls: ["post-list.component.css"]
})
export class PostListComponent implements OnInit,OnDestroy {

  /*posts = [
    {title: 'First Post', content: "This is the first post's content"},
    {title: 'Second Post', content: "This is the second post's content"},
    {title: 'Third Post', content: "This is the third post's content"},
  ];*/

  posts: Post[] = [];
  public postsService: PostService;
  private postsSub: Subscription | undefined;

  constructor(postsService: PostService) {
    this.postsService = postsService;
  }

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postsSub=this.postsService.getPostUpdatedListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }


}
