import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const getIconName = (routeName: string, focused: boolean) => {
    switch (routeName) {
      case 'index':
        return focused ? 'home' : 'home-outline';
      case 'search':
        return focused ? 'search' : 'search-outline';
      case 'booking':
        return focused ? 'calendar' : 'calendar-outline';
      case 'profile':
        return focused ? 'person' : 'person-outline';
      default:
        return 'home-outline';
    }
  };

  const getTabLabel = (routeName: string) => {
    switch (routeName) {
      case 'index':
        return 'Home';
      case 'search':
        return 'Search';
      case 'booking':
        return 'Booking';
      case 'profile':
        return 'Profile';
      default:
        return 'Home';
    }
  };

  return (
    <View style={{
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      height: 70,
    }}>
      <BlurView
        intensity={80}
        tint="dark"
        style={{
          flex: 1,
          backgroundColor: 'rgba(44, 44, 46, 0.95)',
          borderRadius: 35,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 15 },
          shadowOpacity: 0.4,
          shadowRadius: 25,
          elevation: 25,
        }}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 15,
          paddingVertical: 10,
          height: '100%',
        }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 25,
                  backgroundColor: isFocused ? 'rgba(245, 183, 0, 0.2)' : 'transparent',
                  borderWidth: isFocused ? 1 : 0,
                  borderColor: isFocused ? 'rgba(245, 183, 0, 0.3)' : 'transparent',
                }}
              >
                {isFocused && (
                  <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(245, 183, 0, 0.15)',
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: 'rgba(245, 183, 0, 0.4)',
                  }} />
                )}
                <Ionicons
                  name={getIconName(route.name, isFocused) as any}
                  size={isFocused ? 24 : 22}
                  color={isFocused ? '#F5B700' : '#A1A1AA'}
                  style={{ marginBottom: 2 }}
                />
                <Text style={{
                  fontSize: 11,
                  fontWeight: isFocused ? '700' : '500',
                  color: isFocused ? '#F5B700' : '#A1A1AA',
                  marginTop: 2,
                }}>
                  {getTabLabel(route.name)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
};

export default CustomTabBar;