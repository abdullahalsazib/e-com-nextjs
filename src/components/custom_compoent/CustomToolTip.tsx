import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export const CustomToolTip = ({
    children, bodyContent
}: {
    children: React.ReactNode | any,
    bodyContent: string
}) => {
    return (
        <Tooltip>
            <TooltipTrigger>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p>{bodyContent}</p>
            </TooltipContent>
        </Tooltip >
    )
}