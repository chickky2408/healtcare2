'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Theme types
export type Theme = 'dark' | 'light';
export type Language = 'en' | 'th';

interface AppContextType {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.appointments': 'Appointments',
    'dashboard.totalAppointments': 'Total Appointments',
    'dashboard.upcoming': 'Upcoming',
    'dashboard.quickAction': 'Quick Action',
    'dashboard.bookNew': 'Book New Appointment',
    'dashboard.addAppointment': 'Add Appointment',
    'dashboard.noAppointments': 'No appointments found',
    'dashboard.bookFirst': 'Book Your First Appointment',
    'dashboard.paymentHistory': 'Payment History',

    // Menu
    'menu.dashboard': 'Dashboard',
    'menu.appointmentsDetail': 'Appointments Detail',
    'menu.telemedicine': 'Telemedicine',
    'menu.aiAnalysis': 'AI Analysis',
    'menu.myInformation': 'My Information',
    'menu.myProfile': 'My Profile',
    'menu.logout': 'Logout',

    // Appointments
    'appointments.edit': 'Edit',
    'appointments.cancel': 'Cancel',
    'appointments.payment': 'Payment',
    'appointments.chat': 'Chat',
    'appointments.all': 'All',
    'appointments.notDone': 'Not Done (Soon)',
    'appointments.done': 'Done (Finished)',

    // Common
    'common.healthcarePlus': 'HealthCare+',
    'common.manage': 'Manage your healthcare appointments',
    'common.today': 'You have an appointment today!',

    // Theme & Language
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    'theme.dark': 'Dark',
    'theme.light': 'Light',
    'lang.en': 'EN',
    'lang.th': 'TH',
  },
  th: {
    // Dashboard
    'dashboard.welcome': 'ยินดีต้อนรับกลับมา',
    'dashboard.appointments': 'การนัดหมาย',
    'dashboard.totalAppointments': 'การนัดหมายทั้งหมด',
    'dashboard.upcoming': 'กำลังจะมาถึง',
    'dashboard.quickAction': 'เมนูด่วน',
    'dashboard.bookNew': 'จองนัดหมายใหม่',
    'dashboard.addAppointment': 'เพิ่มการนัดหมาย',
    'dashboard.noAppointments': 'ไม่พบการนัดหมาย',
    'dashboard.bookFirst': 'จองนัดหมายแรกของคุณ',
    'dashboard.paymentHistory': 'ประวัติการชำระเงิน',

    // Menu
    'menu.dashboard': 'แดชบอร์ด',
    'menu.appointmentsDetail': 'รายละเอียดการนัดหมาย',
    'menu.telemedicine': 'การแพทย์ทางไกล',
    'menu.aiAnalysis': 'วิเคราะห์ AI',
    'menu.myInformation': 'ข้อมูลของฉัน',
    'menu.myProfile': 'โปรไฟล์ของฉัน',
    'menu.logout': 'ออกจากระบบ',

    // Appointments
    'appointments.edit': 'แก้ไข',
    'appointments.cancel': 'ยกเลิก',
    'appointments.payment': 'ชำระเงิน',
    'appointments.chat': 'แชท',
    'appointments.all': 'ทั้งหมด',
    'appointments.notDone': 'ยังไม่เสร็จ (เร็วๆ นี้)',
    'appointments.done': 'เสร็จแล้ว',

    // Common
    'common.healthcarePlus': 'HealthCare+',
    'common.manage': 'จัดการการนัดหมายด้านสุขภาพของคุณ',
    'common.today': 'คุณมีนัดหมายวันนี้!',

    // Theme & Language
    'settings.theme': 'ธีม',
    'settings.language': 'ภาษา',
    'theme.dark': 'มืด',
    'theme.light': 'สว่าง',
    'lang.en': 'อังกฤษ',
    'lang.th': 'ไทย',
  },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [language, setLanguageState] = useState<Language>('en');

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLanguage = localStorage.getItem('language') as Language;

    if (savedTheme) setThemeState(savedTheme);
    if (savedLanguage) setLanguageState(savedLanguage);
  }, []);

  // Save preferences and apply theme to document
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <AppContext.Provider value={{ theme, language, setTheme, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
