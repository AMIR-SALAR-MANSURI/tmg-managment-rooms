"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp, Loader2, SearchX } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  variant?: "outline" | "filled";
  size?: "default" | "sm" | "lg";
  iconSize?: "sm" | "lg";
  loading?: boolean;
  readOnly?: boolean;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    {
      className,
      children,
      variant = "outline",
      size = "default",
      iconSize = "sm",
      loading = false,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const isInvalid = props["aria-invalid"] === true;

    const variantClasses = {
      outline: cn("border", isInvalid ? "border-destructive" : "border-input"),
      filled: cn(
        "bg-background border",
        isInvalid ? "border-destructive" : "border-transparent"
      ),
    };

    const sizeClasses = {
      default: "h-10 px-3 py-2 text-sm",
      sm: "h-9 px-2.5 py-1.5 text-sm",
      lg: "h-11 px-3.5 py-2.5 text-base",
    };

    const iconClasses = {
      sm: "min-w-3 size-3 lg:size-4",
      lg: "min-w-4 size-4 lg:size-5",
    };

    return (
      <SelectPrimitive.Trigger
        dir="rtl"
        ref={ref}
        data-size={size}
        disabled={props.disabled}
        className={cn(
          "flex w-full box-border items-center justify-between rounded-md [&>span]:truncate data-[state=open]:border-primary [&>span]:data-[placeholder]:text-foreground/50 focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          readOnly && "bg-muted pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          {loading ? (
            <Loader2
              className={cn("animate-spin opacity-75", iconClasses[iconSize])}
            />
          ) : (
            <ChevronDown className={cn("opacity-75", iconClasses[iconSize])} />
          )}
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="size-4 lg:size-5" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="size-4 lg:size-5" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    loading?: boolean;
  }
>(
  (
    { className, children, position = "popper", loading = false, ...props },
    ref
  ) => {
    const hasChildren = React.Children.count(children) > 0;

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          dir="rtl"
          className={cn(
            "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
            position === "popper" &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className
          )}
          position={position}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport
            className={cn(
              "p-1",
              position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            )}
          >
            {!hasChildren && !loading ? (
              <p className="w-full px-2 py-4 lg:px-4 lg:py-6 flex items-center justify-center gap-2 opacity-75 pointer-events-none select-none">
                داده‌ای یافت نشد!
                <SearchX className="size-4" />
              </p>
            ) : loading ? (
              <p className="w-full px-2 py-4 lg:px-4 lg:py-6 flex items-center justify-center gap-2 opacity-75 pointer-events-none select-none">
                در حال بارگیری
                <Loader2 className="size-4 animate-spin" />
              </p>
            ) : (
              children
            )}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  }
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 lg:py-2 pl-8 lg:pl-10 pr-2 lg:pr-3 text-xs lg:text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-1.5 lg:left-2 flex min-w-4 size-4 lg:size-5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="min-w-4 size-4 lg:size-5" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
