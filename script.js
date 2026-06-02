const statMapping = {
  STR: { raw: "formax", bonus: "modfor", final: "for" },
  DEX: { raw: "dexmax", bonus: "moddex", final: "dex" },
  CON: { raw: "conmax", bonus: "modcon", final: "con" },
  INT: { raw: "intmax", bonus: "modint", final: "int" },
  WIS: { raw: "sagmax", bonus: "modsag", final: "sag" },
  CHA: { raw: "chamax", bonus: "modcha", final: "cha" }
};

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
    xml += `        <name type="string">${escapeXml(language)}</name>\n`;
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
    xml += `        <name type="string">${escapeXml(item.name || "Objet")}</name>\n`;
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
    xml += `        <name type="string">${escapeXml(spell.name)}</name>\n`;
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

  if (Array.isArray(data.levels)) {
    data.levels.forEach(levelInfo => {
      if (levelInfo.talentRolledName) {
        talents.push({
          name: levelInfo.talentRolledName,
          text: levelInfo.talentRolledDesc || ""
        });
      }
    });
  }

  if (Array.isArray(data.bonuses)) {
    data.bonuses.forEach(bonus => {
      if (bonus.sourceCategory === "Talent" && bonus.name) {
        const alreadyExists = talents.some(talent => talent.name === bonus.name);

        if (!alreadyExists) {
          talents.push({
            name: bonus.name,
            text: bonus.bonusTo || bonus.bonusName || ""
          });
        }
      }
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
    xml += `        <name type="string">${escapeXml(talent.name)}</name>\n`;
    xml += `      </${id}>\n`;
  });

  xml += `    </talents>\n`;

  return xml;
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

  let xml = "";
  xml += `<?xml version="1.0" encoding="utf-8"?>\n`;
  xml += `<root version="5.1" dataversion="20260124" release="0|CoreRPG:7">\n`;
  xml += `  <character>\n`;

  // Champs techniques et listes vides
  xml += xmlNumber("_bonusincant", 0);
  xml += `    <abilitylist />\n`;

  // Identité
  xml += xmlString("name", data.name || "Personnage sans nom");
  xml += xmlString("ancestry", data.ancestry || "");
  xml += xmlString("class", data.class || "");
  xml += xmlString("appearance", data.appearance || "");
  xml += xmlNumber("level", data.level || 1);
  xml += xmlNumber("xp", data.xp || 0);

  // Défense et PV basiques
  xml += xmlNumber("ac", data.ac || 10);
  xml += xmlNumber("hpcurrent", data.hpcurrent || data.hpmax || 1);
  xml += xmlNumber("hpmax", data.hpmax || 1);
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
  xml += xmlString("attackname", data.attackname || "");
  xml += xmlString("attackname2", data.attackname2 || "");
  xml += xmlString("attackname3", data.attackname3 || "");
  xml += xmlString("attribute", data.attribute || "FOR");
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

  xml += xmlDice("DieField1", "d6");
  xml += xmlDice("DieField2", "d4");
  xml += xmlDice("DieField3", "d6");
  xml += xmlDice("dm_arme1", "d6");

  // Argent
  xml += xmlNumber("po", data.po || 0);
  xml += xmlNumber("pa", data.pa || 0);
  xml += xmlNumber("pc", data.pc || 0);

  xml += `    <coins>\n`;
  xml += `      <slot1>\n`;
  xml += `        <amount type="number">${Number(data.po || 0)}</amount>\n`;
  xml += `        <name type="string">PO</name>\n`;
  xml += `      </slot1>\n`;
  xml += `      <slot2><amount type="number">0</amount></slot2>\n`;
  xml += `      <slot3><amount type="number">0</amount></slot3>\n`;
  xml += `      <slot4><amount type="number">0</amount></slot4>\n`;
  xml += `      <slot5><amount type="number">0</amount></slot5>\n`;
  xml += `      <slot6><amount type="number">0</amount></slot6>\n`;
  xml += `    </coins>\n`;

  // Encombrement
  xml += xmlNumber("bonuspoids", 0);
  xml += xmlNumber("encumbranceload", 0);
  xml += `    <encumbrance>\n`;
  xml += `      <load type="number">0</load>\n`;
  xml += `    </encumbrance>\n`;
  xml += xmlNumber("poidsmax", 10);
  xml += xmlNumber("poidsobjets", 0);
  xml += xmlNumber("poidspieces", 0);
  xml += xmlNumber("poidstotal", 0);

  // Listes vides compatibles avec ta fiche
  xml += `    <inventorylist />\n`;
  xml += `    <languagelist />\n`;
  xml += `    <maincategorylist />\n`;
  xml += `    <sorts />\n`;
  xml += `    <talents />\n`;

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

  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "personnage_shadowdark.xml";
  link.click();

  URL.revokeObjectURL(url);
}

function clearAll() {
  document.getElementById("jsonInput").value = "";
  document.getElementById("xmlOutput").value = "";
}
