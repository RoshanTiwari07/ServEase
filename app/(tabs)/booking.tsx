import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

type BookingStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  providerName: string;
  service: string;
  date: string;
  time: string;
  status: BookingStatus;
  price: string;
  address: string;
  providerImage?: string;
  rating?: number;
}

const dummyBookings: Booking[] = [
  {
    id: '1',
    providerName: 'Rajesh Kumar',
    service: 'Plumbing Repair',
    date: '2025-01-20',
    time: '10:00 AM',
    status: 'upcoming',
    price: '300',
    address: 'Sector 15, Noida',
    providerImage: 'https://picsum.photos/seed/rajesh/100/100',
  },
  {
    id: '2',
    providerName: 'Priya Sharma',
    service: 'House Cleaning',
    date: '2025-01-18',
    time: '2:00 PM',
    status: 'ongoing',
    price: '250',
    address: 'Gomti Nagar, Lucknow',
    providerImage: 'https://picsum.photos/seed/priya/100/100',
  },
  {
    id: '3',
    providerName: 'Vikram Singh',
    service: 'Carpenter Work',
    date: '2025-01-15',
    time: '11:00 AM',
    status: 'completed',
    price: '400',
    address: 'Civil Lines, Allahabad',
    rating: 4.8,
    providerImage: 'https://picsum.photos/seed/vikram/100/100',
  },
  {
    id: '4',
    providerName: 'Anjali Patel',
    service: 'Beauty Service',
    date: '2025-01-12',
    time: '4:00 PM',
    status: 'cancelled',
    price: '350',
    address: 'Vastrapur, Ahmedabad',
    providerImage: 'https://picsum.photos/seed/anjali/100/100',
  },
];

const statusConfig = {
  upcoming: { color: '#F5B700', bg: 'bg-gold-accent/20', text: 'Upcoming' },
  ongoing: { color: '#2ECC71', bg: 'bg-emerald-50/20', text: 'Ongoing' },
  completed: { color: '#A1A1AA', bg: 'bg-warmgrey-50/20', text: 'Completed' },
  cancelled: { color: '#FF6B6B', bg: 'bg-red-500/20', text: 'Cancelled' },
};

export default function BookingScreen() {
  const [bookings] = useState(dummyBookings);

  // Show all bookings without filtering
  const allBookings = bookings;

  const renderBookingCard = ({ item }: { item: Booking }) => {
    const config = statusConfig[item.status];
    
    return (
      <View className="bg-mocha-50 rounded-2xl p-4 mb-4 border border-gold-accent/30">
        {/* Header */}
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 bg-charcoal-50 rounded-full items-center justify-center mr-3">
              {item.providerImage ? (
                <Image source={{ uri: item.providerImage }} className="w-12 h-12 rounded-full" />
              ) : (
                <Ionicons name="person" size={20} color="#F2F2F7" />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-offwhite-50 font-semibold text-base">{item.providerName}</Text>
              <Text className="text-warmgrey-50 text-sm">{item.service}</Text>
            </View>
          </View>
          <View className={`px-3 py-1 rounded-full ${config.bg}`}>
            <Text className="text-xs font-medium" style={{ color: config.color }}>
              {config.text}
            </Text>
          </View>
        </View>

        {/* Date & Time */}
        <View className="flex-row items-center mb-2">
          <Ionicons name="calendar" size={16} color="#F5B700" />
          <Text className="text-offwhite-50 text-sm ml-2">{item.date}</Text>
          <Ionicons name="time" size={16} color="#F5B700" className="ml-4" />
          <Text className="text-offwhite-50 text-sm ml-2">{item.time}</Text>
        </View>

        {/* Address */}
        <View className="flex-row items-center mb-3">
          <Ionicons name="location" size={16} color="#A1A1AA" />
          <Text className="text-warmgrey-50 text-sm ml-2 flex-1">{item.address}</Text>
        </View>

        {/* Bottom Row */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name="cash" size={16} color="#2ECC71" />
            <Text className="text-emerald-50 font-semibold ml-1">₹{item.price}</Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-2">
            {item.status === 'upcoming' && (
              <>
                <TouchableOpacity className="bg-charcoal-50 px-4 py-2 rounded-full">
                  <Text className="text-offwhite-50 text-xs">Reschedule</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gold-accent px-4 py-2 rounded-full">
                  <Text className="text-charcoal-50 text-xs font-medium">Call</Text>
                </TouchableOpacity>
              </>
            )}
            {item.status === 'ongoing' && (
              <TouchableOpacity className="bg-emerald-50 px-4 py-2 rounded-full">
                <Text className="text-charcoal-50 text-xs font-medium">Track</Text>
              </TouchableOpacity>
            )}
            {item.status === 'completed' && (
              <TouchableOpacity className="bg-gold-accent px-4 py-2 rounded-full">
                <Text className="text-charcoal-50 text-xs font-medium">Rate & Review</Text>
              </TouchableOpacity>
            )}
            {item.status === 'cancelled' && (
              <TouchableOpacity className="bg-charcoal-50 px-4 py-2 rounded-full">
                <Text className="text-offwhite-50 text-xs">Rebook</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-charcoal-50">
      {/* Header */}
      <View className="bg-premium-gradient pb-6 rounded-b-3xl">
        <View className="px-6 pt-12">
          <Text className="text-offwhite-50 text-2xl font-bold mb-2">My Bookings</Text>
          <Text className="text-warmgrey-50 text-sm">Track and manage your service bookings</Text>
        </View>
      </View>



      {/* Bookings Section */}
      <View className="px-6 mt-4">
        <Text className="text-offwhite-50 text-lg font-semibold mb-4">All Bookings</Text>
      </View>

      {/* Bookings List */}
      {allBookings.length > 0 ? (
        <FlatList
          data={allBookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingCard}
          contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="calendar-outline" size={64} color="#A1A1AA" />
          <Text className="text-offwhite-50 text-lg font-semibold mt-4 text-center">
            No bookings found
          </Text>
          <Text className="text-warmgrey-50 text-sm text-center mt-2">
            You haven't made any bookings yet. Start by finding a service provider!
          </Text>
          <TouchableOpacity className="bg-gold-accent px-6 py-3 rounded-full mt-6">
            <Text className="text-charcoal-50 font-medium">Find Services</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}