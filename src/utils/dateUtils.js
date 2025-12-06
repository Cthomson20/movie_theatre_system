export function formatNiceDate(dateString) {
  if (!dateString) return 'Choose date'

  const [yStr, mStr, dStr] = dateString.split('-')
  const year = Number(yStr)
  const monthIndex = Number(mStr) - 1  
  const dayNum = Number(dStr)

  const d = new Date(year, monthIndex, dayNum)
  if (Number.isNaN(d.getTime())) {
    return dateString
  }

  const dayName = d.toLocaleDateString('en-US', { weekday: 'long' })
  const monthName = d.toLocaleDateString('en-US', { month: 'long' })
  
  // Add suffix (st, nd, rd, th) to day
  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) return 'th'
    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  return `${dayName}, ${monthName} ${dayNum}${getDaySuffix(dayNum)}, ${year}`
}
