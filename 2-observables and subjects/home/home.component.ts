import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit , OnDestroy{
  private mySubscription: Subscription;
  constructor() {}

  ngOnInit() {
    const myFirstObs = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        /*if(count === 2){
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error('count is greater than 4'));
        }*/
        count++;
      }, 1000);
    });

    this.mySubscription = myFirstObs.pipe(filter(
      (data : number) => {
        return data % 2 == 0;
      }
    ),map(
      (data:number)=>{
        return "ROUND : "+(data+1);
      }
    )).subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log(error)
    },()=>{
      console.log("counter is complete")
    });
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
