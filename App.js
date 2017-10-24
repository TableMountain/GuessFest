'use strict';

import React from 'react';
// import imageSearch from "react-native-google-image-search";

import ValidURL from 'valid-url';
import { Linking, StyleSheet, Text, View, Image } from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.text}> Level {level}    </Text>
        <Text style={styles.text}> {answeredCorrect} answered correct</Text>
        <Image style={styles.thumbnail} source={{ uri: this.props.image }} />
        <Text style={styles.text}>{this.props.question} </Text>
      </View>
    )
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
}

var answeredCorrect = 0;
var level = 0;

const levelOne = [
  { actually: 'http://www.burningman.org', question: "is this burning man? ", is: true, name: 'burning down the man!', image: 'https://photos.smugmug.com/Burning-Man/i-DwXrZ4v/1/483c97ab/X3/Burning-Man-Last-Day-Night%20%281003%20of%201120%29-2-X3.jpg' },
  { actually: 'https://www.boomfestival.org/boom2018/', question: "is this burning man? ", is: false, name: 'boom festival', image: 'http://hipsterwave.com/wp-content/uploads/2016/09/Do-LaB-Contructs-Largest-Struture-Ever-at-Boom-Festival.jpg' },
  { actually: 'http://summerburkes.com/2014/09/early-man-proto-dpw-setup-at-burning-man/', question: "is this burning man? ", is: true, name: 'early burning man', image: 'http://summerburkes.com/wp6/wp-content/uploads/2014/09/flickriver.com-pedal-camp-1997.jpg' },
  { actually: 'https://ultrajapan.com/', question: "is this burning man? ", is: false, name: 'Ultra Japan', image: 'https://ultrajapan.com/wp-content/uploads/2015/11/japan-og-1.jpg' },
  { actually: 'http://www.largeup.com/2015/07/10/30-years-of-photos-from-reggae-on-the-river/', question: "is this burning man? ", is: false, name: 'Reggae on the River', image: 'http://lu-cdn.okayplayer.com/wp-content/uploads/2015/06/reggae-on-the-river-panorama.jpg' },
  { actually: 'http://articles.latimes.com/2014/feb/13/entertainment/la-et-ms-insane-clown-posse-gathering-juggalos-moving-20140213', question: "is this burning man? ", is: false, name: 'Gathering of the Juggalos', image: 'http://www.trbimg.com/img-52fd373a/turbine/la-et-ms-insane-clown-posse-gathering-juggalos-001/2048/2048x1363' },
  { actually: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjcvra26YnXAhULqlQKHVRMC2MQjxwIAw&url=http%3A%2F%2Fmyonethousandthings.blogspot.com%2F2012%2F11%2F&psig=AOvVaw08yogdyv-BcC60v4TSIOFt&ust=1508953863585850', question: "is this burning man? ", is: false, name: 'Rainbow Gathering', image: 'http://3.bp.blogspot.com/-uOxl8NstBIc/ULDxeBnhBLI/AAAAAAAACCc/TCp_g_koREQ/s1600/rainbow.jpg' },
  { actually: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiV4pPQ6YnXAhVhjFQKHariCP8QjxwIAw&url=https%3A%2F%2Ffunologist.org%2F2012%2F02%2F17%2Fthe-dark-side-of-burning-man%2F&psig=AOvVaw08yogdyv-BcC60v4TSIOFt&ust=1508953863585850', question: "is this burning man? ", is: true, name: 'Burnin Man', image: 'https://paxus.files.wordpress.com/2012/02/pink-bikes.jpg' },
]
const levelTwo = [
  { actually: '', question: "You Win! ", name: '13', image: 'http://static.techspot.com/articles-info/236/windows-god-mode.jpg' },
]


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: levelOne,
      outOfCards: false
    }
  }

  handleYup(card) {
    console.log("shmeh")
    if (card.is === true) {
      answeredCorrect++
    }
  }

  handleNope(card) {
    console.log("nope")
    if (card.is === false) {
      answeredCorrect++
    }
  }
  nextLevel() {
    switch (level) {
      case 1:
        return levelOne
      case 2:
        return levelTwo
    }
  }
  cardRemoved(index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        //     console.log(`Adding ${cards2.length} more cards`)
        if (answeredCorrect <= levelOne.length) {
          // answeredCorrect = 0;
          this.setState({
            cards: this.state.cards.concat(levelOne)
          })  
        }
        else {

          level++;
          
          this.setState({
            cards: this.state.cards.concat(levelTwo)
          })
        }
      }

    }
  }


  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        hasMaybeAction={true}
        loop={false}
        yupText={'hi'}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}
        onClickHandler={(card) => Linking.openURL(card.image)
        }
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved.bind(this)}
      />
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
