import { BookingState } from './states/booking/booking.state';
import { DictionaryState } from './states/dictionary/dictionary.state';
import { PictureState } from './states/pictures/picture.state';
import { UserState } from './states/user/user.state';

export const DashboardStates = [
  DictionaryState,
  UserState,
  PictureState,
  BookingState,
];
