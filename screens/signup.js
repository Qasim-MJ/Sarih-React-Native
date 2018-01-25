import React from 'react';
import {Text, View , Image , Dimensions , StatusBar , Alert , AlertIOS , AsyncStorage} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Form, Toast, Item, Input, Label , Content , Picker } from 'native-base'
import { Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
import { Permissions, Notifications } from 'expo';

import { Analytics, PageHit } from 'expo-analytics';
const analytics = new Analytics('UA-58539743-7');


function renderIf (condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}

var {height, width} = Dimensions.get('window');

var radio_props = [
  {label: 'انثى', value: 'female' },
    {label: 'ذكر', value: 'male' }
];


export class Signup extends React.Component {

    constructor(props) {
      super(props)

        this.state = {
          name : "" ,
          password : "",
          confirmPassword : "",
          email:"",
          sex:"male",
          date:"",
          college:"اختر الكلية",
          stage:"",
          padding1 : 20,
          padding2 : 20,
          loadingDisplay :false

        };

    }

    selectCollege = data => {
    this.setState({college : data});
  };


    componentDidMount() {
      analytics.hit(new PageHit('signup'));
    }

setCollege(value) {
  this.setState({college : value , padding1 : 20})

}

setStage(value) {
  this.setState({stage : value , padding2 : 20})

}

      static navigationOptions = {
        header: null,
      };
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
       register() {
                  console.log(this.state.college);
                 this.setState({loadingDisplay : true})
          if (this.state.password === this.state.confirmPassword) {
            const {navigate} = this.props.navigation;
           fetch( 'https://sarihapp.herokuapp.com/register', {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                 name: this.state.name,
                 password: this.state.password,
                 email: this.state.email,
                 sex: this.state.sex,
                 birthday:this.state.date,
                 college: this.state.college,
                 stage: this.state.stage

               })

             })
             .then((res) => {
               this.setState({loadingDisplay : false})
               var response = JSON.parse(res._bodyText)
               if (response.success) {

                 Toast.show({
                 text: response.message,
                 position: 'bottom',
                 buttonText: 'اغلاق',
                 type : 'success',
                 duration : 2000
               })

               this.registerForPushNotificationsAsync()
               var userDetails = {email:this.state.email.toLowerCase() , isVerified : response.isVerified , token : response.token , hasLogedIn : true}
               AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));

               setTimeout(()=>{ navigate('PostsTab')},1000)

               } else {
                     Toast.show({
                     text: response.message,
                     position: 'bottom',
                     buttonText: 'اغلاق',
                     type : 'danger',
                     duration : 3000
                   })
                 }
             })
          } else {
            this.setState({loadingDisplay : false})
            Toast.show({
            text: "كلمتا المرور غير مطابقة",
            position: 'bottom',
            buttonText: 'اغلاق',
            type : 'danger',
            duration : 3000
          })
          }
      }

  render() {
    const {goBack} = this.props.navigation;
    const {navigate} = this.props.navigation;

    return (

    <Container>
    <KeyboardAwareScrollView>
       <Image style={{width : width , height : height, alignItems : 'center'}} source={require('../assets/background.jpg')}>
        <Header style={{alignSelf : "flex-start",backgroundColor : "transparent" ,  borderBottomColor : "transparent"}}>
        <StatusBar
           barStyle="light-content"
           backgroundColor="black"
         />
          <Left style={{flex : 1}}>
          <Button onPress={()=>{goBack()}} transparent>
            <Entypo name='chevron-left' size={32} color={'#e67375'} />
            <Text style={{color : 'white' , fontSize :17 , fontFamily : 'cairo'}}>رجوع</Text>
          </Button>
          </Left>
          <Body style={{alignItems : 'center'}}>
          <Image style={{width : 50, height : 45 , marginTop : 10}} source={require('../assets/logo.png')} />
          </Body>
          <Right/>
        </Header>
        <Content>
        <View style={{width : width/1.1 , marginTop : -width/30}}>
          <Form>
            <Item floatingLabel>
              <Label style={{alignSelf : 'flex-end' , color : 'white' , fontSize :15 , fontFamily : 'cairo' , marginTop : 3}}>الاسم</Label>
              <Input style={{color : 'white' , fontFamily : 'cairo' , textAlign : 'right'}} keyboardAppearance= "dark" value={this.state.name} onChangeText={(name)=>{this.setState({name})}}/>
            </Item>
            <Item floatingLabel >
              <Label style={{alignSelf : 'flex-end' , color : 'white' , fontSize :15 , fontFamily : 'cairo' , marginTop : 3}}>البريد الالكتروني</Label>
              <Input keyboardAppearance= "dark" keyboardType = 'email-address' style={{color : 'white' ,textAlign : 'right' , fontFamily : 'cairo'}}  value = {this.state.email} onChangeText={(email)=>{this.setState({email})}}/>
            </Item>
            <View style={{flexDirection : 'row' , width : width/1.1 , alignSelf : 'center' , justifyContent : 'flex-end' }}>
            <Item floatingLabel style={{ width : width/2.42 }}>
              <Label style={{  alignSelf : 'flex-end',color : 'white' , fontSize :15 , fontFamily : 'cairo' , marginTop : 3}}>اعادة كلمة المرور</Label>
              <Input keyboardAppearance= "dark" secureTextEntry={true} style={{color : 'white' , textAlign : 'right' , fontFamily : 'cairo' }} value = {this.state.confirmPassword} onChangeText={(confirmPassword)=>{this.setState({confirmPassword})}}/>
            </Item>
              <Item floatingLabel style={{width : width/2.42 ,alignSelf : 'flex-end'}}>
                <Label style={{ alignSelf : 'flex-end',color : 'white' , fontSize :15 , fontFamily : 'cairo' , marginTop : 3}}>كلمة المرور</Label>
                <Input keyboardAppearance= "dark" secureTextEntry={true} style={{color : 'white' ,textAlign : 'right',  fontFamily : 'cairo'}} value = {this.state.password} onChangeText={(password)=>{this.setState({password})}}/>
              </Item>
            </View>
            <View style={{flexDirection : 'row' , width : width/1.1 , alignSelf : 'center' , justifyContent : 'flex-end'}}>
              <View style={{justifyContent : 'center' , marginRight : width/25 , paddingTop : width/20}}>
              <DatePicker
                 style={{width: width/2.4}}
                 date={this.state.date}
                 mode="date"
                 showIcon = {false}
                 placeholder="اختر تاريخ الميلاد"
                 format="YYYY-MM-DD"
                 minDate="1980-05-01"
                 maxDate="2018-06-01"
                 confirmBtnText="اختيار"
                 cancelBtnText="الغاء"
                 customStyles={{

                   dateInput: {
                     borderWidth : 1
                   },
                   placeholderText:{
                     fontFamily : 'cairo',
                     color : 'white',
                     fontSize :15
                   },
                   dateText :{
                     fontFamily : 'cairo',
                     color : 'white',
                     fontSize :15
                   }
                   // ... You can check the source to find the other keys.
                 }}
                 onDateChange={(date) => {this.setState({date: date})}}
               />
              </View>
              <View style={{ width : width/2.42 , alignItems : 'flex-end', paddingTop : width/10 , paddingRight : width/10}}>
                <RadioForm
                   radio_props={radio_props}
                   onPress={(value) => {this.setState({sex:value})}}
                   formHorizontal={true}
                   buttonColor={'white'}
                   labelHorizontal={false}
                   labelColor={'white'}
                   initial={1}
                   labelStyle={{backgroundColor:'transparent' , fontFamily : 'cairo' , marginTop : 4  , paddingBottom : 10, fontSize : 15}}
                   buttonOuterSize={25}
                   buttonSize={15}
                 />
              </View>
            </View>
            <View style={{ width : width/1.1 , alignSelf : 'center' , alignItems : 'center', justifyContent : 'center' , marginTop : 15 }}>
            <Button transparent onPress={()=>{navigate('SelectCollege' , { selectCollege: this.selectCollege })}}
                    style={{ width : width/1.15 , alignSelf : 'center' , alignItems : 'center', justifyContent : 'flex-end' , borderWidth : 1  , borderColor : 'white' }}
            ><Text style={{fontFamily : 'cairo' , color : 'white' , fontSize : 17}}>{this.state.college}</Text></Button>
              </View>
              <View style={{ width : width/1.1 , alignSelf : 'center' , alignItems : 'center', justifyContent : 'center' , marginTop :10 }}>
              <Picker
                 mode="dialog"
                 placeholder = {'اختر المرحلة'}
                 selectedValue={this.state.stage}
                 onValueChange={this.setStage.bind(this)}
                 itemTextStyle={{fontFamily : 'cairo' }}
                 iosHeader={'اختر المرحلة'}
                 textStyle={{fontFamily : 'cairo' , color : 'white' , fontSize : 17 , paddingTop : 20 , justifyContent : 'center' , alignSelf : 'center' , textAlign : 'right' , alignItems : 'center'}}
                 headerStyle={{fontFamily : 'cairo' }}
                 headerBackButtonText="رجوع"
                 headerBackButtonTextStyle={{ color: "red" , fontFamily : 'cairo'}}
                 headerTitleStyle={{ fontFamily : 'cairo' }}
                 style={{borderWidth : 1  ,  paddingBottom : this.state.padding2 , borderColor : 'white' , width : width/1.15 , color : 'white'  , fontFamily : 'cairo' , fontSize : 15, justifyContent : 'flex-end'}}

               >
                <Picker.Item label="اختر المرحلة" value="" />
                 <Picker.Item label="المرحلة الاولى" value="الاولى" />
                 <Picker.Item label="المرحلة الثانية" value="الثانية" />
                 <Picker.Item label="المرحلة الثالثة"  value="الثالثة" />
                 <Picker.Item label="المرحلة الرابعة" value="الرابعة" />
                 <Picker.Item label="المرحلة الخامسة" value="الخامسة" />
                 <Picker.Item label="المرحلة السادسة" value="السادسة" />
                </Picker>
                </View>

          </Form>
          <View style={{width : width/1.1 , alignItems : 'center' }}>
          <Text style={{color : 'white' , fontSize :14 , fontFamily : 'cairo' , marginTop : 10}}>بضغطك تسجيل الحساب انت توافق على </Text>
          <Button onPress={()=>{navigate('Terms')}} style = {{alignSelf :'center' , marginTop : -10}} transparent>
            <Text style={{color:"rgba(116, 144, 172,0.7)" ,fontFamily : 'cairo', fontSize : 14 }}>الاحكام والشروط</Text>
          </Button>
          </View>
          {renderIf (this.state.loadingDisplay,
            <View style={{width : width/1.1 , alignItems : 'center' , marginBottom : -40 }}>
              <Image style={{width : 70, height : 70}} source={require('../assets/loading.gif')} />
            </View>
          )}
          <Button onPress={()=>{this.register()}} block style={{backgroundColor : 'rgba(116, 144, 172,0.7)' , marginTop : 20}}>
            <Text style={{color:"white" ,fontFamily : 'cairo', fontSize : 17 }}>تسجيل الحساب</Text>
          </Button>
        </View>
        </Content>
        </Image>
        </KeyboardAwareScrollView>
    </Container>
    );
  }
}
