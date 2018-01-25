import React from 'react';
import {Text, View , Image , Dimensions , StatusBar , Alert , AsyncStorage , ScrollView , Keyboard} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Form, Item, Input, Label , Content , Toast , Spinner} from 'native-base'
import { Entypo } from '@expo/vector-icons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {NavigationActions } from 'react-navigation'
 var {height, width} = Dimensions.get('window');


var radio_props = [
    {label: 'مصارحات عامة', value: 'general' },
    {label: 'مصارحات الكلية', value: 'true' },
      {label: 'مصارحات المرحلة', value: 'false' }
];

function renderIf (condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}
export class AddPost extends React.Component {

    constructor(props) {
      super(props)

        this.state = {
          content : "",
          isGeneral: "true",
          autoFocus:'false',
          loadingDisplay :false

        };

    }

      static navigationOptions = {
          tabBarLabel: 'اضافة مصارحة',
          tabBarIcon : ({tintColor})=>(<Entypo style={{fontSize : 20 , marginTop : 5 , color : tintColor}} name='plus' />)

      };



        async addPost() {
          Keyboard.dismiss()
          this.setState({loadingDisplay : true})
         var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
         fetch('https://sarihapp.herokuapp.com/api/addpost', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: this.state.content,
              isGeneral: this.state.isGeneral,
              email : userDetails.email,
              token : userDetails.token
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



          setTimeout(()=>{
            if (this.state.isGeneral === "true") {
              this.props.navigation.navigate('CollegePosts')

            } else {
              this.props.navigation.navigate('StagePosts')
            }
          },2000)

          this.setState({content : ""})
            } else {
                  Toast.show({
                  text: response.message,
                  position: 'bottom',
                  buttonText: 'اغلاق',
                  type : 'danger',
                  duration : 4000
                })




              }
           })

      }

      async addgeneralpost() {
        Keyboard.dismiss()
        this.setState({loadingDisplay : true})
       var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
       fetch('https://sarihapp.herokuapp.com/api/addgeneralpost', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: this.state.content,
            isGeneral: this.state.isGeneral,
            email : userDetails.email,
            token : userDetails.token
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



        setTimeout(()=>{
          if (this.state.isGeneral === "true") {
            this.props.navigation.navigate('GeneralPosts')

          } else {
            this.props.navigation.navigate('GeneralPosts')
          }
        },2000)

        this.setState({content : ""})
          } else {
                Toast.show({
                text: response.message,
                position: 'bottom',
                buttonText: 'اغلاق',
                type : 'danger',
                duration : 4000
              })




            }
         })

    }



      addin() {
        if (this.state.isGeneral === 'general') {
          this.addgeneralpost()
        } else {
          this.addPost()
        }
      }

  render() {
    const {goBack} = this.props.navigation;
    const {navigate} = this.props.navigation;

    return (

    <Container>
    <StatusBar
       barStyle="dark-content"
       backgroundColor="#f8f8f8"
     />
     <ScrollView keyboardShouldPersistTaps='handled'>
        <View>
          <Input
          style={{fontFamily : 'cairo' , backgroundColor : 'white' , textAlign : 'right', margin : 5 , height:height/4}}
          placeholder="ادخل نص المصارحة ..."
          placeholderTextColor='gray'
          multiline={true}
          onChangeText={(text) => this.setState({content : text})}
          value={this.state.content}
           />
        </View>
          <View style={{alignItems:'center', width : width , marginTop :2 }}>
          <Text style={{fontFamily : 'cairo' , fontSize : 12 , color : 'gray'}}>اضافة في :</Text>
          </View>
      <View style={{alignItems:'center' , width : width , marginTop : 10 }}>
      <RadioForm
         radio_props={radio_props}
         onPress={(value) => {this.setState({isGeneral:value})}}
         formHorizontal={true}
         buttonColor={'gray'}
         labelHorizontal={false}
         labelColor={'gray'}
         initial={1}
         labelStyle={{backgroundColor:'transparent' , fontFamily : 'cairo' , marginTop : 4  , fontSize : 12}}
         buttonOuterSize={25}
         buttonSize={15}
       />
      </View>
      {renderIf (this.state.loadingDisplay,
        <View style={{width : width , alignItems : 'center' }}>
          <Spinner color="gray" />
        </View>
      )}
      <View style={{width : width , alignItems : 'center' , marginTop : 10}}>
      <Button onPress={()=>{this.addin()}} style={{alignSelf : 'center' , width : width/3 , justifyContent : 'center' , backgroundColor : 'rgb(116, 144, 172)'}}>
        <Text style={{fontFamily : 'cairo' , fontSize : 15 , color : 'white'}}> ارسال </Text>
      </Button>

      </View>

      <Text style={{fontFamily : 'cairo' , fontSize : 12 , color : 'gray' , textAlign : "center" , marginTop : 30}}> </Text>

      </ScrollView>

    </Container>
    );
  }
}
