import Breadcrumb from "@/app/components/smallComponent/Breadcrumb";

const breadcrumb = [{ label: "home" }, { label: "User account", active: true }];
const User_account = () => {
  return (
    <>
      <div className=" px-[10%] py-10">
        <Breadcrumb items={breadcrumb} />
        <div>
          <h1 className="py-4 text-3xl font-semibold text-black">
            My Dashboard
          </h1>
        </div>
      </div>
    </>
  );
};

export default User_account;
