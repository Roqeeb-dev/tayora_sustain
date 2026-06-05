import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, type, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const resolvedType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-foreground">{label}</label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={resolvedType}
            className={`w-full h-11 px-3.5 rounded-xl border bg-input text-foreground
                        text-sm placeholder:text-foreground-muted/60 outline-none transition-all duration-200
                        focus:ring-2 focus:ring-primary/20 focus:border-input-focus
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${error ? "border-destructive focus:ring-destructive/20 focus:border-destructive" : "border-border"}
                        ${isPassword ? "pr-11" : ""}
                        ${className}`}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground-muted
                         hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-foreground-muted">{hint}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
