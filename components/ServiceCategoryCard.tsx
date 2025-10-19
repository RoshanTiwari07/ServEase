import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ServiceCategoryCardProps {
  title: string;
  description: string;
  icon: string;
  providerCount: number;
  averagePrice: string;
  image?: string;
  onPress: () => void;
}

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({
  title,
  description,
  icon,
  providerCount,
  averagePrice,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-mocha-50 rounded-2xl p-4 mb-3 border border-gold-accent/20"
      activeOpacity={0.8}
    >
      <View className="flex-row items-center">
        {/* Icon/Image */}
        <View className="w-16 h-16 rounded-2xl overflow-hidden bg-charcoal-50 items-center justify-center">
          {image ? (
            <Image source={{ uri: image }} className="w-full h-full" />
          ) : (
            <Ionicons name={icon as any} size={28} color="#F5B700" />
          )}
        </View>

        {/* Service Info */}
        <View className="flex-1 ml-4">
          <Text className="text-offwhite-50 text-lg font-semibold mb-1">
            {title}
          </Text>
          <Text className="text-warmgrey-50 text-sm mb-2" numberOfLines={2}>
            {description}
          </Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-gold-accent text-sm font-medium">
              From ₹{averagePrice}
            </Text>
            <Text className="text-warmgrey-50 text-sm">
              {providerCount}+ providers
            </Text>
          </View>
        </View>

        {/* Arrow */}
        <View className="ml-2">
          <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCategoryCard;