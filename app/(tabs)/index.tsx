import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProviderCard from "../../components/ProviderCard";
import ServiceCategoryCard from "../../components/ServiceCategoryCard";
import { Provider } from "../../data/servicesData";
import {
  useServiceCategories,
  useTopProviders,
} from "../../hooks/useSQLiteData";

import { useDatabase } from "../../hooks/useDatabase";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userName] = useState("Roshan"); // Static for now
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Database initialization
  const { isInitialized, isLoading: dbLoading, error: dbError } = useDatabase();

  // SQLite data hooks
  const {
    providers,
    loading: providersLoading,
    error: providersError,
  } = useTopProviders(10);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useServiceCategories();

  // Sort providers by trustScore (highest first)
  const sortedProviders = [...providers].sort(
    (a, b) => b.trustScore - a.trustScore
  );

  // Featured services - top 6 most popular categories from SQLite
  const featuredServices = categories.slice(0, 6).map((category) => ({
    id: category.id,
    name: category.name.split(" ")[0], // Take first word for compact display
    image: category.image,
    icon: category.icon,
    providerCount: category.providerCount,
  }));

  const handleSearchPress = () => {
    // @ts-ignore
    navigation.navigate("search");
  };

  const handleServicePress = (serviceName: string) => {
    // @ts-ignore
    navigation.navigate("search", { query: serviceName });
  };

  const handleProviderPress = (provider: Provider) => {
    Alert.alert(
      provider.name,
      `${provider.service} • ${provider.experience} experience\nRating: ${provider.rating} • Distance: ${provider.distance}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call",
          onPress: () => Linking.openURL(`tel:${provider.phone}`),
        },
        {
          text: "View Details",
          onPress: () => console.log("View details for", provider.name),
        },
      ]
    );
  };

  const handleCall = (provider: Provider) => {
    Alert.alert("Call Provider", `Do you want to call ${provider.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Call",
        onPress: () => Linking.openURL(`tel:${provider.phone}`),
      },
    ]);
  };

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
            <Text className="text-offwhite-50 text-xl font-semibold">
              Hi, {userName} 👋
            </Text>

            {/* Empty space for balance */}
            <View className="w-6" />
          </View>

          {/* Search & Filter Row */}
          <View className="flex-row items-center space-x-3">
            <TouchableOpacity
              onPress={handleSearchPress}
              className="flex-1 bg-mocha-50 rounded-full px-4 py-3 flex-row items-center"
              activeOpacity={0.7}
            >
              <Ionicons name="search" size={20} color="#A1A1AA" />
              <Text className="text-warmgrey-50 ml-2">
                Search services or providers…
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSearchPress}
              className="bg-gold-accent w-12 h-12 rounded-full items-center justify-center"
            >
              <Ionicons name="filter" size={20} color="#1C1C1E" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Database Loading State */}
        {(dbLoading || !isInitialized) && (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#F5B700" />
            <Text className="text-warmgrey-50 mt-4">
              Setting up database...
            </Text>
          </View>
        )}

        {/* Database Error State */}
        {dbError && (
          <View className="mx-6 mt-6 bg-red-500/10 rounded-2xl p-4 border border-red-500/30">
            <Text className="text-red-500 font-semibold mb-2">
              Database Error
            </Text>
            <Text className="text-warmgrey-50 text-sm">{dbError}</Text>
          </View>
        )}

        {/* Data Loading State */}
        {isInitialized && (providersLoading || categoriesLoading) && (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#F5B700" />
            <Text className="text-warmgrey-50 mt-4">Loading services...</Text>
          </View>
        )}

        {/* Data Error State */}
        {isInitialized && (providersError || categoriesError) && (
          <View className="mx-6 mt-6 bg-red-500/10 rounded-2xl p-4 border border-red-500/30">
            <Text className="text-red-500 font-semibold mb-2">
              Error Loading Data
            </Text>
            <Text className="text-warmgrey-50 text-sm">
              {providersError || categoriesError}
            </Text>
          </View>
        )}

        {/* Content - only show when database is ready and data is loaded */}
        {isInitialized &&
          !dbLoading &&
          !providersLoading &&
          !categoriesLoading &&
          !dbError &&
          !providersError &&
          !categoriesError && (
            <>
              {/* Featured Services Grid */}
              <View className="px-6 pt-6">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-offwhite-50 text-lg font-semibold">
                    Popular Services
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowAllCategories(!showAllCategories)}
                  >
                    <Text className="text-gold-accent text-sm">
                      {showAllCategories ? "Show Less" : "View All"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={featuredServices}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  scrollEnabled={false}
                  columnWrapperStyle={{ gap: 12 }}
                  contentContainerStyle={{ gap: 12 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      key={item.id}
                      className="bg-mocha-50 rounded-2xl p-4 items-center flex-1 border border-gold-accent/30"
                      activeOpacity={0.8}
                      onPress={() => handleServicePress(item.name)}
                    >
                      {item.image ? (
                        <Image
                          source={{ uri: item.image }}
                          className="w-16 h-16 rounded-lg mb-2"
                        />
                      ) : (
                        <View className="w-16 h-16 bg-charcoal-50 rounded-lg items-center justify-center mb-2">
                          <Ionicons
                            name={item.icon as any}
                            size={24}
                            color="#F5B700"
                          />
                        </View>
                      )}
                      <Text className="text-offwhite-50 text-sm font-medium text-center">
                        {item.name}
                      </Text>
                      <Text className="text-warmgrey-50 text-xs mt-1">
                        {item.providerCount}+ providers
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>

              {/* All Service Categories */}
              {showAllCategories && (
                <View className="px-6 pt-6">
                  <Text className="text-offwhite-50 text-lg font-semibold mb-4">
                    All Services
                  </Text>
                  {categories.map((category) => (
                    <ServiceCategoryCard
                      key={category.id}
                      title={category.name}
                      description={category.description}
                      icon={category.icon}
                      providerCount={category.providerCount}
                      averagePrice={category.averagePrice}
                      image={category.image}
                      onPress={() => handleServicePress(category.name)}
                    />
                  ))}
                </View>
              )}

              {/* Nearby Providers Section */}
              <View className="px-6 pt-8 pb-40">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-offwhite-50 text-lg font-semibold">
                    Nearby Providers
                  </Text>
                  <Text className="text-gold-accent text-sm">
                    Trusted First
                  </Text>
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
                      onPress={() => handleProviderPress(item)}
                      onCall={() => handleCall(item)}
                      onChat={() => console.log("Chat with", item.name)}
                    />
                  )}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </>
          )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-36 right-6 w-16 h-16 bg-gold-accent rounded-full items-center justify-center shadow-lg">
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
