---
title: http与https
createTime: 2025/06/24 15:02:17
permalink: /article/fi5n7bdc/
tags:
  - HTTP
  - HTTPS
excerpt: HTTP与HTTPS都是什么？又有什么区别呢？
---

## 1. HTTP 和 HTTPS 的基本概念

### HTTP

::: tip 定义
**HTTP**（Hypertext Transfer Protocol，超文本传输协议）是一种用于客户端（如浏览器）与服务器之间进行请求和响应的标准协议。它基于 TCP 传输协议，用于传输超文本（如 HTML 文件）以及其他类型的数据。

- HTTP 的特点是**明文传输**，即数据在网络中以未加密的形式传输，这使得数据容易被窃取或篡改。
:::
### HTTPS
::: tip 定义
**HTTPS**（Hypertext Transfer Protocol Secure，超文本传输协议安全版）是在 HTTP 基础上加入了 SSL/TLS 加密层的协议，目的是为网络通信提供安全保障。

HTTPS 的作用包括：
  - 建立一个**加密的通信通道**，确保数据传输的安全性。
  - 验证网站的真实性，防止用户访问伪造的网站。
:::
## 2. HTTP 和 HTTPS 的区别及优缺点

### 区别
| 特性                | HTTP                                  | HTTPS                                   |
|---------------------|---------------------------------------|----------------------------------------|
| **传输内容**         | 明文传输，数据直接暴露                | 加密传输，数据通过 SSL/TLS 加密处理     |
| **默认端口**         | 80                                   | 443                                    |
| **安全性**           | 不安全，数据容易被窃取和篡改          | 安全性高，可防止数据被窃取和篡改        |
| **握手过程**         | 无需握手，连接简单                   | 需要握手，建立连接耗时较长             |
| **缓存效率**         | 高效                                | 较低                                   |
| **证书要求**         | 无需证书                             | 需要购买和配置 SSL/TLS 证书             |

### 优缺点
#### HTTP 的优缺点
**优点**：
- 简单高效，无需握手建立连接。
- 不需要证书，部署成本低。

**缺点**：
- 不加密数据，容易被窃取或篡改。
- 无法验证通信双方的身份真实性。

#### HTTPS 的优缺点
**优点**：
- 数据加密传输，确保安全性和完整性。
- 验证通信双方身份，防止中间人攻击。

**缺点**：
- 握手过程耗时较长，会增加网页加载时间（通常增加 50%）。
- SSL/TLS 证书需要费用，且需要绑定域名。
- 缓存效率不如 HTTP，可能增加带宽开销。

## 3. HTTPS 协议的工作原理

HTTPS 的核心是通过 SSL/TLS 协议实现的加密通信。以下是 HTTPS 的工作流程：

### HTTPS 工作流程
1. **客户端请求建立 HTTPS 连接**  
   用户通过浏览器访问一个 HTTPS URL（如 `https://bilibili.com`），请求服务器建立 SSL 链接。

2. **服务器发送证书**  
   服务器接收到请求后，会将网站的数字证书发送给客户端。该证书通常包含以下信息：
   - 服务器的公钥。
   - 证书颁发机构（CA）的签名。
   - 证书的有效期及域名信息。

3. **协商 SSL 链接的加密等级**  
   客户端和服务器协商通信所使用的加密算法和加密等级。

4. **生成会话密钥**  
   - 客户端根据协商的加密等级生成一个随机的会话密钥。
   - 客户端使用服务器的公钥加密该会话密钥，并发送给服务器。

5. **服务器解密会话密钥**  
   服务器使用自己的私钥解密会话密钥。

6. **通过会话密钥加密通信**  
   双方约定使用会话密钥对后续通信内容进行加密传输，确保数据的机密性和完整性。

## 4. HTTPS 的优势及其局限性

### HTTPS 的优势
1. **数据加密**：通过加密技术保护传输中的数据，防止被窃取和篡改。
2. **身份验证**：通过数字证书验证服务器的身份，防止用户访问伪造网站。
3. **数据完整性**：确保数据在传输过程中未被篡改。

### HTTPS 的局限性
1. **握手耗时**：由于需要建立 SSL/TLS 连接，握手过程会增加网页加载时间。
2. **证书费用**：高质量的 SSL/TLS 证书需要付费，增加了网站的运营成本。
3. **计算开销**：加密和解密过程需要额外的计算资源，可能影响性能。

## 5. 总结

HTTP 与 HTTPS 是现代互联网中两种重要的通信协议。HTTPS 在安全性上具有显著优势，但也面临一定的性能和成本问题。在实际开发中，应根据业务需求选择合适的协议，同时通过优化 HTTPS 的配置（如使用 HTTP/2 或缓存机制）来减小性能损耗。

通过正确使用 HTTPS，不仅可以提升网站的安全性，还可以增强用户对网站的信任。