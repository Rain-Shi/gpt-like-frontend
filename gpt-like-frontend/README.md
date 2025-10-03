# Chat苑博学

> 一个现代化的GPT风格聊天界面，基于Next.js 14构建，集成数据分析功能

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)

## ✨ 特性

- 🎨 **现代化设计** - 类似ChatGPT的界面布局
- 💬 **实时聊天** - 流畅的对话体验
- 📊 **数据分析** - 用户统计和消息分析
- 📱 **响应式** - 完美适配各种设备
- 🌙 **深色模式** - 支持系统主题切换
- ⚡ **高性能** - 基于Next.js 14和React 18

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm/yarn/pnpm

### 安装运行

```bash
# 克隆项目
git clone https://github.com/Rain-Shi/gpt-like-frontend.git
cd gpt-like-frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3001](http://localhost:3001) 查看效果

## 🏗️ 项目结构

```
gpt-like-frontend/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # React组件
│   ├── ui/               # shadcn/ui组件库
│   ├── Sidebar.tsx      # 左侧边栏
│   ├── MainChat.tsx    # 聊天界面
│   └── AnalyticsPage.tsx # 数据分析页
└── lib/                  # 工具函数
    ├── utils.ts          # 通用工具
    └── supabase.ts       # 数据库配置
```

## 🎯 核心功能

### 聊天功能
- 新建对话
- 消息发送/接收
- 聊天历史管理
- 实时响应

### 数据分析
- 用户统计概览
- 活跃用户列表
- 消息记录分析
- 实时数据刷新

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Next.js** | 14.0 | React全栈框架 |
| **TypeScript** | 5.2 | 类型安全 |
| **Tailwind CSS** | 3.3 | 样式框架 |
| **shadcn/ui** | Latest | UI组件库 |
| **Supabase** | 2.38 | 后端服务 |
| **Lucide React** | 0.294 | 图标库 |

## 📖 使用指南

### 聊天操作
1. 点击"新建聊天"开始对话
2. 在输入框输入消息，按Enter发送
3. 点击左侧历史记录切换对话
4. 点击"数据分析"查看统计信息

### 数据分析
- **统计卡片**: 总用户数、消息数、平均值
- **用户表格**: 活跃用户详细信息
- **消息表格**: 最近交互记录
- **刷新按钮**: 更新最新数据

## ⚙️ 配置说明

### OpenAI API配置
```bash
# 创建 .env.local 文件
OPENAI_API_KEY=sk-your-openai-api-key-here
```

**获取API密钥**：
1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 创建新的API密钥
3. 将密钥添加到 `.env.local` 文件中

### Supabase配置（可选）
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 自定义主题
在 `app/globals.css` 中修改CSS变量来定制主题

## 🚀 部署

### Vercel部署
```bash
# 连接GitHub仓库到Vercel
# 自动部署，无需额外配置
```

### 其他平台
```bash
npm run build
npm start
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

<div align="center">
  <p>Made with ❤️ by Rain-Shi</p>
</div>