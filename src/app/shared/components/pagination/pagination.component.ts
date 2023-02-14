import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'medium-pagination',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() total: number;
  @Input() limit: number;
  @Input() url: string;
  @Input() currentPage: number;

  utils = inject(UtilsService);

  pagesCount: number;
  pages: number[];

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages = this.utils.range(1, this.pagesCount);
  }
}
