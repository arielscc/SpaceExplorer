import React, {useEffect, useState} from 'react';
import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {IEonetEvents} from '../services/types';
import {getEonetEvents} from '../services/worldEvents';
import {Colors} from '../ui/colors';

const WorldEvents = () => {
  const [eonetEvents, setEonetEvents] = useState<IEonetEvents>();
  const [showItems, setShowItems] = useState('');

  const fetchEonetEvents = async () => {
    try {
      const events = await getEonetEvents();
      if (events) {
        setEonetEvents(events);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEonetEvents();
  }, []);

  const openUrl = async (url: string) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: Colors.berkeley,
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'crossDissolve',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: Colors.berkeley,
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });
    return formattedDate;
  };

  const logMoreItems = (id: string) => {
    if (showItems === id) {
      setShowItems('');
    } else {
      setShowItems(id);
    }
  };

  return (
    <View>
      {eonetEvents ? (
        <View style={{margin: 16}}>
          <View style={{alignItems: 'center', marginBottom: 24}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              {eonetEvents.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '300',
                marginTop: 4,
              }}>
              {eonetEvents.description}
            </Text>
          </View>
          {eonetEvents.events.map(
            ({categories, geometries, description, id, sources, title}) => {
              return (
                <View
                  key={id}
                  style={{
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.graystrong,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: Colors.berkeley,
                    }}>
                    {title}
                  </Text>
                  {description && <Text>{description}</Text>}

                  <View
                    key={id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    {categories.map(({id, title}) => {
                      return <Text key={id}>{title}</Text>;
                    })}
                    <View>
                      {sources.map(({id, url}) => {
                        return (
                          <View key={id} style={{alignItems: 'flex-end'}}>
                            <Pressable
                              onPress={() => openUrl(url)}
                              style={{
                                backgroundColor: Colors.cerulean,
                                paddingHorizontal: 4,
                                borderRadius: 4,
                              }}>
                              <Text
                                style={{
                                  color: Colors.white,
                                }}>
                                {id}
                              </Text>
                            </Pressable>
                          </View>
                        );
                      })}
                    </View>
                  </View>

                  <View style={{marginTop: 8}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 12,
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 'bold',
                        }}>
                        date
                      </Text>
                      <Text
                        style={{
                          flex: 1 / 2,
                          textAlign: 'left',
                          fontWeight: 'bold',
                        }}>
                        longitude
                      </Text>
                      <Text
                        style={{
                          flex: 1 / 2,
                          textAlign: 'right',
                          fontWeight: 'bold',
                        }}>
                        latitude
                      </Text>
                    </View>
                  </View>

                  {geometries.length &&
                    geometries.map(({coordinates, date}, index) => {
                      const [longitude, latitude] = coordinates;
                      if (index <= 2 || showItems === id) {
                        return (
                          <View style={{marginTop: 8}} key={index}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Text
                                style={{
                                  flex: 1,
                                  fontSize: 14,
                                }}>
                                {formatDate(new Date(date))}
                              </Text>
                              <Text
                                style={{
                                  flex: 1 / 2,
                                  textAlign: 'left',
                                  fontSize: 14,
                                }}>
                                {longitude}
                              </Text>
                              <Text
                                style={{
                                  flex: 1 / 2,
                                  textAlign: 'right',
                                  fontSize: 14,
                                }}>
                                {latitude}
                              </Text>
                            </View>
                          </View>
                        );
                      }
                    })}
                  {geometries.length > 2 && (
                    <Pressable>
                      <Text
                        style={{color: Colors.red, marginTop: 8}}
                        onPress={() => logMoreItems(id)}>
                        {showItems === id ? 'Show less' : 'Show more'}
                      </Text>
                    </Pressable>
                  )}
                </View>
              );
            },
          )}
        </View>
      ) : (
        <Text>loading</Text>
      )}
    </View>
  );
};

export default WorldEvents;

const styles = StyleSheet.create({});
