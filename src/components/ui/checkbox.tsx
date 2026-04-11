"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"
import React from "react"

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxPrimitive.Root.Props>(
  ({ className, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        ref={ref}
        className={cn(
          "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border-none bg-slate-100 transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 data-checked:bg-[#633df5] data-checked:text-white dark:data-checked:bg-[#633df5]",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
        >
          <CheckIcon
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  })
Checkbox.displayName = "Checkbox"

export { Checkbox }
