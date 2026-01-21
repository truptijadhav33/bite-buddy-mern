import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export default function CustomSelect({
    value,
    onValueChange,
    placeholder,
    options = [],
}) {
    return (
        <Select.Root value={value} onValueChange={onValueChange}>
            <Select.Trigger
                className="border-white/10 text-muted-foreground bg-white/5 focus:border-primary/50
          flex h-10 w-full items-center justify-between
          rounded-md px-3 text-sm
          border focus:outline-none focus:ring-1 focus:ring-primary
        "
            >
                <Select.Value placeholder={placeholder} />
                <Select.Icon>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    className="
            z-50 min-w-[var(--radix-select-trigger-width)]
            overflow-hidden rounded-md
            bg-[#262728] border border-white/10
            shadow-xl
          "
                >
                    <Select.Viewport className="p-1">
                        {options.map((opt) => (
                            <Select.Item
                                key={opt.value}
                                value={opt.value}
                                className="
                  relative flex cursor-pointer select-none items-center
                  rounded-sm px-8 py-2 text-sm text-muted-foreground
                  outline-none
                  data-[highlighted]:bg-primary
                  data-[highlighted]:text-white
                "
                            >
                                <Select.ItemText>{opt.label}</Select.ItemText>
                                <Select.ItemIndicator className="absolute left-2">
                                    <Check className="h-4 w-4" />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}
