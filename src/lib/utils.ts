import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getBaseURL(envURL: string) {
  if (!envURL || envURL === "/") {
    return "/api";
  }

  envURL = envURL.replace(/\/+$/, "");

  console.log("test 1", envURL);

  if (envURL.startsWith("http")) {
    return envURL;
  }

  console.log("test 2", envURL);

  if (!envURL.startsWith("/")) {
    console.log("env ", `/${envURL}`);

    return `/${envURL}`;
  }

  console.log("test 3", envURL);

  return envURL;
}
export { getBaseURL };
