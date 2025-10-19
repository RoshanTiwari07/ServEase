import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

interface ProfileData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  joinDate: string;
  totalBookings: number;
  avatar?: string;
}

const profileData: ProfileData = {
  name: 'Roshan Kumar',
  phone: '+91 98765 43210',
  email: 'roshan.kumar@email.com',
  address: 'Sector 15, Gomti Nagar',
  city: 'Lucknow, UP',
  joinDate: 'January 2024',
  totalBookings: 12,
  avatar: 'https://picsum.photos/seed/roshan/200/200',
};

const menuItems = [
  { id: '1', title: 'Edit Profile', icon: 'person-outline', hasArrow: true },
  { id: '2', title: 'My Addresses', icon: 'location-outline', hasArrow: true },
  { id: '3', title: 'Payment Methods', icon: 'card-outline', hasArrow: true },
  { id: '4', title: 'Notifications', icon: 'notifications-outline', hasToggle: true },
  { id: '5', title: 'Language', icon: 'language-outline', hasArrow: true, subtitle: 'English' },
  { id: '6', title: 'Help & Support', icon: 'help-circle-outline', hasArrow: true },
  { id: '7', title: 'About ServEase', icon: 'information-circle-outline', hasArrow: true },
  { id: '8', title: 'Rate App', icon: 'star-outline', hasArrow: true },
  { id: '9', title: 'Share App', icon: 'share-outline', hasArrow: true },
  { id: '10', title: 'Logout', icon: 'log-out-outline', hasArrow: false, isDestructive: true },
];

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <TouchableOpacity
      key={item.id}
      className={`bg-mocha-50 rounded-2xl p-4 mb-3 flex-row items-center justify-between border border-gold-accent/30 ${
        item.isDestructive ? 'border-red-500/30' : ''
      }`}
    >
      <View className="flex-row items-center flex-1">
        <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
          item.isDestructive ? 'bg-red-500/20' : 'bg-charcoal-50'
        }`}>
          <Ionicons 
            name={item.icon as any} 
            size={20} 
            color={item.isDestructive ? '#FF6B6B' : '#F2F2F7'} 
          />
        </View>
        <View className="flex-1">
          <Text className={`font-medium ${
            item.isDestructive ? 'text-red-500' : 'text-offwhite-50'
          }`}>
            {item.title}
          </Text>
          {item.subtitle && (
            <Text className="text-warmgrey-50 text-sm mt-1">{item.subtitle}</Text>
          )}
        </View>
      </View>
      
      {item.hasToggle && (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#3A3A3C', true: '#F5B700' }}
          thumbColor={notificationsEnabled ? '#FFFFFF' : '#A1A1AA'}
        />
      )}
      
      {item.hasArrow && (
        <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-charcoal-50">
      {/* Header */}
      <View className="bg-premium-gradient pb-6 rounded-b-3xl">
        <View className="px-6 pt-12">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-offwhite-50 text-2xl font-bold">Profile</Text>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color="#F2F2F7" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View className="mx-6 mt-6 bg-mocha-50 rounded-2xl p-6 border border-gold-accent/30">
          <View className="flex-row items-center mb-4">
            <View className="w-20 h-20 bg-charcoal-50 rounded-full items-center justify-center mr-4">
              {profileData.avatar ? (
                <Image source={{ uri: profileData.avatar }} className="w-20 h-20 rounded-full" />
              ) : (
                <Ionicons name="person" size={32} color="#F2F2F7" />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-offwhite-50 text-xl font-bold">{profileData.name}</Text>
              <Text className="text-warmgrey-50 text-sm mt-1">{profileData.phone}</Text>
              <Text className="text-warmgrey-50 text-sm">{profileData.email}</Text>
            </View>
            <TouchableOpacity className="bg-gold-accent w-10 h-10 rounded-full items-center justify-center">
              <Ionicons name="pencil" size={16} color="#1C1C1E" />
            </TouchableOpacity>
          </View>
          
          <View className="border-t border-gold-accent/20 pt-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="location" size={16} color="#A1A1AA" />
              <Text className="text-warmgrey-50 text-sm ml-2">{profileData.address}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="business" size={16} color="#A1A1AA" />
              <Text className="text-warmgrey-50 text-sm ml-2">{profileData.city}</Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="flex-row mx-6 mt-4 space-x-3">
          <View className="flex-1 bg-mocha-50 rounded-2xl p-4 border border-gold-accent/30">
            <View className="items-center">
              <Text className="text-gold-accent text-2xl font-bold">{profileData.totalBookings}</Text>
              <Text className="text-warmgrey-50 text-sm mt-1">Total Bookings</Text>
            </View>
          </View>
          <View className="flex-1 bg-mocha-50 rounded-2xl p-4 border border-emerald-50/30">
            <View className="items-center">
              <Text className="text-emerald-50 text-2xl font-bold">4.8</Text>
              <Text className="text-warmgrey-50 text-sm mt-1">Avg Rating</Text>
            </View>
          </View>
          <View className="flex-1 bg-mocha-50 rounded-2xl p-4 border border-gold-accent/30">
            <View className="items-center">
              <Text className="text-gold-accent text-2xl font-bold">₹2.4K</Text>
              <Text className="text-warmgrey-50 text-sm mt-1">Total Spent</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6 mt-6 pb-40">
          <Text className="text-offwhite-50 text-lg font-semibold mb-4">Account Settings</Text>
          {menuItems.map(renderMenuItem)}
        </View>
      </ScrollView>
    </View>
  );
}