---
title: My CV
tags:
  - 简历
createTime: 2025/06/23 11:01:46
permalink: /article/20jmp37t/
---
::: demo-wrapper title="我的简历" no-padding height="100%"
<style scoped>
.resume-container {
  color: #000000;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-height: 100%;
  overflow-y: auto;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

p {
  color: #000000;
}

span {
  color: #000000;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 15px;
}

.profile-img {
  width: 120px;
  height: 150px;
  border-radius: 8px;
  border: 1px solid #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.personal-info {
  flex: 1;
  color: #000000;
  padding-left: 20px;
}

.name {
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.contact-info {
  color: #000000;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #34495e;
}

.contact-item i {
  margin-right: 5px;
  color: #3498db;
}

.basic-info {
  color: #000000;
  display: flex;
  gap: 10px;
  font-size: 14px;
  margin-top: 15px;
}

.section {
  color: #000000;
  margin-bottom: 25px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  padding-bottom: 8px;
  border-bottom: 2px solid #3498db;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.section-title i {
  margin-right: 10px;
  color: #3498db;
}

.col-wrap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  color: #000000;
}

@media (max-width: 768px) {
  .col-wrap { 
    grid-template-columns: 1fr; 
  }
}

.item {
  color: #000000;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.item-header {
  color: #000000;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.item-title {
  font-weight: bold;
  color: #2c3e50;
  font-size: 16px;
}

.item-subtitle {
  color: #3498db;
  font-size: 15px;
}

.item-date {
  color: #7f8c8d;
  font-size: 13px;
  font-style: italic;
}

.item-content {
  font-size: 14px;
  color: #34495e;
}

.star-rating {
  color: #f39c12;
  margin-top: 5px;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.skill-tag {
  background: #55b6f6;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
}

.sar-item {
  margin-bottom: 10px;
  color: #000000;
}

.sar-title {
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.sar-content {
  padding-left: 15px;
  border-left: 2px solid #3498db;
  margin-left: 5px;
  color: #000000;
}

.project-feature {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  color: #000000;
  border-left: 3px solid #3498db;
}

.responsibility {
  margin-top: 8px;
  color: #000000;
}

@media print {
  .resume-container {
    box-shadow: none;
    padding: 10px;
  }
}
</style>

<div class="resume-container">
  <!-- 个人信息头部 -->
  <div class="header">
    <div class="personal-info">
      <div class="name">字晴川</div>
      <div class="basic-info">
        <div>21岁</div>
        <div>男</div>
        <div>汉族</div>
      </div>
      <div class="contact-info" style="margin-top: 10px;">
        <div class="contact-item"><i>📱</i>电话：18245187102</div>
        <div class="contact-item"><i>✉️</i>邮箱：221250108@smail.nju.edu.cn</div>
        <div class="contact-item"><i>📍</i>现居地：杭州</div>
      </div>
      <div class="contact-info">
        <div class="contact-item"><i>👨‍💻</i>github：github.com/ziqingchuan</div>
        <div class="contact-item"><i>🌐</i>个人博客：https://www.try-catch.life</div>
      </div>
    </div>
    <img src="/images/myself.png" class="profile-img" alt="个人照片" />
  </div>

  <!-- 教育经历 -->
  <div class="section">
    <div class="section-title"><i>🎓</i>教育经历</div>
    <div class="item">
      <div class="item-header">
        <div class="item-title">南京大学&nbsp <Badge text="985" type="tip"/><Badge text="211" type="warning"/><Badge text="双一流" type="danger"/></div>
        <div class="item-date">2022年06月 - 2026年07月</div>
      </div>
      <div class="item-subtitle">专业：软件工程 &nbsp;&nbsp&nbsp;&nbsp 学历：本科 &nbsp;&nbsp&nbsp;&nbsp 院系：软件学院</div>
      <div class="item-content" style="margin-top: 5px;">比赛经历：华为Hackathon软件难题挑战赛  &nbsp;&nbsp 华为Codelabs校园挑战赛（二等奖） &nbsp;&nbsp 第十九届挑战杯"人工智能+"专项赛</div>
<div class="item-content" style="margin-top: 5px;">校园经历：获评年度优秀团员 &nbsp&nbsp 获评优秀寝室长称号 &nbsp&nbsp 2023年"南星梦想计划"队长，组织黑龙江省的招生活动与线上宣讲会</div>
    </div>
  </div>

  <!-- 实习经历 -->
  <div class="section">
    <div class="section-title"><i>💼</i>实习经历</div>
    <div class="item">
      <div class="item-header">
        <div class="item-title">科鲸（杭州）信息技术有限公司 / Datawhale</div>
        <div class="item-date">2025年02月 - 2025年07月</div>
      </div>
      <div class="item-subtitle">职位：前端开发工程师</div>
      <div class="sar-item" style="margin-top: 5px;">
        <div class="sar-title">考试管理系统核心功能开发与优化</div>
        <div class="sar-content">
          <p>负责后台考试管理模块的核心功能开发，需实现富文本题目编辑、良好交互体验并确保数据安全，同时为未来题型扩展奠定基础。</p>
          <ul>
            <li>采用 Element Tiptap 富文本编辑器实现题目编辑功能，利用 Element Plus 构建用户界面</li>
            <li>设计并实现高度抽象化的题目对象模型，保障系统支持未来多种题型（简答题，填空题，上传附件题）的灵活扩展</li>
            <li>封装可复用的自定义弹窗组件，优化用户操作流程与交互体验</li>
            <li>实现路由守卫与页面事件监听器，防止用户意外关闭或离开页面导致未保存数据丢失</li>
          </ul>
          <p>成功交付稳定、可扩展的考试管理功能，用户反馈良好；设计的抽象模型有效支持了后续三种新题型的快速接入；数据防护机制上线后基本杜绝了因误操作导致的数据丢失问题。</p>
        </div>
      </div>
      <div class="sar-item">
        <div class="sar-title">协同富文本编辑器功能开发与体验提升</div>
        <div class="sar-content">
          <p>参与内部协同富文本编辑器的迭代开发，需增强编辑能力、提升内容导入便利性及优化用户体验。</p>
          <ul>
            <li>主导开发并上线了有序/无序列表、微信文章解析导入、折叠块等核心功能组件</li>
            <li>实现文章标题目录的实时跟随滚动与高亮功能，提升长文档编辑导航体验</li>
            <li>开发并集成 Markdown 和 Jupyter Notebook 文件的解析与导入模块</li>
            <li>对编辑器的整体 UI 设计进行重构与优化，提升视觉一致性和易用性</li>
          </ul>
          <p>新增功能组件均成功上线，微信文章链接解析与导入功能显著提升了内容创建效率 40% 左右；目录跟随功能获得用户积极评价；UI 重构后用户操作效率提升 30% 左右，体验反馈明显改善</p>
        </div>
      </div>
      <div class="sar-item">
        <div class="sar-title">大型AI实训营活动支持与用户管理</div>
        <div class="sar-content">
          <p>支持上海交大“安泰”经管学院 AI 实训营活动的线上功能开发，需高效处理大规模用户报名。</p>
          <ul>
            <li>集成并定制金数据报名表单，实现活动信息的收集与用户管理流程。</li>
          </ul>
          <p>系统成功支撑了超过 1000 名学员的报名、信息审核与参与流程，保障了活动的顺利开展。</p>
        </div>
      </div>
      <div class="sar-item">
        <div class="sar-title">全平台图片上传性能优化</div>
        <div class="sar-content">
          <p>负责解决后台管理系统中图片上传导致的存储资源占用过高问题。</p>
          <ul>
            <li>设计并实施基于 Canvas API 的客户端图片预压缩方案，在图片上传前进行自动化处理</li>
          </ul>
          <p>优化后，平台存储的图片体积平均减少 80% 以上，显著降低了云存储成本，提升了资源利用效率。</p>
        </div>
      </div>
    </div>
  </div>

  <!-- 项目经历 -->
  <div class="section">
    <div class="section-title"><i>🚀</i>项目经历</div>
    <div class="item">
      <div class="item-header">
        <div class="item-title">《黑神话悟空游戏助手》——RAG应用</div>
        <div class="item-date">2025年03月 - 2025年07月</div>
      </div>
      <div class="item-subtitle">角色：前端开发组长</div>
      <div class="project-feature">
        <strong>项目功能：</strong>
        <p>
            项目小组开发了基于FastAPI+Vue3的RAG应用，实现了《黑神话·悟空》的游戏问答助手，数据库使用Milvus向量数据库+MongoDB，大模型使用了LangChain和通义千问API，使用阿里云OSS服务存储静态资源。
        </p>
        <p>
            对于账户管理功能，通过SHA256+salt进行账户信息加密，通过token对用户信息进行验证，注册账户时使用邮箱验证码进行邮箱绑定，提高用户信息的安全性；
        </p>
        <p>
            对于玩家端，提供了智能问答功能以及玩法推荐、Boss攻略、调用Steam的API获取用户成就信息并进行分析——使用Echarts库对玩家数据进行可视化，调用通义千问大模型进行数据的分析与个性化成就报告推荐。各个附属功能均设计了对应的浮动问答助手，所有问答界面均使用SSE技术实现了流式传输，优化了传输性能；
        </p>
        <p> 
            对于管理员端，提供了对知识库的可视化管理，使用了pdf-dist库（解析pdf）和Mammoth库（解析doc），支持pdf、html、md、doc、txt类型文件的上传和解析，以及对用户的对话记录进行批量管理与下载。
        </p>
        <p>
            前后端均进行了部署——后端部署于阿里云服务器，前端通过Vercel进行部署，配置了自定义的域名。
        </p>
      </div>
      <div class="responsibility">
        <strong>负责的工作：</strong>
        <ul>
          <li>负责数据结构设计以及接口文档的编写，与后端进行接口的对接。</li>
          <li>独立完成8个页面UI设计，使用墨刀设计原型，采用Vue3+Element Plus实现前端代码编写，覆盖账户管理、玩家端、管理员端核心模块</li>
          <li>对前端代码进行严格的质量优化，编写良好的注释；使用Sass语法规范了样式代码的结构；将可复用的全局函数进行单独封装</li>
          <li>设计并封装了符合产品UI主题的弹窗组件、加载组件以及提示信息</li>
          <li>将各功能模块进行组件化，封装了管理员端的知识库操作组件以及上传功能组件</li>
          <li>通过配置反向代理解决了跨域问题以及与后端http接口通信</li>
          <li>负责阿里云OSS服务的资源管理，对动态图资源进行压缩处理，降低了90%的内存占用</li>
          <li>负责前端的Vercel部署以及自定义域名的配置</li>
          <li>负责前端代码的Git版本管理与迭代</li>
        </ul>
      </div>
    </div>
    <div class="item">
      <div class="item-header">
        <div class="item-title">其他项目经历</div>
      </div>
      <div class="item-content">
        <ul>
          <li>蓝鲸购物商城（软件工程与计算Ⅱ课程项目）</li>
          <li>瞳朦天气微信小程序（互联网计算课程项目）</li>
          <li>论文易查——论文检索平台（人机交互与设计课程项目）</li>
          <li>红星新闻——鸿蒙原生应用（移动互联网开发课程项目）</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="col-wrap">
    <!-- 专业技能 -->
    <div class="section">
      <div class="section-title"><i>💻</i>专业技能</div>
      <div class="item" style="min-height: 300px">
        <div class="item-content">
          <p><strong>编程语言：</strong></p>
              <div class="skills">
              <Badge text="Typescript" type="tip"/>
              <Badge text="Javascript" type="warning"/>
              <Badge text="HTML/CSS" type="danger"/>
              <Badge text="Vue3" type="tip"/>
              <Badge text="C++" type="warning"/>
              <Badge text="Python" type="danger"/>
              <Badge text="Java" type="tip"/>
              <Badge text="Arkts" type="warning"/>
            </div>
            <p style="margin-top: 15px;"><strong>熟练工具：</strong></p>
            <div class="skills">
              <Badge text="Git" type="danger"/>
              <Badge text="Vite" type="tip"/>
              <Badge text="Vercel" type="warning"/>
              <Badge text="WebStorm" type="danger"/>
              <Badge text="PyCharm" type="tip"/>
              <Badge text="ChatGPT" type="warning"/>
              <Badge text="DeepSeek" type="danger"/>
              <Badge text="Manus" type="tip"/>
              <Badge text="Typora" type="warning"/>
            </div>
        </div>
      </div>
    </div>
    <!-- 其他信息 -->
    <div class="section">
      <div class="section-title"><i>🌟</i>其他</div>
      <div class="item" style="min-height: 300px">
        <div class="item-content">
          <p>语言能力: 英语 CET-4、CET-6<br>
          熟悉并遵循RESTful API文档规范，能够独立编写高质量的技术文档，提升团队协作效率；<br>
          积极探索前端新技术和大模型应用，保持技术敏感度；<br>
          团队意识强，责任心强，不拖延，对于分配的任务能够尽全力提前完成；<br>
          希望在前端开发领域深耕，利用前沿技术解决实际问题，提升用户体验和产品性能</p>
        </div>
      </div>
    </div>
  </div>
</div>
:::