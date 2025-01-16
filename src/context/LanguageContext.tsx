import React, { createContext, useContext, useState } from 'react';
import { en } from '../translations/en';
import { sq } from '../translations/sq';
import { Translation } from '../types';

type Language = 'en' | 'sq';

interface LanguageContextType {
  language: Language;
  translations: Translation;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const translations = language === 'en' ? en : sq;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'sq' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, translations, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};