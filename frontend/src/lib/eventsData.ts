export interface SchoolEventItem {
  id: string | number;
  title: string;
  description: string;
  event_date: string;
  event_time?: string;
  venue?: string;
  category: string;
  status: string;
  cover_image?: string;
}

export const DEFAULT_EVENTS: SchoolEventItem[] = [
  { id: "ev-1", title: "School Reopens for Classes I to XII", description: "Commencement of Academic Year 2026–2027 with school prayer and welcome assembly.", event_date: "2026-06-01", event_time: "08:45 AM - 03:30 PM", venue: "Main Campus", category: "Reopening", status: "Published" },
  { id: "ev-2", title: "Reopening for Kindergarten (LKG & UKG)", description: "Joyful first day celebration for pre-primary toddlers with activity corners.", event_date: "2026-06-08", event_time: "09:00 AM - 12:30 PM", venue: "Kindergarten Block", category: "Reopening", status: "Published" },
  { id: "ev-3", title: "Investiture Ceremony & Leadership Badges", description: "Installation of the Student Council, House Captains, and Prefectorial Board.", event_date: "2026-06-20", event_time: "09:30 AM - 12:00 PM", venue: "School Auditorium", category: "Celebration", status: "Published" },
  { id: "ev-4", title: "Field Trip (Std XI & XII Streams)", description: "Educational botanical and industrial tour for senior secondary science and commerce streams.", event_date: "2026-06-27", event_time: "08:00 AM - 05:00 PM", venue: "Regional Science Park", category: "Field Trip", status: "Published" },
  { id: "ev-5", title: "Kamaraj's Birthday & Tamil Ilakkiya Mantram", description: "Special assembly honoring educational development and Tamil oratorical competitions.", event_date: "2026-07-15", event_time: "10:00 AM - 01:00 PM", venue: "Main Auditorium", category: "Celebration", status: "Published" },
  { id: "ev-6", title: "I Mid-Term Examinations (VI to XII)", description: "First formal term examination evaluating unit syllabus mastery.", event_date: "2026-07-16", event_time: "09:30 AM - 12:30 PM", venue: "Examination Halls", category: "Exam", status: "Published" },
  { id: "ev-7", title: "Independence Day Celebrations", description: "Flag hoisting ceremony, patriotic choir songs, march-past, and cultural pageantry.", event_date: "2026-08-15", event_time: "08:00 AM - 10:30 AM", venue: "School Sports Grounds", category: "Celebration", status: "Published" },
  { id: "ev-8", title: "Annual Sports Day & Zonal Athletic Finals", description: "Inter-house athletic tournament, sprint heats, high jump, and medal presentations.", event_date: "2026-08-29", event_time: "08:30 AM - 04:30 PM", venue: "Athletic Stadium", category: "Athletics", status: "Published" },
  { id: "ev-9", title: "Teachers' Day Felicitation Assembly", description: "Student-led cultural honors, speech recitals, and teacher appreciation ceremony.", event_date: "2026-09-05", event_time: "10:00 AM - 01:00 PM", venue: "Main Auditorium", category: "Celebration", status: "Published" },
  { id: "ev-10", title: "Founder's Day Memorial Thanksgiving", description: "School founder remembrance service, alumni felicitation, and scholarship awards.", event_date: "2026-09-18", event_time: "09:30 AM - 12:30 PM", venue: "School Chapel & Hall", category: "Celebration", status: "Published" },
  { id: "ev-11", title: "Quarterly Examinations (I to XII)", description: "Term I comprehensive examinations across all academic subjects.", event_date: "2026-09-21", event_time: "09:00 AM - 12:30 PM", venue: "Classrooms", category: "Exam", status: "Published" },
  { id: "ev-12", title: "Children's Day Gala & Food Carnival", description: "Fun stalls, science discovery stations, game arenas, and student food fest.", event_date: "2026-11-14", event_time: "09:00 AM - 03:00 PM", venue: "School Courtyard", category: "Celebration", status: "Published" },
  { id: "ev-13", title: "Christmas Carol Service & Pageant", description: "Choral ensemble, live nativity play, festive brass band, and charity gift drive.", event_date: "2026-12-05", event_time: "04:30 PM - 07:30 PM", venue: "School Amphitheater", category: "Celebration", status: "Published" },
  { id: "ev-14", title: "Pongal Harvest Festival & Folk Dances", description: "Traditional sweet pongal preparation, pot breaking, and traditional folk art forms.", event_date: "2026-01-14", event_time: "09:00 AM - 01:00 PM", venue: "Open Grounds", category: "Celebration", status: "Published" },
  { id: "ev-15", title: "Republic Day Parade & Salutations", description: "Patriotic parade, student speeches, scouts & guides troop salute.", event_date: "2026-01-26", event_time: "08:00 AM - 10:00 AM", venue: "Parade Ground", category: "Celebration", status: "Published" },
  { id: "ev-16", title: "National Science Day & STEM Exhibition", description: "Robotics demonstrations, working models, eco-science displays by junior inventors.", event_date: "2026-02-28", event_time: "09:30 AM - 03:30 PM", venue: "Science Laboratories", category: "Celebration", status: "Published" },
  { id: "ev-17", title: "Senior Class XII Farewell Banquet", description: "Passing of the torch ceremony and blessing service for outgoing Class XII batch.", event_date: "2026-02-20", event_time: "05:00 PM - 08:30 PM", venue: "Grand Auditorium", category: "Celebration", status: "Published" },
];

