export class Client {
    constructor(
      public id?: number,
      public name?: string,
      public email?: string,
      public cpf?: string,
      public phone?: string,
      public address?: string,
      public city?: string,
      public state?: string,
      public zipCode?: string,
      public country?: string,
      public createdAt?: Date,
      public updatedAt?: Date,
    ) {}
}
