# Supabase GitHub OAuth 配置指南

本项目已经实现了使用 Supabase 的 GitHub OAuth 登录功能。要使其正常工作，你需要完成以下配置步骤：

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
```

## 4. 配置 GitHub OAuth 应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/applications/new)
2. 创建一个新的 OAuth 应用
3. 填写应用信息：
   - **Application name**: 你的应用名称
   - **Homepage URL**: `http://localhost:3000` (开发环境)
   - **Authorization callback URL**: `https://your-project-id.supabase.co/auth/v1/callback`
4. 创建应用后，记录 `Client ID` 和 `Client Secret`

## 5. 在 Supabase 中配置 GitHub Provider

1. 在 Supabase 仪表板中，转到 "Authentication" > "Providers"
2. 找到 GitHub 并点击启用
3. 输入从 GitHub 应用获得的：
   - `Client ID`
   - `Client Secret`
4. 保存配置

## 6. 配置回调 URL

确保在 Supabase Authentication 设置中的 "Site URL" 配置为：
- 开发环境: `http://localhost:3000`
- 生产环境: 你的实际域名

## 7. 测试功能

1. 重启开发服务器：`npm run dev`
2. 访问 `http://localhost:3000`
3. 点击右上角的 "Sign in with GitHub" 按钮
4. 完成 GitHub 授权流程

## 项目结构

已实现的文件：
- `lib/supabase/client.ts` - 客户端 Supabase 实例
- `lib/supabase/server.ts` - 服务器端 Supabase 实例
- `hooks/use-auth.ts` - 认证状态管理 Hook
- `components/auth-button.tsx` - 登录/登出按钮组件
- `app/api/auth/github/route.ts` - GitHub OAuth 登录 API
- `app/api/auth/signout/route.ts` - 登出 API
- `app/auth/callback/route.ts` - OAuth 回调处理
- `app/auth/auth-code-error/page.tsx` - 认证错误页面

## 故障排除

如果遇到问题：

1. **"Setup Required" 按钮显示**: 检查环境变量是否正确配置
2. **认证失败**: 检查 GitHub OAuth 应用的回调 URL 是否正确
3. **CORS 错误**: 确保 Supabase 项目的 Site URL 配置正确

## 生产部署

在部署到生产环境时：
1. 更新 `.env.local` 中的 `NEXT_PUBLIC_SITE_URL` 为生产域名
2. 在 GitHub OAuth 应用中添加生产环境的回调 URL
3. 在 Supabase 中更新 Site URL 为生产域名