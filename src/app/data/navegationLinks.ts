export const accountNavagationLink = [
  {
    title: "My Account", link: "/", dropDown: true,
    content: [
      {
        title: "my account", link: "#",
        nested: [
          { title: "my wish list ", link: "#" },
          { title: "compare", link: "#" },
          { title: "create an account", link: "/register" },
          { title: "sign in", link: "/login" },
        ],


      },
    ]
  },
]
export const NavLink = [
  { title: "Home", link: "/", dropDown: false },
  { title: "About us", link: "/aboutus", dropDown: false },
  { title: "Contact Us", link: "/contactus", dropDown: false },
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
  {
    title: "Printers & Scanners",
    link: "#",
    dropDown: true,
    content: [
      {
        title: "Inkjet Printers",
        link: "#",
        nested: [
          { title: "Home Inkjet", link: "#" },
          { title: "Office Inkjet", link: "#" },
          { title: "Photo Inkjet", link: "#" },
        ],
      },
      {
        title: "Laser Printers",
        link: "#",
        nested: [
          { title: "Monochrome", link: "#" },
          { title: "Color Laser", link: "#" },
          { title: "Multifunction", link: "#" },
        ],
      },
      { title: "All-in-One Printers", link: "#" },
      { title: "Photo Printers", link: "#" },
      { title: "3D Printers", link: "#" },
    ],
  },
  {
    title: "PC parts",
    link: "#",
    dropDown: true,
    content: [
      {
        title: "Processors",
        link: "#",
        nested: [
          { title: "Intel", link: "#" },
          { title: "AMD", link: "#" },
          { title: "Server CPUs", link: "#" },
        ],
      },
      {
        title: "Graphics Cards",
        link: "#",
        nested: [
          { title: "NVIDIA", link: "#" },
          { title: "AMD Radeon", link: "#" },
          { title: "Workstation GPUs", link: "#" },
        ],
      },
      { title: "Motherboards", link: "#" },
      { title: "RAM", link: "#" },
      { title: "Storage", link: "#" },
    ],
  },
  { title: "FAQ", link: "/faq", dropDown: false },
];

