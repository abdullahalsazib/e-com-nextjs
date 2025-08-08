import Breadcrumb from "@/components/smallComponent/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold dark:text-white text-black">
            Contact Us
          </h1>
          <p className="text-sm md:text-base font-light text-gray-500">
            We love hearing from you, our Shop customers. <br />
            Please contact us and we will make sure to get back to you as soon
            as we possibly can.
          </p>

          <form className="w-full space-y-4 md:space-y-5">
            <div className="w-full flex flex-col sm:flex-row items-center justify-start gap-4 md:gap-6 lg:gap-10">
              <div className=" grid gap-2 w-full">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="jhon deo" />
              </div>
              <div className=" grid gap-2 w-full">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="jhon2deo@mail.com" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-10">
              <div className=" grid gap-2 w-full">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="017^^^^&&" />
              </div>
              <div className=" grid gap-2 w-full">
                <Label htmlFor="sub">Subject</Label>
                <Input id="sub" placeholder="" />
              </div>
            </div>

            <div className=" grid gap-2 w-full">
              <Label htmlFor="msg">Message</Label>
              <Textarea placeholder="Messages" />
            </div>

            <Button size={"lg"} variant={"secondary"}>
              Submit
            </Button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="w-full lg:w-[40%] self-start">
          <div className="py-6 md:py-10 px-6 md:px-10 dark:bg-gray-800  bg-[#F5F7FF] rounded-lg flex flex-col items-start justify-start gap-4 md:gap-6">
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
      <div className="text-xl md:text-2xl font-bold mt-1 dark:text-gray-50 text-gray-700">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-base md:text-lg font-semibold capitalize dark:text-gray-50 text-gray-800">
          {title}:
        </h3>
        <p className="text-xs md:text-sm dark:text-gray-500 text-gray-600 whitespace-pre-line">
          {des}
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
