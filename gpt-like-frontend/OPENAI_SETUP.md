# OpenAI API 配置指南

## 🔑 获取OpenAI API密钥

1. 访问 [OpenAI官网](https://platform.openai.com/)
2. 注册或登录您的账户
3. 进入 [API Keys页面](https://platform.openai.com/api-keys)
4. 点击 "Create new secret key"
5. 复制生成的API密钥

## ⚙️ 环境变量配置

### 1. 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```bash
# OpenAI API配置
OPENAI_API_KEY=sk-your-openai-api-key-here

# Supabase配置（可选）
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. 替换API密钥

将 `sk-your-openai-api-key-here` 替换为您从OpenAI获取的真实API密钥。

## 🚀 启动应用

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 💰 费用说明

- OpenAI API按使用量计费
- GPT-3.5-turbo: 约 $0.002/1K tokens
- 建议设置使用限制以避免意外费用

## 🔒 安全注意事项

- 不要将API密钥提交到Git仓库
- 使用 `.env.local` 文件存储敏感信息
- 在生产环境中使用环境变量

## 🧪 测试功能

1. 启动应用后访问 http://localhost:3001
2. 点击"新建聊天"开始对话
3. 输入消息测试AI回复功能
4. 检查浏览器控制台是否有错误信息

## 🛠️ 故障排除

### 常见问题

1. **API密钥无效**
   - 检查密钥是否正确复制
   - 确认密钥有足够的余额

2. **网络连接问题**
   - 检查网络连接
   - 确认防火墙设置

3. **API限制**
   - 检查OpenAI账户限制
   - 确认API使用权限

## 📞 技术支持

如果遇到问题，请检查：
- 浏览器控制台错误信息
- 网络请求状态
- OpenAI账户状态
