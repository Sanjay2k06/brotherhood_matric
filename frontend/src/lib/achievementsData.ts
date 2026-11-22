export interface AchievementItem {
  id: string | number;
  type: "best_student" | "board_topper" | "sports";
  title: string;
  name: string;
  grade: string;
  reason: string;
  score?: string;
  stream?: string;
  award?: string;
  category?: string;
  image?: string;
}

export const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
  // 1. BEST STUDENTS OF THE MONTH (6)
  {
    id: "ach-bs-1",
    type: "best_student",
    title: "Best Student of the Month",
    name: "Master R. Sai Ganesh",
    grade: "Class XI-A",
    reason: "Outstanding programming project in Computer Science and leadership in STEM club.",
  },
  {
    id: "ach-bs-2",
    type: "best_student",
    title: "Best Student of the Month",
    name: "Miss S. Kavitha",
    grade: "Class XI-B",
    reason: "Excellent leadership in Commerce club activities and consistent academic support to peers.",
  },
  {
    id: "ach-bs-3",
    type: "best_student",
    title: "Best Student of the Month",
    name: "Master M. Vignesh",
    grade: "Class XI-C",
    reason: "Academic consistency and top scores in chemistry laboratory worksheets.",
  },
  {
    id: "ach-bs-4",
    type: "best_student",
    title: "Best Student of the Month",
    name: "Miss P. Harini",
    grade: "Class XII-A",
    reason: "Exemplary discipline, high attendance, and centum score in mathematics mock examinations.",
  },
  {
    id: "ach-bs-5",
    type: "best_student",
    title: "Best Student of the Month",
    name: "Master V. Rajesh",
    grade: "Class XII-B",
    reason: "Outstanding public speaking in the debate tournament and active commerce club volunteer.",
  },
  {
    id: "ach-bs-6",
    type: "best_student",
    title: "Best Student of the Month",
    name: "Miss K. Sneha",
    grade: "Class XII-C",
    reason: "Consistent academic performance of 95%+ marks and dedicated library club student helper.",
  },

  // 2. BOARD EXAM TOPPERS & CENTUM WINNERS (9)
  {
    id: "ach-top-1",
    type: "board_topper",
    title: "School Topper",
    name: "Master Kishore P.",
    grade: "Class XII - A",
    score: "594 / 600",
    stream: "Science Stream",
    reason: "Record-breaking aggregate score of 594/600 with centum in Physics and Computer Science.",
  },
  {
    id: "ach-top-2",
    type: "board_topper",
    title: "School 2nd Rank",
    name: "Miss Akshaya M.",
    grade: "Class XII - C",
    score: "595 / 600",
    stream: "Biology & Mathematics",
    reason: "Exemplary academic brilliance of 595/600 and distinction in medical entrance foundations.",
  },
  {
    id: "ach-top-3",
    type: "board_topper",
    title: "School 3rd Rank",
    name: "Miss Dhivya Dharshini N.",
    grade: "Class XII - A",
    score: "592 / 600",
    stream: "Science Stream",
    reason: "High honors with top grades across all subjects and overall excellence.",
  },
  {
    id: "ach-top-4",
    type: "board_topper",
    title: "Commerce Topper",
    name: "Miss Sripriya R.",
    grade: "Class XII - B",
    score: "589 / 600",
    stream: "Commerce Stream",
    reason: "Highest school score in Accountancy and Business Studies with state rank honors.",
  },
  {
    id: "ach-top-5",
    type: "board_topper",
    title: "Science Topper",
    name: "Miss Gayathri P.",
    grade: "Class XII - C",
    score: "588 / 600",
    stream: "Pure Science",
    reason: "Centum in chemistry and outstanding research projects in biology olympiads.",
  },
  {
    id: "ach-top-6",
    type: "board_topper",
    title: "Maths Distinction",
    name: "Master Ashwanth B.",
    grade: "Class XII - B",
    score: "585 / 600",
    stream: "Commerce with Maths",
    reason: "Perfect 100/100 centum in business mathematics and statistical applications.",
  },
  {
    id: "ach-top-7",
    type: "board_topper",
    title: "Primary Centum",
    name: "Master Harish S.",
    grade: "Class III",
    score: "99% Marks",
    stream: "Primary Wing",
    reason: "Top scorer in primary terminal evaluation with first rank in mathematics and environmental science.",
  },
  {
    id: "ach-top-8",
    type: "board_topper",
    title: "Primary Topper",
    name: "Miss Nivetha K.",
    grade: "Class V",
    score: "99.1% Marks",
    stream: "Primary Wing",
    reason: "Overall school junior academic scholar and winner of inter-school spellathon.",
  },
  {
    id: "ach-top-9",
    type: "board_topper",
    title: "Primary Star",
    name: "Miss Pooja S.",
    grade: "Class I",
    score: "98.5% Marks",
    stream: "Primary Wing",
    reason: "Exceptional language reading fluency and perfect score in foundational numeracy.",
  },

  // 3. SPORTS TROPHIES & WINS (3)
  {
    id: "ach-sp-1",
    type: "sports",
    title: "Zonal Athletic Meet (Track & Field)",
    name: "Senior Boys & Girls Relay Squad",
    grade: "Senior Secondary",
    award: "Overall Champions Trophy",
    category: "Senior Track & Field",
    reason: "Gold medals in 4x100m relay, 200m sprint, and high jump clinching the zonal shield.",
  },
  {
    id: "ach-sp-2",
    type: "sports",
    title: "District Inter-School Football Championship",
    name: "Under-17 Secondary Team",
    grade: "Classes IX to XI",
    award: "Gold Medal & Winner Trophy",
    category: "Under-17 Football",
    reason: "Undefeated champion run across five knockout matches to claim the district cup.",
  },
  {
    id: "ach-sp-3",
    type: "sports",
    title: "State Level Chess Olympiad",
    name: "Master V. Rajesh",
    grade: "Class XII - B",
    award: "First Prize & Grand Trophy",
    category: "Individual Senior Division",
    reason: "Flawless 7/7 victory in state rapid chess finals representing the district.",
  },
];

