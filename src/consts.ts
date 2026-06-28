export const SITE = {
  title: 'WTP的部落格',
  description: '好的技術文章不只傳遞知識，也傳遞觀點。這裡是我思考與書寫的地方。',
  author: 'WTP',
  url: 'https://example.com',
  twitter: '@yourhandle',
  language: 'zh-Hant',
};

export const CATEGORIES: Record<string, string> = {
  journal: '生活紀錄',
  random: '雜談',
  frontend: '全栈',
  'software-development': '軟體工程',
  devnote: '開發筆記',
  cs: '計算機科學',
  programming: '程式設計',
  reading: '讀書、課程筆記',
  'career-retrospect': '職涯回首',
  'year-in-review': '回顧系列',
  now: '現在',
  about: '關於',
};

export const CATEGORY_SLUGS = [
  'journal',
  'random',
  'frontend',
  'software-development',
  'devnote',
  'cs',
  'programming',
  'reading',
  'career-retrospect',
  'year-in-review',
];

export const POSTS_PER_PAGE = 13;
