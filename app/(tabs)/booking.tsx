import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as BookingHooks from "../../hooks/useBookings";

type Booking = BookingHooks.Booking;
const useUserBookings = BookingHooks.useUserBookings;

const statusConfig = {
  upcoming: { color: "#F5B700", bg: "bg-gold-accent/20", text: "Upcoming" },
  ongoing: { color: "#2ECC71", bg: "bg-emerald-50/20", text: "Ongoing" },
  completed: { color: "#A1A1AA", bg: "bg-warmgrey-50/20", text: "Completed" },
  cancelled: { color: "#FF6B6B", bg: "bg-red-500/20", text: "Cancelled" },
};

export default function BookingScreen() {
  const [refreshing, setRefreshing] = useState(false);

  // Use SQLite booking data
  const { bookings, loading, error, updateBookingStatus, refreshBookings } =
    useUserBookings();

  const handleRefresh = async () => {
    setRefreshing(true);
    refreshBookings();
    setRefreshing(false);
  };

  const handleCall = (booking: Booking) => {
    Alert.alert(
      "Call Provider",
      `Do you want to call ${booking.provider_name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call",
          onPress: () => {
            // In a real app, you'd get the phone number from provider data
            Linking.openURL(`tel:+919876543210`);
          },
        },
      ]
    );
  };

  const handleReschedule = (booking: Booking) => {
    Alert.alert(
      "Reschedule Booking",
      `Reschedule your ${booking.service} appointment?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reschedule",
          onPress: () => {
            // In a real app, this would open a date/time picker
            console.log("Reschedule booking:", booking.id);
          },
        },
      ]
    );
  };

  const handleCancelBooking = (booking: Booking) => {
    Alert.alert(
      "Cancel Booking",
      `Are you sure you want to cancel your ${booking.service} appointment?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              await updateBookingStatus(booking.id, "cancelled");
              Alert.alert("Success", "Booking cancelled successfully");
            } catch (error) {
              console.error("Error cancelling booking:", error);
              Alert.alert("Error", "Failed to cancel booking");
            }
          },
        },
      ]
    );
  };

  const handleRateReview = (booking: Booking) => {
    Alert.alert(
      "Rate & Review",
      `Rate your experience with ${booking.provider_name}`,
      [
        { text: "Later", style: "cancel" },
        {
          text: "Rate Now",
          onPress: () => {
            // In a real app, this would open a rating/review modal
            console.log("Rate booking:", booking.id);
          },
        },
      ]
    );
  };

  const renderBookingCard = ({ item }: { item: Booking }) => {
    const config = statusConfig[item.status];

    return (
      <View className="bg-mocha-50 rounded-2xl p-4 mb-4 border border-gold-accent/30">
        {/* Header */}
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 bg-charcoal-50 rounded-full items-center justify-center mr-3">
              {item.provider_image ? (
                <Image
                  source={{ uri: item.provider_image }}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <Ionicons name="person" size={20} color="#F2F2F7" />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-offwhite-50 font-semibold text-base">
                {item.provider_name}
              </Text>
              <Text className="text-warmgrey-50 text-sm">{item.service}</Text>
            </View>
          </View>
          <View className={`px-3 py-1 rounded-full ${config.bg}`}>
            <Text
              className="text-xs font-medium"
              style={{ color: config.color }}
            >
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
          <Text className="text-warmgrey-50 text-sm ml-2 flex-1">
            {item.address}
          </Text>
        </View>

        {/* Rating (for completed bookings) */}
        {item.status === "completed" && item.rating && (
          <View className="flex-row items-center mb-3">
            <Ionicons name="star" size={16} color="#F5B700" />
            <Text className="text-gold-accent text-sm ml-1">
              Rated {item.rating}/5
            </Text>
          </View>
        )}

        {/* Bottom Row */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name="cash" size={16} color="#2ECC71" />
            <Text className="text-emerald-50 font-semibold ml-1">
              ₹{item.price}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-2">
            {item.status === "upcoming" && (
              <>
                <TouchableOpacity
                  className="bg-charcoal-50 px-4 py-2 rounded-full"
                  onPress={() => handleReschedule(item)}
                >
                  <Text className="text-offwhite-50 text-xs">Reschedule</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gold-accent px-4 py-2 rounded-full"
                  onPress={() => handleCall(item)}
                >
                  <Text className="text-charcoal-50 text-xs font-medium">
                    Call
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-500 px-3 py-2 rounded-full"
                  onPress={() => handleCancelBooking(item)}
                >
                  <Text className="text-white text-xs">Cancel</Text>
                </TouchableOpacity>
              </>
            )}
            {item.status === "ongoing" && (
              <>
                <TouchableOpacity className="bg-emerald-50 px-4 py-2 rounded-full">
                  <Text className="text-charcoal-50 text-xs font-medium">
                    Track
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gold-accent px-4 py-2 rounded-full"
                  onPress={() => handleCall(item)}
                >
                  <Text className="text-charcoal-50 text-xs font-medium">
                    Call
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {item.status === "completed" && (
              <TouchableOpacity
                className="bg-gold-accent px-4 py-2 rounded-full"
                onPress={() => handleRateReview(item)}
              >
                <Text className="text-charcoal-50 text-xs font-medium">
                  Rate & Review
                </Text>
              </TouchableOpacity>
            )}
            {item.status === "cancelled" && (
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
          <Text className="text-offwhite-50 text-2xl font-bold mb-2">
            My Bookings
          </Text>
          <Text className="text-warmgrey-50 text-sm">
            Track and manage your service bookings
          </Text>
        </View>
      </View>

      {/* Bookings Section */}
      <View className="px-6 mt-4">
        <Text className="text-offwhite-50 text-lg font-semibold mb-4">
          All Bookings
        </Text>
      </View>

      {/* Loading State */}
      {loading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#F5B700" />
          <Text className="text-warmgrey-50 mt-4">Loading bookings...</Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View className="mx-6 mt-6 bg-red-500/10 rounded-2xl p-4 border border-red-500/30">
          <Text className="text-red-500 font-semibold mb-2">
            Error Loading Bookings
          </Text>
          <Text className="text-warmgrey-50 text-sm">{error}</Text>
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 rounded-full mt-3 self-start"
            onPress={handleRefresh}
          >
            <Text className="text-white text-sm">Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bookings List */}
      {!loading && !error && (
        <>
          {bookings.length > 0 ? (
            <FlatList
              data={bookings}
              keyExtractor={(item) => item.id}
              renderItem={renderBookingCard}
              contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={["#F5B700"]}
                  tintColor="#F5B700"
                />
              }
            />
          ) : (
            <View className="flex-1 items-center justify-center px-8">
              <Ionicons name="calendar-outline" size={64} color="#A1A1AA" />
              <Text className="text-offwhite-50 text-lg font-semibold mt-4 text-center">
                No bookings found
              </Text>
              <Text className="text-warmgrey-50 text-sm text-center mt-2">
                You haven&apos;t made any bookings yet. Start by finding a
                service provider!
              </Text>
              <TouchableOpacity className="bg-gold-accent px-6 py-3 rounded-full mt-6">
                <Text className="text-charcoal-50 font-medium">
                  Find Services
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
}
