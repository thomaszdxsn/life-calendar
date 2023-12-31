import dayjs from 'dayjs'
import { useMemo } from 'react'
import weekOfYearPlugin from 'dayjs/plugin/weekOfYear'
import weekYearPlugin from 'dayjs/plugin/weekYear'
dayjs.extend(weekOfYearPlugin)
dayjs.extend(weekYearPlugin)

interface Props {
  className?: string
  maxAge?: number
  currentAge: number
}

const weeksOnOneYear = Array.from({ length: 52 }, (_, i) => i + 1)

const weeksOnNYear = (n: number): number[][] => {
  return Array.from({ length: n }).fill(weeksOnOneYear) as number[][]
}


const LifeCalendar: React.FC<Props> = ({ className, maxAge = 90, currentAge }) => {
  const years = useMemo(() => weeksOnNYear(maxAge), [maxAge])
  const currentWeekInYear = dayjs().weekYear()
  return (
    <main className={["@container flex flex-col gap-2", className ?? ""].join(" ")}>
      <XAxis />
      <div className='flex gap-2'>
        <YAxis maxAge={maxAge} />
        <div className="grid grid-cols-52 gap-2 flex-1">
          {years.map((yearWeeks, yearIndex) => {
            return yearWeeks.map((week) => {
              const year = yearIndex + 1
              const isPast = year < currentAge || (year === currentAge && week <= currentWeekInYear)
              return <Cell key={`${year}-${week}`} isPast={isPast} />
            })
          })}
        </div>

      </div>
    </main>
  )
}

export default LifeCalendar


interface CellProps {
  isPast: boolean
}

interface XAxisProps {
  className?: string
  label?: (week: number) => string
}

interface YAxisProps {
  className?: string
  label?: (year: number) => string
  maxAge: number
}

const Cell: React.FC<CellProps> = ({ isPast }) => {
  const cellClassName = [
    "w-2 h-2 border border-solid border-gray-400",
    "@5xl:w-4 @5xl:h-4",
    "@xl:w-3 @xl:h-3",
    isPast ? "bg-blue-500" : "",
  ].join(" ")
  return <div className={cellClassName} />
}


const XAxis: React.FC<XAxisProps> = ({ label = (week) => week % 10 === 0, className }) => {
  return (
    <div className={[
      "grid grid-cols-52",
      className ?? "",
    ].join(" ")}>
      {weeksOnOneYear.map((week) => {
        return (
          <div key={week}>
            {label(week) && <span className="text-xs">{week}</span>}
          </div>
        )
      })}
    </div>
  )
}

const YAxis: React.FC<YAxisProps> = ({ label = (year) => year % 10 === 0, className }) => {
  return (
    <div className={[
      "flex flex-col justify-between",
      className ?? "",
    ].join(" ")}>
      {Array.from({ length: 90 }).map((_, i) => {
        const year = i + 1
        return (
          <div key={year} className="flex-grow-0 text-xs">
            {label(year) && <span>{year}</span>}
          </div>
        )
      })}
    </div>
  )
}