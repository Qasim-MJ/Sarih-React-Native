import React from 'react';
import { Text,View , Image , Dimensions , StatusBar , Alert , AsyncStorage , FlatList , RefreshControl , ScrollView , Keyboard} from 'react-native';
import {  Container, Header, Left, Body, Right, Button, Icon, Title ,Form, Content ,Item, Input, Label , Card, CardItem , Spinner , Toast , ActionSheet} from 'native-base'
import { Ionicons , FontAwesome , MaterialCommunityIcons , Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { PostsTab } from './poststab.js'
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

export class Comments extends React.Component {

    constructor(props) {
      super(props)

        this.state = {
        comments : [],
         refreshing: false,
         display : 'none',
         spinnerDisplay : 'inline',
         spinnerColor : 'gray',
         loadingDisplay : true ,
         pullToRefreshDisplay : false,
         postID : this.props.navigation.state.params.post.id,
         post : this.props.navigation.state.params.post,
         content : ""

        };
    };

isThereComments() {
  if (this.state.comments.length === 0) {
  setTimeout(()=>{
    return (
      <View style={{width : width , alignItems : 'flex-end'}}>
        <Text style={{fontFamily:'cairo' , color : 'gray' , marginRight : 10}}>لا توجد تعليقات</Text>
      </View>
    )
  },1000)
  } else {
    return(
      <View style={{width : width , alignItems : 'flex-end'}}>
        <Text style={{fontFamily:'cairo' , color : 'gray' , marginRight : 10}}>التعليقات</Text>
      </View>
    )
  }
}

async componentDidMount(){
  var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
  analytics.hit(new PageHit(`comments&email=${userDetails.email}&post=${this.state.post.content}`));
}
renderPost() {

  return (
    <Card>
    <CardItem>
      <Left>
          <Text style={{fontFamily : 'cairo' , color :'gray' , fontSize:13}}>{this.state.post.date}</Text>
      </Left>
      <Right>
          <Text style={{fontFamily : 'cairo' , color :'gray'}}> بواسطة :  <FontAwesome style={{fontSize : 20 , color : '#e67375' , display :'inline'}} name={this.state.post.sex} /> </Text>
      </Right>
    </CardItem>
    <CardItem  cardBody>
      <View style={{ width : width , paddingLeft :15 , paddingRight :15 }} >
        <Text style={{fontFamily : 'cairo' , alignSelf : 'flex-end' , textAlign : 'right' , fontSize: 14}}>{this.state.post.content}</Text>
      </View>
    </CardItem>

    <View style={{ width : width , flexDirection : 'row' , marginTop :20}}>
      <View style={{ width : width/3  , borderTopColor : '#e3e3e3' , borderTopWidth :1 , borderRightColor : '#e3e3e3' , borderRightWidth :1 , alignItems : 'center'}}>
      <Button onPress={()=>{this.props.navigation.state.params.onGoBack();this.props.navigation.goBack()}} transparent style={{alignSelf : 'center'}} >
      <Entypo name='chevron-left' size={28} color={'#e67375'} />
      <Text style={{ marginLeft : 5, fontFamily : 'cairo' , color : 'gray' , fontSize : 16}}>رجوع</Text>
      </Button>
      </View>
      <View style={{ width : width/3  , borderTopColor : '#e3e3e3' , borderTopWidth :1 , borderRightColor : '#e3e3e3' , borderRightWidth :1 , alignItems : 'center'}}>
      <Button transparent style={{alignSelf : 'center'}} >
      <FontAwesome style={{fontFamily : 'cairo' , color : 'rgb(116, 144, 172)' , fontSize : 18}} name="comments" />
      <Text style={{ marginLeft : 5, fontFamily : 'cairo' , color : '#7490ac' , fontSize : 18}}>{this.state.post.comments}</Text>
      </Button>
      </View>
      <View style={{ width : width/3 , borderTopColor : '#e3e3e3' , borderTopWidth :1 , alignItems : 'center'}}>
      <Button  onPress={this.likes.bind(this ,this.state.post.id)} transparent style={{alignSelf : 'center'}}>
      <Ionicons style={{fontFamily : 'cairo' , color : this.state.post.color , fontSize : 18}} name="md-heart" />
      <Text style={{ marginLeft : 5 ,fontFamily : 'cairo' , color : this.state.post.color , fontSize : 18}}>{this.state.post.likes}</Text><
      /Button>
      </View>

    </View>
  </Card>
  )
}

    static navigationOptions = {
      header: null,
    };

       async componentWillMount() {
        var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))

        fetch('https://sarihapp.herokuapp.com/api/comments', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token' : `${userDetails.token}`,
              'post' : `${this.state.postID}`,
              'email' : `${userDetails.email}`
            }

          })
          .then((res) => {
              this.setState({loadingDisplay : false  , pullToRefreshDisplay : true})
              var response = JSON.parse(res._bodyText)
             this.setState({comments : response , display : 'inline' , spinnerDisplay : 'none' , spinnerColor : 'transparent'})
             setTimeout(()=>{
               this.refs.list.scrollToEnd({animated: true})
             } , 500)
      })
      }

      async update() {
           this.setState({refreshing: true});
        var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))

         fetch('https://sarihapp.herokuapp.com/api/comments', {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : `${userDetails.token}`,
                'post' : `${this.state.postID}`,
                'email' : `${userDetails.email}`
              }

            })
            .then((res) => {
                this.setState({loadingDisplay : false  , pullToRefreshDisplay : true})
                var response = JSON.parse(res._bodyText)
               this.setState({comments : response , display : 'inline' , spinnerDisplay : 'none' , spinnerColor : 'transparent' , refreshing : false})
        })
      }

    async likes(id) {
      var post = this.state.post
        var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
                if (post.color === "gray") {
                  this.state.post.color = "#e67375"
                  this.state.post.likes += 1
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
                  this.state.post.color = "gray"
                  this.state.post.likes -= 1
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


            this.setState({post : this.state.post})
      }

      async commentlike(id) {
        var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
        var comments = this.state.comments
          for (var i = 0; i < comments.length; i++) {
            if (comments[i].id === id ) {
                if (comments[i].color === "gray") {
                  this.state.comments[i].color = "#e67375"
                  this.state.comments[i].likes += 1
                  fetch('https://sarihapp.herokuapp.com/api/addcommentlike', {
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
                  this.state.comments[i].color = "gray"
                  this.state.comments[i].likes -= 1
                  fetch('https://sarihapp.herokuapp.com/api/removecommentlike', {
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
            this.setState({comments : this.state.comments})
        }


      async addComment() {
        Keyboard.dismiss()
        this.setState({loadingDisplay : true})
       var userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
       fetch('https://sarihapp.herokuapp.com/api/addComment', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: this.state.content,
            email : userDetails.email,
            token : userDetails.token,
            postID : this.state.postID
          })

        })
        .then((res) => {
          this.setState({loadingDisplay : false})
          var response = JSON.parse(res._bodyText)
          if (response.success) {


          this.update()
          this.state.post.comments = this.state.post.comments +=1
          this.state.content = ""

          setTimeout(()=>{
            this.refs.list.scrollToEnd({animated: true})
          } , 1500)
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
          <ScrollView ref="list" keyboardShouldPersistTaps='handled'>
            <View>
            {this.renderPost()}

            <View style={{ flexDirection : 'row'}}>
               <View style={{ width : width/5 , justifyContent : 'center' }}>
                  <Button onPress={()=>{this.addComment()}} style={{ alignSelf : 'flex-end' , backgroundColor:"#7490ac" ,height : 28 }}><Text style={{fontFamily : 'cairo' , color : "white" , fontSize : 12}}>ارسال</Text></Button>
               </View>
               <View style={{width : width*4/5}}>
                 <Input
                 style={{fontFamily : 'cairo' , backgroundColor : 'white' , textAlign : 'right', margin : 5  , fontSize : 12 , borderRadius : 5 }}
                 placeholder="اكتب تعليقا .... "
                 placeholderTextColor='gray'
                 multiline={true}
                 onChangeText={(text) => this.setState({content : text})}
                 value={this.state.content}
                  />
               </View>

            </View>
            {this.isThereComments()}
            {renderIf(this.state.loadingDisplay ,
              <View style={{width : width , alignItems : 'center' }}>
              <Spinner color="gray" />
              </View>
            )}
            </View>

            <View>
            <FlatList keyExtractor={(item) => item.id} refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.update.bind(this)}
            />
          } style={{flexDirection : 'column'}} data = {this.state.comments} extraData = {this.state.comments} renderItem={({item})=>{  return(
              <Card style={{backgroundColor : '#fafafa'}}>
              <CardItem  style={{backgroundColor : '#fafafa'}}>
                <Left>
                <View style={{ width : width/3 , alignItems : 'center'}}>
                <Button  onPress={this.commentlike.bind(this ,item.id)} transparent style={{alignSelf : 'flex-start'}}>
                <Ionicons style={{fontFamily : 'cairo' , color : item.color , fontSize : 18}} name="md-heart" />
                <Text style={{ marginLeft : 5 ,fontFamily : 'cairo' , color : item.color , fontSize : 18}}>{item.likes}</Text><
                /Button>
                </View>
                </Left>
                <Right>
                    <View style={{ width : width*2/3 , alignItems : 'flex-end'}}>
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
                    <Text style={{fontFamily : 'cairo' , color :'gray' , fontSize:13}}>{item.date}</Text>
                    </View>
                </Right>
              </CardItem>
              <CardItem  cardBody style={{backgroundColor : '#fafafa'}}>
                <View style={{ width : width , paddingLeft :15 , paddingRight :15 }} >
                  <Text style={{fontFamily : 'cairo' , alignSelf : 'flex-end' , textAlign : 'right' , fontSize: 14 , paddingBottom : 15 }}>{item.content}</Text>
                </View>
              </CardItem>

            </Card>
            )}} />
            </View>
          </ScrollView>



    </Container>
    );
  }
}
