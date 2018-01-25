import React from 'react';
import { Text,View , Image , Dimensions , StatusBar , Alert , AsyncStorage , FlatList , RefreshControl} from 'react-native';
import {  Container, Header, Left, Body, Right, Button, Icon, Title ,Form, Item, Input, Label , Card, CardItem , Spinner , ActionSheet} from 'native-base'
import { Ionicons , FontAwesome , MaterialCommunityIcons , Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigator } from 'react-navigation';
import { Comments } from './comments.js'

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

export class GeneralPosts extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'مصارحات عامة',
    tabBarIcon : ({tintColor})=> ( <MaterialCommunityIcons style={{fontSize : 20 , marginTop : 5  , color : tintColor }} name='earth' /> ),


  };
  render() {
    return(
      <CollegePostsNav />
    )
  }
}

class Posts extends React.Component {
  static navigationOptions = {
    header: null,
  };


    constructor(props) {

      super(props)


        this.state = {
        posts : [],
         refreshing: false,
         display : 'none',
         spinnerDisplay : 'inline',
         spinnerColor : 'gray',
         loadingDisplay : true ,
         pullToRefreshDisplay : false,

        };
    }



       async componentWillMount() {
        var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))

        fetch('https://sarihapp.herokuapp.com/api/generalposts', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token' : `${userDetails.token}`,
              'email' : `${userDetails.email}`
            }

          })
          .then((res) => {
              setTimeout(()=>{this.setState({loadingDisplay : false  , pullToRefreshDisplay : true})},3000)
              var response = JSON.parse(res._bodyText)
             this.setState({posts : response , display : 'inline' , spinnerDisplay : 'none' , spinnerColor : 'transparent'})
          })
      }


      async update() {
           this.setState({refreshing: true});
        var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))

        fetch('https://sarihapp.herokuapp.com/api/generalposts', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token' : `${userDetails.token}`,
              'email' : `${userDetails.email}`
            }

          })
          .then((res) => {
            analytics.hit(new PageHit(`posts&email=${userDetails.email}`));
              var response = JSON.parse(res._bodyText)
             this.setState({posts : response , refreshing: false})
          })
      }

    async likes(id) {
        var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
        var posts = this.state.posts
          for (var i = 0; i < posts.length; i++) {
            if (posts[i].id === id ) {
                if (posts[i].color === "gray") {
                  this.state.posts[i].color = "#e67375"
                  this.state.posts[i].likes += 1
                  fetch('https://sarihapp.herokuapp.com/api/addlike', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        token: userDetails.token,
                        id: id,
                        email : userDetails.email
                      })

                    })
                    .then((res) => {
                      var response = JSON.parse(res._bodyText)
                    })
                } else {
                  this.state.posts[i].color = "gray"
                  this.state.posts[i].likes -= 1
                  fetch('https://sarihapp.herokuapp.com/api/removelike', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        token: userDetails.token,
                        id: id,
                        email : userDetails.email
                      })

                    })
                    .then((res) => {
                    var response = JSON.parse(res._bodyText)
                    })
                }
            }
          }
            this.setState({posts : this.state.posts})

      }

      async ActionSheetButtons(id , buttonIndex) {
        if (buttonIndex == 0) {
          var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))

          fetch('https://sarihapp.herokuapp.com/api/addReport', {
              method: 'Post',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : `${userDetails.token}`,
                'email' : `${userDetails.email}`
              },
              body: JSON.stringify({
                token: userDetails.token,
                id: id,
                email : userDetails.email
              })


            })
            .then((res) => {
                var response = JSON.parse(res._bodyText)
                Alert.alert('تم',response.message)
            })

        } else {

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

        {renderIf(this.state.posts.length <= 5 && !this.state.loadingDisplay,
          <View>
          <Text style={{alignSelf:'center' , marginTop : 5 , fontFamily : 'cairo' , fontSize : 12 , color : 'gray' , textAlign : 'center'  , paddingLeft : 2 , paddingRight : 2}}>اذا جانت المصارحات مموجودة او قليلة فالسبب لان تطبيقنا جديد , دوس على اضافة مصارحة و اكتب التريد تحجيه تجاه اي شخص , كل معلوماتك راح تبقى سرية .</Text>
          </View>
        )}
          {renderIf(this.state.loadingDisplay ,
            <View style={{width : width , alignItems : 'center' , marginBottom : -40 , paddingBottom : 30 }}>
            <Spinner color="gray" />
            </View>
          )}
          <FlatList ListHeaderComponent={
            renderIf (this.state.pullToRefreshDisplay ,
              <View>
              <Text style={{alignSelf:'center' , marginTop : 5 , fontFamily : 'cairo' , fontSize : 12 , color : 'gray'}}>اسحب للتحديث</Text>
              <Entypo name='align-bottom' style={{ alignSelf:'center', fontFamily : 'cairo' , fontSize : 20 , color : 'gray'}} />
              </View>
             )
          }  keyExtractor={(item) => item.id} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.update.bind(this)}
          />
        } style={{flexDirection : 'column'}} data = {this.state.posts} extraData = {this.state.posts} renderItem={({item})=>{  return(
            <Card>
            <CardItem>
              <Left>
                  <Text style={{fontFamily : 'cairo' , color :'gray' , fontSize:13}}>{item.date}</Text>
              </Left>
              <Right>
                <View style={{flexDirection : 'row' , justifyContent : 'center'}}>
                    <View>

                       <Text style={{fontFamily : 'cairo' , color :'gray'}}>بواسطة : <FontAwesome style={{fontSize : 20 , color : '#e67375' , display :'inline'}} name={item.sex} /> </Text>

                    </View>
                    <View style={{paddingLeft : 2 , marginTop : 5}}>
                    <Text  onPress={() => { ActionSheet.show({
                                                           options: ["ابلاغ عن محتوى مسيء" , "الغاء"],
                                                           cancelButtonIndex: 1,
                                                           destructiveButtonIndex : 1 ,
                                                           title: "خيارات"
                                                         },
                                                         (buttonIndex) => {
                                                          this.ActionSheetButtons(item.id , buttonIndex)
                                                         }
                                                      )}
                                                    }
                       >
                       <Entypo name='dots-three-vertical' style={{ alignSelf:'center', color : '#e67375' ,fontFamily : 'cairo' , fontSize : 17}} />

                       </Text>
                    </View>
                </View>
              </Right>
            </CardItem>
            <CardItem  cardBody>
              <View style={{ width : width , paddingLeft :15 , paddingRight :15 }} >
                <Text style={{fontFamily : 'cairo' , alignSelf : 'flex-end' , textAlign : 'right' , fontSize: 14}}>{item.content}</Text>
              </View>
            </CardItem>
            <View style={{ width : width , flexDirection : 'row' , marginTop :20}}>
              <View style={{ width : width/2  , borderTopColor : '#e3e3e3' , borderTopWidth :1 , borderRightColor : '#e3e3e3' , borderRightWidth :1 , alignItems : 'center'}}>
              <Button onPress={()=>{navigate('Comments' , {post : item , onGoBack : ()=>this.update() })}} transparent style={{alignSelf : 'center'}} >
              <FontAwesome style={{fontFamily : 'cairo' , color : 'rgb(116, 144, 172)' , fontSize : 18}} name="comments" />
              <Text style={{ marginLeft : 5, fontFamily : 'cairo' , color : '#7490ac' , fontSize : 18}}>{item.comments}</Text>
              </Button>
              </View>
              <View style={{ width : width/2 , borderTopColor : '#e3e3e3' , borderTopWidth :1 , alignItems : 'center'}}>
              <Button  onPress={this.likes.bind(this ,item.id)} transparent style={{alignSelf : 'center'}}>
              <Ionicons style={{fontFamily : 'cairo' , color : item.color , fontSize : 18}} name="md-heart" />
              <Text style={{ marginLeft : 5 ,fontFamily : 'cairo' , color : item.color , fontSize : 18}}>{item.likes}</Text><
              /Button>
              </View>
            </View>
          </Card>
          )}} />
    </Container>
    );
  }
}


const CollegePostsNav = StackNavigator({

  Posts : {
          screen : Posts
  },
  Comments :{
    screen : Comments
  },

  },{
  initialRouteName : "Posts",
  mode : "modal"

});
