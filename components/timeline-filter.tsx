"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"

export function TimelineFilter() {
  const [timeFilter, setTimeFilter] = useState("all")

  return (
    <div className="flex items-center gap-2">
      <Select defaultValue="all" onValueChange={setTimeFilter}>
        <SelectTrigger className="w-[140px]">
          <Calendar className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Timeline" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

