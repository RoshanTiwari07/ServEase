import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProviderCardProps {
  name: string;
  rating: number;
  price: string;
  distance: string;
  trustScore: number;
  service: string;
  avatar?: string;
}

export default function ProviderCard({ 
  name, 
  rating, 
  price, 
  distance, 
  trustScore, 
  service,
  avatar 
}: ProviderCardProps) {
  return (
    <View className="bg-mocha-50 rounded-2xl p-4 mb-4 shadow-lg">
      {/* Top Row: Avatar, Name, Trust Badge, Distance */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          {/* Avatar */}
          <View className="w-12 h-12 bg-charcoal-50 rounded-full items-center justify-center mr-3">
            {avatar ? (
              <Image source={{ uri: avatar }} className="w-10 h-10 rounded-full" />
            ) : (
              <Ionicons name="person" size={20} color="#F2F2F7" />
            )}
          </View>
          
          {/* Name and Service */}
          <View className="flex-1">
            <Text className="text-offwhite-50 font-semibold text-base">{name}</Text>
            <Text className="text-warmgrey-50 text-sm">{service}</Text>
          </View>
        </View>
        
        {/* Trust Badge and Distance */}
        <View className="items-end">
          {trustScore >= 4.5 && (
            <View className="bg-gold-accent px-2 py-1 rounded-full mb-1">
              <Text className="text-charcoal-50 text-xs font-bold">Trusted ⭐</Text>
            </View>
          )}
          <View className="flex-row items-center">
            <Ionicons name="location" size={12} color="#A1A1AA" />
            <Text className="text-warmgrey-50 text-xs ml-1">{distance}</Text>
          </View>
        </View>
      </View>

      {/* Middle: Service Category Tag */}
      <View className="mb-3">
        <View className="bg-charcoal-50 px-3 py-1 rounded-full self-start">
          <Text className="text-offwhite-50 text-xs font-medium">{service}</Text>
        </View>
      </View>

      {/* Bottom Row: Rating, Price, Action Buttons */}
      <View className="flex-row justify-between items-center">
        {/* Rating */}
        <View className="flex-row items-center">
          <Ionicons name="star" size={14} color="#F5B700" />
          <Text className="text-offwhite-50 text-sm ml-1">{rating}</Text>
        </View>
        
        {/* Price */}
        <View className="flex-row items-center">
          <Ionicons name="cash" size={14} color="#2ECC71" />
          <Text className="text-emerald-50 text-sm font-medium ml-1">₹{price}+</Text>
        </View>
        
        {/* Action Buttons */}
        <View className="flex-row space-x-2">
          <TouchableOpacity className="w-8 h-8 bg-charcoal-50 rounded-full items-center justify-center">
            <Ionicons name="chatbubble" size={14} color="#F2F2F7" />
          </TouchableOpacity>
          <TouchableOpacity className="w-8 h-8 bg-gold-accent rounded-full items-center justify-center">
            <Ionicons name="call" size={14} color="#1C1C1E" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}