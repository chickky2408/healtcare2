// // healthcare2/lib/timeUtils.ts

// export function generateTimeSlots(): string[] {
//     const times: string[] = []
//     const startHour = 9
//     const endHour = 17
//     const interval = 30
  
//     for (let hour = startHour; hour <= endHour; hour++) {
//       for (let min = 0; min < 60; min += interval) {
//         const h = hour.toString().padStart(2, '0')
//         const m = min.toString().padStart(2, '0')
//         times.push(`${h}:${m}`)
//       }
//     }
  
//     return times
//   }
  
//   export function isPastDateTime(dateStr: string, timeStr: string): boolean {
//     const now = new Date()
//     const selectedDate = new Date(`${dateStr}T${timeStr}`)
//     return selectedDate < now
//   }



// lib/timeUtils.ts

// export function generateTimeSlots() {
//     const times: string[] = []
//     for (let hour = 9; hour <= 17; hour++) {
//       times.push(`${hour.toString().padStart(2, '0')}:00`)
//       times.push(`${hour.toString().padStart(2, '0')}:30`)
//     }
//     return times
//   }
  
//   export function isPastDateTime(date: string, time: string) {
//     const [hour, minute] = time.split(':').map(Number)
//     const inputDate = new Date(date)
//     inputDate.setHours(hour, minute, 0, 0)
  
//     const now = new Date()
//     return inputDate < now
//   }







// lib/timeUtils.ts

export function generateTimeSlots(): string[] {
    const slots: string[] = []
    for (let hour = 9; hour <= 17; hour++) {
      for (const minute of [0, 30]) {
        const h = hour.toString().padStart(2, '0')
        const m = minute.toString().padStart(2, '0')
        slots.push(`${h}:${m}`)
      }
    }
    return slots
  }
  
  export function isPastDateTime(date: string, time: string): boolean {
    const [hour, minute] = time.split(':').map(Number)
    const selected = new Date(date)
    selected.setHours(hour, minute, 0, 0)
  
    return selected.getTime() < new Date().getTime()
  }