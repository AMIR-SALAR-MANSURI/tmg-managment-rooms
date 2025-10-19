"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap duration-300 rounded-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        ghost: "",
        dashed: "",
        link: "",
        text: "",
        destructive: "",
        warning: "",
        success: "",
      },
      model: {
        default: "",
        outline: "",
      },
      size: {
        default: "h-10 px-4 py-2 gap-3 text-xs lg:text-sm",
        icon: "p-0 size-10 py-1",
        sm: "h-9 px-3 py-1.5 gap-2.5 text-xs lg:text-sm",
        lg: "h-11 px-5 py-2.5 gap-3.5 text-sm lg:text-base",
      },
    },
    compoundVariants: [
      // ─── PRIMARY ───────────────────────────────────────────────────────────────
      {
        variant: "primary",
        model: "default",
        class:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary",
      },
      {
        variant: "primary",
        model: "outline",
        class:
          "bg-primary/10 text-primary border border-primary hover:border-primary/80 hover:text-primary/80 hover:bg-primary/15 active:text-primary active:border-primary",
      },

      // ─── GHOST ─────────────────────────────────────────────────────────────
      {
        variant: "ghost",
        model: "default",
        class: "bg-muted hover:bg-muted-foreground/15 active:bg-muted",
      },
      {
        variant: "ghost",
        model: "outline",
        class:
          "bg-muted border border-muted-foreground/15 hover:bg-muted-foreground/10 hover:border-muted-foreground/50 active:border-border active:bg-transparent",
      },

      // ─── SECONDARY ─────────────────────────────────────────────────────────────
      {
        variant: "secondary",
        model: "default",
        class:
          "text-white bg-secondary hover:bg-secondary-foreground active:bg-secondary",
      },
      {
        variant: "secondary",
        model: "outline",
        class:
          "text-secondary bg-secondary/10 border border-secondary hover:bg-secondary/20 hover:border-secondary-foreground hover:text-secondary-foreground active:text-secondary active:border-secondary",
      },

      // ─── DASHED ─────────────────────────────────────────────────────────────────
      {
        variant: "dashed",
        model: "default",
        class:
          "text-secondary-foreground bg-transparent border border-dashed border-border hover:border-muted hover:text-neutral-950 active:bg-muted/70",
      },
      {
        variant: "dashed",
        model: "outline",
        class:
          "text-secondary-foreground bg-transparent border border-dashed border-border hover:bg-muted active:text-neutral-third active:border-neutral-50",
      },

      // ─── LINK ────────────────────────────────────────────────────────────────────
      {
        variant: "link",
        model: "default",
        class:
          "text-primary underline-offset-4 hover:underline hover:text-primary-600 active:text-primary bg-transparent p-1 h-auto",
      },
      {
        variant: "link",
        model: "outline",
        class:
          "text-primary border border-primary underline-offset-4 hover:underline hover:text-primary-600 hover:border-primary-600 active:text-primary bg-transparent",
      },

      // ─── TEXT ────────────────────────────────────────────────────────────────────
      {
        variant: "text",
        model: "default",
        class:
          "text-primary-text hover:bg-muted active:bg-neutral-50 bg-transparent",
      },
      {
        variant: "text",
        model: "outline",
        class:
          "text-primary-text hover:bg-muted active:bg-neutral-50 bg-transparent border border-transparent",
      },

      // ─── DESTRUCTIVE ───────────────────────────────────────────────────────
      {
        variant: "destructive",
        model: "default",
        class:
          "text-white bg-destructive hover:bg-destructive-600 active:bg-destructive",
      },
      {
        variant: "destructive",
        model: "outline",
        class:
          "text-destructive bg-destructive/10 dark:bg-destructive-900 border border-destructive hover:bg-destructive-100 dark:hover:bg-destructive-800 hover:border-destructive-600 hover:text-destructive-600 dark:hover:border-destructive dark:hover:text-destructive active:text-destructive active:border-destructive",
      },
      // ─── warning ───────────────────────────────────────────────────────
      {
        variant: "warning",
        model: "default",
        class:
          "text-white bg-warning-500 hover:bg-warning-600 active:bg-warning-500",
      },
      {
        variant: "warning",
        model: "outline",
        class:
          "text-warning-500 bg-warning/10 dark:bg-warning-900 border border-warning-500 hover:bg-warning-100 dark:hover:bg-warning-800 hover:border-warning-600 hover:text-warning-600 dark:hover:border-warning-500 dark:hover:text-warning-500 active:text-warning-500 active:border-warning-500",
      },
      // ─── success ───────────────────────────────────────────────────────
      {
        variant: "success",
        model: "default",
        class:
          "text-white bg-success-500 hover:bg-success-600 active:bg-success-500",
      },
      {
        variant: "success",
        model: "outline",
        class:
          "text-success-500 bg-success/10 dark:bg-success-900 border border-success-500 hover:bg-success-100 dark:hover:bg-success-800 hover:border-success-600 hover:text-success-600 dark:hover:border-success-500 dark:hover:text-success-500 active:text-success-500 active:border-success-500",
      },
    ],
    defaultVariants: {
      variant: "primary",
      model: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  iconLeft?: React.ComponentType<{ className?: string }>;
  iconRight?: React.ComponentType<{ className?: string }>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      model,
      size,
      asChild = false,
      loading = false,
      iconLeft: IconLeft,
      iconRight: IconRight,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        {...props}
        ref={ref}
        disabled={loading || props.disabled}
        className={cn(buttonVariants({ variant, model, size, className }))}
      >
        {IconRight && !loading && <IconRight className="size-4" />}
        {children}
        {IconLeft && !loading && <IconLeft className="size-4" />}
        {loading && <Loader2 className="animate-spin size-4" />}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
