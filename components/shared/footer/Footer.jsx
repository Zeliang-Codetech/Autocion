import Image from "next/image";
import "./Footer.scss";
import Link from "next/link";
export const Footer = () => {
  const footerLinks = [
    // {
    //   title: "Terms of Use",
    //   href: "/terms_of_use",
    // },
    {
      title: "Privacy Policy",
      href: "/privacy_policy",
    },
    // {
    //   title: "FAQ",
    //   href: "/faq",
    // },
    // {
    //   title: "Refund Policy",
    //   href: "/refund_policy",
    // },
  ];
  return (
    <div className="footer_container">
      <div className="footer_logo">
        <Image
          src={"/assets/logo_white.svg"}
          width={300}
          height={200}
          layout="responsive"
          alt="logo"
          priority={true}
        />
      </div>

      <div className="footer_links">
        {footerLinks.map((links) => {
          return (
            <Link
              style={{ color: "white" }}
              key={links.title}
              href={links.href}
            >
              {links.title}
            </Link>
          );
        })}
      </div>
      <div className="footer_apps">
        <Image
          style={{ cursor: "pointer" }}
          src={"/assets/playstore.svg"}
          width={100}
          height={100}
          alt="apps"
          className="apps"
          layout="responsive"
        />
        <Image
          style={{ cursor: "pointer" }}
          src={"/assets/appstore.svg"}
          width={100}
          height={100}
          alt="apps"
          className="apps"
          layout="responsive"
        />
      </div>
      <p>
        {new Date().getFullYear()} © Autocion Private Limited | All rights
        reserved
      </p>
    </div>
  );
};
