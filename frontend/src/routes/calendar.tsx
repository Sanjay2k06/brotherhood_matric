import { createFileRoute } from "@tanstack/react-router";
import { AcademicCalendarPage } from "./events";

export const Route = createFileRoute("/calendar")({
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
