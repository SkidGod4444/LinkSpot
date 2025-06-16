import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePerms } from '@/contexts/perms.context';
import { useTheme } from '@/contexts/theme.context';
import { images, colors } from '@/constants';
import { Ionicons } from '@expo/vector-icons';

interface Person {
  id: number;
  name: string;
  distance: string;
  avatar: string;
  interests: string[];
}

interface Meetup {
  id: number;
  title: string;
  time: string;
  distance: string;
  image: any;
  attendees: number;
  tags: string[];
}

export default function NearBy() {
  const { locationPermission, requestLocationPermission } = usePerms();
  const { isDarkMode } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (locationPermission !== 'granted') {
      requestLocationPermission();
    }
  }, [locationPermission, requestLocationPermission]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setRefreshing(false), 2000);
  };

  // Dummy Data
  const people: Person[] = [
    { id: 1, name: 'Aarav', distance: '200m away', avatar: 'https://i.pravatar.cc/100?img=11', interests: ['React', 'Node.js'] },
    { id: 2, name: 'Meera', distance: '350m away', avatar: 'https://i.pravatar.cc/100?img=12', interests: ['UI/UX', 'Design'] },
    { id: 3, name: 'Rohan', distance: '500m away', avatar: 'https://i.pravatar.cc/100?img=13', interests: ['Python', 'Data Science'] },
    { id: 4, name: 'Sita', distance: '600m away', avatar: 'https://i.pravatar.cc/100?img=14', interests: ['JavaScript', 'Web Dev'] },
    { id: 5, name: 'Raj', distance: '800m away', avatar: 'https://i.pravatar.cc/100?img=15', interests: ['Mobile Dev', 'React Native'] },
  ];

  const meetups: Meetup[] = [
    {
      id: 1,
      title: 'React Native Devs',
      time: 'Today, 5PM',
      distance: '500m',
      image: images.fallbackPFP,
      attendees: 12,
      tags: ['React', 'Mobile Dev']
    },
    {
      id: 2,
      title: 'Coffee Lovers Meetup',
      time: 'Tomorrow, 3PM',
      distance: '1km',
      image: images.fallbackPFP,
      attendees: 20,
      tags: ['Coffee', 'Social']
    },
    {
      id: 3,
      title: 'Tech Talk',
      time: 'Next Friday, 6PM',
      distance: '2km',
      image: images.fallbackPFP,
      attendees: 30,
      tags: ['Tech', 'Networking']
    },
  ];

  const renderMeetupCard = (meetup: Meetup) => (
    <TouchableOpacity
      key={meetup.id}
      className="mr-4 w-72 rounded-xl overflow-hidden bg-dark-accent shadow"
    >
      <Image source={meetup.image} className="w-full h-40" />
      <View className="p-4">
        <Text className="text-lg font-bold text-white mb-1">{meetup.title}</Text>
        <View className="flex-row items-center mb-2">
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text className="text-sm text-gray-500 dark:text-gray-400 ml-1">{meetup.time}</Text>
          <Text className="mx-2 text-gray-400">•</Text>
          <Ionicons name="location-outline" size={16} color={colors.primary} />
          <Text className="text-sm text-gray-500 dark:text-gray-400 ml-1">{meetup.distance}</Text>
        </View>
        <View className="flex-row flex-wrap gap-2">
          {meetup.tags.map((tag: string, index: number) => (
            <View key={index} className="bg-primary/10 px-2 py-1 rounded-full">
              <Text className="text-xs text-primary">{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPersonCard = (person: Person) => (
    <TouchableOpacity
      key={person.id}
      className="flex-row items-center p-4 mb-3 bg-dark-accent rounded-xl shadow"
    >
      <Image source={{ uri: person.avatar }} className="w-14 h-14 rounded-full mr-4" />
      <View className="flex-1">
        <Text className="text-lg font-bold text-white">{person.name}</Text>
        <View className="flex-row items-center mb-2">
          <Ionicons name="location-outline" size={14} color={colors.primary} />
          <Text className="text-sm text-gray-500 dark:text-gray-400 ml-1">{person.distance}</Text>
        </View>
        <View className="flex-row flex-wrap gap-2">
          {person.interests.map((interest: string, index: number) => (
            <View key={index} className="bg-primary/10 px-2 py-1 rounded-full">
              <Text className="text-xs text-primary">{interest}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
      <View className="px-4 py-3 border-b border-secondary">
        <View className="flex-row items-center mb-4">
          <View className={`flex-row items-center ${isDarkMode ? 'bg-secondary' : 'bg-gray-100'} rounded-xl px-4 py-3 flex-1`}>
            <Ionicons name="search-outline" size={20} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />
            <TextInput
              placeholder="Search nearby..."
              placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
              value={searchQuery}
              onChangeText={setSearchQuery}
              className={`flex-1 ml-3 ${isDarkMode ? "text-white" : "text-black"}`}
            />
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="p-4">
          {/* Meetups Section */}
          <Text className="text-xl font-bold mb-4 text-white">Nearby Meetups</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
            {meetups.map(renderMeetupCard)}
          </ScrollView>

          {/* People Section */}
          <Text className="text-xl font-bold mb-4 text-gray-200">People Nearby</Text>
          {people.map(renderPersonCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}