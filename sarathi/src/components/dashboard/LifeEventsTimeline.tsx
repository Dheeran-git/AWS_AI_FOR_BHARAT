import { Zap } from 'lucide-react'
import type { LifeEventEntry } from '@/types/dashboard'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

interface TimelineProps {
  events: LifeEventEntry[]
}

export function LifeEventsTimeline({ events }: TimelineProps) {
  return (
    <div className="space-y-4" aria-label="Life events timeline">
      {events.map((event, index) => (
        <div key={event.eventId} className="flex gap-3">
          {/* Timeline dot */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#1e3a5f]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-3.5 h-3.5 text-[#1e3a5f]" aria-hidden="true" />
            </div>
            {index < events.length - 1 && (
              <div className="w-0.5 flex-1 bg-slate-100 mt-1" aria-hidden="true" />
            )}
          </div>

          {/* Content */}
          <div className="pb-4 flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-sm font-semibold text-slate-900">{event.eventType}</p>
              <Badge
                intent={
                  event.outreachStatus === 'enrolled'
                    ? 'success'
                    : event.outreachStatus === 'contacted'
                    ? 'info'
                    : 'warning'
                }
              >
                {event.outreachStatus}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mb-2">{event.citizenName} · {formatDate(event.eventDate)}</p>
            <div className="flex flex-wrap gap-1">
              {event.triggeredSchemes.map((scheme) => (
                <span
                  key={scheme}
                  className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full"
                >
                  {scheme.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
