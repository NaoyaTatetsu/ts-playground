import { User, UserEntity } from "../entities/user";
import { UserRepository } from "../interfaceAdapters/repositories/userRepository";

export class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async createUser(userData: { name: string; email: string }): Promise<User> {
    // ビジネスルールの検証
    const userEntity = new UserEntity({
      id: 0, // 一時的なID
      name: userData.name,
      email: userData.email,
    });

    if (!userEntity.isValid()) {
      throw new Error("無効なユーザーデータです");
    }

    // 重複チェック（簡易版）
    const existingUsers = await this.userRepository.findAll();
    const emailExists = existingUsers.some(
      (user) => user.email === userData.email
    );

    if (emailExists) {
      throw new Error("このメールアドレスは既に使用されています");
    }

    return await this.userRepository.create({
      name: userData.name,
      email: userData.email,
    });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error("ユーザーが見つかりません");
    }

    const updatedUserData = { ...existingUser, ...userData };
    const userEntity = new UserEntity(updatedUserData);

    if (!userEntity.isValid()) {
      throw new Error("無効なユーザーデータです");
    }

    return await this.userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<boolean> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error("ユーザーが見つかりません");
    }

    return await this.userRepository.delete(id);
  }
}
