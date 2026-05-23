'use strict';

// ─── Constants ───────────────────────────────────────────────────────────────
const EXP_PER_LEVEL  = 100;
const FEED_COSTS     = { fish: 10, meat: 25, cake: 50 };
const FEED_HUNGER    = { fish: 20, meat: 35, cake: 50 };
const FEED_EXP       = { fish: 5,  meat: 10, cake: 20 };
const DRINK_COSTS    = { water: 5, juice: 15, milk: 30 };
const DRINK_WATER    = { water: 25, juice: 40, milk: 60 };
const DRINK_MOOD     = { water: 0,  juice: 3,  milk: 5  };
const DRINK_EXP      = { water: 3,  juice: 8,  milk: 15 };
const DECAY_INTERVAL = 60_000;

const PETS = [
  { id: 'pet1',  name: '小狗',   rarity: 'F',  image: 'assets/pets/小狗.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 10, icon: '🦷' }] },
  { id: 'pet2',  name: '柴犬',   rarity: 'F',  image: 'assets/pets/柴犬.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 10, icon: '🦷' }] },
  { id: 'pet3',  name: '臘腸狗', rarity: 'F',  image: 'assets/pets/臘腸狗.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 10, icon: '🦷' }] },
  { id: 'pet4',  name: '柯基',   rarity: 'F',  image: 'assets/pets/柯基.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 10, icon: '🦷' }] },
  { id: 'pet5',  name: '比格犬', rarity: 'R',  image: 'assets/pets/比格犬.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 10, icon: '🦷' }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 24, icon: '🦷' }] },
  { id: 'pet6',  name: '米克斯', rarity: 'R',  image: 'assets/pets/米克斯.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 10, icon: '🦷' }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 24, icon: '🦷' }] },
  { id: 'pet7',  name: '貴賓狗', rarity: 'R',  image: 'assets/pets/貴賓狗.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 10, icon: '🦷' }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 24, icon: '🦷' }] },
  { id: 'pet8',  name: '比熊',   rarity: 'R',  image: 'assets/pets/比熊.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 10, icon: '🦷' }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 24, icon: '🦷' }] },
  { id: 'pet9',  name: '德牧',   rarity: 'SR', image: 'assets/pets/德牧.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 10, icon: '🦷' }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 24, icon: '🦷' }, { name: '強咬', desc: '以獵犬本能發動致命一咬', effect: 'atk', power: 45, icon: '🦷' }] },
  { id: 'pet10', name: '邊牧',   rarity: 'SR', image: 'assets/pets/邊牧.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 10, icon: '🦷' }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 24, icon: '🦷' }, { name: '強咬', desc: '以獵犬本能發動致命一咬', effect: 'atk', power: 45, icon: '🦷' }] },
  { id: 'pet11', name: '伯恩山', rarity: 'SR', image: 'assets/pets/伯恩山.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 10, icon: '🦷' }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 24, icon: '🦷' }, { name: '強咬', desc: '以獵犬本能發動致命一咬', effect: 'atk', power: 45, icon: '🦷' }] },
  { id: 'pet12', name: '牧羊犬', rarity: 'SR', image: 'assets/pets/牧羊犬.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 10, icon: '🦷' }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 24, icon: '🦷' }, { name: '強咬', desc: '以獵犬本能發動致命一咬', effect: 'atk', power: 45, icon: '🦷' }] },
  { id: 'pet13', name: '橘貓',       rarity: 'F',  image: 'assets/pets/橘貓.png' },
  { id: 'pet14', name: '灰貓',       rarity: 'F',  image: 'assets/pets/灰貓.png' },
  { id: 'pet15', name: '白貓',       rarity: 'F',  image: 'assets/pets/白貓.png' },
  { id: 'pet16', name: '黑貓',       rarity: 'F',  image: 'assets/pets/黑貓.png' },
  { id: 'pet17', name: '英國短毛貓', rarity: 'R',  image: 'assets/pets/英國短毛貓.png' },
  { id: 'pet18', name: '牛奶貓',     rarity: 'R',  image: 'assets/pets/牛奶貓.png' },
  { id: 'pet19', name: '布偶貓',     rarity: 'R',  image: 'assets/pets/布偶貓.png' },
  { id: 'pet20', name: '三花貓',     rarity: 'SR', image: 'assets/pets/三花貓.png' },
  { id: 'pet21', name: '波斯貓',     rarity: 'SR', image: 'assets/pets/波斯貓.png' },
  { id: 'pet22', name: '緬因貓',     rarity: 'SR', image: 'assets/pets/緬因貓.png' },
  { id: 'pet23', name: '狐狸',       rarity: 'R',  image: 'assets/pets/狐狸.png' },
  { id: 'pet24', name: '小豬',         rarity: 'F',  image: 'assets/pets/小豬.png' },
  { id: 'pet25', name: '麝香豬',       rarity: 'R',  image: 'assets/pets/麝香豬.png' },
  { id: 'pet26', name: '灰兔',         rarity: 'F',  image: 'assets/pets/灰兔.png' },
  { id: 'pet27', name: '黑兔',         rarity: 'F',  image: 'assets/pets/黑兔.png' },
  { id: 'pet28', name: '白兔',         rarity: 'F',  image: 'assets/pets/白兔.png' },
  { id: 'pet29', name: '道奇兔',       rarity: 'R',  image: 'assets/pets/道奇兔.png' },
  { id: 'pet30', name: '庫你迷你豬',   rarity: 'R',  image: 'assets/pets/庫你迷你豬.png' },
  { id: 'pet31', name: '迷你豬',       rarity: 'SR', image: 'assets/pets/迷你豬.png' },
  { id: 'pet32', name: '長耳兔',       rarity: 'SR', image: 'assets/pets/長耳兔.png' },
  { id: 'pet33', name: '海福特牛',     rarity: 'SR', image: 'assets/pets/海福特牛.png' },
  { id: 'pet34', name: '牡丹鸚鵡',     rarity: 'F',  image: 'assets/pets/牡丹鸚鵡.png' },
  { id: 'pet35', name: '折衷鸚鵡',     rarity: 'F',  image: 'assets/pets/折衷鸚鵡.png' },
  { id: 'pet36', name: '虎皮鸚鵡',     rarity: 'R',  image: 'assets/pets/虎皮鸚鵡.png' },
  { id: 'pet37', name: '玄風鸚鵡',     rarity: 'R',  image: 'assets/pets/玄風鸚鵡.png' },
  { id: 'pet38', name: '非洲灰鸚鵡',   rarity: 'SR', image: 'assets/pets/非洲灰鸚鵡.png' },
  { id: 'pet39', name: '鳳頭巴丹鸚鵡', rarity: 'SR', image: 'assets/pets/鳳頭巴丹鸚鵡.png' },
  { id: 'pet40', name: '雞',           rarity: 'R',  image: 'assets/pets/雞.png' },
  { id: 'pet41', name: '小鴨',         rarity: 'R',  image: 'assets/pets/小鴨.png' },
  { id: 'pet42', name: '水豚',         rarity: 'SR', image: 'assets/pets/水豚.png' },
  { id: 'pet43', name: '樹麻雀',       rarity: 'R',  image: 'assets/pets/樹麻雀.png' },
  { id: 'pet44', name: '紅頭山雀',     rarity: 'SR', image: 'assets/pets/紅頭山雀.png' },
  { id: 'pet45', name: '黃牛',         rarity: 'F',  image: 'assets/pets/黃牛.png' },
  { id: 'pet46', name: '荷斯坦牛',     rarity: 'R',  image: 'assets/pets/荷斯坦牛.png' },
  { id: 'pet47', name: '浣熊',         rarity: 'R',  image: 'assets/pets/浣熊.png' },
  { id: 'pet48', name: '山羌',         rarity: 'R',  image: 'assets/pets/山羌.png' },
  { id: 'pet49', name: '梅花鹿',       rarity: 'SR', image: 'assets/pets/梅花鹿.png' },
  { id: 'pet50', name: '綿羊',         rarity: 'R',  image: 'assets/pets/綿羊.png' },
  { id: 'pet51', name: '紅浣熊',       rarity: 'SR', image: 'assets/pets/紅浣熊.png' },
];

const FOODS = [
  { id: 'food_01', name: '餅乾屑', rarity: 'F',   image: 'assets/foods/food_01.png', price: 10,  effect: { hunger: 1,  exp: 1  }, desc: '+1 飽食 +1 EXP'            },
  { id: 'food_02', name: '餅乾',   rarity: 'F',   image: 'assets/foods/food_02.png', price: 50,  effect: { hunger: 5,  exp: 5  }, desc: '+5 飽食 +5 EXP'            },
  { id: 'food_03', name: '玉米',   rarity: 'F',   image: 'assets/foods/food_03.png', price: 50,  effect: { hunger: 5,  exp: 5  }, desc: '+5 飽食 +5 EXP'            },
  { id: 'food_04', name: '吐司',   rarity: 'F',   image: 'assets/foods/food_04.png', price: 50,  effect: { hunger: 5,  exp: 5  }, desc: '+5 飽食 +5 EXP'            },
  { id: 'food_05', name: '甜甜圈', rarity: 'R',   image: 'assets/foods/food_05.png', price: 100, effect: { hunger: 15, exp: 15 }, desc: '+15 飽食 +15 EXP'          },
  { id: 'food_06', name: '薯條',   rarity: 'R',   image: 'assets/foods/food_06.png', price: 100, effect: { hunger: 15, exp: 15 }, desc: '+15 飽食 +15 EXP'          },
  { id: 'food_07', name: '熱狗',   rarity: 'R',   image: 'assets/foods/food_07.png', price: 100, effect: { hunger: 15, exp: 15 }, desc: '+15 飽食 +15 EXP'          },
  { id: 'food_08', name: '雞腿',   rarity: 'SR',  image: 'assets/foods/food_08.png', price: 250, effect: { hunger: 50, exp: 25 }, desc: '+50 飽食 +25 EXP'          },
  { id: 'food_09', name: '披薩',   rarity: 'SR',  image: 'assets/foods/food_09.png', price: 250, effect: { hunger: 50, exp: 25 }, desc: '+50 飽食 +25 EXP'          },
  { id: 'food_10', name: '漢堡',   rarity: 'SR',  image: 'assets/foods/food_10.png', price: 250, effect: { hunger: 50, exp: 25 }, desc: '+50 飽食 +25 EXP'          },
  { id: 'food_11', name: '鮭魚',   rarity: 'SSR', image: 'assets/foods/food_11.png', price: 500, effect: { water: 10, hunger: 90, exp: 50 }, desc: '+10 水份 +90 飽食 +50 EXP' },
  { id: 'food_12', name: '巧克力', rarity: 'SSR', image: 'assets/foods/food_12.png', price: 500, effect: { hunger: 90, mood: 10, exp: 50  }, desc: '+90 飽食 +10 心情 +50 EXP' },
  { id: 'food_13', name: '蛋糕',   rarity: 'SSR', image: 'assets/foods/food_13.png', price: 500, effect: { hunger: 90, exp: 60 }, desc: '+90 飽食 +60 EXP'          },
];

const DRINKS = [
  { id: 'drink_01', name: '礦泉水', rarity: 'F',   image: 'assets/drinks/drink_01.png', price: 50,  effect: { water: 5,   exp: 5  }, desc: '+5 水份 +5 EXP'            },
  { id: 'drink_02', name: '紅茶',   rarity: 'R',   image: 'assets/drinks/drink_02.png', price: 100, effect: { water: 15,  exp: 15 }, desc: '+15 水份 +15 EXP'          },
  { id: 'drink_03', name: '綠茶',   rarity: 'R',   image: 'assets/drinks/drink_03.png', price: 100, effect: { water: 15,  exp: 15 }, desc: '+15 水份 +15 EXP'          },
  { id: 'drink_04', name: '葡萄汁', rarity: 'SR',  image: 'assets/drinks/drink_04.png', price: 250, effect: { water: 50,  exp: 25 }, desc: '+50 水份 +25 EXP'          },
  { id: 'drink_05', name: '蘋果汁', rarity: 'SR',  image: 'assets/drinks/drink_05.png', price: 250, effect: { water: 50,  exp: 25 }, desc: '+50 水份 +25 EXP'          },
  { id: 'drink_06', name: '可樂',   rarity: 'SSR', image: 'assets/drinks/drink_06.png', price: 500, effect: { water: 90,  mood: 10, exp: 50  }, desc: '+90 水份 +10 心情 +50 EXP' },
  { id: 'drink_07', name: '牛奶',   rarity: 'SSR', image: 'assets/drinks/drink_07.png', price: 500, effect: { water: 90,  hunger: 10, exp: 50 }, desc: '+90 水份 +10 飽食 +50 EXP' },
  { id: 'drink_08', name: '咖啡',   rarity: 'SSR', image: 'assets/drinks/drink_08.png', price: 500, effect: { water: 100, exp: 60 }, desc: '+100 水份 +60 EXP'         },
];

const ITEM_DEFS = {
  potion:  { icon: '🧪', name: '回復藥',  desc: '+30飽食 +30水份 +20心情' },
  candy:   { icon: '🍬', name: '愛心糖',  desc: '+40心情' },
  xpboost: { icon: '⭐', name: '成長藥',  desc: '+50 EXP' },
};

const EQUIP_DEFS = {
  hat:   { icon: '🎩', name: '紳士帽' },
  scarf: { icon: '🧣', name: '圍巾' },
};

const RARITY_BASE_STATS = {
  F:   { hp: 100, atk: 10, def: 5  },
  R:   { hp: 150, atk: 18, def: 10 },
  SR:  { hp: 220, atk: 30, def: 18 },
  SSR: { hp: 350, atk: 50, def: 30 },
};

const RARITY_SKILLS = {
  F: [
    { name: '普通攻擊', desc: '普通的一擊',             effect: 'atk', power: 10, icon: '⚔️' },
  ],
  R: [
    { name: '普通攻擊', desc: '普通的一擊',             effect: 'atk', power: 10, icon: '⚔️' },
    { name: '強力一擊', desc: '蓄力後猛烈攻擊',         effect: 'atk', power: 25, icon: '💥' },
  ],
  SR: [
    { name: '普通攻擊', desc: '普通的一擊',             effect: 'atk', power: 10, icon: '⚔️' },
    { name: '強力一擊', desc: '蓄力後猛烈攻擊',         effect: 'atk', power: 25, icon: '💥' },
    { name: '元素爆發', desc: '釋放強大的元素能量',     effect: 'atk', power: 45, icon: '🔮' },
  ],
  SSR: [
    { name: '強力一擊', desc: '蓄力後猛烈攻擊',         effect: 'atk', power: 25, icon: '💥' },
    { name: '元素爆發', desc: '釋放強大的元素能量',     effect: 'atk', power: 45, icon: '🔮' },
    { name: '究極必殺', desc: '毀天滅地的終極技能',     effect: 'atk', power: 80, icon: '⚡' },
  ],
};

const calcStats = (pet, level) => {
  const base = pet.baseStats || RARITY_BASE_STATS[pet.rarity] || RARITY_BASE_STATS.F;
  return {
    hp:  base.hp  + (level - 1) * 10,
    atk: base.atk + (level - 1) * 2,
    def: base.def + (level - 1) * 1,
  };
};

const getPetSkills = (pet) => pet.skills || RARITY_SKILLS[pet.rarity] || RARITY_SKILLS.F;

const MOOD_MOODS = [
  [80, '😄'], [60, '😊'], [40, '😐'], [20, '😟'], [0, '😢']
];

// ─── State ───────────────────────────────────────────────────────────────────
const DEFAULT_GLOBAL = {
  coins: 50, hunger: 60, mood: 80, water: 70, items: {}, equips: [],
};
const DEFAULT_PET_STATE = { level: 1, exp: 0 };

let selectedPetId = localStorage.getItem('selectedPetId') || null;
let state = loadState();

function currentPet() {
  return PETS.find(p => p.id === selectedPetId) || PETS[0];
}

// ─── Persistence ─────────────────────────────────────────────────────────────
function loadState() {
  let global = { ...DEFAULT_GLOBAL };
  try {
    const raw = localStorage.getItem('pixelPet');
    if (raw) global = { ...DEFAULT_GLOBAL, ...JSON.parse(raw) };
  } catch {}

  let petSt = { ...DEFAULT_PET_STATE };
  if (selectedPetId) {
    try {
      const raw = localStorage.getItem(`petState_${selectedPetId}`);
      if (raw) petSt = { ...DEFAULT_PET_STATE, ...JSON.parse(raw) };
    } catch {}
  }

  return { ...global, ...petSt };
}

function saveState() {
  const global = {
    coins: state.coins, hunger: state.hunger, mood: state.mood,
    water: state.water, items: state.items, equips: state.equips,
  };
  localStorage.setItem('pixelPet', JSON.stringify(global));

  if (selectedPetId) {
    localStorage.setItem(`petState_${selectedPetId}`, JSON.stringify({
      level: state.level, exp: state.exp,
    }));
  }
}

const RARITY_ORDER = { 'F': 0, 'R': 1, 'SR': 2, 'SSR': 3 };

const GACHA_COST_SINGLE = 100;
const GACHA_COST_TEN    = 900;
const RARITY_RATES = [
  { rarity: 'SR', weight: 5  },
  { rarity: 'R',  weight: 30 },
  { rarity: 'F',  weight: 65 },
];

let unlockedPets = (() => {
  try {
    const raw = localStorage.getItem('unlockedPets');
    if (raw) return JSON.parse(raw);
  } catch {}
  return ['pet1'];
})();

function saveUnlockedPets() {
  localStorage.setItem('unlockedPets', JSON.stringify(unlockedPets));
}

function isUnlocked(id) {
  return unlockedPets.includes(id);
}

// ─── Pet Selection ────────────────────────────────────────────────────────────
function renderSelectScreen() {
  const grid = document.getElementById('select-grid');
  grid.innerHTML = '';

  const sorted = [...PETS].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);

  let lastRarity = null;
  sorted.forEach(pet => {
    if (pet.rarity !== lastRarity) {
      lastRarity = pet.rarity;
      const divider = document.createElement('div');
      divider.className = 'rarity-divider rarity-divider--' + pet.rarity.toLowerCase();
      divider.textContent = pet.rarity;
      grid.appendChild(divider);
    }
    const locked = !isUnlocked(pet.id);
    const card = document.createElement('button');
    card.className = 'select-card' + (locked ? ' select-card--locked' : '');
    if (!locked && pet.id === selectedPetId) card.classList.add('select-card--active');
    card.innerHTML = `
      <div class="select-card__img-wrap">
        ${locked ? '<div class="select-card__lock-overlay">🔒</div>' : ''}
        <img src="${pet.image}" alt="${pet.name}" class="pixel-art select-card__img" />
      </div>
      <span class="select-card__name">${pet.name}</span>
      <span class="badge badge--${pet.rarity.toLowerCase()}">${pet.rarity}</span>
    `;
    card.addEventListener('click', () => {
      if (locked) { showToast('前往扭蛋機解鎖！'); return; }
      selectPet(pet.id);
    });
    grid.appendChild(card);
  });
}

// ─── Gacha ────────────────────────────────────────────────────────────────────
function rollPet(forcedMinRarity = null) {
  let rarity;
  if (forcedMinRarity) {
    const minOrder = RARITY_ORDER[forcedMinRarity];
    const eligible = RARITY_RATES.filter(r => RARITY_ORDER[r.rarity] >= minOrder);
    const total = eligible.reduce((s, r) => s + r.weight, 0);
    let rand = Math.random() * total;
    for (const { rarity: r, weight } of eligible) {
      rand -= weight;
      if (rand <= 0) { rarity = r; break; }
    }
    rarity = rarity || forcedMinRarity;
  } else {
    const total = RARITY_RATES.reduce((s, r) => s + r.weight, 0);
    let rand = Math.random() * total;
    for (const { rarity: r, weight } of RARITY_RATES) {
      rand -= weight;
      if (rand <= 0) { rarity = r; break; }
    }
    rarity = rarity || 'F';
  }
  const pool = PETS.filter(p => p.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)] || PETS[0];
}

function doGachaRolls(count) {
  const results = [];
  let hasSRPlus = false;
  for (let i = 0; i < count; i++) {
    const needPity = count === 10 && i === count - 1 && !hasSRPlus;
    const pet = rollPet(needPity ? 'SR' : null);
    if (RARITY_ORDER[pet.rarity] >= 2) hasSRPlus = true;
    const isNew = !isUnlocked(pet.id);
    if (isNew) {
      unlockedPets.push(pet.id);
    } else {
      state.coins += 50;
    }
    results.push({ pet, isNew, compensation: isNew ? 0 : 50 });
  }
  saveUnlockedPets();
  saveState();
  renderCoins();
  return results;
}

function showGachaResult(results) {
  const grid = document.getElementById('gacha-result-grid');
  grid.innerHTML = '';
  results.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = `gacha-result-card gacha-result-card--${r.pet.rarity.toLowerCase()}`;
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <img src="${r.pet.image}" alt="${r.pet.name}" class="pixel-art gacha-result-card__img" />
      <span class="gacha-result-card__name">${r.pet.name}</span>
      <span class="badge badge--${r.pet.rarity.toLowerCase()}">${r.pet.rarity}</span>
      ${r.isNew
        ? '<span class="gacha-tag gacha-tag--new">NEW！</span>'
        : '<span class="gacha-tag gacha-tag--dup">已擁有 +50G</span>'}
    `;
    grid.appendChild(card);
  });
  openModal('modal-gacha-result');
}

function initGacha() {
  document.getElementById('btn-gacha-single')?.addEventListener('click', () => {
    if (!spendCoins(GACHA_COST_SINGLE)) { showToast('能量石不足！'); return; }
    const machine = document.getElementById('gacha-machine');
    machine?.classList.add('gacha-spin');
    setTimeout(() => {
      machine?.classList.remove('gacha-spin');
      showGachaResult(doGachaRolls(1));
    }, 1200);
  });
  document.getElementById('btn-gacha-ten')?.addEventListener('click', () => {
    if (!spendCoins(GACHA_COST_TEN)) { showToast('能量石不足！'); return; }
    const machine = document.getElementById('gacha-machine');
    machine?.classList.add('gacha-spin');
    setTimeout(() => {
      machine?.classList.remove('gacha-spin');
      showGachaResult(doGachaRolls(10));
    }, 1200);
  });
  document.getElementById('btn-gacha-close')?.addEventListener('click', () => {
    closeModal('modal-gacha-result');
    renderSelectScreen();
  });
}

function showSelectScreen() {
  renderSelectScreen();
  document.getElementById('screen-select').classList.remove('hidden');
}

function hideSelectScreen() {
  document.getElementById('screen-select').classList.add('hidden');
}

// ─── Pet Detail Screen ────────────────────────────────────────────────────────
function showPetDetail() {
  const pet    = currentPet();
  const level  = state.level;
  const stats  = calcStats(pet, level);
  const skills = getPetSkills(pet);

  document.getElementById('detail-pet-img').src = pet.image;
  document.getElementById('detail-pet-img').alt = pet.name;
  document.getElementById('detail-pet-name').textContent  = pet.name;
  document.getElementById('detail-pet-level').textContent = level;

  const badge = document.getElementById('detail-pet-rarity');
  badge.textContent = pet.rarity;
  badge.className   = `badge badge--${pet.rarity.toLowerCase()}`;

  document.getElementById('detail-hp').textContent         = stats.hp;
  document.getElementById('detail-atk').textContent        = stats.atk;
  document.getElementById('detail-def').textContent        = stats.def;
  document.getElementById('detail-rarity-val').textContent = pet.rarity;

  const container = document.getElementById('detail-skills-container');
  container.className = `detail-skills-container detail-skills-count-${skills.length}`;
  container.innerHTML = skills.map(s => `
    <div class="detail-skill-card">
      <div class="detail-skill-card__icon">${s.icon}</div>
      <div class="detail-skill-card__name">${s.name}</div>
      <div class="detail-skill-card__desc">${s.desc}</div>
      <div class="detail-skill-card__power">威力：${s.power}</div>
    </div>
  `).join('');

  document.getElementById('screen-pet-detail').classList.remove('hidden');
}

function hidePetDetail() {
  document.getElementById('screen-pet-detail').classList.add('hidden');
}

function selectPet(id) {
  if (selectedPetId) {
    localStorage.setItem(`petState_${selectedPetId}`, JSON.stringify({
      level: state.level, exp: state.exp,
    }));
  }

  selectedPetId = id;
  localStorage.setItem('selectedPetId', id);

  try {
    const raw = localStorage.getItem(`petState_${id}`);
    const petSt = raw ? { ...DEFAULT_PET_STATE, ...JSON.parse(raw) } : { ...DEFAULT_PET_STATE };
    state.level = petSt.level;
    state.exp   = petSt.exp;
  } catch {
    state.level = DEFAULT_PET_STATE.level;
    state.exp   = DEFAULT_PET_STATE.exp;
  }

  hideSelectScreen();
  renderAll();
  showToast(`選擇了 ${currentPet().name}！`);
}

// ─── EXP / Level ─────────────────────────────────────────────────────────────
function addExp(amount) {
  state.exp += amount;
  let leveled = false;
  while (state.exp >= EXP_PER_LEVEL) {
    state.exp -= EXP_PER_LEVEL;
    state.level++;
    leveled = true;
  }
  if (leveled) {
    showToast(`🎉 升級了！現在是 Lv.${state.level}！`);
    animateLevelUp();
    state.coins += 30;
  }
  saveState();
  renderAll();
}

function addCoins(n) {
  state.coins += n;
  saveState();
  renderCoins();
}

function spendCoins(n) {
  if (state.coins < n) return false;
  state.coins -= n;
  saveState();
  renderCoins();
  return true;
}

// ─── Rendering ───────────────────────────────────────────────────────────────
function renderAll() {
  renderPetCard();
  renderStats();
  renderCoins();
}

function renderPetCard() {
  const pet = currentPet();

  const img = document.getElementById('pet-img');
  img.src = pet.image;
  img.alt = pet.name;

  document.getElementById('pet-name').textContent  = pet.name;
  document.getElementById('pet-level').textContent = state.level;

  const badge = document.getElementById('pet-rarity-badge');
  badge.textContent = pet.rarity;
  badge.className   = `badge badge--${pet.rarity.toLowerCase()}`;

  const pct = Math.floor((state.exp / EXP_PER_LEVEL) * 100);
  document.getElementById('exp-fill').style.width = `${pct}%`;
  document.getElementById('exp-text').textContent  = `${state.exp} / ${EXP_PER_LEVEL}`;
}

function renderStats() {
  document.getElementById('stat-mood').textContent   = Math.round(state.mood);
  document.getElementById('stat-hunger').textContent = Math.round(state.hunger);
  document.getElementById('stat-water').textContent  = Math.round(state.water);

  document.getElementById('mood-fill').style.width   = `${state.mood}%`;
  document.getElementById('hunger-fill').style.width = `${state.hunger}%`;
  document.getElementById('water-fill').style.width  = `${state.water}%`;

  const moodEntry = MOOD_MOODS.find(([min]) => state.mood >= min) || MOOD_MOODS.at(-1);
  document.getElementById('pet-mood-emoji').textContent = moodEntry[1];
}

function renderCoins() {
  document.getElementById('coin-count').textContent = state.coins;
}

function animateLevelUp() {
  const el = document.getElementById('pet-level');
  el.classList.remove('level-up-anim');
  void el.offsetWidth;
  el.classList.add('level-up-anim');
}

// ─── Toast ────────────────────────────────────────────────────────────────────
let toastTimeout = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => el.classList.add('hidden'), 2500);
}

// ─── Feed ─────────────────────────────────────────────────────────────────────
function feedPet(type = 'fish') {
  const cost    = FEED_COSTS[type]  ?? 10;
  const hungerG = FEED_HUNGER[type] ?? 20;
  const expG    = FEED_EXP[type]    ?? 5;

  if (!spendCoins(cost)) { showToast('能量石不足！'); return; }

  state.hunger = Math.min(100, state.hunger + hungerG);
  state.mood   = Math.min(100, state.mood + 5);
  saveState();
  addExp(expG);
  showToast(`餵食成功！+${expG} EXP`);
}

// ─── Drink ────────────────────────────────────────────────────────────────────
function giveDrink(type = 'water') {
  const cost   = DRINK_COSTS[type] ?? 5;
  const waterG = DRINK_WATER[type] ?? 25;
  const moodG  = DRINK_MOOD[type]  ?? 0;
  const expG   = DRINK_EXP[type]   ?? 3;

  if (!spendCoins(cost)) { showToast('能量石不足！'); return; }

  state.water = Math.min(100, state.water + waterG);
  if (moodG > 0) state.mood = Math.min(100, state.mood + moodG);
  saveState();
  addExp(expG);
  closeModal('modal-drink');
  showToast(`補水成功！+${waterG} 💧 +${expG} EXP`);
}

// ─── Item Bag ─────────────────────────────────────────────────────────────────
function useItem(id) {
  if (!state.items[id] || state.items[id] <= 0) return;
  state.items[id]--;
  if (state.items[id] === 0) delete state.items[id];

  if (id === 'potion') {
    state.hunger = Math.min(100, state.hunger + 30);
    state.water  = Math.min(100, state.water  + 30);
    state.mood   = Math.min(100, state.mood   + 20);
    saveState(); renderStats();
    showToast('使用回復藥！+30飽食 +30水份 +20心情');
  } else if (id === 'candy') {
    state.mood = Math.min(100, state.mood + 40);
    saveState(); renderStats();
    showToast('使用愛心糖！+40心情 😄');
  } else if (id === 'xpboost') {
    saveState();
    addExp(50);
    showToast('使用成長藥！+50 EXP ⭐');
  }
  renderItemBag();
}

function renderItemBag() {
  const list  = document.getElementById('itembag-list');
  const owned = Object.entries(state.items).filter(([, cnt]) => cnt > 0);
  if (owned.length === 0) {
    list.innerHTML = '<p class="empty-hint" style="padding:16px 0">道具背包是空的</p>';
    return;
  }
  list.innerHTML = '';
  owned.forEach(([id, cnt]) => {
    const def = ITEM_DEFS[id];
    if (!def) return;
    const row = document.createElement('div');
    row.className = 'itembag-row';
    row.innerHTML = `
      <span class="itembag-icon">${def.icon}</span>
      <div class="itembag-info">
        <span class="itembag-name">${def.name}</span>
        <span class="itembag-desc">${def.desc}</span>
      </div>
      <span class="itembag-count">×${cnt}</span>
      <button class="use-btn" data-id="${id}">使用</button>
    `;
    list.appendChild(row);
  });
  list.querySelectorAll('.use-btn').forEach(btn => {
    btn.addEventListener('click', () => useItem(btn.dataset.id));
  });
}

// ─── Pet Bag ──────────────────────────────────────────────────────────────────
function renderPetBag() {
  const grid = document.getElementById('petbag-grid');
  if (state.equips.length === 0) {
    grid.innerHTML = '<div class="empty-hint">還沒有任何裝備</div>';
    return;
  }
  grid.innerHTML = '';
  state.equips.forEach(id => {
    const def  = EQUIP_DEFS[id] ?? { icon: '📦', name: id };
    const cell = document.createElement('div');
    cell.className = 'petbag-item';
    cell.innerHTML = `
      <span class="item-icon">${def.icon}</span>
      <span class="item-name">${def.name}</span>
      <span class="petbag-owned">已擁有</span>
    `;
    grid.appendChild(cell);
  });
}

// ─── Food System ─────────────────────────────────────────────────────────────
function buyFood(id) {
  const food = FOODS.find(f => f.id === id);
  if (!food) return;
  if (!spendCoins(food.price)) { showToast('能量石不足！'); return; }
  const inv = loadInventory();
  inv[id] = (inv[id] || 0) + 1;
  saveInventory(inv);
  showToast(`購買成功：${food.name} ×1`);
  renderFoodShop();
}

function useFood(id) {
  const food = FOODS.find(f => f.id === id);
  if (!food) return;
  const inv = loadInventory();
  if (!inv[id] || inv[id] <= 0) return;
  inv[id]--;
  if (inv[id] === 0) delete inv[id];
  saveInventory(inv);
  const e = food.effect;
  if (e.water)  state.water  = Math.min(100, state.water  + e.water);
  if (e.hunger) state.hunger = Math.min(100, state.hunger + e.hunger);
  if (e.mood)   state.mood   = Math.min(100, state.mood   + e.mood);
  saveState();
  if (e.exp) addExp(e.exp); else renderAll();
  showToast(`使用 ${food.name}！${food.desc}`);
  renderFoodBag();
}

function renderFoodShop() {
  const panel = document.getElementById('shop-food');
  if (!panel) return;
  const coins = state.coins;
  const rarities = ['F', 'R', 'SR', 'SSR'];
  let html = '';
  rarities.forEach(rarity => {
    const group = FOODS.filter(f => f.rarity === rarity);
    if (!group.length) return;
    html += `<div class="rarity-divider rarity-divider--${rarity.toLowerCase()}">${rarity}</div>
      <div class="drink-shop-grid">
        ${group.map(f => `
          <div class="drink-shop-card">
            <img src="${f.image}" class="drink-shop-img" onerror="this.style.opacity='0.15'">
            <div class="drink-shop-info">
              <span class="drink-shop-name">${f.name}</span>
              <span class="badge badge--${f.rarity.toLowerCase()}">${f.rarity}</span>
              <span class="drink-shop-desc">${f.desc}</span>
            </div>
            <button class="buy-btn${coins >= f.price ? '' : ' buy-btn--disabled'}"
              onclick="buyFood('${f.id}')" ${coins >= f.price ? '' : 'disabled'}>
              ${f.price} 💎
            </button>
          </div>`).join('')}
      </div>`;
  });
  panel.innerHTML = `<div class="card" style="display:flex;flex-direction:column;gap:10px">${html}</div>`;
}

function renderFoodBag() {
  const list = document.getElementById('foodbag-list');
  if (!list) return;
  const inv = loadInventory();
  const owned = Object.entries(inv).filter(([id, cnt]) => cnt > 0 && id.startsWith('food_'));
  if (!owned.length) {
    list.innerHTML = '<p class="empty-hint" style="padding:12px 0">食物背包是空的</p>';
    return;
  }
  list.innerHTML = owned.map(([id, cnt]) => {
    const f = FOODS.find(x => x.id === id);
    if (!f) return '';
    return `<div class="itembag-row">
      <img src="${f.image}" style="width:32px;height:32px;object-fit:contain;image-rendering:pixelated;flex-shrink:0" onerror="this.style.opacity='0.15'">
      <div class="itembag-info">
        <span class="itembag-name">${f.name}</span>
        <span class="itembag-desc">${f.desc}</span>
      </div>
      <span class="itembag-count">×${cnt}</span>
      <button class="use-btn" onclick="useFood('${id}')">使用</button>
    </div>`;
  }).join('');
}

// ─── Drink Inventory ─────────────────────────────────────────────────────────
function loadInventory() {
  try { const r = localStorage.getItem('inventory'); return r ? JSON.parse(r) : {}; } catch { return {}; }
}
function saveInventory(inv) {
  localStorage.setItem('inventory', JSON.stringify(inv));
}

function buyDrink(id) {
  const drink = DRINKS.find(d => d.id === id);
  if (!drink) return;
  if (!spendCoins(drink.price)) { showToast('能量石不足！'); return; }
  const inv = loadInventory();
  inv[id] = (inv[id] || 0) + 1;
  saveInventory(inv);
  showToast(`購買成功：${drink.name} ×1`);
  renderDrinkShop();
}

function useDrink(id) {
  const drink = DRINKS.find(d => d.id === id);
  if (!drink) return;
  const inv = loadInventory();
  if (!inv[id] || inv[id] <= 0) return;
  inv[id]--;
  if (inv[id] === 0) delete inv[id];
  saveInventory(inv);
  const e = drink.effect;
  if (e.water)  state.water  = Math.min(100, state.water  + e.water);
  if (e.hunger) state.hunger = Math.min(100, state.hunger + e.hunger);
  if (e.mood)   state.mood   = Math.min(100, state.mood   + e.mood);
  saveState();
  if (e.exp) addExp(e.exp); else renderAll();
  showToast(`使用 ${drink.name}！${drink.desc}`);
  renderDrinkBag();
}

function renderDrinkShop() {
  const panel = document.getElementById('shop-drink');
  if (!panel) return;
  const coins = state.coins;
  const rarities = ['F', 'R', 'SR', 'SSR'];
  let html = '';
  rarities.forEach(rarity => {
    const group = DRINKS.filter(d => d.rarity === rarity);
    if (!group.length) return;
    const price = group[0].price;
    const canBuy = coins >= price;
    html += `<div class="rarity-divider rarity-divider--${rarity.toLowerCase()}">${rarity}</div>
      <div class="drink-shop-grid">
        ${group.map(d => `
          <div class="drink-shop-card">
            <img src="${d.image}" class="drink-shop-img" onerror="this.style.opacity='0.15'">
            <div class="drink-shop-info">
              <span class="drink-shop-name">${d.name}</span>
              <span class="badge badge--${d.rarity.toLowerCase()}">${d.rarity}</span>
              <span class="drink-shop-desc">${d.desc}</span>
            </div>
            <button class="buy-btn${coins >= d.price ? '' : ' buy-btn--disabled'}"
              onclick="buyDrink('${d.id}')" ${coins >= d.price ? '' : 'disabled'}>
              ${d.price} 💎
            </button>
          </div>`).join('')}
      </div>`;
  });
  panel.innerHTML = `<div class="card" style="display:flex;flex-direction:column;gap:10px">${html}</div>`;
}

function renderDrinkBag() {
  const list = document.getElementById('drinkbag-list');
  if (!list) return;
  const inv = loadInventory();
  const owned = Object.entries(inv).filter(([, cnt]) => cnt > 0);
  if (!owned.length) {
    list.innerHTML = '<p class="empty-hint" style="padding:12px 0">飲料背包是空的</p>';
    return;
  }
  list.innerHTML = owned.map(([id, cnt]) => {
    const d = DRINKS.find(x => x.id === id);
    if (!d) return '';
    return `<div class="itembag-row">
      <img src="${d.image}" style="width:32px;height:32px;object-fit:contain;image-rendering:pixelated;flex-shrink:0" onerror="this.style.opacity='0.15'">
      <div class="itembag-info">
        <span class="itembag-name">${d.name}</span>
        <span class="itembag-desc">${d.desc}</span>
      </div>
      <span class="itembag-count">×${cnt}</span>
      <button class="use-btn" onclick="useDrink('${id}')">使用</button>
    </div>`;
  }).join('');
}

// ─── Decay ───────────────────────────────────────────────────────────────────
function decayStats() {
  state.hunger = Math.max(0, state.hunger - 2);
  state.water  = Math.max(0, state.water  - 3);
  const moodPenalty = (state.hunger < 20 ? 2 : 0) + (state.water < 20 ? 2 : 0) + 1;
  state.mood   = Math.max(0, state.mood - moodPenalty);
  saveState();
  renderStats();
}

// ─── Shop Cards ───────────────────────────────────────────────────────────────
const SHOP_TITLES = {
  bank:  '能量銀行',
  food:  '食物商店',
  drink: '飲料商店',
  item:  '道具商店',
  gacha: '寵物抽獎',
};

// ─── Gacha Panel ─────────────────────────────────────────────────────────────
let gachaInterval = null;

function getRandomPets(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(PETS[Math.floor(Math.random() * PETS.length)]);
  }
  return result;
}

function petCellsHTML(pets) {
  return pets.map(p => `
    <div style="background:#f0f0f0;border-radius:12px;aspect-ratio:1;display:flex;align-items:center;justify-content:center;overflow:hidden">
      <img src="${p.image}" style="width:80%;height:80%;object-fit:contain;image-rendering:pixelated" onerror="this.parentElement.innerHTML='?'">
    </div>`).join('');
}

function buildGachaPanel() {
  const panel = document.getElementById('shop-gacha');
  if (!panel) return;
  panel.innerHTML = `
    <p style="font-size:14px;color:#888;text-align:center;margin-bottom:4px">常駐寵物卡池</p>
    <div style="display:inline-flex;background:#e8e8e8;border-radius:20px;padding:5px 14px;font-size:13px;font-weight:600;margin-bottom:8px;cursor:pointer">常駐卡池 ▼</div>
    <div id="gacha-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:16px;transition:opacity 0.3s">
      ${petCellsHTML(getRandomPets(16))}
    </div>
    <div style="display:flex;gap:10px;position:sticky;bottom:0;background:#f5f0eb;padding:10px 0 4px;margin-top:12px">
      <button onclick="doGacha(1)" style="flex:1;padding:14px 8px;border-radius:30px;background:#f0ebe4;border:1px solid #ddd5c8;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px">
        <span style="font-size:15px;font-weight:700">單次抽獎</span>
        <span style="font-size:12px;color:#6b5a47">100 💎</span>
      </button>
      <button onclick="doGacha(10)" style="flex:1;padding:14px 8px;border-radius:30px;background:#f0ebe4;border:1px solid #ddd5c8;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px">
        <span style="font-size:15px;font-weight:700">十次抽獎</span>
        <span style="font-size:12px;color:#6b5a47">900 💎</span>
      </button>
    </div>`;
}

function doGacha(count) {
  const cost = count === 1 ? GACHA_COST_SINGLE : GACHA_COST_TEN;
  if (!spendCoins(cost)) { showToast('能量石不足！'); return; }
  showGachaResult(doGachaRolls(count));
}

const showShopMain = () => {
  clearInterval(gachaInterval);
  gachaInterval = null;
  document.getElementById('shop-main').style.display = 'flex';
  document.getElementById('shop-sub').style.display = 'none';
  document.querySelectorAll('.shop-panel').forEach(p => p.classList.remove('active'));
};

const showShopSub = (type) => {
  const main = document.getElementById('shop-main');
  const sub  = document.getElementById('shop-sub');
  if (!main || !sub) return;
  clearInterval(gachaInterval);
  gachaInterval = null;
  main.style.display = 'none';
  sub.style.display = 'flex';
  document.getElementById('shop-subpage-title').textContent = SHOP_TITLES[type] || '';
  document.querySelectorAll('.shop-panel').forEach(p => {
    p.classList.toggle('active', p.id === `shop-${type}`);
  });
  if (type === 'food') {
    renderFoodShop();
  } else if (type === 'drink') {
    renderDrinkShop();
  } else if (type === 'gacha') {
    buildGachaPanel();
    if (gachaInterval) clearInterval(gachaInterval);
    gachaInterval = setInterval(() => {
      const grid = document.getElementById('gacha-grid');
      if (!grid) { clearInterval(gachaInterval); return; }
      grid.style.opacity = '0';
      setTimeout(() => {
        grid.innerHTML = petCellsHTML(getRandomPets(16));
        grid.style.opacity = '1';
      }, 300);
    }, 2000);
  }
};

function initShopCards() {
  const btns = document.querySelectorAll('.shop-card__btn');
  console.log('[Shop] initShopCards — found', btns.length, 'buttons');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.closest('.shop-card')?.dataset.shop;
      console.log('[Shop] card btn clicked, type =', type);
      showShopSub(type);
    });
  });
  document.getElementById('btn-shop-back').addEventListener('click', showShopMain);
}

// ─── Tab System ──────────────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('active', p.id === `tab-${target}`);
      });
    });
  });
}

// ─── Modal System ─────────────────────────────────────────────────────────────
function openModal(id)  { document.getElementById(id)?.classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }

function initModals() {
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.modal));
  });
  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); });
  });
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function initBottomNav() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const nav = btn.dataset.nav;
      if (nav === 'shop') {
        document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'shop'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-shop'));
      } else if (nav === 'home') {
        document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'pet'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-pet'));
      } else if (nav === 'explore') {
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-explore'));
      }
    });
  });
}

// ─── Shop / Buy ───────────────────────────────────────────────────────────────
function initShop() {
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cost = parseInt(btn.dataset.cost, 10);
      const type = btn.dataset.type;
      const id   = btn.dataset.id;
      if (!spendCoins(cost)) { showToast('能量石不足！'); return; }
      if (type === 'food') {
        const hungerG = FEED_HUNGER[id] ?? 20;
        const expG    = FEED_EXP[id]    ?? 5;
        state.hunger  = Math.min(100, state.hunger + hungerG);
        state.mood    = Math.min(100, state.mood + 5);
        saveState();
        addExp(expG);
        showToast(`餵食成功！+${expG} EXP`);
      } else if (type === 'drink') {
        const waterG = DRINK_WATER[id] ?? 25;
        const moodG  = DRINK_MOOD[id]  ?? 0;
        const expG   = DRINK_EXP[id]   ?? 3;
        state.water  = Math.min(100, state.water + waterG);
        if (moodG > 0) state.mood = Math.min(100, state.mood + moodG);
        saveState();
        addExp(expG);
        showToast(`補水成功！+${waterG} 💧 +${expG} EXP`);
      } else if (type === 'item') {
        state.items[id] = (state.items[id] ?? 0) + 1;
        saveState();
        showToast(`購買成功：${ITEM_DEFS[id]?.name ?? id} ×1`);
      } else {
        if (!state.equips.includes(id)) state.equips.push(id);
        saveState();
        showToast(`購買成功：${EQUIP_DEFS[id]?.name ?? id}`);
        renderPetBag();
      }
    });
  });
}

// ─── Action Buttons ──────────────────────────────────────────────────────────
function initActions() {
  document.getElementById('btn-feed').addEventListener('click', () => feedPet('fish'));

  document.getElementById('btn-drink').addEventListener('click', () => openModal('modal-drink'));

  document.querySelectorAll('.drink-option').forEach(btn => {
    btn.addEventListener('click', () => giveDrink(btn.dataset.id));
  });

  document.getElementById('btn-itembag').addEventListener('click', () => {
    renderItemBag();
    openModal('modal-itembag');
  });

  document.getElementById('btn-petbag').addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'bag'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-bag'));
    renderPetBag();
    renderFoodBag();
    renderDrinkBag();
  });

  document.getElementById('btn-change-pet').addEventListener('click', () => showSelectScreen());

  document.getElementById('btn-pet-detail').addEventListener('click', () => showPetDetail());
  document.getElementById('btn-detail-back').addEventListener('click', () => hidePetDetail());
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
function init() {
  if (!selectedPetId) {
    selectedPetId = 'pet1';
    localStorage.setItem('selectedPetId', selectedPetId);
    state = loadState();
  }
  renderAll();
  initTabs();
  initModals();
  initBottomNav();
  initActions();
  initShop();
  initShopCards();
  initGacha();
  setInterval(decayStats, DECAY_INTERVAL);
}

document.addEventListener('DOMContentLoaded', init);
