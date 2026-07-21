# BES3 网站完整设计与实施方案

> - 文档状态：执行基准（v1.1）
> - 目标域名：[bes3.com](https://bes3.com)
> - 首发语言：英文（`en-US`）
> - 部署平台：Cloudflare Pages
> - 最后更新：2026-07-20

## 1. 文档目的

本文档是 BES3 从品牌设计、内容生产到技术开发和上线验收的单一执行基准，供设计、开发、内容编辑和联盟运营共同使用。

本项目的最终产品是一个具有独立编辑立场的功效护肤内容媒体，而不是电商店铺、优惠券站、商家仿站或单一品牌推广页。网站以通用护肤内容为主体，同时设置可扩展的 `Brand Focus` 商业内容专栏；首个公开专题为 ISDIN，专题文章可以在清晰披露商业关系后设置联盟推广 CTA。

首个版本需要同时达到两个目标：

1. 对普通读者而言，它是一个真实、完整、值得持续访问的护肤知识网站。
2. 对潜在合作商家而言，它能证明 BES3 拥有明确受众、专业内容能力、品牌安全意识和可持续的推广方式。

## 2. 已确认范围

### 2.1 必须完成

- 使用 `bes3.com` 作为正式域名。
- 网站专注护肤与化妆品行业，首期聚焦功效护肤。
- 通用栏目保持编辑独立，并新增 `Brand Focus: ISDIN` 专栏。
- ISDIN 专栏包含品牌介绍、产品选择指南和与防晒、光老化相关的文章。
- ISDIN 相关文章预留可配置的联盟推广 CTA，并在首个 CTA 前披露商业关系。
- 英文内容优先，主要面向美国消费者。
- 使用静态站点架构并部署到 Cloudflare Pages。
- 具备后续增加成分、问题、流程、产品类型和合作商家的扩展能力。
- 设计必须形成完整、统一的视觉系统，避免常见 AI 模板风格。
- 具备完整的编辑政策、联盟披露、隐私政策、免责声明和联系渠道。
- 在申请任何联盟计划前形成真实、可浏览的内容体量。

### 2.2 首期不做

- 登录、会员中心和用户账户。
- 购物车、结算或站内支付。
- 开放式用户评论和用户评分。
- 皮肤诊断、疾病治疗建议或个性化医疗建议。
- 自动抓取商家产品、价格或评价。
- 未经人工核验的 AI 批量文章。
- 内容不完整的多语言版本。
- 独立移动 App。

### 2.3 编辑独立与商业专栏原则

公开站点允许在 `Brand Focus` 中介绍 ISDIN 品牌及其产品，但必须让读者明确区分 BES3 的编辑内容、商家提供的信息和联盟推广关系。主站品牌、设计语言和通用栏目不能改造成 ISDIN 仿站，也不能暗示 BES3 是品牌官方渠道。

ISDIN 专栏及商业链接遵循以下原则：

- 商业合作不能改变编辑结论。
- 只有与文章问题和读者需求自然匹配时才出现购买链接。
- 商家关系在首个商业链接之前清楚披露。
- 不使用伪造折扣、虚假稀缺、自动跳转和劫持式优惠券策略。
- 不通过对方商标竞价、仿冒域名或未经授权的品牌素材获客。
- 只有在获得使用授权后才展示 ISDIN Logo、产品图和营销素材。
- ISDIN 专栏沿用 BES3 视觉系统；品牌色只可作为局部内容识别，不能覆盖全站设计。
- 若文章由品牌付费委托，必须标记 `Sponsored`；只有联盟佣金关系时标记 `Affiliate`，两者不能混用。

## 3. 品牌策略

### 3.1 名称与释义

- 正式品牌名：**BES3**
- 视觉字标：**BES³**
- 域名及无障碍文本：**BES3**

名称解释：

- **B — Beauty**：以美容护肤和日常使用体验为话题范围。
- **E — Evidence**：重视证据质量、来源、局限和信息透明度。
- **S — Skin**：从真实皮肤需求出发，而不是从营销热点出发。
- **3**：每个建议都从 Evidence、Fit、Experience 三个维度判断。

`BES³` 仅用于视觉字标。页面标题、正文、Alt 文本、SEO 和语音朗读均使用 `BES3`，避免上标字符造成搜索和可访问性问题。

### 3.2 品牌定位

> BES3 is an independent skincare editorial platform for clearer decisions about ingredients, routines and product categories.

中文内部表述：

> BES3 是一个帮助消费者理解护肤成分、流程和产品类别的独立功效护肤编辑媒体。

### 3.3 品牌主张

主标语：

> Better evidence. Better choices. Better skin.

首页主标题：

> Skincare, examined more clearly.

首页说明：

> Independent guides to ingredients, routines and the product choices behind healthier-looking skin.

### 3.4 品牌性格

| 维度   | BES3 的表达            | 避免的表达                 |
| ------ | ---------------------- | -------------------------- |
| 专业度 | 清晰、有出处、说明限制 | 冒充医学机构、堆砌术语     |
| 语气   | 冷静、友好、直接       | 恐吓、夸张、绝对承诺       |
| 审美   | 编辑化、克制、有触感   | 通用 SaaS 模板、廉价电商风 |
| 商业性 | 透明、选择性推荐       | 满屏 CTA、伪折扣、强迫购买 |
| 权威性 | 展示方法和证据等级     | 虚构医生、实验和用户数据   |

### 3.5 写作语气

内容默认使用美式英语，遵循以下规则：

- 用普通读者能理解的语言解释术语。
- 不使用 `miracle`、`cure`、`erase`、`guaranteed` 等绝对化词汇。
- 将“适合谁”和“可能不适合谁”放在同等重要的位置。
- 区分品牌宣称、研究结论、编辑判断和实际体验。
- 医学问题建议咨询具备资质的专业人士。
- 首次出现缩写时写出全称。
- 标题使用 sentence case，不使用全大写制造压力。

## 4. 受众与需求

### 4.1 主要受众

首期面向 25–45 岁、主动研究护肤信息的美国英语用户。典型特征：

- 关注防晒、光老化、色沉、干燥、敏感和细纹。
- 愿意为适合自己的中高端功效护肤品付费。
- 会搜索活性成分、浓度、搭配和使用顺序。
- 对营销宣称保持警惕，希望获得更清晰的选择依据。
- 常在多个产品类型和价位间比较，而不是只忠于一个品牌。

### 4.2 核心用户任务

1. 我应该先解决哪个护肤问题？
2. 某种成分真正能做什么，不能做什么？
3. 两类产品之间有什么差异？
4. 如何把新产品放进现有早晚流程？
5. 哪种质地、剂型或过滤剂更适合我的使用场景？
6. 一个产品宣称的证据强度如何？
7. 购买前还应考虑哪些限制、刺激风险和替代方案？

### 4.3 核心使用路径

```text
搜索引擎 / 社交内容 / Newsletter
              ↓
        问题或成分文章
              ↓
   相关流程、产品指南或 Brand Focus
              ↓
     通用选择标准 / ISDIN 内容文章
              ↓
      CTA → ISDIN 官方/联盟页面
```

## 5. 信息架构

### 5.1 主导航

桌面端主导航：

1. Skin Concerns
2. Ingredients
3. Routines
4. Product Guides
5. Brand Focus
6. Journal

搜索作为右侧独立操作，不计入栏目数量。`About` 放入桌面端 Utility navigation 与页脚，移动端菜单中仍直接可见。移动端使用全屏菜单；不设置底部导航，避免内容型网站产生 App 化误导。

### 5.2 一级栏目

#### Skin Concerns

- Sun Damage
- Uneven Tone
- Fine Lines
- Dryness
- Sensitivity
- Blemishes
- Dullness

#### Ingredients

- Retinal
- Retinol
- Vitamin C
- Niacinamide
- Tranexamic Acid
- Hyaluronic Acid
- Ceramides
- Peptides
- Azelaic Acid
- Sunscreen Filters

#### Routines

- Morning Routines
- Evening Routines
- Beginner Routines
- Sensitive-Skin Routines
- Seasonal Routines
- Ingredient Pairing

#### Product Guides

- Facial Sunscreens
- Mineral Sunscreens
- Tinted Sunscreens
- Antioxidant Serums
- Retinoid Serums
- Dark-Spot Serums
- Moisturizers
- Eye Treatments
- Cleansers

#### Brand Focus

- ISDIN
- Sun Care
- Photoaging & Well-Aging
- Face Care
- Ingredient & Formula Guides
- Product Comparisons

`Brand Focus` 是可扩展内容类型，而不是只能容纳 ISDIN 的硬编码栏目。未来增加其他品牌时沿用相同的内容模型、披露规则和 CTA 组件。

#### Journal

- Methods
- Research Notes
- Skin Culture
- Editor's Notes

### 5.3 路由规划

| 页面             | 路由模式                     | 首期 |
| ---------------- | ---------------------------- | ---: |
| 首页             | `/`                          | 必须 |
| 问题索引         | `/concerns/`                 | 必须 |
| 问题详情         | `/concerns/[slug]/`          | 必须 |
| 成分索引         | `/ingredients/`              | 必须 |
| 成分详情         | `/ingredients/[slug]/`       | 必须 |
| 流程索引         | `/routines/`                 | 必须 |
| 流程详情         | `/routines/[slug]/`          | 必须 |
| 产品指南索引     | `/product-guides/`           | 必须 |
| 产品指南详情     | `/product-guides/[slug]/`    | 必须 |
| Brand Focus 索引 | `/brand-focus/`              | 必须 |
| ISDIN 专题主页   | `/brand-focus/isdin/`        | 必须 |
| ISDIN 专栏文章   | `/brand-focus/isdin/[slug]/` | 必须 |
| Journal 索引     | `/journal/`                  | 必须 |
| Journal 文章     | `/journal/[slug]/`           | 必须 |
| 搜索             | `/search/`                   | 必须 |
| 作者页           | `/authors/[slug]/`           | 必须 |
| 关于             | `/about/`                    | 必须 |
| 编辑标准         | `/editorial-standards/`      | 必须 |
| 内容评估方法     | `/how-we-evaluate/`          | 必须 |
| 联盟披露         | `/affiliate-disclosure/`     | 必须 |
| 医疗免责声明     | `/medical-disclaimer/`       | 必须 |
| 隐私政策         | `/privacy/`                  | 必须 |
| 联系页面         | `/contact/`                  | 必须 |
| 404              | `/404.html`                  | 必须 |

不设置传统的品牌目录或 Logo 墙。品牌内容统一进入 `Brand Focus`，由编辑主题、产品指南和明确披露组成；ISDIN 是首个专题，但不能控制主导航以外的通用内容。

## 6. 页面设计

### 6.1 全局页头

桌面布局：

```text
┌────────────────────────────────────────────────────────────┐
│ BES³     Concerns  Ingredients  Routines  Guides  Journal  ◯ │
└────────────────────────────────────────────────────────────┘
```

- 高度 80px，滚动后可变为 64px 的轻量 sticky header。
- Logo 链接回首页。
- 当前栏目以文字权重和 2px 下划线同时标记，不能只靠颜色。
- 搜索按钮包含可访问名称 `Search BES3`。
- 键盘用户可在页首看到 `Skip to content`。
- 移动端使用 Logo、Search、Menu 三部分；Menu 打开后锁定背景滚动并可用 Escape 关闭。

### 6.2 首页

首页承担“品牌可信度、内容发现、编辑方法和专题发现”四个任务。首页可以展示一处 ISDIN Brand Focus 入口，但不放置直接购买按钮；联盟 CTA 只进入专题页或具有充分产品语境的文章页。

#### 模块顺序

1. **Editorial hero**
   - Eyebrow：`INDEPENDENT SKINCARE EDITORIAL`
   - H1：`Skincare, examined more clearly.`
   - 说明文案。
   - 主 CTA：`Explore the essentials`
   - 次级文字链接：`How we evaluate skincare`
   - 右侧使用定制摄影或抽象皮肤/质地图，不使用商品包装拼贴。

2. **Current issue / 主编内容**
   - 一篇主文章占 7 栏，两篇次文章占 5 栏。
   - 主文章图片比例 4:3，次文章比例 3:2。
   - 只展示栏目、标题、摘要和阅读时间，不展示虚假热度。

3. **Explore by concern**
   - 7 个问题使用带序号的文字列表，而不是七张完全相同的圆角卡。
   - 桌面为两列错位排版，移动端单列。

4. **Ingredient briefing**
   - 本期核心成分说明。
   - 包含 `What it can do`、`What it cannot do` 和 `Pairs well with`。
   - 跳转成分详情页。

5. **The daily three**
   - Protect / Treat / Support 三步编辑框架。
   - 用于解释流程逻辑，不展示具体商家产品。

6. **Product category guides**
   - 基于使用场景分类，如 `Daily facial sunscreen`、`Night retinoid serum`。
   - 卡片必须说明选择维度，而不只放商品图。

7. **Brand Focus: ISDIN**
   - Eyebrow：`BRAND FOCUS 01`。
   - 标题：`ISDIN: sun care, photoaging and daily skin health`。
   - 只放一段编辑介绍、一张经授权的品牌/产品图和 `Explore the ISDIN feature` 入口。
   - 首页入口跳转 BES3 的 ISDIN 专题主页，不直接跳出到商家网站。
   - 联盟关系生效前显示 `Editorial brand feature`；关系生效后改为 `Affiliate content` 并显示简短披露，不能提前暗示合作。

8. **From the editor's notebook**
   - 展示研究方法、标签阅读和宣称判断类文章。

9. **Our standard**
   - 三项承诺：`Sources shown`、`Commercial ties disclosed`、`Reviewed for currency`。
   - 链接至编辑标准页。

10. **Newsletter**

- 标题：`A clearer note on skincare, twice a month.`
- 不使用弹窗强迫订阅。
- 表单包含可见 Label、隐私说明、成功和失败反馈。

11. **页脚**

#### 首页反模板要求

- 不采用等宽三卡片连续堆叠作为主要版式。
- 不使用蓝紫渐变、玻璃拟态和悬浮发光按钮。
- 不使用“Trusted by thousands”等无数据支撑的社会证明。
- 不使用 AI 生成的人物头像冒充编辑团队。
- 不使用无限自动轮播。
- 不在首屏放置多个同等级 CTA。

### 6.3 问题详情页

以 `/concerns/uneven-tone/` 为例：

1. Breadcrumb
2. H1 与 2–3 句范围说明
3. `Start here` 主文章
4. 问题的常见成因（非诊断）
5. Relevant ingredients
6. Suggested routine framework
7. Product category guides
8. What to avoid / When to seek professional help
9. 最新相关文章
10. 参考来源与更新时间

### 6.4 成分详情页

1. 成分名、别名和类别
2. 一句话摘要
3. Evidence snapshot
4. What it may help with
5. What evidence does not show
6. 常见剂型与浓度说明
7. 使用频率与流程位置
8. 搭配与潜在刺激
9. 适用和慎用人群
10. 相关文章及来源

不得创建没有真实依据的统一“成分评分”。如需要快速判断，使用文字级别：`Well established`、`Promising`、`Limited`，并同时解释判定方法。

### 6.5 Routine 页面

1. 使用场景与适用对象
2. 最小可行流程
3. Morning / Evening stepper
4. 每一步的目的和产品类型
5. 可选增强步骤
6. 新成分引入节奏
7. 常见冲突和简化建议
8. 相关成分和问题页

Step 内容在移动端纵向排列，不能依赖横向拖动才能阅读。

### 6.6 Product Guide 页面

首发阶段以“如何选择某一类产品”为重点，不强制列出具体商品。

1. Category definition
2. Who it is for
3. Key decision criteria
4. Texture / finish / packaging considerations
5. Ingredient and formulation considerations
6. Use-case comparison table
7. How to use
8. Common mistakes
9. Related routines

未来增加具体选项时，每个选项统一展示：

- Best for
- Key characteristics
- Texture / finish
- Important limitations
- Editorial reason for inclusion
- Last checked date
- 商业关系披露（如适用）

### 6.7 Brand Focus 索引与 ISDIN 专题主页

`/brand-focus/` 用于展示所有当前和历史品牌专题。首发只有 ISDIN 时，不制造空品牌卡片或虚构即将合作的品牌。

ISDIN 专题主页 `/brand-focus/isdin/` 的结构：

1. Breadcrumb 与 `BRAND FOCUS 01` 标签。
2. H1：`ISDIN: sun care, photoaging and daily skin health`。
3. 可见披露：说明页面可能包含联盟链接，BES3 可能获得佣金。
4. 独立编辑导语：品牌背景、关注理由和适用读者。
5. `At a glance`：Sun care、Face care、Body care、Shop by concern。
6. 防晒与光老化主题导读。
7. ISDIN 内容文章网格。
8. `How to choose` 产品选择矩阵。
9. 品牌宣称与 BES3 编辑判断的区分说明。
10. 参考资料、素材来源和最后核验日期。
11. 文章列表后的主 CTA：`Visit ISDIN's official site`。

专题主页可以使用获得授权的 ISDIN Logo 或产品图片，但必须遵循品牌资产规范并保留 BES3 页头、字体、按钮和色彩系统。未获得授权时只使用文字品牌名、BES3 自制信息图和可合法使用的编辑摄影。

### 6.8 ISDIN 专栏文章与 CTA 布局

ISDIN 专栏文章分为三类：

- `Brand guide`：品牌与产品线介绍。
- `Product guide`：单品或同品牌产品比较。
- `Routine feature`：把合适的 ISDIN 产品放入防晒、光老化或色沉流程。

产品文章结构：

1. Breadcrumb、Brand Focus 标签、标题、摘要、作者与更新时间。
2. 首屏披露条，不与正文或背景混色。
3. `BES3 verdict`：适合谁、不适合谁和编辑结论。
4. 第一个 CTA：位于结论和产品语境之后，不能放在读者尚未看到任何信息的页面最顶部。
5. 关键特征、成分/过滤剂、质地、用法和局限。
6. 品牌宣称与证据来源。
7. 与同类产品或同品牌选项的比较。
8. 第二个 CTA：文章结尾的下一步操作。
9. Sources、Method note、Author 和 Related reading。

单篇文章最多设置两个主要联盟 CTA。移动端不使用粘性底部购买栏，不通过弹窗、滚动触发覆盖层或重复按钮施压。

推荐 CTA 文案：

- `Visit ISDIN`
- `Check the current price at ISDIN`
- `Explore this product at ISDIN`
- `Shop the official ISDIN site`

CTA 内容框示意：

```text
┌──────────────────────────────────────────────────────┐
│ AFFILIATE DISCLOSURE                                 │
│ BES3 may earn a commission from selected links.     │
│                                                      │
│ See current availability and product details         │
│ on the official ISDIN website.                       │
│                                                      │
│ [ Check the current price at ISDIN  ↗ ]              │
└──────────────────────────────────────────────────────┘
```

Disclosure、说明和按钮属于同一个语义容器。说明文字使用普通段落，按钮必须是真实 `<a>` 链接而不是绑定点击事件的 `<div>`。

避免 CTA 文案：

- `Buy now`（除非用户明确处于购买步骤）
- `Best price`
- `Lowest price guaranteed`
- `Limited stock`
- 任何没有实时、可核验依据的优惠表达

CTA 默认在同一标签页打开。如果业务决定新开标签，按钮旁显示外部链接图标，并在可访问名称中加入 `opens in a new tab`。

### 6.9 Journal 文章页

- 顶部显示栏目、标题、摘要、作者、发布日期、更新时间和阅读时间。
- 正文最大宽度约 720px，桌面端左侧可有目录，右侧不放干扰阅读的粘性广告。
- 关键定义使用编辑注释块，引用使用脚注或编号参考资料。
- 文章末尾依次显示：Sources、Method note、Author、Related reading。
- 如果存在商业链接，文章开头可见区域加入简明披露。

### 6.10 About 与信任页面

About 页面必须说明：

- BES3 是什么。
- 为谁服务。
- 如何选题。
- 如何处理商业关系。
- 谁负责发布内容。
- 如何联系和请求更正。

不得使用虚构团队成员。只有真实可核验的人员才能建立作者页和公开资历。

### 6.11 搜索与 404

搜索：

- 使用静态全文搜索。
- 支持标题、摘要、成分、问题和产品类型字段。
- 搜索结果显示类型标签和简短摘要。
- 空结果提供拼写提示和三个热门入口。

404：

- 文案：`This page is no longer on the shelf.`
- 提供 Search、Ingredients、Routines 三个明确出口。
- 不使用戏谑内容削弱专业感。

## 7. 视觉设计系统

### 7.1 设计概念

设计方向：**Independent science editorial**。

视觉由独立杂志的编辑秩序、功效护肤的清晰度和真实材料的触感组成。页面主要依靠排版比例、留白、细线和图像构图建立层级，而不是依靠大量圆角卡片、投影和装饰动效。

### 7.2 Logo

首期字标结构：

```text
BES³
BEAUTY · EVIDENCE · SKIN
```

- `BES` 使用定制字距的无衬线粗体。
- `3` 为上标并与字标形成紧凑视觉单元。
- 副标只在宽版 Logo 和页脚出现。
- Favicon 使用 `B3` 或独立上标 3 图形，不缩小完整副标。
- 不使用叶片、试管、女性线稿、闪光星和水滴等常见美容模板符号。

### 7.3 色彩令牌

| Token             | 色值      | 用途                   |
| ----------------- | --------- | ---------------------- |
| `--color-ink`     | `#18201F` | 主文字、深色区域       |
| `--color-bone`    | `#F4F1E9` | 页面底色               |
| `--color-paper`   | `#FFFCF6` | 正文和高亮表面         |
| `--color-mineral` | `#3E6662` | 主品牌色、链接、主按钮 |
| `--color-clay`    | `#C66F4E` | 编辑标记和小面积点缀   |
| `--color-mist`    | `#DCE5E0` | 知识模块浅背景         |
| `--color-line`    | `#D4D1C8` | 边框和分隔线           |
| `--color-white`   | `#FFFFFF` | 深色按钮文字           |
| `--color-error`   | `#9C2F2F` | 错误状态               |
| `--color-success` | `#2F6851` | 成功状态               |

已验证的核心对比度：

| 组合            |  对比度 | 使用结论                 |
| --------------- | ------: | ------------------------ |
| Ink / Bone      | 14.71:1 | 正文和标题可用           |
| Ink / Paper     | 16.21:1 | 正文和标题可用           |
| Mineral / Paper |  6.25:1 | 链接和正文可用           |
| White / Mineral |  6.40:1 | 主按钮可用               |
| Ink / Mist      | 12.90:1 | 信息模块可用             |
| White / Clay    |  3.63:1 | 不用于普通按钮文字       |
| Clay / Paper    |  3.54:1 | 只用于大图形和非文字点缀 |

Clay 不作为普通字号文字色，也不与白字组合成主按钮。所有实际组件仍需在实现阶段自动检测 WCAG 对比度。

### 7.4 字体

- Display / Editorial heading：`Newsreader Variable`
- UI / Body：`Manrope Variable`
- 中文扩展：`Noto Sans SC`
- 回退：`Georgia, serif` 与 `system-ui, sans-serif`

字体文件本地托管，使用 WOFF2。只预加载首屏必需的两个 Variable 字体文件，设置 `font-display: swap`。

### 7.5 字号比例

| Token   | Desktop |  Mobile | 用途              |
| ------- | ------: | ------: | ----------------- |
| Display | 72/0.98 | 44/1.02 | 首页 H1           |
| H1      | 56/1.04 | 38/1.08 | 页面标题          |
| H2      | 40/1.12 | 30/1.16 | 一级区块          |
| H3      |  28/1.2 | 24/1.25 | 卡片或正文小节    |
| Lead    | 21/1.55 | 19/1.55 | 摘要              |
| Body    |  17/1.7 | 16/1.65 | 正文              |
| Small   |  14/1.5 |  14/1.5 | 元数据            |
| Label   |  12/1.3 |  12/1.3 | Eyebrow，增加字距 |

使用 `clamp()` 在断点间平滑缩放。正文每行控制在 60–75 个英文字符；移动端控制在 35–60 个字符。

### 7.6 网格与间距

- 全局最大宽度：1280px。
- 正文最大宽度：720px。
- 桌面：12 栏，32px gutter，外边距不小于 40px。
- 平板：8 栏，24px gutter，外边距 32px。
- 手机：4 栏，16px gutter，外边距 20px。
- 间距基准：4px；常用序列为 4、8、12、16、24、32、48、64、96、128。
- 区块上下间距：桌面 96–128px，移动端 64–80px。

### 7.7 圆角、边框与阴影

- 小控件：4px。
- 图片和内容表面：0–8px。
- Pills 仅用于短标签，不能把所有按钮和卡片都做成胶囊形。
- 主要分隔使用 1px 实线。
- 默认卡片无阴影。
- 浮层阴影仅用于移动菜单和 Dialog，并使用统一 elevation token。

### 7.8 图像系统

摄影方向：

- 自然光下的皮肤纹理、手部、材料和日常使用场景。
- 防晒霜、乳霜、精华的抽象质地图。
- 玻璃、陶瓷、织物、矿物和水面等材料摄影。
- 色温自然，保留真实肤色，不进行过度磨皮。

禁止：

- 未授权品牌包装作为装饰。
- 没有真实身份的 AI 专家头像。
- 夸张的 before/after 图像。
- 不真实的医学实验室场景。
- 一眼可见的通用美容图库拼接。

图像规格：

- 优先 AVIF，WebP 回退。
- 使用 Astro 图片管线生成响应式尺寸。
- 写明 `width`、`height` 或 `aspect-ratio` 防止 CLS。
- 首屏主图可 `fetchpriority="high"`，其余图片懒加载。
- Alt 文本描述图像信息；纯装饰图使用空 Alt。

### 7.9 图标

- 使用单一 SVG 线性图标系统，建议 Lucide，统一 1.5px stroke。
- 常用尺寸为 16、20、24px。
- 图标按钮可视图标可小于 24px，但点击区域不小于 44×44px。
- 不使用 Emoji 作为导航和功能图标。

### 7.10 动效

- Hover / focus：150–180ms。
- 菜单和 disclosure：220–280ms。
- 只动画 `opacity` 和 `transform`。
- 不使用滚动劫持、循环漂浮、鼠标跟随和大面积视差。
- 同一屏幕最多有 1–2 个有意义的进入动效。
- `prefers-reduced-motion: reduce` 时关闭非必要动画并取消平滑滚动。

## 8. 组件系统

### 8.1 基础组件

- `Container`
- `Section`
- `Stack`
- `Cluster`
- `Grid`
- `Divider`
- `VisuallyHidden`
- `SkipLink`

### 8.2 导航组件

- `SiteHeader`
- `DesktopNavigation`
- `MobileMenu`
- `Breadcrumbs`
- `SearchTrigger`
- `SiteFooter`

### 8.3 内容组件

- `ArticleCard`：hero、standard、compact 三种变体。
- `ConcernIndex`
- `IngredientBrief`
- `EvidenceSnapshot`
- `RoutineSteps`
- `DecisionTable`
- `SourceList`
- `AuthorByline`
- `UpdatedBadge`
- `DisclosureNotice`
- `BrandFocusCard`
- `BrandProfileHeader`
- `ProductSnapshot`
- `MedicalNote`
- `RelatedReading`

### 8.4 商业与 CTA 组件

- `AffiliateDisclosure`
- `AffiliateCTA`
- `MerchantLink`
- `PriceCheckedAt`
- `ExternalLinkIcon`

`AffiliateCTA` 是文章中唯一允许渲染主联盟按钮的组件。推荐接口：

```ts
type AffiliateCTAProps = {
  linkId: string;
  brand: "isdin" | string;
  label: string;
  description?: string;
  placement: "after-verdict" | "article-end" | "brand-hub";
  articleSlug: string;
  opensInNewTab?: boolean;
};
```

组件要求：

- 按钮使用 BES3 Mineral 色，不复制 ISDIN 按钮样式。
- 点击区域高度不低于 48px，移动端可占满内容宽度。
- Focus Ring 至少 2px，并与按钮边缘保持间隔。
- 按钮上方或同一容器内必须有联盟披露，不能依赖页脚披露。
- 链接来自统一 Link Registry，MDX 不直接写长联盟 URL。
- CTA 配置了无效、空白或非 HTTPS 链接时构建失败，不能发布 `href="#"`。
- 若联盟链接尚未获得，可暂时使用经过核验的普通官方链接；不得把普通链接计为联盟转化。
- 外链统一添加 `rel="sponsored nofollow noopener"`；只有实际商业关系生效后才使用 `sponsored`。
- CTA 不显示未经自动更新或人工核验的价格。

### 8.5 表单组件

- `TextField`
- `EmailField`
- `Textarea`
- `Checkbox`
- `Button`
- `InlineError`
- `FormStatus`

表单要求：

- 永远显示 Label，不以 placeholder 代替。
- 输入高度不低于 44px。
- 在 blur 或提交时验证，不在每次按键时连续报错。
- 错误信息紧邻字段并通过 `aria-describedby` 关联。
- 提交后显示进行中、成功和失败状态。
- 多错误时聚焦第一个错误字段。

### 8.6 按钮层级

- Primary：Mineral 背景 + White 文字。
- Secondary：透明背景 + Ink 边框。
- Tertiary：纯文字 + 下划线/箭头。
- 每个页面或模块只有一个主操作。
- 禁用状态同时具备原生 `disabled` 和视觉弱化，不能只改颜色。

## 9. 内容与编辑体系

### 9.1 内容支柱

| 支柱              | 比例 | 目标                         |
| ----------------- | ---: | ---------------------------- |
| Ingredients       |  25% | 建立成分知识入口             |
| Skin Concerns     |  20% | 承接问题型搜索               |
| Routines          |  15% | 将知识转化为可执行步骤       |
| Product Guides    |  15% | 承接购买前决策               |
| Brand Focus       |  15% | 品牌教育、产品语境与联盟转化 |
| Methods / Journal |  10% | 展示编辑独立性和专业方法     |

该比例是发布后的长期内容目标。为准备首个品牌专题，首发批次中 Brand Focus 可以暂时占到 25%，之后通过持续发布通用内容降低单一品牌集中度。

### 9.2 首发内容清单

上线前至少发布 18 篇实质内容，建议首批 24 篇，其中 18 篇通用内容、6 篇 ISDIN Brand Focus 内容：

#### Sun protection & photoaging

1. UVA vs UVB: What Your Sunscreen Needs to Cover
2. What Photoaging Looks Like—and What You Can Do About It
3. How Much Sunscreen Should You Actually Apply?
4. Mineral vs Organic Sunscreen Filters
5. How to Choose a Facial Sunscreen You Will Use Every Day

#### Ingredients

6. Retinal vs Retinol: What Is the Difference?
7. A Beginner's Guide to Tranexamic Acid
8. Vitamin C in Skincare: Forms, Stability and Routine Placement
9. What Hyaluronic Acid Can—and Cannot—Do
10. Niacinamide: Benefits, Concentrations and Common Mistakes
11. Ceramides and the Skin Barrier: A Practical Guide

#### Routines

12. A Practical Morning Routine for Uneven Skin Tone
13. How to Introduce a Retinoid Without Overcomplicating Your Routine
14. Can You Use Vitamin C and Retinal in the Same Routine?
15. A Minimal Routine for Dry, Sensitive Skin
16. How to Build a Routine Around Daily Sun Protection

#### Methods & product categories

17. How BES3 Reads a Skincare Claim
18. Texture, Finish and Packaging: How to Choose a Daily Facial Sunscreen

#### Brand Focus: ISDIN

19. ISDIN Brand Guide: Sun Care, Face Care and Photoaging
20. ISDIN Fusion Water MAGIC: Texture, Filters and Who It May Suit
21. ISDIN Actinica vs Ageless: How the Mineral Sunscreens Compare
22. ISDIN Melatonik: An Overnight Recovery Serum Guide
23. ISDIN Retinal Advanced: Who It Is For and How to Use It
24. Building a Dark-Spot Routine with ISDIN Melaclear Advanced

如果编辑没有完成真实产品使用测试，标题和正文必须使用 `guide`、`formula analysis` 或 `claims analysis`，不得使用 `tested`、`hands-on review` 或虚构体验。产品名称、配方、规格和宣称在发布前必须与目标市场的 ISDIN 官方页面逐项核验。

### 9.3 文章质量门槛

每篇文章必须具备：

- 明确的搜索意图和读者问题。
- 唯一 H1 与 120–160 字符 Meta description。
- 作者、发布日期和最后审核日期。
- 摘要和清晰标题层级。
- 适用人群与局限。
- 关键事实的可核验来源。
- 相关文章和下一步路径。
- 医学安全提醒（如适用）。
- 人工编辑和事实核查记录。

### 9.4 来源优先级

1. 系统综述、Meta 分析、临床指南。
2. 同行评审研究。
3. 政府、大学和专业医学组织资料。
4. 成分供应商技术资料（明确利益关系）。
5. 商家产品信息（只用于核验配方、规格和商家宣称）。

品牌页面和营销稿不能作为独立临床证据。不同证据冲突时，正文应说明不确定性，而不是选择最利于转化的一方。

### 9.5 内容审核流程

```text
选题与搜索意图
      ↓
资料搜集与来源分级
      ↓
结构提纲
      ↓
初稿
      ↓
事实核查 + 商业合规检查
      ↓
编辑与可读性检查
      ↓
发布
      ↓
6–12 个月定期复核 / 重大信息变更时提前复核
```

### 9.6 AI 使用政策

AI 可以协助：

- 整理提纲。
- 改善语言清晰度。
- 生成待核查的问题清单。
- 辅助元数据初稿。

AI 不可独立决定：

- 医学和成分事实。
- 研究结论。
- 产品实测体验。
- 推荐排名。
- 作者身份和专业资历。

任何 AI 辅助内容在发布前必须由真实编辑审核，不能把 AI 生成内容伪装为亲身体验。

## 10. 商业与联盟合规

### 10.1 披露原则

- 全站设置独立的 Affiliate Disclosure 页面。
- 含商业链接的文章，在第一个商业链接之前显示简短披露。
- 披露使用普通读者能理解的语言，而不是只写 `affiliate` 标签。
- 商业链接使用 `rel="sponsored nofollow noopener"`。
- 新窗口行为保持一致；默认同窗口，确需新窗口时告知用户。

推荐披露文案：

> BES3 may earn a commission when you purchase through selected links. This does not affect our editorial decisions or the price you pay.

### 10.2 禁止策略

- 未授权商标竞价。
- 浏览器插件或 Cookie 覆盖。
- 优惠券劫持和最后点击截流。
- 虚构原价、库存、销量或倒计时。
- 自动打开商家页面。
- 隐藏或缩短到无法识别去向的链接。
- 冒充商家官方站点。
- 购买虚假评论、流量或社交证明。

### 10.3 ISDIN CTA 与转化追踪

ISDIN Brand Focus 首发使用三类链接：

- `isdin-home`：品牌专题主页的官方站入口。
- `isdin-category-*`：Sun care、Face care 等分类入口。
- `isdin-product-*`：具体产品页面入口。

CTA 不直接在 MDX 中写 URL，而使用 `linkId` 解析。链接点击在不阻断导航的前提下记录以下非个人事件字段：

```ts
type AffiliateClickEvent = {
  event: "affiliate_outbound_click";
  linkId: string;
  brand: "isdin";
  articleSlug: string;
  placement: "after-verdict" | "article-end" | "brand-hub";
  destinationHost: "www.isdin.com";
};
```

- 不记录 Email、IP、自定义用户 ID 或文章阅读历史组合。
- Analytics 失败不能阻止跳转。
- 同一点击只发送一次事件。
- Preview 环境不计入生产转化。
- 报表区分品牌主页、品类页和产品页点击。
- 如联盟计划提供 Sub ID，使用非个人的文章和位置代码，不放用户标识。

首期重点观察：文章到 CTA 的可见率、CTA 点击率、不同 placement 的点击差异和失效链接数量。任何收益或转化数据只在获得联盟平台真实回传后报告。

### 10.4 链接治理

- 在联盟资格未生效时，同一视觉位置使用非商业的 `MerchantLink` 链接经核验的 ISDIN 官方普通 URL，不渲染 `AffiliateCTA`，也不记录联盟转化。
- 资格生效后，将 Link Registry 关系改为 `affiliate`，替换为批准的联盟 Deep Link，并由 `AffiliateCTA` 自动加入披露、`rel="sponsored"` 和转化事件。
- 不能在文章正文内批量搜索替换长 URL。
- 除非联盟条款明确允许，不通过站内 `/go/` 重定向隐藏最终商家地址。
- 每条 ISDIN 链接记录目标市场、原始官方 URL、联盟 URL、状态和最后检查时间。
- CI 对所有启用 CTA 运行 HTTPS、允许域名、空值和重复 ID 检查。
- 产品下架、地区不可用或合作结束时，优先回退普通官方链接；没有合适目标时移除 CTA，而不是跳到无关页面。

### 10.5 商家扩展模型

商家信息不硬编码在页面组件中。数据层至少包含：

```ts
type Merchant = {
  id: string;
  name: string;
  markets: string[];
  homepageUrl: string;
  affiliateBaseUrl?: string;
  affiliateNetwork?: string;
  relationship: "editorial" | "affiliate" | "sponsored";
  disclosureVariant: "standard" | "custom";
  allowedAssets?: string[];
  prohibitedTerms?: string[];
  lastReviewedAt: string;
};
```

首个数据实例为 `isdin`，但组件、路由生成器和 Link Registry 不能使用只适用于 ISDIN 的字段名。未来新增商家时创建新的 Brand Focus 数据和内容，不复制整个页面实现。

### 10.6 ISDIN 站外申请介绍模板

以下文案用于私下提交给潜在合作商家，不作为公开网页内容：

> BES3 is an independent English-language skincare editorial platform focused on sun protection, photoaging, active ingredients, skin concerns and practical daily routines. The website helps ingredient-aware consumers understand product categories and make more informed skincare decisions.
>
> Our Brand Focus: ISDIN column introduces the brand through an educational hub, sun-care and photoaging guides, product comparisons and routine-based content. Promotional calls to action appear only after relevant editorial context and direct readers to verified official ISDIN pages.
>
> Commercial relationships are clearly disclosed, while all recommendations remain independently written. We acquire qualified readers through organic search, editorial content and an opt-in newsletter. We do not use misleading health claims, trademark bidding, coupon interception, fake reviews or unapproved brand assets.

申请时只能补充真实的站点数据、文章 URL 和流量信息，不得虚报访问量、订阅量或转化率。

## 11. SEO 与内容发现

### 11.1 技术 SEO

- 每页唯一 Title、Meta description 和 canonical URL。
- 生成 `sitemap-index.xml` 与分类型 sitemap。
- 提供 `robots.txt`。
- 提供 RSS Feed。
- 保证所有关键页面可从静态链接到达。
- 面包屑用于三层及以上页面。
- 规范化尾斜线策略。
- 404 返回真实 404 状态。
- 不对薄内容建立索引。

### 11.2 结构化数据

按页面类型使用：

- `Organization`
- `WebSite`
- `Person`
- `Article`
- `BreadcrumbList`
- `CollectionPage`（Brand Focus 与 ISDIN 专题主页）

首期不使用：

- 没有真实用户数据的 `AggregateRating`。
- 未经真实测试支撑的 `Review`。
- 价格、库存或可用性未持续核验的 `Product` Offer 数据。
- 将普通文章伪装为 `MedicalWebPage`。
- 与页面不可见内容不一致的 Schema。

### 11.3 站内链接

- 每篇文章至少链接一个父级主题页。
- 每篇文章推荐 2–4 篇真正相关内容。
- 成分页和问题页双向关联。
- Routine 页链接对应的成分和产品类型。
- 不使用自动生成的大量关键词锚文本。

### 11.4 URL 和重定向

- URL 使用小写英文和连字符。
- 发布后不随意修改 URL。
- 如必须修改，配置永久 301。
- `https://bes3.com` 为 canonical origin。
- `https://www.bes3.com/*` 301 到 apex，或反向统一；首选 apex。

## 12. 技术实施方案

### 12.1 技术栈

- Astro（静态输出）
- TypeScript（strict）
- Astro Content Collections
- Markdown / MDX
- 原生 CSS + Design Tokens
- Pagefind 静态全文搜索
- Vitest（单元测试）
- Playwright（关键页面和响应式检查）
- Axe（可访问性自动检查）
- ESLint + Prettier
- Cloudflare Pages
- Cloudflare Web Analytics（无 Cookie 优先配置）

选择 Astro 的原因：

- 内容型网站适配度高。
- 默认静态输出且可实现接近零客户端 JavaScript。
- 内容 Schema、图片优化和路由能力完整。
- 可在需要时局部加入交互组件。
- Cloudflare Pages 构建流程成熟。

### 12.2 JavaScript 原则

- 导航、正文、目录、披露和主要内容不依赖 JavaScript 才能访问。
- 只对搜索、移动菜单、Newsletter 状态等必要部分加载脚本。
- 不为静态卡片引入 React/Vue Runtime。
- 第三方脚本默认禁用，按业务价值逐个评估。

### 12.3 推荐目录结构

```text
.
├── docs/
│   └── bes3-design-implementation-plan.md
├── public/
│   ├── fonts/
│   ├── icons/
│   ├── _headers
│   ├── _redirects
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── base/
│   │   ├── commercial/
│   │   ├── content/
│   │   ├── forms/
│   │   ├── navigation/
│   │   └── seo/
│   ├── content/
│   │   ├── config.ts
│   │   ├── concerns/
│   │   ├── ingredients/
│   │   ├── routines/
│   │   ├── product-guides/
│   │   ├── brand-focus/
│   │   ├── journal/
│   │   └── authors/
│   ├── data/
│   │   ├── affiliate-links/
│   │   ├── brands/
│   │   ├── merchants/
│   │   └── navigation.ts
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── ArticleLayout.astro
│   │   └── IndexLayout.astro
│   ├── pages/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── reset.css
│   │   ├── global.css
│   │   └── utilities.css
│   └── utils/
├── tests/
│   ├── unit/
│   └── e2e/
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── wrangler.toml
```

### 12.4 Content Collections

通用文章字段：

```ts
{
  title: string;
  description: string;
  publishDate: Date;
  updatedDate?: Date;
  author: string;
  draft: boolean;
  featured: boolean;
  image: ImageMetadata;
  imageAlt: string;
  concerns: string[];
  ingredients: string[];
  productTypes: string[];
  brand?: string;
  brandFocusType?: "brand-guide" | "product-guide" | "routine-feature";
  readingMinutes?: number;
  sources: Source[];
  disclosure: "none" | "affiliate" | "sponsored";
  commercial?: {
    merchantId: string;
    ctaLinkIds: string[];
    assetApprovalRef?: string;
  };
  reviewedBy?: string;
  reviewDueDate?: Date;
  seo?: {
    title?: string;
    description?: string;
    noindex?: boolean;
  };
}
```

`reviewedBy` 只能引用真实存在的作者/审核者，不得填入泛化的 `Medical Team`。

ISDIN Brand Focus 内容必须设置 `brand: "isdin"`、正确的 `brandFocusType` 和 `disclosure`。当 `disclosure` 为 `affiliate` 或 `sponsored` 时，Schema 校验要求存在 `commercial` 配置；反之不允许渲染 `AffiliateCTA`。

### 12.5 链接管理

- 内容文件只引用内部 Link ID，不直接散落联盟 URL。
- 构建时根据市场和环境解析目标链接。
- 建立链接有效性检查脚本。
- 只允许批准的 ISDIN 域名和联盟网络域名作为生产目标。
- 每条商业链接记录 `lastCheckedAt`。
- 当商家合作失效时，可以统一回退到普通官方链接或隐藏 CTA。

### 12.6 Newsletter 与 Contact

首发可选择两种方式：

1. 使用合规 Newsletter 服务商的原生表单 Endpoint。
2. 使用极小的 Cloudflare Pages Function 代理请求，并配置 Turnstile 防滥用。

无论采用哪种方式：

- 在隐私政策中列出实际服务商和数据用途。
- 只收集必要字段，首期只需要 Email。
- 使用 double opt-in。
- 不预勾选营销同意。
- 开发环境不发送真实订阅请求。
- 尚未配置服务商时不展示假表单；可以只展示联系邮箱。

### 12.7 安全响应头

`public/_headers` 至少设置：

```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: DENY
  Cross-Origin-Opener-Policy: same-origin
  Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'wasm-unsafe-eval'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```

CSP 应根据实际 Analytics、Newsletter 和图片来源逐项放行，不能长期使用 `*`。如果表单提交到第三方，需要调整 `form-action` 或 `connect-src`。

### 12.8 缓存策略

- 带内容哈希的字体、CSS、JS 和图片：`public, max-age=31536000, immutable`。
- HTML：允许 Cloudflare 缓存，但保持可快速更新。
- Sitemap、RSS 和 robots：短缓存。
- 不手工缓存可能包含表单响应的 Function 路径。

## 13. Cloudflare Pages 部署

### 13.1 Git 集成

- Production branch：`main`
- Build command：`npm run build`
- Build output directory：`dist`
- Node 版本：在 `.nvmrc` 或 `package.json#engines` 固定当前 LTS。
- Pull Request 开启 Preview Deployment。
- 生产环境变量和 Preview 环境变量分开管理。

### 13.2 域名接入

1. 在 Cloudflare 中管理 `bes3.com` DNS。
2. 在 Workers & Pages 创建 Pages 项目并连接 Git 仓库。
3. 完成首次构建后添加 Custom Domain：`bes3.com`。
4. 添加 `www.bes3.com` 并永久重定向到 apex。
5. 确认 Universal SSL 生效。
6. 开启 Always Use HTTPS。
7. 检查 HTTP、www、大小写和尾斜线路由是否统一。

### 13.3 环境划分

| 环境       | 域名          | 用途                    |
| ---------- | ------------- | ----------------------- |
| Local      | `localhost`   | 开发                    |
| Preview    | `*.pages.dev` | PR 验收，不提交搜索引擎 |
| Production | `bes3.com`    | 正式站点                |

Preview 环境设置 `noindex, nofollow`，避免预览内容进入搜索结果。

### 13.4 CI 质量门

合并到 `main` 前必须通过：

```text
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run check:links
npm run check:affiliate-links
```

如果 GitHub Actions 暂未配置，Cloudflare 构建至少运行 lint、typecheck 和 build。

### 13.5 发布与回滚

- 每次合并前检查 Preview URL。
- 发布后运行 smoke test：主页、一个索引页、一个文章页、搜索、404、sitemap。
- 生产故障时使用 Cloudflare Pages 上一个成功 Deployment 回滚。
- 内容重大错误直接撤回文章或标记 noindex，不等待下一批发布。

## 14. 性能、可访问性与质量目标

### 14.1 Core Web Vitals

移动端目标：

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1
- 首屏压缩后页面资源尽量 ≤ 1MB
- 首屏 JavaScript gzip 尽量 ≤ 50KB

### 14.2 Lighthouse 目标

- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

分数只是门槛，不代替真实设备和键盘测试。

### 14.3 可访问性

目标达到 WCAG 2.2 AA：

- 正文对比度至少 4.5:1。
- 大文字和 UI 图形满足相应对比要求。
- 完整键盘导航和可见 Focus Ring。
- 语义化标题，不跳级。
- 所有表单有可见 Label。
- 图标按钮有可访问名称。
- 有意义图片有准确 Alt。
- 错误和成功不能只靠颜色表达。
- 支持 200% 文本缩放。
- 支持 reduced motion。
- 路由变化后焦点进入主内容。
- 表格在移动端可理解，必要时改为堆叠比较项，而不是单纯横向滚动。

### 14.4 响应式测试矩阵

至少检查：

- 320×568
- 375×812
- 390×844
- 768×1024
- 1024×768
- 1280×800
- 1440×900

浏览器：当前 Chrome、Safari、Firefox 以及 iOS Safari。检查竖屏和手机横屏。

### 14.5 内容 QA

- 页面无 Lorem ipsum、占位头像、假统计数据。
- 无空栏目和“Coming soon”导航死路。
- 所有内部链接有效。
- 所有外部来源能打开且与论述匹配。
- 日期、作者和更新信息一致。
- ISDIN Brand Focus 与通用编辑栏目边界清楚。
- 所有 ISDIN 商业文章在首个 CTA 前显示正确披露。
- 所有 CTA 的文字、目标域名、linkId、关系类型和最后检查时间正确。
- 不出现未经确认的官方合作、授权或独家关系表述。
- 不出现医疗诊断或治疗承诺。
- 未授权 ISDIN Logo、包装和营销素材不得进入生产构建。

## 15. 分阶段实施计划

### Phase 0：基础确认（0.5–1 天）

- 确认域名 DNS 控制权。
- 确认 Git 托管和 Cloudflare 账户。
- 确认真实发布者、作者署名和联系邮箱。
- 选择 Newsletter 服务商或决定首发暂不启用。
- 建立图片授权记录。
- 确认 ISDIN 联盟计划的目标市场、推广链接格式和商标使用条款。
- 获取或记录 ISDIN 品牌/产品素材的授权状态。

完成标准：所有依赖项有明确负责人，不使用虚构信息填补空缺。

### Phase 1：工程骨架（1–2 天）

- 初始化 Astro + TypeScript。
- 配置 Content Collections。
- 配置 ESLint、Prettier、Vitest、Playwright。
- 建立目录结构和 Design Tokens。
- 配置基础 SEO、sitemap、RSS、robots。
- 配置 Cloudflare Preview Deployment。

完成标准：空内容站点能在 Preview 构建，质量脚本可运行。

### Phase 2：设计系统与核心布局（2–3 天）

- 完成 Logo 字标和 Favicon。
- 实现 Header、Footer、Mobile Menu、Search Trigger。
- 实现字体、颜色、网格、按钮、表单和卡片。
- 实现 AffiliateDisclosure、AffiliateCTA 和 BrandFocusCard。
- 实现 BaseLayout、IndexLayout、ArticleLayout。
- 完成 375px、768px、1440px 三个关键断点验证。

完成标准：组件状态齐全，通过基本键盘和对比度检查。

### Phase 3：页面模板（3–4 天）

- 首页。
- Concern、Ingredient、Routine、Product Guide 索引和详情模板。
- Brand Focus 索引、ISDIN 专题主页和三类商业文章模板。
- Journal 文章模板。
- About、Editorial Standards、How We Evaluate。
- Affiliate Disclosure、Privacy、Medical Disclaimer、Contact。
- Search 与 404。

完成标准：所有路由有真实模板和互相链接，无导航死路。

### Phase 4：首发内容（5–8 天，可并行）

- 完成 24 篇首发内容的研究、写作和审核，其中 6 篇为 ISDIN Brand Focus。
- 制作或采购一致的图片素材。
- 完成作者信息和来源记录。
- 建立主题页与站内链接。
- 核查所有医疗和商业表达。

完成标准：至少 18 篇达到发布标准，其中 ISDIN 专题主页和不少于 4 篇 ISDIN 文章可公开访问，所有一级栏目有内容。

### Phase 5：集成与优化（2–3 天）

- 配置 Pagefind。
- 配置 Analytics、Newsletter/Contact（如启用）。
- 配置 ISDIN Link Registry、联盟 Deep Link（如已批准）和出站点击事件。
- 添加安全头、缓存和重定向。
- 图片格式和尺寸优化。
- 运行 Lighthouse、Axe、链接检查和 Schema 检查。
- 运行 Affiliate CTA、披露、允许域名和失效链接检查。
- 修复移动端和跨浏览器问题。

完成标准：达到第 14 章质量目标。

### Phase 6：生产发布（1 天）

- 绑定 `bes3.com`。
- 配置 www 重定向和 HTTPS。
- 验证 sitemap、robots、canonical 和 404。
- 提交 Google Search Console。
- 完成生产 smoke test。
- 保存发布检查记录和回滚点。

完成标准：正式域名可访问、无阻断错误、内容可索引。

### Phase 7：联盟申请准备（发布后）

- 等待并确认主要页面已被搜索引擎发现。
- 准备 5–8 个最能代表站点质量的 URL。
- 将 ISDIN 专题主页和 2–3 篇最具代表性的 ISDIN 内容加入申请材料。
- 使用真实 Analytics 数据制作简短媒体介绍。
- 使用第 10.6 节的申请文案，并补充真实专题 URL、素材授权和推广方式。
- 检查申请材料与网站公开信息完全一致。

完成标准：通过真实的 ISDIN 专题、规范 CTA、披露和通用内容证明站点的专业性与推广能力。

## 16. 上线验收清单

### 品牌与内容

- [ ] 域名和 Logo 均使用 BES3。
- [ ] 首页明确说明网站定位。
- [ ] Brand Focus 导航、ISDIN 专题主页和专题文章可访问。
- [ ] 首页只有一处 ISDIN 专题入口，不直接堆叠多个外部购买 CTA。
- [ ] 至少 18 篇完整英文内容，其中不少于 4 篇 ISDIN 专栏文章。
- [ ] 所有一级栏目至少有 2 个有效入口或被合理合并。
- [ ] About、Editorial Standards、How We Evaluate 完整。
- [ ] Affiliate Disclosure、Privacy、Medical Disclaimer 完整。
- [ ] 作者身份真实，不存在虚构专家。
- [ ] 所有关键事实有可核验来源。
- [ ] ISDIN 品牌与产品信息已按目标市场官方资料核验。
- [ ] ISDIN Logo 和产品图均有可追溯的使用授权，未授权时不展示。

### 设计与体验

- [ ] 页面不是通用三卡片 AI 模板。
- [ ] 排版、色彩、图片和图标风格统一。
- [ ] 320px 宽度无水平溢出。
- [ ] 所有交互目标至少 44×44px。
- [ ] 键盘可完成全部核心路径。
- [ ] Focus 状态可见。
- [ ] reduced motion 生效。
- [ ] 表单具备完整标签和反馈。
- [ ] Affiliate CTA 在桌面和移动端均不遮挡正文，不使用 sticky 购买栏。
- [ ] CTA 点击区域至少 48px，Focus Ring 和可访问名称正确。

### 技术与 SEO

- [ ] `npm run build` 成功。
- [ ] lint、typecheck、unit、e2e 成功。
- [ ] 内外链检查无阻断错误。
- [ ] 所有启用的 ISDIN CTA 使用有效 HTTPS 链接且目标域名在允许列表内。
- [ ] 联盟 CTA 使用集中 Link Registry，内容文件无散落的长联盟 URL。
- [ ] 商业链接的 `rel`、披露和打开方式符合规范。
- [ ] sitemap、robots、RSS 可访问。
- [ ] canonical 指向 `https://bes3.com`。
- [ ] www 和 HTTP 正确重定向。
- [ ] 404 返回 404 状态。
- [ ] 结构化数据与可见内容一致。
- [ ] Preview 环境为 noindex。
- [ ] 安全头与 CSP 已验证。

### 性能与监测

- [ ] Lighthouse 四项达到目标。
- [ ] LCP、INP、CLS 达标。
- [ ] 图片使用 AVIF/WebP 和明确尺寸。
- [ ] 字体本地托管且不引发明显布局跳动。
- [ ] Analytics 只采集必要数据。
- [ ] `affiliate_outbound_click` 不包含个人信息且不会阻断跳转。
- [ ] 生产错误和发布回滚流程已验证。

## 17. 风险与应对

| 风险                   | 影响                 | 应对                                             |
| ---------------------- | -------------------- | ------------------------------------------------ |
| 内容体量不足           | 联盟审核认为是临时站 | 至少 18 篇高质量内容并完成 ISDIN 专题后再申请    |
| 品牌看起来像占位项目   | 降低信任             | 完整政策页、真实作者、统一摄影和设计系统         |
| 证据表达过度           | 医疗与合规风险       | 使用证据分级、写明限制、事实核查                 |
| 过早商业化             | 损害编辑可信度       | 首期以知识和类别指南为主，限制 CTA 数量          |
| 图片授权不清           | 法律风险             | 保存授权来源，不抓取商家图片                     |
| ISDIN 专栏过度商业化   | 损害编辑可信度       | 单篇最多两个主 CTA，先结论后按钮，通用内容占多数 |
| 联盟链接失效或跨区     | 收益和体验损失       | 允许域名、市场、定期检查和官方 URL 回退          |
| 披露与 CTA 分离        | 合规与信任风险       | 组件强制同容器披露，CI 校验商业字段              |
| Newsletter 隐私不透明  | 隐私与投递风险       | Double opt-in、最小化收集、更新隐私政策          |
| 静态内容难维护         | 文章过期             | Content Schema + reviewDueDate + 定期审查        |
| 加入多个商家后结构混乱 | 扩展成本上升         | 商家、链接和披露数据化，不硬编码                 |
| 为追求 SEO 产生薄内容  | 搜索和品牌质量下降   | 人工编辑门槛，不批量生成相似页面                 |

## 18. 成功指标

### 发布质量指标

- 关键页面上线率 100%。
- 阻断级可访问性问题为 0。
- 失效内部链接为 0。
- 首发内容至少 18 篇，目标 24 篇。
- ISDIN 专题主页与至少 4 篇 ISDIN 专栏内容上线。
- Core Web Vitals 达标。

### 运营指标

上线后 30–90 天观察：

- 被索引页面数量。
- 非品牌自然搜索展示和点击。
- 文章到相关主题页的点击率。
- Newsletter 合规订阅率。
- 读者进入 Product Guide 的比例。
- ISDIN 专题入口点击率。
- ISDIN CTA 点击率（按文章、linkId 和 placement 区分）。
- 失效或被回退的联盟链接数量。

这些指标只使用真实数据。联盟申请材料不得以预测值冒充实际成绩。

## 19. 最终决策摘要

1. 品牌使用 BES3 / BES³，域名固定为 `bes3.com`。
2. 网站类型为独立功效护肤编辑媒体。
3. 通用栏目保持编辑独立，新增 `Brand Focus: ISDIN` 公开内容专栏。
4. 英文优先，面向美国市场；多语言只预留架构，不在首期空建。
5. 信息架构围绕 Concerns、Ingredients、Routines、Product Guides、Brand Focus 和 Journal。
6. 视觉采用 Independent science editorial，依靠编辑排版而非模板化卡片和渐变。
7. 技术采用 Astro 静态生成、Content Collections、Pagefind 和 Cloudflare Pages。
8. ISDIN CTA 使用集中 Link Registry、统一组件、邻近披露和非个人点击追踪。
9. 上线前至少完成 18 篇真实、可核验内容，目标为 24 篇并包含 6 篇 ISDIN 专栏内容。
10. ISDIN 是首个 Brand Focus，但路由、组件和数据模型必须可扩展至其他化妆品商家。
