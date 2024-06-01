"use client";
import { leftbarData } from "../../../constants/leftbar";

import Link from "next/link";

import "./Leftbar.scss";
import { usePathname } from "next/navigation";
const Leftbar = () => {
  const pathname = usePathname();
  return (
    <section className="leftbar_container">
      <div className="leftbar_link_container">
        {leftbarData.map((links) => {
          const isActive =
            (pathname.includes(links.href) && links.href.length > 1) ||
            pathname === links.href;
          return (
            <div key={links.title} className="leftbar_link_container_fluid">
              <Link
                href={links.href}
                className={`leftbar_links ${isActive && "active"}`}
              >
                <span key={links.title} className="icons">
                  {links.icon}
                </span>
                {links.title}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Leftbar;
