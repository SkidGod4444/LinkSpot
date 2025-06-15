import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  TextInput,
  FlatList,
  RefreshControl,
} from "react-native";
import { useTheme } from "@/contexts/theme.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, images } from "@/constants";
import { useState } from "react";

export default function Index() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tabs, setTabs] = useState('events-tab');

  const filters = [
    { id: 'all', label: 'All', icon: 'grid-outline' },
    { id: 'nearby', label: 'Nearby', icon: 'location-outline' },
    { id: 'today', label: 'Today', icon: 'today-outline' },
    { id: 'trending', label: 'Trending', icon: 'trending-up-outline' },
    { id: 'tech', label: 'Tech', icon: 'laptop-outline' },
    { id: 'social', label: 'Social', icon: 'people-outline' },
  ];

  const feedItems = [
    {
      id: 1,
      type: 'meetup',
      title: "Tech Networking Night",
      date: "Mar 15, 2024",
      time: "6:00 PM",
      location: "Downtown Hub",
      attendees: 24,
      image: images.fallbackPFP,
      host: "Sarah Chen",
      isGoing: false,
      likes: 45,
      distance: "0.5 km",
      tags: ['networking', 'tech', 'startup']
    },
    {
      id: 2,
      type: 'club',
      name: "React Native Developers",
      members: 156,
      image: images.fallbackPFP,
      description: "Building amazing mobile apps together",
      isJoined: true,
      newPosts: 3,
      lastActivity: "2 hours ago",
      tags: ['react-native', 'mobile', 'development']
    },
    {
      id: 3,
      type: 'meetup',
      title: "Coffee & Code",
      date: "Mar 18, 2024",
      time: "10:00 AM",
      location: "Central Cafe",
      attendees: 12,
      image: images.fallbackPFP,
      host: "Mike Johnson",
      isGoing: true,
      likes: 23,
      distance: "1.2 km",
      tags: ['coffee', 'coding', 'casual']
    },
    {
      id: 4,
      type: 'club',
      name: "UI/UX Designers",
      members: 89,
      image: images.fallbackPFP,
      description: "Creating beautiful user experiences",
      isJoined: false,
      newPosts: 7,
      lastActivity: "1 day ago",
      tags: ['design', 'ui', 'ux']
    },
    {
      id: 5,
      type: 'meetup',
      title: "Weekend Hiking Adventure",
      date: "Mar 20, 2024",
      time: "8:00 AM",
      location: "Mountain Trail",
      attendees: 18,
      image: images.fallbackPFP,
      host: "Adventure Club",
      isGoing: false,
      likes: 67,
      distance: "5.8 km",
      tags: ['hiking', 'outdoor', 'adventure']
    }
  ];

  const onRefresh = () => {
    setRefreshing(true);
    console.log("Refreshing...");
    setTimeout(() => {
      setRefreshing(false);
      console.log("Refreshed");
    }, 2000);
  };

  const renderMeetupCard = (item) => (
    <View className={`mx-4 mb-4 rounded-2xl ${isDarkMode ? 'bg-dark-accent' : 'bg-white'} shadow-lg`}>
      <View className="relative">
        <Image
          source={item.image}
          className="w-full h-48 rounded-t-2xl"
          style={{ resizeMode: "cover" }}
        />
        <View className="absolute top-3 right-3 bg-black/30 rounded-full px-3 py-1">
          <Text className="text-white text-xs font-medium">{item.distance}</Text>
        </View>
        <TouchableOpacity className="absolute top-3 left-3 bg-black/30 rounded-xl p-2">
          <Ionicons 
            name={item.isGoing ? "bookmark" : "bookmark-outline"} 
            size={20} 
            color={item.isGoing ? colors.primary : "white"} 
          />
        </TouchableOpacity>
      </View>
      
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text className={`text-lg font-bold flex-1 ${isDarkMode ? "text-white" : "text-black"}`}>
            {item.title}
          </Text>
          <View className="flex-row gap-2 items-center">
            <TouchableOpacity activeOpacity={0.9} className="bg-secondary border border-accent px-6 py-1 rounded-xl flex-row items-center">
              <Text className="text-white text-base font-medium">RSVP</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View className="flex-row items-center mb-2">
          <Ionicons name="calendar-outline" size={16} color={colors.primary} />
          <Text className={`ml-2 ${isDarkMode ? "text-white" : "text-black"}`}>
            {item.date} at {item.time}
          </Text>
        </View>
        
        <View className="flex-row items-center mb-3">
          <Ionicons name="location-outline" size={16} color={colors.primary} />
          <Text className={`ml-2 flex-1 ${isDarkMode ? "text-white" : "text-black"}`}>
            {item.location}
          </Text>
        </View>
        
        <View className="flex-row flex-wrap mb-3">
          {item.tags.map((tag, index) => (
            <View key={index} className="bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mr-2 mb-1">
              <Text className="text-primary text-sm">{tag}</Text>
            </View>
          ))}
        </View>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center bg-secondary rounded-full px-3 py-1">
            <Image 
              source={images.fallbackPFP}
              className="w-5 h-5 rounded-full mr-2"
            />
            <Text className={`text-sm ${isDarkMode ? "text-white" : "text-black"}`}>
              {item.host}
            </Text>
          </View>
          <View className="flex-row items-center space-x-4 gap-2">
            <View className="flex-row items-center">
              <Ionicons name="people-outline" size={20} color={colors.primary} />
              <Text className={`ml-1 ${isDarkMode ? "text-white" : "text-black"}`}>
                {item.attendees}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderClubCard = (item) => (
    <View className={`mx-4 mb-4 rounded-2xl ${isDarkMode ? 'bg-dark-accent' : 'bg-white'} shadow-lg`}>
      <View className="relative">
        <Image
          source={item.image}
          className="w-full h-32 rounded-t-2xl"
          style={{ resizeMode: "cover" }}
        />
        {item.newPosts > 0 && (
          <View className="absolute top-3 right-3 bg-primary rounded-full px-2 py-1">
            <Text className="text-white text-xs font-bold">{item.newPosts} new</Text>
          </View>
        )}
      </View>
      
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text className={`text-lg font-bold flex-1 ${isDarkMode ? "text-white" : "text-black"}`}>
            {item.name}
          </Text>
          <TouchableOpacity className="ml-2">
            <Ionicons 
              name={item.isJoined ? "checkmark-circle" : "add-circle-outline"} 
              size={24} 
              color={item.isJoined ? colors.primary : (isDarkMode ? "white" : "black")} 
            />
          </TouchableOpacity>
        </View>
        
        <Text className={`mb-3 ${isDarkMode ? "text-white" : "text-black"}`}>
          {item.description}
        </Text>
        
        <View className="flex-row flex-wrap mb-3">
          {item.tags.map((tag, index) => (
            <View key={index} className="bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mr-2 mb-1">
              <Text className="text-primary heytext-xs">{tag}</Text>
            </View>
          ))}
        </View>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={16} color={colors.primary} />
            <Text className={`ml-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {item.members} members
            </Text>
          </View>
          <Text className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Active {item.lastActivity}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderFeedItem = ({ item }) => {
    if (item.type === 'meetup') {
      return renderMeetupCard(item);
    } else {
      return renderClubCard(item);
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-dark" : "bg-white"}`}>
      {/* Header */}
      <View className={`px-4 py-3 ${isDarkMode ? 'bg-dark' : 'bg-white'} border-b ${isDarkMode ? 'border-secondary' : 'border-white'} shadow-white drop-shadow-sm`}>
        <View className="flex-row justify-between items-center mb-3">
          <View>
            <Text className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
              LinkSpot
            </Text>
            <Text className={`${isDarkMode ? "text-accent" : "text-gray-600"}`}>
              Find clubs and meetups near you
            </Text>
          </View>
          <View className="flex-row items-center space-x-3">
            <TouchableOpacity 
              activeOpacity={0.9}
             className="flex-row gap-2 items-center bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
              <Ionicons name="location-outline" size={18} color={colors.primary} />
              <Text className="text-primary text-base font-medium">New York</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Search Bar */}
        <View className={`flex-row items-center ${isDarkMode ? 'bg-secondary' : 'bg-gray-100'} rounded-xl px-4 py-3 mb-3`}>
          <Ionicons name="search-outline" size={20} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />
          <TextInput
            placeholder="Search clubs, meetups, or topics..."
            placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            keyboardType="default"
            onSubmitEditing={() => {
              console.log("Search submitted:", searchQuery);
            }}
            className={`flex-1 ml-3 ${isDarkMode ? "text-white" : "text-black"}`}
          />
          <TouchableOpacity activeOpacity={0.9} onPress={() => setShowFilters(!showFilters)}>
            <Ionicons name="options-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        {/* Filter Chips */}
        {showFilters && (
          <View className="flex-row flex-wrap gap-2">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                onPress={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full flex-row items-center ${
                  activeFilter === filter.id 
                    ? 'bg-primary' 
                    : isDarkMode ? 'bg-secondary' : 'bg-gray-200'
                }`}
              >
                <Ionicons 
                  name={filter.icon} 
                  size={16} 
                  color={activeFilter === filter.id ? "white" : (isDarkMode ? "#9CA3AF" : "#6B7280")} 
                />
                <Text className={`ml-2 text-sm ${
                  activeFilter === filter.id 
                    ? 'text-white font-medium' 
                    : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View className={`flex-row justify-between px-4 bg-dark-accent py-3 border-b ${isDarkMode ? 'border-secondary' : 'border-white'} shadow-white drop-shadow-sm`}>
        <TouchableOpacity 
          activeOpacity={0.9}
          className={`flex-1 mr-2 ${tabs === 'events-tab' ? 'bg-primary' : 'bg-secondary'} rounded-l-2xl py-3 items-center justify-center`}
          onPress={() => setTabs('events-tab')}
        >
          <Text className="text-white font-medium">
            Explore Events
          </Text>
        </TouchableOpacity>
        <View className="w-0.5 bg-accent/30" />
        <TouchableOpacity 
          activeOpacity={0.9}
          className={`flex-1 ml-2 ${tabs === 'clubs-tab' ? 'bg-primary' : 'bg-secondary'} rounded-r-2xl py-3 items-center justify-center`}
          onPress={() => setTabs('clubs-tab')}
        >
          <Text className="text-white font-medium">
            Explore Clubs
          </Text>
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <FlatList
        data={feedItems}
        renderItem={renderFeedItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 80}}
      />
    </SafeAreaView>
  );
}