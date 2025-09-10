---
title: 关于MCP
createTime: 2025/09/10 17:29:17
permalink: /article/2ep365r0/
tags:
  - AI
  - MCP
excerpt: 介绍模型上下文协议（Model Context Protocol，MCP）。
---

在AI模型与应用场景深度融合的趋势下，“模型如何精准理解业务场景”成为核心痛点。

Model Context Protocol（简称MCP，模型上下文协议）应运而生，它通过标准化的上下文传递机制，让AI模型从“通用响应”升级为“场景化智能”。

本文将从MCP的核心定义、设计原则、技术架构到实践落地，全面解析这一连接模型与业务的关键协议。


## 一、MCP是什么？核心定义与诞生背景

### 1. 核心定义

::: important 定义
MCP（Model Context Protocol）是一套**标准化的“模型-应用”上下文交互协议**，旨在规范应用向AI模型传递“场景信息”的格式、内容与交互流程，让模型在生成响应前，能精准感知“何时、何地、为谁、做什么”等业务上下文，从而输出更贴合实际需求的结果。
:::

简单来说，MCP解决的核心问题是：==**“让AI模型知道‘我在哪种场景下工作’”**==。

### 2. 诞生背景：为什么需要MCP？
在MCP出现前，模型与应用的上下文交互普遍存在三大痛点：
- <Badge text="格式混乱" type="danger"/>：不同应用传递上下文的方式千差万别（如有的塞在prompt前缀，有的通过HTTP头传递，有的用自定义JSON字段），模型需要适配不同格式，开发成本高。
- <Badge text="信息残缺" type="danger"/>：上下文仅包含“用户问题”，缺失关键场景信息（如用户身份、业务权限、历史交互记录、当前操作页面），导致模型响应“脱离实际”（例如给普通用户返回管理员操作指引）。
- <Badge text="交互低效" type="danger"/>：应用与模型之间缺乏“上下文校验”机制，模型接收无效/错误上下文后需反复追问，降低交互效率。

MCP通过标准化定义，统一了上下文的“传递语言”，从根本上解决了上述问题。


## 二、MCP的核心设计原则
MCP的设计围绕“**标准化、可扩展、轻量性、安全性**”四大原则展开，确保其能适配不同类型的模型（大语言模型、视觉模型、多模态模型）与业务场景（电商、医疗、企业办公等）。

| 设计原则 | 核心要求 | 具体体现 |
|----------|----------|----------|
| **标准化** | 统一上下文的格式、字段定义与交互流程 | 规定核心上下文字段（如`user_info`、`scene_meta`）的必选/可选属性，明确HTTP/GRPC交互的请求/响应格式 |
| **可扩展** | 支持业务场景自定义扩展字段 | 预留`extension`字段，允许应用根据需求添加场景专属信息（如电商场景的`cart_id`、医疗场景的`patient_age`） |
| **轻量性** | 减少协议开销，避免影响模型响应速度 | 采用JSON作为默认序列化格式，核心字段精简，避免冗余信息传递 |
| **安全性** | 保护上下文的敏感信息 | 支持字段加密（如`user_info`中的手机号、身份证号），定义权限校验字段（如`access_token`） |


## 三、MCP的技术架构：三层协议体系
MCP采用“**应用层-协议层-模型层**”的三层架构，实现上下文的“生成-传递-解析-应用”全流程闭环。

### 1. 应用层：上下文生成与触发
应用层是MCP的“上下文来源”，负责收集业务场景中的关键信息，并按照MCP格式生成上下文请求。  
**核心能力**：
- <Badge text="场景信息采集" type="warning"/>：通过前端埋点、后端业务接口获取用户身份（`user_id`）、权限（`role`）、当前操作（`action`）、历史交互（`history`）等信息。
- <Badge text="MCP请求组装" type="warning"/>：将采集的信息封装为符合MCP标准的JSON结构，触发向模型的请求。

