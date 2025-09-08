export const accountNavagationLink = [
  {
    title: "My Account",
    link: "#",
    dropDown: true,
    content: [
      {
        title: "my account",
        link: "#",
        nested: [
          { title: "my wish list ", link: "/pages/shoping-card" },
          // { title: "compare", link: "#" },
          { title: "create an account", link: "/register" },
          { title: "sign in", link: "/login" },
        ],
      },
    ],
  },
];
export const NavLink = [
  { title: "Home", link: "/", dropDown: false },
  {
    title: "Laptops",
    link: "#",
    dropDown: true,
    content: [
      {
        title: "Gaming Laptops",
        link: "#",
        nested: [
          { title: "High-End Gaming", link: "#" },
          { title: "Mid-Range Gaming", link: "#" },
          { title: "Budget Gaming", link: "#" },
        ],
      },
      {
        title: "Business Laptops",
        link: "#",
        nested: [
          { title: "Executive Laptops", link: "#" },
          { title: "Durable Laptops", link: "#" },
          { title: "Ultraportable", link: "#" },
        ],
      },
      { title: "Ultrabooks", link: "#" },
      { title: "2-in-1 Laptops", link: "#" },
      { title: "Budget Laptops", link: "#" },
    ],
  },
  // {
  //   title: "Printers & Scanners",
  //   link: "#",
  //   dropDown: true,
  //   content: [
  //     {
  //       title: "Inkjet Printers",
  //       link: "#",
  //       nested: [
  //         { title: "Home Inkjet", link: "#" },
  //         { title: "Office Inkjet", link: "#" },
  //         { title: "Photo Inkjet", link: "#" },
  //       ],
  //     },
  //     {
  //       title: "Laser Printers",
  //       link: "#",
  //       nested: [
  //         { title: "Monochrome", link: "#" },
  //         { title: "Color Laser", link: "#" },
  //         { title: "Multifunction", link: "#" },
  //       ],
  //     },
  //     { title: "All-in-One Printers", link: "#" },
  //     { title: "Photo Printers", link: "#" },
  //     { title: "3D Printers", link: "#" },
  //   ],
  // },
  // {
  //   title: "PC parts",
  //   link: "#",
  //   dropDown: true,
  //   content: [
  //     {
  //       title: "Processors",
  //       link: "#",
  //       nested: [
  //         { title: "Intel", link: "#" },
  //         { title: "AMD", link: "#" },
  //         { title: "Server CPUs", link: "#" },
  //       ],
  //     },
  //     {
  //       title: "Graphics Cards",
  //       link: "#",
  //       nested: [
  //         { title: "NVIDIA", link: "#" },
  //         { title: "AMD Radeon", link: "#" },
  //         { title: "Workstation GPUs", link: "#" },
  //       ],
  //     },
  //     { title: "Motherboards", link: "#" },
  //     { title: "RAM", link: "#" },
  //     { title: "Storage", link: "#" },
  //   ],
  // },
  { title: "About us", link: "/aboutus", dropDown: false },
  { title: "Contact Us", link: "/contactus", dropDown: false },
  { title: "FAQ", link: "/faq", dropDown: false },
];

export const navItemsForSellerDashboard = [
  {
    name: "Dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    path: "/vendor-dashboard",
  },
  {
    name: "Products",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    path: "/vendor-dashboard/products",
  },
  {
    name: "Orders",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    path: "/vendor-dashboard/orders",
  },
  {
    name: "Customers",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    path: "/vendor-dashboard/customers",
  },
  {
    name: "Analytics",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    path: "/vendor-dashboard/analytics",
  },
  {
    name: "Settings",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    path: "/vendor-dashboard/settings",
  },
];

