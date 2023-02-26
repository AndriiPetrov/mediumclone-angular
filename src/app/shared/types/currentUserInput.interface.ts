import { CurrentUserInterface } from './currentUser.interface';

export interface CurrentUserInputInterface {
  user: CurrentUserWithPasswordInterface;
}

interface CurrentUserWithPasswordInterface extends CurrentUserInterface {
  password: string;
}
