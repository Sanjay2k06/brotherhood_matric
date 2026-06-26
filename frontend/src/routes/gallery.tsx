import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageSubnav } from "@/components/PageSubnav";

export const Route = createFileRoute("/gallery")({
  component: GalleryLayout,
});

function GalleryLayout() {
  return (
    <>
      <PageSubnav />
      <Outlet />
    </>
  );
}