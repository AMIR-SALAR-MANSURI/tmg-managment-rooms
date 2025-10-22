import { cn } from "@/lib/utils";
import { ArrowDown2 } from "iconsax-reactjs";
import { CheckIcon, ChevronDown, Loader2, Plus, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Tag } from "./tag";

type Option = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type EditableOption = Option & { isNew: boolean };

type Options =
  | { group_name: string; child: Option[] }
  | Option
  | EditableOption;

interface TProps {
  id?: string;
  options: Options[] | undefined;
  value?: string | string[];
  onChange?: (arg: string | string[]) => void;
  isLoading?: boolean;
  placeholder?: string;
  multiSelect?: boolean;
  emptyStateMessage?: string;
  addable?: boolean;
  onCreate?: (newValue: string) => void;
  onRemove?: (value: string) => void;
  searchPlaceholder?: string;
  disabled?: boolean;
  hasError?: boolean;
}

export type { TProps as SelectSearchableProps };

export default function SelectSearchable({
  id,
  value,
  onChange,
  options,
  isLoading = false,
  placeholder = "Select an option",
  multiSelect = false,
  addable = false,
  emptyStateMessage = "No results found.",
  searchPlaceholder = "Search...",
  onCreate,
  onRemove,
  disabled = false,
  hasError,
}: TProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [search, setSearch] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeItemRef.current && !disabled) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex, disabled]);

  useEffect(() => {
    if (open) {
      if (value) {
        const index = searchValues().findIndex((opt) => opt.value === value);
        setActiveIndex(index);
      } else setActiveIndex(0);
    }

    if (open && !disabled) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, disabled]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    const filteredOptions = searchValues();

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredOptions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(
          (prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredOptions[activeIndex]) {
          handleClick(filteredOptions[activeIndex].value);
        }
        break;
      default:
        break;
    }
  };

  const handleClick = (selectValue: string) => {
    if (disabled) return;
    if (multiSelect) {
      console.log(
        value,
        Array.isArray(value),
        value?.includes(selectValue)
        // value?.filter((i) => i !== selectValue)
      );

      const newValue = Array.isArray(value)
        ? value.includes(selectValue)
          ? value.filter((i) => i !== selectValue)
          : [...value, selectValue]
        : [selectValue];
      onChange?.(newValue);
    } else {
      setOpen(false);
      onChange?.(selectValue);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    if (disabled) return; // Prevent clear when disabled
    e.stopPropagation();
    onChange?.(multiSelect ? [] : "");
  };

  const handleAdd = () => {
    if (disabled || !addable || !search || !onCreate) return; // Prevent add when disabled
    onCreate(search);
    if (multiSelect) {
      const newValue = Array.isArray(value) ? [...value, search] : [search];
      onChange?.(newValue);
    } else {
      onChange?.(search);
      setOpen(false);
    }
    setSearch("");
  };

  const handleRemove = (e: React.MouseEvent, valueToRemove: string) => {
    if (disabled) return; // Prevent remove when disabled
    e.stopPropagation();

    onRemove?.(valueToRemove);
    if (multiSelect && Array.isArray(value)) {
      onChange?.(value.filter((v) => v !== valueToRemove));
    } else if (value === valueToRemove) {
      onChange?.("");
    }
  };

  const searchValues = (): Option[] => {
    if (!search) return getChild(options);
    return getChild(options).filter((i) =>
      i.label.toLowerCase().includes(search.toLowerCase())
    );
  };

  const normalize = (val: string) => {
    if (typeof val == "string") {
      return val?.trim().toLowerCase();
    }
    return val;
  };

  const flatOptions = getChild(options);
  const optionValue = flatOptions.filter((i) =>
    multiSelect && Array.isArray(value)
      ? value.some((v) => normalize(v) === normalize(i.value))
      : normalize(i.value) === normalize(value as string)
  );

  const handleKeyDownOnContainer = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };

  const iconClasses = {
    sm: "min-w-4 size-4 lg:size-5",
    lg: "min-w-5 size-5 lg:size-6",
  };

  return (
    <div
      ref={containerRef}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDownOnContainer}
      // onClick={() => !disabled && setOpen((prev) => !prev)}
      className={cn(
        "inline-block w-full relative select-none",
        "focus-visible:ring-[1.5px] focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:outline-none rounded-md"
      )}
    >
      <div
        id={"searchable_select_trigger_" + id}
        data-disabled={disabled}
        aria-invalid={hasError}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={cn(
          "px-3 py-1.5 min-h-10 flex items-center text-sm text-popover-foreground text-left font-normal rounded-md border border-input data-[placeholder]:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 border-gray-200 bg-white text-gray-800 focus:outline-none focus:bg-gray-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 w-full",
          "aria-[invalid=true]:ring-destructive/20 dark:aria-[invalid=true]:ring-destructive/40 aria-[invalid=true]:border-destructive",
          "data-[disabled=true]:bg-muted/40 data-[disabled=true]:text-foreground/60 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:data-[placeholder]:text-muted-foreground/70",
          open && "!border-primary-500",
          { "cursor-pointer": !disabled }
        )}
      >
        {!value || (multiSelect && Array.isArray(value) && !value.length) ? (
          <span className="text-muted-foreground">{placeholder}</span>
        ) : multiSelect ? (
          <span className="!flex flex-wrap gap-1">
            {optionValue.map((opt) => (
              <Tag
                key={opt.value}
                type="outline"
                variant="primary"
                icon={<XIcon className="!size-3.5" />}
                onClick={(e) => handleRemove(e, opt.value)}
                id={"searchable_select_value_item_" + id + opt.value}
              >
                {opt.label}
              </Tag>
            ))}
          </span>
        ) : (
          <span className="flex items-center gap-1">
            {optionValue[0]?.icon}
            {optionValue[0]?.label}
          </span>
        )}
        <div className="mr-auto flex items-center gap-1">
          {((typeof value === "string" && value.length > 0) ||
            (multiSelect && Array.isArray(value) && value.length > 0)) && (
            <XIcon
              className={cn(
                "w-4 h-4 text-gray-400",
                !disabled && "cursor-pointer hover:text-red-500"
              )}
              onClick={handleClear}
              id={"multi-select-close-icon_" + id}
            />
          )}
          {isLoading ? (
            <Loader2 className="!size-4 !text-muted-foreground animate-spin" />
          ) : (
            <ChevronDown
              id={"open-close-multi-select_" + id}
              // variant="Bold"
              className={cn("opacity-75", iconClasses["sm"])}
            />
          )}
        </div>
      </div>

      <span
        data-state={open ? "open" : "closed"}
        className={`data-[state=open]:block data-[state=closed]:hidden overflow-hidden animate-in w-full fade-in-0 zoom-in-95 absolute z-50 mt-1 bg-white border text-sm text-popover-foreground/80 rounded-lg shadow-md dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400`}
        onKeyDown={handleKeyDown}
      >
        <div
          className={cn(
            "flex items-center border-b relative",
            disabled && "opacity-50"
          )}
        >
          <Input
            ref={(el) => {
              if (el) setTimeout(() => el.focus(), 0);
            }}
            onChange={(e) => !disabled && setSearch(e.target.value)}
            value={search}
            disabled={disabled}
            className={cn(
              "flex !z-[100] h-10 focus-visible:!ring-0 focus-visible:!ring-offset-0 border-none w-full pointer-events-auto ring-0 rounded-md bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            )}
            placeholder={searchPlaceholder}
          />
          {addable && (
            <Button
              size="icon"
              type="button"
              className="!p-1.5 ml-1 size-8 !rounded-sm !text-white cursor-pointer z-50"
              onClick={handleAdd}
              disabled={
                disabled ||
                !search ||
                getChild(options).some(
                  (i) => i.label.toLowerCase() === search.toLowerCase()
                )
              }
            >
              <Plus className="!size-4 !text-white" />
            </Button>
          )}
        </div>
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => !disabled && setActiveIndex(-1)}
          className="max-h-72 overflow-y-auto p-1 space-y-1"
        >
          {isLoading && (
            <div className="w-full p-3 flex items-center">
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Loading...
            </div>
          )}
          {!searchValues().length && !isLoading && (
            <div className="w-full p-3">{emptyStateMessage}</div>
          )}
          {searchValues().map((i, index) => {
            const isEditable = ("isNew" in i && i.isNew) as boolean;
            return (
              <div
                dir="rtl"
                key={i.value}
                ref={index === activeIndex ? activeItemRef : null}
                onClick={() => handleClick(i.value)}
                className={cn(
                  "flex hover:bg-accent rounded-sm hover:text-slate-800 justify-between items-center w-full cursor-pointer px-3 py-2 font-semibold text-sm",
                  activeIndex === index && "bg-accent text-slate-900",
                  disabled && "pointer-events-none opacity-50"
                )}
              >
                <div className="flex items-center gap-1">
                  {i.icon}
                  <span>{i.label}</span>
                </div>
                <span className="flex items-center gap-1 flex-row-reverse">
                  {multiSelect &&
                    Array.isArray(value) &&
                    value.includes(i.value) && (
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          value.includes(i.value) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    )}
                  {isEditable && onRemove && (
                    <XIcon
                      className={cn(
                        "h-4 w-4 text-black ",
                        !disabled && "cursor-pointer hover:text-red-500"
                      )}
                      onClick={(e) => handleRemove(e, i.value)}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </span>
    </div>
  );
}

function getChild(a: Options[] | undefined): Option[] {
  return (a || []).reduce((flattened, option) => {
    if ("label" in option) {
      return flattened.concat([option]);
    }
    return flattened.concat(option.child || []);
  }, [] as Option[]);
}
