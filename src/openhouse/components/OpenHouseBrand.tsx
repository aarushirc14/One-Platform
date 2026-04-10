import { cn } from '@/lib/cn'

export function OpenHouseBrand({
  compact,
  className,
}: {
  compact?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200/80',
          compact ? 'h-10 w-10' : 'h-12 w-12',
        )}
      >
        <img
          src={`${import.meta.env.BASE_URL}openhouse-logo.png`}
          alt=""
          width={compact ? 40 : 48}
          height={compact ? 40 : 48}
          className={cn('object-contain', compact ? 'h-10 w-10 p-1' : 'h-12 w-12 p-1.5')}
          decoding="async"
        />
      </div>
      <div
        className="min-w-0 leading-none"
        style={{ fontFamily: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif' }}
      >
        <span className={cn('block font-bold tracking-tight', compact ? 'text-[13px]' : 'text-[16px]')}>
          <span className="text-neutral-500">O</span>
          <span className="text-[#e57b30]">p</span>
          <span className="text-neutral-500">en</span>
        </span>
        <span
          className={cn('mt-0.5 block font-bold tracking-tight', compact ? 'text-[13px]' : 'text-[16px]')}
        >
          <span className="text-neutral-500">H</span>
          <span className="text-[#139a9a]">o</span>
          <span className="text-neutral-500">mes</span>
        </span>
      </div>
    </div>
  )
}
