import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import CategorySelector from '../components/CategorySelector';
import { fontSize, HP, WP } from '../theme/scale';
import { colors } from '../theme/colors';

const HomeScreen = () => {
  // Mock data for categories
  const categories = [
    'Asia',
    'Europe',
    'South America',
    'North America',
    'Africa',
  ];

  // State to manage the active category
  const [activeCategory, setActiveCategory] = useState('South America');

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Afridi</Text>
          <Text style={styles.welcome}>Welcome to Wallify</Text>
        </View>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profilePic}
        />
      </View>

      {/* Search Component */}
      <SearchComponent />

      {/* Category Selector Component */}
      <CategorySelector
        categories={categories}
        selectedCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* You can add more content below, like a list of trips */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: HP(1.5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WP(5),
  },
  greeting: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    color: colors.text,
  },
  welcome: {
    fontSize: fontSize(16),
    color: colors.placeholder,
  },
  profilePic: {
    width: WP(12),
    height: WP(12),
    borderRadius: WP(6),
  },
});

export default HomeScreen;
