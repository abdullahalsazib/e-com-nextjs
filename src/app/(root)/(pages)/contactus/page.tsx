import Breadcrumb from "@/app/components/smallComponent/Breadcrumb";
import React from "react";

const breadcrumbItems = [
  { label: "Home" },
  { label: "Contact us", active: true },
];
const ContactUs = () => {
  return (
    <>
      <div className=" px-[10%] py-10">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between gap-12">
          <div className=" py-6 space-y-4">
            <h1 className=" text-4xl font-semibold text-black">Contact Us</h1>
            <p className="text-sm font-light text-gray-500">
              We love hearing from you, our Shop customers. <br /> Please
              contact us and we will make sure to get back to you as soon as we
              possibly can.
            </p>
            <form>
              <LabelInput
                labelTitle="Your Name"
                lableReq
                name="name"
                type="text"
                placeholder="Your Name"
              />
              <LabelInput
                labelTitle="Your Name"
                lableReq
                name="name"
                type="text"
                placeholder="Your Name"
              />
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

const LabelInput: React.FC<{
  labelTitle: string;
  lableReq: boolean;
  name: string;
  type: string;
  placeholder: string;
  inputClassName?: string;
  labelClassName?: string;
}> = ({
  labelTitle,
  lableReq,
  name,
  type,
  placeholder,
  inputClassName,
  labelClassName,
}) => {
  return (
    <>
      {" "}
      <div>
        <label
          className={` text-sm font-bold relative text-black ${labelClassName}`}
          htmlFor={name}
        >
          {labelTitle}{" "}
          {lableReq && (
            <span className=" text-sm text-red-500 absolute top-0 -right-2">
              *
            </span>
          )}
          {/* {!lableReq && ""} */}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={` py-3 px-5 border border-gray-200 rounded-md focus:outline-sky-300 w-full ${inputClassName}`}
        />
      </div>
    </>
  );
};
