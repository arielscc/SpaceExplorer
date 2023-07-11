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
        <View style={WorldEventStyles.container}>
          <View style={WorldEventStyles.header}>
            <Text style={WorldEventStyles.headerTitle}>
              {eonetEvents.title}
            </Text>
            <Text style={WorldEventStyles.headerDescription}>
              {eonetEvents.description}
            </Text>
          </View>
          {eonetEvents.events.map(
            ({categories, geometries, description, id, sources, title}) => {
              return (
                <View key={id} style={WorldEventStyles.eventsContainer}>
                  <Text style={WorldEventStyles.eventsTitle}>{title}</Text>
                  {description && <Text>{description}</Text>}

                  <View key={id} style={WorldEventStyles.eventDetails}>
                    {categories.map(({id, title}) => {
                      return <Text key={id}>{title}</Text>;
                    })}
                    {sources.map(({id, url}) => {
                      return (
                        <View key={id} style={{alignItems: 'flex-end'}}>
                          <Pressable
                            onPress={() => openUrl(url)}
                            style={WorldEventStyles.eventLink}>
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

                  <View style={{marginTop: 12}}>
                    <View style={WorldEventStyles.columnsContainer}>
                      <Text style={WorldEventStyles.headerDate}>date</Text>
                      <Text style={WorldEventStyles.headerLongitude}>
                        longitude
                      </Text>
                      <Text style={WorldEventStyles.headerLatitude}>
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
                            <View style={WorldEventStyles.columnsContainer}>
                              <Text style={WorldEventStyles.contentDate}>
                                {formatDate(new Date(date))}
                              </Text>
                              <Text style={WorldEventStyles.contentLongitude}>
                                {longitude}
                              </Text>
                              <Text style={WorldEventStyles.contentLatitude}>
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

const WorldEventStyles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerDescription: {
    fontSize: 14,
    fontWeight: '300',
    marginTop: 4,
  },
  eventsContainer: {
    borderBottomColor: Colors.graystrong,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  eventsTitle: {
    color: Colors.berkeley,
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventLink: {
    backgroundColor: Colors.cerulean,
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerDate: {
    flex: 1,
    fontWeight: 'bold',
  },
  headerLongitude: {
    flex: 1 / 2,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  headerLatitude: {
    flex: 1 / 2,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  contentDate: {
    flex: 1,
    fontSize: 14,
  },
  contentLongitude: {
    flex: 1 / 2,
    textAlign: 'left',
    fontSize: 14,
  },
  contentLatitude: {
    flex: 1 / 2,
    textAlign: 'right',
    fontSize: 14,
  },
});
