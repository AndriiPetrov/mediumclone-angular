import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PopularTagType } from 'src/app/shared/types/pupular.type';
import { environment } from 'src/environments/environment';
import { GetPopularTagsResponseInterface } from '../types/get-popular-tags-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  http = inject(HttpClient);

  getPopularTags(): Observable<PopularTagType[]> {
    const apiUrl = environment.apiUrl + '/tags';

    return this.http
      .get(apiUrl)
      .pipe(map((response: GetPopularTagsResponseInterface) => response.tags));
  }
}
