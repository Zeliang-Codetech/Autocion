import { MdNotifications, MdSettings, MdHome, MdHandyman, MdApps, MdShoppingCart, MdPeople, MdFeaturedPlayList } from "react-icons/md";
import { FaQuestionCircle, FaCar, FaBarcode, FaUserAlt } from "react-icons/fa";
import { PiSlideshowFill } from "react-icons/pi";
export const leftbarData = [
    {
        icon: <MdHome />,
        title: "Dashboard",
        href: "/admin/dashboard"
    },
    {
        icon: <FaCar />,
        title: "Providers",
        href: "/admin/providers"
    },
    {
        icon: <MdShoppingCart />,
        title: "Orders",
        href: "/admin/orders"
    },
    {
        icon: <MdApps />,
        title: "Categories",
        href: "/admin/categories"
    },
    {
        icon: <MdHandyman />,
        title: "Services",
        href: "/admin/services"
    },
    {
        icon: <PiSlideshowFill />,
        title: "Sliders",
        href: "/admin/sliders"
    },
    {
        icon: <MdFeaturedPlayList />,
        title: "Featured section",
        href: "/admin/featured-section"
    },
    {
        icon: <MdPeople />,
        title: "Customers",
        href: "/admin/customers"
    },
    {
        icon: <FaBarcode />,
        title: "Promo Codes",
        href: "/admin/promo"
    },
    {
        icon: <MdSettings />,
        title: "System Settings",
        href: "/admin/system-settings"
    },
    {
        icon: <FaUserAlt />,
        title: "System Users",
        href: "/admin/system-users"
    },
    {
        icon: <MdNotifications />,
        title: "Send Notification",
        href: "/admin/send-notifications"
    },
    {
        icon: <FaQuestionCircle />,
        title: "FAQs",
        href: "/admin/faq"
    },
]