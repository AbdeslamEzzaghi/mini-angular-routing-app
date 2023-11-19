import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  numb = 0;
  counter = signal(0);
  value = computed(() => (this.counter()>=0)?"positive":"negative")

  constructor(){
    effect(()=>{
      console.log(this.counter());
    });
  }
  
  increment() {
    this.counter.update((oldV) => oldV + 1);
    this.actions.mutate((oldActions) => oldActions.push('INCREMENT'));
    //his.actions.push('INCREMENT');
  }

  decrement() {
    this.counter.update((oldV) => oldV - 1);
    this.actions.update(oldActions => [...oldActions,'DECREMENT']);
    //this.actions.push('DECREMENT');
  }
}
