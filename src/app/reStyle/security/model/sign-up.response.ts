export class SignUpResponse {

  public id: number;
  public username: string;
  public roles: string;

  constructor(id: number, username: string, roles: string) {
    this.username = username;
    this.id = id;
    this.roles = roles;
  }
}
