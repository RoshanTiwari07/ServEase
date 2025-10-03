import { View, Text } from 'react-native';

export default function BookingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-2xl font-bold text-gray-800">Booking Tab</Text>
      <Text className="text-gray-600 mt-2">Your bookings will appear here</Text>
    </View>
  );
}