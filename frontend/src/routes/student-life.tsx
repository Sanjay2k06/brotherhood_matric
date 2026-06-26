import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageSubnav } from "@/components/PageSubnav";

export const Route = createFileRoute("/student-life")({
  component: StudentLifeLayout,
});

function StudentLifeLayout() {
  return (
    <>
      <PageSubnav />
      <Outlet />
    </>
  );
}
