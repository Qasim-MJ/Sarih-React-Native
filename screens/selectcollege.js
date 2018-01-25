import React from 'react';
import {Text, View , Image , Dimensions , StatusBar , Alert , AlertIOS , AsyncStorage} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Form, Toast, Item, Input, Label , Content , Picker , List , ListItem} from 'native-base'
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


export class SelectCollege extends React.Component {

    constructor(props) {
      super(props)

        this.state = {
          colleges : [
            {'university' : 'المجاميع العامة' , 'colleges' : ['المجموعة العامة ١']},
            {'university' : 'جامعة بغداد' , 'colleges' : [
                      'كلية الطب - جامعة بغداد',
                      'كلية طب الكندي - جامعة بغداد',
                      'كلية طب الاسنان - جامعة بغداد',
                      'كلية الطب البيطري - جامعة بغداد',
                      'كلية الصيدلة - جامعة بغداد',
                      'كلية التمريض - جامعة بغداد',
                      'كلية القانون - جامعة بغداد',
                      'كلية هندسة المدني - جامعة بغداد',
                      'كلية هندسة الكهرباء - جامعة بغداد',
                      'كلية هندسة المعماري - جامعة بغداد',
                      'كلية هندسة الطاقة - جامعة بغداد',
                      'كلية هندسة البيئة - جامعة بغداد',
                      'كلية هندسة الاتصالات - جامعة بغداد',
                      'كلية هندسة الحاسبات - جامعة بغداد',
                      'كلية هندسة الكيمياوية - جامعة بغداد',
                      'كلية هندسة الميكانيك - جامعة بغداد',
                      'كلية هندسة النفط - جامعة بغداد',
                      'كلية هندسة الموارد المائية - جامعة بغداد',
                      'كلية هندسة المساحة - جامعة بغداد',
                      'كلية هندسة الطيران - جامعة بغداد',
                      'كلية هندسة خوارزمي الاتصالات - جامعة بغداد',
                       'كلية هندسة خوارزمي الكيمياء الاحيائية - جامعة بغداد',
                       'كلية هندسة الطب الحياتي - جامعة بغداد',
                      'كلية علوم الكيمياء - جامعة بغداد',
                      'كلية علوم الفيزياء - جامعة بغداد',
                      'كلية علوم الحياة - جامعة بغداد',
                      'كلية علوم الرياضيات - جامعة بغداد',
                      'كلية علوم الارض - جامعة بغداد',
                      'كلية علوم الحاسبات - جامعة بغداد',
                      'كلية الكيمياء ابن الهيثم - جامعة بغداد',
                      'كلية الفيزياء ابن الهيثم - جامعة بغداد',
                      'كلية علوم الحياة ابن الهيثم - جامعة بغداد',
                      'كلية الحاسبات ابن الهيثم - جامعة بغداد',
                      'كلية الرياضيات ابن الهيثم - جامعة بغداد',
                      'كلية إدارة الاعمال - جامعة بغداد',
                      'كلية الاقتصاد - جامعة بغداد',
                      'كلية المحاسبة - جامعة بغداد',
                      ]},
            {'university' : 'الجامعة المستنصرية' , 'colleges' : [
                      'كلية الطب - الجامعة المستنصرية',
                      'كلية طب الاسنان - الجامعة المستنصرية',
                      'كلية الصيدلة - الجامعة المستنصرية',
                      'كلية الاداب - الجامعة المستنصرية',
                      'كلية هندسة المدني - الجامعة المستنصرية',
                      'كلية هندسة الكهرباء - الجامعة المستنصرية',
                      'كلية هندسة المعماري - الجامعة المستنصرية',
                      'كلية هندسة البيئة - الجامعة المستنصرية',
                      'كلية هندسة الميكانيك - الجامعة المستنصرية',
                      'كلية هندسة الحاسبات - الجامعة المستنصرية',
                      'كلية علوم الكيمياء - الجامعة المستنصرية',
                      'كلية علوم الفيزياء - الجامعة المستنصرية',
                      'كلية علوم الحياة - الجامعة المستنصرية',
                      'كلية علوم الرياضيات - الجامعة المستنصرية',
                      'كلية علوم الحاسبات - الجامعة المستنصرية',
                      'كلية القانون - الجامعة المستنصرية',
                      'كلية إدارة الاعمال - الجامعة المستنصرية',
                      'كلية الاقتصاد - الجامعة المستنصرية',
                      'كلية المحاسبة - الجامعة المستنصرية',
                      ]},
            {'university' : 'جامعة النهرين' , 'colleges' : [
                      'كلية الطب - جامعة النهرين',
                      'كلية الصيدلة - جامعة النهرين',
                      'كلية هندسة المدني - جامعة النهرين',
                      'كلية هندسة المعماري - جامعة النهرين',
                      'كلية هندسة الليزر - جامعة النهرين',
                      'كلية هندسة الميكانيك - جامعة النهرين',
                      'كلية هندسة الحاسبات - جامعة النهرين',
                      'كلية هندسة الاتصالات - جامعة النهرين',
                      'كلية هندسة الشبكات - جامعة النهرين',
                      'كلية علوم الكيمياء - جامعة النهرين',
                      'كلية علوم الفيزياء - جامعة النهرين',
                      'كلية علوم الرياضيات - جامعة النهرين',
                      'كلية علوم الحاسبات - جامعة النهرين ',
                      'كلية الحقوق - جامعة النهرين',
                      ]},
            {'university' : 'الجامعة التكنلوجية' , 'colleges' : [
                      'كلية هندسة المعلومات - الجامعة التكنلوجية',
                      'كلية هندسة البرامجيات - الجامعة التكنلوجية',
                      'كلية هندسة الشبكات - الجامعة التكنلوجية',
                      'كلية هندسة الكهرباء - الجامعة التكنلوجية',
                      'كلية هندسة الالكترونيك - الجامعة التكنلوجية',
                      'كلية هندسة الميكانيك - الجامعة التكنلوجية',
                      'كلية هندسة السيارات - الجامعة التكنلوجية',
                      'كلية هندسة الطائرات - الجامعة التكنلوجية',
                      'كلية هندسة الليزر - الجامعة التكنلوجية',
                      'كلية هندسة البصريات - الجامعة التكنلوجية',
                      'كلية هندسة الاتصالات - الجامعة التكنلوجية',
                      'كلية هندسة المعماري - الجامعة التكنلوجية',
                      'كلية علوم الحاسبات - الجامعة التكنلوجية',
                      ]},
            {'university' :
                      'كلية المنصور الجامعة' , 'colleges' : [
                      'ادارة اعمال - كلية المنصور الجامعة',
                      'القانون - كلية المنصور الجامعة',
                      'هندسة اتصالات - كلية المنصور الجامعة',
                      'هندسة مدني - كلية المنصور الجامعة',
                      'هندسة تقنيات - كلية المنصور الجامعة',
                      'هندسة برامجيات - كلية المنصور الجامعة',
                      'علوم الحاسبات - كلية المنصور الجامعة',
                      'علوم محاسبية ومصرفية - كلية المنصور الجامعة',
                      ]},
            {'university' : 'كلية دجلة الجامعة' , 'colleges' : [
                      'هندسة تقنيات التبريد - كلية دجلة الجامعة',
                      'هندسة بناء - كلية دجلة الجامعة',
                      'علوم حاسبات - كلية دجلة الجامعة',
                      'القانون - كلية دجلة الجامعة',
                      'تقنيات البصريات - كلية دجلة الجامعة',
                      'العلوم المالية و المصرفية - كلية دجلة الجامعة',
                      'الاعلام - كلية دجلة الجامعة',
                      'ادارة اعمال - كلية دجلة الجامعة',
                      'طب الاسنان - كلية دجلة الجامعة',
                      'تحليلات مرضية - كلية دجلة الجامعة',
                      ]},
            {'university' : 'كلية الرافدين الجامعة' , 'colleges' : [
                      'كلية طب الاسنان - كلية الرافدين الجامعة',
                      'كلية الصيدلة - كلية الرافدين الجامعة',
                      'هندسة اتصالات - كلية الرافدين الجامعة',
                      'هندسة مدني - كلية الرافدين الجامعة',
                      'هندسة تقنيات الحاسبات - كلية الرافدين الجامعة',
                      'هندسة الحاسبات - كلية الرافدين الجامعة',
                      'علوم الحاسبات - كلية الرافدين الجامعة',
                      'كلية إدارة اعمال - كلية الرافدين الجامعة',
                      'كلية المحاسبة - كلية الرافدين الجامعة',
                      'كلية القانون - كلية الرافدين الجامعة',

                      ]},
            {'university' : 'كلية الرشيد الجامعة' , 'colleges' : [
                      'كلية طب الاسنان - كلية الرشيد الجامعة',
                      'كلية الصيدلة - كلية الرشيد الجامعة',
                      'هندسة تقنيات الحاسبات - كلية الرشيد الجامعة',
                      'علوم الحياة - كلية الرشيد الجامعة',
                      'كلية القانون - كلية الرشيد الجامعة',

            ]},
            {'university' : 'كلية المأمون الجامعة' , 'colleges' : [
                      'هندسة اتصالات - كلية المأمون الجامعة',
                      'هندسة تقنيات الحاسبات - كلية المأمون الجامعة',
                      'علوم الحاسبات - كلية المأمون الجامعة',
                      'إدارة اعمال - كلية المأمون الجامعة',
                      'كلية القانون - كلية المأمون الجامعة',

                      ]},
            {'university' : 'كلية الاسراء الجامعة' , 'colleges' : [
                      'كلية طب الاسنان - كلية الاسراء الجامعة',
                      'كلية الصيدلة - كلية الاسراء الجامعة',
                      'هندسة مدني - كلية الاسراء الجامعة',
                      'هندسة تقنيات الحاسبات - كلية الاسراء الجامعة',
                      'هندسة المعماري - كلية الاسراء الجامعة',
                      'إدارة اعمال - كلية الاسراء الجامعة',
                      'المحاسبة - كلية الاسراء الجامعة',
                      'القانون - كلية الاسراء الجامعة',
]},
            {'university' : 'كلية الفراهيدي الجامعة' , 'colleges' : [
                    'كلية الاعلام - كلية الفراهيدي الجامعة',
                    'كلية الاداب - كلية الفراهيدي الجامعة',
                    'هندسة اتصالات - كلية الفراهيدي الجامعة',
                    'هندسة مدني - كلية الفراهيدي الجامعة',
                    'هندسة تقنيات الطيران - كلية الفراهيدي الجامعة',
                    'هندسة المعماري - كلية الفراهيدي الجامعة',
                    'هندسة تقنيات طبية - كلية الفراهيدي الجامعة',
                    'كلية المحاسبة - كلية الفراهيدي الجامعة',
                    'كلية التحليلات المرضية - كلية الفراهيدي الجامعة',

            ]},
            {'university' : 'كلية الفارابي الجامعة' , 'colleges' : [
              'كلية الاعلام - كلية الفارابي الجامعة',
               'هندسة النفط - كلية الفارابي الجامعة',
               'هندسة مدني - كلية الفارابي الجامعة',
               'هندسة المعماري - كلية الفارابي الجامعة',
               'هندسة الحاسبات - كلية الفارابي الجامعة',
               'علوم الحياة - كلية الفارابي الجامعة',
               'كلية المحاسبة - كلية الفارابي الجامعة',
               'كلية القانون - كلية الفارابي الجامعة',

            ]},
            {'university' : '' , 'colleges' : []},

        ]
        };

    }



