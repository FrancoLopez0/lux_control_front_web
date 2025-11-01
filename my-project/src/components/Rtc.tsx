"use client"

import React from "react"
import { Calendar } from "@/components/Calendar"

export const Rtc = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <div>
      <Calendar enableYearNavigation selected={date} onSelect={setDate} />
      {/* <p className="rounded-sm bg-gray-100 p-2 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-300">
        Selected Date: {date ? date.toLocaleDateString() : "None"}
      </p> */}
    </div>
  )
}