import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface props {
  children?: React.ReactNode;
  headChildren?: React.ReactNode;
  breadcrumbItems?: {
    label: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  className?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
}
export default function PageWrapper({
  children,
  headChildren,
  breadcrumbItems,
  className,
  title,
  description,
  action,
  footer,
}: props) {
  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 group-data-[state=collapsed]:h-12">
        <div className="flex w-full items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          {breadcrumbItems && (
            <Separator orientation="vertical" className="mr-2 h-4" />
          )}
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems?.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;
                const Icon = item.icon;

                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {item.href && !isLast ? (
                        <BreadcrumbLink
                          Icon={Icon && <Icon />}
                          href={item.href}
                        >
                          {item.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage Icon={Icon && <Icon />}>
                          {item.label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex-1 flex justify-end items-center mr-2">
            {headChildren}
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
        {/* <Separator /> */}
        <Card className="flex flex-col h-full">
          {(title || description || action) && (
            <>
              <CardHeader className="flex max-md:flex-wrap flex-row justify-between gap-2 md:gap-4 lg:gap-6 items-center">
                <div className="flex flex-col gap-4">
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
                <div className="flex max-md:w-full items-center justify-end gap-2 md:gap-3 lg:gap-4">
                  {action}
                </div>
              </CardHeader>
              <Separator className="w-[calc(100%-48px)] mx-auto" />
            </>
          )}
          <CardContent className={cn(className, "pt-6 w-full flex flex-1")}>
            {children}
          </CardContent>
          {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
      </div>
    </>
  );
}
