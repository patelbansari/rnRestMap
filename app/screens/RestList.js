import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import Constant from '../config/Constant';
import RestService from '../service/rest/RestService';
import CardView from 'react-native-cardview';
import {useDispatch, useSelector} from 'react-redux';
import * as CommonActions from '../redux/action/CommonAction';
import {useNavigation} from '@react-navigation/native';
import DbRnRestMap from '../database/DbRnRestMap';
import apiConfig from '../config/apiConfig';

export default RestList = () => {
  const restList = useSelector((state) => state.CommonReducers.restList);
  const [isUpdate,setIsUpdate] = useState(false)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log('restlist', restList);

  useEffect(() => {

    async function fetchData() {
        const res = await DbRnRestMap.getApiData(
            apiConfig.Base_url + Constant.api.restList,
          );
          if (res != null && res.length > 0) {
            dispatch(CommonActions.updateRestList(res));
          } else {
            RestService.getRestList(Constant.api.restList, true)
              .then((res) => {
                dispatch(CommonActions.updateRestList(res.data));
              })
              .catch((error) => {
                console.log('', error);
              });
          }
      }
      fetchData();
  
  }, []);

  const ratingView = (item) => {
    return (
      <Rating
        type="custom"
        ratingImage={require('../assets/image/Star-empty.png')}
        ratingBackgroundColor="#ffffff"
        ratingColor="#ffffff"
        ratingCount={5}
        imageSize={15}
        readonly
        style={{alignSelf: 'flex-start'}}
      />
    );
  };

  const openMap = (item) => {
    const latitude = item.lat;
    const longitude = item.lng;
    const label = item.address;
    const url = Platform.select({
      ios: 'maps:' + latitude + ',' + longitude + '?q=' + label,
      android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
    });
    Linking.openURL(url);
  };

  const renderRow = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigation.navigate('Details', {item: item});
        }}>
        <CardView
          style={{margin: 10}}
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={10}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#ffffff',
              alignItems: 'center',
              padding: 10,
            }}>
            <Image
              style={{height: 75, width: 75, borderRadius: 10}}
              source={{uri: item.img[1].image}}
            />
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                width: Dimensions.get('screen').width - 115,
                justifyContent: 'space-between',
                paddingStart: 20,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: Dimensions.get('screen').width - 200,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                  }}>
                  {item.title}
                </Text>
                {ratingView()}
              </View>
              <TouchableOpacity
                onPress={() => {
                  openMap(item);
                }}>
                <View
                  style={{
                    backgroundColor: '#48A215',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    alignItems: 'flex-end',
                    width: 55,
                  }}>
                  <Image
                    source={require('../assets/image/map.png')}
                    style={{height: 35, width: 25}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </CardView>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={{width: Dimensions.get('screen').width}}>
      {restList?.map((item, index) => {
        return renderRow(item, index);
      })}
    </ScrollView>
  );
};
