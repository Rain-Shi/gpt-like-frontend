# GitHub 上传指南

## 步骤 1: 安装 Node.js

由于您的系统上没有安装 Node.js，请先安装：

1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 LTS 版本（推荐）
3. 运行安装程序，按默认设置安装
4. 重启命令行/PowerShell

验证安装：
```bash
node --version
npm --version
```

## 步骤 2: 初始化 Git 仓库

在项目根目录运行：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交初始版本
git commit -m "Initial commit: GPT-like frontend with analytics"
```

## 步骤 3: 创建 GitHub 仓库

1. 访问 [GitHub.com](https://github.com)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库名称：`gpt-like-frontend`
4. 描述：`A GPT-like chat interface with analytics dashboard`
5. 选择 "Public" 或 "Private"
6. **不要**勾选 "Add a README file"（因为我们已经有了）
7. 点击 "Create repository"

## 步骤 4: 连接本地仓库到 GitHub

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为您的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/gpt-like-frontend.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

## 步骤 5: 安装依赖并运行项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看应用

## 项目功能

✅ 类似 ChatGPT 的界面布局
✅ 左侧边栏聊天历史
✅ 右侧主聊天区域
✅ 数据分析页面（点击左侧"数据分析"按钮）
✅ 使用 shadcn/ui 组件库
✅ 响应式设计
✅ TypeScript 支持

## 环境配置

创建 `.env.local` 文件（可选，用于 Supabase 连接）：

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 部署到 Vercel（可选）

1. 访问 [Vercel.com](https://vercel.com)
2. 连接您的 GitHub 账户
3. 导入 `gpt-like-frontend` 仓库
4. 点击 "Deploy"

项目将自动部署到 Vercel！
