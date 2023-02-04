import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {Component} from '@angular/core'

@Component({
  selector: 'medium-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AppComponent {
  title = 'mediumclone-angular'
}
