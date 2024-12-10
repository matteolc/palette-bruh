// Tremor Slider [v0.1.0]

"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import clsx from "clsx"

interface SliderProps
    extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    ariaLabelThumb?: string
}

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    SliderProps
>(({ className, ariaLabelThumb, ...props }, forwardedRef) => {
    const value = props.value || props.defaultValue
    return (
        <SliderPrimitive.Root
            ref={forwardedRef}
            className={clsx(
                // base
                "relative flex cursor-pointer touch-none select-none",
                // orientation
                "data-[orientation='horizontal']:w-full data-[orientation='horizontal']:items-center",
                "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-fit data-[orientation='vertical']:justify-center",
                // disabled
                "data-[disabled]:pointer-events-none",
                className,
            )}
            tremor-id="tremor-raw"
            {...props}
        >
            <SliderPrimitive.Track
                className={clsx(
                    // base
                    "relative grow overflow-hidden rounded-full bg-gray-200",
                    // orientation
                    "data-[orientation='horizontal']:h-1.5 data-[orientation='horizontal']:w-full",
                    "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-1.5",
                )}
            >
                <SliderPrimitive.Range
                    className={clsx(
                        // base
                        "absolute rounded-full bg-blue-500",
                        // orientation
                        "data-[orientation='horizontal']:h-full",
                        "data-[orientation='vertical']:w-full",
                        // disabled
                        "data-[disabled]:bg-gray-300",
                    )}
                />
            </SliderPrimitive.Track>
            {value?.map((_, index) => (
                <SliderPrimitive.Thumb
                    key={index}
                    className={clsx(
                        // base
                        "block size-[17px] shrink-0 rounded-full border shadow transition-all",
                        // boder color
                        "border-gray-400",
                        // background color
                        "bg-white",
                        // disabled
                        "data-[disabled]:pointer-events-none data-[disabled]:bg-gray-200",
                        "outline-offset-0",
                    )}
                    aria-label={ariaLabelThumb}
                />
            ))}
        </SliderPrimitive.Root>
    )
})

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }