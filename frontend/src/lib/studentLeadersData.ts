export interface StudentLeaderItem {
  id: string | number;
  role: string;
  name: string;
  grade: string;
  wing: "Primary" | "Secondary";
  house?: string;
  duties?: string;
  category?: "Council" | "House Captain" | "Prefect" | string;
}

export const DEFAULT_STUDENT_LEADERS: StudentLeaderItem[] = [
  // ==================== PRIMARY WING (13 LEADERS) ====================
  {
    id: "lead-pri-1",
    role: "Head Boy",
    name: "Immanual Jafferson.S",
    grade: "Std V",
    wing: "Primary",
    category: "Council",
    duties: "Leading the primary pupil body, coordinating morning assemblies, and representing junior student interests with faculty.",
  },
  {
    id: "lead-pri-2",
    role: "Head Girl",
    name: "Inshika Shri.S",
    grade: "Std V",
    wing: "Primary",
    category: "Council",
    duties: "Guiding primary student initiatives, welcoming school guests, and maintaining classroom harmony and peer friendship.",
  },
  {
    id: "lead-pri-3",
    role: "Sports Captain",
    name: "Harish.S",
    grade: "Std V",
    wing: "Primary",
    category: "Council",
    duties: "Coordinating junior sports meets, physical training drills, and promoting fair play and energetic sportsmanship.",
  },
  {
    id: "lead-pri-4",
    role: "Sports Captain",
    name: "Yashika.D",
    grade: "Std V",
    wing: "Primary",
    category: "Council",
    duties: "Organizing primary athletic activities, track events, and motivating young athletes during inter-house games.",
  },
  {
    id: "lead-pri-5",
    role: "Cultural Leader",
    name: "Keerthana.V",
    grade: "Std V",
    wing: "Primary",
    category: "Council",
    duties: "Directing primary cultural celebrations, storytelling sessions, music performances, and festival assemblies.",
  },
  {
    id: "lead-pri-6",
    role: "Captain",
    name: "Pratheesh.B",
    grade: "Std V",
    wing: "Primary",
    house: "Galilee House",
    category: "House Captain",
    duties: "Leading Galilee House in primary sports, quizzes, and discipline assemblies.",
  },
  {
    id: "lead-pri-7",
    role: "Vice Captain",
    name: "Nivedha.N",
    grade: "Std V",
    wing: "Primary",
    house: "Galilee House",
    category: "House Captain",
    duties: "Assisting the House Captain in squad coordination and inter-house preparation.",
  },
  {
    id: "lead-pri-8",
    role: "Captain",
    name: "Jeshwanth.S",
    grade: "Std V",
    wing: "Primary",
    house: "Zion House",
    category: "House Captain",
    duties: "Directing Zion House members, fostering team spirit, and inspiring moral character.",
  },
  {
    id: "lead-pri-9",
    role: "Vice Captain",
    name: "Jaclin Nibola.J",
    grade: "Std V",
    wing: "Primary",
    house: "Zion House",
    category: "House Captain",
    duties: "Managing house points allocation, sports lineups, and classroom cleanliness.",
  },
  {
    id: "lead-pri-10",
    role: "Captain",
    name: "Praveen Sai.B",
    grade: "Std V",
    wing: "Primary",
    house: "Judah House",
    category: "House Captain",
    duties: "Inspiring courage and sporting determination in all Judah House competitions.",
  },
  {
    id: "lead-pri-11",
    role: "Vice Captain",
    name: "Sree Dharshini.I",
    grade: "Std V",
    wing: "Primary",
    house: "Judah House",
    category: "House Captain",
    duties: "Coordinating relay squads, attendance, and encouraging participation in house events.",
  },
  {
    id: "lead-pri-12",
    role: "Captain",
    name: "Jayakandhan.M.D",
    grade: "Std V",
    wing: "Primary",
    house: "Bethel House",
    category: "House Captain",
    duties: "Directing Bethel House environmental care, campus stewardship, and academic excellence.",
  },
  {
    id: "lead-pri-13",
    role: "Vice Captain",
    name: "Danya Shree.R",
    grade: "Std V",
    wing: "Primary",
    house: "Bethel House",
    category: "House Captain",
    duties: "Supporting house members in creative arts, literary contests, and sports assemblies.",
  },

  // ==================== SECONDARY / SENIOR WING (20 LEADERS) ====================
  {
    id: "lead-sen-1",
    role: "Head Boy",
    name: "P. Kishore",
    grade: "XII - A",
    wing: "Secondary",
    category: "Council",
    duties: "Chief student representative, managing the prefectorial board, coordinating school celebrations, and liaising directly with the Principal.",
  },
  {
    id: "lead-sen-2",
    role: "Head Girl",
    name: "M. Akshaya",
    grade: "XII - C",
    wing: "Secondary",
    category: "Council",
    duties: "Chief student leader presiding over student governance, mentorship circles, academic forums, and community outreach programs.",
  },
  {
    id: "lead-sen-3",
    role: "Vice Head Boy",
    name: "B. Ashwanth",
    grade: "XII - A",
    wing: "Secondary",
    category: "Council",
    duties: "Assisting the Head Boy in day-to-day discipline, morning assembly alignment, and committee oversight.",
  },
  {
    id: "lead-sen-4",
    role: "Vice Head Girl",
    name: "A. Monisha",
    grade: "XII - B",
    wing: "Secondary",
    category: "Council",
    duties: "Assisting the Head Girl in student council duties, cultural arrangements, and junior student welfare.",
  },
  {
    id: "lead-sen-5",
    role: "Sport Secretary",
    name: "N. Divya Dharshini",
    grade: "XII - A",
    wing: "Secondary",
    category: "Council",
    duties: "Directing the annual Sports Day, zonal athletic meets, inter-school tournaments, and campus physical fitness.",
  },
  {
    id: "lead-sen-6",
    role: "Asst. Sport Secretary",
    name: "F. Calvin Mawia",
    grade: "XII - A",
    wing: "Secondary",
    category: "Council",
    duties: "Supporting sports equipment management, ground organization, and scheduling inter-house leagues.",
  },
  {
    id: "lead-sen-7",
    role: "Cultural Secretary",
    name: "R. Sripriya",
    grade: "XII - B",
    wing: "Secondary",
    category: "Council",
    duties: "Leading the drama, dance, and music ensembles for Annual Day, Teachers' Day, and festive school galas.",
  },
  {
    id: "lead-sen-8",
    role: "Literary Secretary",
    name: "P. Gayathri",
    grade: "XII - C",
    wing: "Secondary",
    category: "Council",
    duties: "Coordinating school debating society, editorial club, elocution contests, and library symposiums.",
  },
  {
    id: "lead-sen-9",
    role: "Captain",
    name: "G. Ajith Kumar",
    grade: "XII - B",
    wing: "Secondary",
    house: "St. Matthew House",
    category: "House Captain",
    duties: "Leading St. Matthew House in high school athletic championships, debates, and points tally.",
  },
  {
    id: "lead-sen-10",
    role: "Vice Captain",
    name: "D. Sairathi",
    grade: "XII - C",
    wing: "Secondary",
    house: "St. Matthew House",
    category: "House Captain",
    duties: "Assisting the House Captain in organizing march-past contingents and quiz delegations.",
  },
  {
    id: "lead-sen-11",
    role: "Captain",
    name: "R. Sree Hari",
    grade: "XII - A",
    wing: "Secondary",
    house: "St. Mark House",
    category: "House Captain",
    duties: "Inspiring St. Mark House members to athletic supremacy and energetic participation in all campus meets.",
  },
  {
    id: "lead-sen-12",
    role: "Vice Captain",
    name: "P. Akshaya",
    grade: "XII - B",
    wing: "Secondary",
    house: "St. Mark House",
    category: "House Captain",
    duties: "Supporting the captain with senior sports squads, attendance verification, and house discipline.",
  },
  {
    id: "lead-sen-13",
    role: "Captain",
    name: "B. Jaya Prakash",
    grade: "XII - C",
    wing: "Secondary",
    house: "St. Luke House",
    category: "House Captain",
    duties: "Commanding St. Luke House in science fairs, humanitarian service projects, and sports tournaments.",
  },
  {
    id: "lead-sen-14",
    role: "Vice Captain",
    name: "B. Priya Dharshini",
    grade: "XII - A",
    wing: "Secondary",
    house: "St. Luke House",
    category: "House Captain",
    duties: "Coordinating house literary entries, assembly presentations, and student sports coaching.",
  },
  {
    id: "lead-sen-15",
    role: "Captain",
    name: "G. Nithish Kumar",
    grade: "XII - C",
    wing: "Secondary",
    house: "St. John House",
    category: "House Captain",
    duties: "Leading St. John House with dedication in academics, speech competitions, and athletic events.",
  },
  {
    id: "lead-sen-16",
    role: "Vice Captain",
    name: "K. Soniya",
    grade: "XII - A",
    wing: "Secondary",
    house: "St. John House",
    category: "House Captain",
    duties: "Managing house points tracking, sports cheer squads, and inter-house cultural showcases.",
  },
  {
    id: "lead-sen-17",
    role: "Senior Student Prefect",
    name: "G. Vijay Vignesh",
    grade: "XII - A",
    wing: "Secondary",
    category: "Prefect",
    duties: "Maintaining high school corridor order, monitoring morning arrivals, and ensuring student punctuality.",
  },
  {
    id: "lead-sen-18",
    role: "Senior Student Prefect",
    name: "N. Raju Yogi",
    grade: "XII - B",
    wing: "Secondary",
    category: "Prefect",
    duties: "Assisting during campus break periods, library study hours, and maintaining assembly line discipline.",
  },
  {
    id: "lead-sen-19",
    role: "Senior Student Prefect",
    name: "R. Sathya Priya",
    grade: "XII - B",
    wing: "Secondary",
    category: "Prefect",
    duties: "Supporting campus cleanliness, monitoring canteen areas, and helping junior students with campus guidance.",
  },
  {
    id: "lead-sen-20",
    role: "Senior Student Prefect",
    name: "S. Karnika",
    grade: "XII - B",
    wing: "Secondary",
    category: "Prefect",
    duties: "Assisting school events management, visitor guidance during parent-teacher meetings, and lab discipline.",
  },
];

