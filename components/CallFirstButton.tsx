import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface CallFirstButtonProps {
  phoneNumber: string;
  providerName: string;
  onPress?: () => void;
}

export default function CallFirstButton({ phoneNumber, providerName, onPress }: CallFirstButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gold-accent rounded-full px-4 py-3 flex-row items-center justify-center shadow-lg"
      activeOpacity={0.8}
    >
      <Ionicons name="call" size={18} color="#1C1C1E" />
      <View className="ml-2">
        <Text className="text-charcoal-50 font-semibold text-sm">Call First</Text>
        <Text className="text-charcoal-50/70 text-xs">Preferred in Tier-2/3 cities</Text>
      </View>
    </TouchableOpacity>
  );
}