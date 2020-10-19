import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Image, Dimensions, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Rating} from 'react-native-ratings';
  
export default Details = () => {
  const route = useRoute();
  const item = route?.params?.item;
  console.log('item', item.img[1].image);

  const ratingView = () => {
    return (
      <Rating
        type="custom"
        ratingImage={require('../assets/image/Star-empty.png')}
        ratingBackgroundColor="#ffffff"
        ratingColor="#ffffff"
        ratingCount={5}
        imageSize={15}
        readonly
        style={{alignSelf: 'flex-start', marginTop: 10}}
      />
    );
  };
 const  renderDotIndicator = () => {
    return <PagerDotIndicator pageCount={3} />;
  }

  return (
    <ScrollView
      style={{
        width: Dimensions.get('screen').width,
        backgroundColor: '#ffffff',
        height: '100%',
      }}>
      <View>
      

        <Image
          style={{width: '100%', height: 200}}
          source={{uri: item.img[1].image}}
        />
        <View style={{padding: 20}}>
          <Text style={{fontSize: 30}}>{item.title} </Text>
          <Text style={{fontSize: 20, color: '#A9A9A9'}}>{item.phone_no} </Text>
          {ratingView()}
          <Text style={{fontSize: 20, marginTop: 10}}>Description </Text>
          <Text style={{fontSize: 15, color: '#A9A9A9'}}>
            {item.description}{' '}
          </Text>
          <Text style={{fontSize: 20, marginTop: 10}}>Address </Text>
          <Text style={{fontSize: 15, color: '#A9A9A9'}}>{item.address} </Text>
        </View>
      </View>
    </ScrollView>
  );
};
