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
  { id: 'pet1',  name: '小狗',       rarity: 'F',  image: 'assets/pets/小狗.png' },
  { id: 'pet2',  name: '柴犬',       rarity: 'F',  image: 'assets/pets/柴犬.png' },
  { id: 'pet3',  name: '臘腸狗',     rarity: 'F',  image: 'assets/pets/臘腸狗.png' },
  { id: 'pet4',  name: '柯基',       rarity: 'F',  image: 'assets/pets/柯基.png' },
  { id: 'pet5',  name: '比格犬',     rarity: 'R',  image: 'assets/pets/比格犬.png' },
  { id: 'pet6',  name: '米克斯',     rarity: 'R',  image: 'assets/pets/米克斯.png' },
  { id: 'pet7',  name: '貴賓狗',     rarity: 'R',  image: 'assets/pets/貴賓狗.png' },
  { id: 'pet8',  name: '比熊',       rarity: 'R',  image: 'assets/pets/比熊.png' },
  { id: 'pet9',  name: '德牧',       rarity: 'SR', image: 'assets/pets/德牧.png' },
  { id: 'pet10', name: '邊牧',       rarity: 'SR', image: 'assets/pets/邊牧.png' },
  { id: 'pet11', name: '伯恩山',     rarity: 'SR', image: 'assets/pets/伯恩山.png' },
  { id: 'pet12', name: '牧羊犬',     rarity: 'SR', image: 'assets/pets/牧羊犬.png' },
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

const ITEM_DEFS = {
  potion:  { icon: '🧪', name: '回復藥',  desc: '+30飽食 +30水份 +20心情' },
  candy:   { icon: '🍬', name: '愛心糖',  desc: '+40心情' },
  xpboost: { icon: '⭐', name: '成長藥',  desc: '+50 EXP' },
};

const EQUIP_DEFS = {
  hat:   { icon: '🎩', name: '紳士帽' },
  scarf: { icon: '🧣', name: '圍巾' },
};

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
    if (!spendCoins(GACHA_COST_SINGLE)) { showToast('金幣不足！'); return; }
    const machine = document.getElementById('gacha-machine');
    machine?.classList.add('gacha-spin');
    setTimeout(() => {
      machine?.classList.remove('gacha-spin');
      showGachaResult(doGachaRolls(1));
    }, 1200);
  });
  document.getElementById('btn-gacha-ten')?.addEventListener('click', () => {
    if (!spendCoins(GACHA_COST_TEN)) { showToast('金幣不足！'); return; }
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

  if (!spendCoins(cost)) { showToast('金幣不足！'); return; }

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

  if (!spendCoins(cost)) { showToast('金幣不足！'); return; }

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
  gacha: '扭蛋機',
};

const showShopMain = () => {
  console.log('[Shop] showShopMain called');
  document.getElementById('shop-main').style.display = 'flex';
  document.getElementById('shop-sub').style.display = 'none';
  document.querySelectorAll('.shop-panel').forEach(p => p.classList.remove('active'));
};

const showShopSub = (type) => {
  console.log('[Shop] showShopSub called, type =', type);
  const main = document.getElementById('shop-main');
  const sub  = document.getElementById('shop-sub');
  console.log('[Shop] main el:', main, '| sub el:', sub);
  if (!main || !sub) { console.error('[Shop] missing element!'); return; }
  main.style.display = 'none';
  sub.style.display = 'flex';
  document.getElementById('shop-subpage-title').textContent = SHOP_TITLES[type] || '';
  document.querySelectorAll('.shop-panel').forEach(p => {
    p.classList.toggle('active', p.id === `shop-${type}`);
  });
  console.log('[Shop] active panel: shop-' + type);
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
      if (!spendCoins(cost)) { showToast('金幣不足！'); return; }
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
  });

  document.getElementById('btn-change-pet').addEventListener('click', () => showSelectScreen());
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
