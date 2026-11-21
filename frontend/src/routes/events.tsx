import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { PageHeader } from "@/components/PageHeader";
import { API_BASE } from "@/config";
import {
  Calendar as CalendarIcon,
  Sparkles,
  BookOpen,
  GraduationCap,
  CalendarDays,
  Clock,
  ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Academic Calendar 2026–2027 — Brotherhood School" },
      {
        name: "description",
        content:
          "Official School Academic Calendar for 2026–2027: examinations, holidays, field trips, cultural celebrations, and activities for Brotherhood Matriculation Higher Secondary School.",
      },
    ],
  }),
  component: AcademicCalendarPage,
});

export interface CalendarEvent {
  id: string;
  month: string; // e.g. "June 2026"
  monthShort: string; // e.g. "JUN"
  date: string; // e.g. "June 1"
  dayNum: string; // e.g. "01"
  day: string; // e.g. "Monday"
  events: string;
  category: "Reopening" | "Holiday" | "Exam" | "Celebration" | "Field Trip" | "Activity" | "Competition" | "Workshop" | "Meeting";
}

export const ACADEMIC_CALENDAR_DATA: { month: string; short: string; term: string; events: CalendarEvent[] }[] = [
  {
    month: "June 2026",
    short: "JUN '26",
    term: "Term I",
    events: [
      { id: "jun-1", month: "June 2026", monthShort: "JUN", date: "June 1", dayNum: "01", day: "Monday", events: "School Reopens for I to XII", category: "Reopening" },
      { id: "jun-2", month: "June 2026", monthShort: "JUN", date: "June 8", dayNum: "08", day: "Monday", events: "Reopening for KG", category: "Reopening" },
      { id: "jun-3", month: "June 2026", monthShort: "JUN", date: "June 13", dayNum: "13", day: "Saturday", events: "Holiday", category: "Holiday" },
      { id: "jun-4", month: "June 2026", monthShort: "JUN", date: "June 20", dayNum: "20", day: "Saturday", events: "Investiture Ceremony", category: "Celebration" },
      { id: "jun-5", month: "June 2026", monthShort: "JUN", date: "June 22", dayNum: "22", day: "Monday", events: "Monthly Test for X to XII", category: "Exam" },
      { id: "jun-6", month: "June 2026", monthShort: "JUN", date: "June 26", dayNum: "26", day: "Friday", events: "Moharam – Holiday", category: "Holiday" },
      { id: "jun-7", month: "June 2026", monthShort: "JUN", date: "June 27", dayNum: "27", day: "Saturday", events: "Field Trip (Std XI & XII)", category: "Field Trip" },
      { id: "jun-8", month: "June 2026", monthShort: "JUN", date: "June 29", dayNum: "29", day: "Monday", events: "Activity (I to V)", category: "Activity" },
      { id: "jun-9", month: "June 2026", monthShort: "JUN", date: "June 30", dayNum: "30", day: "Tuesday", events: "Activity (VI to IX)", category: "Activity" },
    ],
  },
  {
    month: "July 2026",
    short: "JUL '26",
    term: "Term I",
    events: [
      { id: "jul-1", month: "July 2026", monthShort: "JUL", date: "July 4", dayNum: "04", day: "Saturday", events: "Field Trip (IX & X)", category: "Field Trip" },
      { id: "jul-2", month: "July 2026", monthShort: "JUL", date: "July 10", dayNum: "10", day: "Friday", events: "Field Trip (LKG to V)", category: "Field Trip" },
      { id: "jul-3", month: "July 2026", monthShort: "JUL", date: "July 11", dayNum: "11", day: "Saturday", events: "Holiday", category: "Holiday" },
      { id: "jul-4", month: "July 2026", monthShort: "JUL", date: "July 15", dayNum: "15", day: "Wednesday", events: "Kamaraj's Birthday & Tamil Ilakkiya Mantram", category: "Celebration" },
      { id: "jul-5", month: "July 2026", monthShort: "JUL", date: "July 16", dayNum: "16", day: "Thursday", events: "I Mid-Term Test (VI to XII)", category: "Exam" },
      { id: "jul-6", month: "July 2026", monthShort: "JUL", date: "July 20", dayNum: "20", day: "Monday", events: "Monthly Test (I to V)", category: "Exam" },
      { id: "jul-7", month: "July 2026", monthShort: "JUL", date: "July 22", dayNum: "22", day: "Wednesday", events: "School Tour for LKG & UKG", category: "Field Trip" },
      { id: "jul-8", month: "July 2026", monthShort: "JUL", date: "July 25", dayNum: "25", day: "Saturday", events: "Field Trip (VI & VIII) / Spellathon & Calligraphy Competition (I to V)", category: "Competition" },
      { id: "jul-9", month: "July 2026", monthShort: "JUL", date: "July 28", dayNum: "28", day: "Tuesday", events: "World Natural Conservation Day", category: "Celebration" },
      { id: "jul-10", month: "July 2026", monthShort: "JUL", date: "July 31", dayNum: "31", day: "Friday", events: "Health Checkup / Show and Tell Activity (KG)", category: "Activity" },
    ],
  },
  {
    month: "August 2026",
    short: "AUG '26",
    term: "Term I",
    events: [
      { id: "aug-1", month: "August 2026", monthShort: "AUG", date: "August 6", dayNum: "06", day: "Thursday", events: "Workshop (XI–XII)", category: "Workshop" },
      { id: "aug-2", month: "August 2026", monthShort: "AUG", date: "August 8", dayNum: "08", day: "Saturday", events: "Holiday", category: "Holiday" },
      { id: "aug-3", month: "August 2026", monthShort: "AUG", date: "August 11", dayNum: "11", day: "Tuesday", events: "Independence Day Activity", category: "Activity" },
      { id: "aug-4", month: "August 2026", monthShort: "AUG", date: "August 13", dayNum: "13", day: "Thursday", events: "Workshop (IX–X)", category: "Workshop" },
      { id: "aug-5", month: "August 2026", monthShort: "AUG", date: "August 15", dayNum: "15", day: "Saturday", events: "Independence Day", category: "Celebration" },
      { id: "aug-6", month: "August 2026", monthShort: "AUG", date: "August 17", dayNum: "17", day: "Monday", events: "Monthly Test (VI & XII)", category: "Exam" },
      { id: "aug-7", month: "August 2026", monthShort: "AUG", date: "August 19", dayNum: "19", day: "Wednesday", events: "World Photography Day", category: "Celebration" },
      { id: "aug-8", month: "August 2026", monthShort: "AUG", date: "August 21", dayNum: "21", day: "Friday", events: "Colours Day (LKG & UKG)", category: "Celebration" },
      { id: "aug-9", month: "August 2026", monthShort: "AUG", date: "August 24", dayNum: "24", day: "Monday", events: "Monthly Test (I & V) / Evaluation – KG", category: "Exam" },
      { id: "aug-10", month: "August 2026", monthShort: "AUG", date: "August 26", dayNum: "26", day: "Wednesday", events: "Milad Nabi – Holiday", category: "Holiday" },
      { id: "aug-11", month: "August 2026", monthShort: "AUG", date: "August 28", dayNum: "28", day: "Friday", events: "Annual Day", category: "Celebration" },
      { id: "aug-12", month: "August 2026", monthShort: "AUG", date: "August 29", dayNum: "29", day: "Saturday", events: "Sports Day", category: "Celebration" },
    ],
  },
  {
    month: "September 2026",
    short: "SEP '26",
    term: "Term I",
    events: [
      { id: "sep-1", month: "September 2026", monthShort: "SEP", date: "September 1", dayNum: "01", day: "Tuesday", events: "Workshop (VI–VIII) / Pre-quarterly Exam (X & XII)", category: "Exam" },
      { id: "sep-2", month: "September 2026", monthShort: "SEP", date: "September 2", dayNum: "02", day: "Wednesday", events: "Colour Splash Competition (LKG & UKG)", category: "Competition" },
      { id: "sep-3", month: "September 2026", monthShort: "SEP", date: "September 4", dayNum: "04", day: "Friday", events: "Krishna Jayanthi – Holiday", category: "Holiday" },
      { id: "sep-4", month: "September 2026", monthShort: "SEP", date: "September 5", dayNum: "05", day: "Saturday", events: "Teacher's Day", category: "Celebration" },
      { id: "sep-5", month: "September 2026", monthShort: "SEP", date: "September 8", dayNum: "08", day: "Tuesday", events: "International Literacy Day & English Literary Club", category: "Celebration" },
      { id: "sep-6", month: "September 2026", monthShort: "SEP", date: "September 9", dayNum: "09", day: "Wednesday", events: "Colour Splash Competition (I–V)", category: "Competition" },
      { id: "sep-7", month: "September 2026", monthShort: "SEP", date: "September 11", dayNum: "11", day: "Friday", events: "Grand Parents Day", category: "Celebration" },
      { id: "sep-8", month: "September 2026", monthShort: "SEP", date: "September 12", dayNum: "12", day: "Saturday", events: "Holiday", category: "Holiday" },
      { id: "sep-9", month: "September 2026", monthShort: "SEP", date: "September 14", dayNum: "14", day: "Monday", events: "Vinayakar Chathurthi – Holiday", category: "Holiday" },
      { id: "sep-10", month: "September 2026", monthShort: "SEP", date: "September 16", dayNum: "16", day: "Wednesday", events: "Quarterly Exam Begins (I–V)", category: "Exam" },
      { id: "sep-11", month: "September 2026", monthShort: "SEP", date: "September 18", dayNum: "18", day: "Friday", events: "Founder's Day & Quarterly Exam Begins (VI–XII)", category: "Exam" },
      { id: "sep-12", month: "September 2026", monthShort: "SEP", date: "September 21", dayNum: "21", day: "Monday", events: "International Day of Peace", category: "Celebration" },
      { id: "sep-13", month: "September 2026", monthShort: "SEP", date: "September 24", dayNum: "24", day: "Thursday", events: "Quarterly Exam Ends (I–V)", category: "Exam" },
      { id: "sep-14", month: "September 2026", monthShort: "SEP", date: "September 26", dayNum: "26", day: "Saturday", events: "Quarterly Exam Ends (VI–XII)", category: "Exam" },
      { id: "sep-15", month: "September 2026", monthShort: "SEP", date: "September 28", dayNum: "28", day: "Monday", events: "Std IX to XII Excursion", category: "Field Trip" },
    ],
  },
  {
    month: "October 2026",
    short: "OCT '26",
    term: "Term II",
    events: [
      { id: "oct-1", month: "October 2026", monthShort: "OCT", date: "October 1", dayNum: "01", day: "Thursday", events: "Gandhi Jayanthi – Holiday", category: "Holiday" },
      { id: "oct-2", month: "October 2026", monthShort: "OCT", date: "October 5", dayNum: "05", day: "Monday", events: "School Reopens for Term – II", category: "Reopening" },
      { id: "oct-3", month: "October 2026", monthShort: "OCT", date: "October 6", dayNum: "06", day: "Tuesday", events: "Story Telling Competition (LKG & UKG)", category: "Competition" },
      { id: "oct-4", month: "October 2026", monthShort: "OCT", date: "October 10", dayNum: "10", day: "Saturday", events: "Open Day for Term – I", category: "Meeting" },
      { id: "oct-5", month: "October 2026", monthShort: "OCT", date: "October 15", dayNum: "15", day: "Thursday", events: "Dr. Abdul Kalam's Birthday", category: "Celebration" },
      { id: "oct-6", month: "October 2026", monthShort: "OCT", date: "October 16", dayNum: "16", day: "Friday", events: "World Food Day", category: "Celebration" },
      { id: "oct-7", month: "October 2026", monthShort: "OCT", date: "October 19", dayNum: "19", day: "Monday", events: "Ayutha Pooja – Holiday", category: "Holiday" },
      { id: "oct-8", month: "October 2026", monthShort: "OCT", date: "October 20", dayNum: "20", day: "Tuesday", events: "Vijaya Dasami – Holiday", category: "Holiday" },
      { id: "oct-9", month: "October 2026", monthShort: "OCT", date: "October 26", dayNum: "26", day: "Monday", events: "Monthly Test Begins (VI to XII)", category: "Exam" },
    ],
  },
  {
    month: "November 2026",
    short: "NOV '26",
    term: "Term II",
    events: [
      { id: "nov-1", month: "November 2026", monthShort: "NOV", date: "November 2", dayNum: "02", day: "Monday", events: "Children's Day Competition (KG–V)", category: "Competition" },
      { id: "nov-2", month: "November 2026", monthShort: "NOV", date: "November 8", dayNum: "08", day: "Sunday", events: "Deepavali – Holiday", category: "Holiday" },
      { id: "nov-3", month: "November 2026", monthShort: "NOV", date: "November 11", dayNum: "11", day: "Wednesday", events: "II Mid-Term Test (VI to XII), Monthly Test (I–V), Evaluation (KG)", category: "Exam" },
      { id: "nov-4", month: "November 2026", monthShort: "NOV", date: "November 13", dayNum: "13", day: "Friday", events: "Children's Day Celebration", category: "Celebration" },
      { id: "nov-5", month: "November 2026", monthShort: "NOV", date: "November 14", dayNum: "14", day: "Saturday", events: "Food Carnival", category: "Celebration" },
      { id: "nov-6", month: "November 2026", monthShort: "NOV", date: "November 17", dayNum: "17", day: "Tuesday", events: "International Students Day / II Mid-Term Test (VI–XII)", category: "Exam" },
      { id: "nov-7", month: "November 2026", monthShort: "NOV", date: "November 20", dayNum: "20", day: "Friday", events: "Activity (KG to V)", category: "Activity" },
      { id: "nov-8", month: "November 2026", monthShort: "NOV", date: "November 26", dayNum: "26", day: "Thursday", events: "Constitution Day / Social Science Association", category: "Celebration" },
      { id: "nov-9", month: "November 2026", monthShort: "NOV", date: "November 27", dayNum: "27", day: "Friday", events: "Activity (VI to VIII)", category: "Activity" },
      { id: "nov-10", month: "November 2026", monthShort: "NOV", date: "November 28", dayNum: "28", day: "Saturday", events: "Inter House Cultural", category: "Competition" },
    ],
  },
  {
    month: "December 2026",
    short: "DEC '26",
    term: "Term II",
    events: [
      { id: "dec-1", month: "December 2026", monthShort: "DEC", date: "December 2", dayNum: "02", day: "Wednesday", events: "National Pollution Control Day", category: "Celebration" },
      { id: "dec-2", month: "December 2026", monthShort: "DEC", date: "December 4", dayNum: "04", day: "Friday", events: "One Mark Test (X to XII)", category: "Exam" },
      { id: "dec-3", month: "December 2026", monthShort: "DEC", date: "December 5", dayNum: "05", day: "Saturday", events: "Christmas Programme & Annual Day", category: "Celebration" },
      { id: "dec-4", month: "December 2026", monthShort: "DEC", date: "December 11", dayNum: "11", day: "Friday", events: "Card Making Activity (I to V)", category: "Activity" },
      { id: "dec-5", month: "December 2026", monthShort: "DEC", date: "December 12", dayNum: "12", day: "Saturday", events: "Holiday", category: "Holiday" },
      { id: "dec-6", month: "December 2026", monthShort: "DEC", date: "December 14", dayNum: "14", day: "Monday", events: "Half Yearly Exam Begins (I to XII)", category: "Exam" },
      { id: "dec-7", month: "December 2026", monthShort: "DEC", date: "December 23", dayNum: "23", day: "Wednesday", events: "Half Yearly Exam Ends (I to XII)", category: "Exam" },
      { id: "dec-8", month: "December 2026", monthShort: "DEC", date: "December 25", dayNum: "25", day: "Friday", events: "Christmas Holiday", category: "Holiday" },
    ],
  },
  {
    month: "January 2027",
    short: "JAN '27",
    term: "Term III",
    events: [
      { id: "jan-1", month: "January 2027", monthShort: "JAN", date: "January 1", dayNum: "01", day: "Friday", events: "New Year Holiday", category: "Holiday" },
      { id: "jan-2", month: "January 2027", monthShort: "JAN", date: "January 4", dayNum: "04", day: "Monday", events: "School Reopens for Term – III", category: "Reopening" },
      { id: "jan-3", month: "January 2027", monthShort: "JAN", date: "January 6", dayNum: "06", day: "Wednesday", events: "Pot Painting (I–III)", category: "Activity" },
      { id: "jan-4", month: "January 2027", monthShort: "JAN", date: "January 7", dayNum: "07", day: "Thursday", events: "I Revision Exam (X to XII) begins, Tamil Evaluation (IV & V)", category: "Exam" },
      { id: "jan-5", month: "January 2027", monthShort: "JAN", date: "January 8", dayNum: "08", day: "Friday", events: "Colouring Competition – KG", category: "Competition" },
      { id: "jan-6", month: "January 2027", monthShort: "JAN", date: "January 9", dayNum: "09", day: "Saturday", events: "Open Day", category: "Meeting" },
      { id: "jan-7", month: "January 2027", monthShort: "JAN", date: "January 14", dayNum: "14", day: "Thursday", events: "Pongal Celebration", category: "Celebration" },
      { id: "jan-8", month: "January 2027", monthShort: "JAN", date: "January 15", dayNum: "15", day: "Friday", events: "Pongal & Thiruvalluvar Day – Holiday", category: "Holiday" },
      { id: "jan-9", month: "January 2027", monthShort: "JAN", date: "January 16", dayNum: "16", day: "Saturday", events: "Uzavar Thirunal – Holiday", category: "Holiday" },
      { id: "jan-10", month: "January 2027", monthShort: "JAN", date: "January 21", dayNum: "21", day: "Thursday", events: "I Revision Exam (X to XII) ends", category: "Exam" },
      { id: "jan-11", month: "January 2027", monthShort: "JAN", date: "January 23", dayNum: "23", day: "Saturday", events: "Thai Poosam – Holiday", category: "Holiday" },
      { id: "jan-12", month: "January 2027", monthShort: "JAN", date: "January 26", dayNum: "26", day: "Tuesday", events: "Republic Day – Holiday", category: "Holiday" },
      { id: "jan-13", month: "January 2027", monthShort: "JAN", date: "January 27", dayNum: "27", day: "Wednesday", events: "II Revision Exam (X to XII) begins", category: "Exam" },
    ],
  },
  {
    month: "February 2027",
    short: "FEB '27",
    term: "Term III",
    events: [
      { id: "feb-1", month: "February 2027", monthShort: "FEB", date: "February 2", dayNum: "02", day: "Tuesday", events: "Class Photograph (KG to XII)", category: "Celebration" },
      { id: "feb-2", month: "February 2027", monthShort: "FEB", date: "February 3", dayNum: "03", day: "Wednesday", events: "II Revision Exam (X to XII) ends", category: "Exam" },
      { id: "feb-3", month: "February 2027", monthShort: "FEB", date: "February 5", dayNum: "05", day: "Friday", events: "Career Guidance Workshop (XI–XII)", category: "Workshop" },
      { id: "feb-4", month: "February 2027", monthShort: "FEB", date: "February 6", dayNum: "06", day: "Saturday", events: "Field Trip (VI to VIII)", category: "Field Trip" },
      { id: "feb-5", month: "February 2027", monthShort: "FEB", date: "February 12", dayNum: "12", day: "Friday", events: "Board Exam Motivational Workshop for X", category: "Workshop" },
      { id: "feb-6", month: "February 2027", monthShort: "FEB", date: "February 13", dayNum: "13", day: "Saturday", events: "Holiday", category: "Holiday" },
      { id: "feb-7", month: "February 2027", monthShort: "FEB", date: "February 15", dayNum: "15", day: "Monday", events: "Monthly Test (I to V) & Evaluation for KG", category: "Exam" },
      { id: "feb-8", month: "February 2027", monthShort: "FEB", date: "February 17", dayNum: "17", day: "Wednesday", events: "III Mid-Term Test (VI to IX)", category: "Exam" },
      { id: "feb-9", month: "February 2027", monthShort: "FEB", date: "February 20", dayNum: "20", day: "Saturday", events: "Farewell Day (XII)", category: "Celebration" },
      { id: "feb-10", month: "February 2027", monthShort: "FEB", date: "February 26", dayNum: "26", day: "Friday", events: "Activity (VI to VIII)", category: "Activity" },
      { id: "feb-11", month: "February 2027", monthShort: "FEB", date: "February 27", dayNum: "27", day: "Saturday", events: "Science Exhibition / Board Exam Preparation (X & XII)", category: "Celebration" },
      { id: "feb-12", month: "February 2027", monthShort: "FEB", date: "February 28", dayNum: "28", day: "Sunday", events: "National Science Day", category: "Celebration" },
    ],
  },
  {
    month: "March 2027",
    short: "MAR '27",
    term: "Term III",
    events: [
      { id: "mar-1", month: "March 2027", monthShort: "MAR", date: "March 1", dayNum: "01", day: "Monday", events: "Prayer Meeting (Board Exam X to XII)", category: "Meeting" },
      { id: "mar-2", month: "March 2027", monthShort: "MAR", date: "March 3", dayNum: "03", day: "Wednesday", events: "III Revision Exam (Std X)", category: "Exam" },
      { id: "mar-3", month: "March 2027", monthShort: "MAR", date: "March 6", dayNum: "06", day: "Saturday", events: "Blue Day", category: "Celebration" },
      { id: "mar-4", month: "March 2027", monthShort: "MAR", date: "March 8", dayNum: "08", day: "Monday", events: "International Women's Day", category: "Celebration" },
      { id: "mar-5", month: "March 2027", monthShort: "MAR", date: "March 10", dayNum: "10", day: "Wednesday", events: "Ramzan – Holiday", category: "Holiday" },
      { id: "mar-6", month: "March 2027", monthShort: "MAR", date: "March 12", dayNum: "12", day: "Friday", events: "Activity (VI to VIII) / Field Trip (LKG to V)", category: "Field Trip" },
      { id: "mar-7", month: "March 2027", monthShort: "MAR", date: "March 13", dayNum: "13", day: "Saturday", events: "Holiday", category: "Holiday" },
      { id: "mar-8", month: "March 2027", monthShort: "MAR", date: "March 15", dayNum: "15", day: "Monday", events: "Annual Exam Begins (LKG & UKG)", category: "Exam" },
      { id: "mar-9", month: "March 2027", monthShort: "MAR", date: "March 23", dayNum: "23", day: "Tuesday", events: "Annual Exam Begins (Std IX)", category: "Exam" },
      { id: "mar-10", month: "March 2027", monthShort: "MAR", date: "March 26", dayNum: "26", day: "Friday", events: "Good Friday – Holiday", category: "Holiday" },
      { id: "mar-11", month: "March 2027", monthShort: "MAR", date: "March 31", dayNum: "31", day: "Wednesday", events: "KG – Graduation Day", category: "Celebration" },
    ],
  },
];

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_SHORTS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function parseEventsToMonthGroups(rawEvents: any[]): { month: string; short: string; term: string; events: CalendarEvent[] }[] {
  // Sort all events chronologically by event_date
  const sorted = [...rawEvents].sort((a, b) => (a.event_date || "").localeCompare(b.event_date || ""));

  const monthMap = new Map<string, { month: string; short: string; term: string; sortKey: number; events: CalendarEvent[] }>();

  sorted.forEach((ev: any) => {
    const dateStr = ev.event_date || "";
    const parts = dateStr.split("-");
    if (parts.length < 3) return;

    const year = parseInt(parts[0], 10);
    const monthIndex = parseInt(parts[1], 10) - 1;
    const dayNum = parseInt(parts[2], 10);
    if (isNaN(year) || isNaN(monthIndex) || isNaN(dayNum)) return;

    const dateObj = new Date(year, monthIndex, dayNum);
    const day = DAYS[dateObj.getDay()] || "Day";
    const monthName = MONTH_NAMES[monthIndex] || "Month";
    const monthShort = MONTH_SHORTS[monthIndex] || "MTH";
    const monthTitle = `${monthName} ${year}`;
    const shortLabel = `${monthShort} '${String(year).slice(-2)}`;

    let term = "Term I";
    if (monthIndex >= 5 && monthIndex <= 8) term = "Term I";
    else if (monthIndex >= 9 && monthIndex <= 11) term = "Term II";
    else term = "Term III";

    // Sort key ensures academic year ordering (June to March)
    const academicMonthOrder = (monthIndex >= 5 ? monthIndex - 5 : monthIndex + 7);
    const sortKey = year * 100 + academicMonthOrder;

    if (!monthMap.has(monthTitle)) {
      monthMap.set(monthTitle, {
        month: monthTitle,
        short: shortLabel,
        term,
        sortKey,
        events: []
      });
    }

    const category = ev.category || "Academic";
    monthMap.get(monthTitle)!.events.push({
      id: String(ev.id || `${year}-${monthIndex}-${dayNum}-${Math.random()}`),
      month: monthTitle,
      monthShort,
      date: `${monthName} ${dayNum}`,
      dayNum: String(dayNum).padStart(2, "0"),
      day,
      events: ev.title + (ev.description && ev.description !== ev.title ? ` – ${ev.description}` : ""),
      category: category as any
    });
  });

  const monthGroups = Array.from(monthMap.values()).sort((a, b) => a.sortKey - b.sortKey);
  return monthGroups.map(({ month, short, term, events }) => ({ month, short, term, events }));
}

