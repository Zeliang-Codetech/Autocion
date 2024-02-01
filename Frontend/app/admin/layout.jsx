import Leftbar from "../../components/shared/Leftbar/Leftbar";
import Topbar_admin from "../../components/shared/Topbar-admin/Topbar_admin";
import "../globals.css";
import "./admin.scss";

export const metadata = {
  title: "Admin | Autocion",
  description: "Autocion admin panel",
};

export default function AdminLayout({ children }) {
  return (
    <html>
      <body>
        <Topbar_admin />
        <div className="layout_admin">
          <Leftbar />
          <div className="layout_pages">
            <div className="admin_pages">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
