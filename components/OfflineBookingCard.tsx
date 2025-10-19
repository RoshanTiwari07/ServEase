import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

interface OfflineBookingCardProps {
  providerName: string;
  service: string;
  phone: string;
  onSaveForLater?: () => void;
}

export default function OfflineBookingCard({
  providerName,
  service,
  phone,
  onSaveForLater
}: OfflineBookingCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveForLater = () => {
    setIsSaved(true);
    onSaveForLater?.();
    Alert.alert(
      'Saved for Later',
      'This booking has been saved. You can complete it when your connection improves.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View className="bg-mocha-50 rounded-2xl p-4 border border-gold-accent/30 mb-4">
      <View className="flex-row items-center mb-3">
        <Ionicons name="wifi-outline" size={20} color="#FF6B6B" />
        <Text className="text-warmgrey-50 text-sm ml-2">Weak network detected</Text>
      </View>
      
      <Text className="text-offwhite-50 font-semibold text-base mb-1">{providerName}</Text>
      <Text className="text-warmgrey-50 text-sm mb-3">{service}</Text>
      
      <View className="flex-row space-x-3">
        <TouchableOpacity
          onPress={handleSaveForLater}
          disabled={isSaved}
          className={`flex-1 rounded-full px-4 py-3 items-center ${
            isSaved ? 'bg-emerald-50/20' : 'bg-gold-accent'
          }`}
        >
          <View className="flex-row items-center">
            <Ionicons 
              name={isSaved ? "checkmark" : "bookmark"} 
              size={16} 
              color={isSaved ? "#2ECC71" : "#1C1C1E"} 
            />
            <Text className={`ml-2 font-medium ${
              isSaved ? 'text-emerald-50' : 'text-charcoal-50'
            }`}>
              {isSaved ? 'Saved' : 'Save for Later'}
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-1 bg-charcoal-50 rounded-full px-4 py-3 items-center">
          <View className="flex-row items-center">
            <Ionicons name="call" size={16} color="#F2F2F7" />
            <Text className="text-offwhite-50 ml-2 font-medium">Call Now</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      {isSaved && (
        <View className="mt-3 p-3 bg-emerald-50/10 rounded-lg">
          <Text className="text-emerald-50 text-xs">
            💡 Tip: You can find saved bookings in your Profile → Saved Items
          </Text>
        </View>
      )}
    </View>
  );
}