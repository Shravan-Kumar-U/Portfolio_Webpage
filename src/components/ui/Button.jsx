import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  href,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-primary disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group";
  
  const variants = {
    primary: "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-sm",
    outline: "bg-transparent text-white border border-white/20 hover:border-white/50 hover:bg-white/5",
    ghost: "bg-transparent text-white/80 hover:text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg"
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes} ref={ref} {...props}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        )}
      </a>
    );
  }

  return (
    <button className={classes} ref={ref} {...props}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
