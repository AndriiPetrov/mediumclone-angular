import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from './auth/store/actions/get-current-user.actions';
import { getFeedAction } from './shared/components/feed/store/actions/get-feed.actions';

@Component({
  selector: 'medium-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopBarComponent],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
    // this.store.dispatch(getFeedAction({ url: 'test' }));
  }
}
