import { createFileRoute, redirect } from "@tanstack/react-router";

// This page has been deprecated and merged into the main contact page.
// We redirect to /contact/contact-us immediately.
export const Route = createFileRoute("/contact/location")({
  beforeLoad: () => {
    throw redirect({
      to: "/contact/contact-us",
    });
  },
  component: () => null,
});
