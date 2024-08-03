import { UserStateModel } from './user.state';

export class SetUser {
  static readonly type = '[SetUser] action';
  constructor(readonly payload: UserStateModel) {}
}

export class Populate {
  static readonly type = '[User] Populate User';
}
