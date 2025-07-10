export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity implements User {
  public readonly id: number;
  public readonly name: string;
  public readonly email: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt || new Date();
    this.updatedAt = user.updatedAt || new Date();
  }

  // ビジネスルールの例
  public isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  public hasValidName(): boolean {
    return this.name.length >= 2 && this.name.length <= 50;
  }

  public isValid(): boolean {
    return this.isValidEmail() && this.hasValidName();
  }
}
