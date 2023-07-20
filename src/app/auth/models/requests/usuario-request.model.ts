export class UsuarioRequest {
  constructor(
    public name: string,
    public birthDate: string,
    public cell: string,
    public email: string,
    public password: string,
    public familyId: string,
    public id?: string
  ) {}
}
