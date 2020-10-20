import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
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
  const [width, setWidth] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
    navigation.navigate('MapView', {item: item});
  };

  const onLayout = (e) => {
    setWidth(Dimensions.get('window').width);
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
          <View style={style.containerStyle}>
            <Image
              style={style.imageStyle}
              source={
                item.img[0].image != ''
                  ? {uri: item.img[0].image}
                  : require('../assets/image/placeholder.jpg')
              }
              defaultSource={require('../assets/image/placeholder.jpg')}
            />
            <View style={[style.childContainer,{width:width - 115}]}>
              <View style={[style.childSubContainer,{width:width - 200}]}>
                <Text style={style.textStyle}>{item.title}</Text>
                {ratingView()}
              </View>
              <TouchableOpacity
                onPress={() => {
                  openMap(item);
                }}>
                <View style={style.pinContainerStyle}>
                  <Image
                    source={require('../assets/image/map.png')}
                    style={style.pinImage}
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
    <ScrollView onLayout={onLayout} style={{width: width}}>
      {restList?.map((item, index) => {
        return renderRow(item, index);
      })}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 10,
  },
  imageStyle: {height: 75, width: 75, borderRadius: 10},
  childContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    paddingStart: 20,
  },
  childSubContainer: {
    flexDirection: 'column',
  },
  textStyle: {
    fontSize: 20,
  },
  pinContainerStyle: {
    backgroundColor: '#00FA9A',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'flex-end',
    width: 55,
  },
  pinImage: {height: 35, width: 25},
});
