import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-2xl font-bold text-gray-800">Profile Tab</Text>
      <Text className="text-gray-600 mt-2">Your profile will appear here</Text>
    </View>
  );
}