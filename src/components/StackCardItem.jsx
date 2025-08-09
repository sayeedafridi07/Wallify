import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Icon from './Icon';
import { data } from '../data/images';
import { HP, WP } from '../theme/scale';

const StackCardItem = ({ item, index, actualIndex, setActualIndex }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const position = useSharedValue({ x: 0, y: 0 });
  const lastOffset = useSharedValue({ x: 0, y: 0 });
  const value = useSharedValue(data.length);

  const panGestureHandler = Gesture.Pan()
    .runOnJS(true)
    .onUpdate(({ translationX, translationY }) => {
      position.value = {
        x: translationX + lastOffset.value.x,
        y: translationY + lastOffset.value.y,
      };
    })
    .onEnd(() => {
      if (
        Math.abs(position.value.x) < 100 &&
        Math.abs(position.value.y) < 100
      ) {
        lastOffset.value = { x: 0, y: 0 };
        position.value = withSpring({ x: 0, y: 0 });
      } else {
        lastOffset.value = { x: 0, y: 0 };
        position.value = withTiming({
          x: position.value.x * 10,
          y: position.value.y * 10,
        });
        setActualIndex(actualIndex - 1);
        data.pop();
      }
    });

  const rotate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 8, -8, 0],
      Extrapolate.CLAMP,
    );
  });
  const additionalTranslate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 30, -30, 0],
      Extrapolate.CLAMP,
    );
  });
  const scale = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0.2, 0.9, 0.9, 1],
      Extrapolate.CLAMP,
    );
  });
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotate.value}deg`,
        },
        {
          translateX: position.value.x + additionalTranslate.value,
        },
        {
          translateY: position.value.y,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  useEffect(() => {
    value.value = withSpring(actualIndex, {
      stiffness: 100,
    });
  }, [actualIndex]);

  return (
    <GestureDetector gesture={panGestureHandler}>
      <Animated.View
        style={[{ zIndex: actualIndex + 1 }, styles.container, rnStyle]}
      >
        <ImageBackground source={{ uri: item.uri }} style={styles.imagesStyle}>
          {/* Favorite Button */}
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Icon 
              name={isFavorite ? "HeartIcon" : "HeartIcon"} 
              size={24} 
              color={isFavorite ? "#ff4757" : "white"}
              variant={isFavorite ? "solid" : "outline"}
            />
          </TouchableOpacity>

          <View style={styles.imageView}>
            {/* Country Label */}
            <View style={styles.countryContainer}>
              <Text style={styles.countryText}>{item.country}</Text>
            </View>
            
            {/* Location and Rating */}
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>{item.location}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="StarIcon" size={16} color="#ffd700" variant="solid" />
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.reviewsText}>{item.reviews} reviews</Text>
              </View>
            </View>

            {/* See More Button */}
            <TouchableOpacity style={styles.seeMoreButton}>
              <Text style={styles.seeMoreText}>See more</Text>
              <Icon name="ChevronRightIcon" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Animated.View>
    </GestureDetector>
  );
};

export default StackCardItem;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: WP(70),
    height: HP(45),
  },
  imageView: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  imagesStyle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 12,
    objectFit: 'contain',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  countryContainer: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  countryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
  },
  locationContainer: {
    marginBottom: 12,
  },
  locationText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewsText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
  seeMoreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  seeMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
