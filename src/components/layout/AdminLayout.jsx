import DashboardLayout from "./DashboardLayout";
import { adminMenu } from "../sidebar";
export default function AdminLayout() {
  return <DashboardLayout menuGroups={adminMenu} />;
}
