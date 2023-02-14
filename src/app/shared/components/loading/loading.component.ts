import { Component, Input } from '@angular/core';

@Component({
  selector: 'medium-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() loadingMessage = 'Loading...';
}
