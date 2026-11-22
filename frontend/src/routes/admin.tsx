import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import heroImageStatic from "../images/aboutimage4.jpeg";
import heroImage2 from "../images/aboutimage2.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Lock, User, Mail, Calendar, Upload, Plus, Edit, Trash2, Check, X, 
  Sparkles, Award, Users, Image as ImageIcon, Bell, MessageSquare, Briefcase, FileText, LayoutDashboard, LogOut, Trophy, Megaphone,
  Shirt, Flag, UserCheck, Home, BookOpen, GraduationCap, Search, Filter,
  Folder, FolderOpen, FolderPlus, ArrowLeft, ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import FlowingMenu from "@/components/FlowingMenu";
import SpotlightCard from "@/components/SpotlightCard";
import ProfileCard from "@/components/ProfileCard";
import BlurText from "@/components/BlurText";
import ModelViewer from "@/components/ModelViewer";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "School Administration Panel — Brotherhood School" },
    ],
  }),
  component: AdminPage,
});

interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
}

import { API_BASE, BACKEND_URL } from "@/config";
import { getMergedGalleryFolders, toFolderId, DEFAULT_GALLERY_FOLDERS, resolveGalleryImageSrc } from "@/lib/galleryData";
import { getMergedStudentLeaders, StudentLeaderItem, saveLocalLeaderOverride, getLocalLeaderOverrides, inferWing } from "@/lib/studentLeadersData";
import { getMergedUniforms, SchoolUniformItem, saveLocalUniformOverride, getLocalUniformOverrides } from "@/lib/uniformsData";
import { getMergedHouses, SchoolHouseItem, saveLocalHouseOverride, getLocalHouseOverrides } from "@/lib/housesData";
import { getMergedTeachers, TeacherItem, saveLocalTeacherOverride, getLocalTeacherOverrides } from "@/lib/teachersData";
import { getMergedEvents, SchoolEventItem, saveLocalEventOverride, getLocalEventOverrides } from "@/lib/eventsData";
import { getMergedAchievements, AchievementItem, saveLocalAchievementOverride, getLocalAchievementOverrides } from "@/lib/achievementsData";

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Login credentials state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // CRUD Data States - Initialized with full default and local fallback data
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>(() => getMergedEvents([]));
  const [teachers, setTeachers] = useState<any[]>(() => getMergedTeachers([]));
  const [bestStudents, setBestStudents] = useState<any[]>(() => getMergedAchievements([]).all);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [uniforms, setUniforms] = useState<any[]>(() => getMergedUniforms([]));
  const [houses, setHouses] = useState<any[]>(() => getMergedHouses([]));
  const [leaders, setLeaders] = useState<any[]>(() => getMergedStudentLeaders([]));
  
  // Submission View States
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [jobApplications, setJobApplications] = useState<any[]>([]);

  // Dialog / Edit states
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [editorPage, setEditorPage] = useState<"home" | "events" | "teachers" | "gallery" | "board-toppers" | "students" | "uniform" | "houses" | "leaders" | "about-school" | "founder-message" | "correspondent-message" | "principal-message">("home");
  const [achievementCategory, setAchievementCategory] = useState<"best_student" | "sports">("best_student");
  const [leaderWingTab, setLeaderWingTab] = useState<"all" | "primary" | "secondary">("all");
  const [leaderSearch, setLeaderSearch] = useState<string>("");
  const [studentCategoryTab, setStudentCategoryTab] = useState<"all" | "best_student" | "sports">("all");
  const [studentSearch, setStudentSearch] = useState<string>("");
  const [houseWingFilter, setHouseWingFilter] = useState<"all" | "primary" | "secondary">("all");
  const [boardTopperGradeFilter, setBoardTopperGradeFilter] = useState<string>("All");
  const [boardTopperSearch, setBoardTopperSearch] = useState<string>("");

  // Vacancy state for job applications creation
  const [vacancies, setVacancies] = useState<any[]>([]);

  // Pages CMS Data States
  const [cmsPages, setCmsPages] = useState<any[]>([]);
  const [activePageData, setActivePageData] = useState<any>(null);
  const [pageEditorForm, setPageEditorForm] = useState({
    title: "",
    hero_title: "",
    hero_subtitle: "",
    seo_title: "",
    seo_description: "",
    content_blocks: {} as any
  });

  // Form Fields State
  const [announcementForm, setAnnouncementForm] = useState({
    title: "", message: "", priority: "Medium", status: "Active"
  });
  const [eventForm, setEventForm] = useState({
    title: "", description: "", cover_image: "", event_date: "", event_time: "08:45 AM - 03:30 PM", venue: "School Campus", category: "Celebration", status: "Published"
  });
  const [teacherForm, setTeacherForm] = useState({
    name: "", designation: "", subject: "English", qualification: "", experience: "", description: "", image: ""
  });
  const [studentForm, setStudentForm] = useState({
    title: "", name: "", grade: "", reason: "", image: ""
  });
  const [galleryForm, setGalleryForm] = useState({
    title: "", description: "", category: "Christmas Celebration", image: ""
  });

  // Gallery Folders State
  const [selectedGalleryFolder, setSelectedGalleryFolder] = useState<string | null>(null);
  const [galleryFolderSearch, setGalleryFolderSearch] = useState<string>("");
  const [deletedFolderIds, setDeletedFolderIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("brotherhood_deleted_folders") || "[]");
    } catch {
      return [];
    }
  });
  const [customFolderMeta, setCustomFolderMeta] = useState<Record<string, any>>(() => {
    try {
      return JSON.parse(localStorage.getItem("brotherhood_custom_folders") || "{}");
    } catch {
      return {};
    }
  });
  const [deletedPhotoIds, setDeletedPhotoIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("brotherhood_deleted_photos") || "[]");
    } catch {
      return [];
    }
  });
  const [newFolderForm, setNewFolderForm] = useState({
    name: "",
    description: "",
    date: "",
    photoTitle: "",
    photoDescription: "",
    image: ""
  });
  const [uniformForm, setUniformForm] = useState({
    section: "", boys_uniform: "", girls_uniform: ""
  });
  const [houseForm, setHouseForm] = useState({
    name: "",
    motto: "",
    values: "",
    description: "",
    points: 400,
    wing: "Primary",
    color_code: "bg-red-600",
    captain: "",
    captainClass: "Std V",
    viceCaptain: "",
    viceCaptainClass: "Std V"
  });
  const [leaderForm, setLeaderForm] = useState<{
    role: string;
    name: string;
    grade: string;
    wing: "Primary" | "Secondary";
    category?: string;
    house: string;
    duties: string;
  }>({
    role: "School Pupil Leader (SPL)",
    name: "",
    grade: "Class XII",
    wing: "Secondary",
    category: "Council",
    house: "",
    duties: ""
  });
  const [boardTopperForm, setBoardTopperForm] = useState({
    name: "",
    grade: "Class XII",
    title: "School Topper",
    score: "598 / 600",
    stream: "Bio-Maths",
    reason: "State Rank 1st & Subject Centum in Mathematics, Physics and Chemistry.",
    year: "2025-2026",
    image: ""
  });

  const [admissionForm, setAdmissionForm] = useState({
    student_name: "", parent_name: "", phone: "", email: "", class_applied: "Class I", message: "", status: "New"
  });
  const [contactForm, setContactForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "", status: "Pending"
  });
  const [jobForm, setJobForm] = useState({
    name: "", email: "", phone: "", vacancy: "" as string | number, cover_letter: "", resume: ""
  });

  // Table Search & Filter States
  const [teacherDeptFilter, setTeacherDeptFilter] = useState<string>("All");
  const [teacherSearch, setTeacherSearch] = useState<string>("");
  const [eventCategoryFilter, setEventCategoryFilter] = useState<string>("All");
  const [eventSearch, setEventSearch] = useState<string>("");

  // Check auth and pre-fetch gallery on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      fetchUserProfile(savedToken);
    }
    // Pre-fetch gallery images
    fetch(`${API_BASE}/gallery-images/`)
      .then(res => res.ok ? res.json() : [])
      .then(d => {
        if (Array.isArray(d) && d.length > 0) setGalleryImages(d.results || d);
      })
      .catch(() => {});
  }, []);

  // Fetch all lists when authenticated
  useEffect(() => {
    if (token) {
      fetchAllData();
    }
  }, [token]);

  const fetchUserProfile = async (authToken: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/profile/`, {
        headers: { "Authorization": `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUserProfile(data);
      } else {
        // Token expired
        handleLogout();
      }
    } catch (err) {
      console.error(err);
      handleLogout();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("admin_token", data.access);
        localStorage.setItem("admin_refresh", data.refresh);
        setToken(data.access);
        fetchUserProfile(data.access);
        toast.success("Welcome back, Administrator!");
      } else {
        toast.error("Invalid admin credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_refresh");
    setToken(null);
    setUserProfile(null);
    toast.info("Logged out successfully.");
  };

  // Generic Data Fetcher
  const fetchAllData = async () => {
    if (!token) return;
    const headers = { "Authorization": `Bearer ${token}` };
    
    try {
      // Announcements
      const annRes = await fetch(`${API_BASE}/announcements/`, { headers });
      if (annRes.ok) {
        const d = await annRes.json();
        setAnnouncements(d.results || d);
      }

      // Events
      try {
        const evRes = await fetch(`${API_BASE}/events/`, { headers });
        if (evRes.ok) {
          const d = await evRes.json();
          setEvents(getMergedEvents(d.results || d));
        } else {
          setEvents(getMergedEvents([]));
        }
      } catch {
        setEvents(getMergedEvents([]));
      }

      // Teachers
      try {
        const teachRes = await fetch(`${API_BASE}/teachers/`, { headers });
        if (teachRes.ok) {
          const d = await teachRes.json();
          setTeachers(getMergedTeachers(d.results || d));
        } else {
          setTeachers(getMergedTeachers([]));
        }
      } catch {
        setTeachers(getMergedTeachers([]));
      }

      // Student Achievements
      try {
        const studRes = await fetch(`${API_BASE}/student-achievements/`, { headers });
        if (studRes.ok) {
          const d = await studRes.json();
          setBestStudents(getMergedAchievements(d.results || d).all);
        } else {
          setBestStudents(getMergedAchievements([]).all);
        }
      } catch {
        setBestStudents(getMergedAchievements([]).all);
      }

      // School Uniforms
      try {
        const uniRes = await fetch(`${API_BASE}/school-uniforms/`, { headers });
        if (uniRes.ok) {
          const d = await uniRes.json();
          setUniforms(getMergedUniforms(d.results || d));
        } else {
          setUniforms(getMergedUniforms([]));
        }
      } catch {
        setUniforms(getMergedUniforms([]));
      }

      // Student Houses
      try {
        const houseRes = await fetch(`${API_BASE}/student-houses/`, { headers });
        if (houseRes.ok) {
          const d = await houseRes.json();
          setHouses(getMergedHouses(d.results || d));
        } else {
          setHouses(getMergedHouses([]));
        }
      } catch {
        setHouses(getMergedHouses([]));
      }

      // Student Leaders
      try {
        const leaderRes = await fetch(`${API_BASE}/student-leaders/`, { headers });
        if (leaderRes.ok) {
          const d = await leaderRes.json();
          setLeaders(getMergedStudentLeaders(d.results || d));
        } else {
          setLeaders(getMergedStudentLeaders([]));
        }
      } catch {
        setLeaders(getMergedStudentLeaders([]));
      }

      // Gallery Images
      const gallRes = await fetch(`${API_BASE}/gallery-images/`, { headers });
      if (gallRes.ok) {
        const d = await gallRes.json();
        setGalleryImages(d.results || d);
      }

      // Queries/Submissions
      const admRes = await fetch(`${API_BASE}/admission-queries/`, { headers });
      if (admRes.ok) {
        const d = await admRes.json();
        setAdmissions(d.results || d);
      }

      const contactRes = await fetch(`${API_BASE}/contact-messages/`, { headers });
      if (contactRes.ok) {
        const d = await contactRes.json();
        setContacts(d.results || d);
      }

      const jobRes = await fetch(`${API_BASE}/job-applications/`, { headers });
      if (jobRes.ok) {
        const d = await jobRes.json();
        setJobApplications(d.results || d);
      }

      const vacRes = await fetch(`${API_BASE}/vacancies/`, { headers });
      if (vacRes.ok) {
        const d = await vacRes.json();
        const results = d.results || d;
        setVacancies(results);
        if (results.length > 0) {
          setJobForm(prev => ({ ...prev, vacancy: prev.vacancy || results[0].id }));
        }
      }

      // Fetch dynamic CMS pages
      const pagesRes = await fetch(`${API_BASE}/pages/`, { headers });
      if (pagesRes.ok) {
        const d = await pagesRes.json();
        setCmsPages(d);
      }

    } catch (err) {
      console.error("Error fetching admin data:", err);
      toast.error("Error synchronizing with backend databases.");
    }
  };

  // Image File Uploader
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetForm: string) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const formData = new FormData();
    formData.append("file", file);

    const uploadToast = toast.loading("Uploading image to asset server...");
    try {
      const res = await fetch(`${API_BASE}/media/upload/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });
      
      if (res.ok) {
        const data = await res.json();
        toast.dismiss(uploadToast);
        toast.success("Image uploaded successfully!");
        
        const rawUrl = data.url || "";
        const cleanUrl = rawUrl.includes("/uploads/")
          ? `${BACKEND_URL}/uploads/${rawUrl.split("/uploads/").pop()}`
          : rawUrl.replace(/^https?:\/\/(127\.0\.0\.1|localhost):8000/, BACKEND_URL);

        // Update correct form state with URL
        if (targetForm === "event") setEventForm(prev => ({ ...prev, cover_image: cleanUrl }));
        if (targetForm === "teacher") setTeacherForm(prev => ({ ...prev, image: cleanUrl }));
        if (targetForm === "student") setStudentForm(prev => ({ ...prev, image: cleanUrl }));
        if (targetForm === "board_topper") setBoardTopperForm(prev => ({ ...prev, image: cleanUrl }));
        if (targetForm === "gallery") setGalleryForm(prev => ({ ...prev, image: cleanUrl }));
        if (targetForm === "new_folder") setNewFolderForm(prev => ({ ...prev, image: cleanUrl }));
      } else {
        toast.dismiss(uploadToast);
        toast.error("Failed to upload image. Fallback filesystem error.");
      }
    } catch (err) {
      toast.dismiss(uploadToast);
      console.error(err);
      toast.error("Network error uploading asset.");
    }
  };

  // DELETE operation helper
  const handleDelete = async (endpoint: string, id: any) => {
    if (!confirm("Are you sure you want to delete this content item? This action is permanent.")) return;

    // Apply local storage override deletion immediately
    if (endpoint === "student-leaders") {
      const curr = getLocalLeaderOverrides();
      const nextDeleted = [...curr.deleted, String(id)];
      const nextAdded = curr.added.filter(a => String(a.id) !== String(id));
      saveLocalLeaderOverride({ deleted: nextDeleted, added: nextAdded });
      setLeaders(getMergedStudentLeaders([]));
    } else if (endpoint === "school-uniforms") {
      const curr = getLocalUniformOverrides();
      const nextDeleted = [...curr.deleted, String(id)];
      const nextAdded = curr.added.filter(a => String(a.id) !== String(id));
      saveLocalUniformOverride({ deleted: nextDeleted, added: nextAdded });
      setUniforms(getMergedUniforms([]));
    } else if (endpoint === "student-houses") {
      const curr = getLocalHouseOverrides();
      const nextDeleted = [...curr.deleted, String(id)];
      const nextAdded = curr.added.filter(a => String(a.id) !== String(id));
      saveLocalHouseOverride({ deleted: nextDeleted, added: nextAdded });
      setHouses(getMergedHouses([]));
    } else if (endpoint === "teachers") {
      const curr = getLocalTeacherOverrides();
      const nextDeleted = [...curr.deleted, String(id)];
      const nextAdded = curr.added.filter(a => String(a.id) !== String(id));
      saveLocalTeacherOverride({ deleted: nextDeleted, added: nextAdded });
      setTeachers(getMergedTeachers([]));
    } else if (endpoint === "events") {
      const curr = getLocalEventOverrides();
      const nextDeleted = [...curr.deleted, String(id)];
      const nextAdded = curr.added.filter(a => String(a.id) !== String(id));
      saveLocalEventOverride({ deleted: nextDeleted, added: nextAdded });
      setEvents(getMergedEvents([]));
    } else if (endpoint === "student-achievements") {
      const curr = getLocalAchievementOverrides();
      const nextDeleted = [...curr.deleted, String(id)];
      const nextAdded = curr.added.filter(a => String(a.id) !== String(id));
      saveLocalAchievementOverride({ deleted: nextDeleted, added: nextAdded });
      setBestStudents(getMergedAchievements([]).all);
    }

    try {
      if (token) {
        await fetch(`${API_BASE}/${endpoint}/${id}/`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.warn("Backend delete sync failed, locally removed:", err);
    }

    toast.success("Item deleted successfully!");
  };

  // DELETE ALL items helper
  const handleDeleteAll = async (endpoint: string) => {
    if (!confirm(`Are you sure you want to delete ALL items in ${endpoint}? This action is permanent and cannot be undone.`)) return;
    try {
      let itemsToDelete: any[] = [];
      if (endpoint === "announcements") itemsToDelete = announcements;
      else if (endpoint === "events") itemsToDelete = events;
      else if (endpoint === "teachers") itemsToDelete = teachers;
      else if (endpoint === "student-achievements") itemsToDelete = bestStudents;
      else if (endpoint === "gallery-images") itemsToDelete = galleryImages;
      else if (endpoint === "admission-queries") itemsToDelete = admissions;
      else if (endpoint === "contact-messages") itemsToDelete = contacts;
      else if (endpoint === "job-applications") itemsToDelete = jobApplications;
      else if (endpoint === "school-uniforms") itemsToDelete = uniforms;
      else if (endpoint === "student-houses") itemsToDelete = houses;
      else if (endpoint === "student-leaders") itemsToDelete = leaders;

      if (itemsToDelete.length === 0) {
        toast.info("No items to delete.");
        return;
      }

      const toastId = toast.loading(`Deleting ${itemsToDelete.length} items...`);
      let successCount = 0;
      for (const item of itemsToDelete) {
        try {
          const res = await fetch(`${API_BASE}/${endpoint}/${item.id}/`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (res.ok) successCount++;
        } catch (err) {
          console.error(err);
        }
      }
      toast.dismiss(toastId);
      toast.success(`Successfully deleted ${successCount} of ${itemsToDelete.length} items.`);
      fetchAllData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete all items.");
    }
  };

  const handleAdmissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/admission-queries/${editItem.id}/` : `${API_BASE}/admission-queries/`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(admissionForm)
      });
      if (res.ok) {
        toast.success(isEdit ? "Inquiry updated!" : "Inquiry created!");
        setAdmissionForm({ student_name: "", parent_name: "", phone: "", email: "", class_applied: "Class I", message: "", status: "New" });
        setEditItem(null);
        setActiveDialog(null);
        fetchAllData();
      } else {
        toast.error("Failed to save admission inquiry.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/contact-messages/${editItem.id}/` : `${API_BASE}/contact-messages/`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        toast.success(isEdit ? "Contact message updated!" : "Contact message created!");
        setContactForm({ name: "", email: "", phone: "", subject: "", message: "", status: "Pending" });
        setEditItem(null);
        setActiveDialog(null);
        fetchAllData();
      } else {
        toast.error("Failed to save contact message.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/job-applications/${editItem.id}/` : `${API_BASE}/job-applications/`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(jobForm)
      });
      if (res.ok) {
        toast.success(isEdit ? "Job application updated!" : "Job application created!");
        setJobForm({ name: "", email: "", phone: "", vacancy: vacancies[0]?.id || "", cover_letter: "", resume: "" });
        setEditItem(null);
        setActiveDialog(null);
        fetchAllData();
      } else {
        toast.error("Failed to save job application.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
  };

  const startAddAdmission = () => {
    setEditItem(null);
    setAdmissionForm({ student_name: "", parent_name: "", phone: "", email: "", class_applied: "Class I", message: "", status: "New" });
    setActiveDialog("admission");
  };

  const startAddContact = () => {
    setEditItem(null);
    setContactForm({ name: "", email: "", phone: "", subject: "", message: "", status: "Pending" });
    setActiveDialog("contact");
  };

  const startAddJob = () => {
    setEditItem(null);
    setJobForm({ name: "", email: "", phone: "", vacancy: vacancies[0]?.id || "", cover_letter: "", resume: "" });
    setActiveDialog("job");
  };

  const startEditAdmission = (item: any) => {
    setEditItem(item);
    setAdmissionForm({
      student_name: item.student_name,
      parent_name: item.parent_name,
      phone: item.phone,
      email: item.email,
      class_applied: item.class_applied,
      message: item.message,
      status: item.status
    });
    setActiveDialog("admission");
  };

  const startEditContact = (item: any) => {
    setEditItem(item);
    setContactForm({
      name: item.name,
      email: item.email,
      phone: item.phone,
      subject: item.subject,
      message: item.message,
      status: item.status
    });
    setActiveDialog("contact");
  };

  const startEditJob = (item: any) => {
    setEditItem(item);
    setJobForm({
      name: item.name,
      email: item.email,
      phone: item.phone,
      vacancy: item.vacancy,
      cover_letter: item.cover_letter,
      resume: item.resume || ""
    });
    setActiveDialog("job");
  };

  // CRUD Forms Submission Handlers
  const handleAnnounceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/announcements/${editItem.id}/` : `${API_BASE}/announcements/`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(announcementForm)
      });
      if (res.ok) {
        toast.success(isEdit ? "Announcement updated!" : "Announcement created!");
        setAnnouncementForm({ title: "", message: "", priority: "Medium", status: "Active" });
        setEditItem(null);
        setActiveDialog(null);
        fetchAllData();
      } else {
        toast.error("Failed to save announcement.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/events/${editItem.id}/` : `${API_BASE}/events/`;
    const method = isEdit ? "PUT" : "POST";

    const curr = getLocalEventOverrides();
    const eventPayload: SchoolEventItem = {
      id: isEdit ? editItem.id : `ev-${Date.now()}`,
      title: eventForm.title,
      description: eventForm.description,
      event_date: eventForm.event_date,
      event_time: eventForm.event_time,
      venue: eventForm.venue,
      category: eventForm.category,
      status: eventForm.status,
      cover_image: eventForm.cover_image
    };

    if (isEdit) {
      const editIdStr = String(editItem.id);
      const inAdded = curr.added.some(a => String(a.id) === editIdStr);
      if (inAdded) {
        const nextAdded = curr.added.map(a => String(a.id) === editIdStr ? { ...a, ...eventPayload } : a);
        saveLocalEventOverride({ added: nextAdded });
      } else {
        const nextModified = { ...curr.modified, [editItem.id]: eventPayload };
        saveLocalEventOverride({ modified: nextModified });
      }
    } else {
      saveLocalEventOverride({ added: [...curr.added, eventPayload] });
    }

    try {
      if (token) {
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(eventPayload)
        });
      }
    } catch (err) {
      console.warn("Backend event sync failed:", err);
    }

    toast.success(isEdit ? "Event updated successfully!" : "Event created successfully!");
    setEventForm({ title: "", description: "", cover_image: "", event_date: "", event_time: "08:45 AM - 03:30 PM", venue: "School Campus", category: "Celebration", status: "Published" });
    setEditItem(null);
    setActiveDialog(null);
    setEvents(getMergedEvents([]));
  };

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/teachers/${editItem.id}/` : `${API_BASE}/teachers/`;
    const method = isEdit ? "PUT" : "POST";

    const curr = getLocalTeacherOverrides();
    const teacherPayload: TeacherItem = {
      id: isEdit ? editItem.id : `teach-${Date.now()}`,
      name: teacherForm.name,
      designation: teacherForm.designation,
      subject: teacherForm.subject,
      qualification: teacherForm.qualification,
      experience: teacherForm.experience,
      description: teacherForm.description,
      image: teacherForm.image
    };

    if (isEdit) {
      const editIdStr = String(editItem.id);
      const inAdded = curr.added.some(a => String(a.id) === editIdStr);
      if (inAdded) {
        const nextAdded = curr.added.map(a => String(a.id) === editIdStr ? { ...a, ...teacherPayload } : a);
        saveLocalTeacherOverride({ added: nextAdded });
      } else {
        const nextModified = { ...curr.modified, [editItem.id]: teacherPayload };
        saveLocalTeacherOverride({ modified: nextModified });
      }
    } else {
      saveLocalTeacherOverride({ added: [...curr.added, teacherPayload] });
    }

    try {
      if (token) {
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(teacherPayload)
        });
      }
    } catch (err) {
      console.warn("Backend teacher sync failed:", err);
    }

    toast.success(isEdit ? "Teacher profile updated!" : "Teacher profile created!");
    setTeacherForm({ name: "", designation: "", subject: "English", qualification: "", experience: "", description: "", image: "" });
    setEditItem(null);
    setActiveDialog(null);
    setTeachers(getMergedTeachers([]));
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/student-achievements/${editItem.id}/` : `${API_BASE}/student-achievements/`;
    const method = isEdit ? "PUT" : "POST";

    let title = "";
    if (achievementCategory === "sports") {
      title = `${studentForm.title} - ${studentForm.name}`;
    } else {
      title = studentForm.grade ? `${studentForm.title} - ${studentForm.name} (${studentForm.grade})` : `${studentForm.title} - ${studentForm.name}`;
    }

    const payload = {
      title,
      description: studentForm.reason,
      image: studentForm.image
    };

    const curr = getLocalAchievementOverrides();
    const itemData: AchievementItem = {
      id: isEdit ? editItem.id : `ach-${Date.now()}`,
      name: studentForm.name,
      grade: studentForm.grade,
      title: studentForm.title,
      description: studentForm.reason,
      image: studentForm.image,
      category: achievementCategory,
      year: "2026-2027"
    };

    if (isEdit) {
      const editIdStr = String(editItem.id);
      const inAdded = curr.added.some(a => String(a.id) === editIdStr);
      if (inAdded) {
        const nextAdded = curr.added.map(a => String(a.id) === editIdStr ? { ...a, ...itemData } : a);
        saveLocalAchievementOverride({ added: nextAdded });
      } else {
        const nextModified = { ...curr.modified, [editItem.id]: itemData };
        saveLocalAchievementOverride({ modified: nextModified });
      }
    } else {
      saveLocalAchievementOverride({ added: [...curr.added, itemData] });
    }

    try {
      if (token) {
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }
    } catch (err) {
      console.warn("Backend student achievement sync failed:", err);
    }

    toast.success(isEdit ? "Student record saved!" : "Student record created!");
    setStudentForm({ title: "", name: "", grade: "", reason: "", image: "" });
    setEditItem(null);
    setActiveDialog(null);
    setBestStudents(getMergedAchievements([]).all);
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/gallery-images/${editItem.id}/` : `${API_BASE}/gallery-images/`;
    const method = isEdit ? "PUT" : "POST";

    if (!galleryForm.image) {
      toast.error("Please upload or provide an image file.");
      return;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(galleryForm)
      });
      if (res.ok) {
        toast.success(isEdit ? "Photo updated!" : `Photo uploaded to "${galleryForm.category}"!`);
        setGalleryForm({ title: "", description: "", category: selectedGalleryFolder || "Christmas Celebration", image: "" });
        setEditItem(null);
        setActiveDialog(null);
        fetchAllData();
      } else {
        toast.error("Failed to save gallery photo.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
  };

  const handleNewFolderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const folderName = newFolderForm.name.trim();
    if (!folderName) {
      toast.error("Please enter a folder name.");
      return;
    }

    try {
      // 1. If an initial image is provided, upload it to gallery-images with this folder name
      if (newFolderForm.image) {
        const res = await fetch(`${API_BASE}/gallery-images/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            title: newFolderForm.photoTitle.trim() || `${folderName} Photo`,
            description: newFolderForm.photoDescription.trim() || newFolderForm.description.trim() || "Brotherhood School Celebration",
            category: folderName,
            image: newFolderForm.image
          })
        });
        if (!res.ok) {
          toast.error("Failed to upload initial folder image.");
          return;
        }
      }

      // 2. Save custom folder metadata to localStorage
      const updatedMeta = {
        ...customFolderMeta,
        [folderName]: {
          name: folderName,
          description: newFolderForm.description.trim() || "Celebration and event photographic archive",
          date: newFolderForm.date.trim() || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })
        }
      };
      setCustomFolderMeta(updatedMeta);
      try {
        localStorage.setItem("brotherhood_custom_folders", JSON.stringify(updatedMeta));
      } catch (err) {}

      // 3. Remove folderName and slug from deletedFolderIds if present
      const slug = toFolderId(folderName);
      const updatedDeleted = deletedFolderIds.filter(d => 
        d.toLowerCase() !== folderName.toLowerCase() && d.toLowerCase() !== slug
      );
      setDeletedFolderIds(updatedDeleted);
      try {
        localStorage.setItem("brotherhood_deleted_folders", JSON.stringify(updatedDeleted));
      } catch (err) {}

      toast.success(`Folder "${folderName}" created successfully!`);
      setNewFolderForm({ name: "", description: "", date: "", photoTitle: "", photoDescription: "", image: "" });
      setActiveDialog(null);
      setSelectedGalleryFolder(folderName);
      fetchAllData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create folder.");
    }
  };

  const handleDeleteFolder = async (folderName: string, folderId: string) => {
    if (!confirm(`Are you sure you want to delete the folder "${folderName}" and all of its images? This action is permanent.`)) {
      return;
    }

    const tId = toast.loading(`Deleting folder "${folderName}"...`);
    try {
      const slug = toFolderId(folderName);
      const imagesToDelete = galleryImages.filter(img => {
        const cat = (img.category || "").trim().toLowerCase();
        return cat === folderName.toLowerCase() || cat === folderId.toLowerCase() || cat === slug;
      });

      await Promise.all(
        imagesToDelete.map(img =>
          fetch(`${API_BASE}/gallery-images/${img.id}/`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
          })
        )
      );

      const updatedDeleted = Array.from(new Set([...deletedFolderIds, folderId, folderName, slug]));
      setDeletedFolderIds(updatedDeleted);
      try {
        localStorage.setItem("brotherhood_deleted_folders", JSON.stringify(updatedDeleted));
      } catch (err) {}

      const updatedMeta = { ...customFolderMeta };
      delete updatedMeta[folderName];
      setCustomFolderMeta(updatedMeta);
      try {
        localStorage.setItem("brotherhood_custom_folders", JSON.stringify(updatedMeta));
      } catch (err) {}

      if (selectedGalleryFolder === folderName || selectedGalleryFolder === folderId) {
        setSelectedGalleryFolder(null);
      }

      toast.dismiss(tId);
      toast.success(`Folder "${folderName}" deleted successfully!`);
      fetchAllData();
    } catch (err) {
      console.error(err);
      toast.dismiss(tId);
      toast.error("Failed to delete folder.");
    }
  };

  const handleDeleteGalleryImage = async (imgId: any, imgTitle?: string) => {
    if (!confirm(`Are you sure you want to delete this photo${imgTitle ? ` "${imgTitle}"` : ""}? This cannot be undone.`)) return;
    try {
      if (imgId) {
        await fetch(`${API_BASE}/gallery-images/${imgId}/`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
      }

      const identifier = String(imgId || imgTitle || "");
      if (identifier) {
        const updated = Array.from(new Set([...deletedPhotoIds, identifier, imgTitle || ""]));
        setDeletedPhotoIds(updated);
        try {
          localStorage.setItem("brotherhood_deleted_photos", JSON.stringify(updated));
        } catch {}
      }

      toast.success("Photo deleted successfully!");
      fetchAllData();
    } catch (err) {
      console.error(err);
      toast.error("Network error deleting photo.");
    }
  };

  const handleUniformSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/school-uniforms/${editItem.id}/` : `${API_BASE}/school-uniforms/`;
    const method = isEdit ? "PUT" : "POST";

    const curr = getLocalUniformOverrides();
    const uniformPayload: SchoolUniformItem = {
      id: isEdit ? editItem.id : `uni-${Date.now()}`,
      section: uniformForm.section,
      boys_uniform: uniformForm.boys_uniform,
      girls_uniform: uniformForm.girls_uniform
    };

    if (isEdit) {
      const editIdStr = String(editItem.id);
      const inAdded = curr.added.some(a => String(a.id) === editIdStr);
      if (inAdded) {
        const nextAdded = curr.added.map(a => String(a.id) === editIdStr ? { ...a, ...uniformPayload } : a);
        saveLocalUniformOverride({ added: nextAdded });
      } else {
        const nextModified = { ...curr.modified, [editItem.id]: uniformPayload };
        saveLocalUniformOverride({ modified: nextModified });
      }
    } else {
      saveLocalUniformOverride({ added: [...curr.added, uniformPayload] });
    }

    try {
      if (token) {
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(uniformPayload)
        });
      }
    } catch (err) {
      console.warn("Backend uniform sync failed:", err);
    }

    toast.success(isEdit ? "Uniform rules updated!" : "Uniform rules created!");
    setUniformForm({ section: "", boys_uniform: "", girls_uniform: "" });
    setEditItem(null);
    setActiveDialog(null);
    setUniforms(getMergedUniforms([]));
  };

  const handleHouseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/student-houses/${editItem.id}/` : `${API_BASE}/student-houses/`;
    const method = isEdit ? "PUT" : "POST";

    const curr = getLocalHouseOverrides();
    const housePayload: SchoolHouseItem = {
      id: isEdit ? editItem.id : `house-${Date.now()}`,
      name: houseForm.name,
      motto: houseForm.motto,
      values: houseForm.values,
      description: houseForm.description,
      points: houseForm.points,
      wing: houseForm.wing,
      color_code: houseForm.color_code,
      captain: houseForm.captain,
      captainClass: houseForm.captainClass,
      viceCaptain: houseForm.viceCaptain,
      viceCaptainClass: houseForm.viceCaptainClass
    };

    if (isEdit) {
      const editIdStr = String(editItem.id);
      const inAdded = curr.added.some(a => String(a.id) === editIdStr);
      if (inAdded) {
        const nextAdded = curr.added.map(a => String(a.id) === editIdStr ? { ...a, ...housePayload } : a);
        saveLocalHouseOverride({ added: nextAdded });
      } else {
        const nextModified = { ...curr.modified, [editItem.id]: housePayload, [houseForm.name]: housePayload };
        saveLocalHouseOverride({ modified: nextModified });
      }
    } else {
      saveLocalHouseOverride({ added: [...curr.added, housePayload] });
    }

    try {
      if (token) {
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(housePayload)
        });
      }
    } catch (err) {
      console.warn("Backend house sync failed:", err);
    }

    toast.success(isEdit ? "House details updated!" : "House details created!");
    setHouseForm({ 
      name: "", 
      motto: "", 
      values: "", 
      description: "", 
      points: 400, 
      wing: "Primary", 
      color_code: "bg-red-600",
      captain: "", 
      captainClass: "Std V", 
      viceCaptain: "", 
      viceCaptainClass: "Std V" 
    });
    setEditItem(null);
    setActiveDialog(null);
    setHouses(getMergedHouses([]));
  };

  const handleBoardTopperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/student-achievements/${editItem.id}/` : `${API_BASE}/student-achievements/`;
    const method = isEdit ? "PUT" : "POST";

    const title = `${boardTopperForm.title} - ${boardTopperForm.name} (${boardTopperForm.grade})`;
    const payload = {
      title,
      description: `${boardTopperForm.score ? `Score: ${boardTopperForm.score}. ` : ""}${boardTopperForm.stream ? `Stream: ${boardTopperForm.stream}. ` : ""}${boardTopperForm.reason}`,
      image: boardTopperForm.image
    };

    const curr = getLocalAchievementOverrides();
    const itemData: AchievementItem = {
      id: isEdit ? editItem.id : `ach-top-${Date.now()}`,
      name: boardTopperForm.name,
      grade: boardTopperForm.grade,
      title: boardTopperForm.title,
      score: boardTopperForm.score,
      stream: boardTopperForm.stream,
      year: boardTopperForm.year,
      reason: boardTopperForm.reason,
      image: boardTopperForm.image,
      type: "board_topper"
    };

    if (isEdit) {
      const editIdStr = String(editItem.id);
      const inAdded = curr.added.some(a => String(a.id) === editIdStr);
      if (inAdded) {
        const nextAdded = curr.added.map(a => String(a.id) === editIdStr ? { ...a, ...itemData } : a);
        saveLocalAchievementOverride({ added: nextAdded });
      } else {
        const nextModified = { ...curr.modified, [editItem.id]: itemData };
        saveLocalAchievementOverride({ modified: nextModified });
      }
    } else {
      saveLocalAchievementOverride({ added: [...curr.added, itemData] });
    }

    try {
      if (token) {
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }
    } catch (err) {
      console.warn("Backend board topper sync failed:", err);
    }

    toast.success(isEdit ? "Board topper details updated!" : "Board topper record added!");
    setBoardTopperForm({ name: "", grade: "Class XII", title: "School Topper", score: "598 / 600", stream: "Bio-Maths", reason: "", year: "2025-2026", image: "" });
    setEditItem(null);
    setActiveDialog(null);
    setBestStudents(getMergedAchievements([]).all);
  };

  const handleLeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/student-leaders/${editItem.id}/` : `${API_BASE}/student-leaders/`;
    const method = isEdit ? "PUT" : "POST";

    const curr = getLocalLeaderOverrides();
    const wing = leaderForm.wing || inferWing(leaderForm.grade, leaderForm.role);
    const leaderPayload: StudentLeaderItem = {
      id: isEdit ? editItem.id : `leader-${Date.now()}`,
      role: leaderForm.role,
      name: leaderForm.name,
      grade: leaderForm.grade,
      wing: wing,
      house: leaderForm.house || undefined,
      duties: leaderForm.duties || "Student council representative and pupil committee leader.",
      category: (leaderForm.role.includes("Captain") ? "House Captain" : leaderForm.role.includes("Prefect") ? "Prefect" : "Council") as any
    };

    if (isEdit) {
      const editIdStr = String(editItem.id);
      const inAdded = curr.added.some(a => String(a.id) === editIdStr);
      if (inAdded) {
        const nextAdded = curr.added.map(a => String(a.id) === editIdStr ? { ...a, ...leaderPayload } : a);
        saveLocalLeaderOverride({ added: nextAdded });
      } else {
        const nextModified = { ...curr.modified, [editItem.id]: leaderPayload };
        saveLocalLeaderOverride({ modified: nextModified });
      }
    } else {
      saveLocalLeaderOverride({ added: [...curr.added, leaderPayload] });
    }

    try {
      if (token) {
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(leaderPayload)
        });
      }
    } catch (err) {
      console.warn("Backend leader sync failed:", err);
    }

    toast.success(isEdit ? "Student leader updated!" : "Student leader nominated!");
    setLeaderForm({ role: "", name: "", grade: "", wing: "Primary", house: "", duties: "" });
    setEditItem(null);
    setActiveDialog(null);
    setLeaders(getMergedStudentLeaders([]));
  };

  const startEditUniform = (item: any) => {
    setEditItem(item);
    setUniformForm({
      section: item.section || "",
      boys_uniform: item.boys_uniform || "",
      girls_uniform: item.girls_uniform || ""
    });
    setActiveDialog("uniform");
  };

  const startEditHouse = (item: any) => {
    setEditItem(item);
    setHouseForm({
      name: item.name || "",
      motto: item.motto || "",
      values: item.values || "",
      description: item.description || "",
      points: typeof item.points === "number" ? item.points : 400,
      wing: item.wing || (["galilee", "zion", "judah", "bethel"].some(w => (item.name || "").toLowerCase().includes(w)) ? "Primary" : "Senior"),
      color_code: item.color_code || "bg-red-600",
      captain: item.captain || "",
      captainClass: item.captainClass || "Std V",
      viceCaptain: item.viceCaptain || "",
      viceCaptainClass: item.viceCaptainClass || "Std V"
    });
    setActiveDialog("house");
  };

  const startEditBoardTopper = (item: any) => {
    setEditItem(item);
    setBoardTopperForm({
      name: item.name || "",
      grade: item.grade || item.stream || "Class XII",
      title: item.title || item.rank || "School Topper",
      score: item.score || "",
      stream: item.stream || "",
      reason: item.reason || item.description || "",
      year: item.year || "2025-2026",
      image: item.image || ""
    });
    setActiveDialog("board_topper");
  };

  const startEditLeader = (item: any) => {
    setEditItem(item);
    setLeaderForm({
      role: item.role || "",
      name: item.name || "",
      grade: item.grade || "",
      wing: item.wing || inferWing(item.grade, item.role),
      house: item.house || "",
      duties: item.duties || ""
    });
    setActiveDialog("leader");
  };

  // Synchronize dynamic pages with pageEditorForm
  useEffect(() => {
    const dynamicSlugs = ["about-school", "founder-message", "correspondent-message", "principal-message"];
    if (dynamicSlugs.includes(editorPage) && cmsPages.length > 0) {
      const page = cmsPages.find(p => p.slug === editorPage);
      if (page) {
        setActivePageData(page);
        setPageEditorForm({
          title: page.title || "",
          hero_title: page.hero_title || "",
          hero_subtitle: page.hero_subtitle || "",
          seo_title: page.seo_title || "",
          seo_description: page.seo_description || "",
          content_blocks: page.content_blocks ? { ...page.content_blocks } : {}
        });
      }
    } else {
      setActivePageData(null);
    }
  }, [editorPage, cmsPages]);

  const handlePageUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePageData || !token) return;

    const payload = {
      title: pageEditorForm.title,
      hero_title: pageEditorForm.hero_title,
      hero_subtitle: pageEditorForm.hero_subtitle,
      seo_title: pageEditorForm.seo_title,
      seo_description: pageEditorForm.seo_description,
      content_blocks: pageEditorForm.content_blocks
    };

    const loadToast = toast.loading("Saving live page content changes...");
    try {
      const res = await fetch(`${API_BASE}/pages/${activePageData.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.dismiss(loadToast);
        toast.success("Page content updated and published successfully!");
        // Refresh page data
        const headers = { "Authorization": `Bearer ${token}` };
        const pagesRes = await fetch(`${API_BASE}/pages/`, { headers });
        if (pagesRes.ok) {
          const d = await pagesRes.json();
          setCmsPages(d);
        }
      } else {
        toast.dismiss(loadToast);
        toast.error("Failed to update page content.");
      }
    } catch (err) {
      toast.dismiss(loadToast);
      console.error(err);
      toast.error("Network error saving changes.");
    }
  };

  // Open Edit Modals and Populate Form
  const startEditAnnounce = (item: any) => {
    setEditItem(item);
    setAnnouncementForm({
      title: item.title,
      message: item.message,
      priority: item.priority,
      status: item.status
    });
    setActiveDialog("announce");
  };

  const startEditEvent = (item: any) => {
    setEditItem(item);
    setEventForm({
      title: item.title,
      description: item.description,
      cover_image: item.cover_image || "",
      event_date: item.event_date,
      event_time: item.event_time || "08:45 AM - 03:30 PM",
      venue: item.venue || "School Campus",
      category: item.category,
      status: item.status
    });
    setActiveDialog("event");
  };

  const startEditTeacher = (item: any) => {
    setEditItem(item);
    setTeacherForm({
      name: item.name,
      designation: item.designation,
      subject: item.subject,
      qualification: item.qualification,
      experience: item.experience,
      description: item.description,
      image: item.image || ""
    });
    setActiveDialog("teacher");
  };

  const startEditStudent = (item: any) => {
    setEditItem(item);
    
    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    
    let category: "best_student" | "board_topper" | "sports" = "best_student";
    
    const isBoard = titleLower.includes("rank") || 
                    titleLower.includes("topper") || 
                    titleLower.includes("centum") ||
                    titleLower.includes("board") ||
                    descLower.includes("score") ||
                    descLower.includes("marks") ||
                    item.description.includes("/ 600") ||
                    item.description.includes("100/");
                    
    if (titleLower.includes("best student")) {
      category = "best_student";
    } else if (isBoard) {
      category = "board_topper";
    } else {
      category = "sports";
    }
    
    setAchievementCategory(category);
    
    const parts = item.title.split(" - ");
    if (category === "sports") {
      setStudentForm({
        title: parts[0] || "",
        name: parts[1] || "",
        grade: "",
        reason: item.description,
        image: item.image || ""
      });
    } else {
      const awardTitle = parts[0] || "";
      const nameWithGrade = parts[1] || "";
      const nameParts = nameWithGrade.split(" (");
      const name = nameParts[0] || "";
      const grade = nameParts[1] ? nameParts[1].replace(")", "") : "";
      
      setStudentForm({
        title: awardTitle,
        name: name,
        grade: grade,
        reason: item.description,
        image: item.image || ""
      });
    }
    setActiveDialog("student");
  };

  const startAddBestStudent = () => {
    setEditItem(null);
    setStudentForm({ title: "Best Student of the Month", name: "", grade: "", reason: "", image: "" });
    setAchievementCategory("best_student");
    setActiveDialog("student");
  };

  const startAddResultAchievement = () => {
    setEditItem(null);
    setStudentForm({ title: "State Rank 1st", name: "", grade: "", reason: "", image: "" });
    setAchievementCategory("board_topper");
    setActiveDialog("student");
  };

  const startAddUniform = () => {
    setEditItem(null);
    setUniformForm({ section: "", boys_uniform: "", girls_uniform: "" });
    setActiveDialog("uniform");
  };

  const startAddHouse = () => {
    setEditItem(null);
    setHouseForm({ name: "", motto: "", color_code: "bg-red-500", description: "", points: 0 });
    setActiveDialog("house");
  };

  const startAddLeader = () => {
    setEditItem(null);
    setLeaderForm({ role: "", name: "", grade: "" });
    setActiveDialog("leader");
  };

  const startEditGallery = (item: any) => {
    setEditItem(item);
    setGalleryForm({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "Events",
      image: item.image || ""
    });
    setActiveDialog("gallery");
  };

  // Unauthenticated Login Interface
  if (!token) {
    return (
      <div className="flex min-h-[92vh] items-center justify-center bg-[#05140b] py-16 px-6 relative overflow-hidden">
        {/* Cinematic Backdrop Glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#0a2b18] to-transparent rounded-full blur-[120px] opacity-40 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-[#d4af37]/10 to-transparent rounded-full blur-[120px] opacity-45 pointer-events-none" />
        
        {/* Subtle grid mesh background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#0a2b18]/50 backdrop-blur-2xl border border-[#d4af37]/30 rounded-[2rem] shadow-[0_25px_60px_-15px_rgba(5,20,11,0.7)] relative overflow-hidden animate-scale-up p-8 space-y-6">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#b58c2a] via-[#d4af37] to-[#b58c2a]" />
          
          <div className="text-center space-y-2 pb-2">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-[#0a2b18] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-3 animate-float shadow-[0_8px_20px_rgba(212,175,55,0.15)]">
              <Lock className="h-7 w-7" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-white tracking-tight">Admin Gatekeeper</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">
              Brotherhood Group of Schools
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5 text-left">
              <Label htmlFor="username" className="text-[10px] font-bold uppercase tracking-widest text-white/60">Username</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d4af37]" />
                <Input 
                  id="username"
                  type="text" 
                  placeholder="Enter username" 
                  className="pl-11 pr-4 py-6 rounded-xl bg-black/40 border-white/10 text-white focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/30 placeholder:text-white/30"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-white/60">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d4af37]" />
                <Input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-11 pr-4 py-6 rounded-xl bg-black/40 border-white/10 text-white focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/30 placeholder:text-white/30"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="pt-4 flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#b58c2a] via-[#d4af37] to-[#b58c2a] hover:from-[#d4af37] hover:to-[#b58c2a] text-[#0a2b18] font-bold rounded-full py-6 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] border-0"
                disabled={loading}
              >
                {loading ? "Authenticating Master Key..." : "Secure Log In"}
              </Button>
              <div className="text-[9px] uppercase tracking-widest text-white/40 text-center">
                Restricted System • Authorized Staff Only
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Administration Console
  return (
    <div className="min-h-screen bg-[#f4f7f5] pb-20 text-[#2d3748] selection:bg-[#0a2b18] selection:text-white">
      {/* Top Banner Control Panel Header */}
      <div className="bg-gradient-to-br from-[#05140b] via-[#0a2b18] to-[#05140b] text-white py-14 px-8 shadow-2xl border-b border-[#d4af37]/25 relative overflow-hidden">
        {/* Glowing overlay effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0a2b18] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#d4af37]/45 bg-[#d4af37]/10 text-[10px] font-bold text-[#d4af37] tracking-widest uppercase mb-3 shadow-[0_2px_8px_rgba(212,175,55,0.1)]">
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" /> Unified Control Console
            </div>
            <h1 className="font-serif text-3.5xl sm:text-4.5xl font-bold tracking-tight text-white leading-tight">
              School Content Admin
            </h1>
            <p className="text-sm text-white/70 font-medium mt-1.5">
              Active Session: <strong className="text-[#d4af37]">{userProfile?.username || "Admin"}</strong> ({userProfile?.role || "Staff Editor"})
            </p>
          </div>
          
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="rounded-full border-[#d4af37]/35 bg-[#d4af37]/5 hover:bg-red-600 hover:text-white transition duration-300 text-white gap-2 font-bold px-6 shadow-[0_4px_12px_rgba(212,175,55,0.05)] hover:border-red-600"
          >
            <LogOut className="h-4 w-4 text-[#d4af37]" /> Sign Out
          </Button>
        </div>
      </div>

      {/* Main Tabbed Editor Panel Container */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 rounded-2xl flex flex-wrap h-auto gap-1">
            <TabsTrigger value="dashboard" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><LayoutDashboard className="h-4.5 w-4.5" /> Dashboard Overview</TabsTrigger>
            <TabsTrigger value="announcements" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Bell className="h-4.5 w-4.5" /> Home Page Announcements</TabsTrigger>
            <TabsTrigger value="events" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Calendar className="h-4.5 w-4.5" /> Calendar &amp; Events Page</TabsTrigger>
            <TabsTrigger value="teachers" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Users className="h-4.5 w-4.5" /> Teachers Page</TabsTrigger>
            <TabsTrigger value="best-students" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Award className="h-4.5 w-4.5" /> Best Students Page</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Trophy className="h-4.5 w-4.5" /> Results &amp; Achievements Page</TabsTrigger>
            <TabsTrigger value="uniforms" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Shirt className="h-4.5 w-4.5" /> School Uniform Page</TabsTrigger>
            <TabsTrigger value="houses" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Flag className="h-4.5 w-4.5" /> School Houses Page</TabsTrigger>
            <TabsTrigger value="leaders" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><UserCheck className="h-4.5 w-4.5" /> Student Leaders Page</TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><ImageIcon className="h-4.5 w-4.5" /> Photo Gallery Page</TabsTrigger>
            <TabsTrigger value="submissions" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><MessageSquare className="h-4.5 w-4.5" /> Contact &amp; Admissions Inbox</TabsTrigger>
            <TabsTrigger value="live-editor" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Sparkles className="h-4.5 w-4.5 text-gold" /> Website Pages Editor</TabsTrigger>
          </TabsList>

          {/* TAB 1: OVERVIEW STATISTICS */}
          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card border border-border rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Total Announcements</CardTitle>
                  <Bell className="h-5 w-5 text-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-display text-primary">{announcements.length}</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Active updates shown in marquee/popups</p>
                </CardContent>
              </Card>
              <Card className="bg-card border border-border rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Scheduled Events</CardTitle>
                  <Calendar className="h-5 w-5 text-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-display text-primary">{events.length}</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Upcoming milestones & latest highlights</p>
                </CardContent>
              </Card>
              <Card className="bg-card border border-border rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Faculty Members</CardTitle>
                  <Users className="h-5 w-5 text-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-display text-primary">{teachers.length}</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Teachers in the school directory</p>
                </CardContent>
              </Card>
              <Card className="bg-card border border-border rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Feedback Inbox</CardTitle>
                  <MessageSquare className="h-5 w-5 text-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-display text-primary">{contacts.length + admissions.length}</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Contact messages & admission queries</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-xl text-primary font-bold">Quick Administrative Tools</CardTitle>
                <CardDescription>Select actions below to post updates directly to specific website pages.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4 pt-2">
                <Button onClick={() => { setEditItem(null); setAnnouncementForm({ title: "", message: "", priority: "Medium", status: "Active" }); setActiveDialog("announce"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                  <Plus className="h-4.5 w-4.5" /> Post Home Announcement
                </Button>
                <Button onClick={() => { setEditItem(null); setEventForm({ title: "", description: "", cover_image: "", event_date: "", category: "Academic", status: "Published" }); setActiveDialog("event"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                  <Plus className="h-4.5 w-4.5" /> Add Calendar Event (/events)
                </Button>
                <Button onClick={() => { setEditItem(null); setTeacherForm({ name: "", designation: "", subject: "English", qualification: "", experience: "", description: "", image: "" }); setActiveDialog("teacher"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                  <Plus className="h-4.5 w-4.5" /> Add Teacher Profile (/teachers)
                </Button>
                <Button onClick={() => { setEditItem(null); setStudentForm({ title: "", name: "", grade: "", reason: "", image: "" }); setActiveDialog("student"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                  <Plus className="h-4.5 w-4.5" /> Nominate Best Student (/students/best-student)
                </Button>
                <Button onClick={() => { setEditItem(null); setGalleryForm({ title: "", description: "", category: "Events", image: "" }); setActiveDialog("gallery"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                  <Plus className="h-4.5 w-4.5" /> Upload Gallery Photo (/gallery)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: ANNOUNCEMENTS MANAGER */}
          <TabsContent value="announcements" className="animate-fade-in">
            <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
                <div>
                  <CardTitle className="font-display text-xl text-primary font-bold">Home Page Announcements &amp; Notices</CardTitle>
                  <CardDescription>Manage breaking news, marquee alerts, and pop-up notices shown on the Home Page and Notice Board.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => { setEditItem(null); setAnnouncementForm({ title: "", message: "", priority: "Medium", status: "Active" }); setActiveDialog("announce"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add Home Announcement
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {announcements.map((ann) => (
                      <TableRow key={ann.id}>
                        <TableCell className="font-semibold">{ann.title}</TableCell>
                        <TableCell className="max-w-xs truncate">{ann.message}</TableCell>
                        <TableCell>
                          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            ann.priority === "High" ? "bg-red-100 text-red-700" :
                            ann.priority === "Medium" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                          }`}>{ann.priority}</span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            ann.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                          }`}>{ann.status}</span>
                        </TableCell>
                        <TableCell className="text-right space-x-1.5">
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gold/10 hover:text-gold" onClick={() => startEditAnnounce(ann)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete("announcements", ann.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {announcements.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-10">No bulletins posted. Add some above!</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: EVENTS MANAGER */}
          <TabsContent value="events" className="animate-fade-in">
            <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
                <div>
                  <CardTitle className="font-display text-xl text-primary font-bold">Calendar &amp; Events Page (/events)</CardTitle>
                  <CardDescription>Manage academic calendar dates, holidays, examinations, and celebrations shown on the Calendar &amp; Events page.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => { setEditItem(null); setEventForm({ title: "", description: "", cover_image: "", event_date: "", event_time: "08:45 AM - 03:30 PM", venue: "School Campus", category: "Celebration", status: "Published" }); setActiveDialog("event"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add Calendar Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search & Filter Toolbar */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-muted/30 p-3 rounded-2xl border border-border/50">
                  <div className="flex flex-1 gap-2 items-center">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search event title, venue, or date..."
                        value={eventSearch}
                        onChange={(e) => setEventSearch(e.target.value)}
                        className="pl-9 h-9 rounded-xl bg-background"
                      />
                    </div>
                    <Select value={eventCategoryFilter} onValueChange={setEventCategoryFilter}>
                      <SelectTrigger className="w-[180px] h-9 rounded-xl bg-background">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="Celebration">Celebration</SelectItem>
                        <SelectItem value="Exam">Examination</SelectItem>
                        <SelectItem value="Holiday">Holiday</SelectItem>
                        <SelectItem value="Field Trip">Field Trip / Tour</SelectItem>
                        <SelectItem value="Activity">Activity / Club</SelectItem>
                        <SelectItem value="Competition">Competition</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Meeting">Meeting / Open Day</SelectItem>
                        <SelectItem value="Reopening">Reopening</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Cultural">Cultural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground px-2">
                    {(() => {
                      const count = events
                        .filter((ev) => {
                          const matchesCat = eventCategoryFilter === "All" || (ev.category && ev.category.toLowerCase() === eventCategoryFilter.toLowerCase());
                          const query = eventSearch.toLowerCase().trim();
                          const matchesSearch = !query || 
                            (ev.title && ev.title.toLowerCase().includes(query)) ||
                            (ev.description && ev.description.toLowerCase().includes(query)) ||
                            (ev.venue && ev.venue.toLowerCase().includes(query)) ||
                            (ev.event_date && ev.event_date.includes(query));
                          return matchesCat && matchesSearch;
                        }).length;
                      return `Showing ${count} of ${events.length} events (Chronological Order)`;
                    })()}
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cover</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Date &amp; Time</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Timeline Segment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events
                      .slice()
                      .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
                      .filter((ev) => {
                        const matchesCat = eventCategoryFilter === "All" || (ev.category && ev.category.toLowerCase() === eventCategoryFilter.toLowerCase());
                        const query = eventSearch.toLowerCase().trim();
                        const matchesSearch = !query || 
                          (ev.title && ev.title.toLowerCase().includes(query)) ||
                          (ev.description && ev.description.toLowerCase().includes(query)) ||
                          (ev.venue && ev.venue.toLowerCase().includes(query)) ||
                          (ev.event_date && ev.event_date.includes(query));
                        return matchesCat && matchesSearch;
                      })
                      .map((ev) => {
                        const isUpcoming = new Date(ev.event_date) >= new Date(new Date().setHours(0,0,0,0));
                        return (
                          <TableRow key={ev.id}>
                            <TableCell>
                              {ev.cover_image ? (
                                <div className="h-10 w-14 rounded-md bg-cover bg-center border border-border" style={{ backgroundImage: `url(${ev.cover_image})` }} />
                              ) : (
                                <div className="h-10 w-14 rounded-md border border-gold/20 bg-gold/10 flex items-center justify-center text-gold">
                                  <Calendar className="h-5 w-5" />
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="font-semibold">
                              <div>{ev.title}</div>
                              {ev.venue && <div className="text-xs text-muted-foreground">{ev.venue}</div>}
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{ev.event_date}</div>
                              {ev.event_time && <div className="text-xs text-muted-foreground">{ev.event_time}</div>}
                            </TableCell>
                            <TableCell>
                              <span className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                                {ev.category}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                isUpcoming ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                              }`}>{isUpcoming ? "Upcoming" : "Past Event"}</span>
                            </TableCell>
                            <TableCell className="text-right space-x-1.5">
                              <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gold/10 hover:text-gold" onClick={() => startEditEvent(ev)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete("events", ev.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {events.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-10">No events registered yet.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: TEACHERS MANAGER */}
          <TabsContent value="teachers" className="animate-fade-in">
            <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
                <div>
                  <CardTitle className="font-display text-xl text-primary font-bold">Teachers Directory Page (/teachers)</CardTitle>
                  <CardDescription>Add, edit, or remove teaching faculty members and department heads displayed on the Teachers page.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => { setEditItem(null); setTeacherForm({ name: "", designation: "", subject: "Mathematics", qualification: "", experience: "", description: "", image: "" }); setActiveDialog("teacher"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add Teacher Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Department Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-muted/30 p-3 rounded-2xl border border-border/50">
                  <div className="flex flex-1 gap-2 items-center">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search faculty name, role, or qualification..."
                        value={teacherSearch}
                        onChange={(e) => setTeacherSearch(e.target.value)}
                        className="pl-9 h-9 rounded-xl bg-background"
                      />
                    </div>
                    <Select value={teacherDeptFilter} onValueChange={setTeacherDeptFilter}>
                      <SelectTrigger className="w-[200px] h-9 rounded-xl bg-background">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        <SelectItem value="All">All Departments</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Tamil">Tamil</SelectItem>
                        <SelectItem value="Economics">Economics</SelectItem>
                        <SelectItem value="Commerce">Commerce &amp; Accountancy</SelectItem>
                        <SelectItem value="History">History &amp; Social Science</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Physical Education">Physical Education</SelectItem>
                        <SelectItem value="Art">Art &amp; Library</SelectItem>
                        <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                        <SelectItem value="Administration">Administration</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground px-2">
                    {(() => {
                      const count = teachers.filter((teach) => {
                        const dept = teacherDeptFilter.toLowerCase().trim();
                        const matchesDept = teacherDeptFilter === "All" ||
                          (teach.subject && teach.subject.toLowerCase().trim() === dept) ||
                          (dept === "kindergarten" && (teach.subject?.toLowerCase().includes("kindergarten") || teach.designation?.toLowerCase().includes("kindergarten"))) ||
                          (dept === "physical education" && (teach.subject?.toLowerCase().includes("physical") || teach.designation?.toLowerCase().includes("physical")));
                        const query = teacherSearch.toLowerCase().trim();
                        const matchesSearch = !query ||
                          (teach.name && teach.name.toLowerCase().includes(query)) ||
                          (teach.designation && teach.designation.toLowerCase().includes(query)) ||
                          (teach.subject && teach.subject.toLowerCase().includes(query)) ||
                          (teach.qualification && teach.qualification.toLowerCase().includes(query));
                        return matchesDept && matchesSearch;
                      }).length;
                      return `Showing ${count} of ${teachers.length} faculty members`;
                    })()}
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Photo</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teachers
                      .filter((teach) => {
                        const dept = teacherDeptFilter.toLowerCase().trim();
                        const matchesDept = teacherDeptFilter === "All" ||
                          (teach.subject && teach.subject.toLowerCase().trim() === dept) ||
                          (dept === "kindergarten" && (teach.subject?.toLowerCase().includes("kindergarten") || teach.designation?.toLowerCase().includes("kindergarten"))) ||
                          (dept === "physical education" && (teach.subject?.toLowerCase().includes("physical") || teach.designation?.toLowerCase().includes("physical")));
                        const query = teacherSearch.toLowerCase().trim();
                        const matchesSearch = !query ||
                          (teach.name && teach.name.toLowerCase().includes(query)) ||
                          (teach.designation && teach.designation.toLowerCase().includes(query)) ||
                          (teach.subject && teach.subject.toLowerCase().includes(query)) ||
                          (teach.qualification && teach.qualification.toLowerCase().includes(query));
                        return matchesDept && matchesSearch;
                      })
                      .map((teach) => (
                        <TableRow key={teach.id}>
                          <TableCell>
                            {teach.image ? (
                              <div className="h-10 w-10 rounded-full bg-cover bg-center border border-border" style={{ backgroundImage: `url(${teach.image})` }} />
                            ) : (
                              <div className="h-10 w-10 rounded-full border border-gold/25 bg-navy-deep text-white flex items-center justify-center font-display text-[10px] font-bold">
                                {teach.name.split(" ").map((n: string) => n[0]).join("")}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-semibold">
                            <div>{teach.name}</div>
                            {teach.qualification && <div className="text-xs text-muted-foreground">{teach.qualification}</div>}
                          </TableCell>
                          <TableCell>{teach.designation}</TableCell>
                          <TableCell>
                            <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                              {teach.subject}
                            </span>
                          </TableCell>
                          <TableCell>{teach.experience}</TableCell>
                          <TableCell className="text-right space-x-1.5">
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gold/10 hover:text-gold" onClick={() => startEditTeacher(teach)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete("teachers", teach.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    {teachers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-10">No educator records found.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5: BEST STUDENTS */}
          <TabsContent value="best-students" className="animate-fade-in">
            <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
                <div>
                  <CardTitle className="font-display text-xl text-primary font-bold">Best Students Page (/students/best-student)</CardTitle>
                  <CardDescription>Nominate Best Students of the month and star pupils showcased on the Best Students page.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={startAddBestStudent} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Nominate Best Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Award Title</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Reason / Accomplishment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bestStudents.filter(s => s.title.toLowerCase().includes("best student")).map((stud) => {
                      const parts = stud.title.split(" - ");
                      const awardTitle = parts[0] || "Best Student";
                      const nameWithGrade = parts[1] || "";
                      const nameParts = nameWithGrade.split(" (");
                      const name = nameParts[0] || stud.title;
                      const grade = nameParts[1] ? nameParts[1].replace(")", "") : "";
                      return (
                        <TableRow key={stud.id}>
                          <TableCell className="font-semibold">{awardTitle}</TableCell>
                          <TableCell className="font-medium">{name}</TableCell>
                          <TableCell className="font-semibold text-primary">{grade}</TableCell>
                          <TableCell className="max-w-xs truncate">{stud.description}</TableCell>
                          <TableCell className="text-right space-x-1.5">
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gold/10 hover:text-gold" onClick={() => startEditStudent(stud)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete("student-achievements", stud.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {bestStudents.filter(s => s.title.toLowerCase().includes("best student")).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-10">No Best Student records found.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5B: RESULTS & ACHIEVEMENTS */}
          <TabsContent value="achievements" className="animate-fade-in">
            <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
                <div>
                  <CardTitle className="font-display text-xl text-primary font-bold">Results &amp; Achievements Page (/students/achievements)</CardTitle>
                  <CardDescription>Manage 10th &amp; 12th state board toppers, subject centum holders, and sports achievements shown on the Achievements page.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={startAddResultAchievement} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add Result / Achievement
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Title / Championship</TableHead>
                      <TableHead>Student Name / Award Won</TableHead>
                      <TableHead>Score / Division Detail</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bestStudents.filter(s => !s.title.toLowerCase().includes("best student")).map((stud) => {
                      const titleLower = stud.title.toLowerCase();
                      const descLower = stud.description.toLowerCase();
                      const isBoard = titleLower.includes("rank") || 
                                      titleLower.includes("topper") || 
                                      titleLower.includes("centum") ||
                                      titleLower.includes("board") ||
                                      descLower.includes("score") ||
                                      descLower.includes("marks") ||
                                      stud.description.includes("/ 600") ||
                                      stud.description.includes("100/");
                      
                      const parts = stud.title.split(" - ");
                      if (isBoard) {
                        const rank = parts[0] || "Topper";
                        const nameWithGrade = parts[1] || "";
                        const nameParts = nameWithGrade.split(" (");
                        const name = nameParts[0] || stud.title;
                        const grade = nameParts[1] ? nameParts[1].replace(")", "") : "";
                        return (
                          <TableRow key={stud.id}>
                            <TableCell><span className="inline-block rounded-full px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold">Academic Result</span></TableCell>
                            <TableCell className="font-semibold">{rank} (Class: {grade})</TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell className="font-semibold text-primary">{stud.description}</TableCell>
                            <TableCell className="text-right space-x-1.5">
                              <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gold/10 hover:text-gold" onClick={() => startEditStudent(stud)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete("student-achievements", stud.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      } else {
                        const eventTitle = parts[0] || stud.title;
                        const awardName = parts[1] || "Achievement Award";
                        return (
                          <TableRow key={stud.id}>
                            <TableCell><span className="inline-block rounded-full px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold">Sports/Co-curricular</span></TableCell>
                            <TableCell className="font-semibold">{eventTitle}</TableCell>
                            <TableCell>{awardName}</TableCell>
                            <TableCell className="text-muted-foreground">{stud.description}</TableCell>
                            <TableCell className="text-right space-x-1.5">
                              <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gold/10 hover:text-gold" onClick={() => startEditStudent(stud)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete("student-achievements", stud.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                    {bestStudents.filter(s => !s.title.toLowerCase().includes("best student")).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-10">No board results or sports achievements logged.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5C: SCHOOL UNIFORMS */}
          <TabsContent value="uniforms" className="animate-fade-in">
            <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
                <div>
                  <CardTitle className="font-display text-xl text-primary font-bold">School Uniform Page (/students/school-uniform)</CardTitle>
                  <CardDescription>Manage daily uniform dress codes and footwear specifications shown on the School Uniform page.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={startAddUniform} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add Uniform Rule
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Section Name</TableHead>
                      <TableHead>Boys Dress Code</TableHead>
                      <TableHead>Girls Dress Code</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uniforms.map((uni) => (
                      <TableRow key={uni.id}>
                        <TableCell className="font-semibold">{uni.section}</TableCell>
                        <TableCell className="max-w-xs text-xs">{uni.boys_uniform}</TableCell>
                        <TableCell className="max-w-xs text-xs">{uni.girls_uniform}</TableCell>
                        <TableCell className="text-right space-x-1.5">
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gold/10 hover:text-gold" onClick={() => startEditUniform(uni)}>
                            <Edit className="h-4.5 w-4.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete("school-uniforms", uni.id)}>
                            <Trash2 className="h-4.5 w-4.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {uniforms.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-10">No uniform rules registered.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5D: SCHOOL HOUSES */}
          <TabsContent value="houses" className="animate-fade-in">
            <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
                <div>
                  <CardTitle className="font-display text-xl text-primary font-bold">School Houses Page (/students/houses)</CardTitle>
                  <CardDescription>Manage school houses (Red, Blue, Green, Yellow), mottos, color codes, and scoreboard points shown on the School Houses page.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={startAddHouse} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add School House
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>House Badge</TableHead>
                      <TableHead>House Name</TableHead>
                      <TableHead>Motto</TableHead>
                      <TableHead>Scoreboard Points</TableHead>
                      <TableHead>Description / Focus</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {houses.map((house) => (
                      <TableRow key={house.id}>
                        <TableCell>
                          <div className={`h-8 w-8 rounded-full ${house.color_code || 'bg-slate-400'} flex items-center justify-center text-white font-bold text-xs`}>
                            {house.name.charAt(0)}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{house.name}</TableCell>
                        <TableCell><span className="text-xs uppercase font-semibold text-gold">{house.motto}</span></TableCell>
                        <TableCell className="font-bold text-primary">{house.points}</TableCell>
                        <TableCell className="max-w-xs truncate text-xs text-muted-foreground">{house.description}</TableCell>
                        <TableCell className="text-right space-x-1.5">
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gold/10 hover:text-gold" onClick={() => startEditHouse(house)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete("student-houses", house.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {houses.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-10">No houses added yet.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5E: STUDENT LEADERS */}
          <TabsContent value="leaders" className="animate-fade-in">
            <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
                <div>
                  <CardTitle className="font-display text-xl text-primary font-bold">Student Leaders Page (/students/student-leaders)</CardTitle>
                  <CardDescription>Nominate Student Captains, Head Boy, Head Girl, and House Prefects shown on the Student Leaders page.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={startAddLeader} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add Student Leader
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class / Grade</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaders.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell><span className="text-xs uppercase font-semibold text-gold">{lead.role}</span></TableCell>
                        <TableCell className="font-semibold">{lead.name}</TableCell>
                        <TableCell className="text-muted-foreground">{lead.grade}</TableCell>
                        <TableCell className="text-right space-x-1.5">
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gold/10 hover:text-gold" onClick={() => startEditLeader(lead)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete("student-leaders", lead.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {leaders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-10">No student leaders nominated yet.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 6: GALLERY MANAGER (FOLDER-BASED) */}
          <TabsContent value="gallery" className="animate-fade-in space-y-6">
            {(() => {
              const allDisplayFolders = getMergedGalleryFolders(galleryImages, deletedFolderIds, customFolderMeta, deletedPhotoIds);

              if (selectedGalleryFolder === null) {
                // LEVEL 1: FOLDERS DIRECTORY VIEW
                return (
                  <Card className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
                    <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 px-0 pt-0">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs uppercase tracking-wider font-bold mb-2">
                          <Folder className="w-3.5 h-3.5 text-gold" />
                          <span>Album Directory • {allDisplayFolders.length} Folders</span>
                        </div>
                        <CardTitle className="font-display text-2xl text-primary font-bold">Photo Gallery Folders (/gallery)</CardTitle>
                        <CardDescription>
                          Browse celebration folders, upload photographs directly into existing folders, or create new folders.
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button 
                          onClick={() => {
                            setNewFolderForm({ name: "", description: "", date: "", photoTitle: "", photoDescription: "", image: "" });
                            setActiveDialog("new_folder");
                          }} 
                          variant="outline" 
                          className="rounded-full border-gold text-gold font-bold hover:bg-gold/10 gap-1.5"
                        >
                          <FolderPlus className="h-4.5 w-4.5" /> Create New Folder
                        </Button>
                        <Button 
                          onClick={() => {
                            setEditItem(null);
                            setGalleryForm({
                              title: "",
                              description: "",
                              category: allDisplayFolders[0]?.name || "Christmas Celebration",
                              image: ""
                            });
                            setActiveDialog("gallery");
                          }} 
                          className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 shadow-md"
                        >
                          <Plus className="h-4.5 w-4.5" /> Upload Photo
                        </Button>
                      </div>
                    </CardHeader>

                    <div className="mb-6 max-w-sm">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search celebration folders..." 
                          value={galleryFolderSearch}
                          onChange={(e) => setGalleryFolderSearch(e.target.value)}
                          className="pl-9 rounded-full bg-background"
                        />
                      </div>
                    </div>

                    <CardContent className="px-0 pb-0">
                      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {allDisplayFolders
                          .filter(f => !galleryFolderSearch || f.name.toLowerCase().includes(galleryFolderSearch.toLowerCase()) || f.description.toLowerCase().includes(galleryFolderSearch.toLowerCase()))
                          .map((folder) => {
                            const coverImg = resolveGalleryImageSrc(folder.photos[0]?.src || "/images/gallery photos/christmas programme.JPG");
                            return (
                              <div 
                                key={folder.id} 
                                className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md hover:border-gold/60 transition-all duration-300 flex flex-col group"
                              >
                                {/* Folder Cover Frame */}
                                <div 
                                  onClick={() => setSelectedGalleryFolder(folder.name)}
                                  className="relative aspect-[16/10] overflow-hidden bg-muted/40 cursor-pointer"
                                >
                                  <img 
                                    src={coverImg} 
                                    alt={folder.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                                  
                                  {/* Photo Count Badge */}
                                  <div className="absolute top-3 left-3 z-10">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 text-gold border border-gold/30 backdrop-blur-md">
                                      <Folder className="w-3 h-3 text-gold" />
                                      <span>{folder.photos.length} {folder.photos.length === 1 ? "Photo" : "Photos"}</span>
                                    </span>
                                  </div>

                                  {folder.date && (
                                    <div className="absolute top-3 right-3 z-10">
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/80 text-foreground backdrop-blur-md">
                                        {folder.date}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Card Content */}
                                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                                  <div>
                                    <h3 
                                      onClick={() => setSelectedGalleryFolder(folder.name)}
                                      className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer"
                                    >
                                      {folder.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                                      {folder.description}
                                    </p>
                                  </div>

                                  {/* Card Action Footer */}
                                  <div className="flex items-center justify-between pt-3 border-t border-border">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => setSelectedGalleryFolder(folder.name)}
                                      className="text-xs font-bold text-primary hover:text-gold gap-1 p-0 h-auto"
                                    >
                                      <span>View {folder.photos.length} Photos</span>
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </Button>

                                    <div className="flex items-center gap-1.5">
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-8 text-xs rounded-full border-primary/30 text-primary hover:bg-primary/10 gap-1 px-3"
                                        onClick={() => {
                                          setEditItem(null);
                                          setGalleryForm({
                                            title: "",
                                            description: "",
                                            category: folder.name,
                                            image: ""
                                          });
                                          setActiveDialog("gallery");
                                        }}
                                      >
                                        <Plus className="h-3 w-3" /> Add
                                      </Button>
                                      <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10"
                                        title={`Delete folder "${folder.name}"`}
                                        onClick={() => handleDeleteFolder(folder.name, folder.id)}
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                        {allDisplayFolders.length === 0 && (
                          <div className="col-span-full text-center text-muted-foreground py-16 bg-muted/10 border rounded-3xl">
                            <Folder className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
                            <p className="font-semibold text-lg">No gallery folders found</p>
                            <p className="text-xs text-muted-foreground mt-1">Create a new folder or restore default celebration folders.</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              }

              // LEVEL 2: INSIDE FOLDER VIEW
              const currentFolder = allDisplayFolders.find(
                f => f.name.toLowerCase() === selectedGalleryFolder.toLowerCase() || f.id === toFolderId(selectedGalleryFolder)
              );
              const folderName = currentFolder?.name || selectedGalleryFolder;
              const folderPhotos = currentFolder?.photos || [];

              return (
                <div className="space-y-6">
                  {/* Top Breadcrumb Navigation */}
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-card border border-border p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedGalleryFolder(null)}
                        className="gap-1.5 text-primary hover:text-gold font-bold p-0 h-auto"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>All Folders</span>
                      </Button>
                      <span className="text-muted-foreground">/</span>
                      <div className="flex items-center gap-1.5 text-foreground font-bold">
                        <FolderOpen className="w-4 h-4 text-gold" />
                        <span>{folderName}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => {
                          setEditItem(null);
                          setGalleryForm({
                            title: "",
                            description: "",
                            category: folderName,
                            image: ""
                          });
                          setActiveDialog("gallery");
                        }} 
                        className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 text-xs gap-1.5 shadow-sm"
                      >
                        <Plus className="h-3.5 w-3.5" /> Upload Photo to This Folder
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteFolder(folderName, currentFolder?.id || toFolderId(folderName))}
                        className="rounded-full border-destructive/40 text-destructive hover:bg-destructive/10 text-xs gap-1.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete Folder
                      </Button>
                    </div>
                  </div>

                  {/* Folder Header Banner */}
                  <div className="rounded-3xl border border-gold/30 bg-gradient-to-r from-[#0a2b18] to-[#164e2e] text-white p-6 sm:p-8 shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gold text-xs uppercase tracking-wider font-bold">
                          <FolderOpen className="w-3.5 h-3.5 text-gold" />
                          <span>{folderPhotos.length} {folderPhotos.length === 1 ? "Photo" : "Photos"}</span>
                          {currentFolder?.date && <span>• {currentFolder.date}</span>}
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">{folderName}</h2>
                        {currentFolder?.description && (
                          <p className="text-white/80 text-xs sm:text-sm max-w-2xl">{currentFolder.description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Inside Folder: Photos Grid */}
                  <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                    <CardHeader className="px-0 pt-0 pb-4">
                      <CardTitle className="font-display text-lg text-primary font-bold">
                        Photographs in {folderName} ({folderPhotos.length})
                      </CardTitle>
                      <CardDescription>
                        Hover over any image to view details or delete it from this celebration folder.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {folderPhotos.map((photo, pIdx) => (
                          <div 
                            key={photo.id || pIdx} 
                            className="relative group rounded-xl overflow-hidden border border-border aspect-square bg-card shadow-sm hover:border-gold transition duration-200"
                          >
                            <img src={resolveGalleryImageSrc(photo.src)} alt={photo.title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-150 flex flex-col justify-between p-3 text-white">
                              <div className="text-[10px] font-bold text-gold uppercase truncate">{photo.folderName || folderName}</div>
                              <div className="text-xs font-semibold line-clamp-2">{photo.title || "Untitled Photo"}</div>
                              <Button 
                                size="icon" 
                                variant="destructive" 
                                className="h-8 w-8 mt-2 mx-auto rounded-full" 
                                onClick={() => handleDeleteGalleryImage(photo.id, photo.title)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}

                        {folderPhotos.length === 0 && (
                          <div className="col-span-full text-center text-muted-foreground py-16 bg-muted/10 border rounded-2xl">
                            <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground/30 mb-2" />
                            <p className="font-semibold text-sm">No photos in this folder yet.</p>
                            <Button 
                              onClick={() => {
                                setEditItem(null);
                                setGalleryForm({
                                  title: "",
                                  description: "",
                                  category: folderName,
                                  image: ""
                                });
                                setActiveDialog("gallery");
                              }} 
                              className="mt-3 rounded-full bg-primary text-primary-foreground text-xs font-bold"
                            >
                              + Upload First Photo
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })()}
          </TabsContent>

          {/* TAB 7: USER SUBMISSIONS VIEWER */}
          <TabsContent value="submissions" className="animate-fade-in">
            <Tabs defaultValue="admissions" className="space-y-6">
              <TabsList className="bg-muted border p-1 rounded-xl flex gap-1 h-auto w-fit">
                <TabsTrigger value="admissions" className="rounded-lg px-4 py-2 text-xs font-bold gap-1.5"><FileText className="h-4 w-4" /> Admissions Inquiries (/admissions)</TabsTrigger>
                <TabsTrigger value="contacts" className="rounded-lg px-4 py-2 text-xs font-bold gap-1.5"><MessageSquare className="h-4 w-4" /> Contact Forms (/contact)</TabsTrigger>
                <TabsTrigger value="jobs" className="rounded-lg px-4 py-2 text-xs font-bold gap-1.5"><Briefcase className="h-4 w-4" /> Job Applications (/careers)</TabsTrigger>
              </TabsList>

              {/* Admission Queries */}
              <TabsContent value="admissions" className="animate-fade-in">
                <Card className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display text-lg font-bold text-primary">Admissions Inquiries Inbox (/admissions)</h3>
                    <div className="flex gap-2">
                      <Button onClick={startAddAdmission} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs py-1 h-8">
                        <Plus className="h-3.5 w-3.5" /> Create Inquiry
                      </Button>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Parent Name</TableHead>
                        <TableHead>Contact (Phone/Email)</TableHead>
                        <TableHead>Class Applied</TableHead>
                        <TableHead>Remarks / Message</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {admissions.map((adm) => (
                        <TableRow key={adm.id}>
                          <TableCell className="font-semibold">{adm.student_name}</TableCell>
                          <TableCell>{adm.parent_name}</TableCell>
                          <TableCell className="text-xs">
                            <div>{adm.phone}</div>
                            <div className="text-muted-foreground">{adm.email}</div>
                          </TableCell>
                          <TableCell className="font-semibold text-primary">{adm.class_applied}</TableCell>
                          <TableCell className="max-w-xs text-xs">{adm.message}</TableCell>
                          <TableCell>
                            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              adm.status === "Admitted" ? "bg-green-100 text-green-700" :
                              adm.status === "Contacted" ? "bg-blue-100 text-blue-700" :
                              adm.status === "Closed" ? "bg-gray-100 text-gray-700" : "bg-orange-100 text-orange-700"
                            }`}>{adm.status}</span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">{new Date(adm.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right space-x-1.5">
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gold/10 hover:text-gold" onClick={() => startEditAdmission(adm)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete("admission-queries", adm.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {admissions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center text-muted-foreground py-10">No inquiries in inbox.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              {/* Contact Messages */}
              <TabsContent value="contacts" className="animate-fade-in">
                <Card className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-display text-lg font-bold text-primary">Contact Messages Inbox (/contact)</h3>
                      <p className="text-xs text-muted-foreground">General inquiries and messages submitted via the Contact Us page.</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={startAddContact} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs py-1 h-8">
                        <Plus className="h-3.5 w-3.5" /> Create Message
                      </Button>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sender Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Message Body</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="font-semibold">{c.name}</TableCell>
                          <TableCell className="text-xs">
                            <div>{c.phone}</div>
                            <div className="text-muted-foreground">{c.email}</div>
                          </TableCell>
                          <TableCell className="font-semibold">{c.subject}</TableCell>
                          <TableCell className="max-w-xs text-xs leading-relaxed">{c.message}</TableCell>
                          <TableCell>
                            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              c.status === "Replied" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                            }`}>{c.status}</span>
                          </TableCell>
                          <TableCell className="text-right space-x-1.5">
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gold/10 hover:text-gold" onClick={() => startEditContact(c)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete("contact-messages", c.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {contacts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-10">No contact messages received.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              {/* Job Applications */}
              <TabsContent value="jobs" className="animate-fade-in">
                <Card className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-display text-lg font-bold text-primary">Job Applications Inbox (/careers)</h3>
                      <p className="text-xs text-muted-foreground">Teaching and administrative staff applications received.</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={startAddJob} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs py-1 h-8">
                        <Plus className="h-3.5 w-3.5" /> Create Application
                      </Button>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Position ID / Details</TableHead>
                        <TableHead>Cover Letter</TableHead>
                        <TableHead>Resume Attachment</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobApplications.map((app) => {
                        const vac = vacancies.find(v => v.id === app.vacancy);
                        const vacTitle = vac ? `${vac.title} (${vac.department})` : `Vacancy ${app.vacancy}`;
                        return (
                          <TableRow key={app.id}>
                            <TableCell className="font-semibold">{app.name}</TableCell>
                            <TableCell className="text-xs">
                              <div>{app.phone}</div>
                              <div className="text-muted-foreground">{app.email}</div>
                            </TableCell>
                            <TableCell className="font-semibold text-primary">{vacTitle}</TableCell>
                            <TableCell className="max-w-xs text-xs leading-relaxed">{app.cover_letter}</TableCell>
                            <TableCell>
                              {app.resume ? (
                                <a href={app.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs text-gold font-bold hover:underline gap-1">
                                  <Plus className="h-3.5 w-3.5 rotate-45" /> Open PDF Resume
                                </a>
                              ) : <span className="text-xs text-muted-foreground">No File</span>}
                            </TableCell>
                            <TableCell className="text-right space-x-1.5">
                              <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gold/10 hover:text-gold" onClick={() => startEditJob(app)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete("job-applications", app.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {jobApplications.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-10">No job applicants found.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

      <TabsContent value="live-editor" className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Selector: Spotlight Card with Menu */}
          <div className="lg:col-span-3 space-y-6">
            <SpotlightCard 
              className="bg-navy-deep border border-gold/30 rounded-3xl p-6 shadow-elegant text-white text-left"
              spotlightColor="rgba(212, 175, 55, 0.15)"
            >
              <h3 className="font-display text-lg font-bold text-gold mb-1">Live CMS Switcher</h3>
              <p className="text-[10px] text-white/60 uppercase tracking-widest font-semibold mb-6">Select page to preview & edit</p>
              
              <div className="h-[540px] rounded-2xl overflow-y-auto border border-white/10 bg-black/40 p-4 space-y-5 custom-scrollbar text-xs">
                {/* Live Pages Group */}
                <div className="space-y-2">
                  <p className="text-[9px] uppercase font-bold text-gold tracking-widest px-2 opacity-70">Live Pages</p>
                  <div className="space-y-1">
                    {[
                      { id: "home", text: "Home Page", icon: <Home className="h-4 w-4" /> },
                      { id: "about-school", text: "About School", icon: <BookOpen className="h-4 w-4" /> },
                      { id: "founder-message", text: "Chairman Message", icon: <UserCheck className="h-4 w-4" /> },
                      { id: "correspondent-message", text: "Correspondent Message", icon: <FileText className="h-4 w-4" /> },
                      { id: "principal-message", text: "Principal Message", icon: <Award className="h-4 w-4" /> }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEditorPage(item.id as any)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-medium transition-all duration-300 ${
                          editorPage === item.id 
                            ? "bg-gold/15 text-gold border-l-2 border-gold shadow-[inset_0_0_8px_rgba(212,175,55,0.05)]" 
                            : "text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1"
                        }`}
                      >
                        <span className={`${editorPage === item.id ? "text-gold" : "text-white/40"}`}>{item.icon}</span>
                        <span>{item.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Modules Group */}
                <div className="space-y-2">
                  <p className="text-[9px] uppercase font-bold text-gold tracking-widest px-2 opacity-70">Dynamic Sections</p>
                  <div className="space-y-1">
                    {[
                      { id: "events", text: "Calendar & Events", icon: <Calendar className="h-4 w-4" /> },
                      { id: "teachers", text: "Faculty List", icon: <Users className="h-4 w-4" /> },
                      { id: "gallery", text: "Gallery Grid", icon: <ImageIcon className="h-4 w-4" /> },
                      { id: "board-toppers", text: "Board Exam Toppers", icon: <Award className="h-4 w-4" /> },
                      { id: "students", text: "Best Students & Sports", icon: <Trophy className="h-4 w-4" /> },
                      { id: "uniform", text: "School Uniform", icon: <Shirt className="h-4 w-4" /> },
                      { id: "houses", text: "School Houses", icon: <Flag className="h-4 w-4" /> },
                      { id: "leaders", text: "Student Leaders", icon: <GraduationCap className="h-4 w-4" /> }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEditorPage(item.id as any)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-medium transition-all duration-300 ${
                          editorPage === item.id 
                            ? "bg-gold/15 text-gold border-l-2 border-gold shadow-[inset_0_0_8px_rgba(212,175,55,0.05)]" 
                            : "text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1"
                        }`}
                      >
                        <span className={`${editorPage === item.id ? "text-gold" : "text-white/40"}`}>{item.icon}</span>
                        <span>{item.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/85 leading-relaxed">
                 <strong className="text-gold">Tip:</strong> Hover over the menu items to see a visual peek! Click to toggle the editor page view on the right.
              </div>
            </SpotlightCard>

            {/* Premium 3D Trophy Showcase */}
            <SpotlightCard className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
              <h3 className="font-display text-sm font-bold text-primary mb-2">School Trophy Showcase</h3>
              <div className="h-[180px] w-full flex items-center justify-center overflow-hidden rounded-xl bg-muted/30 border border-border">
                <ModelViewer 
                  url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
                  width="100%"
                  height="100%"
                  autoRotate={true}
                  autoRotateSpeed={0.5}
                  showScreenshotButton={false}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Interactive 3D model viewer integrated with WebGL</p>
            </SpotlightCard>
          </div>

          {/* Right Preview Panel */}
          <div className="lg:col-span-9 space-y-6">
            <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm overflow-hidden min-h-[580px] relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-gold" />
              
              <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
                <div>
                  <h2 className="font-display text-xl text-primary font-bold flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Page Preview: <span className="text-gold capitalize">{editorPage} Page</span>
                  </h2>
                  <p className="text-xs text-muted-foreground">This matches the live design alignment. Alterations apply immediately.</p>
                </div>
              </div>

              {editorPage === "home" && (
                <div className="space-y-12">
                  {/* Notice Board Preview */}
                  <div className="border border-border/80 rounded-3xl p-4 bg-muted/20 relative group text-left">
                    <div className="absolute -top-3 left-6 px-3 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase font-bold rounded-full">
                      Component: Announcement Bar
                    </div>
                    
                    <div className="flex flex-col gap-4 mt-2">
                      <div className="backdrop-blur-md bg-navy-deep/90 border border-gold/20 rounded-full shadow-md flex items-center py-2.5 px-4 group overflow-hidden gap-4">
                        <div className="inline-flex shrink-0 items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A017] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm select-none">
                          <Megaphone className="h-3 w-3 text-white animate-pulse" />
                          <span>Notice Board</span>
                        </div>
                        <div className="flex-1 overflow-hidden relative h-5 flex items-center">
                          <div className="absolute whitespace-nowrap animate-marquee flex gap-12 text-xs text-white font-medium">
                            {announcements.map((a, i) => (
                              <span key={a.id || i} className="inline-flex items-center gap-2">
                                <span className="text-gold font-semibold uppercase tracking-wider">{a.title}:</span>
                                <span>{a.message}</span>
                                {i < announcements.length - 1 && <span className="text-white/40 mx-4">|</span>}
                              </span>
                            ))}
                            {announcements.length === 0 && <span className="text-white/60">No active bulletins posted. Click 'Add' below to broadcast.</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 text-xs">
                        <Button size="sm" onClick={() => { setEditItem(null); setAnnouncementForm({ title: "", message: "", priority: "Medium", status: "Active" }); setActiveDialog("announce"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1">
                          <Plus className="h-3.5 w-3.5" /> Add Notice
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Hero Section Preview */}
                  <div className="border border-border/80 rounded-3xl p-6 bg-navy-deep text-white relative group overflow-hidden min-h-[320px] flex items-center text-left">
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/75 to-transparent z-10" />
                    <div className="absolute -top-3 left-6 px-3 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase font-bold rounded-full z-20">
                      Component: Homepage Hero
                    </div>

                    <div className="relative z-20 space-y-4 max-w-lg text-left">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4A017] to-[#F3C23C] text-white text-[10px] font-semibold uppercase tracking-wider shadow-md">
                        <Sparkles className="h-3 w-3 text-white animate-pulse" />
                        <span>Admissions Open 2026-2027</span>
                      </div>
                      
                      <div className="space-y-1">
                        <h1 className="font-display text-4xl font-extrabold text-white leading-tight">
                          Brotherhood School
                        </h1>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4A017] font-bold opacity-95">
                          Matriculation Higher Secondary School
                        </p>
                      </div>

                      <p className="text-xs text-white/80 leading-relaxed">
                        Shaping future leaders through academic excellence, character formation, and values since 1991.
                      </p>

                      <div className="flex gap-3 pt-2">
                        <Button size="sm" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-5">Apply Online</Button>
                        <Button size="sm" variant="outline" className="rounded-full border-white/20 bg-white/10 text-white font-medium">Contact Us</Button>
                      </div>
                    </div>
                  </div>

                  {/* Events Timelines Component Preview */}
                  <div className="border border-border/80 rounded-3xl p-6 bg-muted/10 relative group space-y-6 text-left">
                    <div className="absolute -top-3 left-6 px-3 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase font-bold rounded-full">
                      Component: Events Calendar
                    </div>

                    <div className="flex justify-between items-center border-b border-border pb-3">
                      <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                        <Calendar className="h-4.5 w-4.5 text-gold animate-bounce" /> Scheduled Events & Highlights
                      </h3>
                      <Button size="sm" onClick={() => { setEditItem(null); setEventForm({ title: "", description: "", cover_image: "", event_date: "", category: "Academic", status: "Published" }); setActiveDialog("event"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1">
                        <Plus className="h-3.5 w-3.5" /> Add Event
                      </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Upcoming list */}
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-wider text-gold font-bold flex items-center gap-1.5 border-b border-border/60 pb-1.5">
                          Upcoming Events
                        </h4>
                        <div className="space-y-4">
                          {events.filter(ev => new Date(ev.event_date) > new Date()).slice(0, 3).map((ev) => (
                            <div key={ev.id} className="relative pl-4 border-l border-gold/40 group/item hover:bg-gold/5 p-2.5 rounded-xl transition duration-155">
                              <div className="text-[10px] text-gold font-semibold">{ev.event_date}</div>
                              <div className="font-semibold text-sm text-primary mt-0.5">{ev.title}</div>
                              <div className="text-[11px] text-muted-foreground mt-1 truncate">{ev.description}</div>
                              <div className="flex gap-2 justify-end mt-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" className="h-6 w-6 text-primary hover:bg-gold/20" onClick={() => startEditEvent(ev)}>
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-6 w-6 text-red-600 hover:bg-red-50" onClick={() => handleDelete("events", ev.id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          {events.filter(ev => new Date(ev.event_date) > new Date()).length === 0 && (
                            <p className="text-xs text-muted-foreground italic">No scheduled upcoming events.</p>
                          )}
                        </div>
                      </div>

                      {/* Latest / Annual list */}
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-wider text-primary font-bold flex items-center gap-1.5 border-b border-border/60 pb-1.5">
                          Latest Events & Results
                        </h4>
                        <div className="space-y-4">
                          {events.filter(ev => new Date(ev.event_date) <= new Date()).slice(0, 3).map((ev) => (
                            <div key={ev.id} className="relative pl-4 border-l border-primary/40 group/item hover:bg-primary/5 p-2.5 rounded-xl transition duration-155">
                              <div className="text-[10px] text-gold font-semibold">{ev.event_date}</div>
                              <div className="font-semibold text-sm text-primary mt-0.5">{ev.title}</div>
                              <div className="text-[11px] text-muted-foreground mt-1 truncate">{ev.description}</div>
                              <div className="flex gap-2 justify-end mt-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" className="h-6 w-6 text-primary hover:bg-gold/20" onClick={() => startEditEvent(ev)}>
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-6 w-6 text-red-600 hover:bg-red-50" onClick={() => handleDelete("events", ev.id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          {events.filter(ev => new Date(ev.event_date) <= new Date()).length === 0 && (
                            <p className="text-xs text-muted-foreground italic">No previous events logs.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {editorPage === "events" && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gold" /> Calendar & Events Manager
                      </h3>
                      <p className="text-xs text-muted-foreground">Manage academic milestones, holidays, celebrations, and examination schedules (/events).</p>
                    </div>
                    <Button onClick={() => { setEditItem(null); setEventForm({ title: "", description: "", cover_image: "", event_date: "", event_time: "08:45 AM - 03:30 PM", venue: "School Campus", category: "Celebration", status: "Published" }); setActiveDialog("event"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs">
                      <Plus className="h-4 w-4" /> Add Campus Event
                    </Button>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
                      {["All", "Celebration", "Exam", "Holiday", "Activity", "Competition", "Meeting"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setEventCategoryFilter(cat)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                            eventCategoryFilter === cat ? "bg-primary text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {cat} {cat === "All" ? `(${events.length})` : `(${events.filter(e => (e.category || "").toLowerCase() === cat.toLowerCase()).length})`}
                        </button>
                      ))}
                    </div>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Search events..."
                        value={eventSearch}
                        onChange={(e) => setEventSearch(e.target.value)}
                        className="pl-8 text-xs h-8 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                    {events
                      .filter(ev => {
                        const matchCat = eventCategoryFilter === "All" || (ev.category || "").toLowerCase() === eventCategoryFilter.toLowerCase();
                        const matchSearch = !eventSearch || (ev.title || "").toLowerCase().includes(eventSearch.toLowerCase()) || (ev.description || "").toLowerCase().includes(eventSearch.toLowerCase());
                        return matchCat && matchSearch;
                      })
                      .map((ev) => (
                        <div key={ev.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm relative group/item hover:border-gold/60 transition duration-300 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-bold text-gold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20">
                                {ev.category || "Event"}
                              </span>
                              <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-gold" /> {ev.event_date}
                              </span>
                            </div>
                            <h4 className="font-display font-bold text-base text-primary leading-tight mt-1">{ev.title}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{ev.description}</p>
                            <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground/80 pt-1">
                              {ev.event_time && <span>🕒 {ev.event_time}</span>}
                              {ev.venue && <span>📍 {ev.venue}</span>}
                            </div>
                          </div>
                          <div className="flex gap-2 justify-end pt-4 border-t border-border/50 mt-4 opacity-80 group-hover/item:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-primary hover:bg-gold/20 gap-1 rounded-full px-2.5" onClick={() => startEditEvent(ev)}>
                              <Edit className="h-3 w-3" /> Edit
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-red-600 hover:bg-red-50 gap-1 rounded-full px-2.5" onClick={() => handleDelete("events", ev.id)}>
                              <Trash2 className="h-3 w-3" /> Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    {events.length === 0 && (
                      <div className="col-span-full text-center text-muted-foreground py-16">
                        No events logged. Click 'Add Campus Event' to schedule!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {editorPage === "teachers" && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                        <Users className="h-5 w-5 text-gold" /> Faculty & Staff Directory
                      </h3>
                      <p className="text-xs text-muted-foreground">Manage faculty profiles, qualifications, subject streams, and bios (/teachers).</p>
                    </div>
                    <Button onClick={() => { setEditItem(null); setTeacherForm({ name: "", designation: "", subject: "English", qualification: "", experience: "", description: "", image: "" }); setActiveDialog("teacher"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs">
                      <Plus className="h-4 w-4" /> Add Educator Profile
                    </Button>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
                      {["All", "Mathematics", "Science", "Languages", "Arts & Sports", "Administration", "Kindergarten"].map((dept) => (
                        <button
                          key={dept}
                          onClick={() => setTeacherDeptFilter(dept)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                            teacherDeptFilter === dept ? "bg-primary text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Search educator..."
                        value={teacherSearch}
                        onChange={(e) => setTeacherSearch(e.target.value)}
                        className="pl-8 text-xs h-8 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                    {teachers
                      .filter(teach => {
                        let matchDept = true;
                        if (teacherDeptFilter === "Science") {
                          matchDept = ["Physics", "Chemistry", "Biology", "Science", "Computer Science"].some(s => (teach.subject || "").toLowerCase().includes(s.toLowerCase()));
                        } else if (teacherDeptFilter === "Languages") {
                          matchDept = ["English", "Tamil", "Hindi", "French"].some(s => (teach.subject || "").toLowerCase().includes(s.toLowerCase()));
                        } else if (teacherDeptFilter === "Arts & Sports") {
                          matchDept = ["Physical Education", "Art", "Sports", "Library"].some(s => (teach.subject || "").toLowerCase().includes(s.toLowerCase()));
                        } else if (teacherDeptFilter !== "All") {
                          matchDept = (teach.subject || "").toLowerCase().includes(teacherDeptFilter.toLowerCase());
                        }
                        const matchSearch = !teacherSearch || (teach.name || "").toLowerCase().includes(teacherSearch.toLowerCase()) || (teach.subject || "").toLowerCase().includes(teacherSearch.toLowerCase()) || (teach.designation || "").toLowerCase().includes(teacherSearch.toLowerCase());
                        return matchDept && matchSearch;
                      })
                      .map((teach) => (
                        <div key={teach.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm relative group/item hover:border-gold/60 transition duration-300 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              {teach.image ? (
                                <div className="h-14 w-14 rounded-2xl shrink-0 bg-cover bg-center border border-border shadow-sm" style={{ backgroundImage: `url(${resolveGalleryImageSrc(teach.image)})` }} />
                              ) : (
                                <div className="h-14 w-14 rounded-2xl shrink-0 bg-gold/15 border border-gold/30 flex items-center justify-center text-primary font-bold text-lg">
                                  {teach.name.charAt(0)}
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <span className="text-[9px] uppercase tracking-wider font-bold text-gold px-2 py-0.5 rounded-full bg-gold/10 inline-block mb-1">
                                  {teach.subject || "General"}
                                </span>
                                <h4 className="font-display font-bold text-base text-primary truncate leading-tight">{teach.name}</h4>
                                <p className="text-xs font-medium text-muted-foreground truncate">{teach.designation}</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 text-[10px]">
                              {teach.qualification && <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">🎓 {teach.qualification}</span>}
                              {teach.experience && <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">⏳ {teach.experience}</span>}
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{teach.description}</p>
                          </div>

                          <div className="flex gap-2 justify-end pt-4 border-t border-border/50 mt-4 opacity-80 group-hover/item:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-primary hover:bg-gold/20 gap-1 rounded-full px-2.5" onClick={() => startEditTeacher(teach)}>
                              <Edit className="h-3 w-3" /> Edit
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-red-600 hover:bg-red-50 gap-1 rounded-full px-2.5" onClick={() => handleDelete("teachers", teach.id)}>
                              <Trash2 className="h-3 w-3" /> Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    {teachers.length === 0 && (
                      <div className="col-span-full text-center text-muted-foreground py-16">
                        No faculty profiles registered yet. Click 'Add Educator Profile' to populate!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {editorPage === "gallery" && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-primary">Media Photo Gallery</h3>
                      <p className="text-xs text-muted-foreground">Grid layout displays images with equal margins and clean alignment.</p>
                    </div>
                    <Button onClick={() => { setEditItem(null); setGalleryForm({ title: "", description: "", category: "Events", image: "" }); setActiveDialog("gallery"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                      <Plus className="h-4.5 w-4.5" /> Upload to Gallery
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                    {galleryImages.map((img) => (
                      <div key={img.id} className="relative rounded-2xl overflow-hidden border border-border group/photo bg-card shadow-sm hover:shadow-elegant transition duration-300">
                        <div className="aspect-[4/3] w-full bg-cover bg-center" style={{ backgroundImage: `url(${img.image})` }} />
                        <div className="p-4 bg-card">
                          <span className="text-[9px] uppercase font-bold text-gold tracking-wide">{img.category}</span>
                          <h4 className="font-display font-bold text-sm text-primary truncate mt-0.5">{img.title}</h4>
                          <p className="text-[11px] text-muted-foreground mt-1 truncate">{img.description}</p>
                        </div>
                        
                        {/* Hover controls overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <Button size="sm" variant="secondary" className="rounded-full font-bold text-xs gap-1" onClick={() => startEditGallery(img)}>
                            <Edit className="h-3.5 w-3.5" /> Edit
                          </Button>
                          <Button size="sm" variant="destructive" className="rounded-full font-bold text-xs gap-1" onClick={() => handleDelete("gallery-images", img.id)}>
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                    {galleryImages.length === 0 && (
                      <div className="col-span-full text-center text-muted-foreground py-16">
                        No gallery images uploaded. Start adding some now!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {editorPage === "board-toppers" && (() => {
                const toppersList = getMergedAchievements([]).boardToppers;
                const filteredToppers = toppersList.filter(top => {
                  const s = boardTopperSearch.toLowerCase();
                  const matchSearch = !s || 
                    (top.name || "").toLowerCase().includes(s) || 
                    (top.title || "").toLowerCase().includes(s) || 
                    (top.grade || "").toLowerCase().includes(s) || 
                    (top.stream || "").toLowerCase().includes(s) || 
                    (top.score || "").toLowerCase().includes(s) || 
                    (top.reason || "").toLowerCase().includes(s);

                  let matchGrade = true;
                  if (boardTopperGradeFilter === "Class XII") {
                    matchGrade = (top.grade || "").toLowerCase().includes("xii");
                  } else if (boardTopperGradeFilter === "Class X") {
                    matchGrade = (top.grade || "").toLowerCase().includes("class x") && !(top.grade || "").toLowerCase().includes("xii");
                  } else if (boardTopperGradeFilter === "Primary Wing") {
                    matchGrade = ["primary", "class i", "class ii", "class iii", "class iv", "class v"].some(w => (top.grade || top.stream || "").toLowerCase().includes(w));
                  }
                  return matchSearch && matchGrade;
                });

                return (
                  <div className="space-y-6 text-left animate-fade-in">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 gap-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                          <Award className="h-5 w-5 text-gold" /> State Board Examination Toppers &amp; Centums
                        </h3>
                        <p className="text-xs text-muted-foreground">Manage board examination toppers, state rank holders, total marks, and subject centums (/students/achievements).</p>
                      </div>
                      <Button
                        onClick={() => {
                          setEditItem(null);
                          setBoardTopperForm({
                            name: "",
                            grade: "Class XII - A",
                            title: "School Topper",
                            score: "598 / 600",
                            stream: "Science (Bio-Maths)",
                            reason: "Centum in Mathematics, Physics and Chemistry.",
                            year: "2025-2026",
                            image: ""
                          });
                          setActiveDialog("board_topper");
                        }}
                        className="rounded-full bg-gradient-gold text-navy-deep font-bold hover:opacity-95 gap-1.5 text-xs shadow-gold"
                      >
                        <Plus className="h-4 w-4" /> Add Board Topper
                      </Button>
                    </div>

                    {/* Filter Tabs & Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
                        {["All", "Class XII", "Class X", "Primary Wing"].map(tab => (
                          <button
                            key={tab}
                            onClick={() => setBoardTopperGradeFilter(tab)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                              boardTopperGradeFilter === tab ? "bg-primary text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                          placeholder="Search rank, student, stream..."
                          value={boardTopperSearch}
                          onChange={(e) => setBoardTopperSearch(e.target.value)}
                          className="pl-8 text-xs h-8 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                      {filteredToppers.map((topper) => (
                        <div key={topper.id} className="relative rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col justify-between group/item hover:border-gold/60 transition duration-300">
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              {topper.image ? (
                                <div className="h-14 w-14 rounded-2xl shrink-0 bg-cover bg-center border border-border shadow-sm" style={{ backgroundImage: `url(${resolveGalleryImageSrc(topper.image)})` }} />
                              ) : (
                                <div className="h-14 w-14 rounded-2xl shrink-0 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 font-bold">
                                  <Award className="h-7 w-7 text-gold" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <span className="text-[9px] uppercase tracking-wider font-bold text-gold px-2.5 py-0.5 rounded-full bg-gold/10 inline-block mb-1">
                                  {topper.title || "Board Honor"}
                                </span>
                                <h4 className="font-display font-bold text-base text-primary truncate leading-tight">{topper.name}</h4>
                                <p className="text-xs font-semibold text-muted-foreground">{topper.grade || topper.stream}</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-1">
                              {topper.score && (
                                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 flex items-center gap-1">
                                  🎯 {topper.score}
                                </span>
                              )}
                              {topper.stream && (
                                <span className="px-2.5 py-1 rounded-lg bg-muted text-muted-foreground font-medium text-xs">
                                  📚 {topper.stream}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                              {topper.reason}
                            </p>
                          </div>

                          <div className="flex gap-2 justify-end pt-4 border-t border-border/50 mt-4 opacity-80 group-hover/item:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-primary hover:bg-gold/20 gap-1 rounded-full px-2.5" onClick={() => startEditBoardTopper(topper)}>
                              <Edit className="h-3 w-3" /> Edit
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-red-600 hover:bg-red-50 gap-1 rounded-full px-2.5" onClick={() => handleDelete("student-achievements", topper.id)}>
                              <Trash2 className="h-3 w-3" /> Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                      {filteredToppers.length === 0 && (
                        <div className="col-span-full text-center text-muted-foreground py-16">
                          No board toppers found matching the filter. Click 'Add Board Topper' above!
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {editorPage === "students" && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-gold" /> Best Students &amp; Sports Trophies
                      </h3>
                      <p className="text-xs text-muted-foreground">Manage monthly best students (/students/best-student) and sports championships &amp; athletic shields (/students/achievements).</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={() => { setEditItem(null); setStudentForm({ title: "Best Student of the Month", name: "", grade: "", reason: "", image: "" }); setAchievementCategory("best_student"); setActiveDialog("student"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs">
                        <Plus className="h-3.5 w-3.5" /> Best Student
                      </Button>
                      <Button onClick={() => { setEditItem(null); setStudentForm({ title: "Trophy Championship", name: "", grade: "", reason: "", image: "" }); setAchievementCategory("sports"); setActiveDialog("student"); }} className="rounded-full bg-emerald-700 text-white font-bold hover:opacity-95 gap-1.5 text-xs">
                        <Plus className="h-3.5 w-3.5" /> Sports Trophy
                      </Button>
                    </div>
                  </div>

                  {/* Category Tabs & Search */}
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
                      {[
                        { id: "all", label: `All Entries (${bestStudents.filter(s => s.type !== "board_topper" && !s.title?.toLowerCase().includes("rank") && !s.title?.toLowerCase().includes("topper")).length})` },
                        { id: "best_student", label: `Best Students (${bestStudents.filter(s => (s.title || "").toLowerCase().includes("best student") || s.category === "best_student" || s.type === "best_student").length})` },
                        { id: "sports", label: `Sports & Trophies (${bestStudents.filter(s => s.category === "sports" || s.type === "sports" || (!s.title?.toLowerCase().includes("best student") && !s.title?.toLowerCase().includes("rank") && !s.title?.toLowerCase().includes("topper"))).length})` }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setStudentCategoryTab(tab.id as any)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                            studentCategoryTab === tab.id ? "bg-primary text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Search student or trophy..."
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                        className="pl-8 text-xs h-8 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {bestStudents
                      .filter(stud => {
                        const rawTitle = (stud.title || "").toLowerCase();
                        const rawDesc = (stud.description || stud.reason || "").toLowerCase();
                        const rawName = (stud.name || "").toLowerCase();

                        // Exclude board toppers from this page
                        if (stud.type === "board_topper" || (rawTitle.includes("rank") && !rawTitle.includes("trophy")) || (rawTitle.includes("topper") && !rawTitle.includes("best"))) {
                          return false;
                        }

                        let matchTab = true;
                        if (studentCategoryTab === "best_student") {
                          matchTab = rawTitle.includes("best student") || stud.category === "best_student" || stud.type === "best_student";
                        } else if (studentCategoryTab === "sports") {
                          matchTab = stud.category === "sports" || stud.type === "sports" || (!rawTitle.includes("best student") && !rawTitle.includes("rank") && !rawTitle.includes("topper"));
                        }
                        const matchSearch = !studentSearch || rawTitle.includes(studentSearch.toLowerCase()) || rawName.includes(studentSearch.toLowerCase()) || rawDesc.includes(studentSearch.toLowerCase());
                        return matchTab && matchSearch;
                      })
                      .map((stud) => {
                        const parts = (stud.title || "").split(" - ");
                        const awardTitle = parts[0] || stud.title || "Student Honor";
                        const nameWithGrade = parts[1] || "";
                        const nameParts = nameWithGrade.split(" (");
                        const name = stud.name || nameParts[0] || stud.title;
                        const grade = stud.grade || (nameParts[1] ? nameParts[1].replace(")", "") : "");
                        
                        return (
                          <div key={stud.id} className="relative rounded-2xl border border-border bg-card p-5 shadow-sm flex gap-4 group/item hover:border-gold/60 transition duration-300">
                            {stud.image ? (
                              <div className="h-16 w-16 rounded-full shrink-0 bg-cover bg-center border border-border shadow-sm" style={{ backgroundImage: `url(${resolveGalleryImageSrc(stud.image)})` }} />
                            ) : (
                              <div className="h-16 w-16 rounded-full shrink-0 border border-gold/25 bg-gold/10 flex items-center justify-center text-gold">
                                <Trophy className="h-7 w-7" />
                              </div>
                            )}
                            <div className="flex-1 space-y-1 min-w-0">
                              <span className="text-[9px] uppercase tracking-wider font-bold text-gold px-2 py-0.5 rounded-full bg-gold/10 inline-block">{awardTitle}</span>
                              <h4 className="font-display font-bold text-base text-primary leading-tight truncate">{name}</h4>
                              {grade && <p className="text-xs font-semibold text-muted-foreground">Class: {grade}</p>}
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{stud.description || stud.reason}</p>
                              
                              <div className="flex gap-2 justify-end pt-2 opacity-80 group-hover/item:opacity-100 transition-opacity">
                                <Button size="sm" variant="ghost" className="h-7 text-xs text-primary hover:bg-gold/20 gap-1 rounded-full px-2" onClick={() => startEditStudent(stud)}>
                                  <Edit className="h-3 w-3" /> Edit
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 text-xs text-red-600 hover:bg-red-50 gap-1 rounded-full px-2" onClick={() => handleDelete("student-achievements", stud.id)}>
                                  <Trash2 className="h-3 w-3" /> Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {bestStudents.length === 0 && (
                      <div className="col-span-full text-center text-muted-foreground py-16">
                        No student honors logs currently recorded. Nominate outstanding students above!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {editorPage === "uniform" && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                        <Shirt className="h-5 w-5 text-gold" /> School Uniform Standards
                      </h3>
                      <p className="text-xs text-muted-foreground">Manage uniform guidelines, boys/girls dress codes, and sports uniforms (/students/school-uniform).</p>
                    </div>
                    <Button onClick={() => { setEditItem(null); setUniformForm({ section: "", boys_uniform: "", girls_uniform: "" }); setActiveDialog("uniform"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs">
                      <Plus className="h-4 w-4" /> Add Uniform Rule
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {uniforms.map((uni) => (
                      <div key={uni.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm relative group/item hover:border-gold/60 transition duration-300 flex flex-col justify-between">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-3">
                            <Shirt className="h-3.5 w-3.5 text-gold" /> {uni.section}
                          </div>
                          <div className="space-y-3 text-xs text-muted-foreground">
                            <div className="p-3 rounded-xl bg-muted/40 border border-border/50">
                              <p className="font-bold text-foreground text-xs mb-1 flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-blue-500" /> Boys Uniform:
                              </p>
                              <p className="leading-relaxed">{uni.boys_uniform}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-muted/40 border border-border/50">
                              <p className="font-bold text-foreground text-xs mb-1 flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-pink-500" /> Girls Uniform:
                              </p>
                              <p className="leading-relaxed">{uni.girls_uniform}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end pt-4 border-t border-border/50 mt-4 opacity-80 group-hover/item:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" className="h-7 text-xs text-primary hover:bg-gold/20 gap-1 rounded-full px-2.5" onClick={() => startEditUniform(uni)}>
                            <Edit className="h-3 w-3" /> Edit
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 text-xs text-red-600 hover:bg-red-50 gap-1 rounded-full px-2.5" onClick={() => handleDelete("school-uniforms", uni.id)}>
                            <Trash2 className="h-3 w-3" /> Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                    {uniforms.length === 0 && (
                      <div className="col-span-full text-center text-muted-foreground py-16">
                        No school uniform guidelines uploaded yet. Click 'Add Uniform Rule' to begin!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {editorPage === "houses" && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                        <Flag className="h-5 w-5 text-gold" /> School House System
                      </h3>
                      <p className="text-xs text-muted-foreground">Manage house mottos, color codes, scoreboard points, and assigned student captains (/students/houses).</p>
                    </div>
                    <Button onClick={() => { setEditItem(null); setHouseForm({ name: "", motto: "", color_code: "bg-red-500", description: "", points: 0 }); setActiveDialog("house"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs">
                      <Plus className="h-4 w-4" /> Add House
                    </Button>
                  </div>

                  {/* Wing filter tabs */}
                  <div className="flex gap-2">
                    {[
                      { id: "all", label: `All Houses (${houses.length})` },
                      { id: "primary", label: `Primary Houses: Galilee, Zion, Judah, Bethel (${houses.filter(h => ["galilee", "zion", "judah", "bethel"].some(w => (h.name || "").toLowerCase().includes(w))).length})` },
                      { id: "secondary", label: `Secondary Houses: St. Matthew, Mark, Luke, John (${houses.filter(h => ["st. matthew", "st. mark", "st. luke", "st. john", "matthew", "mark", "luke", "john"].some(w => (h.name || "").toLowerCase().includes(w))).length})` },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setHouseWingFilter(tab.id as any)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                          houseWingFilter === tab.id ? "bg-primary text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                    {houses
                      .filter(house => {
                        const n = (house.name || "").toLowerCase();
                        if (houseWingFilter === "primary") return ["galilee", "zion", "judah", "bethel"].some(w => n.includes(w));
                        if (houseWingFilter === "secondary") return ["st. matthew", "st. mark", "st. luke", "st. john", "matthew", "mark", "luke", "john"].some(w => n.includes(w));
                        return true;
                      })
                      .map((house) => {
                        const isPrimary = ["galilee", "zion", "judah", "bethel"].some(w => (house.name || "").toLowerCase().includes(w));
                        return (
                          <div key={house.id} className="bg-card border border-border rounded-2xl p-5 text-center shadow-sm relative group/item hover:border-gold/60 transition duration-300 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center mb-3">
                                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${isPrimary ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}`}>
                                  {isPrimary ? "Primary House" : "Secondary House"}
                                </span>
                                <div className="text-xs font-bold text-gold flex items-center gap-1">
                                  🏆 {house.points || 0} pts
                                </div>
                              </div>
                              <div className="flex justify-center mb-3">
                                <div className={`h-14 w-14 rounded-full ${house.color_code || 'bg-slate-400'} flex items-center justify-center shadow-md text-white font-bold text-xl ring-4 ring-white/10`}>
                                  {house.name.charAt(0)}
                                </div>
                              </div>
                              <h4 className="font-display font-bold text-base text-primary mb-1">{house.name}</h4>
                              <p className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1.5">"{house.motto}"</p>
                              {house.values && (
                                <p className="text-[10px] font-semibold text-primary/80 bg-gold/10 rounded-lg px-2 py-1 mb-2">
                                  {house.values}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{house.description}</p>

                              {(house.captain || house.viceCaptain) && (
                                <div className="p-2.5 rounded-xl bg-muted/50 border border-border/60 text-left text-[11px] space-y-1 mb-3">
                                  <span className="text-[9px] uppercase font-bold tracking-wider text-gold block">Elected House Leadership</span>
                                  {house.captain && (
                                    <div className="flex justify-between items-center text-foreground font-semibold">
                                      <span>Captain: {house.captain}</span>
                                      <span className="text-[10px] text-muted-foreground">{house.captainClass || "Std V"}</span>
                                    </div>
                                  )}
                                  {house.viceCaptain && (
                                    <div className="flex justify-between items-center text-foreground font-semibold">
                                      <span>Vice Captain: {house.viceCaptain}</span>
                                      <span className="text-[10px] text-muted-foreground">{house.viceCaptainClass || "Std V"}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-1.5 justify-center pt-3 border-t border-border/50 opacity-80 group-hover/item:opacity-100 transition-opacity">
                              <Button size="sm" variant="ghost" className="h-7 text-xs text-primary hover:bg-gold/20 gap-1 rounded-full px-2" onClick={() => startEditHouse(house)}>
                                <Edit className="h-3 w-3" /> Edit
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 text-xs text-red-600 hover:bg-red-50 gap-1 rounded-full px-2" onClick={() => handleDelete("student-houses", house.id)}>
                                <Trash2 className="h-3 w-3" /> Delete
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    {houses.length === 0 && (
                      <div className="col-span-full text-center text-muted-foreground py-16">
                        No houses seeded. Click 'Add House' to populate.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {editorPage === "leaders" && (() => {
                const primaryLeaders = leaders.filter(l => (l.wing || inferWing(l.grade, l.role)) === "Primary");
                const secondaryLeaders = leaders.filter(l => (l.wing || inferWing(l.grade, l.role)) === "Secondary");

                const filterLeaders = (list: any[]) => {
                  if (!leaderSearch.trim()) return list;
                  const s = leaderSearch.toLowerCase();
                  return list.filter(l => 
                    (l.name || "").toLowerCase().includes(s) ||
                    (l.role || "").toLowerCase().includes(s) ||
                    (l.grade || "").toLowerCase().includes(s) ||
                    (l.house || "").toLowerCase().includes(s) ||
                    (l.duties || "").toLowerCase().includes(s)
                  );
                };

                const primaryFiltered = filterLeaders(primaryLeaders);
                const secondaryFiltered = filterLeaders(secondaryLeaders);

                return (
                  <div className="space-y-8 text-left animate-fade-in">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 gap-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-gold" /> Student Council & Leaders Directory
                        </h3>
                        <p className="text-xs text-muted-foreground">Manage council leaders, house captains, and prefects. Separated by Primary & Senior wings (/students/student-leaders).</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          onClick={() => { 
                            setEditItem(null); 
                            setLeaderForm({ role: "", name: "", grade: "", wing: "Primary", house: "", duties: "" }); 
                            setActiveDialog("leader"); 
                          }} 
                          className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs"
                        >
                          <Plus className="h-4 w-4" /> Add Student Leader
                        </Button>
                      </div>
                    </div>

                    {/* Wing Filter Switcher & Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
                        <button
                          onClick={() => setLeaderWingTab("all")}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                            leaderWingTab === "all" ? "bg-primary text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          All Leaders ({leaders.length})
                        </button>
                        <button
                          onClick={() => setLeaderWingTab("primary")}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                            leaderWingTab === "primary" ? "bg-emerald-700 text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          Primary Wing (Classes I – V) ({primaryLeaders.length})
                        </button>
                        <button
                          onClick={() => setLeaderWingTab("secondary")}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                            leaderWingTab === "secondary" ? "bg-navy-deep text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          Secondary / Senior Wing (Classes VI – XII) ({secondaryLeaders.length})
                        </button>
                      </div>
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                          placeholder="Search student leader..."
                          value={leaderSearch}
                          onChange={(e) => setLeaderSearch(e.target.value)}
                          className="pl-8 text-xs h-8 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Section 1: Primary Wing Student Leaders */}
                    {(leaderWingTab === "all" || leaderWingTab === "primary") && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-border/80 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                            <h4 className="font-display text-base font-bold text-primary">
                              Primary Wing Student Leaders (Classes I – V)
                            </h4>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {primaryFiltered.length} Nominees
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {primaryFiltered.map((lead) => (
                            <div key={lead.id} className="bg-card border border-emerald-600/20 rounded-2xl p-5 shadow-sm relative group/item hover:border-gold/60 transition duration-300 flex flex-col justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[9px] uppercase tracking-wider font-bold text-gold px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20">
                                    {lead.role}
                                  </span>
                                  {lead.house && (
                                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                                      🏠 {lead.house}
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-display font-bold text-base text-primary leading-tight mt-1">{lead.name}</h4>
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                  <span className="px-2 py-0.5 rounded bg-muted text-[11px] font-semibold">{lead.grade}</span>
                                  <span className="text-[10px] text-emerald-600 font-semibold uppercase">Primary Wing</span>
                                </div>
                                {lead.duties && (
                                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed pt-1">
                                    {lead.duties}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-2 justify-end pt-3 border-t border-border/50 mt-4 opacity-80 group-hover/item:opacity-100 transition-opacity">
                                <Button size="sm" variant="ghost" className="h-7 text-xs text-primary hover:bg-gold/20 gap-1 rounded-full px-2" onClick={() => startEditLeader(lead)}>
                                  <Edit className="h-3 w-3" /> Edit
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 text-xs text-red-600 hover:bg-red-50 gap-1 rounded-full px-2" onClick={() => handleDelete("student-leaders", lead.id)}>
                                  <Trash2 className="h-3 w-3" /> Delete
                                </Button>
                              </div>
                            </div>
                          ))}
                          {primaryFiltered.length === 0 && (
                            <div className="col-span-full text-center text-muted-foreground py-10 bg-muted/10 rounded-2xl border border-dashed border-border">
                              No primary student leaders match the search criteria. Click 'Add Student Leader' to nominate!
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Section 2: Secondary / Senior Wing Student Leaders */}
                    {(leaderWingTab === "all" || leaderWingTab === "secondary") && (
                      <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between border-b border-border/80 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-navy-deep animate-pulse" />
                            <h4 className="font-display text-base font-bold text-primary">
                              Secondary & Senior Wing Student Leaders (Classes VI – XII)
                            </h4>
                          </div>
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                            {secondaryFiltered.length} Nominees
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {secondaryFiltered.map((lead) => (
                            <div key={lead.id} className="bg-card border border-primary/20 rounded-2xl p-5 shadow-sm relative group/item hover:border-gold/60 transition duration-300 flex flex-col justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[9px] uppercase tracking-wider font-bold text-gold px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20">
                                    {lead.role}
                                  </span>
                                  {lead.house && (
                                    <span className="text-[10px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full">
                                      🏠 {lead.house}
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-display font-bold text-base text-primary leading-tight mt-1">{lead.name}</h4>
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                  <span className="px-2 py-0.5 rounded bg-muted text-[11px] font-semibold">{lead.grade}</span>
                                  <span className="text-[10px] text-blue-600 font-semibold uppercase">Senior Wing</span>
                                </div>
                                {lead.duties && (
                                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed pt-1">
                                    {lead.duties}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-2 justify-end pt-3 border-t border-border/50 mt-4 opacity-80 group-hover/item:opacity-100 transition-opacity">
                                <Button size="sm" variant="ghost" className="h-7 text-xs text-primary hover:bg-gold/20 gap-1 rounded-full px-2" onClick={() => startEditLeader(lead)}>
                                  <Edit className="h-3 w-3" /> Edit
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 text-xs text-red-600 hover:bg-red-50 gap-1 rounded-full px-2" onClick={() => handleDelete("student-leaders", lead.id)}>
                                  <Trash2 className="h-3 w-3" /> Delete
                                </Button>
                              </div>
                            </div>
                          ))}
                          {secondaryFiltered.length === 0 && (
                            <div className="col-span-full text-center text-muted-foreground py-10 bg-muted/10 rounded-2xl border border-dashed border-border">
                              No senior student leaders match the search criteria. Click 'Add Student Leader' to nominate!
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* About School Page Editor & Preview */}
              {editorPage === "about-school" && activePageData && (
                <div className="space-y-8 animate-fade-in text-left">
                  <div className="border border-border rounded-3xl p-6 bg-[#f7faf8] relative">
                    <span className="absolute -top-3 left-6 px-3 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase font-bold rounded-full">
                      Live Visual Mockup
                    </span>
                    
                    {/* Header Mock */}
                    <div className="bg-[#05140b] text-white p-8 rounded-2xl relative overflow-hidden mb-6 mt-2">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl"></div>
                      <span className="text-[10px] uppercase text-[#d4af37] tracking-wider font-semibold">Introduction & Legacy</span>
                      <h1 className="font-serif text-3xl font-bold mt-1 text-white">{pageEditorForm.hero_title || "About our School"}</h1>
                      <p className="text-xs text-white/80 font-light mt-2 max-w-xl">{pageEditorForm.hero_subtitle}</p>
                    </div>

                    {/* Content Mock */}
                    <div className="space-y-4 text-xs font-light text-[#6c8274] leading-relaxed max-w-3xl">
                      <p className="border-l-2 border-primary pl-3 py-0.5 font-semibold text-[#0a2b18] text-sm">School Introduction</p>
                      <p className="bg-white p-4 rounded-2xl shadow-sm border border-border/60 whitespace-pre-wrap">{pageEditorForm.content_blocks?.p1}</p>
                      <p className="bg-white p-4 rounded-2xl shadow-sm border border-border/60 whitespace-pre-wrap">{pageEditorForm.content_blocks?.p2}</p>
                      <p className="bg-white p-4 rounded-2xl shadow-sm border border-border/60 whitespace-pre-wrap">{pageEditorForm.content_blocks?.p3}</p>
                    </div>
                  </div>

                  {/* Form Editor */}
                  <form onSubmit={handlePageUpdateSubmit} className="space-y-6 bg-card border border-border/80 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-display text-base font-bold text-primary border-b border-border pb-3 flex items-center gap-2">
                      <Sparkles className="h-4.5 w-4.5 text-gold" /> Page Editor & SEO Settings
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Page Title</Label>
                        <Input value={pageEditorForm.title} onChange={e => setPageEditorForm(prev => ({ ...prev, title: e.target.value }))} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Hero Title</Label>
                        <Input value={pageEditorForm.hero_title} onChange={e => setPageEditorForm(prev => ({ ...prev, hero_title: e.target.value }))} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase text-muted-foreground font-semibold">Hero Subtitle</Label>
                      <Input value={pageEditorForm.hero_subtitle} onChange={e => setPageEditorForm(prev => ({ ...prev, hero_subtitle: e.target.value }))} />
                    </div>

                    <div className="space-y-4 pt-2 border-t border-border">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Paragraph 1 (Main Intro)</Label>
                        <Textarea rows={4} value={pageEditorForm.content_blocks?.p1 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, p1: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Paragraph 2 (Governance / Values)</Label>
                        <Textarea rows={4} value={pageEditorForm.content_blocks?.p2 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, p2: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Paragraph 3 (Campus Facilities / Conclusion)</Label>
                        <Textarea rows={4} value={pageEditorForm.content_blocks?.p3 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, p3: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">SEO Title Tag</Label>
                        <Input value={pageEditorForm.seo_title} onChange={e => setPageEditorForm(prev => ({ ...prev, seo_title: e.target.value }))} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">SEO Meta Description</Label>
                        <Input value={pageEditorForm.seo_description} onChange={e => setPageEditorForm(prev => ({ ...prev, seo_description: e.target.value }))} />
                      </div>
                    </div>

                    <div className="flex justify-end pt-3">
                      <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">
                        Publish Changes Live
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Chairman Message Page Editor & Preview */}
              {editorPage === "founder-message" && activePageData && (
                <div className="space-y-8 animate-fade-in text-left">
                  <div className="border border-border rounded-3xl p-6 bg-[#f7faf8] relative">
                    <span className="absolute -top-3 left-6 px-3 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase font-bold rounded-full">
                      Live Visual Mockup
                    </span>
                    
                    {/* Header Mock */}
                    <div className="bg-[#05140b] text-white p-8 rounded-2xl relative overflow-hidden mb-6 mt-2">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl"></div>
                      <span className="text-[10px] uppercase text-[#d4af37] tracking-wider font-semibold">Chairman</span>
                      <h1 className="font-serif text-3xl font-bold mt-1 text-white">{pageEditorForm.hero_title || "Rev. Fr. Anton Cruz"}</h1>
                      <p className="text-xs text-white/80 font-light mt-2 max-w-xl">{pageEditorForm.hero_subtitle}</p>
                    </div>

                    {/* Content Mock */}
                    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm max-w-3xl space-y-6">
                      <div className="border-b border-border pb-4">
                        <h4 className="font-serif text-xl text-[#0a2b18] mb-1 font-semibold">{pageEditorForm.content_blocks?.name || "Rev. Fr. Anton Cruz"}</h4>
                        <p className="text-[10px] text-gold font-bold uppercase tracking-wider">{pageEditorForm.content_blocks?.designation || "Founder & Chairman"} · {pageEditorForm.content_blocks?.serving_since}</p>
                      </div>
                      
                      <p className="text-sm font-light text-[#4a5568] leading-relaxed italic border-l-2 border-gold pl-4 py-1">{pageEditorForm.content_blocks?.intro}</p>
                      
                      <div className="py-6 border-y border-border/60 text-center">
                        <p className="font-serif text-lg italic text-[#0a2b18] font-bold">"{pageEditorForm.content_blocks?.quote}"</p>
                      </div>

                      <div className="space-y-4 text-xs font-light text-[#2d3748] leading-relaxed">
                        <p className="font-bold text-sm text-[#0a2b18]">{pageEditorForm.content_blocks?.message_title}</p>
                        <p className="whitespace-pre-wrap">{pageEditorForm.content_blocks?.message_p1}</p>
                        <p className="whitespace-pre-wrap">{pageEditorForm.content_blocks?.message_p2}</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Editor */}
                  <form onSubmit={handlePageUpdateSubmit} className="space-y-6 bg-card border border-border/80 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-display text-base font-bold text-primary border-b border-border pb-3 flex items-center gap-2">
                      <Sparkles className="h-4.5 w-4.5 text-gold" /> Page Editor & SEO Settings
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Page Title</Label>
                        <Input value={pageEditorForm.title} onChange={e => setPageEditorForm(prev => ({ ...prev, title: e.target.value }))} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Hero Title</Label>
                        <Input value={pageEditorForm.hero_title} onChange={e => setPageEditorForm(prev => ({ ...prev, hero_title: e.target.value }))} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase text-muted-foreground font-semibold">Hero Subtitle</Label>
                      <Input value={pageEditorForm.hero_subtitle} onChange={e => setPageEditorForm(prev => ({ ...prev, hero_subtitle: e.target.value }))} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-border">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Founder Full Name</Label>
                        <Input value={pageEditorForm.content_blocks?.name || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, name: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Designation Title</Label>
                        <Input value={pageEditorForm.content_blocks?.designation || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, designation: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Serving Since Text</Label>
                        <Input value={pageEditorForm.content_blocks?.serving_since || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, serving_since: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase text-muted-foreground font-semibold">Founder Profile Intro text</Label>
                      <Textarea rows={3} value={pageEditorForm.content_blocks?.intro || ""} onChange={e => {
                        const blocks = { ...pageEditorForm.content_blocks, intro: e.target.value };
                        setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                      }} required />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase text-muted-foreground font-semibold">Highlighted Vision Quote</Label>
                      <Input value={pageEditorForm.content_blocks?.quote || ""} onChange={e => {
                        const blocks = { ...pageEditorForm.content_blocks, quote: e.target.value };
                        setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                      }} required />
                    </div>

                    <div className="space-y-4 pt-2 border-t border-border">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Letter Heading / Title</Label>
                        <Input value={pageEditorForm.content_blocks?.message_title || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, message_title: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Message Paragraph 1</Label>
                        <Textarea rows={5} value={pageEditorForm.content_blocks?.message_p1 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, message_p1: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Message Paragraph 2</Label>
                        <Textarea rows={5} value={pageEditorForm.content_blocks?.message_p2 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, message_p2: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">SEO Title Tag</Label>
                        <Input value={pageEditorForm.seo_title} onChange={e => setPageEditorForm(prev => ({ ...prev, seo_title: e.target.value }))} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">SEO Meta Description</Label>
                        <Input value={pageEditorForm.seo_description} onChange={e => setPageEditorForm(prev => ({ ...prev, seo_description: e.target.value }))} />
                      </div>
                    </div>

                    <div className="flex justify-end pt-3">
                      <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">
                        Publish Changes Live
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Correspondent Message Page Editor & Preview */}
              {editorPage === "correspondent-message" && activePageData && (
                <div className="space-y-8 animate-fade-in text-left">
                  <div className="border border-border rounded-3xl p-6 bg-[#f7faf8] relative">
                    <span className="absolute -top-3 left-6 px-3 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase font-bold rounded-full">
                      Live Visual Mockup
                    </span>
                    
                    {/* Header Mock */}
                    <div className="bg-[#05140b] text-white p-8 rounded-2xl relative overflow-hidden mb-6 mt-2">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl"></div>
                      <span className="text-[10px] uppercase text-[#d4af37] tracking-wider font-semibold">Correspondent</span>
                      <h1 className="font-serif text-3xl font-bold mt-1 text-white">{pageEditorForm.hero_title || "Mr. J. Jeyakumar"}</h1>
                      <p className="text-xs text-white/80 font-light mt-2 max-w-xl">{pageEditorForm.hero_subtitle}</p>
                    </div>

                    {/* Content Mock */}
                    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm max-w-3xl space-y-6">
                      <div className="border-b border-border pb-4">
                        <h4 className="font-serif text-xl text-[#0a2b18] mb-1 font-semibold">{pageEditorForm.content_blocks?.name || "Mr. J. Jeyakumar"}</h4>
                        <p className="text-[10px] text-gold font-bold uppercase tracking-wider">{pageEditorForm.content_blocks?.designation || "Correspondent"}</p>
                      </div>
                      
                      <p className="text-sm font-light text-[#4a5568] leading-relaxed italic border-l-2 border-gold pl-4 py-1">{pageEditorForm.content_blocks?.intro}</p>

                      <div className="space-y-4 text-xs font-light text-[#2d3748] leading-relaxed border-t border-border pt-4">
                        <p className="whitespace-pre-wrap">{pageEditorForm.content_blocks?.message_p1}</p>
                        <p className="whitespace-pre-wrap">{pageEditorForm.content_blocks?.message_p2}</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Editor */}
                  <form onSubmit={handlePageUpdateSubmit} className="space-y-6 bg-card border border-border/80 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-display text-base font-bold text-primary border-b border-border pb-3 flex items-center gap-2">
                      <Sparkles className="h-4.5 w-4.5 text-gold" /> Page Editor & SEO Settings
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Page Title</Label>
                        <Input value={pageEditorForm.title} onChange={e => setPageEditorForm(prev => ({ ...prev, title: e.target.value }))} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Hero Title</Label>
                        <Input value={pageEditorForm.hero_title} onChange={e => setPageEditorForm(prev => ({ ...prev, hero_title: e.target.value }))} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase text-muted-foreground font-semibold">Hero Subtitle</Label>
                      <Input value={pageEditorForm.hero_subtitle} onChange={e => setPageEditorForm(prev => ({ ...prev, hero_subtitle: e.target.value }))} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Correspondent Name</Label>
                        <Input value={pageEditorForm.content_blocks?.name || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, name: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Correspondent Designation / Credentials</Label>
                        <Input value={pageEditorForm.content_blocks?.designation || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, designation: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase text-muted-foreground font-semibold">Welcome / Intro paragraph</Label>
                      <Textarea rows={3} value={pageEditorForm.content_blocks?.intro || ""} onChange={e => {
                        const blocks = { ...pageEditorForm.content_blocks, intro: e.target.value };
                        setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                      }} required />
                    </div>

                    <div className="space-y-4 pt-2 border-t border-border">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Message Paragraph 1</Label>
                        <Textarea rows={5} value={pageEditorForm.content_blocks?.message_p1 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, message_p1: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Message Paragraph 2</Label>
                        <Textarea rows={5} value={pageEditorForm.content_blocks?.message_p2 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, message_p2: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">SEO Title Tag</Label>
                        <Input value={pageEditorForm.seo_title} onChange={e => setPageEditorForm(prev => ({ ...prev, seo_title: e.target.value }))} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">SEO Meta Description</Label>
                        <Input value={pageEditorForm.seo_description} onChange={e => setPageEditorForm(prev => ({ ...prev, seo_description: e.target.value }))} />
                      </div>
                    </div>

                    <div className="flex justify-end pt-3">
                      <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">
                        Publish Changes Live
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Principals Messages Page Editor & Preview */}
              {editorPage === "principal-message" && activePageData && (
                <div className="space-y-8 animate-fade-in text-left">
                  <div className="border border-border rounded-3xl p-6 bg-[#f7faf8] relative">
                    <span className="absolute -top-3 left-6 px-3 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase font-bold rounded-full">
                      Live Visual Mockup
                    </span>
                    
                    {/* Header Mock */}
                    <div className="bg-[#05140b] text-white p-8 rounded-2xl relative overflow-hidden mb-6 mt-2">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl"></div>
                      <span className="text-[10px] uppercase text-[#d4af37] tracking-wider font-semibold">Principals</span>
                      <h1 className="font-serif text-3xl font-bold mt-1 text-white">{pageEditorForm.hero_title || "Principal's Message"}</h1>
                      <p className="text-xs text-white/80 font-light mt-2 max-w-xl">{pageEditorForm.hero_subtitle}</p>
                    </div>

                    {/* Content Mock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl text-xs font-light leading-relaxed text-[#6c8274]">
                      {/* Secondary HS Principal */}
                      <div className="bg-white p-5 rounded-2xl border border-[#d4af37]/30 shadow-sm space-y-3">
                        <h4 className="font-serif text-sm text-[#0a2b18] font-bold border-b pb-2">{pageEditorForm.content_blocks?.secondary_title}</h4>
                        <p className="whitespace-pre-wrap">{pageEditorForm.content_blocks?.secondary_message_p1}</p>
                        <p className="whitespace-pre-wrap">{pageEditorForm.content_blocks?.secondary_message_p2}</p>
                        <p className="whitespace-pre-wrap">{pageEditorForm.content_blocks?.secondary_message_p3}</p>
                      </div>

                      {/* Primary Principal */}
                      <div className="bg-white p-5 rounded-2xl border border-primary/30 shadow-sm space-y-3">
                        <h4 className="font-serif text-sm text-[#0a2b18] font-bold border-b pb-2">{pageEditorForm.content_blocks?.primary_title}</h4>
                        <p className="whitespace-pre-wrap">{pageEditorForm.content_blocks?.primary_message_p1}</p>
                        <p className="whitespace-pre-wrap">{pageEditorForm.content_blocks?.primary_message_p2}</p>
                        <p className="whitespace-pre-wrap">{pageEditorForm.content_blocks?.primary_message_p3}</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Editor */}
                  <form onSubmit={handlePageUpdateSubmit} className="space-y-6 bg-card border border-border/80 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-display text-base font-bold text-primary border-b border-border pb-3 flex items-center gap-2">
                      <Sparkles className="h-4.5 w-4.5 text-gold" /> Page Editor & SEO Settings
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Page Title</Label>
                        <Input value={pageEditorForm.title} onChange={e => setPageEditorForm(prev => ({ ...prev, title: e.target.value }))} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Hero Title</Label>
                        <Input value={pageEditorForm.hero_title} onChange={e => setPageEditorForm(prev => ({ ...prev, hero_title: e.target.value }))} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase text-muted-foreground font-semibold">Hero Subtitle</Label>
                      <Input value={pageEditorForm.hero_subtitle} onChange={e => setPageEditorForm(prev => ({ ...prev, hero_subtitle: e.target.value }))} />
                    </div>

                    {/* SECTION 1: HIGHER SECONDARY WING */}
                    <div className="space-y-4 pt-4 border-t border-[#d4af37]/30">
                      <h4 className="text-xs uppercase text-[#d4af37] font-bold tracking-wider">Higher Secondary Principal Section</h4>
                      
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">HS Principal Heading</Label>
                        <Input value={pageEditorForm.content_blocks?.secondary_title || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, secondary_title: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">HS Principal Message Paragraph 1</Label>
                        <Textarea rows={3} value={pageEditorForm.content_blocks?.secondary_message_p1 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, secondary_message_p1: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">HS Principal Message Paragraph 2</Label>
                        <Textarea rows={3} value={pageEditorForm.content_blocks?.secondary_message_p2 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, secondary_message_p2: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">HS Principal Message Paragraph 3</Label>
                        <Textarea rows={3} value={pageEditorForm.content_blocks?.secondary_message_p3 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, secondary_message_p3: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>
                    </div>

                    {/* SECTION 2: PRIMARY WING */}
                    <div className="space-y-4 pt-4 border-t border-primary/30">
                      <h4 className="text-xs uppercase text-primary font-bold tracking-wider">Primary Wing Principal Section</h4>
                      
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Primary Principal Heading</Label>
                        <Input value={pageEditorForm.content_blocks?.primary_title || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, primary_title: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Primary Principal Message Paragraph 1</Label>
                        <Textarea rows={3} value={pageEditorForm.content_blocks?.primary_message_p1 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, primary_message_p1: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Primary Principal Message Paragraph 2</Label>
                        <Textarea rows={3} value={pageEditorForm.content_blocks?.primary_message_p2 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, primary_message_p2: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Primary Principal Message Paragraph 3</Label>
                        <Textarea rows={3} value={pageEditorForm.content_blocks?.primary_message_p3 || ""} onChange={e => {
                          const blocks = { ...pageEditorForm.content_blocks, primary_message_p3: e.target.value };
                          setPageEditorForm(prev => ({ ...prev, content_blocks: blocks }));
                        }} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">SEO Title Tag</Label>
                        <Input value={pageEditorForm.seo_title} onChange={e => setPageEditorForm(prev => ({ ...prev, seo_title: e.target.value }))} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">SEO Meta Description</Label>
                        <Input value={pageEditorForm.seo_description} onChange={e => setPageEditorForm(prev => ({ ...prev, seo_description: e.target.value }))} />
                      </div>
                    </div>

                    <div className="flex justify-end pt-3">
                      <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">
                        Publish Changes Live
                      </Button>
                    </div>
                  </form>
                </div>
              )}

            </Card>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>

      {/* ================= CRUD MODALS ================= */}
      {/* 1. Announcements Dialog */}
      <Dialog open={activeDialog === "announce"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "announce" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">{editItem ? "Edit Announcement" : "Create New Announcement"}</DialogTitle>
            <DialogDescription>Fill out notification fields to alert visitors on the home page.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAnnounceSubmit} className="space-y-4 pt-3">
            <div className="space-y-1">
              <Label htmlFor="ann-title" className="text-xs uppercase tracking-wide text-muted-foreground">Announcement Title</Label>
              <Input id="ann-title" value={announcementForm.title} onChange={(e) => setAnnouncementForm(prev => ({ ...prev, title: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ann-msg" className="text-xs uppercase tracking-wide text-muted-foreground">Notification Message</Label>
              <Textarea id="ann-msg" value={announcementForm.message} onChange={(e) => setAnnouncementForm(prev => ({ ...prev, message: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Priority</Label>
                <Select value={announcementForm.priority} onValueChange={(val) => setAnnouncementForm(prev => ({ ...prev, priority: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High (Marquee Alert)</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Status</Label>
                <Select value={announcementForm.status} onValueChange={(val) => setAnnouncementForm(prev => ({ ...prev, status: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">{editItem ? "Save Changes" : "Publish Broadcast"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. Events Dialog */}
      <Dialog open={activeDialog === "event"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "event" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">{editItem ? "Modify Event" : "Add Campus Event"}</DialogTitle>
            <DialogDescription>Specify event details to render in the gallery & timelines page.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEventSubmit} className="space-y-4 pt-3">
            <div className="space-y-1">
              <Label htmlFor="ev-title" className="text-xs uppercase tracking-wide text-muted-foreground">Event Title</Label>
              <Input id="ev-title" value={eventForm.title} onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ev-desc" className="text-xs uppercase tracking-wide text-muted-foreground">Description</Label>
              <Textarea id="ev-desc" value={eventForm.description} onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="ev-date" className="text-xs uppercase tracking-wide text-muted-foreground">Event Date</Label>
                <Input id="ev-date" type="date" value={eventForm.event_date} onChange={(e) => setEventForm(prev => ({ ...prev, event_date: e.target.value }))} required />
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Category</Label>
                <Select value={eventForm.category} onValueChange={(val) => setEventForm(prev => ({ ...prev, category: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    <SelectItem value="Celebration">Celebration</SelectItem>
                    <SelectItem value="Exam">Examination</SelectItem>
                    <SelectItem value="Holiday">Holiday</SelectItem>
                    <SelectItem value="Field Trip">Field Trip / Tour</SelectItem>
                    <SelectItem value="Activity">Activity / Club</SelectItem>
                    <SelectItem value="Competition">Competition</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Meeting">Meeting / Open Day</SelectItem>
                    <SelectItem value="Reopening">Reopening</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="ev-time" className="text-xs uppercase tracking-wide text-muted-foreground">Time Schedule</Label>
                <Input id="ev-time" placeholder="e.g. 08:45 AM - 03:30 PM" value={eventForm.event_time} onChange={(e) => setEventForm(prev => ({ ...prev, event_time: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ev-venue" className="text-xs uppercase tracking-wide text-muted-foreground">Venue / Location</Label>
                <Input id="ev-venue" placeholder="e.g. Main Auditorium" value={eventForm.venue} onChange={(e) => setEventForm(prev => ({ ...prev, venue: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Cover Image Upload</Label>
              <div className="flex gap-3">
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "event")} />
                {eventForm.cover_image && <div className="h-10 w-10 shrink-0 border rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${resolveGalleryImageSrc(eventForm.cover_image)})` }} />}
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">Save Event</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 3. Educator Dialog */}
      <Dialog open={activeDialog === "teacher"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "teacher" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">{editItem ? "Edit Educator" : "Add Educator Profile"}</DialogTitle>
            <DialogDescription>Populate teacher credentials for the staff directory page.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTeacherSubmit} className="space-y-4 pt-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="t-name" className="text-xs uppercase tracking-wide text-muted-foreground">Full Name</Label>
                <Input id="t-name" value={teacherForm.name} onChange={(e) => setTeacherForm(prev => ({ ...prev, name: e.target.value }))} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="t-desig" className="text-xs uppercase tracking-wide text-muted-foreground">Role / Designation</Label>
                <Input id="t-desig" value={teacherForm.designation} onChange={(e) => setTeacherForm(prev => ({ ...prev, designation: e.target.value }))} required />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1 col-span-2">
                <Label htmlFor="t-qual" className="text-xs uppercase tracking-wide text-muted-foreground">Qualifications</Label>
                <Input id="t-qual" value={teacherForm.qualification} onChange={(e) => setTeacherForm(prev => ({ ...prev, qualification: e.target.value }))} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="t-exp" className="text-xs uppercase tracking-wide text-muted-foreground">Experience</Label>
                <Input id="t-exp" placeholder="e.g. 10 Years" value={teacherForm.experience} onChange={(e) => setTeacherForm(prev => ({ ...prev, experience: e.target.value }))} required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="t-dept" className="text-xs uppercase tracking-wide text-muted-foreground">Department</Label>
              <Input 
                id="t-dept" 
                placeholder="e.g. Mathematics, Science, Languages, Computer Science, Kindergarten..." 
                value={teacherForm.subject} 
                onChange={(e) => setTeacherForm(prev => ({ ...prev, subject: e.target.value }))} 
                required 
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-muted-foreground self-center mr-1">Suggestions:</span>
                {["Mathematics", "Science", "Languages", "Computer Science", "Commerce", "Arts & Sports", "Kindergarten", "Administration"].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setTeacherForm(prev => ({ ...prev, subject: d }))}
                    className={`text-[10px] px-2.5 py-0.5 rounded-full transition-colors font-medium border ${
                      teacherForm.subject === d ? "bg-primary text-white border-primary" : "bg-muted text-muted-foreground hover:bg-gold/20 hover:text-primary border-border"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="t-desc" className="text-xs uppercase tracking-wide text-muted-foreground">Educational Philosophy / Bio</Label>
              <Textarea id="t-desc" value={teacherForm.description} onChange={(e) => setTeacherForm(prev => ({ ...prev, description: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Avatar / Profile Photo</Label>
              <div className="flex gap-3">
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "teacher")} />
                {teacherForm.image && <div className="h-10 w-10 shrink-0 border rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${resolveGalleryImageSrc(teacherForm.image)})` }} />}
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">Save Educator</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 4. Student Honors & Achievements Dialog */}
      <Dialog open={activeDialog === "student"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "student" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">
              {editItem ? "Edit Student Record" : "Add Student Record"}
            </DialogTitle>
            <DialogDescription>
              Submit details for Best Students or Sports &amp; Athletic Achievements.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleStudentSubmit} className="space-y-4 pt-3">
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Category</Label>
              <Select 
                value={achievementCategory} 
                onValueChange={(val) => {
                  setAchievementCategory(val as any);
                  if (!editItem) {
                    if (val === "best_student") {
                      setStudentForm(prev => ({ ...prev, title: "Best Student of the Month" }));
                    } else {
                      setStudentForm(prev => ({ ...prev, title: "" }));
                    }
                  }
                }}
                disabled={!!editItem}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="best_student">Best Student</SelectItem>
                  <SelectItem value="sports">Sports &amp; Athletic Achievement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="s-title" className="text-xs uppercase tracking-wide text-muted-foreground">
                {achievementCategory === "best_student" ? "Award Title" : "Event Name / Championship"}
              </Label>
              <Input 
                id="s-title" 
                placeholder={
                  achievementCategory === "best_student" ? "e.g. Best Student of the Month" :
                  "e.g. Zonal Athletics Championship"
                } 
                value={studentForm.title} 
                onChange={(e) => setStudentForm(prev => ({ ...prev, title: e.target.value }))} 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="s-name" className="text-xs uppercase tracking-wide text-muted-foreground">
                  {achievementCategory === "sports" ? "Award / Position Won" : "Student Name"}
                </Label>
                <Input 
                  id="s-name" 
                  placeholder={achievementCategory === "sports" ? "e.g. Overall Runners-up Cup" : "Enter name"}
                  value={studentForm.name} 
                  onChange={(e) => setStudentForm(prev => ({ ...prev, name: e.target.value }))} 
                  required 
                />
              </div>
              {achievementCategory !== "sports" && (
                <div className="space-y-1">
                  <Label htmlFor="s-grade" className="text-xs uppercase tracking-wide text-muted-foreground">Grade / Class</Label>
                  <Input 
                    id="s-grade" 
                    placeholder="e.g. Class XII" 
                    value={studentForm.grade} 
                    onChange={(e) => setStudentForm(prev => ({ ...prev, grade: e.target.value }))} 
                    required 
                  />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="s-reason" className="text-xs uppercase tracking-wide text-muted-foreground">
                {achievementCategory === "best_student" && "Reason / Accomplishment"}
                {achievementCategory === "board_topper" && "Score / Marks achieved"}
                {achievementCategory === "sports" && "Team Division / Category Details"}
              </Label>
              <Textarea 
                id="s-reason" 
                placeholder={
                  achievementCategory === "best_student" ? "Describe why this student is nominated..." :
                  achievementCategory === "board_topper" ? "e.g. 594 / 600 or 100 / 100 in Mathematics" :
                  "e.g. Boys Under-17 Category (2025)"
                }
                value={studentForm.reason} 
                onChange={(e) => setStudentForm(prev => ({ ...prev, reason: e.target.value }))} 
                required 
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Photo (Optional)</Label>
              <div className="flex gap-3">
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "student")} />
                {studentForm.image && <div className="h-10 w-10 shrink-0 border rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${resolveGalleryImageSrc(studentForm.image)})` }} />}
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">
                {editItem ? "Save Changes" : "Create Record"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 5. Gallery Photo Upload Dialog */}
      <Dialog open={activeDialog === "gallery"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "gallery" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">
              {editItem ? "Edit Gallery Photo" : "Upload Photo to Celebration Folder"}
            </DialogTitle>
            <DialogDescription>
              Select the event folder and upload high-resolution celebration photographs.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleGallerySubmit} className="space-y-4 pt-3">
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Select Celebration Folder</Label>
              <Select value={galleryForm.category} onValueChange={(val) => setGalleryForm(prev => ({ ...prev, category: val }))}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Choose a celebration folder" /></SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {getMergedGalleryFolders(galleryImages, deletedFolderIds, customFolderMeta, deletedPhotoIds).map((folder) => (
                    <SelectItem key={folder.id} value={folder.name}>
                      📁 {folder.name} ({folder.photos.length} photos)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="g-title" className="text-xs uppercase tracking-wide text-muted-foreground">Photo Title</Label>
              <Input id="g-title" placeholder="e.g. Choir Ensemble Recital" value={galleryForm.title} onChange={(e) => setGalleryForm(prev => ({ ...prev, title: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="g-desc" className="text-xs uppercase tracking-wide text-muted-foreground">Description / Caption</Label>
              <Textarea id="g-desc" placeholder="Describe the moment or student performance..." value={galleryForm.description} onChange={(e) => setGalleryForm(prev => ({ ...prev, description: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Image File</Label>
              <div className="flex gap-3">
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "gallery")} required={!editItem && !galleryForm.image} />
                {galleryForm.image && <div className="h-10 w-10 shrink-0 border rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${resolveGalleryImageSrc(galleryForm.image)})` }} />}
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">
                {editItem ? "Save Photo Changes" : "Upload to Folder"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 5B. Create New Folder Dialog */}
      <Dialog open={activeDialog === "new_folder"} onOpenChange={(open) => setActiveDialog(open ? "new_folder" : null)}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">
              Create New Celebration Folder
            </DialogTitle>
            <DialogDescription>
              Create a dedicated photo album folder for school events, ceremonies, or activities.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNewFolderSubmit} className="space-y-4 pt-3">
            <div className="space-y-1">
              <Label htmlFor="nf-name" className="text-xs uppercase tracking-wide text-muted-foreground">Folder Name</Label>
              <Input 
                id="nf-name" 
                placeholder="e.g. Sports Day 2026 or Science Fair" 
                value={newFolderForm.name} 
                onChange={(e) => setNewFolderForm(prev => ({ ...prev, name: e.target.value }))} 
                required 
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="nf-desc" className="text-xs uppercase tracking-wide text-muted-foreground">Folder Description</Label>
              <Textarea 
                id="nf-desc" 
                placeholder="Describe the celebrations, activities, and memories in this album..." 
                value={newFolderForm.description} 
                onChange={(e) => setNewFolderForm(prev => ({ ...prev, description: e.target.value }))} 
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="nf-date" className="text-xs uppercase tracking-wide text-muted-foreground">Celebration Date / Month</Label>
              <Input 
                id="nf-date" 
                placeholder="e.g. February 2026" 
                value={newFolderForm.date} 
                onChange={(e) => setNewFolderForm(prev => ({ ...prev, date: e.target.value }))} 
              />
            </div>
            <div className="space-y-1 pt-2 border-t border-border">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Cover / Initial Photo (Optional)</Label>
              <div className="flex gap-3">
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "new_folder")} />
                {newFolderForm.image && <div className="h-10 w-10 shrink-0 border rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${resolveGalleryImageSrc(newFolderForm.image)})` }} />}
              </div>
            </div>
            {newFolderForm.image && (
              <div className="space-y-1">
                <Label htmlFor="nf-img-title" className="text-xs uppercase tracking-wide text-muted-foreground">Cover Photo Title</Label>
                <Input 
                  id="nf-img-title" 
                  placeholder="e.g. Opening March Past Ceremony" 
                  value={newFolderForm.photoTitle} 
                  onChange={(e) => setNewFolderForm(prev => ({ ...prev, photoTitle: e.target.value }))} 
                />
              </div>
            )}
            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">
                Create Folder
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 6. Admission Inquiry Dialog */}
      <Dialog open={activeDialog === "admission"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "admission" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">{editItem ? "Edit Admission Inquiry" : "Create Admission Inquiry"}</DialogTitle>
            <DialogDescription>Submit or edit student admission detail query.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAdmissionSubmit} className="space-y-4 pt-3">
            <div className="space-y-1">
              <Label htmlFor="adm-sname" className="text-xs uppercase tracking-wide text-muted-foreground">Student Name</Label>
              <Input id="adm-sname" value={admissionForm.student_name} onChange={(e) => setAdmissionForm(prev => ({ ...prev, student_name: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="adm-pname" className="text-xs uppercase tracking-wide text-muted-foreground">Parent Name</Label>
              <Input id="adm-pname" value={admissionForm.parent_name} onChange={(e) => setAdmissionForm(prev => ({ ...prev, parent_name: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="adm-phone" className="text-xs uppercase tracking-wide text-muted-foreground">Phone</Label>
                <Input id="adm-phone" value={admissionForm.phone} onChange={(e) => setAdmissionForm(prev => ({ ...prev, phone: e.target.value }))} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="adm-email" className="text-xs uppercase tracking-wide text-muted-foreground">Email</Label>
                <Input id="adm-email" type="email" value={admissionForm.email} onChange={(e) => setAdmissionForm(prev => ({ ...prev, email: e.target.value }))} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="adm-class" className="text-xs uppercase tracking-wide text-muted-foreground">Class Applied</Label>
                <Input id="adm-class" placeholder="e.g. Class X" value={admissionForm.class_applied} onChange={(e) => setAdmissionForm(prev => ({ ...prev, class_applied: e.target.value }))} required />
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Status</Label>
                <Select value={admissionForm.status} onValueChange={(val) => setAdmissionForm(prev => ({ ...prev, status: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Admitted">Admitted</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="adm-msg" className="text-xs uppercase tracking-wide text-muted-foreground">Message / Remarks</Label>
              <Textarea id="adm-msg" value={admissionForm.message} onChange={(e) => setAdmissionForm(prev => ({ ...prev, message: e.target.value }))} />
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">Save Inquiry</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 7. Contact Message Dialog */}
      <Dialog open={activeDialog === "contact"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "contact" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">{editItem ? "Edit Contact Message" : "Create Contact Message"}</DialogTitle>
            <DialogDescription>Submit or edit general visitor inquiries.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4 pt-3">
            <div className="space-y-1">
              <Label htmlFor="con-name" className="text-xs uppercase tracking-wide text-muted-foreground">Sender Name</Label>
              <Input id="con-name" value={contactForm.name} onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="con-email" className="text-xs uppercase tracking-wide text-muted-foreground">Email</Label>
                <Input id="con-email" type="email" value={contactForm.email} onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="con-phone" className="text-xs uppercase tracking-wide text-muted-foreground">Phone</Label>
                <Input id="con-phone" value={contactForm.phone} onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="con-subject" className="text-xs uppercase tracking-wide text-muted-foreground">Subject</Label>
                <Input id="con-subject" value={contactForm.subject} onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))} required />
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Status</Label>
                <Select value={contactForm.status} onValueChange={(val) => setContactForm(prev => ({ ...prev, status: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Replied">Replied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="con-msg" className="text-xs uppercase tracking-wide text-muted-foreground">Message</Label>
              <Textarea id="con-msg" value={contactForm.message} onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))} required />
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">Save Message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 8. Job Application Dialog */}
      <Dialog open={activeDialog === "job"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "job" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">{editItem ? "Edit Job Application" : "Create Job Application"}</DialogTitle>
            <DialogDescription>Submit or edit careers applications.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleJobSubmit} className="space-y-4 pt-3">
            <div className="space-y-1">
              <Label htmlFor="job-name" className="text-xs uppercase tracking-wide text-muted-foreground">Candidate Name</Label>
              <Input id="job-name" value={jobForm.name} onChange={(e) => setJobForm(prev => ({ ...prev, name: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="job-email" className="text-xs uppercase tracking-wide text-muted-foreground">Email</Label>
                <Input id="job-email" type="email" value={jobForm.email} onChange={(e) => setJobForm(prev => ({ ...prev, email: e.target.value }))} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="job-phone" className="text-xs uppercase tracking-wide text-muted-foreground">Phone</Label>
                <Input id="job-phone" value={jobForm.phone} onChange={(e) => setJobForm(prev => ({ ...prev, phone: e.target.value }))} required />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Associated Vacancy Position</Label>
              <Select value={String(jobForm.vacancy)} onValueChange={(val) => setJobForm(prev => ({ ...prev, vacancy: parseInt(val, 10) }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vacancy" />
                </SelectTrigger>
                <SelectContent>
                  {vacancies.map((v) => (
                    <SelectItem key={v.id} value={String(v.id)}>{v.title} ({v.department})</SelectItem>
                  ))}
                  {vacancies.length === 0 && (
                    <SelectItem value="1">Default Vacancy (1)</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="job-resume" className="text-xs uppercase tracking-wide text-muted-foreground">Resume URL / File Link</Label>
              <Input id="job-resume" placeholder="Cloudinary PDF link" value={jobForm.resume} onChange={(e) => setJobForm(prev => ({ ...prev, resume: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="job-letter" className="text-xs uppercase tracking-wide text-muted-foreground">Cover Letter</Label>
              <Textarea id="job-letter" value={jobForm.cover_letter} onChange={(e) => setJobForm(prev => ({ ...prev, cover_letter: e.target.value }))} />
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">Save Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 9. School Uniform Dialog */}
      <Dialog open={activeDialog === "uniform"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "uniform" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">{editItem ? "Edit Uniform Rule" : "Create Uniform Rule"}</DialogTitle>
            <DialogDescription>Add or modify a school grade uniform specification.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUniformSubmit} className="space-y-4 pt-3">
            <div className="space-y-1">
              <Label htmlFor="uni-sec" className="text-xs uppercase tracking-wide text-muted-foreground">Section Name</Label>
              <Input id="uni-sec" placeholder="e.g. Primary (Classes I to V)" value={uniformForm.section} onChange={(e) => setUniformForm(prev => ({ ...prev, section: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="uni-boys" className="text-xs uppercase tracking-wide text-muted-foreground">Boys Dress Code</Label>
              <Textarea id="uni-boys" value={uniformForm.boys_uniform} onChange={(e) => setUniformForm(prev => ({ ...prev, boys_uniform: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="uni-girls" className="text-xs uppercase tracking-wide text-muted-foreground">Girls Dress Code</Label>
              <Textarea id="uni-girls" value={uniformForm.girls_uniform} onChange={(e) => setUniformForm(prev => ({ ...prev, girls_uniform: e.target.value }))} required />
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">Save Uniform Rules</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 10. School House Dialog */}
      <Dialog open={activeDialog === "house"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "house" : null); }}>
        <DialogContent className="max-w-lg rounded-3xl bg-card border border-gold/30 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">{editItem ? "Edit House Details" : "Create School House"}</DialogTitle>
            <DialogDescription>Modify house details, mottos, core values, elected leadership, and points.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleHouseSubmit} className="space-y-4 pt-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="house-name" className="text-xs uppercase tracking-wide text-muted-foreground">House Name</Label>
                <Input id="house-name" placeholder="e.g. Judah House" value={houseForm.name} onChange={(e) => setHouseForm(prev => ({ ...prev, name: e.target.value }))} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="house-motto" className="text-xs uppercase tracking-wide text-muted-foreground">Motto</Label>
                <Input id="house-motto" placeholder="e.g. Courage and Praise" value={houseForm.motto} onChange={(e) => setHouseForm(prev => ({ ...prev, motto: e.target.value }))} required />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="house-values" className="text-xs uppercase tracking-wide text-muted-foreground">Core Pillars / Values</Label>
              <Input id="house-values" placeholder="e.g. Bravery • Athletic Passion • Team Endurance" value={houseForm.values} onChange={(e) => setHouseForm(prev => ({ ...prev, values: e.target.value }))} />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Wing</Label>
                <Select value={houseForm.wing || "Primary"} onValueChange={(val) => setHouseForm(prev => ({ ...prev, wing: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Primary">Primary (Galilee, Zion, Judah, Bethel)</SelectItem>
                    <SelectItem value="Senior">Secondary (Matthew, Mark, Luke, John)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Color Badge</Label>
                <Select value={houseForm.color_code} onValueChange={(val) => setHouseForm(prev => ({ ...prev, color_code: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-red-600">Red (bg-red-600)</SelectItem>
                    <SelectItem value="bg-blue-600">Blue (bg-blue-600)</SelectItem>
                    <SelectItem value="bg-emerald-600">Green (bg-emerald-600)</SelectItem>
                    <SelectItem value="bg-amber-500">Gold / Yellow (bg-amber-500)</SelectItem>
                    <SelectItem value="bg-purple-600">Purple (bg-purple-600)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="house-pts" className="text-xs uppercase tracking-wide text-muted-foreground">Scoreboard Pts</Label>
                <Input id="house-pts" type="number" value={houseForm.points} onChange={(e) => setHouseForm(prev => ({ ...prev, points: parseInt(e.target.value, 10) || 0 }))} required />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="house-desc" className="text-xs uppercase tracking-wide text-muted-foreground">Description / Focus</Label>
              <Textarea id="house-desc" placeholder="e.g. Encouraging bold enthusiasm on athletic fields, joyful participation in school events, and fearless dedication to excellence." value={houseForm.description} onChange={(e) => setHouseForm(prev => ({ ...prev, description: e.target.value }))} required rows={2} />
            </div>

            {/* Elected House Leadership */}
            <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/80 space-y-3">
              <h5 className="font-display text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-gold" /> Elected House Leadership
              </h5>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="house-cap" className="text-[11px] uppercase tracking-wide text-muted-foreground">House Captain Name</Label>
                  <Input id="house-cap" placeholder="e.g. Praveen Sai.B" value={houseForm.captain} onChange={(e) => setHouseForm(prev => ({ ...prev, captain: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="house-cap-cls" className="text-[11px] uppercase tracking-wide text-muted-foreground">House Captain Class</Label>
                  <Input id="house-cap-cls" placeholder="e.g. Class Std V" value={houseForm.captainClass} onChange={(e) => setHouseForm(prev => ({ ...prev, captainClass: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="house-vcap" className="text-[11px] uppercase tracking-wide text-muted-foreground">Vice Captain Name</Label>
                  <Input id="house-vcap" placeholder="e.g. Sree Dharshini.I" value={houseForm.viceCaptain} onChange={(e) => setHouseForm(prev => ({ ...prev, viceCaptain: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="house-vcap-cls" className="text-[11px] uppercase tracking-wide text-muted-foreground">Vice Captain Class</Label>
                  <Input id="house-vcap-cls" placeholder="e.g. Class Std V" value={houseForm.viceCaptainClass} onChange={(e) => setHouseForm(prev => ({ ...prev, viceCaptainClass: e.target.value }))} />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">Save House Details</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 11. Student Leader Dialog */}
      <Dialog open={activeDialog === "leader"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "leader" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">{editItem ? "Edit Student Leader" : "Nominate Student Leader"}</DialogTitle>
            <DialogDescription>Assign a role in the school student council (Primary Wing, Secondary Wing, or House Captains).</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLeaderSubmit} className="space-y-4 pt-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Wing / Category</Label>
                <Select value={leaderForm.wing} onValueChange={(val: any) => setLeaderForm(prev => ({ ...prev, wing: val }))}>
                  <SelectTrigger><SelectValue placeholder="Select Wing" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Primary">Primary Wing (Classes I - V)</SelectItem>
                    <SelectItem value="Secondary">Secondary / Senior (Classes VI - XII)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="lead-grade" className="text-xs uppercase tracking-wide text-muted-foreground">Grade / Class</Label>
                <Input id="lead-grade" placeholder={leaderForm.wing === "Primary" ? "e.g. Class V - A" : "e.g. Class XII - A"} value={leaderForm.grade} onChange={(e) => setLeaderForm(prev => ({ ...prev, grade: e.target.value }))} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Standard Designation (Select or Customize)</Label>
              <Select 
                value={
                  [
                    "School Pupil Leader (SPL)",
                    "Assistant School Pupil Leader (ASPL)",
                    "Primary Head Boy",
                    "Primary Head Girl",
                    "Primary Assistant Head Boy",
                    "Primary Assistant Head Girl",
                    "Sports Captain",
                    "Sports Vice Captain",
                    "House Captain",
                    "House Vice Captain",
                    "Cultural Prefect",
                    "Discipline Prefect",
                    "Academic Prefect",
                    "Literary Prefect"
                  ].includes(leaderForm.role) ? leaderForm.role : "Custom"
                } 
                onValueChange={(val) => {
                  if (val !== "Custom") {
                    setLeaderForm(prev => ({ ...prev, role: val }));
                  }
                }}
              >
                <SelectTrigger><SelectValue placeholder="Select standard designation" /></SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  <SelectItem value="School Pupil Leader (SPL)">School Pupil Leader (SPL)</SelectItem>
                  <SelectItem value="Assistant School Pupil Leader (ASPL)">Assistant School Pupil Leader (ASPL)</SelectItem>
                  <SelectItem value="Primary Head Boy">Primary Head Boy</SelectItem>
                  <SelectItem value="Primary Head Girl">Primary Head Girl</SelectItem>
                  <SelectItem value="Primary Assistant Head Boy">Primary Assistant Head Boy</SelectItem>
                  <SelectItem value="Primary Assistant Head Girl">Primary Assistant Head Girl</SelectItem>
                  <SelectItem value="Sports Captain">Sports Captain</SelectItem>
                  <SelectItem value="Sports Vice Captain">Sports Vice Captain</SelectItem>
                  <SelectItem value="House Captain">House Captain</SelectItem>
                  <SelectItem value="House Vice Captain">House Vice Captain</SelectItem>
                  <SelectItem value="Cultural Prefect">Cultural Prefect</SelectItem>
                  <SelectItem value="Discipline Prefect">Discipline Prefect</SelectItem>
                  <SelectItem value="Academic Prefect">Academic Prefect</SelectItem>
                  <SelectItem value="Literary Prefect">Literary Prefect</SelectItem>
                  <SelectItem value="Custom">Custom Designation...</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-1 pt-1">
                <Label htmlFor="lead-role" className="text-xs uppercase tracking-wide text-muted-foreground">Council Role Name</Label>
                <Input id="lead-role" placeholder="e.g. School Pupil Leader (SPL) or Judah House Captain" value={leaderForm.role} onChange={(e) => setLeaderForm(prev => ({ ...prev, role: e.target.value }))} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="lead-name" className="text-xs uppercase tracking-wide text-muted-foreground">Student Name</Label>
                <Input id="lead-name" placeholder="e.g. Master K. Sanjay" value={leaderForm.name} onChange={(e) => setLeaderForm(prev => ({ ...prev, name: e.target.value }))} required />
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">House (Optional)</Label>
                <Select value={leaderForm.house || "None"} onValueChange={(val) => setLeaderForm(prev => ({ ...prev, house: val === "None" ? "" : val }))}>
                  <SelectTrigger><SelectValue placeholder="Select House" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None / General Council</SelectItem>
                    <SelectItem value="Galilee">Galilee House (Red - Primary)</SelectItem>
                    <SelectItem value="Zion">Zion House (Blue - Primary)</SelectItem>
                    <SelectItem value="Judah">Judah House (Green - Primary)</SelectItem>
                    <SelectItem value="Bethel">Bethel House (Yellow - Primary)</SelectItem>
                    <SelectItem value="St. Matthew">St. Matthew House (Red - Senior)</SelectItem>
                    <SelectItem value="St. Mark">St. Mark House (Blue - Senior)</SelectItem>
                    <SelectItem value="St. Luke">St. Luke House (Green - Senior)</SelectItem>
                    <SelectItem value="St. John">St. John House (Gold - Senior)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="lead-duties" className="text-xs uppercase tracking-wide text-muted-foreground">Duties &amp; Responsibilities</Label>
              <Textarea id="lead-duties" placeholder="e.g. Leads assembly flag protocol, morning prayers, and junior discipline." value={leaderForm.duties} onChange={(e) => setLeaderForm(prev => ({ ...prev, duties: e.target.value }))} rows={2} />
            </div>

            <DialogFooter className="pt-2">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">Save Nominee</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 12. Dedicated Board Examination Topper Dialog */}
      <Dialog open={activeDialog === "board_topper"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "board_topper" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">
              {editItem ? "Edit Board Examination Topper" : "Add Board Exam Topper Record"}
            </DialogTitle>
            <DialogDescription>
              Record state board examination ranks, subject centums, scores, and academic milestones.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBoardTopperSubmit} className="space-y-4 pt-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="top-name" className="text-xs uppercase tracking-wide text-muted-foreground">Student Name</Label>
                <Input
                  id="top-name"
                  placeholder="e.g. Master Kishore P."
                  value={boardTopperForm.name}
                  onChange={(e) => setBoardTopperForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="top-grade" className="text-xs uppercase tracking-wide text-muted-foreground">Class / Exam Wing</Label>
                <Input
                  id="top-grade"
                  placeholder="e.g. Class XII - A, Class X, Class V"
                  value={boardTopperForm.grade}
                  onChange={(e) => setBoardTopperForm(prev => ({ ...prev, grade: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="top-title" className="text-xs uppercase tracking-wide text-muted-foreground">Honor Title / Rank</Label>
                <Input
                  id="top-title"
                  placeholder="e.g. School Topper, State Rank 1st"
                  value={boardTopperForm.title}
                  onChange={(e) => setBoardTopperForm(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="top-score" className="text-xs uppercase tracking-wide text-muted-foreground">Total Marks / Score</Label>
                <Input
                  id="top-score"
                  placeholder="e.g. 598 / 600, 495 / 500, 99.1% Marks"
                  value={boardTopperForm.score}
                  onChange={(e) => setBoardTopperForm(prev => ({ ...prev, score: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="top-stream" className="text-xs uppercase tracking-wide text-muted-foreground">Stream / Group</Label>
                <Input
                  id="top-stream"
                  placeholder="e.g. Bio-Maths, Commerce, Science"
                  value={boardTopperForm.stream}
                  onChange={(e) => setBoardTopperForm(prev => ({ ...prev, stream: e.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="top-year" className="text-xs uppercase tracking-wide text-muted-foreground">Academic Year</Label>
                <Input
                  id="top-year"
                  placeholder="e.g. 2025-2026"
                  value={boardTopperForm.year}
                  onChange={(e) => setBoardTopperForm(prev => ({ ...prev, year: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="top-reason" className="text-xs uppercase tracking-wide text-muted-foreground">Subject Centums &amp; Key Remarks</Label>
              <Textarea
                id="top-reason"
                placeholder="e.g. Centum in Physics, Chemistry, and Mathematics with State Merit Certificate."
                value={boardTopperForm.reason}
                onChange={(e) => setBoardTopperForm(prev => ({ ...prev, reason: e.target.value }))}
                rows={3}
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Student Photo (Optional)</Label>
              <div className="flex gap-3 items-center">
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "board_topper")} />
                {boardTopperForm.image && (
                  <div className="h-10 w-10 shrink-0 border rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${resolveGalleryImageSrc(boardTopperForm.image)})` }} />
                )}
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">
                {editItem ? "Save Board Topper" : "Publish Board Record"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
