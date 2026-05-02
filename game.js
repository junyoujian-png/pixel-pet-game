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
  { id: 'pet1',  name: '小狗',       rarity: 'F',  image: 'assets/pets/小狗' },
  { id: 'pet2',  name: '柴犬',       rarity: 'F',  image: 'assets/pets/柴犬' },
  { id: 'pet3',  name: '臘腸狗',     rarity: 'F',  image: 'assets/pets/臘腸狗' },
  { id: 'pet4',  name: '柯基',       rarity: 'F',  image: 'assets/pets/柯基' },
  { id: 'pet5',  name: '比格犬',     rarity: 'R',  image: 'assets/pets/比格犬' },
  { id: 'pet6',  name: '米克斯',     rarity: 'R',  image: 'assets/pets/米克斯' },
  { id: 'pet7',  name: '貴賓狗',     rarity: 'R',  image: 'assets/pets/臘腸狗' },
  { id: 'pet8',  name: '比熊',       rarity: 'R',  image: 'assets/pets/比熊' },
  { id: 'pet9',  name: '德牧',       rarity: 'SR', image: 'assets/pets/德牧' },
  { id: 'pet10', name: '邊牧',       rarity: 'SR', image: 'assets/pets/邊牧' },
  { id: 'pet11', name: '伯恩山',     rarity: 'SR', image: 'assets/pets/伯恩山' },
  { id: 'pet12', name: '牧羊犬',     rarity: 'SR', image: 'assets/pets/牧羊犬' },
  { id: 'pet13', name: '橘貓',       rarity: 'F',  image: 'assets/pets/橘貓' },
  { id: 'pet14', name: '灰貓',       rarity: 'F',  image: 'assets/pets/灰貓' },
  { id: 'pet15', name: '白貓',       rarity: 'F',  image: 'assets/pets/白貓' },
  { id: 'pet16', name: '黑貓',       rarity: 'F',  image: 'assets/pets/黑貓' },
  { id: 'pet17', name: '英國短毛貓', rarity: 'R',  image: 'assets/pets/英國短毛貓' },
  { id: 'pet18', name: '牛奶貓',     rarity: 'R',  image: 'assets/pets/牛奶貓' },
  { id: 'pet19', name: '布偶貓',     rarity: 'R',  image: 'assets/pets/布偶貓' },
  { id: 'pet20', name: '三花貓',     rarity: 'SR', image: 'assets/pets/三花貓' },
  { id: 'pet21', name: '波斯貓',     rarity: 'SR', image: 'assets/pets/波斯貓' },
  { id: 'pet22', name: '緬因貓',     rarity: 'SR', image: 'assets/pets/緬因貓' },
  { id: 'pet23', name: '狐狸',       rarity: 'R',  image: 'assets/pets/狐狸' },
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

// ─── Pet Selection ────────────────────────────────────────────────────────────
function renderSelectScreen() {
  const grid = document.getElementById('select-grid');
  grid.innerHTML = '';
  PETS.forEach(pet => {
    const card = document.createElement('button');
    card.className = 'select-card';
    if (pet.id === selectedPetId) card.classList.add('select-card--active');
    card.innerHTML = `
      <div class="select-card__img-wrap">
        <img src="${pet.image}" alt="${pet.name}" class="pixel-art select-card__img" />
      </div>
      <span class="select-card__name">${pet.name}</span>
      <span class="badge badge--${pet.rarity.toLowerCase()}">${pet.rarity}</span>
    `;
    card.addEventListener('click', () => selectPet(pet.id));
    grid.appendChild(card);
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
        document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'food'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-food'));
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
    showSelectScreen();
  } else {
    renderAll();
  }
  initTabs();
  initModals();
  initBottomNav();
  initActions();
  initShop();
  setInterval(decayStats, DECAY_INTERVAL);
}

document.addEventListener('DOMContentLoaded', init);