const LOCAL_STORAGE_KEY = "brotherhood_achievements_v2";

export function getLocalAchievementOverrides(): {
  added: AchievementItem[];
  modified: Record<string, Partial<AchievementItem>>;
  deleted: string[];
} {
  if (typeof window === "undefined") return { added: [], modified: {}, deleted: [] };
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return { added: [], modified: {}, deleted: [] };
    return JSON.parse(raw);
  } catch {
    return { added: [], modified: {}, deleted: [] };
  }
}

export function saveLocalAchievementOverride(data: {
  added?: AchievementItem[];
  modified?: Record<string, Partial<AchievementItem>>;
  deleted?: string[];
}) {
  if (typeof window === "undefined") return;
  const current = getLocalAchievementOverrides();
  const next = {
    added: data.added !== undefined ? data.added : current.added,
    modified: data.modified !== undefined ? data.modified : current.modified,
    deleted: data.deleted !== undefined ? data.deleted : current.deleted,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
}

export function getMergedAchievements(apiAchievements?: any[]): {
  all: AchievementItem[];
  bestStudents: AchievementItem[];
  boardToppers: AchievementItem[];
  sports: AchievementItem[];
} {
  const overrides = getLocalAchievementOverrides();
  const deletedSet = new Set((overrides.deleted || []).map((id) => String(id).toLowerCase().trim()));

  const map = new Map<string, AchievementItem>();

  DEFAULT_ACHIEVEMENTS.forEach((item) => {
    const idKey = String(item.id).toLowerCase();
    const nameKey = (item.name || "").toLowerCase().trim();
    if (deletedSet.has(idKey) || (nameKey && deletedSet.has(nameKey))) return;

    let merged = { ...item };
    if (overrides.modified[item.id]) {
      merged = { ...merged, ...overrides.modified[item.id] };
    }
    map.set(idKey, merged);
  });

  if (Array.isArray(apiAchievements) && apiAchievements.length > 0) {
    apiAchievements.forEach((apiItem) => {
      const apiId = String(apiItem.id || "");
      const rawTitle = apiItem.title || "";
      const rawDesc = apiItem.description || "";
      const nameKey = rawTitle.toLowerCase().trim();

      if (deletedSet.has(apiId.toLowerCase()) || (nameKey && deletedSet.has(nameKey))) return;

      let matchKey: string | null = null;
      for (const [k, v] of map.entries()) {
        const vName = (v.name || "").toLowerCase().trim();
        const vTitle = (v.title || "").toLowerCase().trim();
        if (k === apiId.toLowerCase() || (nameKey && (vName === nameKey || vTitle === nameKey))) {
          matchKey = k;
          break;
        }
      }

      // Infer type
      let type: "best_student" | "board_topper" | "sports" = "best_student";
      const tLower = rawTitle.toLowerCase();
      const dLower = rawDesc.toLowerCase();
      if (tLower.includes("championship") || tLower.includes("trophy") || tLower.includes("tournament") || tLower.includes("sports") || tLower.includes("olympiad") || tLower.includes("chess") || tLower.includes("relay") || tLower.includes("football")) {
        type = "sports";
      } else if (tLower.includes("rank") || tLower.includes("topper") || tLower.includes("centum") || tLower.includes("distinction") || dLower.includes("/ 600") || dLower.includes("% marks")) {
        type = "board_topper";
      }

      const parts = rawTitle.split(" - ");
      const awardTitle = parts[0] || (type === "best_student" ? "Best Student of the Month" : "Academic Honor");
      const name = parts[1] ? parts[1].replace(/\s*\(.*\)/, "") : rawTitle;

      const formatted: AchievementItem = {
        id: apiItem.id || `ach-${nameKey}`,
        type,
        title: awardTitle,
        name: name || "Outstanding Student",
        grade: "Secondary Wing",
        reason: rawDesc || "Awarded for exceptional performance, perseverance, and dedication.",
        image: apiItem.image || "",
      };

      if (matchKey) {
        map.set(matchKey, { ...map.get(matchKey)!, ...formatted });
      } else {
        map.set(apiId.toLowerCase() || `ach-${nameKey}`, formatted);
      }
    });
  }

  (overrides.added || []).forEach((item) => {
    const idKey = String(item.id || "").toLowerCase().trim();
    const nameKey = (item.name || "").toLowerCase().trim();
    const titleKey = (item.title || "").toLowerCase().trim();
    if (deletedSet.has(idKey) || (nameKey && deletedSet.has(nameKey)) || (titleKey && deletedSet.has(titleKey))) return;
    map.set(idKey || nameKey || titleKey, item);
  });

  const all = Array.from(map.values());
  return {
    all,
    bestStudents: all.filter((a) => a.type === "best_student"),
    boardToppers: all.filter((a) => a.type === "board_topper"),
    sports: all.filter((a) => a.type === "sports"),
  };
}
