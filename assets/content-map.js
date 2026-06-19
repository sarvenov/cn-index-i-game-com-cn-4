const contentMap = {
  home: {
    title: "首页",
    tags: ["爱游戏", "热门推荐", "最新资讯"],
    sections: [
      { id: "banner", label: "焦点轮播", keywords: ["爱游戏", "头条"] },
      { id: "featured", label: "精选内容", keywords: ["爱游戏", "推荐", "热门"] }
    ]
  },
  game: {
    title: "游戏中心",
    tags: ["爱游戏", "动作", "策略", "休闲"],
    sections: [
      { id: "action", label: "动作游戏", keywords: ["爱游戏", "动作", "格斗", "冒险"] },
      { id: "strategy", label: "策略游戏", keywords: ["爱游戏", "策略", "塔防", "经营"] },
      { id: "casual", label: "休闲游戏", keywords: ["爱游戏", "休闲", "益智", "消除"] }
    ]
  },
  news: {
    title: "新闻公告",
    tags: ["爱游戏", "官方", "活动", "更新"],
    sections: [
      { id: "announce", label: "官方公告", keywords: ["爱游戏", "官方", "公告"] },
      { id: "event", label: "活动资讯", keywords: ["爱游戏", "活动", "福利"] },
      { id: "patch", label: "版本更新", keywords: ["爱游戏", "更新", "补丁"] }
    ]
  },
  community: {
    title: "社区",
    tags: ["爱游戏", "玩家", "讨论", "攻略"],
    sections: [
      { id: "forum", label: "论坛", keywords: ["爱游戏", "讨论", "交流"] },
      { id: "guide", label: "攻略心得", keywords: ["爱游戏", "攻略", "技巧"] },
      { id: "gallery", label: "玩家作品", keywords: ["爱游戏", "截图", "创作"] }
    ]
  }
};

const siteUrl = "https://cn-index-i-game.com.cn";
const coreKeyword = "爱游戏";

function getAllKeywords() {
  const keywords = new Set();
  keywords.add(coreKeyword);
  Object.values(contentMap).forEach(area => {
    area.tags.forEach(tag => keywords.add(tag));
    area.sections.forEach(section => {
      section.keywords.forEach(kw => keywords.add(kw));
    });
  });
  return Array.from(keywords);
}

function searchContent(query) {
  if (!query || query.trim() === "") return [];
  const q = query.trim().toLowerCase();
  const results = [];

  Object.entries(contentMap).forEach(([areaKey, area]) => {
    const areaMatch = area.title.toLowerCase().includes(q) ||
      area.tags.some(tag => tag.toLowerCase().includes(q));
    const matchedSections = area.sections.filter(section => {
      return section.label.toLowerCase().includes(q) ||
        section.keywords.some(kw => kw.toLowerCase().includes(q));
    });

    if (areaMatch || matchedSections.length > 0) {
      results.push({
        area: areaKey,
        title: area.title,
        tags: area.tags,
        matchedSections: matchedSections.length > 0 ? matchedSections : area.sections,
        relevance: areaMatch ? 2 : 1
      });
    }
  });

  results.sort((a, b) => b.relevance - a.relevance);
  return results;
}

function getAreaByTag(tag) {
  const t = tag.trim().toLowerCase();
  for (const [key, area] of Object.entries(contentMap)) {
    if (area.tags.some(tag => tag.toLowerCase() === t)) {
      return { area: key, data: area };
    }
  }
  return null;
}

function buildTagCloud() {
  const tagCount = {};
  Object.values(contentMap).forEach(area => {
    area.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
    area.sections.forEach(section => {
      section.keywords.forEach(kw => {
        tagCount[kw] = (tagCount[kw] || 0) + 1;
      });
    });
  });
  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

const testSearch = searchContent("爱游戏");
const testTag = getAreaByTag("攻略");
const testCloud = buildTagCloud();