const LOCAL_STORAGE_KEY = "brotherhood_events_v2";

export function getLocalEventOverrides(): {
  added: SchoolEventItem[];
  modified: Record<string, Partial<SchoolEventItem>>;
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

export function saveLocalEventOverride(data: {
  added?: SchoolEventItem[];
  modified?: Record<string, Partial<SchoolEventItem>>;
  deleted?: string[];
}) {
  if (typeof window === "undefined") return;
  const current = getLocalEventOverrides();
  const next = {
    added: data.added !== undefined ? data.added : current.added,
    modified: data.modified !== undefined ? data.modified : current.modified,
    deleted: data.deleted !== undefined ? data.deleted : current.deleted,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
}

export function getMergedEvents(apiEvents?: any[]): SchoolEventItem[] {
  const overrides = getLocalEventOverrides();
  const deletedSet = new Set((overrides.deleted || []).map((id) => String(id).toLowerCase().trim()));

  const map = new Map<string, SchoolEventItem>();

  DEFAULT_EVENTS.forEach((item) => {
    const idKey = String(item.id).toLowerCase();
    const titleKey = item.title.toLowerCase().trim();
    if (deletedSet.has(idKey) || deletedSet.has(titleKey)) return;

    let merged = { ...item };
    if (overrides.modified[item.id]) {
      merged = { ...merged, ...overrides.modified[item.id] };
    }
    map.set(idKey, merged);
  });

  if (Array.isArray(apiEvents) && apiEvents.length > 0) {
    apiEvents.forEach((apiItem) => {
      const apiId = String(apiItem.id || "");
      const titleKey = (apiItem.title || "").toLowerCase().trim();
      if (deletedSet.has(apiId.toLowerCase()) || deletedSet.has(titleKey)) return;

      let matchKey: string | null = null;
      for (const [k, v] of map.entries()) {
        if (k === apiId.toLowerCase() || v.title.toLowerCase().trim() === titleKey) {
          matchKey = k;
          break;
        }
      }

      const formatted: SchoolEventItem = {
        id: apiItem.id || `ev-${titleKey}`,
        title: apiItem.title || "School Event",
        description: apiItem.description || "School event and academic milestone.",
        event_date: apiItem.event_date || "2026-06-01",
        event_time: apiItem.event_time || "08:45 AM - 03:30 PM",
        venue: apiItem.venue || "School Campus",
        category: apiItem.category || "Celebration",
        status: apiItem.status || "Published",
        cover_image: apiItem.cover_image || "",
      };

      if (matchKey) {
        map.set(matchKey, { ...map.get(matchKey)!, ...formatted });
      } else {
        map.set(apiId.toLowerCase() || `ev-${titleKey}`, formatted);
      }
    });
  }

  (overrides.added || []).forEach((item) => {
    const idKey = String(item.id).toLowerCase();
    if (deletedSet.has(idKey)) return;
    map.set(idKey, item);
  });

  return Array.from(map.values()).sort((a, b) => a.event_date.localeCompare(b.event_date));
}
