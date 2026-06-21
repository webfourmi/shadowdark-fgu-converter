const APP_VERSION = "v1.9";

const statMapping = {
  STR: { raw: "formax", bonus: "modfor", final: "for" },
  DEX: { raw: "dexmax", bonus: "moddex", final: "dex" },
  CON: { raw: "conmax", bonus: "modcon", final: "con" },
  INT: { raw: "intmax", bonus: "modint", final: "int" },
  WIS: { raw: "sagmax", bonus: "modsag", final: "sag" },
  CHA: { raw: "chamax", bonus: "modcha", final: "cha" }
};

// traduction en français
const ANCESTRY_TRANSLATIONS = {
  "Human": "Humain",
  "Dwarf": "Nain",
  "Elf": "Elfe",
  "Goblin": "Gobelin",
  "Half-Orc": "Demi-orc",
  "Halfling": "Halfelin",
  "Kobold": "Kobold",
  
};

const CLASS_TRANSLATIONS = {
  "Fighter": "Guerrier",
  "Priest": "Prêtre",
  "Thief": "Voleur",
  "Wizard": "Magicien",
  "Bard": "Barde",
  "Ranger": "Rodeur",
  
  "Knight of St. Ydris": "Chevalier de Saint Ydris",
  "Knight of St Ydris": "Chevalier de Saint Ydris",
  "Warlock": "Occultiste",
  "Witch": "Sorcière"
};

const ALIGNMENT_TRANSLATIONS = {
  "Lawful": "Loyal",
  "Chaotic": "Chaotique",
  "Neutral": "Neutre"
};

const BACKGROUND_TRANSLATIONS = {
  "Urchin": "Gamin des rues",
  "Wanted": "Recherché",
  "Cult Initiate": "Initié d’une secte",
  "Thieves' Guild": "Guilde des voleurs",
  "Thieves Guild": "Guilde des voleurs",
  "Banished": "Banni",
  "Orphaned": "Orphelin",
  "Wizard's Apprentice": "Apprenti magicien",
  "Wizards Apprentice": "Apprenti magicien",
  "Jeweler": "Joaillier",
  "Herbalist": "Herboriste",
  "Barbarian": "Barbare",
  "Mercenary": "Mercenaire",
  "Sailor": "Marin",
  "Acolyte": "Acolyte",
  "Soldier": "Soldat",
  "Forester": "Forestier",
  "Scout": "Éclaireur",
  "Minstrel": "Ménestrel",
  "Scholar": "Érudit",
  "Noble": "Noble",
  "Chirurgeon": "Chirurgien",
  "Hermit": "Ermite",
  "Outcast": "Paria",
  "Woodborn": "Né des bois",
  "Amnesiac": "Amnésique",
  "Haunted": "Hanté",
  "Fugitive": "Fugitif",
  "Feytouched": "Touché par les fées",
  "Witchborn": "Né-sorcier",
  "Forager": "Glaneur",
  "Redeemer": "Rédempteur",
  "Marked": "Marqué",
  "Sacrifice": "Sacrifié",
  "Marooned": "Abandonné",
  "Fallen": "Déchu",
  "Drawn": "Appelé",
  "Ascetic": "Ascète",
  "Wolfchild": "Enfant-loup",
  "Healer": "Guérisseur",
  "Chosen": "Élu",
  "Demonborn": "Né-démon"
};

