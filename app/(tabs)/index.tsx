import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ProviderCard from '../../components/ProviderCard';

// Dummy data for providers
const dummyProviders = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    rating: 4.8,
    price: '300',
    distance: '1.2 km',
    trustScore: 4.9,
    service: 'Plumber',
    avatar: undefined,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    rating: 4.5,
    price: '250',
    distance: '0.8 km',
    trustScore: 4.7,
    service: 'Electrician',
    avatar: undefined,
  },
  {
    id: '3',
    name: 'Vikram Singh',
    rating: 4.2,
    price: '400',
    distance: '2.1 km',
    trustScore: 4.3,
    service: 'Carpenter',
    avatar: undefined,
  },
  {
    id: '4',
    name: 'Anjali Patel',
    rating: 4.9,
    price: '350',
    distance: '1.5 km',
    trustScore: 4.8,
    service: 'Beautician',
    avatar: undefined,
  },
  {
    id: '5',
    name: 'Suresh Yadav',
    rating: 4.0,
    price: '200',
    distance: '3.0 km',
    trustScore: 4.0,
    service: 'Tutor',
    avatar: undefined,
  },
];

// Featured services data
const featuredServices = [
  { id: '1', name: 'Plumbing', icon: '🔧' },
  { id: '2', name: 'Cleaning', icon: '🧹' },
  { id: '3', name: 'Beauty', icon: '💅' },
  { id: '4', name: 'Tutoring', icon: '📚' },
  { id: '5', name: 'Electrician', icon: '⚡' },
];

export default function HomeScreen() {
  const [providers, setProviders] = useState(dummyProviders);
  const [userName] = useState('Roshan'); // Static for now

  // Sort providers by trustScore (highest first)
  const sortedProviders = [...providers].sort((a, b) => b.trustScore - a.trustScore);

  return (
    <View className="flex-1 bg-charcoal-50">
      {/* Header Section */}
      <View className="bg-premium-gradient pb-6 rounded-b-3xl">
        <View className="px-6 pt-12">
          <View className="flex-row justify-between items-center mb-4">
            {/* User Avatar */}
            <View className="w-10 h-10 bg-mocha-50 rounded-full items-center justify-center">
              <Ionicons name="person" size={20} color="#F2F2F7" />
            </View>
            
            {/* Greeting */}
            <Text className="text-offwhite-50 text-xl font-semibold">Hi, {userName} 👋</Text>
            
            {/* Notification Bell with Badge */}
            <TouchableOpacity className="relative">
              <Ionicons name="notifications" size={24} color="#F2F2F7" />
              <View className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-50 rounded-full items-center justify-center">
                <Text className="text-xs text-charcoal-50 font-bold">3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search & Filter Row */}
          <View className="flex-row items-center space-x-3">
            <View className="flex-1 bg-mocha-50 rounded-full px-4 py-3 flex-row items-center">
              <Ionicons name="search" size={20} color="#A1A1AA" />
              <Text className="text-warmgrey-50 ml-2">Search services or providers…</Text>
            </View>
            <TouchableOpacity className="bg-gold-accent w-12 h-12 rounded-full items-center justify-center">
              <Ionicons name="filter" size={20} color="#1C1C1E" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Featured Services Carousel */}
        <View className="px-6 pt-6">
          <Text className="text-offwhite-50 text-lg font-semibold mb-4">Featured Services</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
            {featuredServices.map((service) => (
              <View key={service.id} className="bg-mocha-50 rounded-2xl px-6 py-4 items-center w-32">
                <Text className="text-2xl mb-2">{service.icon}</Text>
                <Text className="text-offwhite-50 text-sm font-medium">{service.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Nearby Providers Section */}
        <View className="px-6 pt-8 pb-32">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-offwhite-50 text-lg font-semibold">Nearby Providers</Text>
            <Text className="text-gold-accent text-sm">Trusted First</Text>
          </View>

          <FlatList
            data={sortedProviders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProviderCard
                name={item.name}
                rating={item.rating}
                price={item.price}
                distance={item.distance}
                trustScore={item.trustScore}
                service={item.service}
                avatar={item.avatar}
              />
            )}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-28 right-6 w-16 h-16 bg-gold-accent rounded-full items-center justify-center shadow-lg">
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}