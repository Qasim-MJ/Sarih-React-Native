import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Font } from 'expo'
import { Home } from './screens/home.js'
import { Signup } from './screens/signup.js'
import { SelectCollege } from './screens/selectcollege.js'
import { Login } from './screens/login.js'
import { Terms } from './screens/terms.js'
import { PostsTab } from './screens/poststab.js'
import {Text, View , AsyncStorage , Dimensions , StatusBar , Image} from 'react-native';
import { Root } from "native-base";
const ReactNative = require('react-native');
import {Button , Spinner}  from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import Onboarding from 'react-native-simple-onboarding';


var {height, width} = Dimensions.get('window');

export default class App extends React.Component {
  state = {
  fontLoaded: false,
  islogedin : false,
  connected : true,
  isFirstTime : true
    };

  async componentWillMount() {
    var isFirstTime = JSON.parse(await AsyncStorage.getItem('isFirstTime'))
    if (isFirstTime == false) {
        this.setState({isFirstTime : false})
    }
    // Disable force RTL in Android
    try {
    ReactNative.I18nManager.allowRTL(false);
      } catch (e) {
          console.log(e);
      }


    await Font.loadAsync({
      'cairo': require('./assets/cairo.ttf'),
    });

    var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
    if (userDetails === null) {
      userDetails = ""
    }
    fetch('https://sarihapp.herokuapp.com/islogedin', {
       method: 'Get',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'x-access-token' : `${userDetails.token}`,
         'email' : `${userDetails.email}`
       }
     })
     .then((res) => {
       var response = JSON.parse(res._bodyText)
       if (response.success) {
             this.setState({islogedin : true ,  fontLoaded: true})
       } else {
          this.setState({fontLoaded: true})
       }
       })
       setTimeout(()=>{
         this.setState({connected : false})
       } , 3000)
  }

  async refresh() {
    var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
    if (userDetails === null) {
      userDetails = ""
    }
    fetch('https://sarihapp.herokuapp.com/islogedin', {
       method: 'Get',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'x-access-token' : `${userDetails.token}`,
         'email' : `${userDetails.email}`
       }
     })
     .then((res) => {
       var response = JSON.parse(res._bodyText)
       if (response.success) {
             this.setState({islogedin : true ,  fontLoaded: true})
       } else {
          this.setState({fontLoaded: true})
       }
       })
  }

  render() {
      if (this.state.fontLoaded) {
    if (this.state.islogedin) {
      return (

        <Root>
        <LogedinNav />
        </Root>
      );
    } else {
      if (this.state.isFirstTime) {
        return (
          <Onboarding
              pages={[
              { backgroundColor: '#f1f1f1', image : <Image style={{width : 175 , height : 150 }} source={require('./assets/logo.png')} />  , title: 'تطبيق لمجتمع الكلية', subtitle: 'شارك ارائك عن طلاب كليتك ومرحلتك بسرية تامة ومن غير اظهار اسمك او معلوماتك' },
              { backgroundColor: "#fe6e58", image : <Image style={{width : 175 , height : 150 }} source={require('./assets/commentsicon.png')} /> , title: 'المصارحات والتعليقات', subtitle: 'اكتب المصارحة الخاصة بك او قم بالتعليق على مصارحات الاخرين' },
              { backgroundColor: "#7490ac", image : <Image style={{width : 150 , height : 150 }} source={require('./assets/notificationicon.png')} />  , title: 'التنبيهات', subtitle: 'احصل على التنبيهات عندما يقوم احد بنشر مصارحة جديدة' },
            ]}
              showSkip={false}
              onEnd={()=>{this.setState({isFirstTime : false})}}
              />

        )
      } else {
        return (
          <Root>
          <MainNav />
          </Root>
        );
      }

    }
  } else {
    if (this.state.connected) {
      return (
          <View style={{alignItems : 'center' , justifyContent : 'center' , width : width , height : height}}>
          <StatusBar
             barStyle="dark-content"
           />
           <Spinner color="gray" />

           </View>
      )
    } else {
      return (
          <View style={{alignItems : 'center' , justifyContent : 'center' , width : width , height : height}}>
          <StatusBar
             barStyle="dark-content"
           />
           <Button onPress={()=>{this.refresh()}} transparent style={{alignSelf : 'center'}}>
            <Ionicons name="md-refresh" style={{fontSize : 40 , color : "gray"}}/>
           </Button>
            <Text style={{color : '#939393' , marginTop : 10}}> يرجى التحقق من اتصالك بالانترنت</Text>

           </View>
      )
    }
  }
  }

}

const MainNav = StackNavigator({
  Home: {
          screen: Home,
        },
  Signup : {
          screen : Signup
  },
  SelectCollege : {
          screen : SelectCollege
  },
  Terms : {
          screen : Terms
  },
  Login : {
          screen : Login
  },
  PostsTab : {
          screen : PostsTab,
          navigationOptions: {
       gesturesEnabled: false,
   }
  },

},{
  initialRouteName : "Home",

});


const LogedinNav = StackNavigator({
  Home: {
          screen: Home,
        },
  Signup : {
          screen : Signup
  },
  SelectCollege : {
          screen : SelectCollege
  },
  Terms : {
          screen : Terms
  },
  Login : {
          screen : Login
  },

  PostsTab : {
          screen : PostsTab,
          navigationOptions: {
       gesturesEnabled: false,
   }
  },

},{
  initialRouteName : "PostsTab",

});
