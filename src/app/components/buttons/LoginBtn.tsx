import Link from "next/link";

const LoginBtn: React.FC<{
  children?: React.ReactNode;
  href?: string;
  title: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}> = ({ href, title, className = "", onClick, type = "button", children }) => {
  const sharedClasses = `flex items-center justify-center gap-2 text-sm py-2 px-10 font-medium bg-blue-500 text-white hover:bg-blue-700 duration-200 rounded-full ${className}`;

  if (href) {
    return (
      <Link href={href}>
        <h1 className={sharedClasses}>
          {children} {title}
        </h1>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={sharedClasses}>
      {children} {title}
    </button>
  );
};

export default LoginBtn
