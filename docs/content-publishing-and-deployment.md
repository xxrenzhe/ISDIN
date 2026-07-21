# 内容发布与部署流程

本流程适用于所有 BES3 新内容，包括护肤、彩妆、护发、香氛、Journal 与 Brand Focus。它将草稿、质量门槛、生产部署和上线验证分开，避免未完成内容或未验证构建直接进入 `bes3.com`。

## 1. 新内容从草稿开始

为常规栏目创建安全草稿：

```bash
npm run content:new -- \
  --collection makeup \
  --slug choose-a-cream-blush \
  --title "How to Choose a Cream Blush" \
  --description "A practical guide to choosing and using a cream blush."
```

支持的 collection：`concerns`、`ingredients`、`routines`、`product-guides`、`makeup`、`hair-care`、`fragrance`、`journal`。

生成器始终设置 `draft: true`，因此草稿不会出现在路由、RSS 或生产站中。它也会留下来源占位符；非草稿内容包含这些占位符时，`npm run check` 会失败。

`Brand Focus` 的目录结构可能包含品牌子路径，请直接按现有目录创建 Markdown 文件，并沿用商业披露和 CTA 元数据规则。

## 2. 内容完成前的编辑清单

在将 `draft` 改为 `false` 前：

1. 补齐准确标题、说明、日期、标签、产品类型和至少一个权威来源。
2. 移除所有草稿说明和 `example.com` 占位符。
3. 添加独有的 WebP 图片到 `src/assets/images/`，并在 `src/data/article-artwork.ts` 中为文章注册对应图片。构建会拒绝没有图片映射的已发布文章。
4. 需要商业 CTA 时，必须同步填写 `disclosure`、`ctaLinkIds` 和 `commercial` 元数据，并仅使用已配置商家链接。
5. 检查表述是否把品牌宣称、证据和编辑判断清楚区分；不得发布医疗承诺或未验证的价格/促销信息。

### 图片视觉审核（发布阻断项）

任何新增或修改的图片都必须先以原始分辨率人工检查，之后才能放入 `src/assets/images/`。审核人必须确认：

1. 人物只有合理数量的肢体和手指；手、手臂、关节与身体的连接自然。
2. 人物持物、滴管、液体、镜面和阴影符合真实物理关系；没有悬浮物或错误反射。
3. 化妆品包装有一致的虚构品牌标识（当前为 `LUMERA`），不能使用空白瓶、真实品牌、乱码或未核实的功效文案。
4. 图中没有水印、错误文字、重复人物姿态，或会误导读者的异常透视。

将审核通过的文件、SHA-256、审核日期和状态登记到 `docs/image-review.json`。`npm run check:image-review` 会校验每一张站内 WebP 都有批准记录，且文件在审核后没有被改动；审核记录超过 180 天也会要求重新检查。该命令不能替代人工看图，而是确保视觉审核不会在发布时被遗漏。

本地验证命令：

```bash
npm run check
npm run test:e2e
```

可单独运行图片门禁：

```bash
npm run check:image-review
```

`npm run check` 覆盖格式、Lint、Astro 类型、单元测试、内容就绪度、构建、链接、商家链接、日期和公开文案检查。端到端测试建议针对已构建站点运行，以避免首次开发模式图片转码拖慢浏览器测试：

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4321
npm run test:e2e
```

## 3. GitHub 的质量与生产门槛

`Quality` workflow 会在每个 PR 与每次推送到 `main` 时运行：

1. `npm ci`
2. `npm run check`
3. Chromium、Firefox、WebKit 的 Playwright 回归

`.github/workflows/deploy-pages.yml` 只在 `Quality` 对 `main` 的 push 成功后部署。它会检出已验证的 commit SHA，再次构建静态产物、上传 `dist/` 到 Cloudflare Pages，最后检查生产域名中的核心页面、robots、sitemap 和 canonical。

在仓库 Settings 中配置以下值（只在 GitHub Secrets / Variables 中保存，绝不提交到仓库）：

| 类型     | 名称                       | 说明                                     |
| -------- | -------------------------- | ---------------------------------------- |
| Secret   | `CLOUDFLARE_API_TOKEN`     | 有 Cloudflare Pages 编辑权限的 API Token |
| Secret   | `CLOUDFLARE_ACCOUNT_ID`    | Cloudflare 账户 ID                       |
| Variable | `CLOUDFLARE_PAGES_PROJECT` | Pages 项目名；默认 `bes3`                |
| Variable | `BES3_PRODUCTION_URL`      | 生产域名；默认 `https://bes3.com`        |

若自动部署需要重跑，可在 GitHub Actions 的 `Deploy Pages` 页面使用 `Run workflow`，填写已经通过 Quality 的 commit SHA 或 `main`。

## 4. 本地手动部署与验证

仅在需要应急发布时使用，且先在本地设置 Cloudflare 凭据：

```bash
export CLOUDFLARE_API_TOKEN="..."
export CLOUDFLARE_ACCOUNT_ID="..."
export CLOUDFLARE_PAGES_PROJECT="bes3"

npm run deploy:production
```

该命令依次运行完整质量检查、上传 `dist/` 和生产验证。部署命令支持不写入远端的预演：

```bash
npm run deploy:pages -- --branch main --dry-run
```

## 5. 上线后的检查与回滚

部署完成后，自动工作流会运行：

```bash
npm run verify:production
```

它验证首页、Beauty、Makeup、Hair care、Fragrance、sitemap 与 robots；并确认首页 canonical 与生产域名一致。可通过 `SITE_URL=https://staging.example.com CANONICAL_ORIGIN=https://bes3.com npm run verify:production` 验证其他环境。

如果生产版本有问题，优先回滚代码并让同一流程重新部署：

```bash
git revert <bad-commit>
git push origin main
```

不要绕过 Quality 直接上传未验证的本地 `dist/`。紧急情况下若必须通过 Cloudflare 仪表板回滚，也要随后用 Git revert 让仓库与生产状态重新一致。
