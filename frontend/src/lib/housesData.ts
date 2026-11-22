export interface SchoolHouseItem {
  id: string | number;
  name: string;
  motto: string;
  color_code: string;
  description: string;
  points: number;
  wing?: "Primary" | "Senior" | string;
  captain?: string;
  captainClass?: string;
  viceCaptain?: string;
  viceCaptainClass?: string;
  values?: string;
}

export const DEFAULT_HOUSES: SchoolHouseItem[] = [
  // Primary Houses
  {
    id: "house-galilee",
    name: "Galilee House",
    motto: "Knowledge and Exploration",
    color_code: "bg-blue-600",
    points: 385,
    wing: "Primary",
    captain: "Pratheesh.B",
    captainClass: "Std V",
    viceCaptain: "Nivedha.N",
    viceCaptainClass: "Std V",
    values: "Curiosity • Logic • Academic Scholarship",
    description: "Inspiring deep inquisitiveness, scientific reasoning, and a passion for discovering truth in the natural and mathematical universe.",
  },
  {
    id: "house-zion",
    name: "Zion House",
    motto: "Strength and Faith",
    color_code: "bg-amber-500",
    points: 410,
    wing: "Primary",
    captain: "Jeshwanth.S",
    captainClass: "Std V",
    viceCaptain: "Jaclin Nibola.J",
    viceCaptainClass: "Std V",
    values: "Moral Integrity • Fortitude • Resilient Spirit",
    description: "Fostering unwavering character, spiritual strength, moral conviction, and upright leadership in times of challenge.",
  },
  {
    id: "house-judah",
    name: "Judah House",
    motto: "Courage and Praise",
    color_code: "bg-red-600",
    points: 395,
    wing: "Primary",
    captain: "Praveen Sai.B",
    captainClass: "Std V",
    viceCaptain: "Sree Dharshini.I",
    viceCaptainClass: "Std V",
    values: "Bravery • Athletic Passion • Team Endurance",
    description: "Encouraging bold enthusiasm on athletic fields, joyful participation in school events, and fearless dedication to excellence.",
  },
  {
    id: "house-bethel",
    name: "Bethel House",
    motto: "House of Peace",
    color_code: "bg-emerald-600",
    points: 400,
    wing: "Primary",
    captain: "Jayakandhan.M.D",
    captainClass: "Std V",
    viceCaptain: "Danya Shree.R",
    viceCaptainClass: "Std V",
    values: "Ecological Harmony • Serenity • Fellowship",
    description: "Guiding students toward environmental stewardship, peaceful peer collaboration, creative arts, and gentle benevolence.",
  },

  // Senior Houses
  {
    id: "house-st-matthew",
    name: "St. Matthew House",
    motto: "Grace and Wisdom",
    color_code: "bg-blue-700",
    points: 425,
    wing: "Senior",
    captain: "G. Ajith Kumar",
    captainClass: "XII - B",
    viceCaptain: "D. Sairathi",
    viceCaptainClass: "XII - C",
    values: "Scholastic Discipline • Insight • Mathematical Logic",
    description: "Nurturing rigorous academic thinking, intellectual clarity, and visionary scholastic research across senior streams.",
  },
  {
    id: "house-st-mark",
    name: "St. Mark House",
    motto: "Courage and Action",
    color_code: "bg-rose-600",
    points: 415,
    wing: "Senior",
    captain: "R. Sree Hari",
    captainClass: "XII - A",
    viceCaptain: "P. Akshaya",
    viceCaptainClass: "XII - B",
    values: "Athletic Supremacy • Rapid Action • Decisiveness",
    description: "Champions of speed, track and field excellence, physical endurance, and active student initiative.",
  },
  {
    id: "house-st-luke",
    name: "St. Luke House",
    motto: "Healing and Service",
    color_code: "bg-emerald-700",
    points: 440,
    wing: "Senior",
    captain: "B. Jaya Prakash",
    captainClass: "XII - C",
    viceCaptain: "B. Priya Dharshini",
    viceCaptainClass: "XII - A",
    values: "Compassionate Care • Biological Sciences • Civic Duty",
    description: "Instilling altruistic civic consciousness, biomedical inquisitiveness, and active philanthropic service to society.",
  },
  {
    id: "house-st-john",
    name: "St. John House",
    motto: "Love and Truth",
    color_code: "bg-amber-600",
    points: 430,
    wing: "Senior",
    captain: "G. Nithish Kumar",
    captainClass: "XII - C",
    viceCaptain: "K. Soniya",
    viceCaptainClass: "XII - A",
    values: "Eloquent Expression • Truthfulness • Moral Nobility",
    description: "Prioritizing oratorical eloquence, classical literature, artistic mastery, and steadfast commitment to timeless truth.",
  },
];

