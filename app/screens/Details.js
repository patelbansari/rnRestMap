import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Image, Dimensions, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Rating} from 'react-native-ratings';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

export default Details = () => {
  const route = useRoute();
  const item = route?.params?.item;
  const [wid, setWidth] = useState(0);
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
  const renderDotIndicator = () => {
    return <PagerDotIndicator pageCount={item.img.length} />;
  };

  const onLayout = (e) => {
    setWidth(Dimensions.get('window').width);
  };

  return (
    <ScrollView onLayout={onLayout} style={[style.scrollView,{width:wid}]}>
      <View>
        <IndicatorViewPager
          style={{height: 250}}
          indicator={renderDotIndicator()}>
          {item.img.map((item, index) => {
            console.log(item.image);
            return (
              <Image
                key={index}
                style={{width: '100%', height: 250}}
                defaultSource={require('../assets/image/placeholder.jpg')}
                source={
                  item.image != ''
                    ? {uri: item.image}
                    : require('../assets/image/placeholder.jpg')
                }
              />
            );
          })}
        </IndicatorViewPager>

        <View style={style.bottomView}>
          <Text style={style.title}>{item.title} </Text>
          <Text style={style.phoneno}>{item.phone_no} </Text>
          {ratingView()}
          <Text style={style.des}>Description </Text>
          <Text style={style.desVal}>{item.description} </Text>
          <Text style={style.address}>Address </Text>
          <Text style={style.addressVal}>{item.address} </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  bottomView: {padding: 20},
  title: {fontSize: 30},
  phoneno: {fontSize: 20, color: '#A9A9A9'},
  des: {fontSize: 20, marginTop: 10},
  desVal: {fontSize: 15, color: '#A9A9A9'},
  address: {fontSize: 20, marginTop: 10},
  addressVal: {fontSize: 15, color: '#A9A9A9'},
});
