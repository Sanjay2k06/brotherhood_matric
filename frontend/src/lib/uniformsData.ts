export interface SchoolUniformItem {
  id: string | number;
  section: string;
  boys_uniform: string;
  girls_uniform: string;
}

export const DEFAULT_UNIFORMS: SchoolUniformItem[] = [
  {
    id: "uni-1",
    section: "Primary (Classes I to V)",
    boys_uniform: "Navy blue shorts, light blue shirts, black shoes, school belt & tie.",
    girls_uniform: "Navy blue pinafore, light blue shirts, black shoes, school belt & tie.",
  },
  {
    id: "uni-2",
    section: "Secondary (Classes VI to XII)",
    boys_uniform: "Navy blue trousers, light blue shirts, black shoes, school belt & tie.",
    girls_uniform: "Navy blue salwar suit with light blue dupatta and black shoes.",
  },
];

const LOCAL_STORAGE_KEY = "brotherhood_uniforms_v2";

export function getLocalUniformOverrides(): {
  added: SchoolUniformItem[];
  modified: Record<string, Partial<SchoolUniformItem>>;
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

export function saveLocalUniformOverride(data: {
  added?: SchoolUniformItem[];
  modified?: Record<string, Partial<SchoolUniformItem>>;
  deleted?: string[];
}) {
  if (typeof window === "undefined") return;
  const current = getLocalUniformOverrides();
  const next = {
    added: data.added !== undefined ? data.added : current.added,
    modified: data.modified !== undefined ? data.modified : current.modified,
    deleted: data.deleted !== undefined ? data.deleted : current.deleted,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
}

export function getMergedUniforms(apiUniforms?: any[]): SchoolUniformItem[] {
  const overrides = getLocalUniformOverrides();
  const deletedSet = new Set((overrides.deleted || []).map((id) => String(id).toLowerCase().trim()));

  const map = new Map<string, SchoolUniformItem>();

  // 1. Defaults
  DEFAULT_UNIFORMS.forEach((item) => {
    const idKey = String(item.id).toLowerCase();
    const secKey = item.section.toLowerCase();
    if (deletedSet.has(idKey) || deletedSet.has(secKey)) return;

    let merged = { ...item };
    if (overrides.modified[item.id]) {
      merged = { ...merged, ...overrides.modified[item.id] };
    }
    map.set(idKey, merged);
  });

  // 2. API items
  if (Array.isArray(apiUniforms) && apiUniforms.length > 0) {
    apiUniforms.forEach((apiItem) => {
      const apiId = String(apiItem.id || "");
      const secKey = (apiItem.section || "").toLowerCase().trim();
      if (deletedSet.has(apiId.toLowerCase()) || deletedSet.has(secKey)) return;

      let matchKey: string | null = null;
      for (const [k, v] of map.entries()) {
        if (k === apiId.toLowerCase() || (v.section && v.section.toLowerCase().trim() === secKey)) {
          matchKey = k;
          break;
        }
      }

      const formatted: SchoolUniformItem = {
        id: apiItem.id || `uni-${secKey}`,
        section: apiItem.section || "Uniform Standard",
        boys_uniform: apiItem.boys_uniform || "Prescribed school boys uniform with black shoes.",
        girls_uniform: apiItem.girls_uniform || "Prescribed school girls uniform with black shoes.",
      };

      if (matchKey) {
        map.set(matchKey, { ...map.get(matchKey)!, ...formatted });
      } else {
        map.set(apiId.toLowerCase() || `uni-${secKey}`, formatted);
      }
    });
  }

  // 3. Local adds
  (overrides.added || []).forEach((item) => {
    const idKey = String(item.id || "").toLowerCase().trim();
    const secKey = (item.section || "").toLowerCase().trim();
    if (deletedSet.has(idKey) || (secKey && deletedSet.has(secKey))) return;
    map.set(idKey || secKey, item);
  });

  return Array.from(map.values());
}