const LOCAL_STORAGE_KEY = "brotherhood_houses_v2";

export function getLocalHouseOverrides(): {
  added: SchoolHouseItem[];
  modified: Record<string, Partial<SchoolHouseItem>>;
  deleted: string[];
} {
  if (typeof window === "undefined") {
    return { added: [], modified: {}, deleted: [] };
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return { added: [], modified: {}, deleted: [] };
    return JSON.parse(raw);
  } catch {
    return { added: [], modified: {}, deleted: [] };
  }
}

export function saveLocalHouseOverride(data: {
  added?: SchoolHouseItem[];
  modified?: Record<string, Partial<SchoolHouseItem>>;
  deleted?: string[];
}) {
  if (typeof window === "undefined") return;
  const current = getLocalHouseOverrides();
  const next = {
    added: data.added !== undefined ? data.added : current.added,
    modified: data.modified !== undefined ? data.modified : current.modified,
    deleted: data.deleted !== undefined ? data.deleted : current.deleted,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
}

export function getMergedHouses(apiHouses?: any[]): SchoolHouseItem[] {
  const overrides = getLocalHouseOverrides();
  const deletedSet = new Set((overrides.deleted || []).map((id) => String(id).toLowerCase().trim()));

  const map = new Map<string, SchoolHouseItem>();

  DEFAULT_HOUSES.forEach((item) => {
    const idKey = String(item.id).toLowerCase();
    const nameKey = item.name.toLowerCase().trim();
    if (deletedSet.has(idKey) || deletedSet.has(nameKey)) return;

    let merged = { ...item };
    const localMod = overrides.modified[item.id] || overrides.modified[item.name] || overrides.modified[nameKey];
    if (localMod) {
      merged = { ...merged, ...localMod };
    }
    map.set(idKey, merged);
  });

  if (Array.isArray(apiHouses) && apiHouses.length > 0) {
    apiHouses.forEach((apiItem) => {
      const apiId = String(apiItem.id || "");
      const nameKey = (apiItem.name || "").toLowerCase().trim();
      if (deletedSet.has(apiId.toLowerCase()) || deletedSet.has(nameKey)) return;

      let matchKey: string | null = null;
      for (const [k, v] of map.entries()) {
        if (k === apiId.toLowerCase() || v.name.toLowerCase().trim() === nameKey) {
          matchKey = k;
          break;
        }
      }

      const existing = matchKey ? map.get(matchKey) : undefined;
      const formatted: SchoolHouseItem = {
        id: apiItem.id || `house-${nameKey}`,
        name: apiItem.name || existing?.name || "School House",
        motto: apiItem.motto || existing?.motto || "Honor and Excellence",
        values: apiItem.values || existing?.values || "",
        color_code: apiItem.color_code || existing?.color_code || "bg-blue-600",
        description: apiItem.description || existing?.description || "School house fostering team spirit and excellence.",
        points: typeof apiItem.points === "number" ? apiItem.points : (existing?.points ?? 400),
        wing: apiItem.wing || existing?.wing,
        captain: apiItem.captain || existing?.captain,
        captainClass: apiItem.captainClass || existing?.captainClass,
        viceCaptain: apiItem.viceCaptain || existing?.viceCaptain,
        viceCaptainClass: apiItem.viceCaptainClass || existing?.viceCaptainClass,
      };

      if (matchKey) {
        map.set(matchKey, { ...map.get(matchKey)!, ...formatted });
      } else {
        map.set(apiId.toLowerCase() || `house-${nameKey}`, formatted);
      }
    });
  }

  (overrides.added || []).forEach((item) => {
    const idKey = String(item.id).toLowerCase();
    if (deletedSet.has(idKey)) return;
    map.set(idKey, item);
  });

  return Array.from(map.values());
}
