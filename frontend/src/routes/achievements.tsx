import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageSubnav } from "@/components/PageSubnav";

export const Route = createFileRoute("/achievements")({
  component: AchievementsLayout,
});

function AchievementsLayout() {
  return (
    <>
      <PageSubnav />
      <Outlet />
    </>
  );
}
