import { Text, View } from 'react-native';

export default function BookingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-charcoal-50 pb-32">
      <Text className="text-2xl font-bold text-offwhite-50">Booking Tab</Text>
      <Text className="text-warmgrey-50 mt-2">Your bookings will appear here</Text>
    </View>
  );
}