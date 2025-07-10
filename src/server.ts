import express, { Request, Response, NextFunction } from "express";
import { DependencyContainer } from "./frameworks/express/dependencyContainer";
import { createUserRoutes } from "./frameworks/express/userRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// JSONボディパーサーを有効化
app.use(express.json());

// 依存性注入コンテナの初期化
const container = DependencyContainer.getInstance();

// 基本的なルート
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "TypeScript Express サーバーが正常に動作しています！",
    timestamp: new Date().toISOString(),
    architecture: "Clean Architecture",
  });
});

// ヘルスチェックエンドポイント
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ユーザー関連のルート
app.use("/api/users", createUserRoutes(container.getUserController()));

// 404エラーハンドラー
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    error: "エンドポイントが見つかりません",
    path: req.originalUrl,
  });
});

// グローバルエラーハンドラー
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    error: "内部サーバーエラーが発生しました",
    message: error.message,
  });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 サーバーがポート ${PORT} で起動しました`);
  console.log(`📱 ブラウザで http://localhost:${PORT} にアクセスしてください`);
  console.log(`🏗️  Clean Architecture で構築されています`);
});
