# Supabase 认证配置指南

本项目实现了使用 Supabase 的 GitHub 和 Google OAuth 登录功能。要使其正常工作，你需要完成以下配置步骤：

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并创建一个账户
2. 创建一个新项目
3. 等待项目初始化完成

## 2. 获取 Supabase 凭据

1. 进入项目仪表板
2. 点击左侧菜单的 "Settings" > "API"
3. 复制以下信息：
   - `Project URL`
   - `anon public` key

## 3. 配置环境变量

在项目根目录的 `.env.local` 文件中，将占位符替换为实际值：

```bash
# 替换为你的 Supabase 项目 URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# 替换为你的 Supabase anon key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here

# 可选：生产环境的站点URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 4. 配置 GitHub OAuth 应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/applications/new)
2. 创建一个新的 OAuth 应用
3. 填写应用信息：
   - **Application name**: 你的应用名称
   - **Homepage URL**: `http://localhost:3000` (开发环境)
   - **Authorization callback URL**: `https://your-project-id.supabase.co/auth/v1/callback`
4. 创建应用后，记录 `Client ID` 和 `Client Secret`

## 5. 配置 Google OAuth 应用

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端凭据：
   - 应用类型：Web 应用
   - 授权的 JavaScript 源：`http://localhost:3000`（开发环境）
   - 授权的重定向 URI：`https://your-project-id.supabase.co/auth/v1/callback`
5. 记录 `Client ID` 和 `Client Secret`

## 6. 在 Supabase 中配置 OAuth Providers

### 配置 GitHub Provider
1. 在 Supabase 仪表板中，转到 "Authentication" > "Providers"
2. 找到 GitHub 并点击启用
3. 输入从 GitHub 应用获得的：
   - `Client ID`
   - `Client Secret`
4. 保存配置

### 配置 Google Provider
1. 在同一页面找到 Google 并点击启用
2. 输入从 Google Cloud Console 获得的：
   - `Client ID`
   - `Client Secret`
3. 保存配置

## 7. 配置回调 URL

确保在 Supabase Authentication 设置中的 "Site URL" 配置为：
- 开发环境: `http://localhost:3000`
- 生产环境: 你的实际域名

## 8. 测试功能

1. 重启开发服务器：`npm run dev`
2. 访问 `http://localhost:3000`
3. 点击右上角的 "Google" 或 "GitHub" 按钮
4. 完成相应的 OAuth 授权流程

## 项目架构

### 认证实现方式

本项目采用混合认证方式：

- **Google 登录**：使用服务器端认证（推荐方式）
  - 实现文件：`lib/auth-actions.ts`
  - 使用 Next.js Server Actions
  - 更安全的服务器端流程

- **GitHub 登录**：使用客户端认证（保持兼容）
  - 实现文件：`hooks/use-auth.ts`
  - 客户端直接调用 Supabase

### 已实现的文件：

- `lib/supabase/client.ts` - 客户端 Supabase 实例
- `lib/supabase/server.ts` - 服务器端 Supabase 实例
- `lib/auth-actions.ts` - 服务器端认证操作（Google + GitHub）
- `hooks/use-auth.ts` - 认证状态管理 Hook
- `components/auth-button.tsx` - 登录/登出按钮组件
- `app/auth/callback/route.ts` - OAuth 回调处理
- `app/auth/auth-code-error/page.tsx` - 认证错误页面

## 故障排除

如果遇到问题：

1. **"Setup Required" 按钮显示**: 检查环境变量是否正确配置
2. **认证失败**: 检查 OAuth 应用的回调 URL 是否正确
3. **CORS 错误**: 确保 Supabase 项目的 Site URL 配置正确
4. **Google 登录失败**: 确认 Google Cloud Console 中的重定向URI配置
5. **GitHub 登录失败**: 确认 GitHub OAuth 应用的回调URL配置

## 生产部署

在部署到生产环境时：

1. 更新 `.env.local` 中的 `NEXT_PUBLIC_SITE_URL` 为生产域名
2. 在 GitHub OAuth 应用中添加生产环境的回调 URL
3. 在 Google Cloud Console 中添加生产环境的 JavaScript 源和重定向 URI
4. 在 Supabase 中更新 Site URL 为生产域名

## 安全最佳实践

1. 确保生产环境中的环境变量安全存储
2. 定期轮换 OAuth 客户端密钥
3. 监控认证日志和异常行为
4. 在生产环境中启用适当的CORS设置