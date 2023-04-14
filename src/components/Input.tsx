import { forwardRef } from "react";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, htmlFor, className, error, ...rest }, ref) => {
  return (
      <div className="relative z-0 w-full mb-6 group">
        <input
          className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-emerald-500 peer ${className}`}
          ref={ref}
          {...rest}
          placeholder=" "
        />
        <label
          htmlFor={htmlFor}
          className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {label}
        </label>
        {error && (
          <span className="text-sm text-red-400 transition-all absolute -bottom-6 left-0">
            {error}
          </span>
        )}
      </div>
  );
})

export default Input;
