import React, { useState, useEffect } from 'react';
import { 
  Text, View, StyleSheet, 
  TextInput, Alert, ActivityIndicator,
  ImageBackground,Image
} from 'react-native'
import { Button } from 'react-native-paper';
import { useForm, Controller, FormProvider } from 'react-hook-form'
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import { connect } from "react-redux";
import { actloginUser, actLocationSet } from "../actions/index"
import { styles, BACKGROUND_LOGIN, colors } from '../styles'
import { Ionicons } from '@expo/vector-icons';
// import * as Updates from 'expo-updates';


function Login(props) {
  
  const [ip, setIP] = React.useState(null);
  useEffect(() => {
    async function getIP() {
      fetch('https://api.ipify.org?format=json')
      .then(response => response.json() )
      .then(data => setIP(data.ip) )
      .catch(error => console.log(error));
    }
    getIP();
  },[]);


  const getLocation = async() => {
    let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Vui lòng bật định vị và cấp quyền để tiếp tục');
      }
      let locationC = await Location.getCurrentPositionAsync({});
      props.locationSet(locationC.coords)
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Vui lòng bật định vị và cấp quyền để tiếp tục');
      }
      let locationC = await Location.getCurrentPositionAsync({});
      props.locationSet(locationC.coords)
    })();
  }, []);

  const { register, setValue, handleSubmit, control } = useForm();

  const onSubmit = async(data) => {
    data = {...data, 
      lat: props.token.lat, 
      lon: props.token.lon,
      device_brand: Device.brand,
      device_os: Device.osName,
      device_name: Device.modelName,
    }
    if (data.username == null || data.password == null)
      Alert.alert('Chưa nhập tài khoản hoặc mật khẩu')
    else if  (data.lat == null || data.lon == null) {
      getLocation()
    }
    else {
      await props.login(data)
      if (props.token.token === undefined) 
        Alert.alert('Sai tài khoản hoặc mật khẩu')
    }
  };
  if (props.token.fetching)
    return (
      <View style={[styles.container, {alignItems: 'center'}]}>
        <Text>Loading ... </Text>
        <ActivityIndicator size={100} color={colors.primary}/> 
      </View>
    )
  if (props.data.fetching)
    return (
      <View style={[styles.container, {alignItems: 'center'}]}>
        <Text>Loading data... </Text>
        <ActivityIndicator size={100} color={colors.primary}/> 
      </View>
    )
  return (
    <View style={[styles.container, 
      {alignItems: 'center', backgroundColor: BACKGROUND_LOGIN}]}>
      <ImageBackground source={require('../images/bg-login.jpg')} style={styles.bglogin}>
        {/* <Image source={require('../images/logo-LGM.png')} style={styles.logologin}></Image> */}
        <View style={styles.boxlogin}>
          <Image source={require('../images/logo-LGM.png')} style={styles.logologin}></Image>
          <View style={styles.inputView} >
            <View style={styles.iconinput} >
              <Ionicons name="md-person" size={20} color="white" style={{marginLeft:'auto',marginRight:'auto'}}/> 
            </View>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholder="Tài khoản" 
                  style={styles.inputTextBlack}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="username"
            />
          </View>
          <View style={styles.inputView} >
            <View style={styles.iconinput} >
              <Ionicons name="ios-key" size={20} color="white" style={{marginLeft:'auto',marginRight:'auto'}}/> 
            </View>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                   secureTextEntry={true} 
                  placeholder="Mật khẩu" 
                  style={styles.inputTextBlack}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="password"
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:9,color:colors.dark,marginLeft:'5%',opacity:0.7}}>
              model: {Device.brand}{"\n"}
              position: {props.token.lat},{props.token.lon}{"\n"}
              ip: {ip}
            </Text>
            <Button
              style={styles.loginBtn}
              mode="contained"
              onPress={handleSubmit(onSubmit)}
            >
            Đăng nhập
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};


const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (config) => {
      dispatch(actloginUser(config))
    }, 
    locationSet: (content) => {
      dispatch(actLocationSet(content))
    }, 
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Login);

