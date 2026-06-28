'use strict';

// ─── Constants ───────────────────────────────────────────────────────────────
const EXP_PER_LEVEL  = 100;
const DECAY_INTERVAL = 60_000;

const PETS = [
  { id: 'pet1',  name: '小狗',   nameKey: 'pet.pet1.name',  rarity: 'F',  image: 'assets/pets/小狗.png',   skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet2',  name: '柴犬',   nameKey: 'pet.pet2.name',  rarity: 'F',  image: 'assets/pets/柴犬.png',   skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet3',  name: '臘腸狗', nameKey: 'pet.pet3.name',  rarity: 'F',  image: 'assets/pets/臘腸狗.png', skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet4',  name: '柯基',   nameKey: 'pet.pet4.name',  rarity: 'F',  image: 'assets/pets/柯基.png',   skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet5',  name: '比格犬', nameKey: 'pet.pet5.name',  rarity: 'R',  image: 'assets/pets/比格犬.png', skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 10 }, { name: '撕咬', nameKey: 'skill.bite2', desc: '憤怒地咬住敵人不放', descKey: 'skill.bite2.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP:  5 }] },
  { id: 'pet6',  name: '米克斯', nameKey: 'pet.pet6.name',  rarity: 'R',  image: 'assets/pets/米克斯.png', skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 10 }, { name: '撕咬', nameKey: 'skill.bite2', desc: '憤怒地咬住敵人不放', descKey: 'skill.bite2.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP:  5 }] },
  { id: 'pet7',  name: '貴賓狗', nameKey: 'pet.pet7.name',  rarity: 'R',  image: 'assets/pets/貴賓狗.png', skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 10 }, { name: '撕咬', nameKey: 'skill.bite2', desc: '憤怒地咬住敵人不放', descKey: 'skill.bite2.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP:  5 }] },
  { id: 'pet8',  name: '比熊',   nameKey: 'pet.pet8.name',  rarity: 'R',  image: 'assets/pets/比熊.png',   skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 10 }, { name: '撕咬', nameKey: 'skill.bite2', desc: '憤怒地咬住敵人不放', descKey: 'skill.bite2.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP:  5 }] },
  { id: 'pet9',  name: '德牧',   nameKey: 'pet.pet9.name',  rarity: 'SR', image: 'assets/pets/德牧.png',   skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 15 }, { name: '撕咬', nameKey: 'skill.bite2', desc: '憤怒地咬住敵人不放', descKey: 'skill.bite2.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 10 }, { name: '強咬', nameKey: 'skill.bite3', desc: '以獵犬本能發動致命一咬', descKey: 'skill.bite3.desc', effect: 'atk', power: 2.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet10', name: '邊牧',   nameKey: 'pet.pet10.name', rarity: 'SR', image: 'assets/pets/邊牧.png',   skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 15 }, { name: '撕咬', nameKey: 'skill.bite2', desc: '憤怒地咬住敵人不放', descKey: 'skill.bite2.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 10 }, { name: '強咬', nameKey: 'skill.bite3', desc: '以獵犬本能發動致命一咬', descKey: 'skill.bite3.desc', effect: 'atk', power: 2.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet11', name: '伯恩山', nameKey: 'pet.pet11.name', rarity: 'SR', image: 'assets/pets/伯恩山.png', skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 15 }, { name: '撕咬', nameKey: 'skill.bite2', desc: '憤怒地咬住敵人不放', descKey: 'skill.bite2.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 10 }, { name: '強咬', nameKey: 'skill.bite3', desc: '以獵犬本能發動致命一咬', descKey: 'skill.bite3.desc', effect: 'atk', power: 2.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet12', name: '牧羊犬', nameKey: 'pet.pet12.name', rarity: 'SR', image: 'assets/pets/牧羊犬.png', skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 15 }, { name: '撕咬', nameKey: 'skill.bite2', desc: '憤怒地咬住敵人不放', descKey: 'skill.bite2.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 10 }, { name: '強咬', nameKey: 'skill.bite3', desc: '以獵犬本能發動致命一咬', descKey: 'skill.bite3.desc', effect: 'atk', power: 2.0, icon: '🦷', maxPP:  5 }] },
  { id: 'pet13', name: '橘貓',       nameKey: 'pet.pet13.name', rarity: 'F',  image: 'assets/pets/橘貓.png',       skills: [{ name: '抓', nameKey: 'skill.scratch', desc: '伸出利爪抓向敵人', descKey: 'skill.scratch.desc', effect: 'atk', power: 1.0, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet14', name: '灰貓',       nameKey: 'pet.pet14.name', rarity: 'F',  image: 'assets/pets/灰貓.png',       skills: [{ name: '抓', nameKey: 'skill.scratch', desc: '伸出利爪抓向敵人', descKey: 'skill.scratch.desc', effect: 'atk', power: 1.0, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet15', name: '白貓',       nameKey: 'pet.pet15.name', rarity: 'F',  image: 'assets/pets/白貓.png',       skills: [{ name: '抓', nameKey: 'skill.scratch', desc: '伸出利爪抓向敵人', descKey: 'skill.scratch.desc', effect: 'atk', power: 1.0, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet16', name: '黑貓',       nameKey: 'pet.pet16.name', rarity: 'F',  image: 'assets/pets/黑貓.png',       skills: [{ name: '抓', nameKey: 'skill.scratch', desc: '伸出利爪抓向敵人', descKey: 'skill.scratch.desc', effect: 'atk', power: 1.0, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet17', name: '英國短毛貓', nameKey: 'pet.pet17.name', rarity: 'R',  image: 'assets/pets/英國短毛貓.png', skills: [{ name: '抓', nameKey: 'skill.scratch', desc: '伸出利爪抓向敵人', descKey: 'skill.scratch.desc', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '亂抓', nameKey: 'skill.scratch2', desc: '瘋狂揮舞爪子攻擊', descKey: 'skill.scratch2.desc', effect: 'atk', power: 1.5, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet18', name: '牛奶貓',     nameKey: 'pet.pet18.name', rarity: 'R',  image: 'assets/pets/牛奶貓.png',     skills: [{ name: '抓', nameKey: 'skill.scratch', desc: '伸出利爪抓向敵人', descKey: 'skill.scratch.desc', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '亂抓', nameKey: 'skill.scratch2', desc: '瘋狂揮舞爪子攻擊', descKey: 'skill.scratch2.desc', effect: 'atk', power: 1.5, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet19', name: '布偶貓',     nameKey: 'pet.pet19.name', rarity: 'R',  image: 'assets/pets/布偶貓.png',     skills: [{ name: '抓', nameKey: 'skill.scratch', desc: '伸出利爪抓向敵人', descKey: 'skill.scratch.desc', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '亂抓', nameKey: 'skill.scratch2', desc: '瘋狂揮舞爪子攻擊', descKey: 'skill.scratch2.desc', effect: 'atk', power: 1.5, icon: '🐾', maxPP:  5, currentPP:  5 }] },
  { id: 'pet20', name: '三花貓',     nameKey: 'pet.pet20.name', rarity: 'SR', image: 'assets/pets/三花貓.png',     skills: [{ name: '抓', nameKey: 'skill.scratch', desc: '伸出利爪快速抓向敵人', descKey: 'skill.scratch.desc', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 15, currentPP: 15 }, { name: '亂抓', nameKey: 'skill.scratch2', desc: '瘋狂揮舞爪子攻擊', descKey: 'skill.scratch2.desc', effect: 'atk', power: 1.5, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '快速亂抓', nameKey: 'skill.scratch3', desc: '瘋狂揮舞爪子快速攻擊', descKey: 'skill.scratch3.desc', effect: 'atk', power: 2.0, icon: '🌑', maxPP:  5, currentPP:  5 }] },
  { id: 'pet21', name: '波斯貓',     nameKey: 'pet.pet21.name', rarity: 'SR', image: 'assets/pets/波斯貓.png',     skills: [{ name: '抓', nameKey: 'skill.scratch', desc: '伸出利爪快速抓向敵人', descKey: 'skill.scratch.desc', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 15, currentPP: 15 }, { name: '亂抓', nameKey: 'skill.scratch2', desc: '瘋狂揮舞爪子攻擊', descKey: 'skill.scratch2.desc', effect: 'atk', power: 1.5, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '快速亂抓', nameKey: 'skill.scratch3', desc: '瘋狂揮舞爪子快速攻擊', descKey: 'skill.scratch3.desc', effect: 'atk', power: 2.0, icon: '🌑', maxPP:  5, currentPP:  5 }] },
  { id: 'pet22', name: '緬因貓',     nameKey: 'pet.pet22.name', rarity: 'SR', image: 'assets/pets/緬因貓.png',     skills: [{ name: '抓', nameKey: 'skill.scratch', desc: '伸出利爪快速抓向敵人', descKey: 'skill.scratch.desc', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 15, currentPP: 15 }, { name: '亂抓', nameKey: 'skill.scratch2', desc: '瘋狂揮舞爪子攻擊', descKey: 'skill.scratch2.desc', effect: 'atk', power: 1.5, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '快速亂抓', nameKey: 'skill.scratch3', desc: '瘋狂揮舞爪子快速攻擊', descKey: 'skill.scratch3.desc', effect: 'atk', power: 2.0, icon: '🌑', maxPP:  5, currentPP:  5 }] },
  { id: 'pet23', name: '狐狸',       nameKey: 'pet.pet23.name', rarity: 'R',  image: 'assets/pets/狐狸.png', skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 10, currentPP: 10 }, { name: '撕咬', nameKey: 'skill.bite2', desc: '憤怒地咬住敵人不放', descKey: 'skill.bite2.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 5, currentPP: 5 }] },
  { id: 'pet24', name: '小豬',         nameKey: 'pet.pet24.name', rarity: 'F',  image: 'assets/pets/小豬.png',         skills: [{ name: '撞', nameKey: 'skill.charge', desc: '低頭用身體衝撞敵人', descKey: 'skill.charge.desc', effect: 'atk', power: 1.0, icon: '💨', maxPP:  5, currentPP:  5 }] },
  { id: 'pet25', name: '麝香豬',       nameKey: 'pet.pet25.name', rarity: 'R',  image: 'assets/pets/麝香豬.png',       skills: [{ name: '撞', nameKey: 'skill.charge', desc: '低頭用身體撞敵人', descKey: 'skill.charge.desc', effect: 'atk', power: 1.0, icon: '💨', maxPP: 10, currentPP: 10 }, { name: '衝撞', nameKey: 'skill.charge2', desc: '低頭用身體全力衝撞敵人', descKey: 'skill.charge2.desc', effect: 'atk', power: 1.5, icon: '💥', maxPP: 5, currentPP: 5 }] },
  { id: 'pet26', name: '灰兔',   nameKey: 'pet.pet26.name', rarity: 'F',  image: 'assets/pets/灰兔.png',   skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5, currentPP:  5 }] },
  { id: 'pet27', name: '黑兔',   nameKey: 'pet.pet27.name', rarity: 'F',  image: 'assets/pets/黑兔.png',   skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5, currentPP:  5 }] },
  { id: 'pet28', name: '白兔',   nameKey: 'pet.pet28.name', rarity: 'F',  image: 'assets/pets/白兔.png',   skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP:  5, currentPP:  5 }] },
  { id: 'pet29', name: '道奇兔', nameKey: 'pet.pet29.name', rarity: 'R',  image: 'assets/pets/道奇兔.png', skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 10, currentPP: 10 }, { name: '撕咬', nameKey: 'skill.bite2', desc: '憤怒地咬住敵人不放', descKey: 'skill.bite2.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 5, currentPP: 5 }] },
  { id: 'pet30', name: '庫你迷你豬',   nameKey: 'pet.pet30.name', rarity: 'R',  image: 'assets/pets/庫你迷你豬.png',   skills: [{ name: '撞', nameKey: 'skill.charge', desc: '低頭用身體撞敵人', descKey: 'skill.charge.desc', effect: 'atk', power: 1.0, icon: '💨', maxPP: 10, currentPP: 10 }, { name: '衝撞', nameKey: 'skill.charge2', desc: '低頭用身體全力衝撞敵人', descKey: 'skill.charge2.desc', effect: 'atk', power: 1.5, icon: '💥', maxPP: 5, currentPP: 5 }] },
  { id: 'pet31', name: '迷你豬',       nameKey: 'pet.pet31.name', rarity: 'SR', image: 'assets/pets/迷你豬.png',       skills: [{ name: '撞', nameKey: 'skill.charge', desc: '低頭用身體衝撞敵人', descKey: 'skill.charge.desc', effect: 'atk', power: 1.0, icon: '💨', maxPP: 15, currentPP: 15 }, { name: '衝撞', nameKey: 'skill.charge2', desc: '低頭用身體全力衝撞敵人', descKey: 'skill.charge2.desc', effect: 'atk', power: 1.5, icon: '💥', maxPP: 10, currentPP: 10 }, { name: '猛力頭槌', nameKey: 'skill.charge3', desc: '蓄力後以頭部猛烈撞擊', descKey: 'skill.charge3.desc', effect: 'atk', power: 2.0, icon: '🌪️', maxPP: 5, currentPP: 5 }] },
  { id: 'pet32', name: '長耳兔', nameKey: 'pet.pet32.name', rarity: 'SR', image: 'assets/pets/長耳兔.png', skills: [{ name: '咬', nameKey: 'skill.bite', desc: '用尖牙狠狠咬住敵人', descKey: 'skill.bite.desc', effect: 'atk', power: 1.0, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '撕咬', nameKey: 'skill.bite2', desc: '憤怒地咬住敵人不放', descKey: 'skill.bite2.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 10, currentPP: 10 }, { name: '強咬', nameKey: 'skill.bite3', desc: '以獵犬本能發動致命一咬', descKey: 'skill.bite3.desc', effect: 'atk', power: 2.0, icon: '🦷', maxPP: 5, currentPP: 5 }] },
  { id: 'pet33', name: '海福特牛',     nameKey: 'pet.pet33.name', rarity: 'SR', image: 'assets/pets/海福特牛.png',     skills: [{ name: '撞', nameKey: 'skill.charge', desc: '低頭用身體衝撞敵人', descKey: 'skill.charge.desc', effect: 'atk', power: 1.0, icon: '💨', maxPP: 15, currentPP: 15 }, { name: '衝撞', nameKey: 'skill.charge2', desc: '低頭用身體全力衝撞敵人', descKey: 'skill.charge2.desc', effect: 'atk', power: 1.5, icon: '💥', maxPP: 10, currentPP: 10 }, { name: '猛力頭槌', nameKey: 'skill.charge3', desc: '蓄力後以頭部猛烈撞擊', descKey: 'skill.charge3.desc', effect: 'atk', power: 2.0, icon: '🌪️', maxPP: 5, currentPP: 5 }] },
  { id: 'pet34', name: '牡丹鸚鵡',     nameKey: 'pet.pet34.name', rarity: 'F',  image: 'assets/pets/牡丹鸚鵡.png',     skills: [{ name: '啄擊', nameKey: 'skill.peck', desc: '用尖嘴啄向敵人', descKey: 'skill.peck.desc', effect: 'atk', power: 1.0, icon: '🐦', maxPP:  5, currentPP:  5 }] },
  { id: 'pet35', name: '折衷鸚鵡',     nameKey: 'pet.pet35.name', rarity: 'F',  image: 'assets/pets/折衷鸚鵡.png',     skills: [{ name: '啄擊', nameKey: 'skill.peck', desc: '用尖嘴啄向敵人', descKey: 'skill.peck.desc', effect: 'atk', power: 1.0, icon: '🐦', maxPP:  5, currentPP:  5 }] },
  { id: 'pet36', name: '虎皮鸚鵡',     nameKey: 'pet.pet36.name', rarity: 'R',  image: 'assets/pets/虎皮鸚鵡.png',     skills: [{ name: '啄擊', nameKey: 'skill.peck', desc: '用尖嘴啄向敵人', descKey: 'skill.peck.desc', effect: 'atk', power: 1.0, icon: '🐦', maxPP: 10, currentPP: 10 }, { name: '快速啄擊', nameKey: 'skill.peck2', desc: '快速啄擊敵人', descKey: 'skill.peck2.desc', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 5, currentPP: 5 }] },
  { id: 'pet37', name: '玄風鸚鵡',     nameKey: 'pet.pet37.name', rarity: 'R',  image: 'assets/pets/玄風鸚鵡.png',     skills: [{ name: '啄擊', nameKey: 'skill.peck', desc: '用尖嘴啄向敵人', descKey: 'skill.peck.desc', effect: 'atk', power: 1.0, icon: '🐦', maxPP: 10, currentPP: 10 }, { name: '快速啄擊', nameKey: 'skill.peck2', desc: '快速啄擊敵人', descKey: 'skill.peck2.desc', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 5, currentPP: 5 }] },
  { id: 'pet38', name: '非洲灰鸚鵡',   nameKey: 'pet.pet38.name', rarity: 'SR', image: 'assets/pets/非洲灰鸚鵡.png',   skills: [{ name: '啄擊', nameKey: 'skill.peck', desc: '用尖嘴啄向敵人', descKey: 'skill.peck.desc', effect: 'atk', power: 1.0, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '快速啄擊', nameKey: 'skill.peck2', desc: '快速啄擊敵人', descKey: 'skill.peck2.desc', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 10, currentPP: 10 }, { name: '連續猛啄', nameKey: 'skill.peck3', desc: '連續啄擊敵人多次', descKey: 'skill.peck3.desc', effect: 'atk', power: 2.0, icon: '🦅', maxPP: 5, currentPP: 5 }] },
  { id: 'pet39', name: '鳳頭巴丹鸚鵡', nameKey: 'pet.pet39.name', rarity: 'SR', image: 'assets/pets/鳳頭巴丹鸚鵡.png', skills: [{ name: '啄擊', nameKey: 'skill.peck', desc: '用尖嘴啄向敵人', descKey: 'skill.peck.desc', effect: 'atk', power: 1.0, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '快速啄擊', nameKey: 'skill.peck2', desc: '快速啄擊敵人', descKey: 'skill.peck2.desc', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 10, currentPP: 10 }, { name: '連續猛啄', nameKey: 'skill.peck3', desc: '連續啄擊敵人多次', descKey: 'skill.peck3.desc', effect: 'atk', power: 2.0, icon: '🦅', maxPP: 5, currentPP: 5 }] },
  { id: 'pet40', name: '雞',           nameKey: 'pet.pet40.name', rarity: 'R',  image: 'assets/pets/雞.png',           skills: [{ name: '啄擊', nameKey: 'skill.peck', desc: '用尖嘴啄向敵人', descKey: 'skill.peck.desc', effect: 'atk', power: 1.0, icon: '🐔', maxPP: 10, currentPP: 10 }, { name: '快速啄擊', nameKey: 'skill.peck2', desc: '快速啄擊敵人', descKey: 'skill.peck2.desc', effect: 'atk', power: 1.5, icon: '🐔', maxPP: 5, currentPP: 5 }] },
  { id: 'pet41', name: '小鴨',         nameKey: 'pet.pet41.name', rarity: 'R',  image: 'assets/pets/小鴨.png',         skills: [{ name: '啄擊', nameKey: 'skill.peck', desc: '用尖嘴啄向敵人', descKey: 'skill.peck.desc', effect: 'atk', power: 1.0, icon: '🦆', maxPP: 10, currentPP: 10 }, { name: '快速啄擊', nameKey: 'skill.peck2', desc: '快速啄擊敵人', descKey: 'skill.peck2.desc', effect: 'atk', power: 1.5, icon: '🦆', maxPP: 5, currentPP: 5 }] },
  { id: 'pet42', name: '水豚',         nameKey: 'pet.pet42.name', rarity: 'SR', image: 'assets/pets/水豚.png',         skills: [{ name: '撞', nameKey: 'skill.charge', desc: '低頭用身體衝撞敵人', descKey: 'skill.charge.desc', effect: 'atk', power: 1.0, icon: '💨', maxPP: 15, currentPP: 15 }, { name: '衝撞', nameKey: 'skill.charge2', desc: '低頭用身體全力衝撞敵人', descKey: 'skill.charge2.desc', effect: 'atk', power: 1.5, icon: '💥', maxPP: 10, currentPP: 10 }, { name: '猛力頭槌', nameKey: 'skill.charge3', desc: '蓄力後以頭部猛烈撞擊', descKey: 'skill.charge3.desc', effect: 'atk', power: 2.0, icon: '🌪️', maxPP: 5, currentPP: 5 }] },
  { id: 'pet43', name: '樹麻雀',       nameKey: 'pet.pet43.name', rarity: 'R',  image: 'assets/pets/樹麻雀.png',       skills: [{ name: '啄擊', nameKey: 'skill.peck', desc: '用尖嘴啄向敵人', descKey: 'skill.peck.desc', effect: 'atk', power: 1.0, icon: '🐦', maxPP: 10, currentPP: 10 }, { name: '快速啄擊', nameKey: 'skill.peck2', desc: '快速啄擊敵人', descKey: 'skill.peck2.desc', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 5, currentPP: 5 }] },
  { id: 'pet44', name: '紅頭山雀',     nameKey: 'pet.pet44.name', rarity: 'SR', image: 'assets/pets/紅頭山雀.png',     skills: [{ name: '啄擊', nameKey: 'skill.peck', desc: '用尖嘴啄向敵人', descKey: 'skill.peck.desc', effect: 'atk', power: 1.0, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '快速啄擊', nameKey: 'skill.peck2', desc: '快速啄擊敵人', descKey: 'skill.peck2.desc', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 10, currentPP: 10 }, { name: '連續猛啄', nameKey: 'skill.peck3', desc: '連續啄擊敵人多次', descKey: 'skill.peck3.desc', effect: 'atk', power: 2.0, icon: '🦅', maxPP: 5, currentPP: 5 }] },
  { id: 'pet45', name: '黃牛',         nameKey: 'pet.pet45.name', rarity: 'F',  image: 'assets/pets/黃牛.png',         skills: [{ name: '撞', nameKey: 'skill.charge', desc: '低頭用身體衝撞敵人', descKey: 'skill.charge.desc', effect: 'atk', power: 1.0, icon: '💨', maxPP:  5, currentPP:  5 }] },
  { id: 'pet46', name: '荷斯坦牛',     nameKey: 'pet.pet46.name', rarity: 'R',  image: 'assets/pets/荷斯坦牛.png',     skills: [{ name: '撞', nameKey: 'skill.charge', desc: '低頭用身體撞敵人', descKey: 'skill.charge.desc', effect: 'atk', power: 1.0, icon: '💨', maxPP: 10, currentPP: 10 }, { name: '衝撞', nameKey: 'skill.charge2', desc: '低頭用身體全力衝撞敵人', descKey: 'skill.charge2.desc', effect: 'atk', power: 1.5, icon: '💥', maxPP: 5, currentPP: 5 }] },
  { id: 'pet47', name: '浣熊',         nameKey: 'pet.pet47.name', rarity: 'R',  image: 'assets/pets/浣熊.png',  skills: [{ name: '抓', nameKey: 'skill.scratch', desc: '伸出利爪抓向敵人', descKey: 'skill.scratch.desc', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '亂抓', nameKey: 'skill.scratch2', desc: '瘋狂揮舞爪子攻擊', descKey: 'skill.scratch2.desc', effect: 'atk', power: 1.5, icon: '🐾', maxPP: 5, currentPP: 5 }] },
  { id: 'pet48', name: '山羌',   nameKey: 'pet.pet48.name', rarity: 'R',  image: 'assets/pets/山羌.png',   skills: [{ name: '撞', nameKey: 'skill.charge', desc: '低頭用身體撞敵人', descKey: 'skill.charge.desc', effect: 'atk', power: 1.0, icon: '💨', maxPP: 10, currentPP: 10 }, { name: '衝撞', nameKey: 'skill.charge2', desc: '低頭用身體全力衝撞敵人', descKey: 'skill.charge2.desc', effect: 'atk', power: 1.5, icon: '💥', maxPP: 5, currentPP: 5 }] },
  { id: 'pet49', name: '梅花鹿', nameKey: 'pet.pet49.name', rarity: 'SR', image: 'assets/pets/梅花鹿.png', skills: [{ name: '撞', nameKey: 'skill.charge', desc: '低頭用身體衝撞敵人', descKey: 'skill.charge.desc', effect: 'atk', power: 1.0, icon: '💨', maxPP: 15, currentPP: 15 }, { name: '衝撞', nameKey: 'skill.charge2', desc: '低頭用身體全力衝撞敵人', descKey: 'skill.charge2.desc', effect: 'atk', power: 1.5, icon: '💥', maxPP: 10, currentPP: 10 }, { name: '猛力頭槌', nameKey: 'skill.charge3', desc: '蓄力後以頭部猛烈撞擊', descKey: 'skill.charge3.desc', effect: 'atk', power: 2.0, icon: '🌪️', maxPP: 5, currentPP: 5 }] },
  { id: 'pet50', name: '綿羊',         nameKey: 'pet.pet50.name', rarity: 'R',  image: 'assets/pets/綿羊.png',         skills: [{ name: '撞', nameKey: 'skill.charge', desc: '低頭用身體撞敵人', descKey: 'skill.charge.desc', effect: 'atk', power: 1.0, icon: '💨', maxPP: 10, currentPP: 10 }, { name: '衝撞', nameKey: 'skill.charge2', desc: '低頭用身體全力衝撞敵人', descKey: 'skill.charge2.desc', effect: 'atk', power: 1.5, icon: '💥', maxPP: 5, currentPP: 5 }] },
  { id: 'pet51', name: '紅浣熊',       nameKey: 'pet.pet51.name', rarity: 'SR', image: 'assets/pets/紅浣熊.png', skills: [{ name: '抓', nameKey: 'skill.scratch', desc: '伸出利爪快速抓向敵人', descKey: 'skill.scratch.desc', effect: 'atk', power: 1.0, icon: '🐾', maxPP: 15, currentPP: 15 }, { name: '亂抓', nameKey: 'skill.scratch2', desc: '瘋狂揮舞爪子攻擊', descKey: 'skill.scratch2.desc', effect: 'atk', power: 1.5, icon: '🐾', maxPP: 10, currentPP: 10 }, { name: '快速亂抓', nameKey: 'skill.scratch3', desc: '瘋狂揮舞爪子快速攻擊', descKey: 'skill.scratch3.desc', effect: 'atk', power: 2.0, icon: '🌑', maxPP: 5, currentPP: 5 }] },
  // ── Boss Pets（轉盤獲得，等級上限同 SSR Lv.50）──
  { id: 'boss_pet_01', name: '金剛鸚鵡', nameKey: 'pet.boss_pet_01.name', rarity: 'SSR', image: 'assets/boss/boss_01.png', petVersion: true, skills: [{ name: '啄', nameKey: 'skill.boss_peck', desc: '用鳥喙快速啄向敵人', descKey: 'skill.boss_peck.desc', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '猛啄', nameKey: 'skill.boss_peck2', desc: '用鳥喙用力猛啄', descKey: 'skill.boss_peck2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續啄擊', nameKey: 'skill.boss_peck3', desc: '瘋狂連續啄擊敵人', descKey: 'skill.boss_peck3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_02', name: '蟒蛇',     nameKey: 'pet.boss_pet_02.name', rarity: 'SSR', image: 'assets/boss/boss_02.png', petVersion: true, skills: [{ name: '咬', nameKey: 'skill.boss_bite', desc: '用利牙快速咬向敵人', descKey: 'skill.boss_bite.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', nameKey: 'skill.boss_bite2', desc: '用利牙用力猛咬', descKey: 'skill.boss_bite2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', nameKey: 'skill.boss_bite3', desc: '瘋狂連續咬擊敵人', descKey: 'skill.boss_bite3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_03', name: '鴕鳥',     nameKey: 'pet.boss_pet_03.name', rarity: 'SSR', image: 'assets/boss/boss_03.png', petVersion: true, skills: [{ name: '啄', nameKey: 'skill.boss_peck', desc: '用鳥喙快速啄向敵人', descKey: 'skill.boss_peck.desc', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '猛啄', nameKey: 'skill.boss_peck2', desc: '用鳥喙用力猛啄', descKey: 'skill.boss_peck2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續啄擊', nameKey: 'skill.boss_peck3', desc: '瘋狂連續啄擊敵人', descKey: 'skill.boss_peck3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_04', name: '狼',       nameKey: 'pet.boss_pet_04.name', rarity: 'SSR', image: 'assets/boss/boss_04.png', petVersion: true, skills: [{ name: '咬', nameKey: 'skill.boss_bite', desc: '用利牙快速咬向敵人', descKey: 'skill.boss_bite.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', nameKey: 'skill.boss_bite2', desc: '用利牙用力猛咬', descKey: 'skill.boss_bite2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', nameKey: 'skill.boss_bite3', desc: '瘋狂連續咬擊敵人', descKey: 'skill.boss_bite3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_05', name: '袋鼠',     nameKey: 'pet.boss_pet_05.name', rarity: 'SSR', image: 'assets/boss/boss_05.png', petVersion: true, skills: [{ name: '打', nameKey: 'skill.boss_punch', desc: '揮出拳頭快速打向敵人', descKey: 'skill.boss_punch.desc', effect: 'atk', power: 1.5, icon: '👊', maxPP: 15, currentPP: 15 }, { name: '猛打', nameKey: 'skill.boss_punch2', desc: '蓄力後全力揮拳猛打', descKey: 'skill.boss_punch2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續猛打', nameKey: 'skill.boss_punch3', desc: '瘋狂連續揮拳攻擊', descKey: 'skill.boss_punch3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_06', name: '獵豹',     nameKey: 'pet.boss_pet_06.name', rarity: 'SSR', image: 'assets/boss/boss_06.png', petVersion: true, skills: [{ name: '咬', nameKey: 'skill.boss_bite', desc: '用利牙快速咬向敵人', descKey: 'skill.boss_bite.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', nameKey: 'skill.boss_bite2', desc: '用利牙用力猛咬', descKey: 'skill.boss_bite2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', nameKey: 'skill.boss_bite3', desc: '瘋狂連續咬擊敵人', descKey: 'skill.boss_bite3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_07', name: '河馬',     nameKey: 'pet.boss_pet_07.name', rarity: 'SSR', image: 'assets/boss/boss_07.png', petVersion: true, skills: [{ name: '咬', nameKey: 'skill.boss_bite', desc: '用利牙快速咬向敵人', descKey: 'skill.boss_bite.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', nameKey: 'skill.boss_bite2', desc: '用利牙用力猛咬', descKey: 'skill.boss_bite2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', nameKey: 'skill.boss_bite3', desc: '瘋狂連續咬擊敵人', descKey: 'skill.boss_bite3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_08', name: '犀牛',     nameKey: 'pet.boss_pet_08.name', rarity: 'SSR', image: 'assets/boss/boss_08.png', petVersion: true, skills: [{ name: '撞', nameKey: 'skill.boss_charge', desc: '低頭用身體快速撞向敵人', descKey: 'skill.boss_charge.desc', effect: 'atk', power: 1.5, icon: '💨', maxPP: 15, currentPP: 15 }, { name: '猛撞', nameKey: 'skill.boss_charge2', desc: '蓄力後全力衝撞敵人', descKey: 'skill.boss_charge2.desc', effect: 'atk', power: 2.0, icon: '💥', maxPP: 10, currentPP: 10 }, { name: '犀角衝撞', nameKey: 'skill.boss_charge3', desc: '以鋼鐵犀角全速衝撞', descKey: 'skill.boss_charge3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_09', name: '棕熊',     nameKey: 'pet.boss_pet_09.name', rarity: 'SSR', image: 'assets/boss/boss_09.png', petVersion: true, skills: [{ name: '咬', nameKey: 'skill.boss_bite', desc: '用利牙快速咬向敵人', descKey: 'skill.boss_bite.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', nameKey: 'skill.boss_bite2', desc: '用利牙用力猛咬', descKey: 'skill.boss_bite2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', nameKey: 'skill.boss_bite3', desc: '瘋狂連續咬擊敵人', descKey: 'skill.boss_bite3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_10', name: '貓頭鷹',   nameKey: 'pet.boss_pet_10.name', rarity: 'SSR', image: 'assets/boss/boss_10.png', petVersion: true, skills: [{ name: '啄', nameKey: 'skill.boss_peck', desc: '用鳥喙快速啄向敵人', descKey: 'skill.boss_peck.desc', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '猛啄', nameKey: 'skill.boss_peck2', desc: '用鳥喙用力猛啄', descKey: 'skill.boss_peck2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續啄擊', nameKey: 'skill.boss_peck3', desc: '瘋狂連續啄擊敵人', descKey: 'skill.boss_peck3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_11', name: '大猩猩',   nameKey: 'pet.boss_pet_11.name', rarity: 'SSR', image: 'assets/boss/boss_11.png', petVersion: true, skills: [{ name: '打', nameKey: 'skill.boss_punch', desc: '揮出拳頭快速打向敵人', descKey: 'skill.boss_punch.desc', effect: 'atk', power: 1.5, icon: '👊', maxPP: 15, currentPP: 15 }, { name: '猛打', nameKey: 'skill.boss_punch2', desc: '蓄力後全力揮拳猛打', descKey: 'skill.boss_punch2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續猛打', nameKey: 'skill.boss_punch3', desc: '瘋狂連續揮拳攻擊', descKey: 'skill.boss_punch3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_12', name: '藏獒',     nameKey: 'pet.boss_pet_12.name', rarity: 'SSR', image: 'assets/boss/boss_12.png', petVersion: true, skills: [{ name: '咬', nameKey: 'skill.boss_bite', desc: '用利牙快速咬向敵人', descKey: 'skill.boss_bite.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', nameKey: 'skill.boss_bite2', desc: '用利牙用力猛咬', descKey: 'skill.boss_bite2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', nameKey: 'skill.boss_bite3', desc: '瘋狂連續咬擊敵人', descKey: 'skill.boss_bite3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_13', name: '鱷魚',     nameKey: 'pet.boss_pet_13.name', rarity: 'SSR', image: 'assets/boss/boss_13.png', petVersion: true, skills: [{ name: '咬', nameKey: 'skill.boss_bite', desc: '用利牙快速咬向敵人', descKey: 'skill.boss_bite.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', nameKey: 'skill.boss_bite2', desc: '用利牙用力猛咬', descKey: 'skill.boss_bite2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', nameKey: 'skill.boss_bite3', desc: '瘋狂連續咬擊敵人', descKey: 'skill.boss_bite3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_14', name: '老鷹',     nameKey: 'pet.boss_pet_14.name', rarity: 'SSR', image: 'assets/boss/boss_14.png', petVersion: true, skills: [{ name: '啄', nameKey: 'skill.boss_peck', desc: '用鳥喙快速啄向敵人', descKey: 'skill.boss_peck.desc', effect: 'atk', power: 1.5, icon: '🐦', maxPP: 15, currentPP: 15 }, { name: '猛啄', nameKey: 'skill.boss_peck2', desc: '用鳥喙用力猛啄', descKey: 'skill.boss_peck2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續啄擊', nameKey: 'skill.boss_peck3', desc: '瘋狂連續啄擊敵人', descKey: 'skill.boss_peck3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_15', name: '獅子',     nameKey: 'pet.boss_pet_15.name', rarity: 'SSR', image: 'assets/boss/boss_15.png', petVersion: true, skills: [{ name: '咬', nameKey: 'skill.boss_bite', desc: '用利牙快速咬向敵人', descKey: 'skill.boss_bite.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', nameKey: 'skill.boss_bite2', desc: '用利牙用力猛咬', descKey: 'skill.boss_bite2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', nameKey: 'skill.boss_bite3', desc: '瘋狂連續咬擊敵人', descKey: 'skill.boss_bite3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
  { id: 'boss_pet_16', name: '老虎',     nameKey: 'pet.boss_pet_16.name', rarity: 'SSR', image: 'assets/boss/boss_16.png', petVersion: true, skills: [{ name: '咬', nameKey: 'skill.boss_bite', desc: '用利牙快速咬向敵人', descKey: 'skill.boss_bite.desc', effect: 'atk', power: 1.5, icon: '🦷', maxPP: 15, currentPP: 15 }, { name: '猛咬', nameKey: 'skill.boss_bite2', desc: '用利牙用力猛咬', descKey: 'skill.boss_bite2.desc', effect: 'atk', power: 2.0, icon: '💢', maxPP: 10, currentPP: 10 }, { name: '連續咬擊', nameKey: 'skill.boss_bite3', desc: '瘋狂連續咬擊敵人', descKey: 'skill.boss_bite3.desc', effect: 'atk', power: 2.5, icon: '⚡', maxPP: 5, currentPP: 5 }] },
];

const FOODS = [
  { id: 'food_01', name: '餅乾屑', nameKey: 'food.biscuit_crumbs', rarity: 'F',   image: 'assets/foods/food_01.png', price: 10,  effect: { hunger: 1,  exp: 1  }, desc: '+1 飽食 +1 EXP'            },
  { id: 'food_02', name: '餅乾',   nameKey: 'food.biscuit',        rarity: 'F',   image: 'assets/foods/food_02.png', price: 50,  effect: { hunger: 5,  exp: 5  }, desc: '+5 飽食 +5 EXP'            },
  { id: 'food_03', name: '玉米',   nameKey: 'food.corn',           rarity: 'F',   image: 'assets/foods/food_03.png', price: 50,  effect: { hunger: 5,  exp: 5  }, desc: '+5 飽食 +5 EXP'            },
  { id: 'food_04', name: '吐司',   nameKey: 'food.toast',          rarity: 'F',   image: 'assets/foods/food_04.png', price: 50,  effect: { hunger: 5,  exp: 5  }, desc: '+5 飽食 +5 EXP'            },
  { id: 'food_05', name: '甜甜圈', nameKey: 'food.donut',          rarity: 'R',   image: 'assets/foods/food_05.png', price: 100, effect: { hunger: 15, exp: 15 }, desc: '+15 飽食 +15 EXP'          },
  { id: 'food_06', name: '薯條',   nameKey: 'food.fries',          rarity: 'R',   image: 'assets/foods/food_06.png', price: 100, effect: { hunger: 15, exp: 15 }, desc: '+15 飽食 +15 EXP'          },
  { id: 'food_07', name: '熱狗',   nameKey: 'food.hotdog',         rarity: 'R',   image: 'assets/foods/food_07.png', price: 100, effect: { hunger: 15, exp: 15 }, desc: '+15 飽食 +15 EXP'          },
  { id: 'food_08', name: '雞腿',   nameKey: 'food.chicken_leg',    rarity: 'SR',  image: 'assets/foods/food_08.png', price: 250, effect: { hunger: 50, exp: 25 }, desc: '+50 飽食 +25 EXP'          },
  { id: 'food_09', name: '披薩',   nameKey: 'food.pizza',          rarity: 'SR',  image: 'assets/foods/food_09.png', price: 250, effect: { hunger: 50, exp: 25 }, desc: '+50 飽食 +25 EXP'          },
  { id: 'food_10', name: '漢堡',   nameKey: 'food.burger',         rarity: 'SR',  image: 'assets/foods/food_10.png', price: 250, effect: { hunger: 50, exp: 25 }, desc: '+50 飽食 +25 EXP'          },
  { id: 'food_11', name: '鮭魚',   nameKey: 'food.salmon',         rarity: 'SSR', image: 'assets/foods/food_11.png', price: 500, effect: { water: 10, hunger: 90, exp: 50 }, desc: '+10 水份 +90 飽食 +50 EXP' },
  { id: 'food_12', name: '巧克力', nameKey: 'food.chocolate',      rarity: 'SSR', image: 'assets/foods/food_12.png', price: 500, effect: { hunger: 90, mood: 10, exp: 50  }, desc: '+90 飽食 +10 心情 +50 EXP' },
  { id: 'food_13', name: '蛋糕',   nameKey: 'food.cake',           rarity: 'SSR', image: 'assets/foods/food_13.png', price: 500, effect: { hunger: 90, exp: 60 }, desc: '+90 飽食 +60 EXP'          },
];

const DRINKS = [
  { id: 'drink_01', name: '礦泉水', nameKey: 'drink.water',       rarity: 'F',   image: 'assets/drinks/drink_01.png', price: 50,  effect: { water: 5,   exp: 5  }, desc: '+5 水份 +5 EXP'            },
  { id: 'drink_02', name: '紅茶',   nameKey: 'drink.tea',         rarity: 'R',   image: 'assets/drinks/drink_02.png', price: 100, effect: { water: 15,  exp: 15 }, desc: '+15 水份 +15 EXP'          },
  { id: 'drink_03', name: '綠茶',   nameKey: 'drink.green_tea',   rarity: 'R',   image: 'assets/drinks/drink_03.png', price: 100, effect: { water: 15,  exp: 15 }, desc: '+15 水份 +15 EXP'          },
  { id: 'drink_04', name: '葡萄汁', nameKey: 'drink.grape_juice', rarity: 'SR',  image: 'assets/drinks/drink_04.png', price: 250, effect: { water: 50,  exp: 25 }, desc: '+50 水份 +25 EXP'          },
  { id: 'drink_05', name: '蘋果汁', nameKey: 'drink.apple_juice', rarity: 'SR',  image: 'assets/drinks/drink_05.png', price: 250, effect: { water: 50,  exp: 25 }, desc: '+50 水份 +25 EXP'          },
  { id: 'drink_06', name: '可樂',   nameKey: 'drink.cola',        rarity: 'SSR', image: 'assets/drinks/drink_06.png', price: 500, effect: { water: 90,  mood: 10, exp: 50  }, desc: '+90 水份 +10 心情 +50 EXP' },
  { id: 'drink_07', name: '牛奶',   nameKey: 'drink.milk',        rarity: 'SSR', image: 'assets/drinks/drink_07.png', price: 500, effect: { water: 90,  hunger: 10, exp: 50 }, desc: '+90 水份 +10 飽食 +50 EXP' },
  { id: 'drink_08', name: '咖啡',   nameKey: 'drink.coffee',      rarity: 'SSR', image: 'assets/drinks/drink_08.png', price: 500, effect: { water: 100, exp: 60 }, desc: '+100 水份 +60 EXP'         },
];

const ITEM_DEFS = {
  candy:        { icon: '🍬', name: '愛心糖',      nameKey: 'item.heart_candy',   desc: '+10心情',             descKey: 'item.heart_candy.desc',   price: 100 },
  xpboost:      { icon: '⭐', name: '成長藥',       nameKey: 'item.growth_potion', desc: '+20 EXP',             descKey: 'item.growth_potion.desc', price: 100 },
  boss_ticket:  { icon: '🎫', name: 'BOSS 挑戰卷', nameKey: 'item.boss_ticket',   desc: '可額外挑戰一次 BOSS', descKey: 'item.boss_ticket.desc',   price: 2000 },
  super_growth: { icon: '⭐', name: '超級成長藥',  nameKey: 'item.super_growth',  desc: '使用後寵物直接升到等級上限', descKey: 'item.super_growth.desc', price: 10000, currency: 'energyStones', effect: { maxLevel: true } },
};

const BOSSES = [
  { id: 'boss_01', name: '金剛鸚鵡', nameKey: 'pet.boss_pet_01.name', image: 'assets/boss/boss_01.png', level: 30,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 800,   rarity: 'SSR' } },
  { id: 'boss_02', name: '蟒蛇',     nameKey: 'pet.boss_pet_02.name', image: 'assets/boss/boss_02.png', level: 35,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 1000,  rarity: 'SSR' } },
  { id: 'boss_03', name: '鴕鳥',     nameKey: 'pet.boss_pet_03.name', image: 'assets/boss/boss_03.png', level: 40,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 1200,  rarity: 'SSR' } },
  { id: 'boss_04', name: '狼',       nameKey: 'pet.boss_pet_04.name', image: 'assets/boss/boss_04.png', level: 45,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 1500,  rarity: 'SSR' } },
  { id: 'boss_05', name: '袋鼠',     nameKey: 'pet.boss_pet_05.name', image: 'assets/boss/boss_05.png', level: 50,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 1800,  rarity: 'SSR' } },
  { id: 'boss_06', name: '獵豹',     nameKey: 'pet.boss_pet_06.name', image: 'assets/boss/boss_06.png', level: 55,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 2200,  rarity: 'SSR' } },
  { id: 'boss_07', name: '河馬',     nameKey: 'pet.boss_pet_07.name', image: 'assets/boss/boss_07.png', level: 60,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 2700,  rarity: 'SSR' } },
  { id: 'boss_08', name: '犀牛',     nameKey: 'pet.boss_pet_08.name', image: 'assets/boss/boss_08.png', level: 65,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 3300,  rarity: 'SSR' } },
  { id: 'boss_09', name: '棕熊',     nameKey: 'pet.boss_pet_09.name', image: 'assets/boss/boss_09.png', level: 70,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 4000,  rarity: 'SSR' } },
  { id: 'boss_10', name: '貓頭鷹',   nameKey: 'pet.boss_pet_10.name', image: 'assets/boss/boss_10.png', level: 75,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 4800,  rarity: 'SSR' } },
  { id: 'boss_11', name: '大猩猩',   nameKey: 'pet.boss_pet_11.name', image: 'assets/boss/boss_11.png', level: 80,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 5800,  rarity: 'SSR' } },
  { id: 'boss_12', name: '藏獒',     nameKey: 'pet.boss_pet_12.name', image: 'assets/boss/boss_12.png', level: 85,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 7000,  rarity: 'SSR' } },
  { id: 'boss_13', name: '鱷魚',     nameKey: 'pet.boss_pet_13.name', image: 'assets/boss/boss_13.png', level: 90,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 8500,  rarity: 'SSR' } },
  { id: 'boss_14', name: '老鷹',     nameKey: 'pet.boss_pet_14.name', image: 'assets/boss/boss_14.png', level: 95,  baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 10000, rarity: 'SSR' } },
  { id: 'boss_15', name: '獅子',     nameKey: 'pet.boss_pet_15.name', image: 'assets/boss/boss_15.png', level: 100, baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 12000, rarity: 'SSR' } },
  { id: 'boss_16', name: '老虎',     nameKey: 'pet.boss_pet_16.name', image: 'assets/boss/boss_16.png', level: 105, baseStats: { hp: 350, atk: 50, def: 30 }, reward: { coins: 15000, rarity: 'SSR' } },
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

// ─── Pet Elements ────────────────────────────────────────────────────────────
const ELEMENT_ICON = {
  '水': '💧',
  '火': '🔥',
  '木': '🌳',
  '土': '⛰️',
};

const ELEMENT_COUNTER = {
  '水': '火', // 水克火
  '火': '木', // 火克木
  '木': '土', // 木克土
  '土': '水', // 土克水
};

const isEffective = (attackerElement, defenderElement) => {
  return ELEMENT_COUNTER[attackerElement] === defenderElement;
};

const getPetElement = (petId) => {
  // BOSSES entries use id 'boss_NN', but their element keys (like their nameKeys)
  // are stored under the PETS-style 'boss_pet_NN' id — convert transparently so
  // every caller can just pass boss.id / pet.id without worrying about this.
  const lookupId = /^boss_\d+$/.test(petId) ? petId.replace('boss_', 'boss_pet_') : petId;
  return t(`pet.${lookupId}.element`) || '無';
};

const getElementIcon = (petId) => ELEMENT_ICON[getPetElement(petId)] || '';

// Reusable <span> for "next to the rarity badge" placement everywhere a pet is shown.
const getElementBadgeHtml = (petId) => {
  const element = getPetElement(petId);
  const icon    = ELEMENT_ICON[element];
  if (!icon) return '';
  return `<span class="element-badge element-${element}">${icon}${t('element.' + element)}</span>`;
};

const calcDamage = (attackerAtk, skillPower, defenderDef, critRate, elementMultiplier = 1) => {
  const base     = attackerAtk * skillPower;
  const defense  = Math.floor(defenderDef * 0.5);
  const raw      = Math.max(1, base - defense);
  const variance = 0.9 + Math.random() * 0.2;
  const isCrit   = Math.random() < (critRate || 0.05);
  let dmg        = Math.floor(raw * variance * (isCrit ? 1.5 : 1));
  dmg = Math.floor(dmg * elementMultiplier);
  return { dmg, crit: isCrit, superEffective: elementMultiplier > 1 };
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

// Clear all petSkillPP_* keys unconditionally — we no longer deplete PP in battle,
// so any stored PP values (especially zeros from old code) would break deck building.
function checkDailyPPReset() {
  Object.keys(localStorage)
    .filter(k => k.startsWith('petSkillPP_'))
    .forEach(k => localStorage.removeItem(k));
  localStorage.removeItem('ppLastReset'); // clean up obsolete key
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
        <img src="${pet.image}" alt="${t(pet.nameKey)}" class="pixel-art select-card__img" />
      </div>
      <span class="select-card__name">${t(pet.nameKey)}</span>
      <div class="select-card__footer">
        <span class="badge badge--${pet.rarity.toLowerCase()}">${pet.rarity}</span>${getElementBadgeHtml(pet.id)}
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
  sfxGacha();
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
  // Quest tracking
  results.forEach(r => {
    trackQuestEvent('gacha');
    trackQuestEvent('gacha_count');
    if (r.pet.rarity === 'SSR' && r.isNew) trackQuestEvent('ssr_gacha');
  });
  trackQuestEvent('pet_count', unlockedPets.length);
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
      <img src="${r.pet.image}" alt="${t(r.pet.nameKey)}" class="pixel-art gacha-result-card__img" />
      <span class="gacha-result-card__name">${t(r.pet.nameKey)}</span>
      <span class="badge badge--${r.pet.rarity.toLowerCase()}">${r.pet.rarity}</span>${getElementBadgeHtml(r.pet.id)}
      ${r.isNew
        ? `<span class="gacha-tag gacha-tag--new">${t('gacha.new')}</span>`
        : `<span class="gacha-tag gacha-tag--dup">${t('gacha.owned')} +50 💎</span>`}
    `;
    grid.appendChild(card);
  });
  openModal('modal-gacha-result');
}

function initGacha() {
  document.getElementById('btn-gacha-single')?.addEventListener('click', () => {
    if (!spendCoins(GACHA_COST_SINGLE, '扭蛋')) { showToast(t('toast.no_coins')); return; }
    const machine = document.getElementById('gacha-machine');
    machine?.classList.add('gacha-spin');
    setTimeout(() => {
      machine?.classList.remove('gacha-spin');
      showGachaResult(doGachaRolls(1));
    }, 1200);
  });
  document.getElementById('btn-gacha-ten')?.addEventListener('click', () => {
    if (!spendCoins(GACHA_COST_TEN, '扭蛋十連')) { showToast(t('toast.no_coins')); return; }
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
  document.getElementById('detail-pet-img').alt = t(pet.nameKey);
  document.getElementById('detail-pet-name').textContent = t(pet.nameKey);

  // 等級：Lv.X / MaxLv 或 Lv.X MAX（橘色）
  const maxLevel  = getMaxLevel(pet.rarity);
  const isMaxed   = level >= maxLevel;
  const levelEl   = document.getElementById('detail-pet-level');
  levelEl.textContent = isMaxed ? `${level} MAX` : `${level} / ${maxLevel}`;
  levelEl.classList.toggle('level-max', isMaxed);

  const badge = document.getElementById('detail-pet-rarity');
  badge.textContent = pet.rarity;
  badge.className   = `badge badge--${pet.rarity.toLowerCase()}`;

  const elementEl = document.getElementById('detail-pet-element');
  elementEl.innerHTML = getElementBadgeHtml(pet.id);

  document.getElementById('detail-hp').textContent         = stats.hp;
  document.getElementById('detail-atk').textContent        = stats.atk;
  document.getElementById('detail-def').textContent        = stats.def;
  document.getElementById('detail-rarity-val').textContent = pet.rarity;

  const container = document.getElementById('detail-skills-container');
  container.className = `detail-skills-container detail-skills-count-${skills.length}`;
  container.innerHTML = skills.map(s => `
    <div class="detail-skill-card${s.currentPP === 0 ? ' detail-skill-card--empty' : ''}">
      <div class="detail-skill-card__icon">${s.icon}</div>
      <div class="detail-skill-card__name">${t(s.nameKey)}</div>
      <div class="detail-skill-card__desc">${t(s.descKey)}</div>
      <div class="detail-skill-card__power">${t('skill.power')}：${Number(s.power).toFixed(1)}×</div>
      <div class="detail-skill-card__pp">
        <div class="pp-dots">${renderPPDots(s.currentPP, s.maxPP)}</div>
        <span class="pp-count">${s.currentPP} / ${s.maxPP}</span>
      </div>
      ${s.currentPP === 0 ? '<div class="pp-empty-hint">PP 不足</div>' : ''}
    </div>
  `).join('');

  document.getElementById('screen-pet-detail').classList.remove('hidden');
  applyLang();
}

function hidePetDetail() {
  document.getElementById('screen-pet-detail').classList.add('hidden');
  applyLang();
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
    trackQuestEvent('pet_level', state.level);
    sfxLevelUp();
    if (state.level >= maxLevel) {
      showToast(`🎉 ${t('toast.max_level')} Lv.${state.level} MAX`);
    } else {
      showToast(`🎉 ${t('toast.level_up')} Lv.${state.level}`);
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
  if (n > 0) trackQuestEvent('spend_total', n);
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

  if (id === 'boss_ticket') {
    showToast('🎫 請前往 BOSS 挑戰頁面使用挑戰卷！');
    return;
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
  }
}

// ─── Food System ─────────────────────────────────────────────────────────────
function buyFood(id) {
  const food = FOODS.find(f => f.id === id);
  if (!food) return;
  if (!spendCoins(food.price, '購買食物')) { showToast(t('toast.no_coins')); return; }
  const inv = loadInventory();
  inv[id] = (inv[id] || 0) + 1;
  saveInventory(inv);
  showToast(`購買成功：${t(food.nameKey)} ×1`);
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
        <p>${t('bag.empty.food')}</p>
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
            ${t(f.nameKey)}
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
  trackQuestEvent('feed');
  checkMoodQuest();
  sfxFeed();
  if (e.exp) addExp(e.exp); else renderAll();
  closeModal('modal-feed');
  showToast(`${t('toast.feed_success')} ${t(food.nameKey)}（${food.desc}）`);
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
              <span class="drink-shop-name">${t(f.nameKey)}</span>
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
  if (!spendCoins(drink.price, '購買飲料')) { showToast(t('toast.no_coins')); return; }
  const inv = loadInventory();
  inv[id] = (inv[id] || 0) + 1;
  saveInventory(inv);
  showToast(`購買成功：${t(drink.nameKey)} ×1`);
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
        <p>${t('bag.empty.drink')}</p>
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
            ${t(d.nameKey)}
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
  trackQuestEvent('drink');
  checkMoodQuest();
  sfxFeed();
  if (e.exp) addExp(e.exp); else renderAll();
  closeModal('modal-drink');
  showToast(`${t('toast.drink_success')} ${t(drink.nameKey)}（${drink.desc}）`);
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
        <p>${t('bag.empty.item')}</p>
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
          <div class="modal-pick-name">${t(def.nameKey)}</div>
          <div class="modal-pick-desc">${t(def.descKey)}</div>
        </div>
        <div class="modal-pick-right">
          <span class="modal-pick-count">×${cnt}</span>
          <button class="use-btn${isBoss ? ' use-btn--boss' : ''}" onclick="useItemFromPickModal('${id}')">
            ${isBoss ? t('item.boss_ticket.goto') : t('item.use')}
          </button>
        </div>
      </div>`;
  }).join('');
}

function useItemFromPickModal(id) {
  if (id === 'boss_ticket') {
    showToast('🎫 請前往 BOSS 挑戰頁面使用挑戰卷！');
    return;
  }
  if (getItem(id) <= 0) return;
  if (id === 'super_growth') {
    const maxLevel = getMaxLevel(currentPet().rarity);
    if (state.level >= maxLevel) {
      showToast(t('item.super_growth.maxed'));
      return;
    }
    consumeItem(id);
    state.level = maxLevel;
    state.exp   = 0;
    saveState();
    renderAll();
    showToast(t('item.super_growth.used'));
    closeModal('modal-item-pick');
    return;
  }
  consumeItem(id);
  if (id === 'candy') {
    state.mood = Math.min(100, state.mood + 10);
    saveState(); renderSlotPage(currentSlotIdx);
    checkMoodQuest();
    showToast('使用愛心糖！+10心情 😄');
  } else if (id === 'xpboost') {
    saveState();
    addExp(20);
    showToast('使用成長藥！+20 EXP ⭐');
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
        <p>${t('bag.empty.pet')}</p>
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
            ${t(pet.nameKey)}
            <span class="badge badge--${pet.rarity.toLowerCase()}">${pet.rarity}</span>${getElementBadgeHtml(pet.id)}
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
  showToast(`✅ ${pet ? t(pet.nameKey) : t('bag.pet')} 加入巢位！`);
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
              <span class="drink-shop-name">${t(d.nameKey)}</span>
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
      if (!wasHungry && ps.hunger === 0) showToast(`🍖 ${t(pet.nameKey)} 餓了！`);
      if (!wasThirty && ps.water  === 0) showToast(`💧 ${t(pet.nameKey)} 渴了！`);
    }
  }

  refreshDisplayPetState();
  renderPetSlots();
}

// ─── Quest System ────────────────────────────────────────────────────────────
const DAILY_QUESTS = [
  { id: 'd1', name: '餵食寵物',   desc: '使用一次食物',           target: 1,  reward: 20, type: 'feed' },
  { id: 'd2', name: '給寵物喝飲料', desc: '使用一次飲料',           target: 1,  reward: 20, type: 'drink' },
  { id: 'd3', name: '挑戰 BOSS',  desc: '完成一場 BOSS 戰鬥',      target: 1,  reward: 50, type: 'boss_battle' },
  { id: 'd4', name: '心情滿滿',   desc: '任一寵物心情達到 80 以上', target: 1,  reward: 30, type: 'mood_check' },
  { id: 'd5', name: '扭蛋一抽',   desc: '抽一次扭蛋',             target: 1,  reward: 30, type: 'gacha' },
  { id: 'd6', name: '出去尋寶',   desc: '收集一個寶箱',           target: 1,  reward: 30, type: 'treasure' },
  { id: 'd7', name: '兌換能量',   desc: '完成一次步數兌換',         target: 1,  reward: 20, type: 'exchange' },
  { id: 'd8', name: '免費能量石', desc: '觀看廣告獲得獎勵',         target: 3,  reward: 50, type: 'watch_ad', maxPerDay: 3 },
];

const ACHIEVEMENT_QUESTS = [
  { id: 'a1',  name: '初出茅廬', desc: '任一寵物達到 Lv.10', target: 10,   reward: 100,  type: 'pet_level' },
  { id: 'a2',  name: '漸入佳境', desc: '任一寵物達到 Lv.20', target: 20,   reward: 200,  type: 'pet_level' },
  { id: 'a3',  name: '爐火純青', desc: '任一寵物達到 Lv.30', target: 30,   reward: 300,  type: 'pet_level' },
  { id: 'a4',  name: '登峰造極', desc: '任一寵物達到 Lv.50', target: 50,   reward: 500,  type: 'pet_level' },
  { id: 'a5',  name: '收藏家',   desc: '收集 10 隻寵物',     target: 10,   reward: 150,  type: 'pet_count' },
  { id: 'a6',  name: '收藏大師', desc: '收集 25 隻寵物',     target: 25,   reward: 400,  type: 'pet_count' },
  { id: 'a7',  name: '收藏王者', desc: '收集 51 隻寵物',     target: 51,   reward: 1000, type: 'pet_count' },
  { id: 'a8',  name: '初戰告捷', desc: '通關第一隻 BOSS',    target: 1,    reward: 100,  type: 'boss_clear' },
  { id: 'a9',  name: '無人能敵', desc: '通關全部 BOSS',      target: 16,   reward: 2000, type: 'boss_clear_all' },
  { id: 'a10', name: '幸運降臨', desc: '抽中第一隻 SSR 寵物', target: 1,   reward: 200,  type: 'ssr_gacha' },
  { id: 'a11', name: '小富翁',   desc: '累積花費 1000 能量石', target: 1000, reward: 100, type: 'spend_total' },
  { id: 'a12', name: '大富翁',   desc: '累積花費 5000 能量石', target: 5000, reward: 500, type: 'spend_total' },
];

const WEEKLY_QUESTS = [
  { id: 'w1', name: '戰鬥達人', desc: '完成 5 場戰鬥',      target: 5,  reward: 150, type: 'battle_count' },
  { id: 'w2', name: '扭蛋十連', desc: '累積抽 10 次扭蛋',   target: 10, reward: 200, type: 'gacha_count' },
  { id: 'w3', name: '步數達人', desc: '連續兌換步數 7 天',   target: 7,  reward: 250, type: 'exchange_streak' },
];

let activeQuestTab = 'daily';

function getWeekStart(d) {
  const day  = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const mon  = new Date(d);
  mon.setDate(d.getDate() + diff);
  return getDateStr(mon);
}

function loadDailyProgress()    { try { return JSON.parse(localStorage.getItem('dailyQuestProgress')   || '{}'); } catch { return {}; } }
function saveDailyProgress(o)   { localStorage.setItem('dailyQuestProgress',   JSON.stringify(o)); }
function loadAchieveProgress()  { try { return JSON.parse(localStorage.getItem('achievementProgress')  || '{}'); } catch { return {}; } }
function saveAchieveProgress(o) { localStorage.setItem('achievementProgress',  JSON.stringify(o)); }
function loadWeeklyProgress()   { try { return JSON.parse(localStorage.getItem('weeklyQuestProgress')  || '{}'); } catch { return {}; } }
function saveWeeklyProgress(o)  { localStorage.setItem('weeklyQuestProgress',  JSON.stringify(o)); }

function resetDailyIfNeeded(dp, today) {
  const needReset = DAILY_QUESTS.some(q => dp[q.id]?.date && dp[q.id].date !== today);
  if (needReset) {
    DAILY_QUESTS.forEach(q => { dp[q.id] = { progress: 0, claimed: false, date: today }; });
  }
}

function resetWeeklyIfNeeded(wp, weekStart) {
  const needReset = WEEKLY_QUESTS.some(q => wp[q.id]?.weekStart && wp[q.id].weekStart !== weekStart);
  if (needReset) {
    WEEKLY_QUESTS.forEach(q => { wp[q.id] = { progress: 0, claimed: false, weekStart, days: [] }; });
  }
}

function trackQuestEvent(type, value = 1) {
  const today     = getDateStr(new Date());
  const weekStart = getWeekStart(new Date());

  // --- Daily ---
  const dp = loadDailyProgress();
  resetDailyIfNeeded(dp, today);
  DAILY_QUESTS.forEach(q => {
    if (q.type !== type) return;
    if (!dp[q.id]) dp[q.id] = { progress: 0, claimed: false, date: today };
    if (dp[q.id].claimed || dp[q.id].progress >= q.target) return;
    dp[q.id].progress = Math.min(q.target, dp[q.id].progress + 1);
    dp[q.id].date = today;
  });
  saveDailyProgress(dp);

  // --- Achievements ---
  const ap = loadAchieveProgress();
  ACHIEVEMENT_QUESTS.forEach(q => {
    if (q.type !== type) return;
    if (!ap[q.id]) ap[q.id] = { progress: 0, claimed: false };
    if (ap[q.id].claimed) return;
    if (type === 'pet_level' || type === 'pet_count' || type === 'boss_clear_all') {
      ap[q.id].progress = Math.max(ap[q.id].progress, value);
    } else if (type === 'spend_total') {
      ap[q.id].progress = Math.min(q.target, ap[q.id].progress + value);
    } else {
      ap[q.id].progress = Math.min(q.target, ap[q.id].progress + 1);
    }
  });
  saveAchieveProgress(ap);

  // --- Weekly ---
  const wp = loadWeeklyProgress();
  resetWeeklyIfNeeded(wp, weekStart);
  WEEKLY_QUESTS.forEach(q => {
    if (q.type !== type) return;
    if (!wp[q.id]) wp[q.id] = { progress: 0, claimed: false, weekStart, days: [] };
    if (wp[q.id].claimed || wp[q.id].progress >= q.target) return;
    if (type === 'exchange_streak') {
      if (!wp[q.id].days) wp[q.id].days = [];
      if (!wp[q.id].days.includes(String(value))) {
        wp[q.id].days.push(String(value));
        wp[q.id].progress = wp[q.id].days.length;
      }
    } else {
      wp[q.id].progress = Math.min(q.target, (wp[q.id].progress || 0) + 1);
    }
    wp[q.id].weekStart = weekStart;
  });
  saveWeeklyProgress(wp);

  // Re-render quest tab if open
  if (document.getElementById('tab-quest')?.classList.contains('active')) {
    renderQuestList();
  }
}

function checkMoodQuest() {
  const slots = loadSlots();
  for (const id of slots) {
    if (!id) continue;
    const ps = loadPetState(id);
    if (ps && (ps.mood ?? 0) >= 80) { trackQuestEvent('mood_check'); return; }
  }
}

function initQuestTab() {
  document.querySelectorAll('.quest-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeQuestTab = btn.dataset.qtab;
      document.querySelectorAll('.quest-tab-btn').forEach(b =>
        b.classList.toggle('quest-tab-btn--active', b === btn));
      renderQuestList();
    });
  });
}

function renderQuestTab() {
  // Refresh pet_count and boss_clear_all from live state
  const ap = loadAchieveProgress();
  const petCount   = unlockedPets.length;
  const cleared    = loadClearedBosses().length;
  ACHIEVEMENT_QUESTS.forEach(q => {
    if (!ap[q.id]) ap[q.id] = { progress: 0, claimed: false };
    if (q.type === 'pet_count')     ap[q.id].progress = Math.max(ap[q.id].progress, petCount);
    if (q.type === 'boss_clear_all') ap[q.id].progress = Math.max(ap[q.id].progress, cleared);
  });
  saveAchieveProgress(ap);
  renderQuestList();
}

function renderQuestList() {
  const el = document.getElementById('quest-list');
  if (!el) return;

  const today     = getDateStr(new Date());
  const weekStart = getWeekStart(new Date());
  const dp = loadDailyProgress();
  const ap = loadAchieveProgress();
  const wp = loadWeeklyProgress();
  resetDailyIfNeeded(dp, today);
  resetWeeklyIfNeeded(wp, weekStart);

  let quests, progress;
  if (activeQuestTab === 'daily') {
    quests = DAILY_QUESTS;
    progress = dp;
  } else if (activeQuestTab === 'achieve') {
    quests = ACHIEVEMENT_QUESTS;
    progress = ap;
  } else {
    quests = WEEKLY_QUESTS;
    progress = wp;
  }

  el.innerHTML = quests.map(q => {
    // Special card for watch_ad type
    if (q.type === 'watch_ad') {
      const adSt   = loadAdWatchCount();
      const count  = adSt.count || 0;
      const max    = q.maxPerDay || 3;
      const maxed  = count >= max;
      const pct    = Math.round(count / max * 100);
      const btnCls = maxed
        ? 'quest-claim-btn quest-claim-btn--pending'
        : 'quest-claim-btn quest-claim-btn--ready';
      const btnTxt = maxed ? t('ad.limit') : `${t('ad.count')} (${count}/${max})`;
      return `
        <div class="quest-card">
          <div class="quest-card__info">
            <div class="quest-card__name">${t(`quest.${q.id}.name`)}</div>
            <div class="quest-card__desc">${t(`quest.${q.id}.desc`)}</div>
            <div class="quest-progress">
              <div class="quest-progress-bar"><div class="quest-progress-fill" style="width:${pct}%"></div></div>
              <span class="quest-progress-text">${count} / ${max}</span>
            </div>
          </div>
          <div class="quest-card__right">
            <div class="quest-reward">💎 ${q.reward}</div>
            <button class="${btnCls}" ${maxed ? 'disabled' : 'onclick="watchAdForReward()"'}>${btnTxt}</button>
          </div>
        </div>`;
    }

    const p       = progress[q.id] || { progress: 0, claimed: false };
    const prog    = Math.min(p.progress || 0, q.target);
    const pct     = Math.round(prog / q.target * 100);
    const ready   = prog >= q.target && !p.claimed;
    const done    = p.claimed;
    let btnClass  = 'quest-claim-btn';
    let btnText   = t('quest.inprogress');
    let cardClass = 'quest-card';
    if (done)        { btnClass += ' quest-claim-btn--done';    btnText = `✓ ${t('quest.claimed')}`; cardClass += ' quest-card--done'; }
    else if (ready)  { btnClass += ' quest-claim-btn--ready';   btnText = t('quest.claim'); }
    else             { btnClass += ' quest-claim-btn--pending';  btnText = t('quest.inprogress'); }
    const onclick = ready ? `claimQuestReward('${activeQuestTab}','${q.id}')` : '';
    return `
      <div class="${cardClass}">
        <div class="quest-card__info">
          <div class="quest-card__name">${t(`quest.${q.id}.name`)}</div>
          <div class="quest-card__desc">${t(`quest.${q.id}.desc`)}</div>
          <div class="quest-progress">
            <div class="quest-progress-bar"><div class="quest-progress-fill" style="width:${pct}%"></div></div>
            <span class="quest-progress-text">${prog} / ${q.target}</span>
          </div>
        </div>
        <div class="quest-card__right">
          <div class="quest-reward">💎 ${q.reward}</div>
          <button class="${btnClass}" ${onclick ? `onclick="${onclick}"` : ''} ${done || !ready ? 'disabled' : ''}>${btnText}</button>
        </div>
      </div>`;
  }).join('');
}

function claimQuestReward(tab, questId) {
  let progress, saveFn, quests;
  const today     = getDateStr(new Date());
  const weekStart = getWeekStart(new Date());

  if (tab === 'daily') {
    progress = loadDailyProgress(); resetDailyIfNeeded(progress, today);
    saveFn = saveDailyProgress; quests = DAILY_QUESTS;
  } else if (tab === 'achieve') {
    progress = loadAchieveProgress();
    saveFn = saveAchieveProgress; quests = ACHIEVEMENT_QUESTS;
  } else {
    progress = loadWeeklyProgress(); resetWeeklyIfNeeded(progress, weekStart);
    saveFn = saveWeeklyProgress; quests = WEEKLY_QUESTS;
  }

  const q = quests.find(x => x.id === questId);
  if (!q) return;
  const p = progress[q.id];
  if (!p || p.claimed || (p.progress || 0) < q.target) return;

  p.claimed = true;
  saveFn(progress);
  addCoins(q.reward, '任務獎勵');
  showToast(`🎉 任務完成！獲得 ${q.reward} 💎`);
  renderQuestList();
}

// ─── IAP Store ────────────────────────────────────────────────────────────────
// TODO: 串接真實金流（如 Stripe、街口支付、Line Pay）
// 目前為模擬付款，直接發放晶石

const IAP_PACKAGES = [
  { id: 'pack1', amount: 100,  bonus: 0,    price: 30,   label: '新手包', labelKey: 'iap.pack.starter' },
  { id: 'pack2', amount: 350,  bonus: 20,   price: 100,  label: '超值包', labelKey: 'iap.pack.value' },
  { id: 'pack3', amount: 800,  bonus: 80,   price: 220,  label: '熱門包', labelKey: 'iap.pack.popular' },
  { id: 'pack4', amount: 1800, bonus: 250,  price: 480,  label: '豪華包', labelKey: 'iap.pack.deluxe', popular: true },
  { id: 'pack5', amount: 4000, bonus: 700,  price: 980,  label: '至尊包', labelKey: 'iap.pack.supreme' },
  { id: 'pack6', amount: 9000, bonus: 2000, price: 1980, label: '王者包', labelKey: 'iap.pack.royal' },
];

function loadPurchaseHistory()  { try { return JSON.parse(localStorage.getItem('purchaseHistory') || '[]'); } catch { return []; } }
function savePurchaseHistory(a) { localStorage.setItem('purchaseHistory', JSON.stringify(a.slice(-100))); }

function openIAPStore() {
  document.getElementById('screen-iap')?.classList.remove('hidden');
  renderIAPStore();
}

function closeIAPStore() {
  document.getElementById('screen-iap')?.classList.add('hidden');
}

function renderIAPStore() {
  const grid = document.getElementById('iap-grid');
  if (!grid) return;
  grid.innerHTML = IAP_PACKAGES.map(pkg => {
    const total = pkg.amount + pkg.bonus;
    return `
      <div class="iap-card${pkg.popular ? ' iap-card--popular' : ''}" onclick="showPurchaseConfirm('${pkg.id}')">
        ${pkg.popular ? `<div class="iap-card__badge">${t('iap.best')}</div>` : ''}
        <div class="iap-card__icon">💎</div>
        <div class="iap-card__amount">${pkg.amount.toLocaleString()}</div>
        ${pkg.bonus ? `<div class="iap-card__bonus">+${pkg.bonus.toLocaleString()} ${t('iap.bonus')}</div>` : ''}
        <div class="iap-card__label">${t(pkg.labelKey)}</div>
        <div class="iap-card__price">NT$ ${pkg.price}</div>
      </div>`;
  }).join('');
}

let pendingPurchaseId = null;

function showPurchaseConfirm(packageId) {
  const pkg = IAP_PACKAGES.find(p => p.id === packageId);
  if (!pkg) return;
  pendingPurchaseId = packageId;
  const total = pkg.amount + pkg.bonus;
  document.getElementById('iap-confirm-pkg-name').textContent = t(pkg.labelKey);
  document.getElementById('iap-confirm-amount').textContent   = `💎 ${total.toLocaleString()}`;
  document.getElementById('iap-confirm-price').textContent    = `NT$ ${pkg.price}`;
  openModal('modal-iap-confirm');
}

function confirmPurchase() {
  // TODO: 串接真實金流（如 Stripe、街口支付、Line Pay）
  // 目前為模擬付款，直接發放晶石
  const pkg = IAP_PACKAGES.find(p => p.id === pendingPurchaseId);
  if (!pkg) { closeModal('modal-iap-confirm'); return; }

  const total   = pkg.amount + pkg.bonus;
  const history = loadPurchaseHistory();
  history.push({ date: displayDate(getDateStr(new Date())), packageId: pkg.id, amount: total, label: pkg.label });
  savePurchaseHistory(history);

  addCoins(total, `儲值 ${pkg.label}`);
  closeModal('modal-iap-confirm');
  showToast(`儲值成功！+${total.toLocaleString()} 💎`);
  pendingPurchaseId = null;
}

// ─── Ad System ────────────────────────────────────────────────────────────────
// TODO: 替換成真實廣告 SDK（如 AdMob、Unity Ads）
// 目前使用模擬倒數計時代替

function loadAdWatchCount() {
  try {
    const raw = JSON.parse(localStorage.getItem('adWatchCount') || '{}');
    if (raw.date === getDateStr(new Date())) return raw;
  } catch {}
  return { date: getDateStr(new Date()), count: 0 };
}
function saveAdWatchCount(o) { localStorage.setItem('adWatchCount', JSON.stringify(o)); }

function initAdWatchCount() {
  const val = loadAdWatchCount();
  saveAdWatchCount(val); // persist default so it's always in localStorage
  console.log('adWatchCount on load:', val);
}

function loadAdGachaUsed() {
  try {
    const raw = JSON.parse(localStorage.getItem('adGachaUsed') || '{}');
    if (raw.date === getDateStr(new Date())) return raw;
  } catch {}
  return { date: getDateStr(new Date()), used: false };
}
function saveAdGachaUsed(o) { localStorage.setItem('adGachaUsed', JSON.stringify(o)); }

let adTimerInterval = null;

function showAdModal(onComplete) {
  // TODO: 替換成真實廣告 SDK（如 AdMob、Unity Ads）
  const overlay   = document.getElementById('modal-ad');
  const countdown = document.getElementById('ad-countdown');
  const bar       = document.getElementById('ad-progress-bar');
  if (!overlay) { onComplete(); return; }

  // One-shot guard — ensures onComplete fires exactly once
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    clearInterval(adTimerInterval);
    adTimerInterval = null;
    overlay.classList.add('hidden');
    onComplete();
  };

  overlay.classList.remove('hidden');
  bar.style.transition = 'none';
  bar.style.width = '0%';
  let secs = 5;
  if (countdown) countdown.textContent = secs;

  clearInterval(adTimerInterval);
  requestAnimationFrame(() => {
    bar.style.transition = 'width 5s linear';
    bar.style.width = '100%';
  });

  adTimerInterval = setInterval(() => {
    secs--;
    if (countdown) countdown.textContent = Math.max(0, secs);
    if (secs <= 0) finish();
  }, 1000);
}

function watchAdForReward() {
  const adState  = loadAdWatchCount();
  const MAX      = 3;
  if (adState.count >= MAX) { showToast(t('ad.limit')); return; }

  showAdModal(() => {
    const updated  = loadAdWatchCount();
    const newCount = (updated.count || 0) + 1;
    console.log('ad watch count updated to:', newCount);
    updated.count  = newCount;
    saveAdWatchCount(updated);
    addCoins(50, '廣告獎勵');
    showToast(t('ad.reward.toast'));
    if (document.getElementById('tab-quest')?.classList.contains('active')) {
      renderQuestList();
    }
  });
}

function watchAdForGacha() {
  const state = loadAdGachaUsed();
  if (state.used) { showToast('今日廣告扭蛋已使用！'); return; }

  showAdModal(() => {
    const updated = loadAdGachaUsed();
    updated.used = true;
    saveAdGachaUsed(updated);
    showToast(t('ad.gacha.toast'));
    // Refresh ad gacha button to show disabled state
    const adBtn = document.getElementById('btn-ad-gacha');
    if (adBtn) adBtn.outerHTML = buildAdGachaBtn();
    // Free single gacha roll (no coins spent)
    const machine = document.getElementById('gacha-machine');
    machine?.classList.add('gacha-spin');
    setTimeout(() => {
      machine?.classList.remove('gacha-spin');
      showGachaResult(doGachaRolls(1));
    }, 1200);
  });
}

// ─── Bank (Step Exchange) ─────────────────────────────────────────────────────
function getDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function displayDate(iso) { return iso.replace(/-/g, '/'); }

function getDailyRate() {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth()+1) * 100 + d.getDate();
  return 12 + (((seed * 1664525 + 1013904223) >>> 0) % 9); // 12–20
}

function loadStepHistory()  { try { return JSON.parse(localStorage.getItem('stepHistory') || '[]'); } catch { return []; } }
function saveStepHistory(a) { localStorage.setItem('stepHistory', JSON.stringify(a)); }

function getMockStepsForDate(iso) {
  const seed = parseInt(iso.replace(/-/g, ''), 10);
  return Math.floor(200 + (((seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 15800);
}

function initStepHistory() {
  let history = loadStepHistory();
  const today = getDateStr(new Date());

  // Only add today's entry if it doesn't already exist
  if (!history.find(e => e.date === today)) {
    history.push({ date: today, steps: getMockStepsForDate(today) });
  }

  // Keep max 7 entries (newest first), drop oldest beyond 7
  history.sort((a, b) => b.date.localeCompare(a.date));
  if (history.length > 7) history = history.slice(0, 7);

  saveStepHistory(history);
}

function renderBankPanel() {
  renderBankExchange();
}

function renderBankExchange() {
  const pane = document.getElementById('bank-exchange');
  if (!pane) return;
  const rate    = getDailyRate();
  const history = loadStepHistory();
  const coins   = state.coins ?? 0;

  if (!history.length) {
    pane.innerHTML = `
      <div class="bank-rate-card">
        <div class="bank-rate-label">${t('bank.rate')}</div>
        <div class="bank-rate-value">${rate} ${t('bank.rate.unit')} 💎</div>
        <div class="bank-rate-hint">${t('bank.rate.desc')}</div>
      </div>
      <div class="bank-empty">${t('bank.empty')}<br>${t('bank.empty.desc')}</div>`;
    return;
  }

  const totalGems = history.reduce((sum, e) => sum + Math.floor(e.steps / rate), 0);

  const rows = history.map(({ date, steps }) => `
    <div class="bank-step-row">
      <div class="bank-step-info">
        <div class="bank-step-date">${displayDate(date)}</div>
        <div class="bank-step-count">${steps.toLocaleString()} ${t('bank.steps.unit')}</div>
      </div>
      <div class="bank-step-arrow">⇄</div>
      <div class="bank-step-gems">💎 ${Math.floor(steps / rate)}</div>
    </div>`).join('');

  pane.innerHTML = `
    <div class="bank-rate-card">
      <div class="bank-rate-label">${t('bank.rate')}</div>
      <div class="bank-rate-value">${rate} ${t('bank.rate.unit')} 💎</div>
      <div class="bank-rate-hint">${t('bank.rate.desc')}</div>
    </div>
    <div class="bank-step-list">${rows}</div>
    <div class="bank-footer">
      <div class="bank-coin-display">
        <div class="bank-coin-label">${t('bank.owned')}</div>
        <div class="bank-coin-amount">💎 ${coins.toLocaleString()}</div>
      </div>
      <div class="bank-exchange-right">
        <div class="bank-exchange-total">${t('bank.exchangeable')} 💎 ${totalGems.toLocaleString()}</div>
        <button class="bank-exchange-btn" onclick="doBankExchange()">${t('bank.exchange')}</button>
      </div>
    </div>`;
}

function doBankExchange() {
  const history = loadStepHistory();
  if (!history.length) { showToast('沒有步數資料可兌換！'); return; }

  const rate  = getDailyRate();
  const total = history.reduce((sum, e) => sum + Math.floor(e.steps / rate), 0);
  if (total <= 0) { showToast('步數不足以兌換任何能量石！'); return; }

  saveStepHistory([]);                        // clear all history
  addCoins(total, '步數兌換');
  trackQuestEvent('exchange');
  trackQuestEvent('exchange_streak', getDateStr(new Date()));
  showToast(`💎 兌換成功！+${total.toLocaleString()} 像素晶石`);
  renderBankExchange();
}

// ─── Shop Cards ───────────────────────────────────────────────────────────────
// Function (not a cached const) so titles stay correct after a live setLang() switch.
function getShopTitle(type) {
  if (type === 'bank')  return t('bank.title');
  if (type === 'gacha') return t('gacha.title');
  if (type === 'food')  return t('food.shop.title');
  if (type === 'drink') return t('drink.shop.title');
  if (type === 'item')  return t('shop.item.name');
  return '';
}

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
    <div style="display:inline-flex;background:#e8e8e8;border-radius:20px;padding:5px 14px;font-size:13px;font-weight:600;margin-bottom:8px;cursor:pointer">${t('gacha.pool')} ▼</div>
    <div id="gacha-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:16px;transition:opacity 0.3s">
      ${petCellsHTML(getRandomPets(16))}
    </div>
    <div style="display:flex;gap:10px;position:sticky;bottom:0;background:#f5f0eb;padding:10px 0 4px;margin-top:12px">
      <button onclick="doGacha(1)" style="flex:1;padding:14px 8px;border-radius:30px;background:#f0ebe4;border:1px solid #ddd5c8;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px">
        <span style="font-size:15px;font-weight:700">${t('gacha.single')}</span>
        <span style="font-size:12px;color:#6b5a47">100 💎</span>
      </button>
      <button onclick="doGacha(10)" style="flex:1;padding:14px 8px;border-radius:30px;background:#f0ebe4;border:1px solid #ddd5c8;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px">
        <span style="font-size:15px;font-weight:700">${t('gacha.ten')}</span>
        <span style="font-size:12px;color:#6b5a47">900 💎</span>
      </button>
    </div>
    ${buildAdGachaBtn()}`;
}

function buildAdGachaBtn() {
  const used = loadAdGachaUsed().used;
  return `<button
    id="btn-ad-gacha"
    ${used ? '' : 'onclick="watchAdForGacha()"'}
    style="width:100%;margin-top:4px;padding:12px 8px;border-radius:30px;
      background:${used ? '#aaa' : '#1565c0'};border:none;color:#fff;
      cursor:${used ? 'default' : 'pointer'};font-size:14px;font-weight:700;
      font-family:inherit;opacity:${used ? '0.5' : '1'}">
    📺 ${used ? '今日廣告扭蛋已使用' : t('ad.free_gacha') + '（每日限 1 次）'}
  </button>`;
}

function doGacha(count) {
  const cost = count === 1 ? GACHA_COST_SINGLE : GACHA_COST_TEN;
  if (!spendCoins(cost, '扭蛋')) { showToast(t('toast.no_coins')); return; }
  showGachaResult(doGachaRolls(count));
}

const showShopMain = () => {
  clearInterval(gachaInterval);
  gachaInterval = null;
  document.getElementById('shop-main').style.display = 'flex';
  document.getElementById('shop-sub').style.display = 'none';
  document.querySelectorAll('.shop-panel').forEach(p => p.classList.remove('active'));
  applyLang();
};

const showShopSub = (type) => {
  const main = document.getElementById('shop-main');
  const sub  = document.getElementById('shop-sub');
  if (!main || !sub) return;
  clearInterval(gachaInterval);
  gachaInterval = null;
  main.style.display = 'none';
  sub.style.display = 'flex';
  document.getElementById('shop-subpage-title').textContent = getShopTitle(type);
  document.querySelectorAll('.shop-panel').forEach(p => {
    p.classList.toggle('active', p.id === `shop-${type}`);
  });
  if (type === 'bank') {
    renderBankPanel();
  } else if (type === 'food') {
    renderFoodShop();
  } else if (type === 'drink') {
    renderDrinkShop();
  } else if (type === 'item') {
    renderItemShop();
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
  applyLang();
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
      } else if (nav === 'quest') {
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-quest'));
        renderQuestTab();
      } else if (nav === 'settings') {
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-settings'));
        renderSettingsTab();
      }
      applyLang();
    });
  });
}

// ─── Shop / Buy ───────────────────────────────────────────────────────────────
// Item shop is rendered dynamically (like food/drink) so names/descs/prices
// always reflect ITEM_DEFS and the current language — no more static HTML.
function renderItemShop() {
  const panel = document.getElementById('shop-item');
  if (!panel) return;
  const coins = state.coins;
  const rows = Object.entries(ITEM_DEFS).map(([id, def]) => `
    <div class="shop-item">
      <span class="item-icon">${def.icon}</span>
      <span class="item-name">${t(def.nameKey)}</span>
      <span class="item-desc">${t(def.descKey)}</span>
      <button class="buy-btn${coins >= def.price ? '' : ' buy-btn--disabled'}"
        onclick="buyShopItem('${id}')" ${coins >= def.price ? '' : 'disabled'}>
        ${def.price}💎
      </button>
    </div>`).join('');
  panel.innerHTML = `
    <div class="card">
      <h3 class="section-title" data-i18n="shop.item.section">${t('shop.item.section')}</h3>
      <div class="item-grid">${rows}</div>
    </div>`;
}

function buyShopItem(id) {
  const def = ITEM_DEFS[id];
  if (!def) return;
  if (!spendCoins(def.price, `購買${t(def.nameKey)}`)) { showToast(t('toast.no_coins')); return; }
  addItem(id);
  if (id === 'boss_ticket') {
    showToast(`🎫 ${t(def.nameKey)} 已加入背包！`);
  } else {
    showToast(`購買成功：${t(def.nameKey)} ×1`);
  }
  renderItemShop();
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
            ? `<img src="${pet.image}" class="pokedex-card__img" alt="${t(pet.nameKey)}"
                    onerror="this.style.opacity='.3'">`
            : `<div class="pokedex-card__lock">🔒</div>`}
        </div>
        <div class="pokedex-card__name">${unlocked ? t(pet.nameKey) : '???'}</div>
        <span class="badge badge--${pet.rarity.toLowerCase()}">${pet.rarity}</span>${getElementBadgeHtml(pet.id)}
        ${unlocked && ps ? `<div class="pokedex-card__lv">Lv.${ps.level}</div>` : ''}
      </div>`;
  }).join('');
}

// ─── Slot System Rendering ────────────────────────────────────────────────────
function renderPetSlots() {
  for (let i = 0; i < 3; i++) renderSlotPage(i);
  updateSlotDots(currentSlotIdx);
  initSlotScroll();
  // Re-apply transform (in case content re-render reset inline style)
  const el = document.getElementById('slot-scroll');
  if (el) el.style.transform = `translateX(-${currentSlotIdx * 100 / 3}%)`;
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
          <img src="${pet.image}" alt="${t(pet.nameKey)}" class="pixel-art" />
        </div>
        <div class="mood-emoji">${moodEntry[1]}</div>
      </div>
      <div class="pet-card__right">
        <div class="pet-name-row">
          <span class="pet-name">${t(pet.nameKey)}</span>
          <span class="badge badge--${pet.rarity.toLowerCase()}">${pet.rarity}</span>${getElementBadgeHtml(pet.id)}
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
        <span class="stat-label">😄 ${t('stat.mood')}</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar"><div class="stat-bar__fill mood-fill" style="width:${Math.min(100,ps.mood)}%"></div></div>
          <span class="stat-value">${Math.round(ps.mood)}</span>
        </div>
      </div>
      <div class="stat-row">
        <span class="stat-label">🍖 ${t('stat.hunger')}</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar"><div class="stat-bar__fill hunger-fill" style="width:${Math.min(100,ps.hunger)}%"></div></div>
          <span class="stat-value">${Math.round(ps.hunger)}</span>
        </div>
      </div>
      <div class="stat-row">
        <span class="stat-label">💧 ${t('stat.water')}</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar"><div class="stat-bar__fill water-fill" style="width:${Math.min(100,ps.water)}%"></div></div>
          <span class="stat-value">${Math.round(ps.water)}</span>
        </div>
      </div>
    </div>
    <div class="action-grid">
      <button class="action-btn" onclick="slotFeed(${slotIdx})">
        <span class="action-icon">🍖</span><span>${t('home.feed')}</span>
      </button>
      <button class="action-btn" onclick="slotDrink(${slotIdx})">
        <span class="action-icon">🥤</span><span>${t('home.drink')}</span>
      </button>
      <button class="action-btn" onclick="slotItemBag(${slotIdx})">
        <span class="action-icon">🎒</span><span>${t('home.item')}</span>
      </button>
      <button class="action-btn" onclick="openPetPickModal()">
        <span class="action-icon">🐾</span><span>${t('home.pet')}</span>
      </button>
    </div>
    <div class="small-btn-row">
      <button class="small-btn" onclick="showPetDetail('${petId}')">
        <span>ℹ️</span><span class="small-btn-label">${t('home.info')}</span>
      </button>
      <button class="small-btn" onclick="openPokedex()">
        <span>📖</span><span class="small-btn-label">${t('home.collection')}</span>
      </button>
      <button class="small-btn" onclick="openSlotOptionsModal(${slotIdx})">
        <span>⚙️</span><span class="small-btn-label">${t('home.manage')}</span>
      </button>
    </div>
    <button class="home-focus-btn" onclick="openFocusTimer()" data-i18n="home.focus">${t('home.focus')}</button>
  `;
}

function openFocusTimer() {
  showToast(t('toast.coming_soon'));
}

function updateSlotDots(activeIdx) {
  document.querySelectorAll('#slot-dots .team-dot').forEach((dot, i) => {
    dot.classList.toggle('team-dot--active', i === activeIdx);
  });
}

// Apply transform to slot-scroll to show page `idx` (0-2)
function scrollSlotTo(idx) {
  const clamped  = Math.max(0, Math.min(2, idx));
  const el       = document.getElementById('slot-scroll');
  if (!el) return;
  el.style.transform = `translateX(-${clamped * 100 / 3}%)`;
  currentSlotIdx = clamped;
  refreshDisplayPetState();
  updateSlotDots(clamped);
}

function initSlotScroll() {
  if (slotScrollBound) return;
  const container = document.getElementById('slot-scroll');
  if (!container) return;
  slotScrollBound = true;

  // Apply initial position (in case currentSlotIdx > 0 after re-render)
  container.style.transform = `translateX(-${currentSlotIdx * 100 / 3}%)`;

  // ── Touch (mobile) ──────────────────────────────────────────────────
  let touchStartX = 0;
  let touchCurX   = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = touchCurX = e.touches[0].clientX;
    container.classList.add('dragging'); // disable transition during drag
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    touchCurX = e.touches[0].clientX;
    const dx  = touchCurX - touchStartX;
    const pageWidth = container.parentElement.offsetWidth || window.innerWidth;
    // base translate in % + drag offset in % (% is of slot-scroll own width = 3× pageWidth)
    const basePct = -(currentSlotIdx * 100 / 3);
    const dragPct = (dx / pageWidth) * (100 / 3);
    container.style.transform = `translateX(${basePct + dragPct}%)`;
  }, { passive: true });

  container.addEventListener('touchend', () => {
    container.classList.remove('dragging');
    const dx = touchCurX - touchStartX;
    const threshold = (container.parentElement.offsetWidth || window.innerWidth) * 0.25;
    if      (dx < -threshold) scrollSlotTo(currentSlotIdx + 1);
    else if (dx >  threshold) scrollSlotTo(currentSlotIdx - 1);
    else                      scrollSlotTo(currentSlotIdx); // snap back
  }, { passive: true });

  // ── Mouse drag (desktop) ─────────────────────────────────────────────
  let mouseStartX = 0;
  let mouseCurX   = 0;
  let mouseDown   = false;

  container.addEventListener('mousedown', (e) => {
    mouseDown = true;
    mouseStartX = mouseCurX = e.clientX;
    container.classList.add('dragging');
  });

  const endMouseDrag = () => {
    if (!mouseDown) return;
    mouseDown = false;
    container.classList.remove('dragging');
    const dx = mouseCurX - mouseStartX;
    const threshold = (container.parentElement.offsetWidth || window.innerWidth) * 0.25;
    if      (dx < -threshold) scrollSlotTo(currentSlotIdx + 1);
    else if (dx >  threshold) scrollSlotTo(currentSlotIdx - 1);
    else                      scrollSlotTo(currentSlotIdx);
  };

  container.addEventListener('mousemove', (e) => {
    if (!mouseDown) return;
    e.preventDefault();
    mouseCurX = e.clientX;
    const dx  = mouseCurX - mouseStartX;
    const pageWidth = container.parentElement.offsetWidth || window.innerWidth;
    const basePct = -(currentSlotIdx * 100 / 3);
    const dragPct = (dx / pageWidth) * (100 / 3);
    container.style.transform = `translateX(${basePct + dragPct}%)`;
  });

  container.addEventListener('mouseup',    endMouseDrag);
  container.addEventListener('mouseleave', endMouseDrag);
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
  document.getElementById('slot-options-pet-img').alt          = t(pet.nameKey);
  document.getElementById('slot-options-pet-name').textContent = t(pet.nameKey);
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
  showToast(`📦 ${pet ? t(pet.nameKey) : t('bag.pet')} 已移回背包`);
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
  applyLang();
}
function hideBossPage() {
  document.getElementById('explore-boss-sub').style.display = 'none';
  document.getElementById('explore-lobby').style.display    = 'flex';
  applyLang();
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
      actionHtml = `<span class="boss-status boss-status--locked">${t('boss.locked')}</span>`;
    } else if (!hasTicket) {
      actionHtml = `<button class="boss-challenge-btn boss-btn--disabled" disabled>${t('boss.need_ticket')}</button>`;
    } else {
      actionHtml = `<button class="boss-challenge-btn boss-btn--ticket" data-boss-id="${boss.id}">${t('boss.ticket')}</button>`;
    }

    const lockedClass  = isSeqLocked ? ' boss-card--locked' : '';
    const clearedClass = isCleared ? ' boss-card--defeated' : '';

    return `
      <div class="boss-card${clearedClass}${lockedClass}">
        <div class="boss-card__img-wrap">
          <img src="${boss.image}" class="boss-card__img" alt="${t(boss.nameKey)}"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="boss-card__img-fallback">⚔️</div>
          ${isCleared ? '<div class="boss-card__defeated-overlay">✓</div>' : ''}
        </div>
        <div class="boss-card__info">
          <div class="boss-card__name-row">
            <span class="boss-card__name">${t(boss.nameKey)}</span>
            <span class="badge badge--${boss.reward.rarity.toLowerCase()}">${boss.reward.rarity}</span>
            <span class="boss-card__element">${(() => {
              const bossElement = getPetElement(boss.id);
              const elementIcon = ELEMENT_ICON[bossElement] || '';
              return `${elementIcon}${t('element.' + bossElement)}`;
            })()}</span>
          </div>
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
  showToast(`🎫 ${t('toast.ticket_used')} 剩餘 ${remaining} 張`);

  startBattle(boss, isFirstTime);
}

// ─── Boss Ticket Confirm ──────────────────────────────────────────────────────
let ticketTargetBossId = null;

function openBossTicketConfirm(bossId) {
  const boss  = BOSSES.find(b => b.id === bossId);
  if (!boss) return;
  const count = getItem('boss_ticket');
  ticketTargetBossId = bossId;
  document.getElementById('ticket-confirm-boss-name').textContent = t(boss.nameKey);
  document.getElementById('ticket-confirm-remaining').textContent = t('boss.ticket.remaining') + count + t('boss.ticket.remaining.unit');
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
  document.getElementById('wheel-boss-name').textContent = `${t('wheel.desc')} ${t(boss.nameKey)}${t('wheel.desc2')}`;
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
        <img src="${boss.image}" class="wheel-boss-img" alt="${t(boss.nameKey)}"
             onerror="this.style.display='none';this.nextSibling.style.display='block'">
        <span style="display:none;font-size:20px">🏆</span>
        <span class="wheel-label-name">${t('wheel.pet.label')}</span>`;
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
    if (isNew) {
      unlockedPets.push(petId);
      saveUnlockedPets();
    } else {
      addCoins(50); // 已擁有該 BOSS 寵物 → 補償能量石，不重複發放寵物
    }

    content.innerHTML = isNew ? `
      <div class="wheel-result-pet">
        <div class="wheel-result-pet-frame">
          <img src="${boss.image}" class="wheel-result-pet-img" alt="${t(boss.nameKey)}"
               onerror="this.style.opacity='0.2'">
        </div>
        <div class="wheel-result-pet-tag new-flash">✨ ${t('gacha.new')} ✨</div>
        <div class="wheel-result-title">${t('wheel.pet.result')}</div>
        <div class="wheel-result-subtitle">${t(boss.nameKey)}</div>
      </div>` : `
      <div class="wheel-result-pet">
        <div class="wheel-result-pet-frame">
          <img src="${boss.image}" class="wheel-result-pet-img" alt="${t(boss.nameKey)}"
               onerror="this.style.opacity='0.2'">
        </div>
        <div class="wheel-result-pet-tag wheel-result-pet-tag--dup">${t('wheel.pet.owned')}</div>
      </div>`;
  } else {
    addCoins(seg.coins, '轉盤獎勵');
    content.innerHTML = `
      <div class="wheel-result-coins">
        <div class="wheel-result-gem">💎</div>
        <div class="wheel-result-amount">+${seg.coins}</div>
        <div class="wheel-result-title">${t('wheel.gems.result')}</div>
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

// ─── Battle System (Interactive Card) ────────────────────────────────────────
let bSt = null;

function startBattle(boss, isFirstTime) {
  const slotPets = getSlotPets();
  if (slotPets.length === 0) {
    showToast('巢位裡沒有寵物！請先在主頁加入寵物');
    return;
  }

  const bossStats = calcBossStats(boss, boss.level);

  // Build 3 pet slots (null = empty slot)
  const slots = loadSlots();
  const petEntries = slots.map(id => {
    if (!id) return null;
    const pet = PETS.find(p => p.id === id);
    if (!pet) return null;
    const ps    = loadPetState(id);
    const level = ps ? ps.level : 1;
    const stats = calcStats(pet, level);
    return {
      pet,
      stats,
      skills:   getPetSkills(pet),   // always fresh maxPP, no stale localStorage
      critRate: SKILL_CRIT_RATE[pet.rarity] || 0.05,
      hp:    stats.hp,
      maxHp: stats.hp,
    };
  });

  // Build shuffled deck and draw initial hand of 3
  const deck = buildBattleDeck(petEntries);
  const hand = [];
  drawCards(deck, hand, 3);
  console.log('[Battle] deck size:', deck.length, '| initial hand:', hand.map(c => c.skill.name));

  bSt = {
    boss,
    bossStats,
    bossHp:    bossStats.hp,
    bossMaxHp: bossStats.hp,
    pets:       petEntries,
    deck,
    hand,
    ap:         2,
    maxAp:      6,
    playerTurn: true,
    ended:      false,
    isFirstTime,
  };

  openModal('modal-battle');
  renderBattleUI();
}

function shuffleDeck(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildBattleDeck(pets) {
  const deck = [];
  pets.forEach((entry, petIdx) => {
    if (!entry) return;
    entry.skills.forEach(skill => {
      // Always use maxPP — never use currentPP (stale localStorage zeros
      // from old battle-PP-save code would produce an empty deck)
      const count = skill.maxPP || 1;
      for (let i = 0; i < count; i++) {
        deck.push({ petIdx, skill, petNameKey: entry.pet.nameKey, rarity: entry.pet.rarity });
      }
    });
  });
  console.log('[Battle] buildBattleDeck total cards:', deck.length);
  return shuffleDeck(deck);
}

function drawCards(deck, hand, count) {
  let drawn = 0;
  while (drawn < count && deck.length > 0 && hand.length < 5) {
    const card = deck.pop();
    // Safety: skip cards from dead pets even if purgePetCards wasn't called
    const petEntry = bSt?.pets[card.petIdx];
    if (petEntry && petEntry.hp <= 0) continue;
    hand.push(card);
    drawn++;
  }
}

// Remove all cards belonging to a dead pet from deck AND hand immediately
function purgePetCards(petIdx) {
  if (!bSt) return;
  const before = bSt.deck.length + bSt.hand.length;
  bSt.deck = bSt.deck.filter(c => c.petIdx !== petIdx);
  bSt.hand = bSt.hand.filter(c => c.petIdx !== petIdx);
  const removed = before - (bSt.deck.length + bSt.hand.length);
  if (removed > 0) console.log(`[Battle] purged ${removed} cards for dead pet idx ${petIdx}`);
}

function renderBattleUI() {
  if (!bSt) return;
  renderBattlePets();
  renderBattleBoss();
  renderBattleAP();
  renderBattleHand();
  const endBtn = document.getElementById('btn-end-turn');
  if (endBtn) endBtn.disabled = !bSt.playerTurn || bSt.ended;
  const statusEl = document.getElementById('battle-status-label');
  if (statusEl) statusEl.textContent = bSt.playerTurn ? '玩家回合' : 'BOSS 回合';
}

function renderBattlePets() {
  const col = document.getElementById('battle-pets-col');
  if (!col || !bSt) return;
  const bossElement = getPetElement(bSt.boss.id);
  col.innerHTML = bSt.pets.map((entry, idx) => {
    if (!entry) return `<div class="battle-pet-unit battle-pet-unit--empty"></div>`;
    const hpPct = Math.max(0, Math.round(entry.hp / entry.maxHp * 100));
    const dead  = entry.hp <= 0;
    const petElement = getPetElement(entry.pet.id);
    let counterHint = '';
    if (isEffective(petElement, bossElement)) {
      counterHint = `<span class="battle-pet-counter battle-pet-counter--up">▲</span>`;
    } else if (isEffective(bossElement, petElement)) {
      counterHint = `<span class="battle-pet-counter battle-pet-counter--down">▼</span>`;
    }
    return `
      <div class="battle-pet-unit${dead ? ' dead' : ''}" id="battle-pet-unit-${idx}">
        <div class="b-hp-wrap">
          <div class="b-hp-track"><div class="b-hp-bar b-hp-bar--pet" style="width:${hpPct}%"></div></div>
          <div class="b-hp-text">${Math.max(0,entry.hp)}/${entry.maxHp}</div>
        </div>
        <img src="${entry.pet.image}" class="battle-pet-sprite" id="battle-pet-sprite-${idx}"
             alt="${t(entry.pet.nameKey)}" onerror="this.style.opacity='0.3'">
        <div class="battle-pet-element">${ELEMENT_ICON[petElement] || ''}${counterHint}</div>
        <div class="battle-pet-name-small">${t(entry.pet.nameKey)}</div>
        ${getElementBadgeHtml(entry.pet.id)}
      </div>`;
  }).join('');
}
// Note: renderBattlePets targets .battle-pets-row (id="battle-pets-col" kept for compat)

function renderBattleBoss() {
  const col = document.getElementById('battle-boss-col');
  if (!col || !bSt) return;
  const hpPct      = Math.max(0, Math.round(bSt.bossHp / bSt.bossMaxHp * 100));
  const bossElement = getPetElement(bSt.boss.id);
  const elementIcon = ELEMENT_ICON[bossElement] || '';
  col.innerHTML = `
    <img src="${bSt.boss.image}" class="battle-boss-sprite" id="battle-boss-sprite"
         alt="${t(bSt.boss.nameKey)}" onerror="this.style.opacity='0.3'">
    <div class="battle-boss-element">${elementIcon}</div>
    <div class="battle-boss-name-row">
      <span class="battle-boss-name">${t(bSt.boss.nameKey)}</span>
      <span class="battle-boss-lv">Lv.${bSt.boss.level}</span>
      <span class="battle-boss-element-label">${elementIcon}${t('element.' + bossElement)}</span>
    </div>
    <div class="b-hp-wrap" style="width:min(240px,80%)">
      <div class="b-hp-track"><div class="b-hp-bar b-hp-bar--boss" style="width:${hpPct}%"></div></div>
      <div class="b-hp-text">${Math.max(0,bSt.bossHp)} / ${bSt.bossMaxHp}</div>
    </div>`;
}

function renderBattleAP() {
  const numEl  = document.getElementById('battle-ap-num');
  const fillEl = document.getElementById('battle-ap-fill');
  if (!numEl || !bSt) return;
  numEl.textContent = bSt.ap;
  if (fillEl) {
    const circ = 213.6; // 2 × π × 34
    fillEl.style.strokeDashoffset = circ * (1 - bSt.ap / bSt.maxAp);
  }
}

function renderBattleHand() {
  const area = document.getElementById('battle-hand-area');
  if (!area || !bSt) return;
  console.log('[Battle] hand:', bSt.hand.map(c => c.skill.name), '| deck remaining:', bSt.deck.length, '| ap:', bSt.ap);

  const deckCount = document.getElementById('battle-deck-count');

  const cardHtml = bSt.hand.length === 0
    ? `<div class="battle-hand-empty">${bSt.deck.length === 0 ? '牌庫已空' : '手牌為空'}</div>`
    : bSt.hand.map((card, idx) => {
        const entry   = bSt.pets[card.petIdx];
        const petDead = !entry || entry.hp <= 0;
        const cantUse = petDead || bSt.ap <= 0 || !bSt.playerTurn || bSt.ended;
        return `
          <div class="battle-card card-${card.rarity}${petDead ? ' card-empty' : ''}"
               ${cantUse ? '' : `onclick="battleUseCard(${idx})"`}
               title="${t(card.skill.descKey)}">
            <div class="battle-card__icon">${card.skill.icon}</div>
            <div class="battle-card__name">${t(card.skill.nameKey)}</div>
            <div class="battle-card__power">×${card.skill.power}</div>
            <div class="battle-card__pet">${t(card.petNameKey)}</div>
          </div>`;
      }).join('');

  area.innerHTML = cardHtml +
    `<div class="battle-deck-badge" id="battle-deck-count">🃏 ${bSt.deck.length}</div>`;
}

function battleUseCard(handIdx) {
  if (!bSt || bSt.ended || !bSt.playerTurn) return;
  if (bSt.ap <= 0) { showToast('行動值不足！'); return; }

  const card = bSt.hand[handIdx];
  if (!card) return;

  const attacker = bSt.pets[card.petIdx];
  if (!attacker || attacker.hp <= 0) { showToast('該寵物已倒下！'); return; }

  const attackerElement   = getPetElement(attacker.pet.id);
  const defenderElement   = getPetElement(bSt.boss.id);
  const elementMultiplier = isEffective(attackerElement, defenderElement) ? 2.0 : 1.0;

  const { dmg, crit, superEffective } = calcDamage(attacker.stats.atk, card.skill.power, bSt.bossStats.def, attacker.critRate, elementMultiplier);
  console.log('[Battle] damage dealt:', dmg, crit ? '(crit)' : '', '| boss hp after:', Math.max(0, bSt.bossHp - dmg));
  sfxAttack();
  bSt.bossHp = Math.max(0, bSt.bossHp - dmg);
  bSt.hand.splice(handIdx, 1);
  bSt.ap--;

  const bossSprite = document.getElementById('battle-boss-sprite');
  if (bossSprite) {
    bossSprite.classList.add('boss-hit');
    setTimeout(() => bossSprite?.classList.remove('boss-hit'), 200);
  }
  bDmgFloat('battle-boss-col', dmg, crit, false, superEffective);

  renderBattleBoss();
  renderBattleAP();
  renderBattleHand();
  // End-turn is only disabled during the boss's turn or after battle ends.
  // AP = 0 is NOT a reason to disable it — player should always be able to end their turn.
  const endBtn = document.getElementById('btn-end-turn');
  if (endBtn) endBtn.disabled = !bSt.playerTurn || bSt.ended;

  if (bSt.bossHp <= 0) {
    bSt.ended = true;
    setTimeout(() => endBattle(true), 500);
  }
}

function endPlayerTurn() {
  console.log('end turn clicked | bSt exists:', !!bSt, '| playerTurn:', bSt?.playerTurn, '| ended:', bSt?.ended, '| ap:', bSt?.ap);
  if (!bSt || bSt.ended || !bSt.playerTurn) return;
  bSt.playerTurn = false;
  const endBtn = document.getElementById('btn-end-turn');
  if (endBtn) endBtn.disabled = true;
  const statusEl = document.getElementById('battle-status-label');
  if (statusEl) statusEl.textContent = 'BOSS 回合';
  setTimeout(bossTurnAnimate, 500);
}

function bossTurnAnimate() {
  if (!bSt || bSt.ended) return;

  const alivePets = bSt.pets
    .map((p, i) => ({ entry: p, idx: i }))
    .filter(x => x.entry && x.entry.hp > 0);

  if (alivePets.length === 0) { endBattle(false); return; }

  const target = alivePets[Math.floor(Math.random() * alivePets.length)];

  const attackerElement   = getPetElement(bSt.boss.id);
  const defenderElement   = getPetElement(target.entry.pet.id);
  const elementMultiplier = isEffective(attackerElement, defenderElement) ? 2.0 : 1.0;

  const { dmg, crit, superEffective } = calcDamage(bSt.bossStats.atk, 1.0, target.entry.stats.def, 0.05, elementMultiplier);
  sfxAttack();
  target.entry.hp = Math.max(0, target.entry.hp - dmg);

  // Immediately purge this pet's cards if it just died
  if (target.entry.hp <= 0) {
    purgePetCards(target.idx);
    renderBattleHand(); // update hand UI to remove dead pet's cards
  }

  // Boss shakes left, hit pet shakes right
  const bossSprite = document.getElementById('battle-boss-sprite');
  const petSprite  = document.getElementById(`battle-pet-sprite-${target.idx}`);
  if (bossSprite) {
    bossSprite.classList.remove('shake-atk');
    void bossSprite.offsetWidth;
    bossSprite.classList.add('shake-atk');
    setTimeout(() => bossSprite?.classList.remove('shake-atk'), 400);
  }
  if (petSprite) {
    petSprite.classList.remove('shake-hit');
    void petSprite.offsetWidth;
    petSprite.classList.add('shake-hit');
    setTimeout(() => petSprite?.classList.remove('shake-hit'), 400);
  }
  bDmgFloat(`battle-pet-unit-${target.idx}`, dmg, crit, false, superEffective);

  renderBattlePets();

  const allDead = bSt.pets.every(p => !p || p.hp <= 0);
  if (allDead) {
    bSt.ended = true;
    setTimeout(() => endBattle(false), 600);
    return;
  }
  setTimeout(newBattleRound, 800);
}

function newBattleRound() {
  if (!bSt || bSt.ended) return;
  bSt.playerTurn = true;
  bSt.ap = Math.min(bSt.maxAp, bSt.ap + 2);
  // Draw until hand has 3 cards (drawCards skips dead-pet cards internally)
  if (bSt.hand.length < 3 && bSt.deck.length > 0) {
    drawCards(bSt.deck, bSt.hand, 3 - bSt.hand.length);
  }
  renderBattleUI();
}

function bDmgFloat(parentId, dmg, crit, heal = false, superEffective = false) {
  const parent = document.getElementById(parentId);
  if (!parent) return;
  const el = document.createElement('div');
  el.className = 'b-dmg-float' + (crit ? ' b-dmg-float--crit' : '') + (heal ? ' b-dmg-float--heal' : '') + (superEffective ? ' b-dmg-float--super' : '');
  const numberText = heal ? `+${dmg}` : (crit ? `💥${dmg}` : `${dmg}`);
  el.innerHTML = superEffective
    ? `<div class="b-dmg-float__super-label">${t('battle.super_effective')}</div>${numberText}`
    : numberText;
  parent.style.position = 'relative';
  parent.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function endBattle(win) {
  if (!bSt) return;
  bSt.ended      = true;
  bSt.playerTurn = false;

  if (win) sfxVictory(); else sfxDefeat();

  trackQuestEvent('boss_battle');
  trackQuestEvent('battle_count');

  // Clear-record tracking stays gated by isFirstTime (unlocks the next boss),
  // but is independent of whether the wheel shows — the wheel now always
  // shows on a win, regardless of how many times this boss was beaten before.
  if (win && bSt.isFirstTime) {
    const cleared = loadClearedBosses();
    if (!cleared.includes(bSt.boss.id)) {
      cleared.push(bSt.boss.id);
      saveClearedBosses(cleared);
      trackQuestEvent('boss_clear');
      trackQuestEvent('boss_clear_all', cleared.length);
    }
  }

  const overlay  = document.getElementById('battle-result-overlay');
  const titleEl  = document.getElementById('battle-result-title');
  const descEl   = document.getElementById('battle-result-desc');
  const closeBtn = document.getElementById('btn-battle-close');
  if (!overlay) return;

  overlay.classList.remove('hidden');
  if (win) {
    titleEl.textContent    = `🏆 ${t('battle.victory')}`;
    descEl.textContent     = t('battle.victory.desc');
    closeBtn.textContent   = t('battle.spin');
    closeBtn.dataset.wheel = '1';
  } else {
    titleEl.textContent   = `💀 ${t('battle.defeat')}`;
    descEl.textContent    = `${t(bSt.boss.nameKey)} ${t('battle.defeat.desc')}`;
    closeBtn.textContent  = t('battle.confirm');
    closeBtn.dataset.wheel = '0';
  }
}

function closeBattleModal() {
  const btn   = document.getElementById('btn-battle-close');
  const wheel = btn?.dataset.wheel === '1';
  const boss  = bSt?.boss || null;
  bSt = null;
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
  addCoins(reward, '寶箱獎勵');
  trackQuestEvent('treasure');
  sfxTreasure();
  showWorldGemFloat(reward);
  showToast(`💎 +${reward} ${t('toast.treasure')}`);
  updateWorldHUD();

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
  applyLang();
}

function hideWorldPage() {
  document.getElementById('tab-explore')?.classList.remove('map-active');
  document.getElementById('explore-world-sub').style.display = 'none';
  document.getElementById('explore-lobby').style.display     = 'flex';
  if (worldWatchId !== null) {
    navigator.geolocation?.clearWatch(worldWatchId);
    worldWatchId = null;
  }
  applyLang();
}

// ─── Audio Engine (Web Audio API, synthesized 8-bit SFX + BGM) ─────────────
const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioCtxClass();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function loadSoundSettings() {
  try {
    return { sfxOn: true, bgmOn: true, volume: 0.8, ...JSON.parse(localStorage.getItem('soundSettings') || '{}') };
  } catch { return { sfxOn: true, bgmOn: true, volume: 0.8 }; }
}
function saveSoundSettings(s) { localStorage.setItem('soundSettings', JSON.stringify(s)); }
function getMasterVolume() { return loadSoundSettings().volume ?? 0.8; }

// ── SFX ──────────────────────────────────────────────────────────────────
function sfxClick() {
  if (!loadSoundSettings().sfxOn) return;
  const ctx = getAudioCtx();
  const vol = getMasterVolume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.3 * vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
}

function sfxFeed() {
  if (!loadSoundSettings().sfxOn) return;
  const ctx = getAudioCtx();
  const vol = getMasterVolume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'square';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
  osc.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
  gain.gain.setValueAtTime(0.2 * vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
}

function sfxLevelUp() {
  if (!loadSoundSettings().sfxOn) return;
  const ctx = getAudioCtx();
  const vol = getMasterVolume();
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
    gain.gain.setValueAtTime(0.2 * vol, ctx.currentTime + i * 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.14);
    osc.start(ctx.currentTime + i * 0.15);
    osc.stop(ctx.currentTime + i * 0.15 + 0.15);
  });
}

function sfxGacha() {
  if (!loadSoundSettings().sfxOn) return;
  const ctx = getAudioCtx();
  const vol = getMasterVolume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'square';
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.5);
  gain.gain.setValueAtTime(0.3 * vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  osc.start();
  osc.stop(ctx.currentTime + 0.5);
}

function sfxAttack() {
  if (!loadSoundSettings().sfxOn) return;
  const ctx = getAudioCtx();
  const vol = getMasterVolume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.4 * vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  osc.start();
  osc.stop(ctx.currentTime + 0.15);
}

function sfxVictory() {
  if (!loadSoundSettings().sfxOn) return;
  const ctx = getAudioCtx();
  const vol = getMasterVolume();
  const notes = [523, 523, 784, 523, 784, 1047];
  const times = [0, 0.2, 0.4, 0.7, 0.9, 1.1];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + times[i]);
    gain.gain.setValueAtTime(0.2 * vol, ctx.currentTime + times[i]);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + times[i] + 0.18);
    osc.start(ctx.currentTime + times[i]);
    osc.stop(ctx.currentTime + times[i] + 0.2);
  });
}

function sfxDefeat() {
  if (!loadSoundSettings().sfxOn) return;
  const ctx = getAudioCtx();
  const vol = getMasterVolume();
  const notes = [400, 350, 300, 200];
  const times = [0, 0.2, 0.4, 0.7];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + times[i]);
    gain.gain.setValueAtTime(0.2 * vol, ctx.currentTime + times[i]);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + times[i] + 0.18);
    osc.start(ctx.currentTime + times[i]);
    osc.stop(ctx.currentTime + times[i] + 0.2);
  });
}

function sfxTreasure() {
  if (!loadSoundSettings().sfxOn) return;
  const ctx = getAudioCtx();
  const vol = getMasterVolume();
  const notes = [659, 784, 880, 1047];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
    gain.gain.setValueAtTime(0.2 * vol, ctx.currentTime + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.1);
    osc.start(ctx.currentTime + i * 0.1);
    osc.stop(ctx.currentTime + i * 0.1 + 0.1);
  });
}

// ── BGM (looping 8-bit melody) ──────────────────────────────────────────
let bgmIntervalId = null;
let bgmGainNode   = null;

function startBGM() {
  console.log('BGM started');
  if (bgmIntervalId) return; // already running
  if (!loadSoundSettings().bgmOn) return;
  const ctx = getAudioCtx();
  console.log('AudioContext state:', ctx.state);
  if (ctx.state === 'suspended') ctx.resume();
  bgmGainNode = ctx.createGain();
  bgmGainNode.gain.setValueAtTime(0.12 * getMasterVolume(), ctx.currentTime);
  bgmGainNode.connect(ctx.destination);

  const melody  = [262, 294, 330, 349, 392, 349, 330, 294];
  const noteDur = 0.3;

  const playLoop = () => {
    const startTime = ctx.currentTime;
    melody.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.connect(bgmGainNode);
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, startTime + i * noteDur);
      osc.start(startTime + i * noteDur);
      osc.stop(startTime + i * noteDur + noteDur * 0.8);
    });
  };

  playLoop();
  bgmIntervalId = setInterval(playLoop, melody.length * noteDur * 1000);
}

function stopBGM() {
  if (bgmIntervalId) { clearInterval(bgmIntervalId); bgmIntervalId = null; }
  if (bgmGainNode) { try { bgmGainNode.disconnect(); } catch {} bgmGainNode = null; }
}

function setMasterVolume(volume) {
  if (bgmGainNode) bgmGainNode.gain.setValueAtTime(0.12 * volume, getAudioCtx().currentTime);
}

// ── Unlock AudioContext + start BGM on first user interaction ──────────
function unlockAudioOnFirstInteraction() {
  document.addEventListener('click', () => {
    console.log('First click detected — unlocking audio');
    getAudioCtx(); // creates + resumes context
    if (loadSoundSettings().bgmOn) startBGM();
  }, { once: true });
}

// ── Generic "button click" SFX, delegated globally ──────────────────────
function initSfxClickDelegation() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('button')) sfxClick();
  });
}

// ─── Settings: Sound ───────────────────────────────────────────────────────
function toggleSoundSetting(key, checked) {
  const s = loadSoundSettings();
  s[key] = checked;
  saveSoundSettings(s);
  if (key === 'bgmOn') {
    if (checked) startBGM(); else stopBGM();
  }
}

function updateVolume(value) {
  const s = loadSoundSettings();
  const volume = Math.max(0, Math.min(100, parseInt(value, 10))) / 100;
  s.volume = volume;
  saveSoundSettings(s);
  setMasterVolume(volume);
  const valEl = document.getElementById('volume-value');
  if (valEl) valEl.textContent = Math.round(volume * 100);
}

// ─── Settings: Game ────────────────────────────────────────────────────────
// Note: language is handled by lang.js (currentLang / setLang / localStorage 'language'),
// not stored here — gameSettings only covers notification toggles.
function loadGameSettings() {
  try {
    return { hungerAlert: false, questAlert: false, ...JSON.parse(localStorage.getItem('gameSettings') || '{}') };
  } catch { return { hungerAlert: false, questAlert: false }; }
}
function saveGameSettings(s) { localStorage.setItem('gameSettings', JSON.stringify(s)); }

function toggleGameSetting(key, checked) {
  const s = loadGameSettings();
  if (!checked) {
    s[key] = false;
    saveGameSettings(s);
    return;
  }
  if (!('Notification' in window)) {
    s[key] = true;
    saveGameSettings(s);
    return;
  }
  if (Notification.permission === 'granted') {
    s[key] = true;
    saveGameSettings(s);
  } else if (Notification.permission === 'denied') {
    showToast('請在瀏覽器設定開啟通知權限');
    s[key] = false;
    saveGameSettings(s);
    renderSettingsTab();
  } else {
    Notification.requestPermission().then(perm => {
      const updated = loadGameSettings();
      if (perm === 'granted') {
        updated[key] = true;
      } else {
        showToast('請在瀏覽器設定開啟通知權限');
        updated[key] = false;
      }
      saveGameSettings(updated);
      renderSettingsTab();
    });
  }
}

// ─── Settings: Account / Data ──────────────────────────────────────────────
function loadPlayerName() { return localStorage.getItem('playerName') || ''; }
function savePlayerNameInput(name) { localStorage.setItem('playerName', name); }

function exportSaveData() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    data[key] = localStorage.getItem(key);
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `pixelpet-save-${getDateStr(new Date())}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('💾 存檔已匯出');
}

function importSaveData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      Object.keys(data).forEach(key => localStorage.setItem(key, data[key]));
      showToast('✅ 存檔已匯入，重新整理中...');
      setTimeout(() => location.reload(), 800);
    } catch {
      showToast('❌ 存檔檔案格式錯誤');
    }
  };
  reader.readAsText(file);
}

function doClearSaveData() {
  localStorage.clear();
  closeModal('modal-clear-confirm');
  location.reload();
}

// ─── Settings: Render ──────────────────────────────────────────────────────
function renderLangPicker() {
  const grid = document.getElementById('lang-picker-grid');
  if (!grid) return;
  grid.innerHTML = Object.entries(LANGUAGES).map(([code, label]) =>
    `<button class="lang-picker-btn${code === currentLang ? ' active' : ''}" data-lang="${code}" onclick="setLang('${code}')">${label}</button>`
  ).join('');
}

function renderSettingsTab() {
  const sound = loadSoundSettings();
  const game  = loadGameSettings();
  const name  = loadPlayerName();

  const sfxEl    = document.getElementById('toggle-sfx');
  const musicEl  = document.getElementById('toggle-music');
  const volEl    = document.getElementById('range-volume');
  const volValEl = document.getElementById('volume-value');
  const volPct   = Math.round((sound.volume ?? 0.8) * 100);
  if (sfxEl)    sfxEl.checked        = sound.sfxOn;
  if (musicEl)  musicEl.checked      = sound.bgmOn;
  if (volEl)    volEl.value          = volPct;
  if (volValEl) volValEl.textContent = volPct;

  renderLangPicker();

  const hungerEl = document.getElementById('toggle-hunger-alert');
  const questEl  = document.getElementById('toggle-quest-alert');
  if (hungerEl) hungerEl.checked = game.hungerAlert;
  if (questEl)  questEl.checked  = game.questAlert;

  const nameEl = document.getElementById('input-player-name');
  if (nameEl) nameEl.value = name;
}

// ─── App Tracking Transparency ────────────────────────────────────────────────
// No bundler in this project, so the plugin is loaded as a plain global via
// vendor/capacitor.js + vendor/capacitor-att.js (see index.html) instead of
// `import` — registerPlugin() in those scripts exposes it on Capacitor.Plugins.
// isNativePlatform() is false in a regular browser, so this is a no-op there.
async function requestATT() {
  if (!window.Capacitor?.isNativePlatform?.()) return;
  try {
    const { status } = await Capacitor.Plugins.AppTrackingTransparency.requestPermission();
    console.log('ATT status:', status);
  } catch (e) {
    console.error('ATT request failed:', e);
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
function init() {
  // Registered first so a later render/init failure can never prevent the
  // audio-unlock listener from being attached (BGM would otherwise never play).
  unlockAudioOnFirstInteraction();
  initSfxClickDelegation();
  requestATT();

  checkDailyPPReset();
  initStepHistory();
  initAdWatchCount();
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
  initShopCards();
  initGacha();
  initQuestTab();
  initExploreCards();
  renderSettingsTab();
  applyLang(); // re-apply after all dynamic rendering above (lang.js's own DOMContentLoaded fires earlier)
  setInterval(decayStats, DECAY_INTERVAL);
}

document.addEventListener('DOMContentLoaded', init);
