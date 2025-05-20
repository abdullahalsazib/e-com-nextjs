import Breadcrumb from "@/app/components/smallComponent/Breadcrumb";

const breadcrumbItems = [
  { label: "Home" },
  { label: "Login", active: true },
];


const Register = () => {

  return (
    <>
      <div className=" flex items-center justify-start gap-10 px-[10%] py-10">
        <Breadcrumb items={breadcrumbItems} />
        <div>
          <h1 className=" text-2xl font-semibold capitalize py-5">Register</h1>
        </div>
        <div className=" flex items-center justify-between px-40 py-10 gap-10">
          <form>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register 
