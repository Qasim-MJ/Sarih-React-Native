import React from 'react';
import {Text, View , Image , Dimensions , StatusBar , Alert , AsyncStorage} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Form, Toast, Item, Input, Label} from 'native-base'
import { Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Permissions, Notifications } from 'expo';

import { Analytics, PageHit } from 'expo-analytics';
const analytics = new Analytics('UA-58539743-7');


var {height, width} = Dimensions.get('window');

function renderIf (condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}

export class Login extends React.Component {

    constructor(props) {
      super(props)

        this.state = {
          password : "",
          email:"",
          loadingDisplay :false
        };

    }

      static navigationOptions = {
        header: null,
      };

      componentDidMount() {
        analytics.hit(new PageHit('login'));
      }

      login() {
        this.setState({loadingDisplay : true})
        const {navigate} = this.props.navigation;
       fetch( 'https://sarihapp.herokuapp.com/login', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             password: this.state.password,
             email: this.state.email
           })

         })
         .then((res) => {
           this.setState({loadingDisplay : false})
           var response = JSON.parse(res._bodyText)
           if (response.success) {
             this.registerForPushNotificationsAsync()

             Toast.show({
             text: response.message,
             position: 'bottom',
             buttonText: 'اغلاق',
             type : 'success',
             duration : 1000


           })

           var userDetails = { email : this.state.email.toLowerCase() , isVerified : response.isVerified , token : response.token , hasLogedIn : true}
           AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));


           setTimeout(()=>{ navigate('PostsTab')},1000)



           } else {
                 Toast.show({
                 text: response.message,
                 position: 'bottom',
                 buttonText: 'اغلاق',
                 type : 'danger',
                 duration : 2000
               })
             }

         })
     }

     async registerForPushNotificationsAsync() {
  const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to our backend so we can use it to send pushes from there
  return fetch('https://sarihapp.herokuapp.com/assigntoken', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      expoToken: token ,
      email: this.state.email
    }),
  });
}

  render() {
    const {goBack} = this.props.navigation;
    return (

    <Container>
    <KeyboardAwareScrollView>
       <Image style={{width : width , height : height, alignItems : 'center'}} source={require('../assets/background.jpg')}>
        <Header style={{alignSelf : "flex-start",backgroundColor : "transparent" ,  borderBottomColor : "transparent"}}>
        <StatusBar
           barStyle="light-content"
           backgroundColor="black"

         />
          <Left>
          <Button onPress={()=>{goBack()}} transparent>
            <Entypo name='chevron-left' size={32} color={'#e67375'} />
            <Text style={{color : 'white' , fontSize :17 , fontFamily : 'cairo'}}>رجوع</Text>

          </Button>
          </Left>
          <Right/>
        </Header>
        <Image style={{width : 200 , height : 175 , marginTop : height/12}} source={require('../assets/logo.png')} />
        <View style={{width : width/1.2 }}>
          <Form>
              <Item floatingLabel last>
                <Label style={{alignSelf : 'flex-end' , color : 'white' , fontSize :17 , fontFamily : 'cairo' , marginTop : 3}}>البريد الالكتروني</Label>
                <Input keyboardAppearance= "dark" keyboardType = 'email-address' style={{color : 'white' , fontFamily : 'cairo'}}  value = {this.state.email} onChangeText={(email)=>{this.setState({email})}}/>
              </Item>
              <Item floatingLabel last>
                <Label style={{alignSelf : 'flex-end' , color : 'white' , fontSize :17 , fontFamily : 'cairo' , marginTop : 3}}>كلمة المرور</Label>
                <Input keyboardAppearance= "dark" secureTextEntry={true} style={{color : 'white' , fontFamily : 'cairo'}} value = {this.state.password} onChangeText={(password)=>{this.setState({password})}}/>
              </Item>
              {renderIf (this.state.loadingDisplay,
                <View style={{width : width/1.2 , alignItems : 'center' , marginBottom : -40 }}>
                <Image style={{width : 70, height : 70}} source={require('../assets/loading.gif')} />
                </View>
              )}
              <Button onPress={()=>{this.login()}} block style={{backgroundColor : 'rgba(116, 144, 172,0.7)' , marginTop : 40}}>
                <Text style={{color:"white" ,fontFamily : 'cairo', fontSize : 17 }}>تسجيل الدخول</Text>
              </Button>
            </Form>
        </View>
        </Image>
        </KeyboardAwareScrollView>
    </Container>
    );
  }
}
