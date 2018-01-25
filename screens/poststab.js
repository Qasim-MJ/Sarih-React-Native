import React from 'react';
import {Text, View , Image , Dimensions , StatusBar , Alert , AsyncStorage} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Form, Item, Input, Label , Content} from 'native-base'
import { Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TabNavigator } from 'react-navigation'
import { CollegePosts } from './collegeposts.js'
import { StagePosts } from './stageposts.js'
import { AddPost } from './addpost.js'
import { GeneralPosts } from './generalposts.js'
import { Constants } from 'expo';

import { Analytics, PageHit } from 'expo-analytics';
const analytics = new Analytics('UA-58539743-7');

var {height, width} = Dimensions.get('window');




export class PostsTab extends React.Component {

    constructor(props) {
      super(props)

        this.state = {

        };

    }

      static navigationOptions = {
        header: null,
      };

    async componentDidMount() {
      let isFirstTime = false
      AsyncStorage.setItem('isFirstTime', JSON.stringify(isFirstTime));
      var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
        analytics.hit(new PageHit(`posts&email=${userDetails.email}`));

      }

  render() {
    const {goBack} = this.props.navigation;
    const {navigate} = this.props.navigation;

    return (

      <Container>
      <StatusBar
         barStyle="dark-content"
         backgroundColor="gray"
       />
       <Header  style={{alignSelf : "flex-start",backgroundColor : "#f8f8f8" , borderBottomColor : "transparent" }}>
        <Left style={{flex : 1}} />


        <Body style={{ alignItems : 'center'}}>
        <Image style={{width : 50, height : 45}} source={require('../assets/logo.png')} />
        </Body>
        <Right>
        <Button onPress={()=>{navigate('Home') ; AsyncStorage.removeItem('userDetails')}} transparent>
          <Text style={{color : '#e67375', fontSize :12 , fontFamily : 'cairo'}}>تسجيل الخروج</Text>
        </Button>
        </Right>
       </Header>
       <MyTabNavigator />
       </Container>


    );
  }
}


const MyTabNavigator = TabNavigator({

  GeneralPosts: {
    screen: GeneralPosts,
  },
  CollegePosts: {
    screen: CollegePosts,

  },
  StagePosts: {
    screen: StagePosts,
  },
  AddPost: {
    screen: AddPost,
  }
}, {
  initialRouteName : 'CollegePosts' ,
  tabBarOptions: {
    labelStyle : {fontFamily : 'cairo' , fontSize : 10 },
    activeTintColor :'#e67375',
    showIcon : true ,
    tabStyle : {backgroundColor : 'white'},
    style : {backgroundColor : 'white'},
    inactiveTintColor : 'gray'

  },
});
