"use client";
import Link from "next/link";
import "./providers.scss";
import { usePathname } from "next/navigation";
import PrivateRoute from "../../../Routes/AdminRoute";

export default function ProvidersLayout({ children }) {
  const pathname = usePathname();
  const providerNav = [
    {
      href: "/admin/providers",
      title: "Providers",
    },
    {
      href: "/admin/providers/payment_request",
      title: "Payment request",
    },
    {
      href: "/admin/providers/settlements",
      title: "Settlements",
    },
    {
      href: "/admin/providers/cash_collection",
      title: "Cash collection",
    },
  ];

  return (
    <PrivateRoute>
      <div>
        <nav className="providers_nav">
          {providerNav.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={index}
                href={link.href}
                className={`provider_link ${isActive && "active"}`}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>
        <div>{children}</div>
      </div>
    </PrivateRoute>
  );
}
