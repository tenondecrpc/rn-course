import React from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

export default class App extends React.Component {
  state = {
    placeName: '',
    places: [],
    selectedPlace: null
  };

  placeNameChangedHandler = (val) => {
    this.setState({
      placeName: val
    });
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(), 
          name: prevState.placeName,
          image: {
            uri: "https://avatars0.githubusercontent.com/u/28825133?s=400&u=f1f574ae604a8194a9f40d1291736a3a011bba64&v=4"
          }
        })
      };
    });
  }

  // placeAddHandler = () => {
  //   this.setState(prevState => {
  //     return {
  //       places: prevState.places.concat({
  //         key: Math.random(), 
  //         value: prevState.placeName, 
  //         image: {
  //           uri: "https://avatars0.githubusercontent.com/u/28825133?s=400&u=f1f574ae604a8194a9f40d1291736a3a011bba64&v=4"
  //         }
  //       })
  //     }
  //   });
  // }

  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      }
    })
  }

  modalClosedHandler = () => {
    this.setState({
      selectedPlace: null
    });
  }

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <PlaceDetail 
          selectedPlace={this.state.selectedPlace} 
          onItemDeleted={this.placeDeletedHandler} 
          onModalClosed={this.modalClosedHandler}
        />

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Ingrese un texto"
            value={this.state.placeName} 
            onChangeText={this.placeNameChangedHandler}
            style={styles.placeInput}
          />
          <Button 
            title="Add"
            style={styles.placeButton}
            onPress={this.placeSubmitHandler}
          />
        </View>

        {/* <PlaceInput onPlaceAdd={this.placeAddHandler}/> */}
        
        <PlaceList 
          places={this.state.places} 
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    //flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  },
});