const TITLE_TRANSLATIONS = {
  "Shaman": "Chaman",
  "Warrior": "Guerrier",
  "Knight": "Chevalier",
  "Champion": "Champion",
  "Warlord": "Seigneur de guerre",
  "Gladiator": "Gladiateur",
  "Veteran": "Vétéran",
  "Soldier": "Soldat",

  "Acolyte": "Acolyte",
  "Priest": "Prêtre",
  "Oracle": "Oracle",
  "Prophet": "Prophète",
  "Saint": "Saint",
  "Exorcist": "Exorciste",
  "Templar": "Templier",

  "Thief": "Voleur",
  "Rogue": "Roublard",
  "Burglar": "Cambrioleur",
  "Cutpurse": "Coupe-bourse",
  "Assassin": "Assassin",
  "Spy": "Espion",
  "Master Thief": "Maître voleur",

  "Wizard": "Magicien",
  "Mage": "Mage",
  "Magician": "Magicien",
  "Sorcerer": "Sorcier",
  "Warlock": "Occultiste",
  "Witch": "Sorcière",
  "Enchanter": "Enchanteur",
  "Conjurer": "Invocateur",
  "Necromancer": "Nécromancien",
  "Seer": "Voyant",
  "Sage": "Sage",
  
    // Knight of St. Ydris
  "Arbiter": "Arbitre",
  "Enforcer": "Exécuteur",
  "Knight Marshal": "Chevalier-maréchal",
  "Judge": "Juge",
  "Justicar": "Justicier",
  "Traitor": "Traître",
  "Fallen": "Déchu",
  "Oathbreaker": "Briseur de serment",
  "Blackguard": "Chevalier félon",
  "Demonlord": "Seigneur démon",
  "Brother/Sister": "Frère/Sœur",
  "Exorcist": "Exorciste",
  "Reverend Knight": "Chevalier révérend",
  "Inquisitor": "Inquisiteur",
  "Grand Inquisitor": "Grand inquisiteur",

  // Warlock
  "Favored": "Favori",
  "Herald": "Héraut",
  "Eminent": "Éminent",
  "Exalted": "Exalté",
  "Incarnation": "Incarnation",
  "Marked": "Marqué",
  "Zealot": "Zélote",
  "Occultist": "Occultiste",
  "Champion": "Champion",
  "Harbinger": "Présage",
  "Chosen": "Élu",
  "Channeler": "Canaliseur",
  "Prophesied": "Prophétisé",
  "Transcendent": "Transcendant",
  "Avatar": "Avatar",

  // Witch
  "Fortune Teller": "Diseuse de bonne aventure",
  "Far Seer": "Voyant lointain",
  "Prophet": "Prophète",
  "Wise One": "Sage",
  "Baba": "Baba",
  "Whisperer": "Murmureuse",
  "Hexer": "Jeteuse de sorts",
  "Hag/Elder": "Sorcière ancienne",
  "Crone/Uncle": "Vieille/Oncle",
  "Shaman": "Chaman",
  "Conjurer": "Conjuratrice",
  "Soothsayer": "Prophétesse",
  "Conduit": "Canal"
};

const PATRON_TRANSLATIONS = {
  "Almazzat": "Almazzat",
  "Kytheros": "Kytheros",
  "Shune the Vile": "Shune la Vile",
  "Mugdulblub": "Mugdulblub",
  "Titania": "Titania",
  "The Willowman": "L’Homme-Saule"
};

const ANCESTRY_TALENTS = {
  "Human": ["HUMAIN"],
  "Dwarf": ["NAIN"],
  "Elf": ["ELFE"],
  "Goblin": ["GOBELIN"],
  "Half-Orc": ["DEMI-ORQUE"],
  "Halfling": ["HALFELIN"],
  "kobold": ["KOBOLD"]
};

