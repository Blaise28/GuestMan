export class Login {
  static readonly type = '[Auth] Login';
  constructor(
    public payload: {
      username: string;
      password: string;
    },
  ) {}
}

export class getOrganisation {
  static readonly type = '[Org] Get Organisation';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
