import { ArticleStateInterface } from 'src/app/article/store/types/articleState.interface';
import { CreateArticleStateInterface } from 'src/app/create-article/store/types/createArticleState.interface';
import { EditArticleStateInterface } from 'src/app/edit-article/types/edit-article-state.interface';
import { SettingsStateInterface } from 'src/app/settings/types/settingsState.interace';
import { FeedStateInterface } from '../components/feed/types/feed-state.interface';
import { PopularTagsStateInterface } from '../components/popular-tags/types/populat-tags-state.interface';
import { AuthStateInterface } from './../../auth/types/authState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  populatTags: PopularTagsStateInterface;
  article: ArticleStateInterface;
  createArticle: CreateArticleStateInterface;
  editArticle: EditArticleStateInterface;
  settings: SettingsStateInterface;
}
