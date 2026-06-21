import DashboardLayout from "./DashboardLayout";
import { chauffeurMenu } from "../sidebar";

export default function ChauffeurLayout() {
  return <DashboardLayout menuGroups={chauffeurMenu} />;
}