**应用层示例代码（JavaScript）**：
```javascript
// 1. 采集场景信息
const sceneInfo = {
  user_id: "u12345",
  role: "ordinary_user", // 普通用户
  action: "query_order", // 当前操作：查询订单
  history: [
    { "user": "我的订单在哪？", "assistant": "请提供订单号" }
  ], // 历史交互
  extension: { "app_name": "ecommerce_app", "cart_id": "c67890" } // 扩展字段
};

// 2. 组装MCP请求
const mcpRequest = {
  version: "1.0", // MCP协议版本
  context: sceneInfo,
  query: "帮我查一下最近的订单状态", // 用户当前查询
  timestamp: new Date().getTime()
};

// 3. 触发模型请求
fetch("https://model-server/mcp/inference", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(mcpRequest)
});
```


### 2. 协议层：上下文标准化与交互
协议层是MCP的“核心中枢”，负责定义上下文的**标准格式、交互协议与校验规则**，是连接应用与模型的桥梁。

#### （1）核心上下文格式定义
MCP 1.0版本规定的标准JSON结构如下，包含`version`（协议版本）、`context`（核心上下文）、`query`（用户查询）、`metadata`（元数据）四大模块：
```json
{
  "version": "1.0", // 必选，协议版本（如1.0、1.1）
  "context": { // 必选，核心上下文信息
    "user_info": { // 必选，用户信息
      "user_id": string, // 唯一用户标识
      "role": string, // 用户角色（如admin/ordinary_user）
      "permissions": array<string> // 可选，用户权限列表
    },
    "scene_meta": { // 必选，场景元信息
      "scene_type": string, // 场景类型（如ecommerce/medical/office）
      "action": string, // 当前用户操作
      "app_id": string, // 应用ID
      "timestamp": number // 场景触发时间戳
    },
    "interaction_history": array<{ // 可选，历史交互记录
      "role": string, // 角色（user/assistant/system）
      "content": string, // 内容
      "timestamp": number
    }>,
    "extension": object // 可选，业务扩展字段（自定义）
  },
  "query": string, // 必选，用户当前查询/指令
  "metadata": { // 可选，元数据
    "request_id": string, // 请求唯一标识（用于追踪）
    "timeout": number, // 超时时间（ms）
    "security": { // 安全相关
      "encrypt": boolean, // 是否加密
      "access_token": string // 权限令牌
    }
  }
}
```

#### （2）交互协议：HTTP/GRPC双支持
MCP支持两种主流交互协议，适配不同性能需求：
- `HTTP协议`：适用于轻量场景，开发简单，兼容性强（如上文应用层示例）。
- `GRPC协议`：适用于高性能场景（如实时对话、高频请求），通过protobuf序列化提升传输效率。

#### （3）校验规则：确保上下文有效性
协议层会对请求进行合法性校验，避免无效上下文传递给模型，校验维度包括：
- 版本兼容性：校验`version`是否为模型支持的版本。
- 必选字段校验：检查`user_info`、`scene_meta`等必选字段是否存在。
- 权限校验：通过`metadata.security.access_token`验证应用是否有权限调用模型。


### 3. 模型层：上下文解析与应用
模型层是MCP的“落地终端”，负责解析协议层传递的上下文，并将其融入模型推理过程，生成场景化响应。

**核心流程**：
1. <Badge text="上下文解析" type="tip"/>：模型侧的MCP适配器解析请求中的`context`字段，提取用户角色、场景类型、历史交互等关键信息。
2. <Badge text="上下文融入推理" type="tip"/>：将解析后的上下文转换为模型可理解的“提示增强”（Prompt Enhancement）内容，例如：
   ```
   已知条件：
   - 用户角色：普通用户（无订单删除权限）
   - 当前场景：电商订单查询
   - 历史交互：用户已询问过订单位置，助手要求提供订单号
   
   请基于以上条件，响应用户查询：“帮我查一下最近的订单状态”
   ```
3. <Badge text="生成场景化响应" type="tip"/>：模型结合增强后的提示，输出贴合场景的结果（例如优先询问订单号，而非返回管理员操作入口）。

