-- 个人作品集数据库初始化脚本
-- 使用方法：在 Navicat 中打开此文件并执行，或命令行：mysql -u root -p123456 portfolio < init.sql

USE portfolio;

-- 1. 个人信息表（只存一条记录，id 固定为 1）
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY DEFAULT 1,
  nickname VARCHAR(50) NOT NULL COMMENT '昵称',
  slogan VARCHAR(200) COMMENT '一句话标语',
  intro TEXT COMMENT '个人简介',
  email VARCHAR(100) COMMENT '邮箱',
  github VARCHAR(200) COMMENT 'GitHub 链接',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='个人信息';

-- 2. 技能标签表
CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL COMMENT '标签名',
  sort_order INT DEFAULT 0 COMMENT '排序',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='技能标签';

-- 3. 作品集表
CREATE TABLE IF NOT EXISTS works (
  id INT AUTO_INCREMENT PRIMARY KEY,
  no VARCHAR(10) COMMENT '序号（壹贰叁肆）',
  title VARCHAR(100) NOT NULL COMMENT '标题',
  description TEXT COMMENT '描述',
  tags VARCHAR(200) COMMENT '技术栈标签，逗号分隔',
  image_url VARCHAR(500) COMMENT '图片 URL',
  sort_order INT DEFAULT 0 COMMENT '排序',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='作品集';

-- 4. 学习经历表
CREATE TABLE IF NOT EXISTS journey (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_label VARCHAR(50) COMMENT '时间标签',
  title VARCHAR(100) NOT NULL COMMENT '标题',
  description TEXT COMMENT '描述',
  sort_order INT DEFAULT 0 COMMENT '排序',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学习经历';

-- 初始数据：个人信息
INSERT INTO profile (id, nickname, slogan, intro, email, github) VALUES
(1, '小萍', '一名 AI 全栈课程学习者，在这里安放我做过的东西。',
 '我是小萍，一名正在系统学习 AI 全栈开发的学习者。从手写 Tokenizer、Transformer 预训练与 LoRA 微调，到浏览器插件、零代码应用与本站的完整开发流程，我习惯把每一个想法快速做成能跑的最小版本，再慢慢打磨。相信动手的分量，胜过纸面的千言。',
 '2678792095@qq.com', 'https://github.com/nnn888-pp')
ON DUPLICATE KEY UPDATE nickname=VALUES(nickname);

-- 初始数据：技能标签
INSERT INTO tags (name, sort_order) VALUES
('Python', 1), ('大模型预训练', 2), ('LoRA 微调', 3),
('浏览器插件', 4), ('HTML / CSS / JS', 5), ('AI 辅助开发', 6), ('Git & 部署', 7);

-- 初始数据：作品集
INSERT INTO works (no, title, description, tags, image_url, sort_order) VALUES
('壹', 'AI 大模型预训练与微调', '自有 Tokenizer + Transformer 从零实现自回归预训练，完成监督微调与 LoRA 低秩微调全流程实操。',
 'Python,Transformer,LoRA',
 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20ink%20illustration%20of%20a%20neural%20network%20transformer%20architecture%2C%20hand-drawn%20nodes%20and%20connecting%20lines%20on%20aged%20paper%2C%20red%20seal%20accent%2C%20retro%20magazine%20style%2C%20minimalist&image_size=landscape_4_3', 1),
('贰', '电商图片下载插件', '浏览器图片批量抓取插件，配套独立官网并通过 GitHub Pages 发布，提供一键下载。',
 '浏览器插件,JavaScript,GitHub Pages',
 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20magazine%20illustration%20of%20a%20browser%20extension%20grabbing%20photos%20from%20a%20webpage%2C%20ink%20drawing%20on%20old%20paper%2C%20cinnabar%20red%20accents%2C%20retro%20print%20style&image_size=landscape_4_3', 2),
('叁', '零代码单页应用', '纯前端 localStorage 单页应用，无后端无登录，一键发布公开域名并稳定访问。',
 '零代码,localStorage,单页应用',
 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20ink%20illustration%20of%20a%20single-page%20web%20app%20on%20paper%2C%20hand-drawn%20UI%20wireframe%20with%20red%20annotations%2C%20retro%20magazine%20print%20style%2C%20aged%20paper%20texture&image_size=landscape_4_3', 3),
('肆', '本网站本身', '从 PRD、技术设计文档到 AGENTS.md 规范，再由 AI 辅助编码、Git 管理并部署上线的完整实践。',
 'AI 辅助开发,PRD 驱动,Cloudflare Pages',
 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20printing%20press%20and%20magazine%20layout%20ink%20illustration%2C%20hand-drawn%20on%20aged%20paper%2C%20cinnabar%20red%20seal%20stamp%2C%20retro%20editorial%20style&image_size=landscape_4_3', 4);

-- 初始数据：学习经历
INSERT INTO journey (date_label, title, description, sort_order) VALUES
('2026 · 秋', 'AI 大模型原理实操', '手写 Tokenizer，完成 Transformer 预训练、监督微调与 LoRA 微调，跑通从语料到推理的全流程。', 1),
('2026 · 秋', '浏览器插件开发与发布', '独立完成电商图片下载插件，搭建项目官网并发布至 GitHub Pages。', 2),
('2026 · 秋', '零代码与 AI 编程工具实操', '多平台并行完成零代码应用生成与发布，实践 BYOK 方式配置自有模型。', 3),
('2026 · 秋', '项目开发与部署全流程', '以文档驱动开发：PRD → 技术设计 → AGENTS.md → 编码 → 部署本站上线。', 4);
