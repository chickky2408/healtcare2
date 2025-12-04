'use client';

import { useApp } from '../contexts/AppContext';
import { Sun, Moon, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeLanguageToggle() {
  const { theme, language, setTheme, setLanguage, t } = useApp();

  return (
    <div className="flex items-center gap-2">
      {/* Language Toggle */}
      <motion.button
        onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={t('settings.language')}
      >
        <Languages size={18} />
        <span className="text-sm font-medium">
          {language === 'en' ? 'EN' : 'TH'}
        </span>
      </motion.button>

      {/* Theme Toggle */}
      <motion.button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={t('settings.theme')}
      >
        {theme === 'dark' ? (
          <>
            <Sun size={18} />
            <span className="text-sm font-medium">{t('theme.light')}</span>
          </>
        ) : (
          <>
            <Moon size={18} />
            <span className="text-sm font-medium">{t('theme.dark')}</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
