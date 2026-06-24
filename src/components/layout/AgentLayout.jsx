import DashboardLayout from "./DashboardLayout";
import { agentMenu } from "../sidebar";
export default function AgentLayout() {
  return <DashboardLayout menuGroups={agentMenu} />;
}
