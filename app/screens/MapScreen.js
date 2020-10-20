import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default MapScreen = () => {
  const route = useRoute();
  const item = route?.params?.item;
  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.long),
          latitudeDelta:5 /111.045,
          longitudeDelta: 0.0121,
        }}>
        <Marker coordinate={{latitude: parseFloat(item.lat), longitude: parseFloat(item.long)}} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
