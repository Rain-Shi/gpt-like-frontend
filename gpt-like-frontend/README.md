# GPT-like Frontend

一个基于 Next.js 14 的现代化聊天界面，模仿 OpenAI ChatGPT 的用户体验，包含数据分析功能。

## 功能特性

- 🎨 现代化的 UI 设计，使用 Tailwind CSS 和 shadcn/ui
- 💬 实时聊天界面，类似 ChatGPT
- 📊 数据分析页面，显示 Supabase 数据
- 📱 响应式设计
- 🌙 支持深色模式
- ⚡ 基于 Next.js 14 和 React 18
- 🎯 TypeScript 支持
- 🧩 模块化组件设计
- 📈 数据表格展示
- 🔄 实时数据刷新

## 技术栈

- **框架**: Next.js 14
- **UI 库**: shadcn/ui (基于 Radix UI) + Tailwind CSS
- **数据库**: Supabase (PostgreSQL)
- **语言**: TypeScript
- **图标**: Lucide React
- **样式**: Tailwind CSS + CSS Variables

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看结果。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
├── app/                    # Next.js 13+ App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── ui/               # 基础 UI 组件
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   └── ChatInterface.tsx # 主聊天界面
├── lib/                  # 工具函数
│   └── utils.ts
└── public/               # 静态资源
```

## 主要组件

### 页面布局
- **Sidebar**: 左侧边栏，包含聊天历史和导航
- **MainChat**: 主聊天区域，类似 ChatGPT 界面
- **AnalyticsPage**: 数据分析页面，显示 Supabase 数据

### UI 组件
基于 shadcn/ui 构建的可复用组件：
- Button: 按钮组件
- Input: 输入框组件  
- Textarea: 文本域组件
- Table: 数据表格组件
- Card: 卡片组件

## 自定义配置

### 主题配置
在 `app/globals.css` 中配置 CSS 变量来定制主题颜色。

### 组件样式
使用 `cn()` 工具函数来合并 Tailwind CSS 类名。

## 开发说明

### 配置 Supabase
1. 创建 Supabase 项目
2. 复制 `.env.example` 到 `.env.local`
3. 填入你的 Supabase URL 和 API Key
4. 在 `lib/supabase.ts` 中配置数据库连接

### 连接真实 AI 服务
要连接真实的 AI 服务，你需要：

1. 在 `MainChat.tsx` 中替换模拟的 AI 响应逻辑
2. 添加 API 路由来处理聊天请求
3. 集成你选择的 AI 服务（如 OpenAI、Claude 等）

### 数据分析功能
- 当前使用模拟数据展示
- 可以连接到真实的 Supabase 数据库
- 支持用户统计、消息分析等功能

## 许可证

MIT License
