import "../globals.css";
import { Footer } from "../../components/shared/footer/Footer";
import Topbar from "../../components/shared/Topbar/Topbar";
import { Toaster } from "sonner";
import { AuthProvider } from "../../context/auth";

export const metadata = {
  title: "Autocion",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <Topbar />
          <main>{children}</main>
          <Footer />
        </body>
        <Toaster
          toastOptions={{ className: "toast" }}
          position="top-center"
          richColors="true"
        />
      </AuthProvider>
    </html>
  );
}
