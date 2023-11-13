import { Component } from '@angular/core';
import { WeatherWidgetComponent } from './widgets/weather-widget/weather-widget.component';
import { ActionsWidgetComponent } from './widgets/actions-widget/actions-widget';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WeatherWidgetComponent,ActionsWidgetComponent],
  template: `
    <weather-widget 
        [headerTemplate]="headerAlternative" 
        [contentTemplate]="altWidgetContent"
        [actionsTemplate]="altAction"></weather-widget>
    <ng-template #headerAlternative >
      <div class="alt-header">today weather </div>
    </ng-template>
    <ng-template #altWidgetContent let-state="state">
      <div>
        <span>{{ state.data.temperature }}°C</span>
        <span>
          {{ state.data.skyCondition === 'sunny' ? '☀️' : '☁️' }}
        </span>
        <span>{{state.data.windspeed}}m/s</span>
      </div>
    </ng-template>
    <ng-template #altAction>
      <actions-widget></actions-widget>
    </ng-template>
  `,
  styles: [`
    :host {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class AppComponent {
}
