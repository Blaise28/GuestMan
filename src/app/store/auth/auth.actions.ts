export class Login {
  static readonly type = '[Auth] Login';
  constructor(
    public payload: {
      username: string;
      password: string;
    },
  ) {}
}

export class setToken {
  static readonly type = '[Token] Set Token';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class ResetState {
  static readonly type = '[State] Reset';
}
