import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Share,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from '../components/Icon';
import { colors } from '../theme/colors';
import { fontSize, HP, WP } from '../theme/scale';
import TopBar from '../components/TopBar';
import CustomBottomsheet from '../components/CustomBottomsheet';
import Animated, { FadeInDown } from 'react-native-reanimated';

const WallpaperDetailScreen = ({ route }) => {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing wallpaper: ${item.title} from ${item.location}, ${item.country}`,
        url: item.uri,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share wallpaper');
    }
  };

  const handleSetAsWallpaper = () => {
    setBottomSheetVisible(true);
  };

  const handleWallpaperOption = option => {
    setBottomSheetVisible(false);
    Alert.alert(
      'Set Wallpaper',
      `You chose to set wallpaper as: ${option}\n\nPlease take a screenshot or save the image, then set it via your device settings.`,
    );
  };

  return (
    <View style={styles.container}>
      <TopBar title={item.title} />
      <View style={styles.contentWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Wallpaper Image */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.wallpaperImage} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Title and Description */}
            <View style={styles.titleSection}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                  <Icon
                    name="HeartIcon"
                    size={fontSize(30)}
                    color={isFavorite ? colors.favourite : colors.dark}
                    variant={isFavorite ? 'solid' : 'outline'}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.location}>
                {item.location}, {item.country}
              </Text>

              {/* Rating */}
              <View style={styles.ratingContainer}>
                <Icon
                  name="StarIcon"
                  size={fontSize(20)}
                  color={colors.dark}
                  variant="outline"
                />
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Animated.View
        entering={FadeInDown.delay(300).duration(700).springify()}
        style={styles.actionButtons}
      >
        <TouchableOpacity
          style={[styles.actionButton, styles.shareButton]}
          onPress={handleShare}
        >
          <Icon name="ShareIcon" size={fontSize(20)} color={colors.dark} />
          <Text style={[styles.actionButtonText, { color: colors.dark }]}>
            Share
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.setWallpaperButton]}
          onPress={handleSetAsWallpaper}
        >
          <Icon name="PhotoIcon" size={20} color={colors.white} />
          <Text style={styles.actionButtonText}>Set as Wallpaper</Text>
        </TouchableOpacity>
      </Animated.View>
      <CustomBottomsheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        title="Set Wallpaper"
      >
        <View style={styles.sheetOptions}>
          <TouchableOpacity
            style={styles.sheetButton}
            onPress={() => handleWallpaperOption('Home Screen')}
          >
            <Text style={styles.sheetButtonText}>Set as Home Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sheetButton}
            onPress={() => handleWallpaperOption('Lock Screen')}
          >
            <Text style={styles.sheetButtonText}>Set as Lock Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sheetButton}
            onPress={() => handleWallpaperOption('Both')}
          >
            <Text style={styles.sheetButtonText}>Set Both</Text>
          </TouchableOpacity>
        </View>
      </CustomBottomsheet>
    </View>
  );
};

export default WallpaperDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  imageContainer: {
    marginHorizontal: WP(5),
    marginBottom: HP(2),
  },
  wallpaperImage: {
    width: '100%',
    height: HP(60),
    borderRadius: WP(4),
  },

  content: {
    paddingHorizontal: WP(5),
    paddingBottom: HP(3),
  },
  titleSection: {
    marginBottom: HP(3),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: HP(1),
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: '700',
    color: colors.dark,
    flex: 1,
  },
  location: {
    fontSize: fontSize(16),
    color: colors.placeholder,
    marginBottom: HP(1.5),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WP(1),
  },
  ratingText: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.dark,
  },
  reviewsText: {
    fontSize: fontSize(14),
    color: colors.placeholder,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: WP(3),
    marginHorizontal: WP(5),
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: HP(1.5),
    borderRadius: WP(3),
    gap: WP(2),
    marginBottom: HP(2),
  },
  shareButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.dark,
  },
  setWallpaperButton: {
    backgroundColor: colors.dark,
  },
  actionButtonText: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.white,
  },

  sheetButton: {
    backgroundColor: colors.dark,
    borderRadius: WP(2),
    paddingVertical: HP(1.5),
    marginBottom: HP(2),
    alignItems: 'center',
  },
  sheetButtonText: {
    color: colors.white,
    fontSize: fontSize(16),
    fontWeight: '600',
  },
});
