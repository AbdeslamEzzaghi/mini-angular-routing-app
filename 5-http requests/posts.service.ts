import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Subject, map, throwError ,catchError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  refreshPosts = new Subject<string>();
  
  apiURL = 'https://my-angular-s-back-end-api-default-rtdb.europe-west1.firebasedatabase.app/posts.json';
  
  constructor(private http: HttpClient) {}

  createAndStorePost(postData: Post) {
    this.http
      .post<{ name: string }>(
        this.apiURL,
        postData
    ).subscribe(
      response => {
        console.log(response);
        this.refreshPosts.next('ok');
      },
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
        })/*,catchError(
          errRes => {
            return throwError(errRes)
          }
        )*/
      );
  }

  deletePosts(){
    return this.http.delete(this.apiURL);
  }
}
