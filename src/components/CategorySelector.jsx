import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { fontSize, HP, WP } from '../theme/scale';
import { colors } from '../theme/colors';

const CategorySelector = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your next trip</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {categories.map(category => {
          const isSelected = category === selectedCategory;
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                isSelected && styles.selectedCategoryButton,
              ]}
              onPress={() => onSelectCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: HP(2),
  },
  title: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: HP(1.5),
    marginLeft: WP(5),
  },
  scrollViewContent: {
    paddingHorizontal: WP(5),
  },
  categoryButton: {
    backgroundColor: colors.white,
    paddingVertical: HP(1),
    paddingHorizontal: WP(5),
    borderRadius: 999,
    marginRight: WP(2.5),
  },
  selectedCategoryButton: {
    backgroundColor: colors.dark,
  },
  categoryText: {
    fontSize: fontSize(14),
    color: colors.text,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: colors.white,
    fontWeight: '500',
  },
});

export default CategorySelector;
