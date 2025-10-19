import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
];

interface LanguageToggleProps {
  currentLanguage?: string;
  onLanguageChange?: (language: Language) => void;
}

export default function LanguageToggle({ 
  currentLanguage = 'en', 
  onLanguageChange 
}: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find(lang => lang.code === currentLanguage) || languages[0]
  );

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    onLanguageChange?.(language);
  };

  return (
    <View className="relative">
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="bg-mocha-50 rounded-full px-4 py-2 flex-row items-center border border-gold-accent/30"
      >
        <Ionicons name="language" size={16} color="#F5B700" />
        <Text className="text-offwhite-50 text-sm ml-2 mr-1">
          {selectedLanguage.nativeName}
        </Text>
        <Ionicons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={16} 
          color="#A1A1AA" 
        />
      </TouchableOpacity>

      {isOpen && (
        <View className="absolute top-full left-0 right-0 bg-mocha-50 rounded-2xl mt-2 border border-gold-accent/30 shadow-lg z-50">
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              onPress={() => handleLanguageSelect(language)}
              className={`px-4 py-3 flex-row items-center justify-between ${
                language.code === selectedLanguage.code ? 'bg-gold-accent/20' : ''
              }`}
            >
              <View>
                <Text className="text-offwhite-50 font-medium">{language.nativeName}</Text>
                <Text className="text-warmgrey-50 text-xs">{language.name}</Text>
              </View>
              {language.code === selectedLanguage.code && (
                <Ionicons name="checkmark" size={16} color="#F5B700" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}