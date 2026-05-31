'use strict';

// ─── Constants ───────────────────────────────────────────────────────────────
const EXP_PER_LEVEL  = 100;
const DECAY_INTERVAL = 60_000;

const PETS = [
  { id: 'pet1',  name: '小狗',   rarity: 'F',  image: 'assets/pets/小狗.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet2',  name: '柴犬',   rarity: 'F',  image: 'assets/pets/柴犬.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet3',  name: '臘腸狗', rarity: 'F',  image: 'assets/pets/臘腸狗.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet4',  name: '柯基',   rarity: 'F',  image: 'assets/pets/柯基.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet5',  name: '比格犬', rarity: 'R',  image: 'assets/pets/比格犬.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 10 }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 1.5, icon: '🦷', maxPP:  5 }] },
  { id: 'pet6',  name: '米克斯', rarity: 'R',  image: 'assets/pets/米克斯.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 10 }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 1.5, icon: '🦷', maxPP:  5 }] },
  { id: 'pet7',  name: '貴賓狗', rarity: 'R',  image: 'assets/pets/貴賓狗.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 10 }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 1.5, icon: '🦷', maxPP:  5 }] },
  { id: 'pet8',  name: '比熊',   rarity: 'R',  image: 'assets/pets/比熊.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 10 }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 1.5, icon: '🦷', maxPP:  5 }] },
  { id: 'pet9',  name: '德牧',   rarity: 'SR', image: 'assets/pets/德牧.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 15 }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 10 }, { name: '強咬', desc: '以獵犬本能發動致命一咬', effect: 'atk', power: 2.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet10', name: '邊牧',   rarity: 'SR', image: 'assets/pets/邊牧.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 15 }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 10 }, { name: '強咬', desc: '以獵犬本能發動致命一咬', effect: 'atk', power: 2.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet11', name: '伯恩山', rarity: 'SR', image: 'assets/pets/伯恩山.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 15 }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 10 }, { name: '強咬', desc: '以獵犬本能發動致命一咬', effect: 'atk', power: 2.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet12', name: '牧羊犬', rarity: 'SR', image: 'assets/pets/牧羊犬.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 15 }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 10 }, { name: '強咬', desc: '以獵犬本能發動致命一咬', effect: 'atk', power: 2.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet13', name: '橘貓',       rarity: 'F',  image: 'assets/pets/橘貓.png',       skills: [{ name: '抓', desc: '伸出利爪抓向敵人', effect: 'atk', power: 1.0, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet14', name: '灰貓',       rarity: 'F',  image: 'assets/pets/灰貓.png',       skills: [{ name: '抓', desc: '伸出利爪抓向敵人', effect: 'atk', power: 1.0, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet15', name: '白貓',       rarity: 'F',  image: 'assets/pets/白貓.png',       skills: [{ name: '抓', desc: '伸出利爪抓向敵人', effect: 'atk', power: 1.0, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet16', name: '黑貓',       rarity: 'F',  image: 'assets/pets/黑貓.png',       skills: [{ name: '抓', desc: '伸出利爪抓向敵人', effect: 'atk', power: 1.0, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet17', name: '英國短毛貓', rarity: 'R',  image: 'assets/pets/英國短毛貓.png', skills: [{ name: '抓', desc: '伸出利爪抓向敵人', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '亂抓', desc: '瘋狂揮舞爪子攻擊', effect: 'atk', power: 1.5, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet18', name: '牛奶貓',     rarity: 'R',  image: 'assets/pets/牛奶貓.png',     skills: [{ name: '抓', desc: '伸出利爪抓向敵人', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '亂抓', desc: '瘋狂揮舞爪子攻擊', effect: 'atk', power: 1.5, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet19', name: '布偶貓',     rarity: 'R',  image: 'assets/pets/布偶貓.png',     skills: [{ name: '抓', desc: '伸出利爪抓向敵人', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '亂抓', desc: '瘋狂揮舞爪子攻擊', effect: 'atk', power: 1.5, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet20', name: '三花貓',     rarity: 'SR', image: 'assets/pets/三花貓.png',     skills: [{ name: '抓', desc: '伸出利爪快速抓向敵人', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 15, currentPP: 15 }, { name: '亂抓', desc: '瘋狂揮舞爪子攻擊', effect: 'atk', power: 1.5, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '快速亂抓', desc: '瘋狂揮舞爪子快速攻擊', effect: 'atk', power: 2.0, icon: '🌑', maxPP:  5, currentPP:  5 }] },
  { id: 'pet21', name: '波斯貓',     rarity: 'SR', image: 'assets/pets/波斯貓.png',     skills: [{ name: '抓', desc: '伸出利爪快速抓向敵人', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 15, currentPP: 15 }, { name: '亂抓', desc: '瘋狂揮舞爪子攻擊', effect: 'atk', power: 1.5, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '快速亂抓', desc: '瘋狂揮舞爪子快速攻擊', effect: 'atk', power: 2.0, icon: '🌑', maxPP:  5, currentPP:  5 }] },
  { id: 'pet22', name: '緬因貓',     rarity: 'SR', image: 'assets/pets/緬因貓.png',     skills: [{ name: '抓', desc: '伸出利爪快速抓向敵人', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 15, currentPP: 15 }, { name: '亂抓', desc: '瘋狂揮舞爪子攻擊', effect: 'atk', power: 1.5, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '快速亂抓', desc: '瘋狂揮舞爪子快速攻擊', effect: 'atk', power: 2.0, icon: '🌑', maxPP:  5, currentPP:  5 }] },
  { id: 'pet23', name: '狐狸',       rarity: 'R',  image: 'assets/pets/狐狸.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 10, currentPP: 10 }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 5, currentPP: 5 }] },
  { id: 'pet24', name: '小豬',         rarity: 'F',  image: 'assets/pets/小豬.png',         skills: [{ name: '撞', desc: '低頭用身體衝撞敵人', effect: 'atk', power: 1.0, icon: '💨', maxPP:  5, currentPP:  5 }] },
  { id: 'pet25', name: '麝香豬',       rarity: 'R',  image: 'assets/pets/麝香豬.png',       skills: [{ name: '撞', desc: '低頭用身體撞敵人', effect: 'atk', power: 1.0, icon: '💨', maxPP: 10, currentPP: 10 }, { name: '衝撞', desc: '低頭用身體全力衝撞敵人', effect: 'atk', power: 1.5, icon: '💥', maxPP: 5, currentPP: 5 }] },
  { id: 'pet26', name: '灰兔',   rarity: 'F',  image: 'assets/pets/灰兔.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5, currentPP:  5 }] },
  { id: 'pet27', name: '黑兔',   rarity: 'F',  image: 'assets/pets/黑兔.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5, currentPP:  5 }] },
  { id: 'pet28', name: '白兔',   rarity: 'F',  image: 'assets/pets/白兔.png',   skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5, currentPP:  5 }] },
  { id: 'pet29', name: '道奇兔', rarity: 'R',  image: 'assets/pets/道奇兔.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 10, currentPP: 10 }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 5, currentPP: 5 }] },
  { id: 'pet30', name: '庫你迷你豬',   rarity: 'R',  image: 'assets/pets/庫你迷你豬.png',   skills: [{ name: '撞', desc: '低頭用身體撞敵人', effect: 'atk', power: 1.0, icon: '💨', maxPP: 10, currentPP: 10 }, { name: '衝撞', desc: '低頭用身體全力衝撞敵人', effect: 'atk', power: 1.5, icon: '💥', maxPP: 5, currentPP: 5 }] },
  { id: 'pet31', name: '迷你豬',       rarity: 'SR', image: 'assets/pets/迷你豬.png',       skills: [{ name: '撞', desc: '低頭用身體衝撞敵人', effect: 'atk', power: 1.0, icon: '💨', maxPP: 15, currentPP: 15 }, { name: '衝撞', desc: '低頭用身體全力衝撞敵人', effect: 'atk', power: 1.5, icon: '💥', maxPP: 10, currentPP: 10 }, { name: '猛力頭槌', desc: '蓄力後以頭部猛烈撞擊', effect: 'atk', power: 2.0, icon: '🌪️', maxPP: 5, currentPP: 5 }] },
  { id: 'pet32', name: '長耳兔', rarity: 'SR', image: 'assets/pets/長耳兔.png', skills: [{ name: '咬', desc: '用尖牙狠狠咬住敵人', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '撕咬', desc: '憤怒地咬住敵人不放', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 10, currentPP: 10 }, { name: '強咬', desc: '以獵犬本能發動致命一咬', effect: 'atk', power: 2.0, icon: '🦷', maxPP: 5, currentPP: 5 }] },
  { id: 'pet33', name: '海福特牛',     rarity: 'SR', image: 'assets/pets/海福特牛.png',     skills: [{ name: '撞', desc: '低頭用身體衝撞敵人', effect: 'atk', power: 1.0, icon: '💨', maxPP: 15, currentPP: 15 }, { name: '衝撞', desc: '低頭用身體全力衝撞敵人', effect: 'atk', power: 1.5, icon: '💥', maxPP: 10, currentPP: 10 }, { name: '猛力頭槌', desc: '蓄力後以頭部猛烈撞擊', effect: 'atk', power: 2.0, icon: '🌪️', maxPP: 5, currentPP: 5 }] },
  { id: 'pet34', name: '牡丹鸚鵡',     rarity: 'F',  image: 'assets/pets/牡丹鸚鵡.png',     skills: [{ name: '啄擊', desc: '用尖嘴啄向敵人', effect: 'atk', power: 1.0, icon: '🐦', maxPP:  5, currentPP:  5 }] },
  { id: 'pet35', name: '折衷鸚鵡',     rarity: 'F',  image: 'assets/pets/折衷鸚鵡.png',     skills: [{ name: '啄擊', desc: '用尖嘴啄向敵人', effect: 'atk', power: 1.0, icon: '🐦', maxPP:  5, currentPP:  5 }] },
  { id: 'pet36', name: '虎皮鸚鵡',     rarity: 'R',  image: 'assets/pets/虎皮鸚鵡.png',     skills: [{ name: '啄擊', desc: '用尖嘴啄向敵人', effect: 'atk', power: 1.0, icon: '🐦', maxPP: 10, currentPP: 10 }, { name: '快速啄擊', desc: '快速啄擊敵人', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 5, currentPP: 5 }] },
  { id: 'pet37', name: '玄風鸚鵡',     rarity: 'R',  image: 'assets/pets/玄風鸚鵡.png',     skills: [{ name: '啄擊', desc: '用尖嘴啄向敵人', effect: 'atk', power: 1.0, icon: '🐦', maxPP: 10, currentPP: 10 }, { name: '快速啄擊', desc: '快速啄擊敵人', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 5, currentPP: 5 }] },
  { id: 'pet38', name: '非洲灰鸚鵡',   rarity: 'SR', image: 'assets/pets/非洲灰鸚鵡.png',   skills: [{ name: '啄擊', desc: '用尖嘴啄向敵人', effect: 'atk', power: 1.0, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '快速啄擊', desc: '快速啄擊敵人', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 10, currentPP: 10 }, { name: '連續猛啄', desc: '連續啄擊敵人多次', effect: 'atk', power: 2.0, icon: '🦅', maxPP: 5, currentPP: 5 }] },
  { id: 'pet39', name: '鳳頭巴丹鸚鵡', rarity: 'SR', image: 'assets/pets/鳳頭巴丹鸚鵡.png', skills: [{ name: '啄擊', desc: '用尖嘴啄向敵人', effect: 'atk', power: 1.0, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '快速啄擊', desc: '快速啄擊敵人', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 10, currentPP: 10 }, { name: '連續猛啄', desc: '連續啄擊敵人多次', effect: 'atk', power: 2.0, icon: '🦅', maxPP: 5, currentPP: 5 }] },
  { id: 'pet40', name: '雞',           rarity: 'R',  image: 'assets/pets/雞.png',           skills: [{ name: '啄擊', desc: '用尖嘴啄向敵人', effect: 'atk', power: 1.0, icon: '🐔', maxPP: 10, currentPP: 10 }, { name: '快速啄擊', desc: '快速啄擊敵人', effect: 'atk', power: 1.5, icon: '🐔', maxPP: 5, currentPP: 5 }] },
  { id: 'pet41', name: '小鴨',         rarity: 'R',  image: 'assets/pets/小鴨.png',         skills: [{ name: '啄擊', desc: '用尖嘴啄向敵人', effect: 'atk', power: 1.0, icon: '🦆', maxPP: 10, currentPP: 10 }, { name: '快速啄擊', desc: '快速啄擊敵人', effect: 'atk', power: 1.5, icon: '🦆', maxPP: 5, currentPP: 5 }] },
  { id: 'pet42', name: '水豚',         rarity: 'SR', image: 'assets/pets/水豚.png',         skills: [{ name: '撞', desc: '低頭用身體衝撞敵人', effect: 'atk', power: 1.0, icon: '💨', maxPP: 15, currentPP: 15 }, { name: '衝撞', desc: '低頭用身體全力衝撞敵人', effect: 'atk', power: 1.5, icon: '💥', maxPP: 10, currentPP: 10 }, { name: '猛力頭槌', desc: '蓄力後以頭部猛烈撞擊', effect: 'atk', power: 2.0, icon: '🌪️', maxPP: 5, currentPP: 5 }] },
  { id: 'pet43', name: '樹麻雀',       rarity: 'R',  image: 'assets/pets/樹麻雀.png',       skills: [{ name: '啄擊', desc: '用尖嘴啄向敵人', effect: 'atk', power: 1.0, icon: '🐦', maxPP: 10, currentPP: 10 }, { name: '快速啄擊', desc: '快速啄擊敵人', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 5, currentPP: 5 }] },
  { id: 'pet44', name: '紅頭山雀',     rarity: 'SR', image: 'assets/pets/紅頭山雀.png',     skills: [{ name: '啄擊', desc: '用尖嘴啄向敵人', effect: 'atk', power: 1.0, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '快速啄擊', desc: '快速啄擊敵人', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 10, currentPP: 10 }, { name: '連續猛啄', desc: '連續啄擊敵人多次', effect: 'atk', power: 2.0, icon: '🦅', maxPP: 5, currentPP: 5 }] },
  { id: 'pet45', name: '黃牛',         rarity: 'F',  image: 'assets/pets/黃牛.png',         skills: [{ name: '撞', desc: '低頭用身體衝撞敵人', effect: 'atk', power: 1.0, icon: '💨', maxPP:  5, currentPP:  5 }] },
  { id: 'pet46', name: '荷斯坦牛',     rarity: 'R',  image: 'assets/pets/荷斯坦牛.png',     skills: [{ name: '撞', desc: '低頭用身體撞敵人', effect: 'atk', power: 1.0, icon: '💨', maxPP: 10, currentPP: 10 }, { name: '衝撞', desc: '低頭用身體全力衝撞敵人', effect: 'atk', power: 1.5, icon: '💥', maxPP: 5, currentPP: 5 }] },
  { id: 'pet47', name: '浣熊',         rarity: 'R',  image: 'assets/pets/浣熊.png',  skills: [{ name: '抓', desc: '伸出利爪抓向敵人', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '亂抓', desc: '瘋狂揮舞爪子攻擊', effect: 'atk', power: 1.5, icon: '🐾', maxPP: 5, currentPP: 5 }] },
  { id: 'pet48', name: '山羌',   rarity: 'R',  image: 'assets/pets/山羌.png',   skills: [{ name: '撞', desc: '低頭用身體撞敵人', effect: 'atk', power: 1.0, icon: '💨', maxPP: 10, currentPP: 10 }, { name: '衝撞', desc: '低頭用身體全力衝撞敵人', effect: 'atk', power: 1.5, icon: '💥', maxPP: 5, currentPP: 5 }] },
  { id: 'pet49', name: '梅花鹿', rarity: 'SR', image: 'assets/pets/梅花鹿.png', skills: [{ name: '撞', desc: '低頭用身體衝撞敵人', effect: 'atk', power: 1.0, icon: '💨', maxPP: 15, currentPP: 15 }, { name: '衝撞', desc: '低頭用身體全力衝撞敵人', effect: 'atk', power: 1.5, icon: '💥', maxPP: 10, currentPP: 10 }, { name: '猛力頭槌', desc: '蓄力後以頭部猛烈撞擊', effect: 'atk', power: 2.0, icon: '🌪️', maxPP: 5, currentPP: 5 }] },
  { id: 'pet50', name: '綿羊',         rarity: 'R',  image: 'assets/pets/綿羊.png',         skills: [{ name: '撞', desc: '低頭用身體撞敵人', effect: 'atk', power: 1.0, icon: '💨', maxPP: 10, currentPP: 10 }, { name: '衝撞', desc: '低頭用身體全力衝撞敵人', effect: 'atk', power: 1.5, icon: '💥', maxPP: 5, currentPP: 5 }] },
  { id: 'pet51', name: '紅浣熊',       rarity: 'SR', image: 'assets/pets/紅浣熊.png', skills: [{ name: '抓', desc: '伸出利爪快速抓向敵人', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 15, currentPP: 15 }, { name: '亂抓', desc: '瘋狂揮舞爪子攻擊', effect: 'atk', power: 1.5, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '快速亂抓', desc: '瘋狂揮舞爪子快速攻擊', effect: 'atk', power: 2.0, icon: '🌑', maxPP: 5, currentPP: 5 }] },
  // ── Boss Pets（轉盤獲得，等級上限同 SSR Lv.50）──
  { id: 'boss_pet_01', name: '金剛鸚鵡', rarity: 'SSR', image: 'assets/boss/boss_01.png', petVersion: true, skills: [{ name: '啄', desc: '用鳥喙快速啄向敵人', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '猛啄', desc: '用鳥喙用力猛啄', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續啄擊', desc: '瘋狂連續啄擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_02', name: '蟒蛇',     rarity: 'SSR', image: 'assets/boss/boss_02.png', petVersion: true, skills: [{ name: '咬', desc: '用利牙快速咬向敵人', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', desc: '用利牙用力猛咬', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', desc: '瘋狂連續咬擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_03', name: '鴕鳥',     rarity: 'SSR', image: 'assets/boss/boss_03.png', petVersion: true, skills: [{ name: '啄', desc: '用鳥喙快速啄向敵人', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '猛啄', desc: '用鳥喙用力猛啄', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續啄擊', desc: '瘋狂連續啄擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_04', name: '狼',       rarity: 'SSR', image: 'assets/boss/boss_04.png', petVersion: true, skills: [{ name: '咬', desc: '用利牙快速咬向敵人', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', desc: '用利牙用力猛咬', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', desc: '瘋狂連續咬擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_05', name: '袋鼠',     rarity: 'SSR', image: 'assets/boss/boss_05.png', petVersion: true, skills: [{ name: '打', desc: '揮出拳頭快速打向敵人', effect: 'atk', power: 1.5, icon: '👊', maxPP: 15, currentPP: 15 }, { name: '猛打', desc: '蓄力後全力揮拳猛打', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續猛打', desc: '瘋狂連續揮拳攻擊', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_06', name: '獵豹',     rarity: 'SSR', image: 'assets/boss/boss_06.png', petVersion: true, skills: [{ name: '咬', desc: '用利牙快速咬向敵人', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', desc: '用利牙用力猛咬', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', desc: '瘋狂連續咬擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_07', name: '河馬',     rarity: 'SSR', image: 'assets/boss/boss_07.png', petVersion: true, skills: [{ name: '咬', desc: '用利牙快速咬向敵人', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', desc: '用利牙用力猛咬', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', desc: '瘋狂連續咬擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_08', name: '犀牛',     rarity: 'SSR', image: 'assets/boss/boss_08.png', petVersion: true, skills: [{ name: '撞', desc: '低頭用身體快速撞向敵人', effect: 'atk', power: 1.5, icon: '💨', maxPP: 15, currentPP: 15 }, { name: '猛撞', desc: '蓄力後全力衝撞敵人', effect: 'atk', power: 2.0, icon: '💥', maxPP: 10, currentPP: 10 }, { name: '犀角衝撞', desc: '以鋼鐵犀角全速衝撞', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_09', name: '棕熊',     rarity: 'SSR', image: 'assets/boss/boss_09.png', petVersion: true, skills: [{ name: '咬', desc: '用利牙快速咬向敵人', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', desc: '用利牙用力猛咬', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', desc: '瘋狂連續咬擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_10', name: '貓頭鷹',   rarity: 'SSR', image: 'assets/boss/boss_10.png', petVersion: true, skills: [{ name: '啄', desc: '用鳥喙快速啄向敵人', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '猛啄', desc: '用鳥喙用力猛啄', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續啄擊', desc: '瘋狂連續啄擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_11', name: '大猩猩',   rarity: 'SSR', image: 'assets/boss/boss_11.png', petVersion: true, skills: [{ name: '打', desc: '揮出拳頭快速打向敵人', effect: 'atk', power: 1.5, icon: '👊', maxPP: 15, currentPP: 15 }, { name: '猛打', desc: '蓄力後全力揮拳猛打', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續猛打', desc: '瘋狂連續揮拳攻擊', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_12', name: '藏獒',     rarity: 'SSR', image: 'assets/boss/boss_12.png', petVersion: true, skills: [{ name: '咬', desc: '用利牙快速咬向敵人', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', desc: '用利牙用力猛咬', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', desc: '瘋狂連續咬擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_13', name: '鱷魚',     rarity: 'SSR', image: 'assets/boss/boss_13.png', petVersion: true, skills: [{ name: '咬', desc: '用利牙快速咬向敵人', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', desc: '用利牙用力猛咬', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', desc: '瘋狂連續咬擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_14', name: '老鷹',     rarity: 'SSR', image: 'assets/boss/boss_14.png', petVersion: true, skills: [{ name: '啄', desc: '用鳥喙快速啄向敵人', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '猛啄', desc: '用鳥喙用力猛啄', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續啄擊', desc: '瘋狂連續啄擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_15', name: '獅子',     rarity: 'SSR', image: 'assets/boss/boss_15.png', petVersion: true, skills: [{ name: '咬', desc: '用利牙快速咬向敵人', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', desc: '用利牙用力猛咬', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', desc: '瘋狂連續咬擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_16', name: '老虎',     rarity: 'SSR', image: 'assets/boss/boss_16.png', petVersion: true, skills: [{ name: '咬', desc: '用利牙快速咬向敵人', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', desc: '用利牙用力猛咬', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', desc: '瘋狂連續咬擊敵人', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
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
  candy:       { icon: '🍬', name: '愛心糖',      desc: '+10心情' },
  xpboost:     { icon: '⭐', name: '成長藥',       desc: '+20 EXP' },
  pprestore:   { icon: '💊', name: 'PP 回復',      desc: '回復一個技能的 PP' },
  hp_potion:   { icon: '🧪', name: '回復藥水',     desc: '+50 HP' },
  boss_ticket: { icon: '🎫', name: 'BOSS 挑戰卷', desc: '可額外挑戰一次 BOSS' },
};

const BOSSES = [
  { id: 'boss_01', name: '金剛鸚鵡', image: 'assets/boss/boss_01.png', level: 30,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 800,   rarity: 'SSR' }, desc: '以鋼鐵利喙和強力爪牙令對手喪膽' },
  { id: 'boss_02', name: '蟒蛇',     image: 'assets/boss/boss_02.png', level: 35,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 1000,  rarity: 'SSR' }, desc: '能以驚人力道將獵物纏繞窒息的巨大蟒蛇' },
  { id: 'boss_03', name: '鴕鳥',     image: 'assets/boss/boss_03.png', level: 40,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 1200,  rarity: 'SSR' }, desc: '奔速如風、一踢可碎石的沙漠巨鳥' },
  { id: 'boss_04', name: '狼',       image: 'assets/boss/boss_04.png', level: 45,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 1500,  rarity: 'SSR' }, desc: '統領狼群、嗜血好鬥的孤狼首領' },
  { id: 'boss_05', name: '袋鼠',     image: 'assets/boss/boss_05.png', level: 50,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 1800,  rarity: 'SSR' }, desc: '後腿爆發力驚人的拳擊格鬥高手' },
  { id: 'boss_06', name: '獵豹',     image: 'assets/boss/boss_06.png', level: 55,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 2200,  rarity: 'SSR' }, desc: '地表最快的掠食者，無處可逃' },
  { id: 'boss_07', name: '河馬',     image: 'assets/boss/boss_07.png', level: 60,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 2700,  rarity: 'SSR' }, desc: '龐大體型與驚人咬合力的河中霸主' },
  { id: 'boss_08', name: '犀牛',     image: 'assets/boss/boss_08.png', level: 65,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 3300,  rarity: 'SSR' }, desc: '以鋼鐵犀角衝撞萬物的荒野壁壘' },
  { id: 'boss_09', name: '棕熊',     image: 'assets/boss/boss_09.png', level: 70,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 4000,  rarity: 'SSR' }, desc: '山林之王，爪力足以撕碎一切' },
  { id: 'boss_10', name: '貓頭鷹',   image: 'assets/boss/boss_10.png', level: 75,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 4800,  rarity: 'SSR' }, desc: '黑暗中的智慧獵手，神出鬼沒' },
  { id: 'boss_11', name: '大猩猩',   image: 'assets/boss/boss_11.png', level: 80,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 5800,  rarity: 'SSR' }, desc: '叢林之王，力量超群的巨型靈長類' },
  { id: 'boss_12', name: '藏獒',     image: 'assets/boss/boss_12.png', level: 85,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 7000,  rarity: 'SSR' }, desc: '高原守護神，忠誠又兇猛的藏地聖犬' },
  { id: 'boss_13', name: '鱷魚',     image: 'assets/boss/boss_13.png', level: 90,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 8500,  rarity: 'SSR' }, desc: '遠古爬行霸主，咬合力無與倫比' },
  { id: 'boss_14', name: '老鷹',     image: 'assets/boss/boss_14.png', level: 95,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 10000, rarity: 'SSR' }, desc: '統御天空的王者，俯衝速度令人窒息' },
  { id: 'boss_15', name: '獅子',     image: 'assets/boss/boss_15.png', level: 100, baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 12000, rarity: 'SSR' }, desc: '萬獸之王，吼聲震天的非洲草原霸主' },
  { id: 'boss_16', name: '老虎',     image: 'assets/boss/boss_16.png', level: 105, baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 15000, rarity: 'SSR' }, desc: '終極BOSS，山林中最強的孤獨王者' },
];

// ─── Wheel Segments ──────────────────────────────────────────────────────────
// index 0~4 = coins; index 5 = boss pet
// prob is relative weight (total = 100)
const WHEEL_SEGMENTS = [
  { coins: 50,  color: '#FF6B6B', prob: 30 },
  { coins: 100, color: '#FFD93D', prob: 25 },
  { coins: 150, color: '#6BCB77', prob: 20 },
  { coins: 200, color: '#4D96FF', prob: 15 },
  { coins: 250, color: '#C77DFF', prob: 8  },
  { pet: true,  color: '#FF8C42', prob: 2  },
];

const RARITY_BASE_STATS = {
  F:   { hp: 100, atk: 10, def: 5  },
  R:   { hp: 150, atk: 18, def: 10 },
  SR:  { hp: 220, atk: 30, def: 18 },
  SSR: { hp: 350, atk: 50, def: 30 },
};

const RARITY_MAX_LEVEL = {
  F:   10,
  R:   20,
  SR:  30,
  SSR: 50,
};

const RARITY_GROWTH = {
  F:   { hp: 5,  atk: 1, def: 1 },
  R:   { hp: 10, atk: 2, def: 1 },
  SR:  { hp: 15, atk: 3, def: 2 },
  SSR: { hp: 30, atk: 6, def: 3 },
};

const getMaxLevel = (rarity) => RARITY_MAX_LEVEL[rarity] || 10;

const RARITY_SKILLS = {
  F: [
    { name: '普通攻擊', desc: '普通的一擊',             effect: 'atk', power: 1.0, icon: '⚔️', maxPP:  5 },
  ],
  R: [
    { name: '普通攻擊', desc: '普通的一擊',             effect: 'atk', power: 1.0, icon: '⚔️', maxPP: 10 },
    { name: '強力一擊', desc: '蓄力後猛烈攻擊',         effect: 'atk', power: 1.5, icon: '💥', maxPP:  5 },
  ],
  SR: [
    { name: '普通攻擊', desc: '普通的一擊',             effect: 'atk', power: 1.0, icon: '⚔️', maxPP: 15 },
    { name: '強力一擊', desc: '蓄力後猛烈攻擊',         effect: 'atk', power: 1.5, icon: '💥', maxPP: 10 },
    { name: '元素爆發', desc: '釋放強大的元素能量',     effect: 'atk', power: 2.0, icon: '🔮', maxPP:  5 },
  ],
  SSR: [
    { name: '強力一擊', desc: '蓄力後猛烈攻擊',         effect: 'atk', power: 1.5, icon: '💥', maxPP: 15 },
    { name: '元素爆發', desc: '釋放強大的元素能量',     effect: 'atk', power: 2.0, icon: '🔮', maxPP: 10 },
    { name: '究極必殺', desc: '毀天滅地的終極技能',     effect: 'atk', power: 2.5, icon: '⚡', maxPP:  5 },
  ],
};

const calcStats = (pet, level) => {
  const base   = pet.baseStats || RARITY_BASE_STATS[pet.rarity] || RARITY_BASE_STATS.F;
  const growth = RARITY_GROWTH[pet.rarity] || RARITY_GROWTH.F;
  return {
    hp:  base.hp  + (level - 1) * growth.hp,
    atk: base.atk + (level - 1) * growth.atk,
    def: base.def + (level - 1) * growth.def,
  };
};

// BOSS 無等級上限，成長公式獨立於 RARITY_MAX_LEVEL
const calcBossStats = (boss, level) => ({
  hp:  boss.baseStats.hp  + (level - 1) * 30,
  atk: boss.baseStats.atk + (level - 1) * 6,
  def: boss.baseStats.def + (level - 1) * 3,
});

const SKILL_CRIT_RATE = { F: 0.05, R: 0.08, SR: 0.12, SSR: 0.15 };

const calcDamage = (attackerAtk, skillPower, defenderDef, critRate) => {
  const base     = attackerAtk * skillPower;
  const defense  = Math.floor(defenderDef * 0.5);
  const raw      = Math.max(1, base - defense);
  const variance = 0.9 + Math.random() * 0.2;
  const isCrit   = Math.random() < (critRate || 0.05);
  const dmg      = Math.floor(raw * variance * (isCrit ? 1.5 : 1));
  return { dmg, crit: isCrit };
};

const getPetSkills = (pet) => pet.skills || RARITY_SKILLS[pet.rarity] || RARITY_SKILLS.F;

// ─── Skill PP ─────────────────────────────────────────────────────────────────
function loadSkillPP(petId) {
  try {
    const raw = localStorage.getItem(`petSkillPP_${petId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveSkillPP(petId, ppArr) {
  localStorage.setItem(`petSkillPP_${petId}`, JSON.stringify(ppArr));
}

// Returns skills merged with current PP from localStorage
function getSkillsWithPP(pet) {
  const skills = getPetSkills(pet);
  const saved  = loadSkillPP(pet.id);
  return skills.map((s, i) => ({
    ...s,
    currentPP: saved ? (saved[i] ?? s.maxPP) : s.maxPP,
  }));
}

function renderPPDots(current, max) {
  return Array.from({ length: max }, (_, i) =>
    `<span class="pp-dot ${i < current ? 'pp-dot--full' : 'pp-dot--empty'}"></span>`
  ).join('');
}

// Reset all PP to maxPP for current pet (e.g. after using PP 回復 item)
function restoreAllPP() {
  const pet    = currentPet();
  const skills = getPetSkills(pet);
  saveSkillPP(pet.id, skills.map(s => s.maxPP));
}

// Daily reset: if date changed since last reset, clear all petSkillPP_* keys
function checkDailyPPReset() {
  const today     = new Date().toDateString();
  const lastReset = localStorage.getItem('ppLastReset');
  if (lastReset === today) return;
  localStorage.setItem('ppLastReset', today);
  Object.keys(localStorage)
    .filter(k => k.startsWith('petSkillPP_'))
    .forEach(k => localStorage.removeItem(k));
}

const MOOD_MOODS = [
  [80, '😄'], [60, '😊'], [40, '😐'], [20, '😟'], [0, '😢']
];

// ─── Slot System ─────────────────────────────────────────────────────────────
function loadSlots() {
  try {
    const raw = localStorage.getItem('petSlots');
    if (raw) {
      const arr = JSON.parse(raw);
      while (arr.length < 3) arr.push(null);
      return arr.slice(0, 3);
    }
  } catch {}
  return [null, null, null];
}
function saveSlots(arr) {
  localStorage.setItem('petSlots', JSON.stringify(arr));
}

// ─── Per-pet state helpers (function declarations = hoisted) ─────────────────
function loadPetState(petId) {
  const defaults = { ...DEFAULT_PET_STATE };
  if (!petId) return defaults;
  try {
    const raw = localStorage.getItem(`petState_${petId}`);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch {}
  return defaults;
}
function savePetState(petId, data) {
  if (!petId) return;
  localStorage.setItem(`petState_${petId}`, JSON.stringify(data));
}
function getDisplayPetId() {
  return loadSlots()[currentSlotIdx] || null;
}

// ─── State ───────────────────────────────────────────────────────────────────
const DEFAULT_GLOBAL = { coins: 50, items: {}, equips: [] };
const DEFAULT_PET_STATE = { level: 1, exp: 0, hunger: 60, water: 70, mood: 80 };

let selectedPetId    = localStorage.getItem('selectedPetId') || null;
let currentSlotIdx   = 0;    // currently visible slot page (0–2)
let pendingSlotIdx   = null; // slot being managed via options modal
let pendingAddSlotIdx = null; // target slot for pet-pick modal
let slotScrollBound  = false;
let state = loadState();

function currentPet() {
  const displayId = getDisplayPetId();
  return PETS.find(p => p.id === (displayId || selectedPetId)) || PETS[0];
}

// ─── Persistence ─────────────────────────────────────────────────────────────
function loadState() {
  let global = { ...DEFAULT_GLOBAL };
  try {
    const raw = localStorage.getItem('pixelPet');
    if (raw) {
      const parsed = JSON.parse(raw);
      global = { ...DEFAULT_GLOBAL, ...parsed };
      // Migrate: move old global hunger/water/mood into display pet's store
      if ((parsed.hunger ?? parsed.water ?? parsed.mood) !== undefined) {
        const migId = getDisplayPetId() || selectedPetId;
        if (migId) {
          const existing = loadPetState(migId);
          savePetState(migId, {
            ...existing,
            hunger: parsed.hunger ?? existing.hunger,
            water:  parsed.water  ?? existing.water,
            mood:   parsed.mood   ?? existing.mood,
          });
        }
        delete global.hunger; delete global.water; delete global.mood;
        localStorage.setItem('pixelPet', JSON.stringify(global));
      }
    }
  } catch {}

  const displayId = getDisplayPetId();
  const petSt     = loadPetState(displayId || selectedPetId);
  return { ...global, ...petSt };
}

function saveState() {
  const global = { coins: state.coins, items: state.items, equips: state.equips };
  localStorage.setItem('pixelPet', JSON.stringify(global));

  const displayId = getDisplayPetId() || selectedPetId;
  if (displayId) {
    savePetState(displayId, {
      level: state.level, exp: state.exp,
      hunger: state.hunger, water: state.water, mood: state.mood,
    });
  }
}

function refreshDisplayPetState() {
  const displayId = getDisplayPetId() || selectedPetId;
  const ps = loadPetState(displayId);
  state.level  = ps.level;  state.exp    = ps.exp;
  state.hunger = ps.hunger; state.water  = ps.water; state.mood = ps.mood;
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
      <div class="select-card__footer">
        <span class="badge badge--${pet.rarity.toLowerCase()}">${pet.rarity}</span>
        <span class="select-card__maxlv">上限 Lv.${getMaxLevel(pet.rarity)}</span>
      </div>
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
  const pool = PETS.filter(p => p.rarity === rarity && !p.petVersion);
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
function showPetDetail(petIdOverride = null) {
  const pet    = petIdOverride ? (PETS.find(p => p.id === petIdOverride) ?? currentPet()) : currentPet();
  const ps     = petIdOverride ? loadPetState(petIdOverride) : null;
  const level  = ps ? ps.level : state.level;
  const stats  = calcStats(pet, level);
  const skills = getSkillsWithPP(pet);

  document.getElementById('detail-pet-img').src = pet.image;
  document.getElementById('detail-pet-img').alt = pet.name;
  document.getElementById('detail-pet-name').textContent = pet.name;

  // 等級：Lv.X / MaxLv 或 Lv.X MAX（橘色）
  const maxLevel  = getMaxLevel(pet.rarity);
  const isMaxed   = level >= maxLevel;
  const levelEl   = document.getElementById('detail-pet-level');
  levelEl.textContent = isMaxed ? `${level} MAX` : `${level} / ${maxLevel}`;
  levelEl.classList.toggle('level-max', isMaxed);

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
    <div class="detail-skill-card${s.currentPP === 0 ? ' detail-skill-card--empty' : ''}">
      <div class="detail-skill-card__icon">${s.icon}</div>
      <div class="detail-skill-card__name">${s.name}</div>
      <div class="detail-skill-card__desc">${s.desc}</div>
      <div class="detail-skill-card__power">威力：${Number(s.power).toFixed(1)}×</div>
      <div class="detail-skill-card__pp">
        <div class="pp-dots">${renderPPDots(s.currentPP, s.maxPP)}</div>
        <span class="pp-count">${s.currentPP} / ${s.maxPP}</span>
      </div>
      ${s.currentPP === 0 ? '<div class="pp-empty-hint">PP 不足</div>' : ''}
    </div>
  `).join('');

  document.getElementById('screen-pet-detail').classList.remove('hidden');
}

function hidePetDetail() {
  document.getElementById('screen-pet-detail').classList.add('hidden');
}

function selectPet(id) {
  // Save current display pet's state before switching
  const curDisplayId = getDisplayPetId() || selectedPetId;
  if (curDisplayId) {
    savePetState(curDisplayId, {
      level: state.level, exp: state.exp,
      hunger: state.hunger, water: state.water, mood: state.mood,
    });
  }

  selectedPetId = id;
  localStorage.setItem('selectedPetId', id);

  // Load the new pet's state
  const ps = loadPetState(id);
  state.level  = ps.level;  state.exp    = ps.exp;
  state.hunger = ps.hunger; state.water  = ps.water; state.mood = ps.mood;

  hideSelectScreen();
  renderAll();
  showToast(`選擇了 ${currentPet().name}！`);
}

// ─── EXP / Level ─────────────────────────────────────────────────────────────
function addExp(amount) {
  const pet      = currentPet();
  const maxLevel = getMaxLevel(pet.rarity);

  // Already at max — silently skip
  if (state.level >= maxLevel) {
    state.exp = 0;
    saveState();
    renderAll();
    return;
  }

  state.exp += amount;
  let leveled = false;

  while (state.exp >= EXP_PER_LEVEL && state.level < maxLevel) {
    state.exp -= EXP_PER_LEVEL;
    state.level++;
    leveled = true;
    if (state.level >= maxLevel) {
      state.exp = 0; // 達到上限不再累積
      break;
    }
  }

  if (leveled) {
    if (state.level >= maxLevel) {
      showToast(`🎉 已達等級上限 Lv.${state.level} MAX！`);
    } else {
      showToast(`🎉 升級了！現在是 Lv.${state.level}！`);
    }
    animateLevelUp();
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
  renderPetSlots();
  renderCoins();
}


function renderCoins() {
  document.getElementById('coin-count').textContent = state.coins;
}

function animateLevelUp() {
  const page = document.getElementById(`slot-page-${currentSlotIdx}`);
  const el   = page?.querySelector('.slot-level-num');
  if (!el) return;
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

// ─── Item Bag ─────────────────────────────────────────────────────────────────
function useItem(id) {
  if (getItem(id) <= 0) return;

  if (id === 'pprestore') {
    showPPRestoreModal();
    return;
  }
  if (id === 'boss_ticket') {
    showToast('🎫 請前往 BOSS 挑戰頁面使用挑戰卷！');
    return; // 不扣除，在 BOSS 頁面才消耗
  }

  consumeItem(id);

  if (id === 'candy') {
    state.mood = Math.min(100, state.mood + 10);
    saveState(); renderSlotPage(currentSlotIdx);
    showToast('使用愛心糖！+10心情 😄');
  } else if (id === 'xpboost') {
    saveState();
    addExp(20);
    showToast('使用成長藥！+20 EXP ⭐');
  } else if (id === 'hp_potion') {
    // 背包外使用：僅顯示提示，實際 HP 只在戰鬥中有效
    showToast('🧪 回復 50 HP！');
  }
}

// ─── PP Restore Modal ─────────────────────────────────────────────────────────
let ppRestoreFromBattle = false; // 記錄是否從戰鬥中開啟

function showPPRestoreModal(fromBattle = false) {
  const count = getItem('pprestore');
  if (count <= 0) { showToast('背包裡沒有 PP 回復道具！'); return; }

  ppRestoreFromBattle = fromBattle;
  const pet    = currentPet();
  const skills = getSkillsWithPP(pet);
  const list   = document.getElementById('pp-restore-list');

  list.innerHTML = skills.map((s, i) => {
    const full = s.currentPP >= s.maxPP;
    return `
      <div class="pp-restore-row${full ? ' pp-restore-row--full' : ''}">
        <span class="pp-restore-icon">${s.icon}</span>
        <div class="pp-restore-info">
          <span class="pp-restore-name">${s.name}</span>
          <div class="pp-restore-bar">
            ${renderPPDots(s.currentPP, s.maxPP)}
            <span class="pp-restore-count">${s.currentPP} / ${s.maxPP}</span>
          </div>
        </div>
        <button class="pp-restore-btn${full ? ' pp-restore-btn--disabled' : ''}"
                ${full ? 'disabled' : `onclick="confirmPPRestore(${i})"`}>
          ${full ? 'PP 已滿' : '回復'}
        </button>
      </div>`;
  }).join('');

  document.getElementById('pp-restore-count-display').textContent = `剩餘：${count} 個`;
  openModal('modal-pp-restore');
}

function confirmPPRestore(skillIndex) {
  const pet    = currentPet();
  const skills = getPetSkills(pet);
  const saved  = loadSkillPP(pet.id) || skills.map(s => s.maxPP);

  saved[skillIndex] = skills[skillIndex].maxPP;
  saveSkillPP(pet.id, saved);

  // 扣道具
  consumeItem('pprestore');

  const skillName = skills[skillIndex].name;
  closeModal('modal-pp-restore');
  showToast(`💊 ${skillName} PP 已回滿！`);

  if (ppRestoreFromBattle) {
    renderBattleItemPanel(); // 戰鬥中：重繪道具欄
  } else {
    showPetDetail(); // 背包中：重繪技能頁
  }
}

// ─── HP Potion In-Battle ─────────────────────────────────────────────────────
function useHpPotionInBattle() {
  const count = getItem('hp_potion');
  if (count <= 0) { showToast('背包裡沒有回復藥水！'); return; }

  const HEAL = 50;
  // Modify remaining turns: add HEAL to petHp (capped at max)
  for (let i = battleAnimIdx - 1; i < battleActiveTurns.length; i++) {
    if (i >= 0) {
      battleActiveTurns[i].petHp = Math.min(
        battleAnimMaxPetHp,
        battleActiveTurns[i].petHp + HEAL
      );
    }
  }

  // Immediately update HP bar with healed value
  const curIdx     = Math.max(0, battleAnimIdx - 1);
  const curPetHp   = battleActiveTurns[curIdx]?.petHp ?? battleAnimMaxPetHp;
  const curBossHp  = battleActiveTurns[curIdx]?.bossHp ?? battleAnimMaxBossHp;
  updateBattleHPBars(curPetHp, battleAnimMaxPetHp, curBossHp, battleAnimMaxBossHp);

  // Show green heal float on pet side
  showDamageFloat('battle-pet-side', HEAL, false, true);

  // Deduct item
  consumeItem('hp_potion');

  showToast('🧪 回復 50 HP！');
  renderBattleItemPanel();
}

// ─── Battle Item Panel ────────────────────────────────────────────────────────
function toggleBattleItemPanel() {
  const panel = document.getElementById('battle-item-panel');
  const isHidden = panel.classList.contains('hidden');
  if (isHidden) {
    renderBattleItemPanel();
    panel.classList.remove('hidden');
  } else {
    panel.classList.add('hidden');
  }
}

function renderBattleItemPanel() {
  const panel    = document.getElementById('battle-item-panel');
  const ppCount  = getItem('pprestore');
  const hpCount  = getItem('hp_potion');

  const rows = [];

  if (hpCount > 0) {
    rows.push(`
      <div class="battle-item-row">
        <span class="battle-item-icon">🧪</span>
        <span class="battle-item-name">回復藥水</span>
        <span class="battle-item-count">×${hpCount}</span>
        <button class="battle-item-use-btn" onclick="useHpPotionInBattle()">使用</button>
      </div>`);
  }

  if (ppCount > 0) {
    rows.push(`
      <div class="battle-item-row">
        <span class="battle-item-icon">💊</span>
        <span class="battle-item-name">PP 回復</span>
        <span class="battle-item-count">×${ppCount}</span>
        <button class="battle-item-use-btn" onclick="showPPRestoreModal(true);document.getElementById('battle-item-panel').classList.add('hidden')">使用</button>
      </div>`);
  }

  panel.innerHTML = rows.length
    ? rows.join('')
    : '<div class="battle-item-empty">背包沒有道具</div>';
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

// ─── Feed from Bag Modal ──────────────────────────────────────────────────────
function openFeedModal() {
  renderFeedModal();
  openModal('modal-feed');
}

function renderFeedModal() {
  const el = document.getElementById('feed-pick-list');
  if (!el) return;
  const inv   = loadInventory();
  const owned = Object.entries(inv).filter(([id, cnt]) => cnt > 0 && id.startsWith('food_'));
  if (!owned.length) {
    el.innerHTML = `
      <div class="modal-pick-empty">
        <p>背包沒有食物</p>
        <p class="modal-pick-empty-hint">去商店購買吧！</p>
      </div>`;
    return;
  }
  el.innerHTML = owned.map(([id, cnt]) => {
    const f = FOODS.find(x => x.id === id);
    if (!f) return '';
    return `
      <div class="modal-pick-row">
        <div class="modal-pick-img-wrap">
          <img src="${f.image}" class="modal-pick-img" onerror="this.style.opacity='0.2'">
        </div>
        <div class="modal-pick-info">
          <div class="modal-pick-name">
            ${f.name}
            <span class="badge badge--${f.rarity.toLowerCase()}">${f.rarity}</span>
          </div>
          <div class="modal-pick-desc">${f.desc}</div>
        </div>
        <div class="modal-pick-right">
          <span class="modal-pick-count">×${cnt}</span>
          <button class="use-btn" onclick="useFoodFromModal('${id}')">使用</button>
        </div>
      </div>`;
  }).join('');
}

function useFoodFromModal(id) {
  const food = FOODS.find(f => f.id === id);
  if (!food || !consumeItem(id)) return;
  const e = food.effect;
  if (e.water)  state.water  = Math.min(100, state.water  + e.water);
  if (e.hunger) state.hunger = Math.min(100, state.hunger + e.hunger);
  if (e.mood)   state.mood   = Math.min(100, state.mood   + e.mood);
  saveState();
  if (e.exp) addExp(e.exp); else renderAll();
  closeModal('modal-feed');
  showToast(`使用 ${food.name}！${food.desc}`);
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

// ─── Drink Inventory ─────────────────────────────────────────────────────────
function loadInventory() {
  try { const r = localStorage.getItem('inventory'); return r ? JSON.parse(r) : {}; } catch { return {}; }
}
function saveInventory(inv) {
  localStorage.setItem('inventory', JSON.stringify(inv));
}

// ─── Unified Item Helpers (read/write all items via `inventory`) ──────────────
function getItem(id)  { return loadInventory()[id] || 0; }

function addItem(id, count = 1) {
  const inv = loadInventory();
  inv[id] = (inv[id] || 0) + count;
  saveInventory(inv);
}

function consumeItem(id) {
  const inv = loadInventory();
  if (!inv[id] || inv[id] <= 0) return false;
  inv[id]--;
  if (inv[id] <= 0) delete inv[id];
  saveInventory(inv);
  return true;
}

// Migrate old state.items into unified inventory (one-time on load)
function migrateItemsToInventory() {
  const old = state.items;
  if (!old || Object.keys(old).length === 0) return;
  const inv = loadInventory();
  for (const [id, cnt] of Object.entries(old)) {
    if (cnt > 0) inv[id] = (inv[id] || 0) + cnt;
  }
  saveInventory(inv);
  state.items = {};
  saveState();
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

// ─── Drink from Bag Modal ─────────────────────────────────────────────────────
function openDrinkModal() {
  renderDrinkModal();
  openModal('modal-drink');
}

function renderDrinkModal() {
  const el = document.getElementById('drink-pick-list');
  if (!el) return;
  const inv   = loadInventory();
  const owned = Object.entries(inv).filter(([id, cnt]) => cnt > 0 && id.startsWith('drink_'));
  if (!owned.length) {
    el.innerHTML = `
      <div class="modal-pick-empty">
        <p>背包沒有飲料</p>
        <p class="modal-pick-empty-hint">去商店購買吧！</p>
      </div>`;
    return;
  }
  el.innerHTML = owned.map(([id, cnt]) => {
    const d = DRINKS.find(x => x.id === id);
    if (!d) return '';
    return `
      <div class="modal-pick-row">
        <div class="modal-pick-img-wrap">
          <img src="${d.image}" class="modal-pick-img" onerror="this.style.opacity='0.2'">
        </div>
        <div class="modal-pick-info">
          <div class="modal-pick-name">
            ${d.name}
            <span class="badge badge--${d.rarity.toLowerCase()}">${d.rarity}</span>
          </div>
          <div class="modal-pick-desc">${d.desc}</div>
        </div>
        <div class="modal-pick-right">
          <span class="modal-pick-count">×${cnt}</span>
          <button class="use-btn" onclick="useDrinkFromModal('${id}')">使用</button>
        </div>
      </div>`;
  }).join('');
}

function useDrinkFromModal(id) {
  const drink = DRINKS.find(d => d.id === id);
  if (!drink || !consumeItem(id)) return;
  const e = drink.effect;
  if (e.water)  state.water  = Math.min(100, state.water  + e.water);
  if (e.hunger) state.hunger = Math.min(100, state.hunger + e.hunger);
  if (e.mood)   state.mood   = Math.min(100, state.mood   + e.mood);
  saveState();
  if (e.exp) addExp(e.exp); else renderAll();
  closeModal('modal-drink');
  showToast(`使用 ${drink.name}！${drink.desc}`);
}

// ─── Bag Select Modal ────────────────────────────────────────────────────────
function openBagModal(type) {
  closeModal('modal-bag-select');
  if      (type === 'food')  openFeedModal();
  else if (type === 'drink') openDrinkModal();
  else if (type === 'item')  openItemPickModal();
  else if (type === 'pet')   openPetPickModal();
}

// ─── Item Pick Modal (main page 道具背包 button) ──────────────────────────────
function openItemPickModal() {
  renderItemPickModal();
  openModal('modal-item-pick');
}

function renderItemPickModal() {
  const el = document.getElementById('item-pick-list');
  if (!el) return;
  const inv   = loadInventory();
  const owned = Object.entries(ITEM_DEFS)
    .filter(([id]) => (inv[id] || 0) > 0)
    .map(([id, def]) => ({ id, def, cnt: inv[id] }));

  if (!owned.length) {
    el.innerHTML = `
      <div class="modal-pick-empty">
        <p>背包沒有道具</p>
        <p class="modal-pick-empty-hint">去商店購買吧！</p>
      </div>`;
    return;
  }

  el.innerHTML = owned.map(({ id, def, cnt }) => {
    const isBoss = id === 'boss_ticket';
    return `
      <div class="modal-pick-row">
        <div class="modal-pick-img-wrap" style="display:flex;align-items:center;justify-content:center;font-size:2rem;flex-shrink:0">
          ${def.icon}
        </div>
        <div class="modal-pick-info">
          <div class="modal-pick-name">${def.name}</div>
          <div class="modal-pick-desc">${def.desc}</div>
        </div>
        <div class="modal-pick-right">
          <span class="modal-pick-count">×${cnt}</span>
          <button class="use-btn${isBoss ? ' use-btn--boss' : ''}" onclick="useItemFromPickModal('${id}')">
            ${isBoss ? '前往 BOSS' : '使用'}
          </button>
        </div>
      </div>`;
  }).join('');
}

function useItemFromPickModal(id) {
  if (id === 'boss_ticket') {
    showToast('🎫 請前往 BOSS 挑戰頁面使用挑戰卷！');
    return; // keep modal open so user can cancel
  }
  if (id === 'pprestore') {
    closeModal('modal-item-pick');
    showPPRestoreModal();
    return;
  }
  if (getItem(id) <= 0) return;
  consumeItem(id);
  if (id === 'candy') {
    state.mood = Math.min(100, state.mood + 10);
    saveState(); renderSlotPage(currentSlotIdx);
    showToast('使用愛心糖！+10心情 😄');
  } else if (id === 'xpboost') {
    saveState();
    addExp(20);
    showToast('使用成長藥！+20 EXP ⭐');
  } else if (id === 'hp_potion') {
    showToast('🧪 回復 50 HP！');
  }
  closeModal('modal-item-pick');
}

// ─── Pet Pick Modal (main page 寵物背包 button) ───────────────────────────────
function openPetPickModal() {
  renderPetPickModal();
  openModal('modal-pet-pick');
}

function renderPetPickModal() {
  const el = document.getElementById('pet-pick-list');
  if (!el) return;
  const slots      = loadSlots();
  const inSlotSet  = new Set(slots.filter(Boolean));
  const bagPets    = unlockedPets
    .map(id => PETS.find(p => p.id === id))
    .filter(p => p && !inSlotSet.has(p.id));

  if (!bagPets.length) {
    el.innerHTML = `
      <div class="modal-pick-empty">
        <p>背包沒有寵物</p>
        <p class="modal-pick-empty-hint">去扭蛋機抽吧！</p>
      </div>`;
    return;
  }

  const slotsFull = !slots.some(slot => slot === null);
  el.innerHTML = bagPets.map(pet => {
    const ps = loadPetState(pet.id);
    return `
      <div class="modal-pick-row">
        <div class="modal-pick-img-wrap">
          <img src="${pet.image}" class="modal-pick-img" onerror="this.style.opacity='0.2'">
        </div>
        <div class="modal-pick-info">
          <div class="modal-pick-name">
            ${pet.name}
            <span class="badge badge--${pet.rarity.toLowerCase()}">${pet.rarity}</span>
          </div>
          <div class="modal-pick-desc">Lv.${ps.level}</div>
        </div>
        <div class="modal-pick-right">
          <button class="use-btn${slotsFull ? ' use-btn--disabled' : ''}"
                  ${slotsFull ? 'disabled' : `onclick="addPetFromPickModal('${pet.id}')"`}>
            ${slotsFull ? '巢位已滿' : '加入巢位'}
          </button>
        </div>
      </div>`;
  }).join('');
}

function addPetFromPickModal(petId) {
  const slots = loadSlots();
  let slotIdx;
  if (pendingAddSlotIdx !== null && slots[pendingAddSlotIdx] === null) {
    slotIdx = pendingAddSlotIdx;
  } else {
    slotIdx = slots.indexOf(null);
  }
  pendingAddSlotIdx = null;
  if (slotIdx === -1) { showToast('所有巢位已滿！'); return; }
  slots[slotIdx] = petId;
  saveSlots(slots);
  renderAll();
  closeModal('modal-pet-pick');
  const pet = PETS.find(p => p.id === petId);
  showToast(`✅ ${pet?.name ?? '寵物'} 加入巢位！`);
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

// ─── Decay ───────────────────────────────────────────────────────────────────
function decayStats() {
  const slotIds = loadSlots().filter(id => id !== null);
  if (slotIds.length === 0) return;

  for (const petId of slotIds) {
    const ps  = loadPetState(petId);
    const pet = PETS.find(p => p.id === petId);

    const wasHungry = ps.hunger === 0;
    const wasThirty = ps.water  === 0;

    ps.hunger = Math.max(0, ps.hunger - 1);
    ps.water  = Math.max(0, ps.water  - 1);

    let moodDec = 1;
    if (ps.hunger < 20) moodDec += 1;
    if (ps.water  < 20) moodDec += 1;
    if (ps.hunger === 0) moodDec += 1;
    if (ps.water  === 0) moodDec += 1;
    ps.mood = Math.max(0, ps.mood - moodDec);

    savePetState(petId, ps);

    if (pet) {
      if (!wasHungry && ps.hunger === 0) showToast(`🍖 ${pet.name} 餓了！`);
      if (!wasThirty && ps.water  === 0) showToast(`💧 ${pet.name} 渴了！`);
    }
  }

  refreshDisplayPetState();
  renderPetSlots();
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
    const pool = PETS.filter(p => !p.petVersion);
    result.push(pool[Math.floor(Math.random() * pool.length)]);
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
      const nav = btn.dataset.nav;
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
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
      if (type === 'item') {
        addItem(id);
        if (id === 'pprestore') {
          showToast('💊 PP 回復已加入背包！');
        } else if (id === 'hp_potion') {
          showToast('🧪 回復藥水已加入背包！');
        } else if (id === 'boss_ticket') {
          showToast('🎫 BOSS 挑戰卷已加入背包！');
        } else {
          showToast(`購買成功：${ITEM_DEFS[id]?.name ?? id} ×1`);
        }
      }
    });
  });
}

// ─── Action Buttons ──────────────────────────────────────────────────────────
function initActions() {
  document.getElementById('btn-detail-back').addEventListener('click', () => hidePetDetail());
  document.getElementById('btn-slot-view-detail')?.addEventListener('click', viewSlotPetDetail);
  document.getElementById('btn-slot-send-back')?.addEventListener('click', sendSlotPetBack);
  document.getElementById('btn-spin')?.addEventListener('click', doSpin);
  document.getElementById('btn-wheel-close')?.addEventListener('click', closeWheelModal);
}

// ─── Pokedex ──────────────────────────────────────────────────────────────────
function openPokedex() {
  renderPokedex();
  openModal('modal-pokedex');
}

function renderPokedex() {
  const grid = document.getElementById('pokedex-grid');
  if (!grid) return;
  const sorted = [...PETS].sort((a, b) => {
    const ro = { F: 0, R: 1, SR: 2, SSR: 3 };
    return (ro[a.rarity] ?? 0) - (ro[b.rarity] ?? 0);
  });
  grid.innerHTML = sorted.map(pet => {
    const unlocked = isUnlocked(pet.id);
    const ps       = unlocked ? loadPetState(pet.id) : null;
    return `
      <div class="pokedex-card${unlocked ? '' : ' pokedex-card--locked'}">
        <div class="pokedex-card__img-wrap">
          ${unlocked
            ? `<img src="${pet.image}" class="pokedex-card__img" alt="${pet.name}"
                    onerror="this.style.opacity='.3'">`
            : `<div class="pokedex-card__lock">🔒</div>`}
        </div>
        <div class="pokedex-card__name">${unlocked ? pet.name : '???'}</div>
        <span class="badge badge--${pet.rarity.toLowerCase()}">${pet.rarity}</span>
        ${unlocked && ps ? `<div class="pokedex-card__lv">Lv.${ps.level}</div>` : ''}
      </div>`;
  }).join('');
}

// ─── Slot System Rendering ────────────────────────────────────────────────────
function renderPetSlots() {
  for (let i = 0; i < 3; i++) renderSlotPage(i);
  updateSlotDots(currentSlotIdx);
  initSlotScroll();
}

function renderSlotPage(slotIdx) {
  const slots = loadSlots();
  const petId = slots[slotIdx];
  const page  = document.getElementById(`slot-page-${slotIdx}`);
  if (!page) return;

  if (!petId) {
    page.innerHTML = `
      <div class="slot-empty-box">
        <div class="slot-empty-icon">🐾</div>
        <div class="slot-empty-text">空的巢位</div>
        <button class="slot-add-btn" onclick="openPetPickForSlot(${slotIdx})">＋ 加入寵物</button>
      </div>`;
    return;
  }

  const pet = PETS.find(p => p.id === petId);
  if (!pet) { slots[slotIdx] = null; saveSlots(slots); renderSlotPage(slotIdx); return; }

  const ps        = loadPetState(petId);
  const maxLevel  = getMaxLevel(pet.rarity);
  const isMaxed   = ps.level >= maxLevel;
  const pct       = isMaxed ? 100 : Math.floor((ps.exp / EXP_PER_LEVEL) * 100);
  const moodEntry = MOOD_MOODS.find(([min]) => ps.mood >= min) || MOOD_MOODS.at(-1);

  page.innerHTML = `
    <div class="card pet-card">
      <div class="pet-card__left">
        <div class="pet-avatar">
          <img src="${pet.image}" alt="${pet.name}" class="pixel-art" />
        </div>
        <div class="mood-emoji">${moodEntry[1]}</div>
      </div>
      <div class="pet-card__right">
        <div class="pet-name-row">
          <span class="pet-name">${pet.name}</span>
          <span class="badge badge--${pet.rarity.toLowerCase()}">${pet.rarity}</span>
        </div>
        <div class="pet-level-row">
          <span class="label">Lv.</span>
          <span class="level-num slot-level-num${isMaxed ? ' level-max' : ''}">${ps.level}${isMaxed ? ' MAX' : ''}</span>
        </div>
        <div class="exp-bar-wrap">
          <div class="exp-bar"><div class="exp-bar__fill" style="width:${pct}%"></div></div>
          <span class="exp-text">${isMaxed ? 'MAX' : `${ps.exp} / ${EXP_PER_LEVEL}`}</span>
        </div>
      </div>
    </div>
    <div class="card stats-card">
      <div class="stat-row">
        <span class="stat-label">😄 心情</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar"><div class="stat-bar__fill mood-fill" style="width:${Math.min(100,ps.mood)}%"></div></div>
          <span class="stat-value">${Math.round(ps.mood)}</span>
        </div>
      </div>
      <div class="stat-row">
        <span class="stat-label">🍖 飽食</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar"><div class="stat-bar__fill hunger-fill" style="width:${Math.min(100,ps.hunger)}%"></div></div>
          <span class="stat-value">${Math.round(ps.hunger)}</span>
        </div>
      </div>
      <div class="stat-row">
        <span class="stat-label">💧 水份</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar"><div class="stat-bar__fill water-fill" style="width:${Math.min(100,ps.water)}%"></div></div>
          <span class="stat-value">${Math.round(ps.water)}</span>
        </div>
      </div>
    </div>
    <div class="action-grid">
      <button class="action-btn" onclick="slotFeed(${slotIdx})">
        <span class="action-icon">🍖</span><span>餵食</span>
      </button>
      <button class="action-btn" onclick="slotDrink(${slotIdx})">
        <span class="action-icon">🥤</span><span>飲料</span>
      </button>
      <button class="action-btn" onclick="slotItemBag(${slotIdx})">
        <span class="action-icon">🎒</span><span>道具背包</span>
      </button>
      <button class="action-btn" onclick="openPetPickModal()">
        <span class="action-icon">🐾</span><span>寵物背包</span>
      </button>
    </div>
    <div class="small-btn-row">
      <button class="small-btn" onclick="showPetDetail('${petId}')">
        <span>ℹ️</span><span class="small-btn-label">資訊</span>
      </button>
      <button class="small-btn" onclick="openPokedex()">
        <span>📖</span><span class="small-btn-label">圖鑑</span>
      </button>
      <button class="small-btn" onclick="openSlotOptionsModal(${slotIdx})">
        <span>⚙️</span><span class="small-btn-label">管理</span>
      </button>
    </div>
  `;
}

function updateSlotDots(activeIdx) {
  document.querySelectorAll('#slot-dots .team-dot').forEach((dot, i) => {
    dot.classList.toggle('team-dot--active', i === activeIdx);
  });
}

function initSlotScroll() {
  if (slotScrollBound) return;
  const container = document.getElementById('slot-scroll');
  if (!container) return;
  slotScrollBound = true;
  container.addEventListener('scroll', () => {
    const w   = container.offsetWidth || 1;
    const idx = Math.min(2, Math.round(container.scrollLeft / w));
    if (idx !== currentSlotIdx) {
      currentSlotIdx = idx;
      refreshDisplayPetState();
      updateSlotDots(idx);
    }
  }, { passive: true });
}

// ─── Slot Action Helpers ──────────────────────────────────────────────────────
function setActiveSlot(slotIdx) {
  if (currentSlotIdx !== slotIdx) {
    currentSlotIdx = slotIdx;
    refreshDisplayPetState();
  }
}
function slotFeed(slotIdx)    { setActiveSlot(slotIdx); openFeedModal(); }
function slotDrink(slotIdx)   { setActiveSlot(slotIdx); openDrinkModal(); }
function slotItemBag(slotIdx) { setActiveSlot(slotIdx); openItemPickModal(); }

function openPetPickForSlot(slotIdx) {
  pendingAddSlotIdx = slotIdx;
  openPetPickModal();
}

// ─── Slot Options Modal ───────────────────────────────────────────────────────
function openSlotOptionsModal(slotIdx) {
  const slots = loadSlots();
  const pet   = PETS.find(p => p.id === slots[slotIdx]);
  if (!pet) return;
  pendingSlotIdx = slotIdx;
  document.getElementById('slot-options-pet-img').src          = pet.image;
  document.getElementById('slot-options-pet-img').alt          = pet.name;
  document.getElementById('slot-options-pet-name').textContent = pet.name;
  openModal('modal-slot-options');
}

function sendSlotPetBack() {
  const slots = loadSlots();
  const pet   = PETS.find(p => p.id === slots[pendingSlotIdx]);
  slots[pendingSlotIdx] = null;
  saveSlots(slots);
  if (currentSlotIdx === pendingSlotIdx) {
    const next = slots.findIndex(id => id !== null);
    currentSlotIdx = next >= 0 ? next : 0;
    refreshDisplayPetState();
  }
  renderAll();
  closeModal('modal-slot-options');
  showToast(`📦 ${pet?.name ?? '寵物'} 已移回背包`);
}

function viewSlotPetDetail() {
  const slots = loadSlots();
  const petId = slots[pendingSlotIdx];
  closeModal('modal-slot-options');
  showPetDetail(petId);
}

// ─── getSlotPets (for battle) ─────────────────────────────────────────────────
function getSlotPets() {
  return loadSlots()
    .filter(id => id !== null)
    .map(id => PETS.find(p => p.id === id))
    .filter(Boolean);
}

// ─── Migration: team → petSlots ───────────────────────────────────────────────
function migrateTeamToSlots() {
  if (localStorage.getItem('petSlots')) return;
  const teamRaw = localStorage.getItem('team');
  if (teamRaw) localStorage.setItem('petSlots', teamRaw);
}

// ─── Boss System ─────────────────────────────────────────────────────────────
function loadClearedBosses() {
  try { return JSON.parse(localStorage.getItem('clearedBosses') || '[]'); } catch { return []; }
}
function saveClearedBosses(arr) {
  localStorage.setItem('clearedBosses', JSON.stringify(arr));
}


function showBossPage() {
  document.getElementById('explore-lobby').style.display    = 'none';
  document.getElementById('explore-boss-sub').style.display = 'flex';
  renderBossList();
}
function hideBossPage() {
  document.getElementById('explore-boss-sub').style.display = 'none';
  document.getElementById('explore-lobby').style.display    = 'flex';
}

function renderBossList() {
  const container   = document.getElementById('boss-list-container');
  if (!container) return;
  const cleared     = loadClearedBosses();
  const ticketCount = getItem('boss_ticket');

  container.innerHTML = BOSSES.map((boss, idx) => {
    const isCleared   = cleared.includes(boss.id);
    const isSeqLocked = idx > 0 && !cleared.includes(BOSSES[idx - 1].id);
    const hasTicket   = ticketCount > 0;

    let actionHtml;
    if (isSeqLocked) {
      actionHtml = `<span class="boss-status boss-status--locked">🔒 未解鎖</span>`;
    } else if (!hasTicket) {
      actionHtml = `<button class="boss-challenge-btn boss-btn--disabled" disabled>🎫 需要挑戰卷</button>`;
    } else {
      actionHtml = `<button class="boss-challenge-btn boss-btn--ticket" data-boss-id="${boss.id}">🎫 使用挑戰卷挑戰</button>`;
    }

    const lockedClass  = isSeqLocked ? ' boss-card--locked' : '';
    const clearedClass = isCleared ? ' boss-card--defeated' : '';

    return `
      <div class="boss-card${clearedClass}${lockedClass}">
        <div class="boss-card__img-wrap">
          <img src="${boss.image}" class="boss-card__img" alt="${boss.name}"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="boss-card__img-fallback">⚔️</div>
          ${isCleared ? '<div class="boss-card__defeated-overlay">✓</div>' : ''}
        </div>
        <div class="boss-card__info">
          <div class="boss-card__name-row">
            <span class="boss-card__name">${boss.name}</span>
            <span class="badge badge--${boss.reward.rarity.toLowerCase()}">${boss.reward.rarity}</span>
          </div>
          <div class="boss-card__desc">${boss.desc}</div>
        </div>
        <div class="boss-card__action">${actionHtml}</div>
      </div>`;
  }).join('');

  container.querySelectorAll('.boss-btn--ticket').forEach(btn => {
    btn.addEventListener('click', () => openBossTicketConfirm(btn.dataset.bossId));
  });
}

function challengeBoss(bossId) {
  const boss = BOSSES.find(b => b.id === bossId);
  if (!boss) return;
  const cleared     = loadClearedBosses();
  const isFirstTime = !cleared.includes(bossId);

  // 消耗一張挑戰卷
  consumeItem('boss_ticket');
  const remaining = getItem('boss_ticket');
  showToast(`🎫 使用挑戰卷！剩餘 ${remaining} 張`);

  startBattle(boss, isFirstTime);
}

// ─── Boss Ticket Confirm ──────────────────────────────────────────────────────
let ticketTargetBossId = null;

function openBossTicketConfirm(bossId) {
  const boss  = BOSSES.find(b => b.id === bossId);
  if (!boss) return;
  const count = getItem('boss_ticket');
  ticketTargetBossId = bossId;
  document.getElementById('ticket-confirm-boss-name').textContent = boss.name;
  document.getElementById('ticket-confirm-count').textContent     = count;
  openModal('modal-ticket-confirm');
}

function confirmBossTicketUse() {
  closeModal('modal-ticket-confirm');
  if (ticketTargetBossId) {
    const id = ticketTargetBossId;
    ticketTargetBossId = null;
    challengeBoss(id);
  }
}

// ─── Wheel Modal ─────────────────────────────────────────────────────────────
let wheelSpinning    = false;
let wheelCurrentBoss = null;

function showWheelModal(boss) {
  wheelSpinning    = false;
  wheelCurrentBoss = boss;

  // Reset disc position instantly (no transition)
  const disc = document.getElementById('wheel-disc');
  disc.style.transition = 'none';
  disc.style.transform  = 'rotate(0deg)';

  buildWheelLabels(boss);
  document.getElementById('wheel-boss-name').textContent = `恭喜打敗 ${boss.name}！轉動轉盤獲得獎勵！`;
  document.getElementById('btn-spin').disabled           = false;
  document.getElementById('btn-spin').classList.remove('hidden');
  document.getElementById('wheel-result').classList.add('hidden');

  openModal('modal-wheel');
}

function buildWheelLabels(boss) {
  const disc = document.getElementById('wheel-disc');
  disc.querySelectorAll('.wheel-label').forEach(el => el.remove());

  const R = 130; // disc radius in px (disc = 260px)
  const r = 84;  // label center distance from disc centre

  WHEEL_SEGMENTS.forEach((seg, i) => {
    const angleDeg = i * 60 + 30;
    const angleRad = angleDeg * Math.PI / 180;
    const cx = R + r * Math.sin(angleRad);
    const cy = R - r * Math.cos(angleRad);

    const label = document.createElement('div');
    label.className    = 'wheel-label';
    label.style.left   = `${cx - 30}px`;
    label.style.top    = `${cy - 28}px`;
    label.style.transform = `rotate(${angleDeg}deg)`;

    if (seg.pet) {
      label.innerHTML = `
        <img src="${boss.image}" class="wheel-boss-img" alt="${boss.name}"
             onerror="this.style.display='none';this.nextSibling.style.display='block'">
        <span style="display:none;font-size:20px">🏆</span>
        <span class="wheel-label-name">寵物</span>`;
    } else {
      label.innerHTML = `<span class="wheel-label-icon">💎</span>
        <span class="wheel-label-coins">${seg.coins}</span>`;
    }
    disc.appendChild(label);
  });
}

function pickWheelResult() {
  const total = WHEEL_SEGMENTS.reduce((s, seg) => s + seg.prob, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < WHEEL_SEGMENTS.length; i++) {
    rand -= WHEEL_SEGMENTS[i].prob;
    if (rand <= 0) return i;
  }
  return 0;
}

function doSpin() {
  if (wheelSpinning) return;
  wheelSpinning = true;
  document.getElementById('btn-spin').disabled = true;

  const resultIdx = pickWheelResult();
  const segCenter = resultIdx * 60 + 30;            // centre of target segment
  const wobble    = (Math.random() - 0.5) * 30;    // ±15° within the 60° segment
  const base      = (360 - segCenter + 360) % 360; // angle to bring that segment to top
  const totalDeg  = 5 * 360 + base + wobble;        // 5 full spins + land position

  const disc = document.getElementById('wheel-disc');
  disc.style.transition = 'transform 4.5s cubic-bezier(0.33, 1, 0.68, 1)';
  disc.style.transform  = `rotate(${totalDeg}deg)`;

  setTimeout(() => showWheelResult(resultIdx), 4800);
}

function showWheelResult(segIdx) {
  const seg     = WHEEL_SEGMENTS[segIdx];
  const boss    = wheelCurrentBoss;
  const content = document.getElementById('wheel-result-content');

  if (seg.pet) {
    const petId = boss.id.replace('boss_', 'boss_pet_');
    const isNew = !unlockedPets.includes(petId);
    if (isNew) { unlockedPets.push(petId); saveUnlockedPets(); }

    content.innerHTML = `
      <div class="wheel-result-pet">
        <div class="wheel-result-pet-frame">
          <img src="${boss.image}" class="wheel-result-pet-img" alt="${boss.name}"
               onerror="this.style.opacity='0.2'">
        </div>
        <div class="wheel-result-pet-tag${isNew ? ' new-flash' : ''}">${isNew ? '✨ NEW ✨' : '已擁有'}</div>
        <div class="wheel-result-title">獲得 BOSS 寵物！</div>
        <div class="wheel-result-subtitle">${boss.name}</div>
      </div>`;
  } else {
    addCoins(seg.coins);
    content.innerHTML = `
      <div class="wheel-result-coins">
        <div class="wheel-result-gem">💎</div>
        <div class="wheel-result-amount">+${seg.coins}</div>
        <div class="wheel-result-title">能量石獲得！</div>
      </div>`;
  }

  document.getElementById('btn-spin').classList.add('hidden');
  document.getElementById('wheel-result').classList.remove('hidden');
  wheelSpinning = false;
}

function closeWheelModal() {
  closeModal('modal-wheel');
  renderBossList();
}

// ─── Battle System ───────────────────────────────────────────────────────────
let battleLog           = [];
let battlePending       = null;
let battleFirstWin      = false;
let battleActiveTurns   = [];   // turns array shared with animation
let battleAnimMaxPetHp  = 0;
let battleAnimMaxBossHp = 0;
let battleAnimIdx       = 0;    // index of next turn to process

function startBattle(boss, isFirstTime) {
  const teamPets = getSlotPets();
  if (teamPets.length === 0) {
    showToast('巢位裡沒有寵物！請先在主頁加入寵物');
    return;
  }

  const bossLevel = boss.level;
  const bossStats = calcBossStats(boss, bossLevel);

  const teamData = teamPets.map(pet => ({
    pet,
    stats:    calcStats(pet, state.level),
    skills:   getPetSkills(pet),
    critRate: SKILL_CRIT_RATE[pet.rarity] || 0.05,
  }));

  const combinedMaxHp = teamData.reduce((sum, t) => sum + t.stats.hp, 0);
  const firstPet      = teamPets[0];
  const displayName   = teamPets.length > 1 ? `隊伍 (${teamPets.length} 隻)` : firstPet.name;

  battleLog      = [];
  battlePending  = boss;
  battleFirstWin = isFirstTime;

  const turns = simulateBattle(teamData, boss, bossStats);

  document.getElementById('battle-pet-img').src             = firstPet.image;
  document.getElementById('battle-pet-name').textContent    = displayName;
  document.getElementById('battle-boss-img').src            = boss.image;
  document.getElementById('battle-boss-name').textContent   = boss.name;
  document.getElementById('battle-log').innerHTML           = '';
  document.getElementById('battle-result-box').classList.add('hidden');
  document.getElementById('battle-pet-hp-bar').style.width  = '100%';
  document.getElementById('battle-boss-hp-bar').style.width = '100%';
  document.getElementById('battle-pet-hp-text').textContent  = `${combinedMaxHp} / ${combinedMaxHp}`;
  document.getElementById('battle-boss-hp-text').textContent = `${bossStats.hp} / ${bossStats.hp}`;
  openModal('modal-battle');

  battleActiveTurns   = turns;
  battleAnimMaxPetHp  = combinedMaxHp;
  battleAnimMaxBossHp = bossStats.hp;
  battleAnimIdx       = 0;

  document.getElementById('battle-item-panel')?.classList.add('hidden');
  animateBattleTurns();
}

const BATTLE_MAX_TURNS = 40; // cap total turn entries to keep animation under 16s

// teamData = [{ pet, stats, skills, critRate }, ...]
function simulateBattle(teamData, boss, bossStats) {
  const turns   = [];
  let bossHp    = bossStats.hp;
  const alive   = teamData.map(t => ({ ...t, hp: t.stats.hp }));
  const totalHp = alive.reduce((s, a) => s + a.stats.hp, 0);
  const combHp  = () => alive.reduce((s, a) => s + Math.max(0, a.hp), 0);

  while (bossHp > 0 && alive.some(a => a.hp > 0) && turns.length < BATTLE_MAX_TURNS) {
    // Each alive pet attacks once per round
    for (const a of alive) {
      if (a.hp <= 0 || bossHp <= 0) continue;
      const skill  = a.skills.reduce((best, s) => s.power > best.power ? s : best, a.skills[0]);
      const petAtk = calcDamage(a.stats.atk, skill.power, bossStats.def, a.critRate);
      bossHp = Math.max(0, bossHp - petAtk.dmg);
      turns.push({
        actor: 'pet', petImage: a.pet.image, petName: a.pet.name,
        skillName: skill.name, dmg: petAtk.dmg, crit: petAtk.crit,
        petHp: combHp(), bossHp,
      });
      if (bossHp <= 0) break;
    }
    if (bossHp <= 0) break;

    // Boss attacks a random alive pet
    const alivePets = alive.filter(a => a.hp > 0);
    if (!alivePets.length) break;
    const target  = alivePets[Math.floor(Math.random() * alivePets.length)];
    const bossAtk = calcDamage(bossStats.atk, 1.0, target.stats.def, 0.05);
    target.hp     = Math.max(0, target.hp - bossAtk.dmg);
    turns.push({
      actor: 'boss', skillName: '攻擊', targetName: target.pet.name,
      dmg: bossAtk.dmg, crit: bossAtk.crit, petHp: combHp(), bossHp,
    });
  }

  // Force outcome if turn cap reached
  if (turns.length >= BATTLE_MAX_TURNS) {
    const petPct  = combHp() / totalHp;
    const bossPct = bossHp / bossStats.hp;
    if (petPct >= bossPct) bossHp = 0;
    else                   alive.forEach(a => a.hp = 0);
    const last = turns[turns.length - 1];
    last.petHp  = combHp();
    last.bossHp = bossHp;
  }
  return turns;
}

const BATTLE_TURN_MS = 420; // ms per turn animation

function animateBattleTurns() {
  const idx = battleAnimIdx;
  if (idx >= battleActiveTurns.length) {
    const win = battleActiveTurns[battleActiveTurns.length - 1].bossHp <= 0;
    showBattleResult(win);
    return;
  }

  battleAnimIdx++;
  const t = battleActiveTurns[idx];
  updateBattleHPBars(t.petHp, battleAnimMaxPetHp, t.bossHp, battleAnimMaxBossHp);

  // Multi-pet: swap portrait when a different pet attacks
  if (t.actor === 'pet' && t.petImage) {
    document.getElementById('battle-pet-img').src = t.petImage;
  }

  const tgt = t.actor === 'pet' ? 'battle-boss-img' : 'battle-pet-img';
  showDamageFloat(t.actor === 'pet' ? 'battle-boss-side' : 'battle-pet-side', t.dmg, t.crit);
  const el = document.getElementById(tgt);
  el.classList.add('battle-hit');
  setTimeout(() => el.classList.remove('battle-hit'), 280);

  addBattleLog(t);

  setTimeout(animateBattleTurns, BATTLE_TURN_MS);
}

function updateBattleHPBars(petHp, maxPetHp, bossHp, maxBossHp) {
  const pp = Math.max(0, Math.round(petHp  / maxPetHp  * 100));
  const bp = Math.max(0, Math.round(bossHp / maxBossHp * 100));
  document.getElementById('battle-pet-hp-bar').style.width  = `${pp}%`;
  document.getElementById('battle-boss-hp-bar').style.width = `${bp}%`;
  document.getElementById('battle-pet-hp-text').textContent  = `${Math.max(0,petHp)} / ${maxPetHp}`;
  document.getElementById('battle-boss-hp-text').textContent = `${Math.max(0,bossHp)} / ${maxBossHp}`;
}

function showDamageFloat(sideId, dmg, crit, heal = false) {
  const side = document.getElementById(sideId);
  if (!side) return;
  const el = document.createElement('div');
  if (heal)       el.className = 'dmg-float dmg-float--heal';
  else if (crit)  el.className = 'dmg-float dmg-float--crit';
  else            el.className = 'dmg-float';
  el.textContent = heal ? `+${dmg} HP` : (crit ? '暴擊! ' : '') + dmg;
  side.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function addBattleLog(t) {
  const log = document.getElementById('battle-log');
  const li  = document.createElement('div');
  li.className = 'battle-log-entry' + (t.actor === 'pet' ? ' log-pet' : ' log-boss');
  if (t.actor === 'pet') {
    const who = t.petName ? `🐾 ${t.petName}` : '🐾 我方';
    li.textContent = `${who} 使用 ${t.skillName}，造成 ${t.dmg}${t.crit ? '(暴擊!)' : ''} 傷害`;
  } else {
    const target = t.targetName ? ` → ${t.targetName}` : '';
    li.textContent = `👹 BOSS 攻擊${target}，造成 ${t.dmg}${t.crit ? '(暴擊!)' : ''} 傷害`;
  }
  log.appendChild(li);
  log.scrollTop = log.scrollHeight;
}

function showBattleResult(win) {
  const box = document.getElementById('battle-result-box');
  box.classList.remove('hidden');

  const showWheel = win && battleFirstWin;
  if (win && battleFirstWin) {
    // First clear — save and show wheel
    const cleared = loadClearedBosses();
    if (!cleared.includes(battlePending.id)) {
      cleared.push(battlePending.id);
      saveClearedBosses(cleared);
    }
  }

  document.getElementById('battle-result-title').textContent = win ? '🏆 勝利！' : '💀 戰敗';
  document.getElementById('battle-result-desc').textContent  = win
    ? (showWheel ? '精彩！繼續旋轉轉盤獲取獎勵！' : `${battlePending?.name || 'BOSS'} 已在記錄中！`)
    : `${battlePending?.name || 'BOSS'} 太強大，繼續升等再挑戰！`;

  const btn = document.getElementById('btn-battle-close');
  btn.textContent  = showWheel ? '🎡 轉動轉盤！' : '確認';
  btn.dataset.wheel = showWheel ? '1' : '0';
}

function closeBattleModal() {
  const btn   = document.getElementById('btn-battle-close');
  const wheel = btn?.dataset.wheel === '1';
  const boss  = battlePending;
  battlePending  = null;
  battleFirstWin = false;
  closeModal('modal-battle');
  renderBossList();
  if (wheel && boss) {
    setTimeout(() => showWheelModal(boss), 200);
  }
}

function initExploreCards() {
  document.querySelectorAll('.shop-card[data-explore] .shop-card__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.closest('.shop-card')?.dataset.explore;
      if      (type === 'boss')  showBossPage();
      else if (type === 'world') showWorldPage();
    });
  });
  document.getElementById('btn-explore-boss-back')?.addEventListener('click', hideBossPage);
  document.getElementById('btn-world-back')?.addEventListener('click',   hideWorldPage);
  document.getElementById('btn-world-locate')?.addEventListener('click', () => {
    if (worldPlayerLat !== null && worldMap) worldMap.setView([worldPlayerLat, worldPlayerLng], 16);
  });
  document.getElementById('btn-world-manual')?.addEventListener('click', () => {
    document.getElementById('world-manual-location')?.classList.remove('hidden');
  });
  document.getElementById('btn-world-manual-cancel')?.addEventListener('click', () => {
    document.getElementById('world-manual-location')?.classList.add('hidden');
  });
  document.getElementById('btn-world-manual-confirm')?.addEventListener('click', () => {
    const lat = parseFloat(document.getElementById('world-lat-input')?.value);
    const lng = parseFloat(document.getElementById('world-lng-input')?.value);
    if (!isNaN(lat) && !isNaN(lng)) {
      document.getElementById('world-manual-location')?.classList.add('hidden');
      document.getElementById('world-gps-denied')?.classList.add('hidden');
      updateWorldPlayerPos(lat, lng);
      const existing = loadWorldChests();
      placeWorldChestMarkers(existing || generateWorldChests(lat, lng));
    } else {
      showToast('請輸入有效的緯度和經度');
    }
  });
}

// ─── World Map ────────────────────────────────────────────────────────────────
let worldMap            = null;
let worldPlayerMarker   = null;
let worldPlayerLat      = null;
let worldPlayerLng      = null;
let worldWatchId        = null;
let worldChestMarkers   = [];   // [{ marker, chest }]

const WORLD_GLOW_DIST   = 50;   // metres — show glow + allow collect
const WORLD_MIN_DIST    = 100;  // metres — min spawn distance from player
const WORLD_MAX_DIST    = 500;  // metres — max spawn distance
const WORLD_MIN_CHESTS  = 3;
const WORLD_MAX_CHESTS  = 5;
const WORLD_RESPAWN_MS  = 30 * 60 * 1000;  // 30 minutes

// Haversine distance (metres)
function worldDist(lat1, lng1, lat2, lng2) {
  const R  = 6371000;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;
  const a  = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Random point dist metres away from lat/lng
function randomNearbyPoint(lat, lng, minM, maxM) {
  const dist    = minM + Math.random() * (maxM - minM);
  const bearing = Math.random() * 2 * Math.PI;
  const R       = 6371000;
  const δ       = dist / R;
  const φ1      = lat * Math.PI / 180;
  const λ1      = lng * Math.PI / 180;
  const φ2      = Math.asin(Math.sin(φ1)*Math.cos(δ) + Math.cos(φ1)*Math.sin(δ)*Math.cos(bearing));
  const λ2      = λ1 + Math.atan2(Math.sin(bearing)*Math.sin(δ)*Math.cos(φ1), Math.cos(δ) - Math.sin(φ1)*Math.sin(φ2));
  return { lat: φ2 * 180 / Math.PI, lng: λ2 * 180 / Math.PI };
}

function loadWorldChests() {
  try {
    const raw = localStorage.getItem('worldChests');
    if (!raw) return null;
    const data = JSON.parse(raw);
    const allDone = data.chests.every(c => c.collected);
    if (allDone && Date.now() - data.generatedAt >= WORLD_RESPAWN_MS) return null;
    return data;
  } catch { return null; }
}

function saveWorldChests(data) {
  localStorage.setItem('worldChests', JSON.stringify(data));
}

function generateWorldChests(lat, lng) {
  const count  = WORLD_MIN_CHESTS + Math.floor(Math.random() * (WORLD_MAX_CHESTS - WORLD_MIN_CHESTS + 1));
  const chests = Array.from({ length: count }, (_, i) => {
    const pt = randomNearbyPoint(lat, lng, WORLD_MIN_DIST, WORLD_MAX_DIST);
    return { id: `chest_${Date.now()}_${i}`, lat: pt.lat, lng: pt.lng, collected: false };
  });
  const data = { chests, generatedAt: Date.now() };
  saveWorldChests(data);
  return data;
}

function createPlayerIcon() {
  return L.divIcon({
    className: '',
    html: '<div class="world-player-dot"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

function createChestIcon(glowing) {
  return L.divIcon({
    className: '',
    html: `<div class="world-chest-icon${glowing ? ' world-chest-icon--glow' : ''}">🎁</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

function updateWorldHUD() {
  const remaining = worldChestMarkers.filter(cm => !cm.chest.collected).length;
  const gemEl   = document.getElementById('world-hud-gems');
  const chestEl = document.getElementById('world-hud-chests');
  if (gemEl)   gemEl.textContent   = state.coins ?? 0;
  if (chestEl) chestEl.textContent = remaining;
}

function placeWorldChestMarkers(data) {
  // Clear existing
  worldChestMarkers.forEach(cm => { try { worldMap.removeLayer(cm.marker); } catch {} });
  worldChestMarkers = [];
  data.chests.filter(c => !c.collected).forEach(chest => {
    const marker = L.marker([chest.lat, chest.lng], { icon: createChestIcon(false) }).addTo(worldMap);
    const cm = { marker, chest };
    marker.on('click', () => tryCollectChest(cm));
    worldChestMarkers.push(cm);
  });
  updateWorldHUD();
}

function tryCollectChest(cm) {
  if (worldPlayerLat === null || cm.chest.collected) return;
  const dist = worldDist(worldPlayerLat, worldPlayerLng, cm.chest.lat, cm.chest.lng);
  if (dist > WORLD_GLOW_DIST) { showToast('🎁 走近一點才能收取！'); return; }
  collectWorldChest(cm);
}

function collectWorldChest(cm) {
  cm.chest.collected = true;
  try { worldMap.removeLayer(cm.marker); } catch {}
  worldChestMarkers = worldChestMarkers.filter(x => x !== cm);

  const reward = 50 + Math.floor(Math.random() * 51);
  state.coins = (state.coins || 0) + reward;
  saveState();
  showWorldGemFloat(reward);
  showToast(`💎 獲得 ${reward} 能量石！`);
  updateWorldHUD();
  renderCoins();

  // Persist collected state
  const raw = localStorage.getItem('worldChests');
  if (raw) {
    const data = JSON.parse(raw);
    const idx  = data.chests.findIndex(c => c.id === cm.chest.id);
    if (idx >= 0) { data.chests[idx].collected = true; saveWorldChests(data); }
  }

  if (worldChestMarkers.length === 0) {
    showToast('🎉 所有寶箱都收集完了！30 分鐘後重新生成');
  }
}

function showWorldGemFloat(amount) {
  const container = document.getElementById('world-map');
  if (!container) return;
  const el = document.createElement('div');
  el.className   = 'world-gem-float';
  el.textContent = `+${amount} 💎`;
  el.style.left  = `${20 + Math.random() * 60}%`;
  el.style.top   = '45%';
  container.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

function updateWorldPlayerPos(lat, lng) {
  worldPlayerLat = lat;
  worldPlayerLng = lng;
  if (!worldPlayerMarker) {
    worldPlayerMarker = L.marker([lat, lng], {
      icon: createPlayerIcon(), zIndexOffset: 1000,
    }).addTo(worldMap);
    worldMap.setView([lat, lng], 16);
  } else {
    worldPlayerMarker.setLatLng([lat, lng]);
  }
  // Update chest glow state
  worldChestMarkers.forEach(cm => {
    if (cm.chest.collected) return;
    const dist   = worldDist(lat, lng, cm.chest.lat, cm.chest.lng);
    const glowing = dist <= WORLD_GLOW_DIST;
    cm.marker.setIcon(createChestIcon(glowing));
  });
}

function onWorldGPSPosition(pos) {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  document.getElementById('world-gps-denied')?.classList.add('hidden');
  updateWorldPlayerPos(lat, lng);
  // Generate chests if first time or all respawned
  const existing = loadWorldChests();
  if (!existing) {
    placeWorldChestMarkers(generateWorldChests(lat, lng));
  } else if (worldChestMarkers.length === 0) {
    placeWorldChestMarkers(existing);
  }
}

function startWorldGPS() {
  if (!navigator.geolocation) {
    document.getElementById('world-gps-denied')?.classList.remove('hidden');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    onWorldGPSPosition,
    () => document.getElementById('world-gps-denied')?.classList.remove('hidden'),
    { enableHighAccuracy: true, timeout: 10000 }
  );
  worldWatchId = navigator.geolocation.watchPosition(
    onWorldGPSPosition,
    () => {},
    { enableHighAccuracy: true, maximumAge: 10000 }
  );
}

function showWorldPage() {
  document.getElementById('tab-explore')?.classList.add('map-active');
  document.getElementById('explore-lobby').style.display      = 'none';
  document.getElementById('explore-world-sub').style.display  = 'flex';
  updateWorldHUD();
  if (!worldMap) {
    worldMap = L.map('world-map', { zoomControl: false, attributionControl: false });
    L.control.zoom({ position: 'bottomright' }).addTo(worldMap);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(worldMap);
    worldMap.setView([25.0330, 121.5654], 14);
    // Load cached chests if any (non-GPS preview)
    const existing = loadWorldChests();
    if (existing) placeWorldChestMarkers(existing);
  }
  setTimeout(() => worldMap.invalidateSize(), 150);
  startWorldGPS();
}

function hideWorldPage() {
  document.getElementById('tab-explore')?.classList.remove('map-active');
  document.getElementById('explore-world-sub').style.display = 'none';
  document.getElementById('explore-lobby').style.display     = 'flex';
  if (worldWatchId !== null) {
    navigator.geolocation?.clearWatch(worldWatchId);
    worldWatchId = null;
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
function init() {
  checkDailyPPReset();
  if (!selectedPetId) {
    selectedPetId = 'pet1';
    localStorage.setItem('selectedPetId', selectedPetId);
  }
  migrateTeamToSlots();         // one-time: copy team → petSlots if needed
  state = loadState();          // always reload to pick up correct display pet
  migrateItemsToInventory();    // one-time: move state.items → inventory
  renderAll();
  initSlotScroll();
  initTabs();
  initModals();
  initBottomNav();
  initActions();
  initShop();
  initShopCards();
  initGacha();
  initExploreCards();
  setInterval(decayStats, DECAY_INTERVAL);
}

document.addEventListener('DOMContentLoaded', init);
