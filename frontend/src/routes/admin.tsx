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
  Shirt, Flag, UserCheck, Home, BookOpen, GraduationCap
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

import { API_BASE } from "@/config";

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Login credentials state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // CRUD Data States
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [bestStudents, setBestStudents] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [uniforms, setUniforms] = useState<any[]>([]);
  const [houses, setHouses] = useState<any[]>([]);
  const [leaders, setLeaders] = useState<any[]>([]);
  
  // Submission View States
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [jobApplications, setJobApplications] = useState<any[]>([]);

  // Dialog / Edit states
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [editorPage, setEditorPage] = useState<"home" | "teachers" | "gallery" | "students" | "uniform" | "houses" | "leaders" | "about-school" | "founder-message" | "correspondent-message" | "principal-message">("home");
  const [achievementCategory, setAchievementCategory] = useState<"best_student" | "board_topper" | "sports">("best_student");

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
    title: "", description: "", cover_image: "", event_date: "", category: "Academic", status: "Published"
  });
  const [teacherForm, setTeacherForm] = useState({
    name: "", designation: "", subject: "English", qualification: "", experience: "", description: "", image: ""
  });
  const [studentForm, setStudentForm] = useState({
    title: "", name: "", grade: "", reason: "", image: ""
  });
  const [galleryForm, setGalleryForm] = useState({
    title: "", description: "", category: "Events", image: ""
  });
  const [uniformForm, setUniformForm] = useState({
    section: "", boys_uniform: "", girls_uniform: ""
  });
  const [houseForm, setHouseForm] = useState({
    name: "", motto: "", color_code: "bg-red-500", description: "", points: 0
  });
  const [leaderForm, setLeaderForm] = useState({
    role: "", name: "", grade: ""
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

  // Check auth on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      fetchUserProfile(savedToken);
    }
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
      const evRes = await fetch(`${API_BASE}/events/`, { headers });
      if (evRes.ok) {
        const d = await evRes.json();
        setEvents(d.results || d);
      }

      // Teachers
      const teachRes = await fetch(`${API_BASE}/teachers/`, { headers });
      if (teachRes.ok) {
        const d = await teachRes.json();
        setTeachers(d.results || d);
      }

      // Student Achievements
      const studRes = await fetch(`${API_BASE}/student-achievements/`, { headers });
      if (studRes.ok) {
        const d = await studRes.json();
        setBestStudents(d.results || d);
      }

      // School Uniforms
      const uniRes = await fetch(`${API_BASE}/school-uniforms/`, { headers });
      if (uniRes.ok) {
        const d = await uniRes.json();
        setUniforms(d.results || d);
      }

      // Student Houses
      const houseRes = await fetch(`${API_BASE}/student-houses/`, { headers });
      if (houseRes.ok) {
        const d = await houseRes.json();
        setHouses(d.results || d);
      }

      // Student Leaders
      const leaderRes = await fetch(`${API_BASE}/student-leaders/`, { headers });
      if (leaderRes.ok) {
        const d = await leaderRes.json();
        setLeaders(d.results || d);
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
        
        // Update correct form state with URL
        if (targetForm === "event") setEventForm(prev => ({ ...prev, cover_image: data.url }));
        if (targetForm === "teacher") setTeacherForm(prev => ({ ...prev, image: data.url }));
        if (targetForm === "student") setStudentForm(prev => ({ ...prev, image: data.url }));
        if (targetForm === "gallery") setGalleryForm(prev => ({ ...prev, image: data.url }));
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
  const handleDelete = async (endpoint: string, id: number) => {
    if (!confirm("Are you sure you want to delete this content item? This action is permanent.")) return;
    try {
      const res = await fetch(`${API_BASE}/${endpoint}/${id}/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Item deleted successfully!");
        fetchAllData();
      } else {
        toast.error("Unauthorized: Insufficient roles to delete content.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item.");
    }
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

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(eventForm)
      });
      if (res.ok) {
        toast.success(isEdit ? "Event updated!" : "Event created!");
        setEventForm({ title: "", description: "", cover_image: "", event_date: "", category: "Academic", status: "Published" });
        setEditItem(null);
        setActiveDialog(null);
        fetchAllData();
      } else {
        toast.error("Failed to save event.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
  };

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/teachers/${editItem.id}/` : `${API_BASE}/teachers/`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(teacherForm)
      });
      if (res.ok) {
        toast.success(isEdit ? "Teacher profile updated!" : "Teacher profile created!");
        setTeacherForm({ name: "", designation: "", subject: "English", qualification: "", experience: "", description: "", image: "" });
        setEditItem(null);
        setActiveDialog(null);
        fetchAllData();
      } else {
        toast.error("Failed to save teacher profile.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
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
      title = `${studentForm.title} - ${studentForm.name} (${studentForm.grade})`;
    }

    const body = {
      title,
      description: studentForm.reason,
      image: studentForm.image
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        toast.success(isEdit ? "Student record saved!" : "Student record created!");
        setStudentForm({ title: "", name: "", grade: "", reason: "", image: "" });
        setEditItem(null);
        setActiveDialog(null);
        fetchAllData();
      } else {
        toast.error("Failed to save student record.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/gallery-images/${editItem.id}/` : `${API_BASE}/gallery-images/`;
    const method = isEdit ? "PUT" : "POST";

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
        toast.success(isEdit ? "Gallery photo added!" : "Gallery photo added!");
        setGalleryForm({ title: "", description: "", category: "Events", image: "" });
        setEditItem(null);
        setActiveDialog(null);
        fetchAllData();
      } else {
        toast.error("Failed to add gallery photo.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
  };

  const handleUniformSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/school-uniforms/${editItem.id}/` : `${API_BASE}/school-uniforms/`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(uniformForm)
      });
      if (res.ok) {
        toast.success(isEdit ? "Uniform rules saved!" : "Uniform rules created!");
        setUniformForm({ section: "", boys_uniform: "", girls_uniform: "" });
        setEditItem(null);
        setActiveDialog(null);
        fetchAllData();
      } else {
        toast.error("Failed to save uniform rule.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
  };

  const handleHouseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/student-houses/${editItem.id}/` : `${API_BASE}/student-houses/`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(houseForm)
      });
      if (res.ok) {
        toast.success(isEdit ? "House details updated!" : "House details created!");
        setHouseForm({ name: "", motto: "", color_code: "bg-red-500", description: "", points: 0 });
        setEditItem(null);
        setActiveDialog(null);
        fetchAllData();
      } else {
        toast.error("Failed to save house details.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
  };

  const handleLeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editItem;
    const url = isEdit ? `${API_BASE}/student-leaders/${editItem.id}/` : `${API_BASE}/student-leaders/`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(leaderForm)
      });
      if (res.ok) {
        toast.success(isEdit ? "Student leader updated!" : "Student leader created!");
        setLeaderForm({ role: "", name: "", grade: "" });
        setEditItem(null);
        setActiveDialog(null);
        fetchAllData();
      } else {
        toast.error("Failed to save student leader.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
  };

  const startEditUniform = (item: any) => {
    setEditItem(item);
    setUniformForm({
      section: item.section,
      boys_uniform: item.boys_uniform,
      girls_uniform: item.girls_uniform
    });
    setActiveDialog("uniform");
  };

  const startEditHouse = (item: any) => {
    setEditItem(item);
    setHouseForm({
      name: item.name,
      motto: item.motto,
      color_code: item.color_code,
      description: item.description,
      points: item.points
    });
    setActiveDialog("house");
  };

  const startEditLeader = (item: any) => {
    setEditItem(item);
    setLeaderForm({
      role: item.role,
      name: item.name,
      grade: item.grade
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
            <TabsTrigger value="dashboard" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><LayoutDashboard className="h-4.5 w-4.5" /> Stats Overview</TabsTrigger>
            <TabsTrigger value="announcements" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Bell className="h-4.5 w-4.5" /> Announcements</TabsTrigger>
            <TabsTrigger value="events" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Calendar className="h-4.5 w-4.5" /> Events Timeline</TabsTrigger>
            <TabsTrigger value="teachers" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Users className="h-4.5 w-4.5" /> Educators Directory</TabsTrigger>
            <TabsTrigger value="best-students" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Award className="h-4.5 w-4.5" /> Best Students</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Trophy className="h-4.5 w-4.5" /> Results & Achievements</TabsTrigger>
            <TabsTrigger value="uniforms" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Shirt className="h-4.5 w-4.5" /> School Uniform</TabsTrigger>
            <TabsTrigger value="houses" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Flag className="h-4.5 w-4.5" /> School Houses</TabsTrigger>
            <TabsTrigger value="leaders" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><UserCheck className="h-4.5 w-4.5" /> Student Leaders</TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><ImageIcon className="h-4.5 w-4.5" /> Photo Gallery</TabsTrigger>
            <TabsTrigger value="submissions" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><MessageSquare className="h-4.5 w-4.5" /> User Inbox</TabsTrigger>
            <TabsTrigger value="live-editor" className="rounded-xl px-4 py-2.5 text-xs font-bold gap-1.5"><Sparkles className="h-4.5 w-4.5 text-gold" /> Live Page Editor</TabsTrigger>
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
                <CardDescription>Select actions below to post updates directly to the live website.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4 pt-2">
                <Button onClick={() => { setEditItem(null); setAnnouncementForm({ title: "", message: "", priority: "Medium", status: "Active" }); setActiveDialog("announce"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                  <Plus className="h-4.5 w-4.5" /> Post Announcement
                </Button>
                <Button onClick={() => { setEditItem(null); setEventForm({ title: "", description: "", cover_image: "", event_date: "", category: "Academic", status: "Published" }); setActiveDialog("event"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                  <Plus className="h-4.5 w-4.5" /> Add Campus Event
                </Button>
                <Button onClick={() => { setEditItem(null); setTeacherForm({ name: "", designation: "", subject: "English", qualification: "", experience: "", description: "", image: "" }); setActiveDialog("teacher"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                  <Plus className="h-4.5 w-4.5" /> Add Educator Profile
                </Button>
                <Button onClick={() => { setEditItem(null); setStudentForm({ title: "", name: "", grade: "", reason: "", image: "" }); setActiveDialog("student"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                  <Plus className="h-4.5 w-4.5" /> Award Student Honor
                </Button>
                <Button onClick={() => { setEditItem(null); setGalleryForm({ title: "", description: "", category: "Events", image: "" }); setActiveDialog("gallery"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                  <Plus className="h-4.5 w-4.5" /> Upload to Gallery
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: ANNOUNCEMENTS MANAGER */}
          <TabsContent value="announcements" className="animate-fade-in">
            <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
                <div>
                  <CardTitle className="font-display text-xl text-primary font-bold">Broadcast Bulletins</CardTitle>
                  <CardDescription>Manage recent announcements, school closures, or admission alerts.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => { setEditItem(null); setAnnouncementForm({ title: "", message: "", priority: "Medium", status: "Active" }); setActiveDialog("announce"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add Announcement
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteAll("announcements")} className="rounded-full font-bold gap-1.5">
                    <Trash2 className="h-4.5 w-4.5" /> Delete All
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
                  <CardTitle className="font-display text-xl text-primary font-bold">Campus Events Calendar</CardTitle>
                  <CardDescription>Configure events. Dates in the future will automatically list as 'Upcoming Events'.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => { setEditItem(null); setEventForm({ title: "", description: "", cover_image: "", event_date: "", category: "Academic", status: "Published" }); setActiveDialog("event"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add Event
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteAll("events")} className="rounded-full font-bold gap-1.5">
                    <Trash2 className="h-4.5 w-4.5" /> Delete All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cover</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Timeline Segment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((ev) => {
                      const isUpcoming = new Date(ev.event_date) > new Date();
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
                          <TableCell className="font-semibold">{ev.title}</TableCell>
                          <TableCell>{ev.event_date}</TableCell>
                          <TableCell>{ev.category}</TableCell>
                          <TableCell>
                            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              isUpcoming ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                            }`}>{isUpcoming ? "Upcoming" : "Latest Event"}</span>
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
                  <CardTitle className="font-display text-xl text-primary font-bold">Faculty Management</CardTitle>
                  <CardDescription>Add, modify, or remove teachers appearing in the Faculty Directory.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => { setEditItem(null); setTeacherForm({ name: "", designation: "", subject: "English", qualification: "", experience: "", description: "", image: "" }); setActiveDialog("teacher"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add Educator
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteAll("teachers")} className="rounded-full font-bold gap-1.5">
                    <Trash2 className="h-4.5 w-4.5" /> Delete All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Photo</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teachers.map((teach) => (
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
                        <TableCell className="font-semibold">{teach.name}</TableCell>
                        <TableCell>{teach.designation}</TableCell>
                        <TableCell>{teach.subject}</TableCell>
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
                  <CardTitle className="font-display text-xl text-primary font-bold">Best Student Awards</CardTitle>
                  <CardDescription>Nominate Best Students of the month or review outstanding academic/volunteering character awards.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={startAddBestStudent} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Nominate Student
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteAll("student-achievements")} className="rounded-full font-bold gap-1.5">
                    <Trash2 className="h-4.5 w-4.5" /> Delete All
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
                  <CardTitle className="font-display text-xl text-primary font-bold">Results & Achievements</CardTitle>
                  <CardDescription>Configure state board toppers, subject centum holders, or zonal sports achievements.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={startAddResultAchievement} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add Result/Achievement
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteAll("student-achievements")} className="rounded-full font-bold gap-1.5">
                    <Trash2 className="h-4.5 w-4.5" /> Delete All
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
                  <CardTitle className="font-display text-xl text-primary font-bold">School Uniform Standards</CardTitle>
                  <CardDescription>Manage daily uniforms dress code and footwear specifications by grade level.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={startAddUniform} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add Uniform Rule
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteAll("school-uniforms")} className="rounded-full font-bold gap-1.5">
                    <Trash2 className="h-4.5 w-4.5" /> Delete All
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
                  <CardTitle className="font-display text-xl text-primary font-bold">School Houses</CardTitle>
                  <CardDescription>Monitor school houses mottos, color code tags, and current sports/extra-curricular points.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={startAddHouse} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add House
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteAll("student-houses")} className="rounded-full font-bold gap-1.5">
                    <Trash2 className="h-4.5 w-4.5" /> Delete All
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
                  <CardTitle className="font-display text-xl text-primary font-bold">Student Council Leaders</CardTitle>
                  <CardDescription>Nominate Student Captains, Head Boy / Head Girl, and track role assignments.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={startAddLeader} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Add Nominee
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteAll("student-leaders")} className="rounded-full font-bold gap-1.5">
                    <Trash2 className="h-4.5 w-4.5" /> Delete All
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

          {/* TAB 6: GALLERY MANAGER */}
          <TabsContent value="gallery" className="animate-fade-in">
            <Card className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
                <div>
                  <CardTitle className="font-display text-xl text-primary font-bold">Media Library Manager</CardTitle>
                  <CardDescription>Delete or upload photos shown in the Photo Gallery page grid.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => { setEditItem(null); setGalleryForm({ title: "", description: "", category: "Events", image: "" }); setActiveDialog("gallery"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                    <Plus className="h-4.5 w-4.5" /> Upload Photo
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteAll("gallery-images")} className="rounded-full font-bold gap-1.5">
                    <Trash2 className="h-4.5 w-4.5" /> Delete All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {galleryImages.map((img) => (
                    <div key={img.id} className="relative group rounded-xl overflow-hidden border border-border aspect-square bg-card shadow-sm hover:border-gold transition duration-200">
                      <img src={img.image} alt={img.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-150 flex flex-col justify-between p-3 text-white">
                        <div className="text-[10px] font-bold text-gold uppercase">{img.category}</div>
                        <div className="text-xs font-semibold truncate">{img.title || "No Title"}</div>
                        <Button size="icon" variant="destructive" className="h-8 w-8 mt-2 mx-auto rounded-full" onClick={() => handleDelete("gallery-images", img.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {galleryImages.length === 0 && (
                    <div className="col-span-full text-center text-muted-foreground py-16 bg-muted/10 border rounded-2xl">
                      No media files uploaded yet. Add photos above!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 7: USER SUBMISSIONS VIEWER */}
          <TabsContent value="submissions" className="animate-fade-in">
            <Tabs defaultValue="admissions" className="space-y-6">
              <TabsList className="bg-muted border p-1 rounded-xl flex gap-1 h-auto w-fit">
                <TabsTrigger value="admissions" className="rounded-lg px-4 py-2 text-xs font-bold gap-1.5"><FileText className="h-4 w-4" /> Admission Inquiries</TabsTrigger>
                <TabsTrigger value="contacts" className="rounded-lg px-4 py-2 text-xs font-bold gap-1.5"><MessageSquare className="h-4 w-4" /> Contact Forms</TabsTrigger>
                <TabsTrigger value="jobs" className="rounded-lg px-4 py-2 text-xs font-bold gap-1.5"><Briefcase className="h-4 w-4" /> Job Applications</TabsTrigger>
              </TabsList>

              {/* Admission Queries */}
              <TabsContent value="admissions" className="animate-fade-in">
                <Card className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display text-lg font-bold text-primary">Admission Inquiries</h3>
                    <div className="flex gap-2">
                      <Button onClick={startAddAdmission} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs py-1 h-8">
                        <Plus className="h-3.5 w-3.5" /> Create Inquiry
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteAll("admission-queries")} className="rounded-full font-bold gap-1.5 text-xs py-1 h-8">
                        <Trash2 className="h-3.5 w-3.5" /> Delete All
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
                    <h3 className="font-display text-lg font-bold text-primary">Contact Messages</h3>
                    <div className="flex gap-2">
                      <Button onClick={startAddContact} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs py-1 h-8">
                        <Plus className="h-3.5 w-3.5" /> Create Message
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteAll("contact-messages")} className="rounded-full font-bold gap-1.5 text-xs py-1 h-8">
                        <Trash2 className="h-3.5 w-3.5" /> Delete All
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
                    <h3 className="font-display text-lg font-bold text-primary">Job Applications</h3>
                    <div className="flex gap-2">
                      <Button onClick={startAddJob} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs py-1 h-8">
                        <Plus className="h-3.5 w-3.5" /> Create Application
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteAll("job-applications")} className="rounded-full font-bold gap-1.5 text-xs py-1 h-8">
                        <Trash2 className="h-3.5 w-3.5" /> Delete All
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
                      { id: "teachers", text: "Faculty List", icon: <Users className="h-4 w-4" /> },
                      { id: "gallery", text: "Gallery Grid", icon: <ImageIcon className="h-4 w-4" /> },
                      { id: "students", text: "Honors Board", icon: <Trophy className="h-4 w-4" /> },
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
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteAll("announcements")} className="rounded-full font-bold gap-1">
                          <Trash2 className="h-3.5 w-3.5" /> Delete All
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

              {editorPage === "teachers" && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-primary">Faculty Directory</h3>
                      <p className="text-xs text-muted-foreground">Hover over educator cards to reveal tilt and holographic shine effects!</p>
                    </div>
                    <Button onClick={() => { setEditItem(null); setTeacherForm({ name: "", designation: "", subject: "English", qualification: "", experience: "", description: "", image: "" }); setActiveDialog("teacher"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                      <Plus className="h-4.5 w-4.5" /> Add Educator Profile
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-4 justify-items-center">
                    {teachers.map((teach) => (
                      <div key={teach.id} className="relative group/card w-full max-w-[280px]">
                        <ProfileCard
                          name={teach.name}
                          title={teach.designation}
                          handle={teach.name.toLowerCase().replace(/[^a-z]/g, "")}
                          status={`${teach.experience} Exp · ${teach.subject}`}
                          avatarUrl={teach.image || "https://picsum.photos/600/400?random=20"}
                          behindGlowEnabled={true}
                          behindGlowColor="rgba(212, 175, 55, 0.4)"
                          behindGlowSize="45%"
                          contactText="Details"
                          innerGradient="linear-gradient(145deg, rgba(36, 52, 36, 0.85) 0%, rgba(111, 143, 114, 0.45) 100%)"
                          className="w-full shadow-md"
                        />
                        
                        {/* Floating Admin Controls Overlay */}
                        <div className="absolute top-3 right-3 z-30 flex gap-1.5 bg-black/70 backdrop-blur-sm p-1 rounded-full border border-white/10 shadow-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-white hover:bg-gold/30 hover:text-gold rounded-full" onClick={() => startEditTeacher(teach)}>
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:bg-red-600/30 hover:text-red-500 rounded-full" onClick={() => handleDelete("teachers", teach.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {teachers.length === 0 && (
                      <div className="col-span-full text-center text-muted-foreground py-16 w-full">
                        No faculty members currently added. Add some using the button above!
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

              {editorPage === "students" && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-primary">Student Honors & Achievements</h3>
                      <p className="text-xs text-muted-foreground">Manage student nominations, monthly best student lists, and sports trophies.</p>
                    </div>
                    <Button onClick={() => { setEditItem(null); setStudentForm({ title: "", name: "", grade: "", reason: "", image: "" }); setActiveDialog("student"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5">
                      <Plus className="h-4.5 w-4.5" /> Award Student Honor
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    {bestStudents.map((stud) => {
                      const parts = stud.title.split(" - ");
                      const awardTitle = parts[0] || "Student Honor";
                      const nameWithGrade = parts[1] || "";
                      const nameParts = nameWithGrade.split(" (");
                      const name = nameParts[0] || stud.title;
                      const grade = nameParts[1] ? nameParts[1].replace(")", "") : "";
                      
                      return (
                        <div key={stud.id} className="relative rounded-2xl border border-border bg-card p-5 shadow-sm flex gap-4 group/item hover:border-gold/60 transition duration-300">
                          {stud.image ? (
                            <div className="h-16 w-16 rounded-full shrink-0 bg-cover bg-center border border-border" style={{ backgroundImage: `url(${stud.image})` }} />
                          ) : (
                            <div className="h-16 w-16 rounded-full shrink-0 border border-gold/25 bg-gold/10 flex items-center justify-center text-gold">
                              <Trophy className="h-6 w-6" />
                            </div>
                          )}
                          <div className="flex-1 space-y-1">
                            <span className="text-[9px] uppercase tracking-wider font-bold text-gold">{awardTitle}</span>
                            <h4 className="font-display font-bold text-base text-primary leading-tight">{name}</h4>
                            {grade && <p className="text-xs font-semibold text-muted-foreground">Class: {grade}</p>}
                            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{stud.description}</p>
                            
                            <div className="flex gap-2 justify-end pt-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                              <Button size="icon" variant="ghost" className="h-7 w-7 text-primary hover:bg-gold/20" onClick={() => startEditStudent(stud)}>
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600 hover:bg-red-50" onClick={() => handleDelete("student-achievements", stud.id)}>
                                <Trash2 className="h-3.5 w-3.5" />
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
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-primary">School Uniform Standards</h3>
                      <p className="text-xs text-muted-foreground">Manage uniform sections, boys/girls guidelines, and dress codes.</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => { setEditItem(null); setUniformForm({ section: "", boys_uniform: "", girls_uniform: "" }); setActiveDialog("uniform"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs py-1 h-8">
                        <Plus className="h-3.5 w-3.5" /> Add Uniform Rule
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteAll("school-uniforms")} className="rounded-full font-bold gap-1.5 text-xs py-1 h-8">
                        <Trash2 className="h-3.5 w-3.5" /> Delete All
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    {uniforms.map((uni) => (
                      <div key={uni.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm relative group/item hover:border-gold/60 transition duration-300">
                        <h4 className="font-display font-bold text-base text-primary mb-3">{uni.section}</h4>
                        <div className="space-y-2 text-xs text-muted-foreground">
                          <p><strong className="text-foreground">Boys:</strong> {uni.boys_uniform}</p>
                          <p><strong className="text-foreground">Girls:</strong> {uni.girls_uniform}</p>
                        </div>
                        <div className="flex gap-2 justify-end pt-4 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-primary hover:bg-gold/20" onClick={() => startEditUniform(uni)}>
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600 hover:bg-red-50" onClick={() => handleDelete("school-uniforms", uni.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
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
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-primary">School House System</h3>
                      <p className="text-xs text-muted-foreground">Update house mottos, color codes, descriptions, and current scoreboard points.</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => { setEditItem(null); setHouseForm({ name: "", motto: "", color_code: "bg-red-500", description: "", points: 0 }); setActiveDialog("house"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs py-1 h-8">
                        <Plus className="h-3.5 w-3.5" /> Add House
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteAll("student-houses")} className="rounded-full font-bold gap-1.5 text-xs py-1 h-8">
                        <Trash2 className="h-3.5 w-3.5" /> Delete All
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                    {houses.map((house) => (
                      <div key={house.id} className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm relative group/item hover:border-gold/60 transition duration-300 animate-fade-in">
                        <div className="flex justify-center mb-4">
                          <div className={`h-12 w-12 rounded-full ${house.color_code || 'bg-slate-400'} flex items-center justify-center shadow-sm text-white font-bold text-lg`}>
                            {house.name.charAt(0)}
                          </div>
                        </div>
                        <h4 className="font-display font-bold text-base text-primary mb-1">{house.name}</h4>
                        <p className="text-[10px] uppercase tracking-wider text-gold font-bold mb-2">Motto: {house.motto}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed h-12 overflow-hidden text-ellipsis mb-3">{house.description}</p>
                        <div className="bg-primary/5 text-primary rounded-lg py-1.5 px-3 font-semibold text-xs inline-block">
                          Points: <span className="font-bold text-gold">{house.points}</span>
                        </div>
                        <div className="flex gap-1.5 justify-center pt-4 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-primary hover:bg-gold/20" onClick={() => startEditHouse(house)}>
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600 hover:bg-red-50" onClick={() => handleDelete("student-houses", house.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {houses.length === 0 && (
                      <div className="col-span-full text-center text-muted-foreground py-16">
                        No houses seeded. Click 'Add House' to populate.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {editorPage === "leaders" && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-primary">Student Council & Leaders</h3>
                      <p className="text-xs text-muted-foreground">Manage student captains, Head Boy/Head Girl nominations, and role assignments.</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => { setEditItem(null); setLeaderForm({ role: "", name: "", grade: "" }); setActiveDialog("leader"); }} className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-95 gap-1.5 text-xs py-1 h-8">
                        <Plus className="h-3.5 w-3.5" /> Add Leader
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteAll("student-leaders")} className="rounded-full font-bold gap-1.5 text-xs py-1 h-8">
                        <Trash2 className="h-3.5 w-3.5" /> Delete All
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {leaders.map((lead) => (
                      <div key={lead.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm relative group/item hover:border-gold/60 transition duration-300">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gold/15 flex items-center justify-center text-gold font-bold">
                            <Users className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-wider font-bold text-gold">{lead.role}</span>
                            <h4 className="font-display font-bold text-base text-primary leading-tight">{lead.name}</h4>
                            <p className="text-xs text-muted-foreground mt-0.5">{lead.grade}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end pt-4 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-primary hover:bg-gold/20" onClick={() => startEditLeader(lead)}>
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600 hover:bg-red-50" onClick={() => handleDelete("student-leaders", lead.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {leaders.length === 0 && (
                      <div className="col-span-full text-center text-muted-foreground py-16">
                        No student council leaders registered yet. Click 'Add Leader' to nominate!
                      </div>
                    )}
                  </div>
                </div>
              )}

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
                  <SelectContent>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Annual Day">Annual Day</SelectItem>
                    <SelectItem value="Celebration">Celebration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Cover Image Upload</Label>
              <div className="flex gap-3">
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "event")} />
                {eventForm.cover_image && <div className="h-10 w-10 shrink-0 border rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${eventForm.cover_image})` }} />}
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
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Subject Stream</Label>
              <Select value={teacherForm.subject} onValueChange={(val) => setTeacherForm(prev => ({ ...prev, subject: val }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Languages">Languages</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="t-desc" className="text-xs uppercase tracking-wide text-muted-foreground">Educational Philosophy / Bio</Label>
              <Textarea id="t-desc" value={teacherForm.description} onChange={(e) => setTeacherForm(prev => ({ ...prev, description: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Avatar / Profile Photo</Label>
              <div className="flex gap-3">
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "teacher")} />
                {teacherForm.image && <div className="h-10 w-10 shrink-0 border rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${teacherForm.image})` }} />}
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
              Submit details for Best Students, Board Toppers, or Sports Achievements.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleStudentSubmit} className="space-y-4 pt-3">
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Category</Label>
              <Select 
                value={achievementCategory} 
                onValueChange={(val) => {
                  setAchievementCategory(val as any);
                  // Update default placeholder titles if adding
                  if (!editItem) {
                    if (val === "best_student") {
                      setStudentForm(prev => ({ ...prev, title: "Best Student of the Month" }));
                    } else if (val === "board_topper") {
                      setStudentForm(prev => ({ ...prev, title: "State Rank 1st" }));
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
                  <SelectItem value="board_topper">Board Topper (Academic Result)</SelectItem>
                  <SelectItem value="sports">Sports & Other Achievement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="s-title" className="text-xs uppercase tracking-wide text-muted-foreground">
                {achievementCategory === "best_student" && "Award Title"}
                {achievementCategory === "board_topper" && "Topper Rank / Title"}
                {achievementCategory === "sports" && "Event Name / Championship"}
              </Label>
              <Input 
                id="s-title" 
                placeholder={
                  achievementCategory === "best_student" ? "e.g. Best Student of the Month" :
                  achievementCategory === "board_topper" ? "e.g. State Rank 1st" :
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
                {studentForm.image && <div className="h-10 w-10 shrink-0 border rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${studentForm.image})` }} />}
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

      {/* 5. Gallery Dialog */}
      <Dialog open={activeDialog === "gallery"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "gallery" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">Add Photo to Gallery</DialogTitle>
            <DialogDescription>Select categorised photos to show in the media archive grid.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleGallerySubmit} className="space-y-4 pt-3">
            <div className="space-y-1">
              <Label htmlFor="g-title" className="text-xs uppercase tracking-wide text-muted-foreground">Photo Title</Label>
              <Input id="g-title" value={galleryForm.title} onChange={(e) => setGalleryForm(prev => ({ ...prev, title: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="g-desc" className="text-xs uppercase tracking-wide text-muted-foreground">Description</Label>
              <Textarea id="g-desc" value={galleryForm.description} onChange={(e) => setGalleryForm(prev => ({ ...prev, description: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Category Block</Label>
              <Select value={galleryForm.category} onValueChange={(val) => setGalleryForm(prev => ({ ...prev, category: val }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Academics">Campus / Academics</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Celebrations">Celebrations</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Image File</Label>
              <div className="flex gap-3">
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "gallery")} required={!editItem} />
                {galleryForm.image && <div className="h-10 w-10 shrink-0 border rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${galleryForm.image})` }} />}
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">Add to Archives</Button>
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
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">{editItem ? "Edit House Details" : "Create School House"}</DialogTitle>
            <DialogDescription>Modify house details, mottos, and accumulated scoreboard points.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleHouseSubmit} className="space-y-4 pt-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="house-name" className="text-xs uppercase tracking-wide text-muted-foreground">House Name</Label>
                <Input id="house-name" value={houseForm.name} onChange={(e) => setHouseForm(prev => ({ ...prev, name: e.target.value }))} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="house-motto" className="text-xs uppercase tracking-wide text-muted-foreground">Motto</Label>
                <Input id="house-motto" value={houseForm.motto} onChange={(e) => setHouseForm(prev => ({ ...prev, motto: e.target.value }))} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Color Badge Code</Label>
                <Select value={houseForm.color_code} onValueChange={(val) => setHouseForm(prev => ({ ...prev, color_code: val }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-red-500">Red (bg-red-500)</SelectItem>
                    <SelectItem value="bg-blue-500">Blue (bg-blue-500)</SelectItem>
                    <SelectItem value="bg-emerald-500">Green (bg-emerald-500)</SelectItem>
                    <SelectItem value="bg-amber-500">Gold (bg-amber-500)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="house-pts" className="text-xs uppercase tracking-wide text-muted-foreground">Scoreboard Points</Label>
                <Input id="house-pts" type="number" value={houseForm.points} onChange={(e) => setHouseForm(prev => ({ ...prev, points: parseInt(e.target.value, 10) || 0 }))} required />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="house-desc" className="text-xs uppercase tracking-wide text-muted-foreground">Description / Focus</Label>
              <Textarea id="house-desc" value={houseForm.description} onChange={(e) => setHouseForm(prev => ({ ...prev, description: e.target.value }))} required />
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">Save House Details</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 11. Student Leader Dialog */}
      <Dialog open={activeDialog === "leader"} onOpenChange={(open) => { if (!open) setEditItem(null); setActiveDialog(open ? "leader" : null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-card border border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary font-bold">{editItem ? "Edit Student Leader" : "Nominate Student Leader"}</DialogTitle>
            <DialogDescription>Assign a role in the school student council.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLeaderSubmit} className="space-y-4 pt-3">
            <div className="space-y-1">
              <Label htmlFor="lead-role" className="text-xs uppercase tracking-wide text-muted-foreground">Council Role</Label>
              <Input id="lead-role" placeholder="e.g. School Head Boy / Sports Captain" value={leaderForm.role} onChange={(e) => setLeaderForm(prev => ({ ...prev, role: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="lead-name" className="text-xs uppercase tracking-wide text-muted-foreground">Student Name</Label>
                <Input id="lead-name" value={leaderForm.name} onChange={(e) => setLeaderForm(prev => ({ ...prev, name: e.target.value }))} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lead-grade" className="text-xs uppercase tracking-wide text-muted-foreground">Grade / Class</Label>
                <Input id="lead-grade" placeholder="e.g. Class XII - Science" value={leaderForm.grade} onChange={(e) => setLeaderForm(prev => ({ ...prev, grade: e.target.value }))} required />
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="rounded-full bg-gradient-gold text-navy-deep font-bold px-8 shadow-gold">Save Nominee</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