      static navigationOptions = {
        header: null,
      };

      goBack(item) {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.selectCollege(item);
      }

  render() {
    const {goBack} = this.props.navigation;
    const {navigate} = this.props.navigation;

    return (

    <Container style={{backgroundColor : 'white'}}>
    <KeyboardAwareScrollView>
     <Content>
     <Header style={{alignSelf : "flex-start",backgroundColor : "transparent" ,  borderBottomColor : "transparent"}}>
     <StatusBar
        barStyle="dark-content"
        backgroundColor="black"
      />
       <Left style={{flex : 1}}>
       <Button onPress={()=>{goBack()}} transparent>
         <Entypo name='chevron-left' size={32} color={'#e67375'} />
         <Text style={{color : 'white' , fontSize :17 , fontFamily : 'cairo'}}>رجوع</Text>
       </Button>
       </Left>
       <Body style={{alignItems : 'center'}}>
       <Image style={{width : 50, height : 45}} source={require('../assets/logo.png')} />
       </Body>
       <Right/>
     </Header>
        <View style={{direction : 'rtl'}}>
        <List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[0].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[0].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo' , fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[1].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[1].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo', fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[2].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[2].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo', fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[3].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[3].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo', fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[4].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[4].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo', fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[5].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[5].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo', fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[6].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[6].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo', fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[7].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[7].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo', fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[8].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[8].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo', fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[9].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[9].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo', fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[10].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[10].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo', fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[11].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[11].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo', fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        <ListItem itemDivider>
              <Text style={{fontFamily : 'cairo' , fontSize : 18}}>{this.state.colleges[12].university}</Text>
            </ListItem>
        <List dataArray={this.state.colleges[12].colleges}
            renderRow={(item) =>
              <ListItem>
                <Text style={{fontFamily : 'cairo', fontSize : 14}} onPress={()=>{this.goBack(item)}}>{item}</Text>
              </ListItem>
            }>

        </List>
        </List>
        </View>
        </Content>
        </KeyboardAwareScrollView>
    </Container>
    );
  }
}
