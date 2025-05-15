import React from "react";

const LoginBtn: React.FC<{
  title: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}> = ({ title, className, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className}  py-2 px-10 font-medium text-lg bg-blue-500 text-white hover:bg-blue-700 duration-200 rounded-full`}
    >
      {title}
    </button>
  );
};

export default LoginBtn;
