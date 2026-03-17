# 🚗 智能洗车平台 - 前端应用

一个基于 Vue 3 + Vite 构建的现代化智能洗车服务平台，为用户提供便捷的洗车预约、支付和会员管理服务。

## ✨ 功能特性

- 🔐 **用户认证** - 注册、登录、忘记密码
- 📍 **地图定位** - 集成 Google Maps，查找附近洗车店
- 📱 **扫码服务** - 扫码启动洗车设备
- 💳 **在线支付** - 集成 Stripe 支付网关
- 👥 **会员系统** - VIP 会员卡管理和充值
- 🎁 **邀请奖励** - 邀请好友获取奖励
- 📦 **订单管理** - 查看订单历史和状态
- 💰 **钱包功能** - 余额管理和交易记录
- 🎫 **优惠券系统** - 优惠券和代金券管理
- 🌐 **多语言支持** - 支持中文（简体）和英文
- 📱 **PWA 支持** - 可安装为移动应用
- 🎨 **现代化 UI** - 响应式设计，优秀的用户体验

## 🛠 技术栈

- **框架**: Vue 3 (Composition API + `<script setup>`)
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由**: Vue Router
- **样式**: UnoCSS + CSS Variables
- **国际化**: Vue I18n
- **HTTP 客户端**: Axios
- **PWA**: vite-plugin-pwa
- **支付集成**: Stripe
- **地图服务**: Google Maps API
- **包管理**: pnpm

## 📁 项目结构

```
src/
├── api/              # API 接口定义
├── assets/           # 静态资源（图片、图标等）
├── components/       # 可复用组件
│   ├── balance/      # 余额相关组件
│   ├── common/       # 通用组件
│   ├── invite/       # 邀请相关组件
│   ├── order/        # 订单相关组件
│   ├── payment/      # 支付相关组件
│   └── washer/       # 洗车设备相关组件
├── composables/      # 组合式函数（Composables）
├── constants/        # 常量定义
├── layouts/          # 布局组件
├── modules/          # 模块配置（路由、状态管理等）
├── pages/            # 页面组件
│   ├── invite/       # 邀请页面
│   ├── map/          # 地图页面
│   ├── membership/   # 会员页面
│   ├── mine/         # 个人中心
│   ├── order/        # 订单页面
│   ├── payment/      # 支付页面
│   ├── settings/     # 设置页面
│   ├── store/        # 店铺页面
│   ├── voucher/      # 优惠券页面
│   ├── wallet/       # 钱包页面
│   └── washer/       # 洗车设备页面
├── router/           # 路由配置
├── stores/           # Pinia 状态存储
├── styles/           # 全局样式
└── utils/            # 工具函数
```

## 📋 环境要求

- **Node.js**: >= 16.0.0
- **pnpm**: >= 8.0.0（推荐）

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 环境变量配置

在项目根目录创建环境变量文件：

```bash
# .env.development (开发环境)
VITE_API_BASE_URL=https://dev-api.example.com
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# .env.production (生产环境)
VITE_API_BASE_URL=https://api.example.com
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# .env.staging (预发布环境)
VITE_API_BASE_URL=https://staging-api.example.com
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 开发模式

```bash
pnpm dev
```

访问 [http://localhost:5173](http://localhost:5173)

### 构建生产版本

```bash
# 生产环境构建
pnpm build

# 预发布环境构建
pnpm build:staging

# 预览生产构建
pnpm preview
```

## 📦 可用脚本

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm build:staging # 构建预发布版本
pnpm preview      # 预览生产构建
pnpm lint         # 代码检查
```

## 🔧 主要 Composables

- `useAuth` - 用户认证管理
- `useApi` - API 请求封装
- `usePayment` - 支付流程管理
- `usePaymentCheck` - 支付状态检查
- `useOrder` - 订单管理
- `useLocation` - 位置服务
- `useGoogleMap` - Google Maps 集成
- `useLocale` - 国际化支持
- `useCurrency` - 货币格式化
- `useUpload` - 文件上传

## 🌍 多语言支持

项目支持以下语言：

- 🇨🇳 简体中文 (zh-CN)
- 🇬🇧 English (en)

语言文件位于 `locales/` 目录，包含以下模块：

- `auth` - 认证相关
- `common` - 通用文本
- `components` - 组件文本
- `errors` - 错误信息
- `notifications` - 通知消息
- `order` - 订单相关
- `routes` - 路由标题
- `tabbar` - 底部导航栏
- `validations` - 表单验证

## 💡 开发规范

### 组件命名

- 使用 kebab-case 命名文件：`user-avatar-cell.vue`
- 使用 PascalCase 命名组件：`<UserAvatarCell />`

### API 调用

使用 `useApi` composable 进行 API 调用：

```javascript
import { useApi } from '@/composables/useApi'

const { data, loading, error, execute } = useApi('/api/endpoint')
```

### 状态管理

使用 Pinia stores，位于 `src/stores/modules/`：

```javascript
import { useUserStore } from '@/stores'

const userStore = useUserStore()
```

### 样式编写

- 优先使用 UnoCSS 原子类
- CSS 变量定义在 `src/styles/variables.css`
- 组件样式使用 `<style scoped>`

## 🔐 安全注意事项

- ⚠️ 不要将 `.env` 文件提交到版本控制
- ⚠️ 敏感信息（API 密钥、密码等）必须使用环境变量
- ⚠️ 生产环境必须使用 HTTPS

## 📱 PWA 特性

应用支持 PWA（渐进式 Web 应用），特性包括：

- 离线缓存
- 添加到主屏幕
- 推送通知支持
- 自动更新检测

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用私有许可证，版权所有。

## 📞 联系方式

如有问题或建议，请联系开发团队。

---

**注意**: 首次运行项目前，请确保正确配置所有必需的环境变量。