import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  fetchingPosts = false;

  constructor(private http: HttpClient,private postsService : PostsService) {}

  ngOnInit() {
    this.fetchingPosts = true;
    this.postsService.fetchPost().subscribe(
      posts => {
        this.loadedPosts = posts;
        this.fetchingPosts = false;
      }
    )
  }

  onCreatePost(postData: Post) {
    this.fetchingPosts = true;
      this.postsService.createAndStorePost(postData).subscribe(
        () => {
          this.fetchingPosts = false;
          this.fetchPosts();
        }
      );
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(
      () => {
        this.loadedPosts = [];
      }
    )
  }

  private fetchPosts() {
    this.fetchingPosts = true;
    this.postsService.fetchPost().subscribe(
      posts => {
        this.loadedPosts = posts;
        this.fetchingPosts = false;
      }
    )
  }
}
