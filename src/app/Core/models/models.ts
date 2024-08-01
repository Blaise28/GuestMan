export interface loginModel {
  username: string;
  password: string;
}
export interface room {
  id: number;
  numero: number;
  type: string;
  prix: number;
  disponibilite: boolean;
  is_active: boolean;
}
