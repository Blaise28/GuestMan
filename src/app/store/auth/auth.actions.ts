export class GetToken {
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
