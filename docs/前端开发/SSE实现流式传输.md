---
title: SSE实现流式传输
createTime: 2025/06/25 11:38:25
permalink: /article/vccpfz0y/
tags:
  - 前端开发
  - 流式传输
  - SSE
---
## 什么是SSE流式传输？

:::tip 概念
SSE全称为Server-Sent Events，是HTML5标准中的通信技术。它基于HTTP协议建立单向通道，让服务器能够实时向客户端（如浏览器）推送更新。这种持续的数据流传输方式，正是流式传输的核心体现。类似ChatGPT的间断响应效果，底层正是采用SSE实现的流式传输。
:::
## 为什么选择SSE？
在传统长轮询模式中：
- 客户端必须不断发起请求
- 服务端响应前会阻塞后续请求
- 每次通信都需要完整HTTP握手

而SSE带来三大优势：
1. **单向实时推送**：服务端可主动多次发送数据
2. **连接持久化**：单次TCP连接持续传输
3. **资源高效利用**：避免重复建立连接的开销

## 技术实现原理

### 1. 参数设置
   SSE 本质是一个基于 http 协议的通信技术。
   因此想要使用 SSE 技术构建需要服务器实时推送信息到客户端的连接，只需要将传统的 http 响应头的 `contentType` 设置为 `text/event-stream`。
   并且为了保证客户端展示的是最新数据，需要将 `Cache-Control` 设置为 `no-cache`。
   在此基础上，SSE 本质是一个 TCP 连接，因此为了保证 SSE 的持续开启，需要将 `Connection` 设置为 `keep-alive`。
```less
   Content-Type: text/event-stream,
   Cache-Control: no-cache,
   Connection: keep-alive
```

完成了上述响应头的设置后，我们可以编写一个基于 SSE 流式传输的简单 Demo 。
### 2. SSE Demo

服务端代码：
```js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/events', function(req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let startTime = Date.now();

    const sendEvent = () => {
        // 检查是否已经发送了10秒
        if (Date.now() - startTime >= 10000) {
            res.write('event: close\ndata: {}\n\n'); // 发送一个特殊事件通知客户端关闭
            res.end(); // 关闭连接
            return;
        }

        const data = { message: 'Hello World', timestamp: new Date() };
        res.write(`data: ${JSON.stringify(data)}\n\n`);

        // 每隔2秒发送一次消息
        setTimeout(sendEvent, 2000);
    };

    sendEvent();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

```
客户端代码:
```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>SSE Example</title>
</head>

<body>
    <h1>Server-Sent Events Example</h1>
    <div id="messages"></div>

    <script>
        const evtSource = new EventSource('/events');
        const messages = document.getElementById('messages');

        evtSource.onmessage = function(event) {
            const newElement = document.createElement("p");
            const eventObject = JSON.parse(event.data);
            newElement.textContent = "Message: " + eventObject.message + " at " + eventObject.timestamp;
            messages.appendChild(newElement);
        };
    </script>
</body>
</html>

```

需要注意的是，为了保证使用 SSE 通信协议传输的数据能被客户端正确的接收，服务端和客户端在发送数据和接收数据应该遵循以下规范：

**服务端基本响应格式**

SSE 响应主要由一系列以两个换行符分隔的事件组成。每个事件可以包含以下字段：

```text
data：事件的数据。如果数据跨越多行，每行都应该以data:开始。
id：事件的唯一标识符。客户端可以使用这个ID来恢复事件流。
event：自定义事件类型。客户端可以根据不同的事件类型来执行不同的操作。
retry：建议的重新连接时间（毫秒）。如果连接中断，客户端将等待这段时间后尝试重新连接。

```
字段之间用单个换行符分隔，而事件之间用两个换行符分隔。

**客户端处理格式**

客户端使用 EventSource 接口监听 SSE 消息：
```js
const evtSource = new EventSource('path/to/sse');
evtSource.onmessage = function(event) {
    console.log(event.data); // 处理收到的数据
};

```

## 典型应用场景
SSE特别适合服务端主导的数据推送场景：
- 实时通知系统（新消息提醒）
- 金融行情更新（股票价格变动）
- 新闻资讯流（实时新闻推送）
- 进度监控（任务执行进度反馈）
- 日志实时展示（运维监控面板）

## 浏览器兼容性
现代浏览器对SSE支持良好：
- Chrome 6+ ✅
- Firefox 6+ ✅
- Safari 5+ ✅
- Edge 79+ ✅
- 仅IE和低版本浏览器（如Opera mini）不支持

## SSE vs WebSocket
| 特性         | SSE                     | WebSocket              |
|--------------|-------------------------|------------------------|
| **协议**     | 基于HTTP                | 独立协议(ws/wss)       |
| **通信方向** | 单向(服务端→客户端)     | 全双工双向通信         |
| **重连机制** | 浏览器自动处理          | 需手动实现             |
| **实时性**   | 高频更新场景优秀        | 超高实时交互场景       |
| **复杂度**   | 实现简单，维护成本低    | 需处理连接生命周期     |
| **适用场景** | 服务端主导的数据推送    | 在线游戏/即时聊天等    |

## 技术选型建议
当你的场景满足以下特征时，SSE是最佳选择：
1. 数据流向主要是服务端到客户端
2. 需要轻量级实现方案
3. 期望利用现有HTTP基础设施
4. 需要自动重连机制保障稳定性