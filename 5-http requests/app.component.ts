import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts = [];
  fetchingPosts = false;
  error = null;
  private subscription : Subscription;

  constructor(private http: HttpClient,private postsService : PostsService) {}

  ngOnInit() {
    this.fetchingPosts = true;
    this.postsService.fetchPost().subscribe(
      posts => {
        this.loadedPosts = posts;
        this.fetchingPosts = false;
      }    ,
      error => {
        console.log(error.error.error)
        this.error = error.error.error;     
        //this.error = error.message;   
      }
    )
  }

  onCreatePost(postData: Post) {
    this.fetchingPosts = true;
      this.postsService.createAndStorePost(postData)
      this.subscription = this.postsService.refreshPosts.subscribe(
        value => {
          this.fetchingPosts = false;
          this.fetchPosts();
        }
      )
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
    ,
    error => {
      this.error = error.error.error; 
      //this.error = error.message;     
    }) 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
