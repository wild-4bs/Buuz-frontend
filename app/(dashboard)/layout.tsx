import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboardLayout">
      <Sidebar />
      <Header />
      <ProtectedRoute>{children}</ProtectedRoute>
    </div>
  );
}
