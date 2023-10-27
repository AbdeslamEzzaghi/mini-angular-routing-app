import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  apiURL = 'https://my-angular-s-back-end-api-default-rtdb.europe-west1.firebasedatabase.app/posts.json';
  
  constructor(private http: HttpClient) {}

  createAndStorePost(postData: Post) {
    return this.http
      .post<{ name: string }>(
        this.apiURL,
        postData
      )

  }

  fetchPost() {
    return this.http
      .get<{ [key: string]: Post }>(
        this.apiURL
      )
      .pipe(
        map((responseData) => {
          const postsArr: Post[] = [];

          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArr.push({ ...responseData[key], id: key });
            }
          }

          return postsArr;
        })
      );
  }

  deletePosts(){
    return this.http.delete(this.apiURL);
  }
}
