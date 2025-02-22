import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import * as Types from '../store/types';
import { useNavigation } from '@react-navigation/native';
import outtakeImages from '../outtake-images';
import IntakeLocationModal from '../components/intakeLocationModal';
import CoralModal from "../components/coralModal";
import AlgaeTeleopModal from "../components/algaeTeleopModal";

function Teleop(props) {
  const matchData = JSON.parse(JSON.stringify(props.eventReducer.currentMatchData));

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
  const [algaeHumanNet, setAlgaeHumanNet] = useState(0);
  const [failedAlgaeHumanNet, setFailedAlgaeHumanNet] = useState(0);

  const [coralModalVisible, setCoralModalVisible] = useState(false);
  const [intakeModalVisible, setIntakeModalVisible] = useState(false);
  const [algaeTeleopModalVisible, setAlgaeTeleopModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const [teleopActions, setTeleopActions] = useState([]);

  const [groundIntakes, setGroundIntakes] = useState(0);
  const [substationIntakes, setSubstationIntakes] = useState(0);;

  const alliance = props.eventReducer.alliance;
  const allianceBorderColor = (alliance === 'red') ? '#d10000' : '#0000d1';
  const ampColor = (alliance === 'red') ? '#DA4A19' : '#34BFA1';
  const ampBorderColor = (alliance === 'red') ? '#C03D25' : '#289E85';

  const fieldOrientation = props.eventReducer.fieldOrientation;

  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      title: `Teleop | ${matchData.team}`
    })
  }, [])



  const navigate = () => {
    matchData.teleopCoral1 = coral1;
    matchData.teleopCoral2 = coral2;
    matchData.teleopCoral3 = coral3;
    matchData.teleopCoral4 = coral4;
    matchData.teleopAlgaeProcessor = algaeProcessor;
    matchData.teleopAlgaeHumanNet = algaeHumanNet;
    matchData.teleopAlgaeRobotNet = algaeRobotNet;
    matchData.failedTeleopAlgaeHumanNet = failedAlgaeHumanNet;
    matchData.failedTeleopAlgaeRobotNet = failedAlgaeRobotNet;
    matchData.teleopAlgaeRemovedHigh = algaeRemovedHigh;
    matchData.teleopAlgaeRemovedLow = algaeRemovedLow;
    matchData.groundIntakes = groundIntakes;
    matchData.substationIntakes = substationIntakes;
    matchData.teleopActions = teleopActions;
    props.setCurrentMatchData(matchData);

    navigation.navigate('postmatch');
  }

  const undo = () => {
    if(teleopActions.length == 0) return;

    switch (teleopActions[teleopActions.length - 1]) {
      case 'algaeProcessor': setAlgaeProcessor(algaeProcessor-1); break;
      case 'algaeRobotNet': setAlgaeRobotNet(algaeRobotNet-1); break;
      case 'failedAlgaeRobotNet': setFailedAlgaeRobotNet(failedAlgaeRobotNet-1); break;
      case 'algaeHumanNet': setAlgaeHumanNet(algaeHumanNet-1); break;
      case 'failedAlgaeHumanNet': setFailedAlgaeHumanNet(failedAlgaeHumanNet-1);break;
      case 'coral1': setCoral1(coral1-1); break;
      case 'coral2': setCoral2(coral2-1); break;
      case 'coral3': setCoral3(coral3-1); break;
      case 'coral4': setCoral4(coral4-1); break;
      case 'algaeRemovedHigh': setAlgaeRemovedHigh(algaeRemovedHigh-1); break;
      case 'algaeRemovedLow': setAlgaeRemovedLow(algaeRemovedLow-1); break;
      case 'groundIntake': setGroundIntakes(groundIntakes - 1); break;
      case 'substationIntake': setSubstationIntakes(substationIntakes - 1); break;
      default: if (teleopActions.length != 0) console.log('Wrong teleopAction has been undone');
    }
    
    let temp = teleopActions;
    temp.splice(teleopActions.length-1, 1)
    setTeleopActions(temp);
  }

  const addAction = (action) => {
    let temp = teleopActions;
    temp.push(action);

    switch (action) {
      case 'algaeProcessor': setAlgaeProcessor(algaeProcessor+1); break;
      case 'algaeRobotNet': setAlgaeRobotNet(algaeRobotNet+1); break;
      case 'failedAlgaeRobotNet': setFailedAlgaeRobotNet(failedAlgaeRobotNet+1); break;
      case 'algaeHumanNet': setAlgaeHumanNet(algaeHumanNet+1); break;
      case 'failedAlgaeHumanNet': setFailedAlgaeHumanNet(failedAlgaeHumanNet+1);break;
      case 'coral1': setCoral1(coral1+1); break;
      case 'coral2': setCoral2(coral2+1); break;
      case 'coral3': setCoral3(coral3+1); break;
      case 'coral4': setCoral4(coral4+1); break;
      case 'algaeRemovedHigh': setAlgaeRemovedHigh(algaeRemovedHigh+1); break;
      case 'algaeRemovedLow': setAlgaeRemovedLow(algaeRemovedLow+1); break;
      case 'groundIntake': setGroundIntakes(groundIntakes+1); break;
      case 'substationIntake': setSubstationIntakes(substationIntakes+1); break;
      default: console.log('Invalid action added in teleop');
    }

    setTeleopActions(temp);
  }

  return (
    <View style={teleopStyles.mainContainer}>

      <IntakeLocationModal
        intakeModalVisible={intakeModalVisible}
        setIntakeModalVisible={setIntakeModalVisible}
        addAction={addAction}
      />

      <CoralModal
          coralModalVisible={coralModalVisible}
          setCoralModalVisible={setCoralModalVisible}
          matchPhase='teleop'
          modalType={modalType}
          fieldOrientation={fieldOrientation}
          autoActions={teleopActions}
          addAction={addAction}
          coralLevel={coralLevel}
      />

      <AlgaeTeleopModal
          algaeAutoModalVisible={algaeTeleopModalVisible}
          setAlgaeAutoModalVisible={setAlgaeTeleopModalVisible}
          matchPhase='teleop'
          modalType={modalType}
          fieldOrientation={fieldOrientation}
          autoActions={teleopActions}
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


      <View style={{ flex: 0.3 }}
        intakeModalVisible={intakeModalVisible}
        setIntakeModalVisible={setIntakeModalVisible}
      >


        {/* empty column */}
        <View style={{ flex: 1 }}>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >

            <View style={{ flex: 1, alignItems: 'center', marginTop: 10}}>
              <Text style={{ fontSize: 20, color: '#753da1' }}>Coral Level 1: {coral1}</Text>
              <Text style={{ fontSize: 20, color: '#753da1' }}>Coral Level 2: {coral2}</Text>
              <Text style={{ fontSize: 20, color: '#753da1' }}>Coral Level 3: {coral3}</Text>
              <Text style={{ fontSize: 20, color: '#753da1' }}>Coral Level 4: {coral4}{"\n"}</Text>
              <Text style={{ fontSize: 20, color: '#2d3696' }}>High Algae Removed: {algaeRemovedHigh}</Text>
              <Text style={{ fontSize: 20, color: '#2d3696' }}>Low Algae Removed: {algaeRemovedLow}{"\n"}</Text>
              <Text style={{ fontSize: 20, color: '#178044' }}>Algae Processor: {algaeProcessor}</Text>
              <Text style={{ fontSize: 20, color: '#178044' }}>Robot Algae Net: {algaeRobotNet}</Text>
              <Text style={{ fontSize: 20, color: '#178044' }}>Human Algae Net: {algaeHumanNet}</Text>
              <Text style={{ fontSize: 20, color: '#f54747', fontWeight: 'bold' }}>Failed Robot Algae Net: {failedAlgaeRobotNet}</Text>
              <Text style={{ fontSize: 20, color: '#f54747', fontWeight: 'bold' }}>Failed Human Algae Net: {failedAlgaeHumanNet}{"\n"}</Text>
              <Text style={{ fontSize: 20 }}>Ground Intakes: {groundIntakes}</Text>
              <Text style={{ fontSize: 20, paddingBottom: 20}}>Substation Intakes: {substationIntakes}</Text>
            </View>

          </View>

          <View
            style={{
              flex: 0.8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 10,
              paddingHorizontal: 19
            }}
          >
            <TouchableOpacity style={[teleopStyles.IntakeButton, { width: 300, marginBottom: 10, backgroundColor: alliance, borderColor: allianceBorderColor }]} onPress={() => { setIntakeModalVisible(true) }}>
              <Text style={[teleopStyles.PrematchFont, teleopStyles.PrematchButtonFont]}>Intake</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[ teleopStyles.AmpButton, { flex: 1, width: 300, marginBottom: 10, backgroundColor: ampColor, borderBottomColor: ampBorderColor }]} onPress={() => {
            setAlgaeTeleopModalVisible(!algaeTeleopModalVisible)
            }}>
            <Text style={[teleopStyles.PrematchFont, teleopStyles.PrematchButtonFont, {textAlign: "center"}]}>{"Algae"}</Text>
            </TouchableOpacity>
            <View style={{flex: 1.1, flexDirection: "row"}}>
              <TouchableOpacity style={[teleopStyles.UndoButton, { width: 300, marginBottom: 10, marginRight:5, marginLeft: 10 }]} onPress={() => undo()}>
                <Text style={[teleopStyles.PrematchFont, teleopStyles.PrematchButtonFont]}>Undo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[teleopStyles.NextButton, { width: 300, marginRight: 10, marginBottom: 10, marginLeft: 5, justifyContent: 'center', alignItems: 'center' }]} onPress={() => navigate()}>
                <Text style={[teleopStyles.PrematchFont, teleopStyles.PrematchButtonFont, {textAlign: 'center'}]}>Continue to Postmatch</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>



      </View>
    </View>
  );
}


  const teleopStyles = StyleSheet.create({
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
      marginHorizontal: 10
  },
    IntakeButton: {
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
      fontSize: 20
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
export default connectComponent(Teleop);