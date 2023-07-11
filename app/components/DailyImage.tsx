import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextLayoutEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import EnhancedImageViewing from 'react-native-image-viewing/dist/ImageViewing';
import {getDailyImage} from '../services/dailyImage';
import {IDailyImage} from '../services/types';
import {Colors} from '../ui/colors';

const DailyImage = () => {
  const [dailyImage, setDailyImage] = useState<IDailyImage>();
  const [lengthMore, setLengthMore] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  const fetchDailyImage = async () => {
    try {
      const image = await getDailyImage();
      setDailyImage(image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDailyImage();
  }, []);

  const formatDate = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });
    return formattedDate;
  };

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      setLengthMore(e.nativeEvent.lines.length >= 3);
    },
    [],
  );

  return (
    <View>
      <View style={DailyImageStyles.container}>
        <Text style={DailyImageStyles.title}>Daily Image</Text>
        <Text style={DailyImageStyles.subtitle}>
          NASA's Astronomy Picture of the Day
        </Text>
      </View>
      <View style={DailyImageStyles.cardContainer}>
        {dailyImage && (
          <>
            <Text style={DailyImageStyles.cardTitle}>{dailyImage.title}</Text>
            <Text style={DailyImageStyles.cardDate}>
              {formatDate(new Date(dailyImage.date))}
            </Text>
            <Pressable onPress={() => setImageVisible(true)}>
              <Image
                source={{uri: dailyImage.url}}
                style={DailyImageStyles.cardImage}
                accessible
                accessibilityLabel={`daily image: ${dailyImage.title}`}
                loadingIndicatorSource={{
                  cache: 'force-cache',
                }}
              />
            </Pressable>
            {imageVisible && (
              <EnhancedImageViewing
                images={[
                  {
                    uri: dailyImage.url,
                  },
                ]}
                imageIndex={0}
                visible={imageVisible}
                onRequestClose={() => setImageVisible(false)}
                animationType="slide"
                backgroundColor={Colors.dark}
                doubleTapToZoomEnabled
              />
            )}

            <View>
              <Text
                style={DailyImageStyles.cardDescription}
                numberOfLines={textShown ? undefined : 3}
                onTextLayout={onTextLayout}>
                {dailyImage.explanation}
              </Text>
              {lengthMore ? (
                <TouchableOpacity
                  onPress={() => setTextShown(!textShown)}
                  activeOpacity={0.4}>
                  <Text style={DailyImageStyles.cardReadMore}>
                    {textShown ? 'Read less' : 'Read more'}
                  </Text>
                </TouchableOpacity>
              ) : null}
              <Text style={DailyImageStyles.cardCreator}>
                created by: {dailyImage.copyright}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default DailyImage;

const DailyImageStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '300',
    marginTop: 4,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 14,
    fontWeight: '300',
    marginTop: 4,
  },
  cardImage: {
    height: 200,
    marginHorizontal: -16,
    marginTop: 16,
  },
  cardDescription: {
    fontSize: 16,
    fontWeight: '300',
    marginTop: 16,
  },
  cardReadMore: {
    color: Colors.berkeley,
    fontWeight: 'bold',
    lineHeight: 21,
    marginTop: 2,
  },
  cardCreator: {
    fontSize: 14,
    fontWeight: '300',
    marginTop: 2,
    textAlign: 'right',
  },
});
