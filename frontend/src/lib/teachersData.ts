export interface TeacherItem {
  id: string | number;
  name: string;
  designation: string;
  subject: string;
  qualification?: string;
  experience?: string;
  description?: string;
  image?: string;
}

export const DEFAULT_TEACHERS: TeacherItem[] = [
  // Mathematics
  { id: "teach-1", name: "Mr. T. Rajkumar Sam Kingsley", designation: "Head of Department", subject: "Mathematics", qualification: "M.Sc., M.Phil., B.Ed.", experience: "16 Years", description: "Department lead directing advanced higher secondary pure mathematics, calculus, and board coaching." },
  { id: "teach-2", name: "Mr. R. Loganathan", designation: "Senior Mathematics Educator", subject: "Mathematics", qualification: "M.Sc., B.Ed.", experience: "12 Years", description: "Specialist in trigonometry, coordinate geometry, and secondary competitive Olympiad coaching." },
  { id: "teach-3", name: "Mrs. C. Bhuvaneswari", designation: "Mathematics Educator", subject: "Mathematics", qualification: "B.Sc., B.Ed.", experience: "8 Years", description: "Focused on building strong analytical reasoning and algebraic fundamentals in junior classes." },
  { id: "teach-4", name: "Mrs. Nanthini", designation: "Mathematics Educator", subject: "Mathematics", qualification: "M.Sc., B.Ed.", experience: "9 Years", description: "Expert in arithmetic logic, geometric proofs, and interactive math lab exercises." },
  { id: "teach-5", name: "Mrs. F.L. Ancy Niruba", designation: "Mathematics Educator", subject: "Mathematics", qualification: "M.Sc., B.Ed.", experience: "10 Years", description: "Dedicated to simplifying complex mathematical theorems through conceptual clarity." },
  { id: "teach-6", name: "Mrs. S. Vaishnupriya", designation: "Mathematics Educator", subject: "Mathematics", qualification: "B.Sc., M.Ed.", experience: "7 Years", description: "Specializes in foundational numeracy, mental math techniques, and pupil assessment." },

  // Biology
  { id: "teach-7", name: "Mrs. S. Prabha Leethiyal", designation: "Head of Department", subject: "Biology", qualification: "M.Sc., B.Ed.", experience: "15 Years", description: "Leading the life sciences faculty with extensive expertise in botany, zoology, and medical entrance." },
  { id: "teach-8", name: "Mrs. M. Shakila Banu", designation: "Biology Educator", subject: "Biology", qualification: "M.Sc., B.Ed.", experience: "11 Years", description: "Passionate about genetics, physiology practicals, and guiding science exhibition projects." },

  // Physics
  { id: "teach-9", name: "Mrs. Helen Johnson", designation: "Senior Physics Educator", subject: "Physics", qualification: "B.Sc., M.A., B.Ed.", experience: "14 Years", description: "Demonstrating physical laws through real-world experiments, optics, and electrodynamics." },
  { id: "teach-10", name: "Mrs. K. Bhuvaneswari", designation: "Physics Educator", subject: "Physics", qualification: "M.Sc., M.Phil., B.Ed.", experience: "13 Years", description: "Specialist in mechanics, quantum physics, and laboratory demonstration techniques." },

  // Chemistry
  { id: "teach-11", name: "Ms. S. Solomon Devadoss", designation: "Senior Chemistry Educator", subject: "Chemistry", qualification: "M.Sc., B.Ed.", experience: "12 Years", description: "Directing inorganic chemical reactions, stoichiometry, and safe wet-lab operations." },
  { id: "teach-12", name: "Mrs. S. Rajathi", designation: "Chemistry Educator", subject: "Chemistry", qualification: "B.Sc., B.Ed.", experience: "9 Years", description: "Specializes in organic chemistry reaction mechanisms and secondary science curricula." },

  // Economics & Commerce
  { id: "teach-13", name: "Mrs. K. Vimala", designation: "Head of Economics", subject: "Economics", qualification: "M.A., B.Ed.", experience: "14 Years", description: "Inspiring macroeconomic understanding, Indian economic history, and statistics." },
  { id: "teach-14", name: "Mrs. M. Kalaiselvi Latha Muthu", designation: "Commerce & Accountancy Lead", subject: "Commerce", qualification: "M.Com., B.Ed.", experience: "16 Years", description: "Guiding commerce stream pupils to high scores in double-entry bookkeeping and business studies." },

  // Computer Science
  { id: "teach-15", name: "Mrs. J. Latha", designation: "Computer Science Lead", subject: "Computer Science", qualification: "M.C.A., B.Ed.", experience: "13 Years", description: "Directing software programming, Python, SQL database management, and computer lab practicals." },
  { id: "teach-16", name: "Mrs. Thenmozhi", designation: "Computer Educator", subject: "Computer Science", qualification: "M.Sc., B.Ed.", experience: "9 Years", description: "Teaching computer applications, computational thinking, and digital literacy." },

  // Humanities & Languages
  { id: "teach-17", name: "Mr. M. Sridhar", designation: "History & Social Science Lead", subject: "History", qualification: "M.A., B.Ed.", experience: "15 Years", description: "Enriching world history, constitutional governance, and civics education." },
  { id: "teach-18", name: "Mrs. Sudha", designation: "Social Science Educator", subject: "History", qualification: "M.A., B.Ed.", experience: "10 Years", description: "Passionate about geographical topography, cartography, and social science projects." },
  { id: "teach-19", name: "Mrs. T.S. Maheshwari", designation: "Hindi Department Lead", subject: "Hindi", qualification: "M.Com., B.Ed.", experience: "12 Years", description: "Fostering national language fluency, creative essay writing, and Hindi recitation." },
  { id: "teach-20", name: "Mrs. Shima Newton", designation: "French Language Instructor", subject: "French", qualification: "M.A., B.Ed., DELF B1", experience: "11 Years", description: "Delivering French communicative skills, phonetic articulation, and European language culture." },

  // Co-Curricular & Early Years
  { id: "teach-21", name: "Mrs. Ranganayagi", designation: "Physical Education Director", subject: "Physical Education", qualification: "B.Sc., M.P.Ed.", experience: "14 Years", description: "Coaching track events, zonal basketball and football teams, and overall school wellness." },
  { id: "teach-22", name: "Mr. Kulandaivelu", designation: "Art & Drawing Master", subject: "Art", qualification: "Diploma in Fine Arts", experience: "18 Years", description: "Nurturing fine arts, watercolor landscape painting, and visual creativity across all grades." },
  { id: "teach-23", name: "Mrs. Saranya", designation: "Kindergarten Lead Educator", subject: "Kindergarten", qualification: "Montessori Trained", experience: "8 Years", description: "Dedicated to early childhood phonetic learning, sensory play, and gentle moral care." },
];

