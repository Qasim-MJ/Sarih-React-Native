import React from 'react';
import {Text, View , Image , Dimensions , StatusBar , AsyncStorage} from 'react-native';
import {  Container , Button , Header , Left , Right , Body} from 'native-base'
import { Entypo } from '@expo/vector-icons';
import { Font } from 'expo'

import { Analytics, PageHit } from 'expo-analytics';
const analytics = new Analytics('UA-58539743-7');

var {height, width} = Dimensions.get('window');


export class Terms extends React.Component {

      static navigationOptions = {
        header: null,
      };


      componentDidMount() {
        analytics.hit(new PageHit('terms'));
      }

  render() {
    const {goBack} = this.props.navigation;
    const {navigate} = this.props.navigation;

    return (
    <View>
    <Header style={{alignSelf : "flex-start",backgroundColor : "transparent" ,  borderBottomColor : "transparent"}}>
    <StatusBar
       barStyle="dark-content"
       backgroundColor="black"
     />
      <Left style={{flex : 1}}>
      <Button onPress={()=>{goBack()}} transparent>
        <Entypo name='chevron-left' size={32} color={'#e67375'} />
        <Text style={{color : '#e67375' , fontSize :17 , fontFamily : 'cairo'}}>رجوع</Text>
      </Button>
      </Left>
      <Body style={{alignItems : 'center'}}>
      <Image style={{width : 50, height : 45 , marginTop : 10}} source={require('../assets/logo.png')} />
      </Body>
      <Right/>
    </Header>
      <View style={{ marginTop : 20 ,  alignItems : 'flex-end' , paddingRight : 10 , paddingLeft : 10 }}>
        <Text style={{fontFamily : 'cairo'  , textAlign : 'right' , fontSize : 17}}>
            باستعمالك موقع صارح فانك توافق على الشروط والاحكام التالية:
         </Text>
         <Text style={{fontFamily : 'cairo'  , textAlign : 'right' , fontSize : 14 , marginTop : 20}}>
          الخصوصية والامان : للمحافظة على تطبيق صارح كبيئة امنة للجميع يجب ان يلتزم المستخدم بتوفير العلومات المطلوبة في التسجيل والتي ستكون سرية تماما للحفاظ على خصوصية المستخدم .
          </Text>
          <Text style={{fontFamily : 'cairo'  , textAlign : 'right' , fontSize : 14 , marginTop : 20}}>
            انشاء المحتوى : يلتزم تطبيق صارح بالحق على حذف اي محتوى غير لائق ببيئة التطبيق ويتضمن ذلك اي محتوى بغيض او كريه او يحتوي على كلام عنصري واي كلام يمس الاخرين بصورة سيئة مما ياثر على سلامتهم الشخصية , كذلك لتطبيق صارح الحق بحضر اي مستخدم يقوم بمخالفة هذه الشروط .
          </Text>
      </View>
    </View>
    );
  }
}
