import { User } from "../../entities/user";
import { UserRepository } from "../../interfaceAdapters/repositories/userRepository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [
    {
      id: 1,
      name: "田中太郎",
      email: "tanaka@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "佐藤花子",
      email: "sato@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async findById(id: number): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user ? { ...user } : null;
  }

  async create(userData: Omit<User, "id">): Promise<User> {
    const newId = Math.max(...this.users.map((u) => u.id), 0) + 1;
    const newUser: User = {
      id: newId,
      name: userData.name,
      email: userData.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      return null;
    }

    this.users[index] = {
      ...this.users[index],
      ...userData,
      updatedAt: new Date(),
    };

    return { ...this.users[index] };
  }

  async delete(id: number): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);
    return true;
  }
}
