import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageSubnav } from "@/components/PageSubnav";

export const Route = createFileRoute("/students")({
  component: StudentsLayout,
});

function StudentsLayout() {
  return (
    <>
      <PageSubnav />
      <Outlet />
    </>
  );
}
