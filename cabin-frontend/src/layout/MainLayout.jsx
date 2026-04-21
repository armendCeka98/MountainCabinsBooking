import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <main className="mt-20">
        <Outlet />
      </main>
    </>
  );
}