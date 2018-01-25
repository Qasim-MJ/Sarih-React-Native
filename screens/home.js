import React from 'react';
import {Text, View , Image , Dimensions , StatusBar , AsyncStorage} from 'react-native';
import {  Container , Button} from 'native-base'
import { Font } from 'expo'

import { Analytics, PageHit } from 'expo-analytics';
const analytics = new Analytics('UA-58539743-7');
analytics.hit(new PageHit('home'));

var {height, width} = Dimensions.get('window');


export class Home extends React.Component {

      static navigationOptions = {
        header: null,
      };


      componentDidMount() {
        analytics.hit(new PageHit('home'));

      }

  render() {
    const {navigate} = this.props.navigation;
    return (
    <Container>
      <StatusBar
         barStyle="light-content"
       />
      <Image style={{width : width , height : height, alignItems : 'center'}} source={require('../assets/background.jpg')}>
        <Image style={{width : 200 , height : 175 , marginTop : height/5}} source={require('../assets/logo.png')} />
        <View style={{width : width/1.3}}>
          <Button onPress={()=>{navigate('Signup')}}  block style={{backgroundColor : "rgba(66, 66, 66,0.7)" , marginTop : 100}}>
            <Text style={{color:"white" , fontFamily : 'cairo', fontSize : 17 }}>حساب جديد</Text>
          </Button>
          <Button onPress={()=>{navigate('Login')}}   block style={{backgroundColor : 'rgba(116, 144, 172,0.7)' , marginTop : 40}}>
            <Text style={{color:"white" ,fontFamily : 'cairo', fontSize : 17 }}>تسجيل الدخول</Text>
          </Button>
        </View>
      </Image>
    </Container>
    );
  }
}