const CLASS_TALENTS = {
   "Bard": [
    "B/Arts bardiques",
    "B/ Magicien amateur.",
    "B/ Présence.",
    "B/ Prolifique"
  ],
  
  "Fighter": [
    "G/ Bête de somme",
    "G/ Cran.",
    "G/ Maîtrise des armes."
  ],
  "Wizard": [
    "M/ Apprentissage des sorts",
    "M/ Incantation."
  ],
  "Priest": [
    "P/ Divinité.",
    "P/ Incantation",
    "P/ Renvoi des morts-vivants"
  ],
   "Ranger": [
    "R/ Herboristerie.",
    "R/ Intuitions"
  ],
  "Thief": [
    "V/ Attaque sournoise.",
    "V/ Compétences de voleur"
  ],
    "Knight of St. Ydris": [
    "C/ Possession démoniaque",
    "C/ Incantation de chevalier"
  ],
  "Knight of St Ydris": [
    "C/ Possession démoniaque",
    "C/ Incantation de chevalier"
  ],
  "Warlock": [
    "S/ Patron",
    "S/ Don du patron"
  ],
  "Witch": [
    "SS/ Familier",
    "SS/ Incantation de sorcière"
  ]
};
const LANGUAGE_TRANSLATIONS = {
  "Common": "Commun",
  "Dwarvish": "Nain",
  "Elvish": "Elfique",
  "Goblin": "Gobelin",
  "Orcish": "Orque",
  "Draconic": "Draconique",
  "Diabolic": "Diabolique",
  "Primordial": "Primordial",
  "Sylvan": "Sylvain",
  "Thanian": "Thanien",
  "Reptilian": "Reptilien",
  "Merran": "Merran",
  "Giant": "Géant",
  "Celestial": "Céleste",
  "Chaotic": "Chaotique"
};
const GEAR_TRANSLATIONS = {
  // Armes
  "Dagger": "Dague",
  "Club": "Gourdin",
  "Staff": "Bâton",
  "Shortsword": "Épée courte",
  "Sword": "Épée",
  "Longsword": "Épée longue",
  "Greatsword": "Épée à deux mains",
  "Axe": "Hache",
  "Greataxe": "Grande hache",
  "Mace": "Masse",
  "Spear": "Lance",
  "Shortbow": "Arc court",
  "Longbow": "Arc long",
  "Crossbow": "Arbalète",
  "Javelin": "Javeline",

  // Armures
  "Leather Armor": "Armure de cuir",
  "Chainmail": "Cotte de mailles",
  "Plate Mail": "Harnois",
  "Shield": "Bouclier",

  // Équipement courant
  "Backpack": "Sac à dos",
  "Torch": "Torche",
  "Lantern": "Lanterne",
  "Oil, flask": "Huile, flasque",
  "Flask or bottle": "Flasque ou bouteille",
  "Caltrops (one bag)": "Chausse-trappes (un sac)",
  "Rope, 60'": "Corde, 18 m",
  "Rope": "Corde",
  "Rations": "Rations",
  "Iron spikes": "Pitons de fer",
  "Flint and steel": "Silex et amadou",
  "Crowbar": "Pied-de-biche",
  "Grappling hook": "Grappin",
  "Hammer": "Marteau",
  "Mirror": "Miroir",
  "Pole, 10'": "Perche, 3 m",
  "Sack": "Sac",
  "Waterskin": "Outre",
  "Bedroll": "Couverture de voyage",
  "Thieves' tools": "Outils de voleur",
  "Holy symbol": "Symbole sacré",
  "Spellbook": "Grimoire",
  "Ink": "Encre",
  "Quill": "Plume",
  "Parchment": "Parchemin",
  "Chalk": "Craie"
};

const SPELL_TRANSLATIONS = {
  "Alarm": "ALARME",
  "Alter Self": "ALTÉRATION PHYSIQUE",
  "Anchor Object": "ANCRAGE D’OBJET",

  "Mage Armor": "ARMURE DE MAGE",
  "Armor of Faith": "BOUCLIER DE LA FOI",
  "Shield of Faith": "BOUCLIER DE LA FOI",
  "Holy Weapon": "ARME SACRÉE",
  "Augury": "AUGURE",
  "Bless": "BÉNÉDICTION",
  "Charm Person": "CHARME-PERSONNE",

  "Feather Fall": "CHUTE DE PLUME",
  "Chastisement": "CHÂTIMENT",
  "Floating Disk": "DISQUE FLOTTANT",
  "Detect Magic": "DÉTECTION DE LA MAGIE",
  "Detect Thoughts": "DÉTECTION DES PENSÉES",
  "Hold Portal": "FERMETURE",

  "Acid Arrow": "FLÈCHE ACIDE",
  "Cure Wounds": "GUÉRISON DES BLESSURES",
  "Mirror Image": "IMAGE MIROIR",
  "Invisibility": "INVISIBILITÉ",
  "Light": "LUMIÈRE",
  "Levitate": "LÉVITATION",
  "Burning Hands": "MAINS BRÛLANTES",

  "Mistwalk": "MARCHE DES BRUMES",
  "Knock": "OUVERTURE",
  "Hold Person": "PARALYSIE",
  "Magic Missile": "PROJECTILE MAGIQUE",
  "Protection from Evil": "PROTECTION CONTRE LE MAL",
  "Turn Undead": "RENVOI DES MORTS-VIVANTS",
  "Silence": "SILENCE",
  "Sleep": "SOMMEIL",
  "Web": "TOILE D’ARAIGNÉE",
  "Zone of Truth": "ZONE DE VÉRITÉ",

  "Deafen": "AVEUGLER/ASSOURDIR",
  "Blind/Deafen": "AVEUGLER/ASSOURDIR",
  "Blindness/Deafness": "AVEUGLER/ASSOURDIR"
};

