import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { connect } from 'react-redux';
import * as Types from '../store/types';
import Blink from '../components/blink';
import { useNavigation } from '@react-navigation/native';
import outtakeImages from '../outtake-images';
import CoralModal from "../components/coralModal";
import AlgaeAutoModal from "../components/algaeAutoModal";


function Auto(props) {
  const [coral1, setCoral1] = useState(0);
  const [coral2, setCoral2] = useState(0);
  const [coral3, setCoral3] = useState(0);
  const [coral4, setCoral4] = useState(0);

  const [coralLevel, setCoralLevel] = useState(0);

  const [algaeProcessor, setAlgaeProcessor] = useState(0);
  const [algaeRobotNet, setAlgaeRobotNet] = useState(0);
  const [failedAlgaeRobotNet, setFailedAlgaeRobotNet] = useState(0);
  const [algaeRemovedHigh, setAlgaeRemovedHigh] = useState(0);
  const [algaeRemovedLow, setAlgaeRemovedLow] = useState(0);

  const [mobility, setMobility] = useState(false);

  const [coralModalVisible, setCoralModalVisible] = useState(false);
  const [algaeAutoModalVisible, setAlgaeAutoModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const [autoActions, setAutoActions] = useState([]);

  const alliance = props.eventReducer.alliance;
  const ampColor = (alliance === 'red') ? '#DA4A19' : '#34BFA1';
  const ampBorderColor = (alliance === 'red') ? '#C03D25' : '#289E85';

  const fieldOrientation = props.eventReducer.fieldOrientation;

  const matchData = JSON.parse(JSON.stringify(props.eventReducer.currentMatchData));

  const navigation = useNavigation();



  useEffect(() => {
    navigation.setOptions({
      title: `Auto | ${matchData.team}`
    })
  }, [])

  const navigate = () => {
    matchData.autoCoral1 = coral1;
    matchData.autoCoral2 = coral2;
    matchData.autoCoral3 = coral3;
    matchData.autoCoral4 = coral4;
    matchData.autoAlgaeProcessor = algaeProcessor;
    matchData.autoAlgaeRobotNet = algaeRobotNet;
    matchData.autoFailedAlgaeRobotNet = failedAlgaeRobotNet;
    matchData.autoAlgaeRemovedHigh = algaeRemovedHigh;
    matchData.autoAlgaeRemovedLow = algaeRemovedLow;
    matchData.autoActions = autoActions;
    matchData.mobility = mobility;
    props.setCurrentMatchData(matchData);
    navigation.navigate('teleop');
  }

  const undo = () => {
    if(autoActions.length == 0) return;

    switch (autoActions[autoActions.length - 1]) {
      case 'algaeProcessor': setAlgaeProcessor(algaeProcessor-1); break;
      case 'algaeRobotNet': setAlgaeRobotNet(algaeRobotNet-1); break;
      case 'failedAlgaeRobotNet': setFailedAlgaeRobotNet(failedAlgaeRobotNet-1); break;
      case 'coral1': setCoral1(coral1-1); break;
      case 'coral2': setCoral2(coral2-1); break;
      case 'coral3': setCoral3(coral3-1); break;
      case 'coral4': setCoral4(coral4-1); break;
      case 'algaeRemovedHigh': setAlgaeRemovedHigh(algaeRemovedHigh-1); break;
      case 'algaeRemovedLow': setAlgaeRemovedLow(algaeRemovedLow-1); break;
      default: if (autoActions.length != 0) console.log('Wrong autoAction has been undone');
    }

    let temp = autoActions;
    temp.splice(autoActions.length-1, 1)
    setAutoActions(temp);
  }

  const addAction = (action) => {
    let temp = autoActions;
    temp.push(action);

    switch(action) {
      case 'algaeProcessor': setAlgaeProcessor(algaeProcessor+1); break;
      case 'algaeRobotNet': setAlgaeRobotNet(algaeRobotNet+1); break;
      case 'failedAlgaeRobotNet': setFailedAlgaeRobotNet(failedAlgaeRobotNet+1); break;
      case 'coral1': setCoral1(coral1+1); break;
      case 'coral2': setCoral2(coral2+1); break;
      case 'coral3': setCoral3(coral3+1); break;
      case 'coral4': setCoral4(coral4+1); break;
      case 'algaeRemovedHigh': setAlgaeRemovedHigh(algaeRemovedHigh+1); break;
      case 'algaeRemovedLow': setAlgaeRemovedLow(algaeRemovedLow+1); break;
      default: console.log('Invalid action added in auto');
    }

    setAutoActions(temp);
  }

  return (
    <View style={autoStyles.mainContainer}>

      <CoralModal
          coralModalVisible={coralModalVisible}
          setCoralModalVisible={setCoralModalVisible}
          matchPhase='auto'
          modalType={modalType}
          fieldOrientation={fieldOrientation}
          autoActions={autoActions}
          addAction={addAction}
          coralLevel={coralLevel}
      />

      <AlgaeAutoModal
          algaeAutoModalVisible={algaeAutoModalVisible}
          setAlgaeAutoModalVisible={setAlgaeAutoModalVisible}
          matchPhase='auto'
          modalType={modalType}
          fieldOrientation={fieldOrientation}
          autoActions={autoActions}
          addAction={addAction}
      />

      <ImageBackground
        style={{ flex: 0.7, justifyContent: 'center', alignSelf: fieldOrientation == 1 ? "flex-start" : "flex-end" }}
        source={outtakeImages[fieldOrientation][alliance]}
      >

        <View style={{ width: "100%", alignSelf: "center" }}>
          {[...Array(10).keys()].map((y) => {
            return (
                <View style={{ flexDirection: 'row', width: "100%", height: "10%" }} key={`row-${y}`}>
                  {[...Array(10).keys()].map((x) => {
                    return (
                        <TouchableOpacity
                            key={`cell-${x}-${y}`}
                            style={{ borderColor: "black", borderWidth: 0, width: "10%" }}
                            onPress={() => {
                              // console.log(y);
                              if (y<3) {
                                setCoralLevel(4);
                                addAction('coral4')
                              }
                              else if (y>2 && y<5) {
                                setCoralLevel(3);
                                setCoralModalVisible(true);
                              }
                              else if (y>4 && y<7) {
                                setCoralLevel(2);
                                setCoralModalVisible(true);
                              }
                              else {
                                setCoralLevel(1);
                                addAction('coral1');
                              }
                              // console.log(coralLevel);

                            }}
                        >
                          <Text></Text>
                          {/* ^ Do not remove the empty text - we need to trick the button into thinking it has a child for it to work properly */}
                        </TouchableOpacity>
                    );
                  })}
                </View>
            );
          })}
        </View>

      </ImageBackground>

      {/* empty column */}
      <View style={{ flex: 0.3 }}>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' , marginTop: 10}}>
            <Text style={[autoStyles.Font, { fontSize: 18, flex: 0.3, marginBottom: '2%' }]}>Mobility Bonus</Text>
            <Switch
              style={{ flex: 0.7 }}
              onValueChange={(value) => setMobility(value)}
              value={mobility}
            />
          </View>

          <View style={{ flex: 1, margin: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: '#753da1' }}>Coral Level 1: {coral1}</Text>
            <Text style={{ fontSize: 20, color: '#753da1' }}>Coral Level 2: {coral2}</Text>
            <Text style={{ fontSize: 20, color: '#753da1' }}>Coral Level 3: {coral3}</Text>
            <Text style={{ fontSize: 20, color: '#753da1' }}>Coral Level 4: {coral4}{"\n"}</Text>
            <Text style={{ fontSize: 20, color: '#2d3696' }}>High Algae Removed: {algaeRemovedHigh}</Text>
            <Text style={{ fontSize: 20, color: '#2d3696' }}>Low Algae Removed: {algaeRemovedLow}{"\n"}</Text>
            <Text style={{ fontSize: 20, color: '#178044' }}>Algae Processor: {algaeProcessor}</Text>
            <Text style={{ fontSize: 20, color: '#178044' }}>Successful Algae Net: {algaeRobotNet}</Text>
            <Text style={{ fontSize: 20, color: '#f54747', fontWeight: 'bold' }}>Failed Algae Net: {failedAlgaeRobotNet}</Text>
          </View>


        </View>

        <View
          style={{
            flex: 0.8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 10,

          }}
        >
          
          <TouchableOpacity style={[autoStyles.AmpButton, { width: 300, marginBottom: 10, backgroundColor: ampColor, borderBottomColor: ampBorderColor }]} onPress={() => {
            setModalType('Amp');
            setAlgaeAutoModalVisible(!algaeAutoModalVisible);
          }}>
            <Text style={[autoStyles.PrematchFont, autoStyles.PrematchButtonFont]}>Algae</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[autoStyles.UndoButton, { width: 300, marginBottom: 10 }]} onPress={() => undo()}>
            <Text style={[autoStyles.PrematchFont, autoStyles.PrematchButtonFont]}>Undo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[autoStyles.NextButton, { width: 300 }]} onPress={() => navigate()}>
            <Blink text='Continue to Teleop' />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}


const autoStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  square: {
    width: '33%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'black',
    flex: 1,
    justifyContent: 'center'
  },
  gamePieceIcon: {
    height: '60%',
    width: '60%',
    alignSelf: 'center'
  },
  NextButton: {
    flex: 1,
    backgroundColor: '#2E8B57',
    borderRadius: 7,
    borderBottomWidth: 5,
    borderColor: '#006400',
    alignItems: 'center',
    justifyContent: 'center',
  },
  UndoButton: {
    flex: 1,
    backgroundColor: '#ffae19',
    borderRadius: 7,
    borderBottomWidth: 5,
    borderColor: '#c98302',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SpeakerButton: {
    flex: 1,
    borderRadius: 7,
    borderBottomWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AmpButton: {
    flex: 1,
    borderRadius: 7,
    borderBottomWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PrematchFont: {
    fontFamily: 'Helvetica-Light',
    fontSize: 20
  },
  PrematchButtonFont: {
    color: 'white',
    fontSize: 25
  },
});

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  setCurrentMatchData: (newMatchData) =>
    dispatch({
      type: Types.SET_CURRENT_MATCH_DATA,
      payload: {
        newMatchData,
      },
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Auto);
