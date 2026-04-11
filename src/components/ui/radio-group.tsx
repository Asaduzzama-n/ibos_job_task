"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"
import React from "react"

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupPrimitive.Props>(
  ({ className, ...props }, ref) => {
    return (
      <RadioGroupPrimitive
        data-slot="radio-group"
        ref={ref}
        className={cn("grid w-full gap-2", className)}
        {...props}
      />
    )
  }
)
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioPrimitive.Root.Props>(
  ({ className, ...props }, ref) => {
    return (
      <RadioPrimitive.Root
        data-slot="radio-group-item"
        ref={ref}
        className={cn(
          "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border-none bg-slate-100 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 data-checked:bg-[#633df5] data-checked:text-white dark:data-checked:bg-[#633df5]",
          className
        )}
        {...props}
      >
        <RadioPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="flex size-4 items-center justify-center"
        >
          <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Root>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
