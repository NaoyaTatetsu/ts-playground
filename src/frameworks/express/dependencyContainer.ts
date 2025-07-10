import { UserRepository } from "../../interfaceAdapters/repositories/userRepository";
import { UserUseCases } from "../../useCases/userUseCases";
import { UserController } from "../../interfaceAdapters/controllers/userController";
import { InMemoryUserRepository } from "../database/inMemoryUserRepository";

export class DependencyContainer {
  private static instance: DependencyContainer;
  private userRepository: UserRepository;
  private userUseCases: UserUseCases;
  private userController: UserController;

  private constructor() {
    // リポジトリの初期化
    this.userRepository = new InMemoryUserRepository();

    // ユースケースの初期化
    this.userUseCases = new UserUseCases(this.userRepository);

    // コントローラーの初期化
    this.userController = new UserController(this.userUseCases);
  }

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  public getUserController(): UserController {
    return this.userController;
  }

  public getUserUseCases(): UserUseCases {
    return this.userUseCases;
  }

  public getUserRepository(): UserRepository {
    return this.userRepository;
  }
}
