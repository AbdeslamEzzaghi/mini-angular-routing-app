import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  activated : boolean = false;
  private activatedSubscription : Subscription;
  constructor(private userServivce : UserService) {}

  ngOnInit() {
    this.activatedSubscription = this.userServivce.activatedEmitter.subscribe(
      (data : boolean) => {
        this.activated = data;
      }
    )
  }
  ngOnDestroy(): void {
    this.activatedSubscription.unsubscribe()
  }
}
