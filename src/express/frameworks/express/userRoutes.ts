import { Router } from "express";
import { UserController } from "../../interfaceAdapters/controllers/userController";

export function createUserRoutes(userController: UserController): Router {
  const router = Router();

  // ユーザー一覧取得
  router.get("/", (req, res) => userController.getAllUsers(req, res));

  // 特定のユーザー取得
  router.get("/:id", (req, res) => userController.getUserById(req, res));

  // ユーザー作成
  router.post("/", (req, res) => userController.createUser(req, res));

  // ユーザー更新
  router.put("/:id", (req, res) => userController.updateUser(req, res));

  // ユーザー削除
  router.delete("/:id", (req, res) => userController.deleteUser(req, res));

  return router;
}
