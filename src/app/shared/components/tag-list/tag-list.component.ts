import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PopularTagType } from '../../types/pupular.type';

@Component({
  selector: 'medium-tag-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent {
  @Input() tags: PopularTagType[];
}
