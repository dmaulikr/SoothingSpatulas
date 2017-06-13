import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Image,
  Text
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Constants from '../../Constants';
import { getUserById } from '../../Network.js';

/* ----------------------------------
                Class
---------------------------------- */
export default class TextCommentCallout extends Component {
  constructor (props) {
    super (props);
    this.state = {
      userInfo: {
        first: '',
        last: '',
        id: 0,
        email: ''
      }
    }
  }

  componentDidMount () {
    getUserById(this.props.user_id)
    .then((fetchedUserInfo) => {
      this.setState({ userInfo: fetchedUserInfo });
    })
    .catch((error) => {console.log(error)})
  }

  render () {
    const { user_id, name, comment, rating, latitude, longitude } = this.props;
    let coordinatesString = '';
    if (!name) {
      coordinatesString = 
        'Latitude: ' + 
        JSON.stringify(latitude).substring(0, 10) + 
        ', Longitude: ' + 
        JSON.stringify(longitude).substring(0, 10);
    }
    
    return (
      <View style={styles.container}>
        <Animatable.View style={styles.profilecontainer}>
          <Animatable.View style={styles.circle}>
            <Image
              style={styles.image}
              source={{uri: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/arts/2005/06/17/gilmour128.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=d921a38feae9196db19661175ea23167'}}
            />
          </Animatable.View>
          <View>
            <Text 
              numberOfLines={1} 
              style={styles.usernametext}
            >
              {this.state.userInfo.first || 'id-' + user_id}
            </Text>
          </View>
        </Animatable.View>
        <View style={styles.textcontainer}>
          <Text style={styles.comment}>{'\"' + comment + '\"'}</Text>
          <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.placetext}>{'@' + (name ? name : coordinatesString)}</Text>
          <Text style={styles.rating}>Rating: {rating}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  profilecontainer: {
    width: 70,
    paddingRight: 10,
    paddingTop: 7,
    borderColor: Constants.ICON_NOT_AVAILABLE_COLOR,
    borderRightWidth: 1,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 60,
    height: 60,
    borderRadius: 60/2,
    borderColor: Constants.COMMENT_PIN_COLOR,
    borderWidth: 3,
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 58/2,
  },
  usernamecontainer: {
    width: 70,
  },
  usernametext: {
    fontSize: 11,
    paddingTop: 5,
    alignSelf: 'center',
    fontFamily: Constants.TEXT_FONT
  },
  textcontainer: {
    width: 250,
    flexDirection: 'column',
    paddingLeft: 10,
    alignSelf: 'center',
  },
  placetext: {
    fontSize: 12,
    fontFamily: Constants.TEXT_FONT
  },
  rating: {
    fontSize: 13,
    fontFamily: Constants.TEXT_FONT
  },
  comment: {
    fontSize: 16,
    fontWeight: 'bold', 
    fontFamily: Constants.TEXT_FONT
  }
});