export function AcademicCalendarPage() {
  const [dbEvents, setDbEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/events/`)
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(data => {
        const list = Array.isArray(data) ? data : (data.results || []);
        if (list.length > 0) {
          setDbEvents(list);
        }
      })
      .catch(err => {
        console.error("Error loading events from backend API:", err);
      });
  }, []);

  const activeCalendarData = useMemo(() => {
    if (dbEvents.length > 0) {
      return parseEventsToMonthGroups(dbEvents);
    }
    return ACADEMIC_CALENDAR_DATA;
  }, [dbEvents]);

  const totalEventCount = useMemo(() => {
    return activeCalendarData.reduce((acc, curr) => acc + curr.events.length, 0);
  }, [activeCalendarData]);

  const getCategoryBadge = (category: CalendarEvent["category"]) => {
    switch (category) {
      case "Holiday":
        return {
          bg: "bg-rose-50 border-rose-200 text-rose-700",
          dot: "bg-rose-500",
          label: "Holiday",
        };
      case "Exam":
        return {
          bg: "bg-indigo-50 border-indigo-200 text-indigo-700",
          dot: "bg-indigo-500",
          label: "Examination",
        };
      case "Celebration":
        return {
          bg: "bg-amber-50 border-amber-200 text-amber-700",
          dot: "bg-amber-500",
          label: "Celebration",
        };
      case "Field Trip":
        return {
          bg: "bg-cyan-50 border-cyan-200 text-cyan-700",
          dot: "bg-cyan-500",
          label: "Field Trip / Tour",
        };
      case "Competition":
        return {
          bg: "bg-purple-50 border-purple-200 text-purple-700",
          dot: "bg-purple-500",
          label: "Competition",
        };
      case "Workshop":
        return {
          bg: "bg-teal-50 border-teal-200 text-teal-700",
          dot: "bg-teal-500",
          label: "Workshop",
        };
      case "Meeting":
        return {
          bg: "bg-blue-50 border-blue-200 text-blue-700",
          dot: "bg-blue-500",
          label: "Meeting / Open Day",
        };
      case "Reopening":
        return {
          bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
          dot: "bg-emerald-500",
          label: "School Reopening",
        };
      case "Activity":
      default:
        return {
          bg: "bg-emerald-50 border-emerald-200 text-[#1b4d32]",
          dot: "bg-[#1b4d32]",
          label: "Activity",
        };
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <PageHeader
        eyebrow="Academic Year 2026 – 2027"
        title="Academic Calendar"
        subtitle="Complete schedule of reopening dates, monthly & term examinations, celebrations, competitions, educational field trips, and holidays."
      />

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#f7faf8] relative min-h-screen">
        {/* Background ambient accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1b4d32]/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-8 sm:space-y-12">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(10,43,24,0.04)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#6c8274]">Academic Year</span>
                <CalendarDays className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="mt-4">
                <div className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">2026 – 2027</div>
                <div className="text-xs text-[#6c8274] mt-1">10 Scheduled Months</div>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(10,43,24,0.04)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#6c8274]">Term Periods</span>
                <BookOpen className="w-5 h-5 text-[#1b4d32]" />
              </div>
              <div className="mt-4">
                <div className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">3 Terms</div>
                <div className="text-xs text-[#6c8274] mt-1">Jun–Sep · Oct–Dec · Jan–Mar</div>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(10,43,24,0.04)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#6c8274]">Total Events</span>
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="mt-4">
                <div className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">{totalEventCount} Events</div>
                <div className="text-xs text-[#6c8274] mt-1">Tests, Fests &amp; Field Trips</div>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(10,43,24,0.04)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#6c8274]">Board Focus</span>
                <GraduationCap className="w-5 h-5 text-[#1b4d32]" />
              </div>
              <div className="mt-4">
                <div className="font-serif text-2xl sm:text-3xl text-[#0a2b18] font-bold">Std X to XII</div>
                <div className="text-xs text-[#6c8274] mt-1">Revision &amp; Coaching Routine</div>
              </div>
            </div>
          </div>

          {/* Calendar Months Display - All Events Showcased */}
          <div className="space-y-10 sm:space-y-12">
            {activeCalendarData.map((monthGroup) => (
                <div
                  key={monthGroup.month}
                  id={monthGroup.month.toLowerCase().replace(/\s+/g, "-")}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(10,43,24,0.05)] overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  {/* Month Header Banner */}
                  <div className="bg-gradient-to-r from-[#0a2b18] via-[#123820] to-[#0a2b18] px-6 sm:px-8 py-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#d4af37]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                        <CalendarIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium tracking-tight">
                          {monthGroup.month}
                        </h3>
                        <p className="text-xs text-[#d4af37] font-sans uppercase tracking-widest font-semibold">
                          {monthGroup.term} · Brotherhood Academic Schedule
                        </p>
                      </div>
                    </div>
                    <div className="text-xs bg-white/10 px-3.5 py-1.5 rounded-full text-white/90 backdrop-blur-sm self-end sm:self-auto">
                      {monthGroup.events.length} {monthGroup.events.length === 1 ? "Event" : "Events"}
                    </div>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#f7faf8] text-[11px] font-semibold text-[#6c8274] uppercase tracking-wider border-b border-gray-100">
                          <th className="py-3.5 px-6 w-44">Date</th>
                          <th className="py-3.5 px-6 w-36">Day</th>
                          <th className="py-3.5 px-6">Event Details</th>
                          <th className="py-3.5 px-6 w-44 text-right">Classification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {monthGroup.events.map((item) => {
                          const badge = getCategoryBadge(item.category);
                          const isHoliday = item.category === "Holiday";
                          const isExam = item.category === "Exam";

                          return (
                            <tr
                              key={item.id}
                              className={`transition-colors duration-200 hover:bg-[#fbfdfc] ${
                                isHoliday ? "bg-rose-50/20" : isExam ? "bg-indigo-50/15" : ""
                              }`}
                            >
                              {/* Date Column */}
                              <td className="py-4 px-6 font-medium">
                                <div className="flex items-center gap-3">
                                  <div className="w-11 h-11 rounded-xl bg-[#f7faf8] border border-gray-200/80 flex flex-col items-center justify-center shrink-0 shadow-2xs group-hover:border-[#0a2b18]">
                                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#6c8274] leading-tight">
                                      {item.monthShort}
                                    </span>
                                    <span className="font-serif text-lg text-[#0a2b18] font-bold leading-tight">
                                      {item.dayNum}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[#0a2b18] font-medium block">{item.date}</span>
                                  </div>
                                </div>
                              </td>

                              {/* Day Column */}
                              <td className="py-4 px-6 text-[#42594a]">
                                <span className="inline-flex items-center gap-1.5 font-medium">
                                  {item.day}
                                </span>
                              </td>

                              {/* Event Name */}
                              <td className="py-4 px-6">
                                <div className="text-[#0a2b18] font-serif text-base font-medium">
                                  {item.events}
                                </div>
                              </td>

                              {/* Category Badge */}
                              <td className="py-4 px-6 text-right">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.bg}`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                                  {badge.label}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Stacked Card View */}
                  <div className="md:hidden divide-y divide-gray-100">
                    {monthGroup.events.map((item) => {
                      const badge = getCategoryBadge(item.category);
                      const isHoliday = item.category === "Holiday";
                      const isExam = item.category === "Exam";

                      return (
                        <div
                          key={item.id}
                          className={`p-4 sm:p-5 flex gap-4 items-start ${
                            isHoliday ? "bg-rose-50/25" : isExam ? "bg-indigo-50/20" : ""
                          }`}
                        >
                          {/* Calendar badge */}
                          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center shrink-0 shadow-xs">
                            <span className="text-[9px] uppercase tracking-wider font-bold text-[#6c8274] leading-none">
                              {item.monthShort}
                            </span>
                            <span className="font-serif text-xl text-[#0a2b18] font-bold leading-tight mt-0.5">
                              {item.dayNum}
                            </span>
                          </div>

                          {/* Event info */}
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex flex-wrap items-center justify-between gap-1.5">
                              <span className="text-xs text-[#6c8274] font-medium">
                                {item.date} · {item.day}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${badge.bg}`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                                {badge.label}
                              </span>
                            </div>

                            <h4 className="font-serif text-base text-[#0a2b18] font-medium leading-snug">
                              {item.events}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>

          {/* Bottom Helpful Information Note */}
          <div className="bg-[#0a2b18] text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  School Administrative Note
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-white">
                  Schedule Updates &amp; Exam Notifications
                </h4>
                <p className="text-sm text-white/75 leading-relaxed font-light">
                  Dates are subject to government gazette updates and university/board regulatory directives. For specific exam hall ticket schedules, time-tables, and activity requirements, please stay updated via the school circulars and administrative notice board.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Link
                  to="/academics/school-timings"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#0a2b18] font-semibold text-xs uppercase tracking-wider hover:bg-[#d4af37] hover:text-[#0a2b18] transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  <span>View Daily Timings</span>
                </Link>
                <Link
                  to="/contact/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-medium text-xs uppercase tracking-wider hover:bg-white/20 border border-white/20 transition-colors"
                >
                  <span>Contact Office</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
