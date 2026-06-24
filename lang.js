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
    'home.collection': '圖鑑',
    'home.manage': '管理',
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
    'shop.subtitle': '銀行與商店',
    'shop.back': '← 返回',
    'shop.bank': '能量銀行',
    'shop.food.name': '食物商店',
    'shop.drink.name': '飲料商店',
    'shop.item.name': '道具商店',
    'shop.petshop': '寵物商店',
    'shop.snack': '零食商店',
    'shop.style': '形象商店',
    'shop.gacha': '扭蛋機',
    'shop.view': '查看',
    'shop.food.desc': '購買食物',
    'shop.drink.desc': '購買飲料',
    'shop.item.desc': '購買寵物道具',
    'shop.gacha.desc': '抽取稀有寵物',
    'food.shop.title': '食物商店',
    'drink.shop.title': '飲料商店',
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
    'explore.subtitle': '選擇探索模式',
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
    'bank.rate.desc': '可以兌換最近一週的步數，兌換後清空列表',
    'bank.exchange': '兌換',
    'bank.owned': '你擁有的像素晶石',
    'bank.empty': '所有步數已兌換',
    'bank.empty.desc': '明天 00:00 後會新增當天步數',
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
    // 食物商品
    'food.biscuit_crumbs': '餅乾屑',
    'food.biscuit': '餅乾',
    'food.corn': '玉米',
    'food.toast': '吐司',
    'food.donut': '甜甜圈',
    'food.fries': '薯條',
    'food.hotdog': '熱狗',
    'food.chicken_leg': '雞腿',
    'food.pizza': '披薩',
    'food.burger': '漢堡',
    'food.salmon': '鮭魚',
    'food.chocolate': '巧克力',
    'food.cake': '蛋糕',
    // 飲料商品
    'drink.water': '礦泉水',
    'drink.tea': '紅茶',
    'drink.green_tea': '綠茶',
    'drink.grape_juice': '葡萄汁',
    'drink.apple_juice': '蘋果汁',
    'drink.cola': '可樂',
    'drink.milk': '牛奶',
    'drink.coffee': '咖啡',
    // Toast 訊息
    'toast.level_up': '升級啦！',
    'toast.max_level': '已達等級上限！',
    'toast.no_coins': '能量石不足！',
    'toast.feed_success': '餵食成功！',
    'toast.drink_success': '飲料使用成功！',
    'toast.gacha_result': '抽獎結果',
    'toast.ticket_used': '使用挑戰卷！',
    'toast.treasure': '獲得能量石！',
    // 任務內容（每日 / 成就 / 週常）
    'quest.d1.name': '餵食寵物',     'quest.d1.desc': '使用一次食物',
    'quest.d2.name': '給寵物喝飲料', 'quest.d2.desc': '使用一次飲料',
    'quest.d3.name': '挑戰 BOSS',   'quest.d3.desc': '完成一場 BOSS 戰鬥',
    'quest.d4.name': '心情滿滿',    'quest.d4.desc': '任一寵物心情達到 80 以上',
    'quest.d5.name': '扭蛋一抽',    'quest.d5.desc': '抽一次扭蛋',
    'quest.d6.name': '出去尋寶',    'quest.d6.desc': '收集一個寶箱',
    'quest.d7.name': '兌換能量',    'quest.d7.desc': '完成一次步數兌換',
    'quest.d8.name': '免費能量石',  'quest.d8.desc': '觀看廣告獲得獎勵',
    'quest.a1.name': '初出茅廬',  'quest.a1.desc': '任一寵物達到 Lv.10',
    'quest.a2.name': '漸入佳境',  'quest.a2.desc': '任一寵物達到 Lv.20',
    'quest.a3.name': '爐火純青',  'quest.a3.desc': '任一寵物達到 Lv.30',
    'quest.a4.name': '登峰造極',  'quest.a4.desc': '任一寵物達到 Lv.50',
    'quest.a5.name': '收藏家',    'quest.a5.desc': '收集 10 隻寵物',
    'quest.a6.name': '收藏大師',  'quest.a6.desc': '收集 25 隻寵物',
    'quest.a7.name': '收藏王者',  'quest.a7.desc': '收集 51 隻寵物',
    'quest.a8.name': '初戰告捷',  'quest.a8.desc': '通關第一隻 BOSS',
    'quest.a9.name': '無人能敵',  'quest.a9.desc': '通關全部 BOSS',
    'quest.a10.name': '幸運降臨', 'quest.a10.desc': '抽中第一隻 SSR 寵物',
    'quest.a11.name': '小富翁',   'quest.a11.desc': '累積花費 1000 能量石',
    'quest.a12.name': '大富翁',   'quest.a12.desc': '累積花費 5000 能量石',
    'quest.w1.name': '戰鬥達人', 'quest.w1.desc': '完成 5 場戰鬥',
    'quest.w2.name': '扭蛋十連', 'quest.w2.desc': '累積抽 10 次扭蛋',
    'quest.w3.name': '步數達人', 'quest.w3.desc': '連續兌換步數 7 天',
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
    'home.collection': 'Collection',
    'home.manage': 'Manage',
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
    'shop.subtitle': 'Bank & Shop',
    'shop.back': '← Back',
    'shop.bank': 'Energy Bank',
    'shop.food.name': 'Food Shop',
    'shop.drink.name': 'Drink Shop',
    'shop.item.name': 'Item Shop',
    'shop.petshop': 'Pet Shop',
    'shop.snack': 'Snack Shop',
    'shop.style': 'Style Shop',
    'shop.gacha': 'Gacha',
    'shop.view': 'View',
    'shop.food.desc': 'Buy food',
    'shop.drink.desc': 'Buy drinks',
    'shop.item.desc': 'Buy pet items',
    'shop.gacha.desc': 'Draw rare pets',
    'food.shop.title': 'Food Shop',
    'drink.shop.title': 'Drink Shop',
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
    'explore.subtitle': 'Choose Explore Mode',
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
    'bank.rate.desc': 'Exchange steps from the past week. List clears after exchange.',
    'bank.exchange': 'Exchange',
    'bank.owned': 'Your Pixel Gems',
    'bank.empty': 'All steps exchanged',
    'bank.empty.desc': 'New steps will be added tomorrow at 00:00',
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
    // Food items
    'food.biscuit_crumbs': 'Biscuit Crumbs',
    'food.biscuit': 'Biscuit',
    'food.corn': 'Corn',
    'food.toast': 'Toast',
    'food.donut': 'Donut',
    'food.fries': 'French Fries',
    'food.hotdog': 'Hot Dog',
    'food.chicken_leg': 'Chicken Leg',
    'food.pizza': 'Pizza',
    'food.burger': 'Burger',
    'food.salmon': 'Salmon',
    'food.chocolate': 'Chocolate',
    'food.cake': 'Cake',
    // Drink items
    'drink.water': 'Mineral Water',
    'drink.tea': 'Black Tea',
    'drink.green_tea': 'Green Tea',
    'drink.grape_juice': 'Grape Juice',
    'drink.apple_juice': 'Apple Juice',
    'drink.cola': 'Cola',
    'drink.milk': 'Milk',
    'drink.coffee': 'Coffee',
    // Toast
    'toast.level_up': 'Level Up!',
    'toast.max_level': 'Max Level Reached!',
    'toast.no_coins': 'Not enough gems!',
    'toast.feed_success': 'Fed successfully!',
    'toast.drink_success': 'Drink used!',
    'toast.gacha_result': 'Gacha Result',
    'toast.ticket_used': 'Ticket used!',
    'toast.treasure': 'Gems obtained!',
    // Quest content (daily / achievement / weekly)
    'quest.d1.name': 'Feed Pet',         'quest.d1.desc': 'Use food once',
    'quest.d2.name': 'Give Pet a Drink', 'quest.d2.desc': 'Use a drink once',
    'quest.d3.name': 'Challenge BOSS',   'quest.d3.desc': 'Complete one BOSS battle',
    'quest.d4.name': 'Mood Boost',       'quest.d4.desc': "Any pet's mood reaches 80+",
    'quest.d5.name': 'One Gacha Pull',   'quest.d5.desc': 'Pull the gacha once',
    'quest.d6.name': 'Treasure Hunt',    'quest.d6.desc': 'Collect one treasure chest',
    'quest.d7.name': 'Exchange Energy',  'quest.d7.desc': 'Complete one step exchange',
    'quest.d8.name': 'Free Gems',        'quest.d8.desc': 'Watch an ad for a reward',
    'quest.a1.name': 'First Steps',      'quest.a1.desc': 'Any pet reaches Lv.10',
    'quest.a2.name': 'Getting Stronger', 'quest.a2.desc': 'Any pet reaches Lv.20',
    'quest.a3.name': 'Masterful',        'quest.a3.desc': 'Any pet reaches Lv.30',
    'quest.a4.name': 'Peak Performance', 'quest.a4.desc': 'Any pet reaches Lv.50',
    'quest.a5.name': 'Collector',        'quest.a5.desc': 'Collect 10 pets',
    'quest.a6.name': 'Master Collector', 'quest.a6.desc': 'Collect 25 pets',
    'quest.a7.name': 'Collection King',  'quest.a7.desc': 'Collect 51 pets',
    'quest.a8.name': 'First Victory',    'quest.a8.desc': 'Clear your first BOSS',
    'quest.a9.name': 'Unstoppable',      'quest.a9.desc': 'Clear all BOSSes',
    'quest.a10.name': 'Lucky Draw',      'quest.a10.desc': 'Pull your first SSR pet',
    'quest.a11.name': 'Small Fortune',   'quest.a11.desc': 'Spend 1000 gems total',
    'quest.a12.name': 'Big Fortune',     'quest.a12.desc': 'Spend 5000 gems total',
    'quest.w1.name': 'Battle Expert',    'quest.w1.desc': 'Complete 5 battles',
    'quest.w2.name': 'Gacha x10',        'quest.w2.desc': 'Pull the gacha 10 times total',
    'quest.w3.name': 'Step Master',      'quest.w3.desc': 'Exchange steps 7 days in a row',
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
  applyLang(); // 不再 location.reload()，直接套用
};

// ─── DOM Binding: data-i18n / data-i18n-placeholder / data-lang ────────────
const applyLang = () => {
  // 掃描所有 data-i18n 元素自動替換文字
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (translation) el.textContent = translation;
  });

  // placeholder 支援
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = t(key);
    if (translation) el.placeholder = translation;
  });

  // 更新語言選擇按鈕樣式
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
};

document.addEventListener('DOMContentLoaded', applyLang);
