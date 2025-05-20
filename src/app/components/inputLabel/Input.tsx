const Input: React.FC<{
  labelTitle: string;
  htmlFor?: string;
  type: string;
  placeholder: string;
  className?: string;
}> = ({
  labelTitle, htmlFor, type, placeholder, className
}) => {
    return (
      <div>
        <label htmlFor={htmlFor}>{labelTitle}</label>
        <input
          id={htmlFor}
          type={type}
          placeholder={placeholder}
          className={`mt-1 py-3 px-4 border-2 border-gray-400 rounded-md focus:outline-none w-full ${className}`}
        />
      </div>
    )
  }

export default Input
