import { ArticleStateInterface } from 'src/app/article/store/types/articleState.interface';
import { FeedStateInterface } from '../components/feed/types/feed-state.interface';
import { PopularTagsStateInterface } from '../components/popular-tags/types/populat-tags-state.interface';
import { AuthStateInterface } from './../../auth/types/authState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  populatTags: PopularTagsStateInterface;
  article: ArticleStateInterface;
}
