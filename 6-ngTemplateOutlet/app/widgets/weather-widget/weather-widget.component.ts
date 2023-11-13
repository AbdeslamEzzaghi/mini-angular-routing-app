import {
  Component,
  INJECTOR,
  Injector,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { WidgetActions } from '../widget-actions.service';
import { WidgetState } from '../widget-state.service';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'weather-widget',
  standalone: true,
  imports:[NgTemplateOutlet],
  template: ` 
    <div class="widget-header">
      <ng-container [ngTemplateOutlet]="headerTemplate || defaultWidgetHeader"></ng-container>
      <ng-template #defaultWidgetHeader>
        <div class="widget-title">Weather Forecast</div>
        <div class="widget-sub-title">Current weather in your location</div>
      </ng-template>
    </div>
    <div class="widget-content">
      <ng-container [ngTemplateOutlet]="contentTemplate || defaultWidgetContent" [ngTemplateOutletContext]="{state : state}"></ng-container>
      <ng-template #defaultWidgetContent>
        <div class="sky-condition">
          {{ state.data.skyCondition === 'sunny' ? '☀️' : '☁️' }}
        </div>
        <div class="temperature">{{ state.data.temperature }}°C</div>
      </ng-template>
    </div>
    <div class="widget-actions">
      <ng-container 
        [ngTemplateOutlet]="actionsTemplate || defaultActions"
        [ngTemplateOutletInjector]="injector"></ng-container>
      <ng-template #defaultActions>
        <button (click)="actions.reload()">Reload</button>
        <button (click)="actions.copyData()">Copy Info</button>
      </ng-template>
    </div>
  `,
  styleUrls: ['./weather-widget.component.css'],
  providers: [WidgetActions, WidgetState],
})
export class WeatherWidgetComponent {
  @Input()
  headerTemplate : TemplateRef<any>;

  @Input()
  contentTemplate : TemplateRef<any>;

  @Input()
  actionsTemplate : TemplateRef<any>;

  state = inject(WidgetState);
  actions = inject(WidgetActions);

  injector = inject(Injector);
  /*
  template : `
  ...... 
  <ng-container #container></ng-container>
  ......
  `
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('defaultWidgetHeader') headerTemplate!: TemplateRef<any>;
  
  ngAfterViewInit(){
    this.container.createEmbeddedView(this.headerTemplate);
  }
  */
}
