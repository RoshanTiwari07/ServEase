import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProviderCardProps {
  name: string;
  rating: number;
  price: string;
  distance: string;
  trustScore: number;
  service: string;
  avatar?: string;
  onPress: () => void;
  onCall: () => void;
  onChat: () => void;
  onBook: () => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({
  name,
  rating,
  price,
  distance,
  trustScore,
  service,
  avatar,
  onPress,
  onCall,
  onChat,
  onBook,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-mocha-50 rounded-2xl p-4 mb-3 border border-gold-accent/20"
      activeOpacity={0.8}
    >
      <View className="flex-row items-center">
        {/* Avatar */}
        <View className="w-16 h-16 rounded-full overflow-hidden bg-charcoal-50 items-center justify-center">
          {avatar ? (
            <Image source={{ uri: avatar }} className="w-full h-full" />
          ) : (
            <Ionicons name="person" size={24} color="#F5B700" />
          )}
        </View>

        {/* Provider Info */}
        <View className="flex-1 ml-4">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-offwhite-50 text-lg font-semibold">
              {name}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#F5B700" />
              <Text className="text-gold-accent text-sm ml-1">{rating}</Text>
            </View>
          </View>

          <Text className="text-warmgrey-50 text-sm mb-2">{service}</Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-4">
              <Text className="text-gold-accent text-sm font-medium">
                ₹{price}
              </Text>
              <Text className="text-warmgrey-50 text-sm">{distance}</Text>
            </View>

            {/* Trust Score */}
            <View className="bg-gold-accent/20 px-2 py-1 rounded-full">
              <Text className="text-gold-accent text-xs font-medium">
                Trust: {trustScore}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row items-center justify-end mt-3 space-x-2">
        <TouchableOpacity
          onPress={onChat}
          className="bg-charcoal-50 px-3 py-2 rounded-full flex-row items-center"
        >
          <Ionicons name="chatbubble-outline" size={14} color="#F5B700" />
          <Text className="text-gold-accent text-xs ml-1">Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onCall}
          className="bg-charcoal-50 px-3 py-2 rounded-full flex-row items-center"
        >
          <Ionicons name="call" size={14} color="#F5B700" />
          <Text className="text-gold-accent text-xs ml-1">Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onBook}
          className="bg-gold-accent px-3 py-2 rounded-full flex-row items-center"
        >
          <Ionicons name="calendar" size={14} color="#1C1C1E" />
          <Text className="text-charcoal-50 text-xs ml-1 font-medium">Book</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProviderCard;