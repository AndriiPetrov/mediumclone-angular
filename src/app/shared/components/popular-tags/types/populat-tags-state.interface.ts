import { PopularTagType } from 'src/app/shared/types/pupular.type';

export interface PopularTagsStateInterface {
  data: PopularTagType[] | null;
  error: string | null;
  isLoading: boolean;
}
