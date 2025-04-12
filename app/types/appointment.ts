// app/types/appointment.ts
export type Appointment = {
    id: string
    date: string
    time: string
    type: 'VIDEO_CALL' | 'AI_DIAGNOSIS' | 'IN_PERSON'
    doctor: { 
        id: string
        name: string
        specialty: string 
    }
    patientName: string
    patientEmail: string
    symptoms?: string
  }