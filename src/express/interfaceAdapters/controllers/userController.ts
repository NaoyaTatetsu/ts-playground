import { Request, Response } from "express";
import { UserUseCases } from "../../useCases/userUseCases";

export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userUseCases.getAllUsers();
      res.json({ users });
    } catch (error) {
      res.status(500).json({
        error: "ユーザーの取得に失敗しました",
        message: error instanceof Error ? error.message : "不明なエラー",
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "無効なユーザーIDです" });
        return;
      }

      const user = await this.userUseCases.getUserById(id);
      if (!user) {
        res.status(404).json({ error: "ユーザーが見つかりません" });
        return;
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json({
        error: "ユーザーの取得に失敗しました",
        message: error instanceof Error ? error.message : "不明なエラー",
      });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        res.status(400).json({
          error: "名前とメールアドレスは必須です",
        });
        return;
      }

      const user = await this.userUseCases.createUser({ name, email });
      res.status(201).json({
        message: "ユーザーが作成されました",
        user,
      });
    } catch (error) {
      const statusCode =
        error instanceof Error &&
        (error.message.includes("無効") || error.message.includes("重複"))
          ? 400
          : 500;

      res.status(statusCode).json({
        error: "ユーザーの作成に失敗しました",
        message: error instanceof Error ? error.message : "不明なエラー",
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "無効なユーザーIDです" });
        return;
      }

      const user = await this.userUseCases.updateUser(id, req.body);
      if (!user) {
        res.status(404).json({ error: "ユーザーが見つかりません" });
        return;
      }

      res.json({
        message: "ユーザーが更新されました",
        user,
      });
    } catch (error) {
      const statusCode =
        error instanceof Error && error.message.includes("無効") ? 400 : 500;

      res.status(statusCode).json({
        error: "ユーザーの更新に失敗しました",
        message: error instanceof Error ? error.message : "不明なエラー",
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "無効なユーザーIDです" });
        return;
      }

      const success = await this.userUseCases.deleteUser(id);
      if (!success) {
        res.status(404).json({ error: "ユーザーが見つかりません" });
        return;
      }

      res.json({ message: "ユーザーが削除されました" });
    } catch (error) {
      res.status(500).json({
        error: "ユーザーの削除に失敗しました",
        message: error instanceof Error ? error.message : "不明なエラー",
      });
    }
  }
}
