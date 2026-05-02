'use strict';

// ─── Constants ───────────────────────────────────────────────────────────────
const EXP_PER_LEVEL   = 100;
const FEED_COSTS      = { fish: 10, meat: 25, cake: 50 };
const FEED_HUNGER     = { fish: 20, meat: 35, cake: 50 };
const FEED_EXP        = { fish: 5,  meat: 10, cake: 20 };
const DRINK_COSTS     = { water: 5, juice: 15, milk: 30 };
const DRINK_WATER     = { water: 25, juice: 40, milk: 60 };
const DRINK_MOOD      = { water: 0,  juice: 3,  milk: 5  };
const DRINK_EXP       = { water: 3,  juice: 8,  milk: 15 };
const DECAY_INTERVAL  = 60_000; // 1 min

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
const DEFAULT_STATE = {
  name:   '小狐',
  level:  1,
  exp:    0,
  coins:  50,
  hunger: 60,
  mood:   80,
  water:  70,
  items:  {},
  equips: [],
};

let state = loadState();

// ─── Persistence ─────────────────────────────────────────────────────────────
function loadState() {
  try {
    const raw = localStorage.getItem('pixelPet');
    return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : { ...DEFAULT_STATE };
  } catch { return { ...DEFAULT_STATE }; }
}

function saveState() {
  localStorage.setItem('pixelPet', JSON.stringify(state));
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
  document.getElementById('pet-name').textContent  = state.name;
  document.getElementById('pet-level').textContent = state.level;

  const pct = Math.floor((state.exp / EXP_PER_LEVEL) * 100);
  document.getElementById('exp-fill').style.width   = `${pct}%`;
  document.getElementById('exp-text').textContent   = `${state.exp} / ${EXP_PER_LEVEL}`;
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
    saveState();
    renderStats();
    showToast('使用回復藥！+30飽食 +30水份 +20心情');
  } else if (id === 'candy') {
    state.mood = Math.min(100, state.mood + 40);
    saveState();
    renderStats();
    showToast('使用愛心糖！+40心情 😄');
  } else if (id === 'xpboost') {
    saveState();
    addExp(50);
    showToast('使用成長藥！+50 EXP ⭐');
  }
  renderItemBag();
}

function renderItemBag() {
  const list = document.getElementById('itembag-list');
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
    const def = EQUIP_DEFS[id] ?? { icon: '📦', name: id };
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

// ─── Info Modal ───────────────────────────────────────────────────────────────
function renderInfoModal() {
  document.getElementById('info-content').innerHTML = `
    <div class="info-row"><span>名稱</span><span>${state.name}</span></div>
    <div class="info-row"><span>等級</span><span>Lv.${state.level}</span></div>
    <div class="info-row"><span>EXP</span><span>${state.exp} / ${EXP_PER_LEVEL}</span></div>
    <div class="info-row"><span>金幣</span><span>${state.coins} 🪙</span></div>
    <div class="info-row"><span>心情</span><span>${Math.round(state.mood)} / 100</span></div>
    <div class="info-row"><span>飽食度</span><span>${Math.round(state.hunger)} / 100</span></div>
    <div class="info-row"><span>水份</span><span>${Math.round(state.water)} / 100</span></div>
  `;
}

// ─── Decay (passive stat decrease) ───────────────────────────────────────────
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
function openModal(id) {
  document.getElementById(id)?.classList.remove('hidden');
}
function closeModal(id) {
  document.getElementById(id)?.classList.add('hidden');
}

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
        const def = ITEM_DEFS[id];
        showToast(`購買成功：${def?.name ?? id} ×1`);
      } else {
        if (!state.equips.includes(id)) state.equips.push(id);
        saveState();
        const def = EQUIP_DEFS[id];
        showToast(`購買成功：${def?.name ?? id}`);
        renderPetBag();
      }
    });
  });
}

// ─── Action Buttons ──────────────────────────────────────────────────────────
function initActions() {
  document.getElementById('btn-feed').addEventListener('click', () => {
    feedPet('fish');
  });

  document.getElementById('btn-drink').addEventListener('click', () => {
    openModal('modal-drink');
  });

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

  document.getElementById('btn-info').addEventListener('click', () => {
    renderInfoModal();
    openModal('modal-info');
  });

  document.getElementById('btn-boost').addEventListener('click', () => {
    if (!spendCoins(20)) { showToast('金幣不足！'); return; }
    addExp(30);
    document.querySelector('#btn-boost .red-dot')?.remove();
    showToast('加速成功！+30 EXP');
  });

  document.getElementById('btn-shop-small').addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'food'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-food'));
  });

  document.getElementById('btn-more').addEventListener('click', () => {
    showToast('更多功能即將開放！');
  });

}

// ─── Boot ─────────────────────────────────────────────────────────────────────
function init() {
  renderAll();
  initTabs();
  initModals();
  initBottomNav();
  initActions();
  initShop();
  setInterval(decayStats, DECAY_INTERVAL);
}

document.addEventListener('DOMContentLoaded', init);
