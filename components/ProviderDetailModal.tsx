import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    Image,
    Linking,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Provider } from '../data/servicesData';
import CallFirstButton from './CallFirstButton';
import TrustBadge from './TrustBadge';

interface ProviderDetailModalProps {
  provider: Provider | null;
  visible: boolean;
  onClose: () => void;
}

export default function ProviderDetailModal({ 
  provider, 
  visible, 
  onClose 
}: ProviderDetailModalProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  if (!provider) return null;

  const handleCall = () => {
    Alert.alert(
      'Call Provider',
      `Do you want to call ${provider.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => Linking.openURL(`tel:${provider.phone}`)
        }
      ]
    );
  };

  const handleBooking = () => {
    Alert.alert(
      'Book Service',
      `Book ${provider.service} with ${provider.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Book Now', onPress: () => console.log('Booking initiated') }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-charcoal-50">
        {/* Header */}
        <View className="bg-premium-gradient pb-6 rounded-b-3xl">
          <View className="px-6 pt-12">
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="arrow-back" size={24} color="#F2F2F7" />
              </TouchableOpacity>
              <Text className="text-offwhite-50 text-lg font-semibold">Provider Details</Text>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} color="#F2F2F7" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Provider Info Card */}
          <View className="mx-6 mt-6 bg-mocha-50 rounded-2xl p-6 border border-gold-accent/30">
            <View className="flex-row items-start mb-4">
              <View className="w-20 h-20 bg-charcoal-50 rounded-full items-center justify-center mr-4">
                {provider.avatar ? (
                  <Image source={{ uri: provider.avatar }} className="w-20 h-20 rounded-full" />
                ) : (
                  <Ionicons name="person" size={32} color="#F2F2F7" />
                )}
              </View>
              
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Text className="text-offwhite-50 text-xl font-bold mr-2">{provider.name}</Text>
                  {provider.isVerified && (
                    <Ionicons name="checkmark-circle" size={20} color="#2ECC71" />
                  )}
                </View>
                
                <Text className="text-warmgrey-50 text-sm mb-2">{provider.service}</Text>
                
                <View className="flex-row items-center mb-2">
                  <Ionicons name="star" size={16} color="#F5B700" />
                  <Text className="text-offwhite-50 text-sm ml-1 mr-3">{provider.rating}</Text>
                  <Ionicons name="location" size={16} color="#A1A1AA" />
                  <Text className="text-warmgrey-50 text-sm ml-1">{provider.distance}</Text>
                </View>
                
                <TrustBadge level={provider.trustLevel} score={provider.trustScore} />
              </View>
            </View>

            {/* Stats Row */}
            <View className="flex-row justify-between border-t border-gold-accent/20 pt-4">
              <View className="items-center">
                <Text className="text-gold-accent text-lg font-bold">{provider.completedJobs}</Text>
                <Text className="text-warmgrey-50 text-xs">Jobs Done</Text>
              </View>
              <View className="items-center">
                <Text className="text-emerald-50 text-lg font-bold">{provider.experience}</Text>
                <Text className="text-warmgrey-50 text-xs">Experience</Text>
              </View>
              <View className="items-center">
                <Text className="text-gold-accent text-lg font-bold">₹{provider.price}+</Text>
                <Text className="text-warmgrey-50 text-xs">Starting Price</Text>
              </View>
            </View>
          </View>

          {/* Languages */}
          <View className="mx-6 mt-4 bg-mocha-50 rounded-2xl p-4 border border-gold-accent/30">
            <Text className="text-offwhite-50 font-semibold mb-3">Languages</Text>
            <View className="flex-row flex-wrap">
              {provider.languages.map((language, index) => (
                <View key={index} className="bg-charcoal-50 px-3 py-1 rounded-full mr-2 mb-2">
                  <Text className="text-offwhite-50 text-sm">{language}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Specialties */}
          <View className="mx-6 mt-4 bg-mocha-50 rounded-2xl p-4 border border-gold-accent/30">
            <Text className="text-offwhite-50 font-semibold mb-3">Specialties</Text>
            <View className="flex-row flex-wrap">
              {provider.specialties.map((specialty, index) => (
                <View key={index} className="bg-gold-accent/20 px-3 py-1 rounded-full mr-2 mb-2">
                  <Text className="text-gold-accent text-sm">{specialty}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews Section */}
          <View className="mx-6 mt-4 bg-mocha-50 rounded-2xl p-4 border border-gold-accent/30">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-offwhite-50 font-semibold">Reviews</Text>
              <TouchableOpacity>
                <Text className="text-gold-accent text-sm">View All</Text>
              </TouchableOpacity>
            </View>
            
            {/* Sample Review */}
            <View className="border-t border-gold-accent/20 pt-3">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 bg-charcoal-50 rounded-full items-center justify-center mr-3">
                  <Ionicons name="person" size={16} color="#F2F2F7" />
                </View>
                <View className="flex-1">
                  <Text className="text-offwhite-50 text-sm font-medium">Amit Kumar</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={12} color="#F5B700" />
                    <Text className="text-warmgrey-50 text-xs ml-1">5.0 • 2 days ago</Text>
                  </View>
                </View>
              </View>
              <Text className="text-warmgrey-50 text-sm">
                Excellent work! Very professional and completed the job on time. Highly recommended.
              </Text>
            </View>
          </View>

          <View className="h-32" />
        </ScrollView>

        {/* Bottom Action Bar */}
        <View className="absolute bottom-0 left-0 right-0 bg-mocha-50 p-6 border-t border-gold-accent/30">
          <View className="flex-row space-x-3">
            <View className="flex-1">
              <CallFirstButton
                phoneNumber={provider.phone}
                providerName={provider.name}
                onPress={handleCall}
              />
            </View>
            <TouchableOpacity
              onPress={handleBooking}
              className="flex-1 bg-emerald-50 rounded-full px-6 py-3 items-center justify-center"
            >
              <Text className="text-charcoal-50 font-semibold">Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}