const DEITY_TRANSLATIONS = {
  "Ord": "Ord",
  "Madeera": "Madeera",
  "Memnon": "Memnon",
  "Ramlaat": "Ramlaat",
  "Shune": "Shune",
  "Gede": "Gede",

  "Saint Terragnis": "Saint Terragnis",
  "St. Terragnis": "Saint Terragnis",
  "St Terragnis": "Saint Terragnis",

  "None": "",
  "No Deity": "",
  "": ""
};
function translateValue(value, dictionary) {
  if (!value) return "";

  return dictionary[value] || value;
}


function shadowdarkModifier(score) {
  return Math.floor((score - 10) / 2);
}

function escapeXml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function xmlString(name, value) {
  return `    <${name} type="string">${escapeXml(value)}</${name}>\n`;
}

function xmlNumber(name, value) {
  return `    <${name} type="number">${Number(value) || 0}</${name}>\n`;
}
function xmlDice(name, value) {
  return `    <${name} type="dice">${escapeXml(value)}</${name}>\n`;
}
function makeId(index) {
  return "id-" + String(index + 1).padStart(5, "0");
}

function splitCommaList(value) {
  if (!value) return [];

  return String(value)
    .split(",")
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

function buildLanguageList(languagesText) {
  const languages = splitCommaList(languagesText);

  if (languages.length === 0) {
    return `    <languagelist />\n`;
  }

  let xml = `    <languagelist>\n`;

  languages.forEach((language, index) => {
    const id = makeId(index);

    xml += `      <${id}>\n`;
   const translatedLanguage = translateValue(language, LANGUAGE_TRANSLATIONS);
    xml += `        <name type="string">${escapeXml(translatedLanguage)}</name>\n`;
    xml += `      </${id}>\n`;
  });

  xml += `    </languagelist>\n`;

  return xml;
}

function buildInventoryList(gear) {
  if (!Array.isArray(gear) || gear.length === 0) {
    return `    <inventorylist />\n`;
  }

  let xml = `    <inventorylist>\n`;

  gear.forEach((item, index) => {
    const id = makeId(index);
    const quantity = Number(item.quantity ?? 1);
    const slots = Number(item.slots ?? 0);

    xml += `      <${id}>\n`;
    xml += `        <carried type="number">1</carried>\n`;
    xml += `        <count type="number">${quantity}</count>\n`;
    xml += `        <locked type="number">1</locked>\n`;
    const translatedName = translateValue(item.name, GEAR_TRANSLATIONS) || "Objet";
    xml += `        <name type="string">${escapeXml(translatedName)}</name>\n`;
    xml += `        <weight type="number">${slots}</weight>\n`;
    xml += `      </${id}>\n`;
  });

  xml += `    </inventorylist>\n`;

  return xml;
}

function buildSpellsFromBonuses(bonuses, spellsKnownText) {
  let spells = [];

  if (Array.isArray(bonuses)) {
    bonuses.forEach(bonus => {
      const isSpell =
        bonus.sourceCategory === "Ability" &&
        String(bonus.name || "").startsWith("Spell:");

      if (isSpell && bonus.bonusName) {
        const tierMatch = String(bonus.bonusTo || "").match(/Tier:(\d+)/);
        const tier = tierMatch ? Number(tierMatch[1]) : 1;

        spells.push({
          name: bonus.bonusName,
          rank: tier
        });
      }
    });
  }

  // Sécurité : si les sorts ne sont pas trouvés dans bonuses,
  // on utilise spellsKnown.
  if (spells.length === 0) {
    spells = splitCommaList(spellsKnownText).map(name => ({
      name,
      rank: 1
    }));
  }

  if (spells.length === 0) {
    return `    <sorts />\n`;
  }

  let xml = `    <sorts>\n`;

  spells.forEach((spell, index) => {
    const id = makeId(index);

    xml += `      <${id}>\n`;
    xml += `        <ComboBox1 type="string"></ComboBox1>\n`;
    xml += `        <ComboBox2 type="string"></ComboBox2>\n`;
    xml += `        <FormattedText1 type="formattedtext">\n`;
    xml += `          <p />\n`;
    xml += `        </FormattedText1>\n`;
    xml += `        <linkspell type="windowreference">\n`;
    xml += `          <class>sort_card</class>\n`;
    xml += `          <recordname />\n`;
    xml += `        </linkspell>\n`;
    xml += `        <locked type="number">1</locked>\n`;
    const translatedSpellName = translateValue(spell.name, SPELL_TRANSLATIONS);
    const markedSpellName = markSpellToReplace(translatedSpellName);

    xml += `        <name type="string">${escapeXml(markedSpellName)}</name>\n`;
    xml += `        <NumberField1 type="number">0</NumberField1>\n`;
    xml += `        <NumberField2 type="number">0</NumberField2>\n`;
    xml += `        <spellrank type="number">${Number(spell.rank || 1)}</spellrank>\n`;
    xml += `      </${id}>\n`;
  });

  xml += `    </sorts>\n`;

  return xml;
}


function buildTalents(data) {
  const talents = [];
  const alreadyAdded = new Set();

  function addTalent(name, text = "") {
    if (!name) return;

    const key = name.trim();

    if (alreadyAdded.has(key)) return;

    alreadyAdded.add(key);

    talents.push({
      name: key,
      text: text || ""
    });
  }

  const ancestryTalents = ANCESTRY_TALENTS[data.ancestry] || [];
  ancestryTalents.forEach(name => {
    addTalent(name, "Talent d’ascendance.");
  });

  const translatedPatron = translateValue(data.patron, PATRON_TRANSLATIONS);
  xml += xmlString("patron", translatedPatron);

  const classTalents = CLASS_TALENTS[data.class] || [];
  classTalents.forEach(name => {
    addTalent(name, "Talent de classe.");
  });

  if (Array.isArray(data.levels)) {
    data.levels.forEach(levelInfo => {
      const talentName = levelInfo.talentRolledName || "";
      const talentDesc = levelInfo.talentRolledDesc || "";

      if (!talentName) return;

      if (talentName.includes("Plus2")) return;
      if (talentName.includes("Stat")) return;
      if (talentName.includes("OrPlus1Casting")) return;

      addTalent(talentName, talentDesc);
    });
  }

  if (Array.isArray(data.bonuses)) {
    data.bonuses.forEach(bonus => {
      if (bonus.sourceCategory !== "Talent") return;

      const bonusName = bonus.name || "";
      const bonusTo = bonus.bonusTo || "";
      const bonusLabel = bonus.bonusName || "";

      if (!bonusName) return;

      if (bonusLabel === "StatBonus") return;
      if (bonusTo.includes(":+2")) return;
      if (bonusTo.includes(":+1")) return;

      addTalent(bonusName, bonusTo || bonusLabel);
    });
  }

  if (talents.length === 0) {
    return `    <talents />\n`;
  }

  let xml = `    <talents>\n`;

  talents.forEach((talent, index) => {
    const id = makeId(index);

    xml += `      <${id}>\n`;
    xml += `        <Checkbox1 type="number">0</Checkbox1>\n`;
    xml += `        <Checkbox2 type="number">0</Checkbox2>\n`;
    xml += `        <Checkbox3 type="number">0</Checkbox3>\n`;
    xml += `        <FormattedText1 type="formattedtext">\n`;
    xml += `          <p>${escapeXml(talent.text || "")}</p>\n`;
    xml += `        </FormattedText1>\n`;
    xml += `        <linktalent type="windowreference">\n`;
    xml += `          <class>talent_card</class>\n`;
    xml += `          <recordname />\n`;
    xml += `        </linktalent>\n`;
    const markedTalentName = markTalentToReplace(talent.name);
    xml += `        <name type="string">${escapeXml(markedTalentName)}</name>\n`;
    xml += `      </${id}>\n`;
  });

  xml += `    </talents>\n`;

  return xml;
}

function markTalentToReplace(talentName) {
  if (!talentName) return "";

  const cleanName = String(talentName).trim();

  if (cleanName.startsWith("★")) {
    return cleanName;
  }

  return "★ " + cleanName;
}
function markSpellToReplace(spellName) {
  if (!spellName) return "";

  const cleanName = String(spellName).trim();

  if (cleanName.startsWith("★")) {
    return cleanName;
  }

  return "★ " + cleanName;
}

function getFirstWeapon(data) {
  if (!Array.isArray(data.gear)) return null;

  return data.gear.find(item => item.type === "weapon") || null;
}

function getWeaponDamageDie(weaponName) {
  const name = String(weaponName || "").toLowerCase();

  if (name.includes("dagger")) return "d4";
  if (name.includes("staff")) return "d4";
  if (name.includes("club")) return "d4";
  if (name.includes("shortsword")) return "d6";
  if (name.includes("sword")) return "d8";
  if (name.includes("axe")) return "d8";
  if (name.includes("mace")) return "d6";
  if (name.includes("spear")) return "d6";
  if (name.includes("bow")) return "d6";
  if (name.includes("crossbow")) return "d6";

  return "d6";
}

function convertJsonToXml() {
  const input = document.getElementById("jsonInput").value;
  const output = document.getElementById("xmlOutput");

  let data;

  try {
    data = JSON.parse(input);
  } catch (error) {
    output.value = "ERREUR : le JSON n'est pas valide.";
    return;
  }

  const stats = data.stats || {};

  function getScore(stat) {
    return Number(stats[stat] ?? 10);
  }

  function getMod(stat) {
    return shadowdarkModifier(getScore(stat));
  }

  const strMod = getMod("STR");
  const dexMod = getMod("DEX");
  const conMod = getMod("CON");
  const intMod = getMod("INT");
  const wisMod = getMod("WIS");
  const chaMod = getMod("CHA");

 const characterName = data.name || "Personnage sans nom";

let xml = "";
xml += `<?xml version="1.0" encoding="utf-8"?>\n`;
xml += `<root version="5.1" dataversion="20260124" release="0|CoreRPG:7">\n`;


xml += `  <character>\n`;
  // Champs techniques et listes vides
  xml += xmlNumber("_bonusincant", 0);
  xml += `    <abilitylist />\n`;

  // Identité
  const translatedAncestry = translateValue(data.ancestry, ANCESTRY_TRANSLATIONS);
  const translatedClass = translateValue(data.class, CLASS_TRANSLATIONS);
  const translatedAlignment = translateValue(data.alignment, ALIGNMENT_TRANSLATIONS);
  const translatedBackground = translateValue(data.background, BACKGROUND_TRANSLATIONS);
  const translatedTitle = translateValue(data.title, TITLE_TRANSLATIONS);
  const translatedDeity = translateValue(data.deity, DEITY_TRANSLATIONS);

  const characterTitle = data.title || "";
  const characterDeity = data.deity || "";

  xml += xmlString("ancestry", translatedAncestry);
  xml += xmlString("class", translatedClass);
  xml += xmlString("title", translatedTitle);
  xml += xmlString("alignment", translatedAlignment);
  xml += xmlString("background", translatedBackground);
  xml += xmlString("deity", translatedDeity);
  xml += xmlString("appearance", data.appearance || "");
  xml += xmlNumber("level", data.level || 1);
  xml += xmlNumber("xp", data.XP ?? data.xp ?? 0);

  // Défense et PV basiques
  const armorClass = data.ac ?? data.armorClass ?? data.AC ?? 10;
  const hpMax = data.hpmax ?? data.hpMax ?? data.maxHitPoints ?? data.hitPoints ?? data.hp ?? 1;
  const hpCurrent = data.hpcurrent ?? data.hpCurrent ?? hpMax;
  
  xml += xmlNumber("ac", armorClass);
  xml += xmlNumber("hpcurrent", hpCurrent);
  xml += xmlNumber("hpmax", hpMax);
  xml += xmlNumber("fatal", data.fatal || 4);

  // Caractéristiques : valeurs brutes, modificateurs et champs doublés
  xml += xmlNumber("formax", getScore("STR"));
  xml += xmlNumber("modfor", strMod);
  xml += xmlNumber("for", strMod);
  xml += xmlNumber("FOR", strMod);
  xml += xmlNumber("str", strMod);

  xml += xmlNumber("dexmax", getScore("DEX"));
  xml += xmlNumber("moddex", dexMod);
  xml += xmlNumber("dex", dexMod);
  xml += xmlNumber("DEX", dexMod);

  xml += xmlNumber("conmax", getScore("CON"));
  xml += xmlNumber("modcon", conMod);
  xml += xmlNumber("con", conMod);
  xml += xmlNumber("CON", conMod);

  xml += xmlNumber("intmax", getScore("INT"));
  xml += xmlNumber("modint", intMod);
  xml += xmlNumber("int", intMod);
  xml += xmlNumber("INT", intMod);

  xml += xmlNumber("sagmax", getScore("WIS"));
  xml += xmlNumber("modsag", wisMod);
  xml += xmlNumber("sag", wisMod);
  xml += xmlNumber("SAG", wisMod);
  xml += xmlNumber("wis", wisMod);

  xml += xmlNumber("chamax", getScore("CHA"));
  xml += xmlNumber("modcha", chaMod);
  xml += xmlNumber("cha", chaMod);
  xml += xmlNumber("CHA", chaMod);
  
  xml += xmlString("name", characterName);

  // Effets temporaires
  xml += xmlNumber("effetfor", 0);
  xml += xmlNumber("effetdex", 0);
  xml += xmlNumber("effetcon", 0);
  xml += xmlNumber("effetint", 0);
  xml += xmlNumber("effetsag", 0);
  xml += xmlNumber("effetcha", 0);

  // Avantage / désavantage
  xml += xmlNumber("rollmode", 0);
  xml += xmlNumber("forav", 0);
  xml += xmlNumber("fordes", 0);
  xml += xmlNumber("FORAV", 0);
  xml += xmlNumber("FORDES", 0);

  // Initiative
  xml += xmlNumber("init", dexMod);
  xml += xmlNumber("init_normal", 0);
  xml += xmlNumber("init_av", 0);
  xml += xmlNumber("init_des", 0);

  // Attaques par défaut
  const firstWeapon = getFirstWeapon(data);
  const firstWeaponName = firstWeapon ? firstWeapon.name : "";
  
 const translatedFirstWeaponName = translateValue(firstWeaponName, GEAR_TRANSLATIONS);

  xml += xmlString("attackname", data.attackname || translatedFirstWeaponName || "");
  xml += xmlString("attackname2", data.attackname2 || "");
  xml += xmlString("attackname3", data.attackname3 || "");
  
  xml += xmlString("attribute", data.attribute || "DEX");
  xml += xmlString("attribute2", data.attribute2 || "DEX");
  xml += xmlString("attribute3", data.attribute3 || "FOR");

  xml += xmlNumber("attackbonus", data.attackbonus || 0);

  xml += xmlNumber("ATK1", 0);
  xml += xmlNumber("ATK1_normal", 0);
  xml += xmlNumber("ATK1_av", 0);
  xml += xmlNumber("ATK1_des", 0);

  xml += xmlNumber("ATK2", 0);
  xml += xmlNumber("ATK2_normal", 0);
  xml += xmlNumber("ATK2_av", 0);
  xml += xmlNumber("ATK2_des", 0);

  xml += xmlNumber("ATK3", 0);
  xml += xmlNumber("ATK3_normal", 0);
  xml += xmlNumber("ATK3_av", 0);
  xml += xmlNumber("ATK3_des", 0);

  xml += xmlNumber("modatk1", 0);
  xml += xmlNumber("modatk2", 0);
  xml += xmlNumber("modatk3", 0);

  xml += xmlNumber("mod_arme1", 0);
  xml += xmlNumber("mod_arme2", 0);
  xml += xmlNumber("mod_arme3", 0);

  const weaponDie = getWeaponDamageDie(firstWeaponName);
  
  xml += xmlDice("DieField1", weaponDie);
  xml += xmlDice("DieField2", "d4");
  xml += xmlDice("DieField3", "d6");
  xml += xmlDice("dm_arme1", weaponDie);

  // Argent
  const gold = data.po ?? data.gold ?? data.gp ?? 0;
  const silver = data.pa ?? data.silver ?? data.sp ?? 0;
  const copper = data.pc ?? data.copper ?? data.cp ?? 0;
  
  xml += xmlNumber("po", gold);
  xml += xmlNumber("pa", silver);
  xml += xmlNumber("pc", copper);

    xml += `    <coins>\n`;
    xml += `      <slot1>\n`;
    xml += `        <amount type="number">${Number(gold || 0)}</amount>\n`;
    xml += `        <name type="string">PO</name>\n`;
    xml += `      </slot1>\n`;
    xml += `      <slot2>\n`;
    xml += `        <amount type="number">${Number(silver || 0)}</amount>\n`;
    xml += `        <name type="string">PA</name>\n`;
    xml += `      </slot2>\n`;
    xml += `      <slot3>\n`;
    xml += `        <amount type="number">${Number(copper || 0)}</amount>\n`;
    xml += `        <name type="string">PC</name>\n`;
    xml += `      </slot3>\n`;
    xml += `      <slot4><amount type="number">0</amount></slot4>\n`;
    xml += `      <slot5><amount type="number">0</amount></slot5>\n`;
    xml += `      <slot6><amount type="number">0</amount></slot6>\n`;
    xml += `    </coins>\n`;

  // Encombrement
  const gearSlotsTotal = data.gearSlotsTotal ?? 10;
  const gearSlotsUsed = data.gearSlotsUsed ?? 0;
  
  xml += xmlNumber("bonuspoids", 0);
  xml += xmlNumber("encumbranceload", gearSlotsUsed);
  xml += `    <encumbrance>\n`;
  xml += `      <load type="number">${Number(gearSlotsUsed || 0)}</load>\n`;
  xml += `    </encumbrance>\n`;
  xml += xmlNumber("poidsmax", gearSlotsTotal);
  xml += xmlNumber("poidsobjets", gearSlotsUsed);
  xml += xmlNumber("poidspieces", 0);
  xml += xmlNumber("poidstotal", gearSlotsUsed);

  // Listes vides compatibles avec ta fiche
  xml += buildInventoryList(data.gear);
  xml += buildLanguageList(data.languages);
  xml += `    <maincategorylist />\n`;
  xml += buildSpellsFromBonuses(data.bonuses, data.spellsKnown);
  xml += buildTalents(data);

   // Champs divers présents dans ton ruleset
  
  xml += xmlFormattedText("FormattedText1", "");
  xml += xmlNumber("NumberField1", 0);
  xml += xmlNumber("NumberField2", 0);
  xml += xmlNumber("NumberField3", 0);
  xml += xmlString("StringCycler1", "DEX");
  xml += `    <portrait type="token"></portrait>\n`;
  xml += `    <token type="token"></token>\n`;
  xml += `    <token3Dflat type="token"></token3Dflat>\n`;

  xml += `  </character>\n`;
  xml += `</root>\n`;

  output.value = xml;
}



function xmlFormattedText(name, value) {
  const safeValue = escapeXml(value || "");
  return `    <${name} type="formattedtext"><p>${safeValue}</p></${name}>\n`;
}

function downloadXml() {
  const xml = document.getElementById("xmlOutput").value;

  if (!xml.trim() || xml.startsWith("ERREUR")) {
    alert("Convertis d'abord un JSON valide.");
    return;
  }

  let filename = "personnage_shadowdark.xml";

  try {
    const input = document.getElementById("jsonInput").value;
    const data = JSON.parse(input);

    const safeName = String(data.name || "personnage")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

    filename = `${safeName || "personnage"}_shadowdark.xml`;
  } catch (error) {
    filename = "personnage_shadowdark.xml";
  }

  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

function clearAll() {
  document.getElementById("jsonInput").value = "";
  document.getElementById("xmlOutput").value = "";
}
document.addEventListener("DOMContentLoaded", () => {
  const versionElement = document.getElementById("appVersion");

  if (versionElement) {
    versionElement.textContent = APP_VERSION;
  }
});
