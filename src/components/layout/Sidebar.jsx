import { Sidebar as BaseSidebar, adminMenu } from "../sidebar";

export default function Sidebar(props) {
  return <BaseSidebar menuGroups={adminMenu} {...props} />;
}
