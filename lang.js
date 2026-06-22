'use strict';

// ─── Supported Languages ────────────────────────────────────────────────────
const LANGUAGES = {
  'zh-TW': '中文（繁體）',
  'zh-CN': '中文（簡體）',
  'en':    'English',
  'ja':    '日本語',
  'ko':    '한국어',
};

// ─── Translation Data ───────────────────────────────────────────────────────
// Phase 1: zh-TW and en are fully populated. zh-CN / ja / ko are stubs to be
// filled in later — t() falls back to zh-TW for any missing key.
const LANG_DATA = {
  'zh-TW': {
    // 導航
    'nav.home': '首頁',
    'nav.quest': '任務',
    'nav.explore': '探索',
    'nav.shop': '商店',
    'nav.settings': '設定',
    // 主頁
    'home.feed': '餵食',
    'home.drink': '飲料',
    'home.item': '道具',
    'home.pet': '寵物',
    'home.info': '資訊',
    // 背包
    'bag.food': '食物',
    'bag.drink': '飲料',
    'bag.item': '道具',
    'bag.pet': '寵物',
    'bag.empty.food': '背包沒有食物，去商店購買吧！',
    'bag.empty.drink': '背包沒有飲料，去商店購買吧！',
    'bag.empty.item': '背包沒有道具，去商店購買吧！',
    'bag.empty.pet': '背包沒有寵物，去扭蛋機抽吧！',
    // 商店
    'shop.title': '商店',
    'shop.bank': '能量銀行',
    'shop.petshop': '寵物商店',
    'shop.snack': '零食商店',
    'shop.style': '形象商店',
    'shop.gacha': '扭蛋機',
    'shop.view': '查看',
    // 扭蛋
    'gacha.title': '寵物抽獎',
    'gacha.pool': '常駐卡池',
    'gacha.single': '單次抽獎',
    'gacha.ten': '十次抽獎',
    'gacha.ad': '看廣告抽一次',
    'gacha.new': 'NEW！',
    'gacha.owned': '已擁有',
    // 探索
    'explore.title': '探索',
    'explore.world': '探索世界',
    'explore.boss': 'BOSS 挑戰',
    'explore.mystery': '神秘商店',
    'explore.go': '出去玩',
    // BOSS
    'boss.title': 'BOSS 挑戰',
    'boss.locked': '🔒 未解鎖',
    'boss.ticket': '🎫 使用挑戰卷挑戰',
    'boss.need_ticket': '🎫 需要挑戰卷',
    // 戰鬥
    'battle.ap': '行動值',
    'battle.end_turn': '結束回合',
    'battle.victory': '勝利！',
    'battle.defeat': '戰鬥失敗',
    'battle.crit': '暴擊！',
    // 任務
    'quest.daily': '每日',
    'quest.achievement': '成就',
    'quest.weekly': '週常',
    'quest.inprogress': '進行中',
    'quest.claim': '領取',
    'quest.claimed': '已領取',
    // 設定
    'settings.title': '設定',
    'settings.sound': '音效',
    'settings.bgm': 'BGM',
    'settings.volume': '音量',
    'settings.language': '語言',
    'settings.notify': '通知提醒',
    'settings.export': '匯出存檔',
    'settings.import': '匯入存檔',
    'settings.clear': '清除存檔',
    'settings.version': '遊戲版本',
    'settings.developer': '開發者',
    'settings.contact': '聯絡我們',
    // 能量銀行
    'bank.title': '能量兌換銀行',
    'bank.rate': '今日匯率',
    'bank.exchange': '兌換',
    'bank.owned': '你擁有的像素晶石',
    // 稀有度
    'rarity.F': 'F',
    'rarity.R': 'R',
    'rarity.SR': 'SR',
    'rarity.SSR': 'SSR',
    // 屬性
    'stat.hp': '生命值',
    'stat.atk': '攻擊力',
    'stat.def': '防禦力',
    'stat.mood': '心情',
    'stat.hunger': '飽食',
    'stat.water': '水份',
    'stat.exp': 'EXP',
    'stat.level': '等級',
    // Toast 訊息
    'toast.level_up': '升級啦！',
    'toast.max_level': '已達等級上限！',
    'toast.no_coins': '能量石不足！',
    'toast.feed_success': '餵食成功！',
    'toast.drink_success': '飲料使用成功！',
    'toast.gacha_result': '抽獎結果',
    'toast.ticket_used': '使用挑戰卷！',
    'toast.treasure': '獲得能量石！',
  },

  'en': {
    // Navigation
    'nav.home': 'Home',
    'nav.quest': 'Quests',
    'nav.explore': 'Explore',
    'nav.shop': 'Shop',
    'nav.settings': 'Settings',
    // Home
    'home.feed': 'Feed',
    'home.drink': 'Drink',
    'home.item': 'Items',
    'home.pet': 'Pets',
    'home.info': 'Info',
    // Bag
    'bag.food': 'Food',
    'bag.drink': 'Drinks',
    'bag.item': 'Items',
    'bag.pet': 'Pets',
    'bag.empty.food': 'No food in bag. Go to shop!',
    'bag.empty.drink': 'No drinks in bag. Go to shop!',
    'bag.empty.item': 'No items in bag. Go to shop!',
    'bag.empty.pet': 'No pets in bag. Try the gacha!',
    // Shop
    'shop.title': 'Shop',
    'shop.bank': 'Energy Bank',
    'shop.petshop': 'Pet Shop',
    'shop.snack': 'Snack Shop',
    'shop.style': 'Style Shop',
    'shop.gacha': 'Gacha',
    'shop.view': 'View',
    // Gacha
    'gacha.title': 'Pet Gacha',
    'gacha.pool': 'Standard Pool',
    'gacha.single': 'Single Draw',
    'gacha.ten': '10x Draw',
    'gacha.ad': 'Watch Ad to Draw',
    'gacha.new': 'NEW!',
    'gacha.owned': 'Owned',
    // Explore
    'explore.title': 'Explore',
    'explore.world': 'Explore World',
    'explore.boss': 'BOSS Battle',
    'explore.mystery': 'Mystery Shop',
    'explore.go': 'Go Outside',
    // BOSS
    'boss.title': 'BOSS Battle',
    'boss.locked': '🔒 Locked',
    'boss.ticket': '🎫 Use Ticket',
    'boss.need_ticket': '🎫 Need Ticket',
    // Battle
    'battle.ap': 'AP',
    'battle.end_turn': 'End Turn',
    'battle.victory': 'Victory!',
    'battle.defeat': 'Defeated',
    'battle.crit': 'Critical!',
    // Quest
    'quest.daily': 'Daily',
    'quest.achievement': 'Achievement',
    'quest.weekly': 'Weekly',
    'quest.inprogress': 'In Progress',
    'quest.claim': 'Claim',
    'quest.claimed': 'Claimed',
    // Settings
    'settings.title': 'Settings',
    'settings.sound': 'Sound',
    'settings.bgm': 'BGM',
    'settings.volume': 'Volume',
    'settings.language': 'Language',
    'settings.notify': 'Notifications',
    'settings.export': 'Export Save',
    'settings.import': 'Import Save',
    'settings.clear': 'Clear Save',
    'settings.version': 'Version',
    'settings.developer': 'Developer',
    'settings.contact': 'Contact Us',
    // Bank
    'bank.title': 'Energy Exchange Bank',
    'bank.rate': 'Today\'s Rate',
    'bank.exchange': 'Exchange',
    'bank.owned': 'Your Pixel Gems',
    // Rarity
    'rarity.F': 'F',
    'rarity.R': 'R',
    'rarity.SR': 'SR',
    'rarity.SSR': 'SSR',
    // Stats
    'stat.hp': 'HP',
    'stat.atk': 'ATK',
    'stat.def': 'DEF',
    'stat.mood': 'Mood',
    'stat.hunger': 'Hunger',
    'stat.water': 'Water',
    'stat.exp': 'EXP',
    'stat.level': 'Level',
    // Toast
    'toast.level_up': 'Level Up!',
    'toast.max_level': 'Max Level Reached!',
    'toast.no_coins': 'Not enough gems!',
    'toast.feed_success': 'Fed successfully!',
    'toast.drink_success': 'Drink used!',
    'toast.gacha_result': 'Gacha Result',
    'toast.ticket_used': 'Ticket used!',
    'toast.treasure': 'Gems obtained!',
  },

  'zh-CN': {},  // 之後補
  'ja': {},     // 之後補
  'ko': {},     // 之後補
};

// ─── Active Language State ──────────────────────────────────────────────────
let currentLang = localStorage.getItem('language') || 'zh-TW';

const t = (key) => {
  const langData = LANG_DATA[currentLang];
  const fallback = LANG_DATA['zh-TW'];
  return (langData && langData[key]) || fallback[key] || key;
};

const setLang = (lang) => {
  currentLang = lang;
  localStorage.setItem('language', lang);
  location.reload(); // 重新整理套用新語言
};
