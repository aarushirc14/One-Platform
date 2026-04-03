import { divisionName } from '@/pulse/data/division'
import { cn } from '@/lib/cn'
import { pulsePageEyebrow, pulsePageTitle } from '@/pulse/ui/pulseTypography'

type PulsePageHeadingProps = {
  title: string
  className?: string
  headingClassName?: string
}

/** Division name (sub-heading) above the main page title — consistent across Pulse pages. */
export function PulsePageHeading({ title, className, headingClassName }: PulsePageHeadingProps) {
  return (
    <div className={className}>
      <p className={pulsePageEyebrow}>{divisionName}</p>
      <h1 className={cn('mt-1', pulsePageTitle, headingClassName)}>{title}</h1>
    </div>
  )
}
