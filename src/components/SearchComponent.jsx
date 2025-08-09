import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { fontSize, HP, WP } from '../theme/scale';
import { colors } from '../theme/colors';

const SearchComponent = () => {
  return (
    <View style={styles.searchContainer}>
      <Icon
        name="MagnifyingGlassIcon"
        color={colors.dark}
        strokeWidth={2}
        variant="outline"
      />
      <TextInput
        placeholder="Search"
        placeholderTextColor={colors.placeholder}
        style={styles.textInput}
        cursorColor={colors.dark}
      />
      <TouchableOpacity
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        activeOpacity={0.5}
        style={styles.filterButton}
      >
        <Icon
          name="AdjustmentsHorizontalIcon"
          color={colors.white}
          variant="solid"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingLeft: WP(5),
    paddingRight: WP(2),
    paddingVertical: HP(0.5),
    marginTop: HP(4),
    marginHorizontal: WP(5),
  },
  textInput: {
    flex: 1,
    marginLeft: WP(2.5),
    fontSize: fontSize(18),
    fontWeight: '500',
    color: colors.text,
  },
  filterButton: {
    backgroundColor: colors.dark,
    borderRadius: 999,
    padding: WP(2),
  },
});

export default SearchComponent;