const LOCAL_STORAGE_KEY = "brotherhood_student_leaders_v2";

export function getLocalLeaderOverrides(): {
  added: StudentLeaderItem[];
  modified: Record<string, Partial<StudentLeaderItem>>;
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

export function saveLocalLeaderOverride(data: {
  added?: StudentLeaderItem[];
  modified?: Record<string, Partial<StudentLeaderItem>>;
  deleted?: string[];
}) {
  if (typeof window === "undefined") return;
  const current = getLocalLeaderOverrides();
  const next = {
    added: data.added !== undefined ? data.added : current.added,
    modified: data.modified !== undefined ? data.modified : current.modified,
    deleted: data.deleted !== undefined ? data.deleted : current.deleted,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
}

export function inferWing(grade: string, role?: string): "Primary" | "Secondary" {
  const g = (grade || "").toLowerCase();
  const r = (role || "").toLowerCase();
  if (g.includes("std v") || g.includes("std iv") || g.includes("std iii") || g.includes("std ii") || g.includes("std i") || g.includes("primary") || r.includes("primary")) {
    return "Primary";
  }
  if (g.includes("xii") || g.includes("xi") || g.includes("x") || g.includes("ix") || g.includes("viii") || g.includes("vii") || g.includes("vi") || r.includes("senior") || r.includes("prefect")) {
    return "Secondary";
  }
  return "Secondary";
}

export function getMergedStudentLeaders(apiLeaders?: any[]): StudentLeaderItem[] {
  const overrides = getLocalLeaderOverrides();
  const deletedSet = new Set((overrides.deleted || []).map((id) => String(id).toLowerCase().trim()));

  // 1. Start with defaults
  const leaderMap = new Map<string, StudentLeaderItem>();

  DEFAULT_STUDENT_LEADERS.forEach((item) => {
    const idKey = String(item.id).toLowerCase().trim();
    const nameKey = item.name.toLowerCase().trim();
    if (deletedSet.has(idKey) || deletedSet.has(nameKey)) return;

    let mergedItem = { ...item };
    if (overrides.modified[item.id]) {
      mergedItem = { ...mergedItem, ...overrides.modified[item.id] };
    }
    leaderMap.set(idKey, mergedItem);
  });

  // 2. Merge API items
  if (Array.isArray(apiLeaders) && apiLeaders.length > 0) {
    apiLeaders.forEach((apiItem) => {
      const apiId = String(apiItem.id || "");
      const apiName = (apiItem.name || "").trim();
      const nameKey = apiName.toLowerCase();

      if (deletedSet.has(apiId.toLowerCase()) || deletedSet.has(nameKey)) return;

      // Find if matches existing default by name or id
      let matchKey: string | null = null;
      for (const [k, v] of leaderMap.entries()) {
        if (k === apiId.toLowerCase() || (v.name && v.name.toLowerCase().trim() === nameKey)) {
          matchKey = k;
          break;
        }
      }

      const wing = apiItem.wing || inferWing(apiItem.grade, apiItem.role);
      const formattedItem: StudentLeaderItem = {
        id: apiItem.id || `api-${apiName}`,
        role: apiItem.role || "Council Leader",
        name: apiItem.name || "Student Leader",
        grade: apiItem.grade || "Secondary",
        wing: wing,
        house: apiItem.house,
        duties: apiItem.duties || "Student council representative and pupil committee leader.",
        category: apiItem.category || (apiItem.role?.includes("Captain") ? "House Captain" : apiItem.role?.includes("Prefect") ? "Prefect" : "Council"),
      };

      if (matchKey) {
        const existing = leaderMap.get(matchKey)!;
        leaderMap.set(matchKey, { ...existing, ...formattedItem });
      } else {
        leaderMap.set(apiId.toLowerCase() || `lead-${nameKey}`, formattedItem);
      }
    });
  }

  // 3. Add locally added items
  (overrides.added || []).forEach((item) => {
    const idKey = String(item.id).toLowerCase().trim();
    const nameKey = item.name.toLowerCase().trim();
    if (deletedSet.has(idKey) || deletedSet.has(nameKey)) return;
    leaderMap.set(idKey, item);
  });

  return Array.from(leaderMap.values());
}
