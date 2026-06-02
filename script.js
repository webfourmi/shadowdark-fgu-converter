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
  return `      <${name} type="string">${escapeXml(value)}</${name}>\n`;
}

function xmlNumber(name, value) {
  return `      <${name} type="number">${Number(value) || 0}</${name}>\n`;
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

  let xml = "";
  xml += `<?xml version="1.0" encoding="utf-8"?>\n`;
  xml += `<root>\n`;
  xml += `  <charsheet>\n`;
  xml += `    <id-00001>\n`;

  xml += xmlString("name", data.name || "Personnage sans nom");
  xml += xmlString("ancestry", data.ancestry || "");
  xml += xmlString("class", data.class || "");
  xml += xmlNumber("level", data.level || 1);

  const stats = data.stats || {};

  for (const stat in statMapping) {
    const score = Number(stats[stat] ?? 10);
    const modifier = shadowdarkModifier(score);
    const fields = statMapping[stat];

    xml += xmlNumber(fields.raw, score);
    xml += xmlNumber(fields.bonus, 0);
    xml += xmlNumber(fields.final, modifier);
  }

  xml += `    </id-00001>\n`;
  xml += `  </charsheet>\n`;
  xml += `</root>\n`;

  output.value = xml;
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
