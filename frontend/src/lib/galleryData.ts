import christmasProg1 from "../images/gallery photos/christmas programme.JPG";
import christmasProg2 from "../images/gallery photos/christamas progamme.JPG";
import foundersDay from "../images/gallery photos/founders day.jpeg";
import investiture1 from "../images/gallery photos/investiture ceremony.jpg";
import investiture2 from "../images/gallery photos/investiture ceremony.jpeg";
import pongal1 from "../images/gallery photos/pongal celebration.jpeg";
import pongal2 from "../images/gallery photos/pongal celebratioin.jpeg";
import roadSafety1 from "../images/gallery photos/road safety programme.jpeg";
import roadSafety2 from "../images/gallery photos/road safety prog.jpeg";
import welcomeSchool1 from "../images/gallery photos/welcome back to school.jpeg";
import welcomeSchool2 from "../images/gallery photos/welcome back 2 school.jpeg";
import fruitsDay1 from "../images/gallery photos/Fruits Day.jpeg";
import fruitsDay2 from "../images/gallery photos/friuts day.jpeg";
import fruitsDay3 from "../images/gallery photos/fruitsdayy.jpeg";
import yellowDay from "../images/gallery photos/yellow day.jpeg";
import worldFoodDay from "../images/gallery photos/world foodday.jpeg";

export interface GalleryFolderItem {
  id: string;
  name: string;
  description: string;
  date: string;
  photos: GalleryPhotoItem[];
}

export interface GalleryPhotoItem {
  id?: string | number;
  src: string;
  title: string;
  desc: string;
  folderId: string;
  folderName: string;
  date?: string;
}

export const STATIC_IMAGE_MAP: Record<string, string> = {
  "christmas programme.jpg": christmasProg1,
  "christamas progamme.jpg": christmasProg2,
  "founders day.jpeg": foundersDay,
  "investiture ceremony.jpg": investiture1,
  "investiture ceremony.jpeg": investiture2,
  "pongal celebration.jpeg": pongal1,
  "pongal celebratioin.jpeg": pongal2,
  "road safety programme.jpeg": roadSafety1,
  "road safety prog.jpeg": roadSafety2,
  "welcome back to school.jpeg": welcomeSchool1,
  "welcome back 2 school.jpeg": welcomeSchool2,
  "fruits day.jpeg": fruitsDay1,
  "friuts day.jpeg": fruitsDay2,
  "fruitsdayy.jpeg": fruitsDay3,
  "yellow day.jpeg": yellowDay,
  "world foodday.jpeg": worldFoodDay,
};

export function resolveGalleryImageSrc(rawSrc: string): string {
  if (!rawSrc) return "";
  if (rawSrc.startsWith("data:") || rawSrc.startsWith("blob:")) return rawSrc;
  const filename = decodeURIComponent(rawSrc.split("/").pop() || "").toLowerCase();
  if (STATIC_IMAGE_MAP[filename]) {
    return STATIC_IMAGE_MAP[filename];
  }
  return rawSrc;
}

export const DEFAULT_GALLERY_FOLDERS: Array<{
  id: string;
  name: string;
  description: string;
  date: string;
}> = [
  {
    id: "christmas-celebration",
    name: "Christmas Celebration",
    description: "Annual Christmas Pageant, Choral Presentations & Nativity Celebrations",
    date: "December",
  },
  {
    id: "pongal-celebration",
    name: "Pongal Celebration",
    description: "Traditional Tamil Harvest Festival, Cultural Attire & Festive Unity",
    date: "January",
  },
  {
    id: "investiture-ceremony",
    name: "Investiture Ceremony",
    description: "Student Council Oath of Office, Badge Investiture & Leadership Installation",
    date: "February",
  },
  {
    id: "fruits-day",
    name: "Fruits Day Celebration",
    description: "Primary and Kindergarten Fresh Fruit Exhibition, Nutrition Awareness & Tasting",
    date: "April",
  },
  {
    id: "road-safety",
    name: "Road Safety Programme",
    description: "Road Safety Patrol (RSP) Drills & Civic Traffic Awareness Demonstration",
    date: "April",
  },
  {
    id: "welcome-back",
    name: "Welcome Back to School",
    description: "Reopening Day Greetings, Student Welcoming & Assembly",
    date: "April",
  },
  {
    id: "founders-day",
    name: "Founder's Day",
    description: "Founder's Day Commemoration & Thanksgiving Gathering",
    date: "April",
  },
  {
    id: "yellow-day",
    name: "Yellow Day Celebration",
    description: "Kindergarten Color Recognition & Sensory Learning Festivities",
    date: "April",
  },
  {
    id: "world-food-day",
    name: "World Food Day",
    description: "World Food Day Assembly, Nutrition Awareness & Gratitude",
    date: "April",
  },
];

