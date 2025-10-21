import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, XCircle, PlusCircle, ToggleLeft } from "lucide-react";
import type { Column } from "@tanstack/react-table";

interface DataTableBooleanFilterProps<TData> {
  column: Column<TData, unknown>;
  title?: string;
  trueLabel?: string;
  falseLabel?: string;
}

interface BooleanOption {
  label: string;
  value: boolean;
}

/**
 * A reusable boolean filter component for data tables.
 * It provides a popover with "Yes" and "No" options to filter boolean columns.
 * @template TData The type of the data in the table.
 * @param {DataTableBooleanFilterProps<TData>} props The component props.
 * @returns {React.ReactElement} The rendered component.
 */
export function DataTableBooleanFilter<TData>({
  column,
  title,
  trueLabel = "بله",
  falseLabel = "خیر",
}: DataTableBooleanFilterProps<TData>) {
  const [open, setOpen] = React.useState(false);

  const columnFilterValue = column.getFilterValue() as boolean | undefined;

  const options: BooleanOption[] = React.useMemo(() => {
    return [
      { label: trueLabel, value: true },
      { label: falseLabel, value: false },
    ];
  }, [trueLabel, falseLabel]);

  const onSelect = React.useCallback(
    (value: boolean) => {
      if (columnFilterValue === value) {
        column.setFilterValue(undefined);
      } else {
        column.setFilterValue(value);
      }
      setOpen(false);
    },
    [column, columnFilterValue]
  );

  const onReset = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      column.setFilterValue(undefined);
      setOpen(false);
    },
    [column]
  );

  const selectedLabel = React.useMemo(() => {
    if (columnFilterValue === true) {
      return trueLabel;
    }
    if (columnFilterValue === false) {
      return falseLabel;
    }
    return undefined;
  }, [columnFilterValue, trueLabel, falseLabel]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" model="outline">
          {selectedLabel ? (
            <div
              tabIndex={0}
              role="button"
              onClick={onReset}
              aria-label={`Clear ${title} filter`}
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <XCircle className="text-primary-500" />
            </div>
          ) : (
            <ToggleLeft className="text-primary-500" />
          )}
          {title}
          {selectedLabel && (
            <>
              <Separator
                orientation="vertical"
                className="mx-0.5 data-[orientation=vertical]:h-4"
              />
              <span className="truncate">{selectedLabel}</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12.5rem] p-0" align="start">
        <Command>
          <CommandList className="max-h-full">
            <CommandEmpty>نتیجه ای یافت نشد</CommandEmpty>
            <CommandGroup className="max-h-[18.75rem] overflow-y-auto overflow-x-hidden">
              {options.map((option) => {
                const isSelected = columnFilterValue === option.value;
                return (
                  <CommandItem
                    key={option.label}
                    onSelect={() => onSelect(option.value)}
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary-500"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check color={isSelected ? "white" : undefined} />
                    </div>
                    <span className="truncate">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedLabel && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onReset()}
                    className="justify-center text-center"
                  >
                    پاک کردن فیلتر
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
