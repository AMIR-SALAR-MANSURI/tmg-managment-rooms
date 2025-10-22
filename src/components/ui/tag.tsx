import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const TagVariants = cva(
  "inline-flex items-center justify-center text-nowrap text-[10px] md:text-xs rounded-lg ring-offset-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        primary: "",
        info: "",
        success: "",
        destructive: "",
        warning: "",
      },
      type: {
        filled: "",
        outline: "border",
      },
      size: {
        default: "h-6 px-2.5 py-1",
        sm: "h-5 px-2 py-0.5",
        lg: "h-7 px-3 py-1.5",
      },
    },
    compoundVariants: [
      // ─── DEFAULT ────────────────────────────────────────────────────────────────
      {
        variant: "default",
        type: "filled",
        class: "text-primary-text bg-neutral-50",
      },
      {
        variant: "default",
        type: "outline",
        class: "text-primary-text bg-neutral-50 border-neutral-third",
      },

      // ─── PRIMARY ────────────────────────────────────────────────────────────────
      {
        variant: "primary",
        type: "filled",
        class: "text-white bg-primary",
      },
      {
        variant: "primary",
        type: "outline",
        class: "text-primary-500 bg-primary-50 border-primary-500",
      },

      // ─── SECONDARY ──────────────────────────────────────────────────────────────
      {
        variant: "secondary",
        type: "filled",
        class: "text-white bg-amber-500",
      },
      {
        variant: "secondary",
        type: "outline",
        class: "text-amber-500 bg-amber-50 border-amber-500",
      },

      // ─── INFO ───────────────────────────────────────────────────────────────────
      {
        variant: "info",
        type: "filled",
        class: "text-white bg-info-500",
      },
      {
        variant: "info",
        type: "outline",
        class: "text-info-500 bg-info-50 border-info-500",
      },

      // ─── SUCCESS ────────────────────────────────────────────────────────────────
      {
        variant: "success",
        type: "filled",
        class: "text-white bg-success-400",
      },
      {
        variant: "success",
        type: "outline",
        class: "text-success-500 bg-success-50 border-success-500",
      },

      // ─── DESTRUCTIVE ────────────────────────────────────────────────────────────
      {
        variant: "destructive",
        type: "filled",
        class: "text-white bg-destructive-500",
      },
      {
        variant: "destructive",
        type: "outline",
        class: "text-destructive-500 bg-destructive-50 border-destructive-500",
      },

      // ─── WARNING ────────────────────────────────────────────────────────────────
      {
        variant: "warning",
        type: "filled",
        class: "text-white bg-warning-500",
      },
      {
        variant: "warning",
        type: "outline",
        class: "text-warning-500 bg-warning-50 border-warning-500",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      type: "filled",
    },
  }
);
interface TagProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof TagVariants> {
  dot?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

const Tag = React.forwardRef<HTMLParagraphElement, TagProps>(
  (
    {
      className,
      variant,
      type,
      size,
      dot = false,
      icon,
      iconPosition = "start",
      children,
      ...props
    },
    ref
  ) => (
    <p
      ref={ref}
      className={cn(TagVariants({ variant, type, size, className }))}
      {...props}
    >
      {icon && iconPosition === "start" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {dot && (
        <span className="size-1.5 lg:size-2 rounded-full bg-current flex-shrink-0" />
      )}
      <span className="text-nowrap">{children}</span>
      {icon && iconPosition === "end" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </p>
  )
);

Tag.displayName = "Tag";

export { Tag };