export const INITIAL_GALLERY_PHOTOS: GalleryPhotoItem[] = [
  {
    src: christmasProg1,
    title: "Annual Christmas Pageant & Choral Performance",
    desc: "Students and choir ensemble presenting traditional Christmas carols, drama, and festive goodwill.",
    folderId: "christmas-celebration",
    folderName: "Christmas Celebration",
    date: "December",
  },
  {
    src: christmasProg2,
    title: "Nativity Presentation & Carol Recital",
    desc: "Joyful celebration of Brotherhood unity, student music, and holiday messages.",
    folderId: "christmas-celebration",
    folderName: "Christmas Celebration",
    date: "December",
  },
  {
    src: pongal1,
    title: "Traditional Pongal Harvest Gathering",
    desc: "Faculty and students in traditional attire celebrating the harvest festival with thanksgiving.",
    folderId: "pongal-celebration",
    folderName: "Pongal Celebration",
    date: "January",
  },
  {
    src: pongal2,
    title: "Pongal Cultural Festivities & Kolam",
    desc: "Campus cultural displays, music, and community joy commemorating Tamil heritage.",
    folderId: "pongal-celebration",
    folderName: "Pongal Celebration",
    date: "January",
  },
  {
    src: investiture1,
    title: "Badge Investiture & Leadership Pledge",
    desc: "Student council office bearers receiving their badges and swearing loyalty to the institution.",
    folderId: "investiture-ceremony",
    folderName: "Investiture Ceremony",
    date: "February",
  },
  {
    src: investiture2,
    title: "Student Council Oath of Office",
    desc: "Elected prefects and captains pledging to uphold school values, leadership, and discipline.",
    folderId: "investiture-ceremony",
    folderName: "Investiture Ceremony",
    date: "February",
  },
  {
    src: fruitsDay1,
    title: "Primary Section Fruits Day Celebration",
    desc: "Primary students learning healthy dietary habits, nutrition values, and fruit identification.",
    folderId: "fruits-day",
    folderName: "Fruits Day Celebration",
    date: "April",
  },
  {
    src: fruitsDay2,
    title: "Fresh Fruits Exhibition & Display",
    desc: "Hands-on exhibition promoting fresh fruits, vitamin nutrition, and healthy living.",
    folderId: "fruits-day",
    folderName: "Fruits Day Celebration",
    date: "April",
  },
  {
    src: fruitsDay3,
    title: "Kindergarten Fruit Carnival",
    desc: "Creative sensory learning and vibrant colorful fruit baskets for kindergarteners.",
    folderId: "fruits-day",
    folderName: "Fruits Day Celebration",
    date: "April",
  },
  {
    src: roadSafety1,
    title: "Road Safety Patrol Demonstration",
    desc: "RSP cadets demonstrating traffic signals, pedestrian crossing etiquette, and road vigilance.",
    folderId: "road-safety",
    folderName: "Road Safety Programme",
    date: "April",
  },
  {
    src: roadSafety2,
    title: "Traffic Awareness & Safety Campaign",
    desc: "Cadet parade and safety drills along the East Coast Road neighborhood.",
    folderId: "road-safety",
    folderName: "Road Safety Programme",
    date: "April",
  },
  {
    src: welcomeSchool1,
    title: "School Reopening Day Welcome",
    desc: "Students returning enthusiastically to classrooms, laboratories, and friends.",
    folderId: "welcome-back",
    folderName: "Welcome Back to School",
    date: "April",
  },
  {
    src: welcomeSchool2,
    title: "Campus Reopening Morning Assembly",
    desc: "Staff warmly welcoming students back for the commencement of the academic term.",
    folderId: "welcome-back",
    folderName: "Welcome Back to School",
    date: "April",
  },
  {
    src: foundersDay,
    title: "Founder's Day Commemoration",
    desc: "Honoring Founder Rev. M. Anton Cruz and celebrating decades of school legacy and service.",
    folderId: "founders-day",
    folderName: "Founder's Day",
    date: "April",
  },
  {
    src: yellowDay,
    title: "Kindergarten Yellow Day Celebration",
    desc: "Little learners exploring sunshine yellow colors, craft activities, and joyful games.",
    folderId: "yellow-day",
    folderName: "Yellow Day Celebration",
    date: "April",
  },
  {
    src: worldFoodDay,
    title: "World Food Day Observance",
    desc: "Teaching students the value of food sharing, nourishment awareness, and mindful consumption.",
    folderId: "world-food-day",
    folderName: "World Food Day",
    date: "April",
  },
];

