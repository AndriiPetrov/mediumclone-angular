import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { FeedTogglerComponent } from '../shared/components/feed-toggler/feed-toggler.component';
import { FeedComponent } from '../shared/components/feed/feed.component';
import { PopularTagsComponent } from '../shared/components/popular-tags/popular-tags.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'medium-tag-feed',
  standalone: true,
  imports: [
    CommonModule,
    BannerComponent,
    FeedTogglerComponent,
    FeedComponent,
    PopularTagsComponent,
  ],
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss'],
})
export class TagFeedComponent implements OnInit {
  apiUrl: string;
  tagName: string;

  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
