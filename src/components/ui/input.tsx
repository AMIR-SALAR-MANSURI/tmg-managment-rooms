"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  iconLeft?: React.ComponentType<{ className?: string }>;
  iconRight?: React.ComponentType<{ className?: string }>;
  iconSize?: "sm" | "lg";
  variant?: "outline" | "filled";
  size?: "sm" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant,
      size,
      iconLeft: IconLeft,
      iconRight: IconRight,
      iconSize,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (props.onBlur) props.onBlur(e);
    };

    const isInvalid = props["aria-invalid"] === true;
    const isReadOnly = props.readOnly;

    const inputVariants = cva(
      "relative w-full rounded-lg duration-300 box-border px-3",
      {
        variants: {
          variant: {
            outline: cn(
              "bg-foreground",
              isInvalid
                ? "border-destructive-500"
                : isFocused
                ? "border-primary-500"
                : "border-border",
              "border"
            ),
            filled: cn(
              isInvalid
                ? "border-destructive-500"
                : isFocused
                ? "border-primary-500"
                : "border-transparent",
              "bg-background",
              "border"
            ),
          },
          size: {
            default: "h-10 py-1.5 [&>input]:text-sm",
            sm: "h-9 py-1 [&>input]:text-sm",
            lg: "h-11 py-2 [&>input]:text-base",
          },
          iconSize: {
            sm: cn(
              "[&>div]:size-4 [&>div]:lg:size-5",
              IconLeft && "[&>input]:!pl-6 [&>input]:md:!pl-7",
              IconRight && "[&>input]:!pr-6 [&>input]:md:!pr-7"
            ),
            lg: cn(
              "[&>div]:size-5 [&>div]:lg:size-6",
              IconLeft && "[&>input]:!pl-7 [&>input]:md:!pl-8",
              IconRight && "[&>input]:!pr-7 [&>input]:md:!pr-8"
            ),
          },
        },
        defaultVariants: {
          variant: "outline",
          size: "default",
          iconSize: "sm",
        },
      }
    );

    return (
      <div
        className={cn(
          inputVariants({ variant, size, iconSize, className }),
          isReadOnly && "bg-neutral-50"
        )}
      >
        {IconLeft && (
          <div
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2",
              isInvalid
                ? "text-destructive-500"
                : isFocused
                ? "text-primary-500"
                : "text-neutral-third",
              isReadOnly && "pointer-events-none"
            )}
          >
            <IconLeft className="w-full h-full" />
          </div>
        )}
        {IconRight && (
          <div
            className={cn(
              "absolute right-3 size-5 top-1/2 -translate-y-1/2",
              isInvalid
                ? "text-destructive-500"
                : isFocused
                ? "text-primary-500"
                : "text-neutral-third",
              isReadOnly && "pointer-events-none"
            )}
          >
            <IconRight className="w-full h-full" />
          </div>
        )}
        <input
          type={type}
          ref={ref}
          {...props}
          tabIndex={0}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={cn(
            className,
            "w-full h-full outline-none bg-transparent placeholder:text-neutral-third truncate disabled:cursor-not-allowed",
            isReadOnly && "pointer-events-none"
          )}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
