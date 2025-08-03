import Breadcrumb from "@/components/smallComponent/Breadcrumb";
import React from "react";
import { BsMailbox, BsTelephone } from "react-icons/bs";
import { CiLocationArrow1 } from "react-icons/ci";
import { PiClockUserBold } from "react-icons/pi";

const contactData = [
  {
    icon: <CiLocationArrow1 />,
    title: "Address",
    des: "1234, Street Address city Address, 1234",
  },
  {
    icon: <BsTelephone />,
    title: "Phone",
    des: "(00)1234 5678",
  },
  {
    icon: <PiClockUserBold />,
    title: "we are open",
    des: "Monday - Thursday: 9:00 AM - 5:30 PM\nFriday 9:00 AM - 6:00 PM\nSaturday: 11:00 AM - 5:00 PM",
  },
  {
    icon: <BsMailbox />,
    title: "E-mail",
    des: "shop@mail.com",
  },
];

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Contact us", active: true },
];

const ContactUs = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-[10%] py-6 md:py-10 w-full">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 md:gap-8 lg:gap-12">
        {/* Contact Form Section */}
        <div className="w-full lg:w-[60%] py-4 md:py-6 space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black">
            Contact Us
          </h1>
          <p className="text-sm md:text-base font-light text-gray-500">
            We love hearing from you, our Shop customers. <br />
            Please contact us and we will make sure to get back to you as soon
            as we possibly can.
          </p>

          <form className="w-full space-y-4 md:space-y-5">
            <div className="w-full flex flex-col sm:flex-row items-center justify-start gap-4 md:gap-6 lg:gap-10">
              <LabelInput
                labelTitle="Your Name"
                lableReq
                name="name"
                type="text"
                placeholder="Your Name"
              />
              <LabelInput
                labelTitle="Your Email"
                lableReq
                name="email"
                type="email"
                placeholder="Your email"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-10">
              <LabelInput
                labelTitle="Your Phone Number"
                lableReq={false}
                name="phoneNumber"
                type="number"
                placeholder="Your phone number"
              />
              <LabelInput
                labelTitle="Subject"
                lableReq={false}
                name="subject"
                type="text"
                placeholder="Subject"
              />
            </div>

            <div className="w-full">
              <label
                className="text-sm md:text-base font-bold relative text-black"
                htmlFor="message"
              >
                Your messages
                <span className="text-sm text-red-500 absolute top-0 -right-2">
                  *
                </span>
              </label>
              <textarea
                className="py-3 h-[120px] md:h-[150px] px-4 md:px-5 border focus:bg-blue-50 border-gray-200 rounded-md focus:outline-blue-400 w-full"
                name="message"
                id="message"
                placeholder="Enter your messages"
              ></textarea>
            </div>

            <button className="py-2 px-6 md:px-7 font-semibold text-sm md:text-base rounded-full bg-blue-600 text-white hover:bg-blue-700 capitalize transition-colors duration-200">
              submit
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="w-full lg:w-[40%] self-start">
          <div className="py-6 md:py-10 px-6 md:px-10 bg-[#F5F7FF] rounded-lg flex flex-col items-start justify-start gap-4 md:gap-6">
            {contactData.map((item, index) => (
              <ContactCard
                key={index}
                icon={item.icon}
                des={item.des}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  des: string;
}> = ({ icon, title, des }) => {
  return (
    <div className="flex items-start justify-start gap-3 w-full">
      <div className="text-xl md:text-2xl font-bold mt-1 text-gray-700">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-base md:text-lg font-semibold capitalize text-gray-800">
          {title}:
        </h3>
        <p className="text-xs md:text-sm text-gray-600 whitespace-pre-line">
          {des}
        </p>
      </div>
    </div>
  );
};

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
      <div className="w-full">
        <label
          className={`text-sm md:text-base font-bold relative text-black ${labelClassName}`}
          htmlFor={name}
        >
          {labelTitle}{" "}
          {lableReq && (
            <span className="text-sm text-red-500 absolute top-0 -right-2">
              *
            </span>
          )}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`py-2 md:py-3 px-4 md:px-5 border focus:bg-blue-50 border-gray-200 rounded-md focus:outline-blue-400 w-full ${inputClassName}`}
        />
      </div>
    );
  };

export default ContactUs;
