import React from "react";

const LoginBtn: React.FC<{
  children?: React.ReactNode;
  title: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}> = ({ title, className, onClick, type, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} flex items-center justify-center gap-2 text-sm  py-2 px-10 font-medium bg-blue-500 text-white hover:bg-blue-700 duration-200 rounded-full`}
    >
      {children} {title}
    </button>
  );
};

export default LoginBtn;
