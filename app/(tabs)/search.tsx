import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProviderSearch, useServiceCategories, useTopProviders } from '../../hooks/useSQLiteData';

type Suggestion = {
  type: 'provider' | 'service' | 'category';
  text: string;
  category?: string;
};





export default function SearchScreen() {
  const params = useLocalSearchParams();
  const searchInputRef = useRef<TextInput>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // SQLite data hooks with error handling
  const { providers: searchResults, loading: searchLoading, error: searchError } = useProviderSearch(searchQuery);
  const { providers: topProviders, loading: providersLoading, error: providersError } = useTopProviders(50);
  const { categories, loading: categoriesLoading, error: categoriesError } = useServiceCategories();

  // Use search results if there's a query, otherwise show top providers
  const displayProviders = searchQuery.trim() ? searchResults : topProviders;
  
  // Check for any errors
  const hasError = searchError || providersError || categoriesError;

  // Transform providers data for display
  const services = displayProviders.map(provider => ({
    id: provider.id,
    name: provider.name,
    service: provider.service,
    rating: provider.rating,
    price: provider.price,
    distance: provider.distance,
    image: provider.avatar || `https://picsum.photos/seed/${provider.name}/200/200`,
    category: provider.category
  }));

  // Handle incoming search query from navigation
  useEffect(() => {
    if (params.query && typeof params.query === 'string') {
      setSearchQuery(params.query);
      handleSearchChange(params.query);
    }
  }, [params.query]);

  // Auto-focus search input when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      
      return () => clearTimeout(timer);
    }, [])
  );

  // Generate search suggestions
  const generateSuggestions = (query: string): Suggestion[] => {
    if (query.length === 0) {
      return [];
    }
    const allSuggestions: Suggestion[] = [];
    
    // Search in providers
    services.forEach(service => {
      if (service.name.toLowerCase().includes(query.toLowerCase())) {
        allSuggestions.push({ type: 'provider', text: service.name, category: service.category });
      }
      if (service.service.toLowerCase().includes(query.toLowerCase())) {
        allSuggestions.push({ type: 'service', text: service.service, category: service.category });
      }
    });
    
    // Search in service categories
    categories.forEach(category => {
      if (category.name.toLowerCase().includes(query.toLowerCase())) {
        allSuggestions.push({ type: 'category', text: category.name });
      }
      // Search in individual services within categories
      category.services.forEach(service => {
        if (service.name.toLowerCase().includes(query.toLowerCase())) {
          allSuggestions.push({ type: 'service', text: service.name, category: category.name });
        }
      });
    });
    
    // Remove duplicates
    const uniqueSuggestions = allSuggestions.filter((suggestion, index, self) =>
      index === self.findIndex(s => s.text === suggestion.text && s.type === suggestion.type)
    );
    return uniqueSuggestions.slice(0, 8); // Limit to 8 suggestions
  };

  // Services are already filtered by the SQLite search hook
  const filteredServices = services;

  // Handle search input change
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (text.length > 0) {
      const newSuggestions = generateSuggestions(text);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: Suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-charcoal-50" edges={['top']}>
      {/* Header */}
      <View className="bg-premium-gradient pb-6 rounded-b-3xl">
        <View className="px-6 pt-4">
          <Text className="text-offwhite-50 text-2xl font-bold mb-2">Search</Text>
          <Text className="text-warmgrey-50 text-sm">
            {params.query ? `Searching for "${params.query}"` : 
             searchQuery ? `Results for "${searchQuery}"` : 'Find services and providers'}
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-mocha-50 rounded-full px-4 py-3 mx-4 mt-4 border border-gold-accent/30">
        <Ionicons name="search" size={20} color="#F5B700" />
        <TextInput
          ref={searchInputRef}
          placeholder="Search services or providers…"
          placeholderTextColor="#A1A1AA"
          value={searchQuery}
          onChangeText={handleSearchChange}
          onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="flex-1 ml-3 text-offwhite-50"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={() => {
              setSearchQuery('');
              setShowSuggestions(false);
            }}
            className="mr-2"
          >
            <Ionicons name="close-circle" size={20} color="#A1A1AA" />
          </TouchableOpacity>
        )}
        <TouchableOpacity>
          <Ionicons name="filter" size={20} color="#F5B700" />
        </TouchableOpacity>
      </View>

      {/* Quick Filters */}
      {!searchQuery && !showSuggestions && (
        <View className="px-4 mt-4">
          <Text className="text-offwhite-50 text-sm font-medium mb-3">Popular Services</Text>
          <View className="flex-row flex-wrap gap-2">
            {['Plumbing', 'Cleaning', 'Electrical', 'Carpenter', 'Beauty', 'Appliance'].map((service) => (
              <TouchableOpacity
                key={service}
                onPress={() => {
                  setSearchQuery(service);
                  handleSearchChange(service);
                }}
                className="bg-charcoal-50 px-4 py-2 rounded-full border border-gold-accent/30"
              >
                <Text className="text-gold-accent text-sm">{service}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <View className="bg-mocha-50 rounded-lg mx-4 mt-2 border border-gold-accent/30 shadow-lg">
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSuggestionSelect(item)}
                className="px-4 py-3 border-b border-gold-accent/10 active:bg-transparent"
                activeOpacity={0.7}
              >
                <View>
                  <Text className="text-offwhite-50 text-sm">
                    {item.type === 'provider' ? '👤 ' : item.type === 'category' ? '📂 ' : '🔧 '}
                    {item.text}
                  </Text>
                  {item.category && (
                    <Text className="text-warmgrey-50 text-xs mt-1">{item.category}</Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}



      {/* Loading State */}
      {(providersLoading || searchLoading || categoriesLoading) && (
        <View className="flex-1 items-center justify-center">
          <View className="bg-mocha-50 rounded-full p-4 mb-4">
            <Ionicons name="search" size={32} color="#F5B700" />
          </View>
          <Text className="text-warmgrey-50">
            {searchQuery ? 'Searching...' : 'Loading services...'}
          </Text>
        </View>
      )}

      {/* Error State */}
      {hasError && (
        <View className="flex-1 items-center justify-center px-8">
          <View className="bg-red-500/10 rounded-full p-4 mb-4">
            <Ionicons name="alert-circle" size={32} color="#FF6B6B" />
          </View>
          <Text className="text-offwhite-50 text-lg font-semibold text-center">
            Something went wrong
          </Text>
          <Text className="text-warmgrey-50 text-sm text-center mt-2">
            {searchError || providersError || categoriesError}
          </Text>
        </View>
      )}

      {/* No Results State */}
      {!hasError && !providersLoading && !searchLoading && !categoriesLoading && displayProviders.length === 0 && searchQuery && (
        <View className="flex-1 items-center justify-center px-8">
          <View className="bg-warmgrey-50/10 rounded-full p-4 mb-4">
            <Ionicons name="search-outline" size={32} color="#A1A1AA" />
          </View>
          <Text className="text-offwhite-50 text-lg font-semibold text-center">
            No results found
          </Text>
          <Text className="text-warmgrey-50 text-sm text-center mt-2">
            Try searching for different keywords or check your spelling.
          </Text>
        </View>
      )}

      {/* Results Grid */}
      {!hasError && !providersLoading && !searchLoading && !categoriesLoading && (
        <View className="flex-1 mt-4">
          {filteredServices.length > 0 ? (
            <View className="flex-1">
              <View className="px-4 mb-3">
                <Text className="text-warmgrey-50 text-xs text-center">
                  Tap any card to filter by that service • {filteredServices.length} results
                </Text>
              </View>
            <FlatList
              data={filteredServices}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
              columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              className="bg-mocha-50 rounded-2xl p-4 border border-gold-accent/30"
              style={{ 
                width: '48%',
                minHeight: 200,
                transform: [{ scale: 1 }]
              }}
              activeOpacity={0.8}
              onPress={() => {
                // Filter by this service instead of enlarging
                console.log('Filtering by service:', item.service);
                setSearchQuery(item.service);
                handleSearchChange(item.service);
                setShowSuggestions(false);
              }}
            >
              <Image 
                source={{ uri: item.image }} 
                className="w-full h-24 rounded-lg mb-3"
                style={{ resizeMode: 'cover' }}
              />
              <Text className="text-offwhite-50 font-semibold text-sm mb-1" numberOfLines={1}>
                {item.name}
              </Text>
              <Text className="text-warmgrey-50 text-xs mb-2" numberOfLines={1}>
                {item.service}
              </Text>
              <View className="flex-row items-center mb-1">
                <Ionicons name="star" size={14} color="#F5B700" />
                <Text className="text-offwhite-50 text-xs ml-1">{item.rating}</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-warmgrey-50 text-xs">{item.distance}</Text>
                <Text className="text-gold-accent font-semibold text-xs">₹{item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
            />
          </View>
        ) : (
          <View className="flex-1 items-center justify-center px-8">
            <Ionicons name="search-outline" size={64} color="#A1A1AA" />
            <Text className="text-offwhite-50 text-lg font-semibold mt-4 text-center">
              {searchQuery ? 'No services found' : 'Start searching'}
            </Text>
            <Text className="text-warmgrey-50 text-sm text-center mt-2">
              {searchQuery 
                ? 'Try adjusting your search or filters to find what you\'re looking for.'
                : 'Search for services, providers, or categories to get started.'
              }
            </Text>
            {searchQuery && (
              <TouchableOpacity
                className="bg-gold-accent px-6 py-3 rounded-full mt-6"
                onPress={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
              >
                <Text className="text-charcoal-50 font-medium">Clear Search</Text>
              </TouchableOpacity>
            )}
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}