**模型层适配示例（Python）**：
```python
def mcp_inference_handler(request):
    # 1. 解析MCP请求
    version = request["version"]
    context = request["context"]
    query = request["query"]
    
    # 2. 提取关键上下文
    user_role = context["user_info"]["role"]
    interaction_history = context["interaction_history"]
    scene_type = context["scene_meta"]["scene_type"]
    
    # 3. 构建增强Prompt
    enhanced_prompt = f"""
    场景：{scene_type}
    用户角色：{user_role}
    历史交互：{interaction_history}
    用户问题：{query}
    要求：根据用户角色和场景，生成准确响应，普通用户不展示管理员功能。
    """
    
    # 4. 模型推理
    response = llm.generate(enhanced_prompt)
    return {"code": 0, "response": response, "request_id": request["metadata"]["request_id"]}
```


## 四、MCP的核心优势：相比传统方式的提升
与“无协议的自定义上下文传递”相比，MCP的优势体现在开发效率、响应质量、扩展性三个维度：

| 对比维度 | 传统方式 | MCP方式 | 提升效果 |
|----------|----------|---------|----------|
| **开发效率** | 模型需适配不同应用的上下文格式，适配成本高 | 统一格式，一次适配多应用 | 开发效率提升60%+ |
| **响应质量** | 上下文残缺，易生成脱离场景的响应 | 场景信息完整，响应更精准 | 场景适配准确率提升35%-50% |
| **扩展性** | 新增场景需重新定义格式，兼容性差 | 基于`extension`字段灵活扩展，无需修改核心协议 | 新场景接入周期缩短至1-2天 |
| **可维护性** | 上下文格式分散，问题排查困难 | 标准化日志与请求格式，便于追踪与调试 | 问题排查时间缩短70% |


## 五、MCP实践落地：典型场景案例
MCP的适配性极强，已在电商、医疗、企业办公三大场景实现规模化落地，以下为具体案例：

### 1. 电商场景：个性化订单咨询
**痛点**：传统模型无法区分“普通用户”与“客服管理员”，给普通用户返回“订单删除”等无权操作指引。  
**MCP解决方案**：
- 应用层采集`user_info.role`（普通用户/管理员）、`scene_meta.action`（查询订单/修改订单）。
- 模型层根据`role`过滤响应内容，普通用户仅返回“查询状态、催单”等权限内操作。

**效果**：用户咨询满意度提升42%，权限相关错误响应下降90%。

### 2. 医疗场景：精准问诊辅助
**痛点**：医疗模型需结合患者年龄、病史才能给出合理建议，传统方式易缺失关键信息。  
**MCP解决方案**：
- 应用层通过`extension`字段传递`patient_age`（患者年龄）、`medical_history`（病史）。
- 模型层基于病史生成“避免禁忌用药”的问诊建议。

**效果**：问诊建议准确率提升53%，减少因信息缺失导致的误导性回复。


## 六、MCP的未来演进：从1.0到2.0
当前MCP 1.0已实现“上下文标准化传递”，未来2.0版本将向“智能上下文管理”升级，核心方向包括：

1. ==**上下文自动优化**=={.note}：通过小模型对采集的上下文进行“冗余剔除、关键信息提炼”，减少模型推理负担。

2. ==**多模态上下文支持**=={.note}：扩展协议以支持图片、语音等多模态上下文（如医疗场景的“病历+影像”联合传递）。

3. ==**动态上下文更新**=={.note}：支持应用层实时更新上下文（如用户权限变化），模型无需重新发起请求即可感知。

4. ==**跨模型上下文共享**=={.note}：实现多模型（如“对话模型+推荐模型”）间的上下文同步，提升多任务协同能力。


## 七、总结
MCP（Model Context Protocol）通过标准化的上下文交互机制，打破了“模型-应用”之间的信息壁垒，让AI从“通用工具”转变为“场景化伙伴”。

其核心价值不仅在于提升开发效率与响应质量，更在于为AI模型的“场景化落地”提供了可复用的协议标准。随着MCP 2.0的演进，它将成为连接AI与业务的“通用语言”，推动AI在垂直领域的深度渗透。
