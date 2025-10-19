import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export default function SearchInstructions() {
  return (
    <View className="mx-6 mt-4 bg-gold-accent/10 rounded-2xl p-4 border border-gold-accent/30">
      <View className="flex-row items-center mb-2">
        <Ionicons name="information-circle" size={20} color="#F5B700" />
        <Text className="text-gold-accent font-semibold ml-2">How to Search</Text>
      </View>
      <Text className="text-offwhite-50 text-sm leading-5">
        • Tap the search bar above to go to the Search tab{'\n'}
        • Click any service category to search for that service{'\n'}
        • Use the Search tab to find providers and services
      </Text>
    </View>
  );
}