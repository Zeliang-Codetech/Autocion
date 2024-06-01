"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./customers.scss";
import PrivateRoute from "../../../Routes/AdminRoute";
export default function ProvidersLayout({ children }) {
  const pathname = usePathname();
  const providerNav = [
    {
      href: "/admin/customers",
      title: "Customers",
    },
    {
      href: "/admin/customers/transaction",
      title: "Transactions",
    },
    {
      href: "/admin/customers/address",
      title: "Addresses",
    },
  ];

  return (
    <PrivateRoute>
      <div>
        <nav className="customer_nav">
          {providerNav.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                className={`customer_link ${isActive && "active"}`}
                href={link.href}
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
