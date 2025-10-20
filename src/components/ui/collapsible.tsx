"use client";

import React from "react";
import { cn } from "@/lib/utils";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

// const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

// const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      className,
      "overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up"
    )}
    {...props}
  />
));
CollapsibleContent.displayName = CollapsiblePrimitive.Trigger.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
