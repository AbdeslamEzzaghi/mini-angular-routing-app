import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, map, throwError ,catchError, tap} from 'rxjs';

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
        postData,{
          observe : 'response'
        }
    ).subscribe(
      response => {
        console.log(response);
        this.refreshPosts.next('ok');
      },
    )

  }

  fetchPost() {
    let httpParams = new HttpParams()
    httpParams = httpParams.append('print','pretty');
    httpParams = httpParams.append('custom ','key');
    return this.http
      .get<{ [key: string]: Post }>(
        this.apiURL,{
          headers : new HttpHeaders(
            {
              "custom-header" : "success"
            }
          ),
          params : httpParams,
          responseType : 'json'
          
        }
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
    return this.http.delete(this.apiURL,{
      observe:'events',
      responseType : 'text'
    }).pipe(
      tap(
        (event) => {
          console.log(event);
          if(event.type === HttpEventType.Sent){
            console.log("event is sent");
          }
        }
      ));
  }
}
