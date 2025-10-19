import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { sampleProviders, serviceCategories } from '../../data/servicesData';

type Suggestion = {
  type: 'provider' | 'service' | 'category';
  text: string;
  category?: string;
};

// Transform providers data for search
const servicesData = sampleProviders.map(provider => ({
  id: provider.id,
  name: provider.name,
  service: provider.service,
  rating: provider.rating,
  price: provider.price,
  distance: provider.distance,
  image: provider.avatar || `https://picsum.photos/seed/${provider.name}/200/200`,
  category: provider.category
}));



export default function SearchScreen() {
  const params = useLocalSearchParams();
  const searchInputRef = useRef<TextInput>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState(servicesData);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

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
    serviceCategories.forEach(category => {
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

  // Filter services based on search query only
  const filteredServices = services.filter(service => {
    if (searchQuery.length === 0) return true; // Show all if no search query
    return service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           service.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
           service.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
    <View className="flex-1 bg-charcoal-50">
      {/* Header */}
      {(params.query || searchQuery) && (
        <View className="bg-premium-gradient pb-4 rounded-b-3xl">
          <View className="px-6 pt-12">
            <Text className="text-offwhite-50 text-lg font-semibold">Search Results</Text>
            <Text className="text-warmgrey-50 text-sm">
              {params.query ? `Searching for "${params.query}"` : 
               searchQuery ? `Results for "${searchQuery}"` : 'Search for services'}
            </Text>
          </View>
        </View>
      )}

      {/* Search Bar */}
      <View className={`flex-row items-center bg-mocha-50 rounded-full px-4 py-3 mx-4 border border-gold-accent/30 ${params.query ? 'mt-4' : 'mt-3'}`}>
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

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <View className="absolute top-full left-4 right-4 bg-mocha-50 rounded-lg mt-1 border border-gold-accent/30 z-50 shadow-lg">
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



      {/* Results Grid */}
      {filteredServices.length > 0 ? (
        <View>
          <View className="px-4 mb-2">
            <Text className="text-warmgrey-50 text-xs text-center">
              Tap any card to filter by that service
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
            No services found
          </Text>
          <Text className="text-warmgrey-50 text-sm text-center mt-2">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </Text>
          <TouchableOpacity
            className="bg-gold-accent px-6 py-3 rounded-full mt-6"
            onPress={() => {
              setSearchQuery('');
            }}
          >
            <Text className="text-charcoal-50 font-medium">Clear Search</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}