const LOCAL_STORAGE_KEY = "brotherhood_teachers_v2";

export function getLocalTeacherOverrides(): {
  added: TeacherItem[];
  modified: Record<string, Partial<TeacherItem>>;
  deleted: string[];
} {
  if (typeof window === "undefined") return { added: [], modified: {}, deleted: [] };
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return { added: [], modified: {}, deleted: ["sanjay", "mrs. sanjay"] };
    const parsed = JSON.parse(raw);
    // Explicitly sanitize out any unwanted test records like Mrs. Sanjay
    const cleanedAdded = (parsed.added || []).filter((a: TeacherItem) => {
      const n = (a.name || "").toLowerCase().trim();
      return !n.includes("sanjay");
    });
    const cleanedDeleted = Array.from(new Set([...(parsed.deleted || []), "sanjay", "mrs. sanjay"]));
    return {
      added: cleanedAdded,
      modified: parsed.modified || {},
      deleted: cleanedDeleted,
    };
  } catch {
    return { added: [], modified: {}, deleted: ["sanjay", "mrs. sanjay"] };
  }
}

export function saveLocalTeacherOverride(data: {
  added?: TeacherItem[];
  modified?: Record<string, Partial<TeacherItem>>;
  deleted?: string[];
}) {
  if (typeof window === "undefined") return;
  const current = getLocalTeacherOverrides();
  const nextAdded = (data.added !== undefined ? data.added : current.added).filter(
    (a) => !(a.name || "").toLowerCase().includes("sanjay")
  );
  const nextDeleted = Array.from(new Set([...(data.deleted !== undefined ? data.deleted : current.deleted), "sanjay", "mrs. sanjay"]));
  const next = {
    added: nextAdded,
    modified: data.modified !== undefined ? data.modified : current.modified,
    deleted: nextDeleted,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
}

export function getMergedTeachers(apiTeachers?: any[]): TeacherItem[] {
  const overrides = getLocalTeacherOverrides();
  const deletedSet = new Set((overrides.deleted || []).map((id) => String(id).toLowerCase().trim()));
  deletedSet.add("sanjay");
  deletedSet.add("mrs. sanjay");

  const map = new Map<string, TeacherItem>();

  DEFAULT_TEACHERS.forEach((item) => {
    const idKey = String(item.id).toLowerCase();
    const nameKey = item.name.toLowerCase().trim();
    if (nameKey.includes("sanjay") || deletedSet.has(idKey) || deletedSet.has(nameKey)) return;

    let merged = { ...item };
    if (overrides.modified[item.id]) {
      merged = { ...merged, ...overrides.modified[item.id] };
    }
    map.set(idKey, merged);
  });

  if (Array.isArray(apiTeachers) && apiTeachers.length > 0) {
    apiTeachers.forEach((apiItem) => {
      const apiId = String(apiItem.id || "");
      const nameKey = (apiItem.name || "").toLowerCase().trim();
      if (nameKey.includes("sanjay") || deletedSet.has(apiId.toLowerCase()) || deletedSet.has(nameKey)) return;

      let matchKey: string | null = null;
      for (const [k, v] of map.entries()) {
        if (k === apiId.toLowerCase() || (v.name && v.name.toLowerCase().trim() === nameKey)) {
          matchKey = k;
          break;
        }
      }

      const formatted: TeacherItem = {
        id: apiItem.id || `teach-${nameKey}`,
        name: apiItem.name || "Educator",
        designation: apiItem.designation || "Faculty Member",
        subject: apiItem.subject || "General",
        qualification: apiItem.qualification || "B.Ed.",
        experience: apiItem.experience || "10 Years",
        description: apiItem.description || "Dedicated educator fostering academic success and pupil character.",
        image: apiItem.image || "",
      };

      if (matchKey) {
        map.set(matchKey, { ...map.get(matchKey)!, ...formatted });
      } else {
        map.set(apiId.toLowerCase() || `teach-${nameKey}`, formatted);
      }
    });
  }

  (overrides.added || []).forEach((item) => {
    const idKey = String(item.id || "").toLowerCase().trim();
    const nameKey = (item.name || "").toLowerCase().trim();
    if (nameKey.includes("sanjay") || deletedSet.has(idKey) || deletedSet.has(nameKey)) return;
    map.set(idKey || nameKey, item);
  });

  return Array.from(map.values());
}
