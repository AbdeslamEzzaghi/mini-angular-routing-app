import {
    Component,
    Input,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    inject,
  } from '@angular/core';
  import { WidgetActions } from '../widget-actions.service';
  import { WidgetState } from '../widget-state.service';
  import { NgTemplateOutlet } from '@angular/common';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';
  
  @Component({
    selector: 'actions-widget',
    standalone: true,
    imports:[NgTemplateOutlet],
    template: ` 
        <button (click)="onClick()">Reload & copy</button>
    `,
    styleUrls: [],
    providers: [],
  })
  export class ActionsWidgetComponent {

    weatherActions = inject(WeatherWidgetComponent);
    onClick(){
        this.weatherActions.actions.reload();
        this.weatherActions.actions.copyData();
    }
  }
  