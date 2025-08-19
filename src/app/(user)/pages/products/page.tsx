import Breadcrumb from "@/components/smallComponent/Breadcrumb";

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Products", active: true },
];
export default function page() {
  return (
    <div
      className=" py-10 px-10 flex items-center justify-center h-50
   text-4xl uppercase text-blue-600 "
    >
      <Breadcrumb items={breadcrumbItems} />
      <br />
      is page is coming soon...
    </div>
  );
}
