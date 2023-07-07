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

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  return (
    <View
      style={{
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
      }}>
      {dailyImage && (
        <>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            {dailyImage.title}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '300',
                marginTop: 4,
              }}>
              {formatDate(new Date(dailyImage.date))}
            </Text>
          </View>

          <Pressable onPress={() => setImageVisible(true)}>
            <Image
              source={{uri: dailyImage.url}}
              style={{height: 200, marginTop: 16, marginHorizontal: -16}}
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
              style={{
                marginTop: 16,
                fontSize: 16,
                fontWeight: '300',
              }}
              numberOfLines={textShown ? undefined : 3}
              onTextLayout={onTextLayout}>
              {dailyImage.explanation}
            </Text>
            {lengthMore ? (
              <TouchableOpacity
                onPress={toggleNumberOfLines}
                activeOpacity={0.4}>
                <Text
                  style={{
                    lineHeight: 21,
                    marginTop: 2,
                    fontWeight: 'bold',
                    color: Colors.berkeley,
                  }}>
                  {textShown ? 'Read less' : 'Read more'}
                </Text>
              </TouchableOpacity>
            ) : null}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '300',
                marginTop: 2,
                textAlign: 'right',
              }}>
              created by: {dailyImage.copyright}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default DailyImage;

const styles = StyleSheet.create({});