export const toFolderId = (name: string): string => {
  return (name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export function getMergedGalleryFolders(
  apiImages: any[],
  deletedFolderIds: string[] = [],
  customFolderMeta: Record<string, any> = {},
  deletedPhotoIds: string[] = []
): GalleryFolderItem[] {
  const isDeletedFolder = (name: string, id: string) => {
    return deletedFolderIds.some(
      (d) =>
        d.toLowerCase().trim() === name.toLowerCase().trim() ||
        d.toLowerCase().trim() === id.toLowerCase().trim()
    );
  };

  const isDeletedPhoto = (photoIdOrTitleOrSrc: string) => {
    if (!photoIdOrTitleOrSrc) return false;
    return deletedPhotoIds.some(
      (d) => d.toLowerCase().trim() === photoIdOrTitleOrSrc.toLowerCase().trim()
    );
  };

  const folderMap = new Map<string, GalleryFolderItem>();

  // 1. Initialize default folders with authentic bundled photos
  DEFAULT_GALLERY_FOLDERS.forEach((df) => {
    if (!isDeletedFolder(df.name, df.id)) {
      const folderPhotos = INITIAL_GALLERY_PHOTOS
        .filter((p) => p.folderId === df.id || p.folderName.toLowerCase() === df.name.toLowerCase())
        .filter((p) => !isDeletedPhoto(String(p.id || "")) && !isDeletedPhoto(p.title) && !isDeletedPhoto(p.src))
        .map((p) => ({ ...p }));

      folderMap.set(df.name.toLowerCase().trim(), {
        id: df.id,
        name: df.name,
        description: df.description,
        date: df.date,
        photos: folderPhotos,
      });
    }
  });

  // 2. Add custom folders from metadata
  Object.entries(customFolderMeta).forEach(([name, meta]: [string, any]) => {
    const fId = toFolderId(name);
    const key = name.toLowerCase().trim();
    if (!isDeletedFolder(name, fId) && !folderMap.has(key)) {
      folderMap.set(key, {
        id: fId,
        name: meta.name || name,
        description: meta.description || "School celebration and student activities archive",
        date: meta.date || "Academic Year",
        photos: [],
      });
    }
  });

  // 3. Populate photos from apiImages
  if (Array.isArray(apiImages) && apiImages.length > 0) {
    apiImages.forEach((img) => {
      const rawCategory = (img.category || "General").trim();
      const key = rawCategory.toLowerCase();
      const fId = toFolderId(rawCategory);

      if (isDeletedFolder(rawCategory, fId)) return;
      if (img.id && isDeletedPhoto(String(img.id))) return;

      const resolvedSrc = resolveGalleryImageSrc(img.image);

      const photoItem: GalleryPhotoItem = {
        id: img.id,
        src: resolvedSrc,
        title: img.title || `${rawCategory} Photo`,
        desc: img.description || "Brotherhood Matriculation Higher Secondary School Celebration",
        folderId: fId,
        folderName: rawCategory,
        date: img.created_at
          ? new Date(img.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
          : "Recent",
      };

      if (folderMap.has(key)) {
        const targetFolder = folderMap.get(key)!;
        const filename = (img.image || "").split("/").pop()?.toLowerCase();
        
        // Find existing match in folder photos
        const existingIdx = targetFolder.photos.findIndex((p) => {
          const pFilename = (p.src || "").split("/").pop()?.toLowerCase();
          return (
            (filename && pFilename && (pFilename.includes(filename) || filename.includes(pFilename))) ||
            p.title.toLowerCase() === photoItem.title.toLowerCase() ||
            p.src === photoItem.src
          );
        });

        if (existingIdx !== -1) {
          targetFolder.photos[existingIdx].id = img.id;
          targetFolder.photos[existingIdx].title = photoItem.title;
          targetFolder.photos[existingIdx].desc = photoItem.desc;
          if (img.image && (img.image.startsWith("http") || img.image.startsWith("data:"))) {
            targetFolder.photos[existingIdx].src = img.image;
          }
        } else {
          targetFolder.photos.push(photoItem);
        }
      } else {
        // Dynamic folder created by admin
        folderMap.set(key, {
          id: fId,
          name: rawCategory,
          description: "School celebration and student activities archive",
          date: "Academic Year",
          photos: [photoItem],
        });
      }
    });
  }

  return Array.from(folderMap.values());
}
