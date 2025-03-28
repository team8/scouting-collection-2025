import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from "react-native";
import {ButtonGroup, Slider} from 'react-native-elements';
// import Slider from 'react-native-slider';
import { connect } from "react-redux";
import * as Types from "../store/types";
import { useNavigation } from '@react-navigation/native';


function Postmatch(props) {
    const [notes, setNotes] = useState("");
    const [coopertition, setCoopertition] = useState(false);
    const [climbNotes, setClimbNotes] = useState("");
    const [robotDied, setRobotDied] = useState(false);
    const [robotTipped, setRobotTipped] = useState(false);
    const [driverRating, setDriverRating] = useState(0.0);
    const [defenseRating, setDefenseRating] = useState(-1.0);
    const [intakeRating, setIntakeRating] = useState(-1.0);
    const [climbRating, setClimbRating] = useState(-1.0);

    const [climbStatus, setClimbStatus] = useState(0);
    const endgameText = ['N/A', 'Park', 'Shallow Cage', 'Deep Cage'];

    const matchData = JSON.parse(JSON.stringify(props.eventReducer.currentMatchData));

    const navigation = useNavigation(); 

    useEffect(() => {
        navigation.setOptions({
            title: `Postmatch | ${matchData.team}`
        })
    })

    const compile_data = () => {
        if (notes == "" || climbNotes == "") {
            alert("Please fill in all the notes.");
            return;
        }
        matchData.notes = notes.replace(/ /g, '>').replace(/,/g, '<');
        matchData.climbNotes = climbNotes.replace(/ /g, '>').replace(/,/g, '<');
        matchData.coopertition = coopertition;
        matchData.died = robotDied;
        matchData.tipped = robotTipped;

        matchData.climbStatus = (climbStatus == 0 ? "N/A" : (climbStatus == 1 ? "park" : (climbStatus == 2 ? "shallow" : (climbStatus == 3 && "deep"))));
        matchData.driverRating = driverRating;
        matchData.defenseRating = defenseRating;
        matchData.intakeRating = intakeRating;
        matchData.climbRating = climbRating;
        props.setCurrentMatchData(matchData);
        navigation.navigate("qrcode");
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 40 }}>
            <View style={postmatchStyles.Row}>
                <Text style={[postmatchStyles.Font, {fontSize: 22, flex: 0.2}]}>Notes</Text>
                <View style={[postmatchStyles.InputContainer, {flex: 0.9}]}>
                    <TextInput
                        style={postmatchStyles.TextInputContainer}
                        placeholder="Topics to Note: Ease of intaking game pieces, speed of cycles, unique aspects of robot (good or bad), where robot shot speaker notes from, etc.. Max Char: 200"
                        multiline={true}
                        maxLength = {200}
                        onChangeText={(text) => setNotes(text)}
                    />
                </View>
                <View
                    style={{
                        flex: 0.34,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: "red",
                        borderWidth: 0,
                        marginBottom: 20
                    }}>
                    <Text style={[postmatchStyles.Font, {fontSize: 16, flex: 0.3}]}>Coopertition Bonus</Text>
                    <Switch
                        style={{ flex: 0.7 }}
                        onValueChange={(value) => setCoopertition(value)}
                        value={coopertition}
                    />
                </View>
            </View>
            <View style={postmatchStyles.Row}>
                <Text style={[postmatchStyles.Font, {fontSize: 21, flex: 0.143}]}>Climb Notes</Text> 
                <View style={[postmatchStyles.InputContainer, {flex: 0.642}]}>
                    <TextInput
                        style={postmatchStyles.TextInputContainer}
                        placeholder="Topics to Note: Time at which robot began climbing, ease of assisted climb, why robot failed, etc.. Max Char: 150"
                        multiline={true}
                        maxLength = {150}
                        onChangeText={(text) => setClimbNotes(text)}
                    />
                </View>
                <View style={{flex: 0.2, marginLeft: 25, alignItems: "center", flexDirection: "column"}}>
                    <View style={{flex: 0.7, alignItems: "center", flexDirection: "row"}}>
                        <Text style={[postmatchStyles.Font, {fontSize: 15, flex: 0.3, marginRight: 1}]}>Died</Text>
                        <Text style={[postmatchStyles.Font, {fontSize: 15, flex: 0.3, marginLeft: 15}]}>Tipped</Text>
                    </View>
                    <View style={{flex: 0.7, alignItems: "center", flexDirection: "row"}}>
                        <Switch
                            style={{flex: 0.7, marginLeft: 25, marginRight: 5}}
                            onValueChange={(value) => setRobotDied(value)}
                            value={robotDied}
                        />
                        <Switch
                            style={{flex: 0.7}}
                            onValueChange={(value) => setRobotTipped(value)}
                            value={robotTipped}
                        />
                    </View>
                </View>
                
            </View>
            <View>
                <ButtonGroup
                    onPress={setClimbStatus}
                    selectedIndex={climbStatus}
                    buttons={endgameText}
                    buttonStyle={postmatchStyles.ButtonGroup}
                    containerStyle={{height: 50}}
                    selectedButtonStyle={{ backgroundColor: '#24a2b6', borderBottomColor: '#188191' }}
                />
            </View>
            <View style={postmatchStyles.Row}>
                <Text style={[postmatchStyles.LabelText, postmatchStyles.Font, {fontSize: 22, marginTop: 10, flex: 0.1, textAlign: "center"}]}>Driving</Text>
                <View style={{flex: 0.4, alignItems: 'stretch'}}>
                    <Slider
                        thumbTintColor='#24a2b6'
                        value={driverRating}
                        minimumValue={0}
                        maximumValue={5}
                        step={1}
                        onValueChange={(dr) => setDriverRating(dr)} 
                    />
                    <Text>{driverRating.toString()}</Text>
                </View>
                <Text style={[postmatchStyles.LabelText, postmatchStyles.Font, {fontSize: 22, marginTop: 10, flex: 0.1, marginLeft: 5, textAlign: "center"}]}>Defense</Text>
                <View style={{flex: 0.4, alignItems: 'stretch'}}>
                    <Slider
                        thumbTintColor='#24a2b6'
                        value={defenseRating}
                        minimumValue={-1}
                        maximumValue={5}
                        step={1}
                        onValueChange={(d) => setDefenseRating(d)} 
                    />
                    <Text>{defenseRating == -1 ? 'N/a' : defenseRating.toString()}</Text>
                </View>
            </View>
            <View style={postmatchStyles.Row}>
                <Text style={[postmatchStyles.LabelText, postmatchStyles.Font, {fontSize: 22, marginTop: 10, flex: 0.1, textAlign: "center"}]}>Intake</Text>
                <View style={{flex: 0.4, alignItems: 'stretch'}}>
                    <Slider
                        thumbTintColor='#24a2b6'
                        value={intakeRating}
                        minimumValue={-1}
                        maximumValue={5}
                        step={1}
                        onValueChange={(i) => setIntakeRating(i)} />
                    <Text>{intakeRating == -1 ? 'N/a' : intakeRating.toString()}</Text>
                </View>
                <Text style={[postmatchStyles.LabelText, postmatchStyles.Font, {fontSize: 22, marginTop: 10, flex: 0.1, marginLeft: 5, textAlign: "center"}]} textAlign = "center">Climb</Text>
                <View style={{flex: 0.4, alignItems: 'stretch'}}>
                    <Slider
                        thumbTintColor='#24a2b6'
                        value={climbRating}
                        minimumValue={-1}
                        maximumValue={5}
                        step={1}
                        onValueChange={(c) => setClimbRating(c)} />
                    <Text>{climbRating == -1 ? 'N/a' : climbRating.toString()}</Text>
                </View>
            </View>
            <View style={[postmatchStyles.Row, {height: 100 }]}>
                <TouchableOpacity style={[postmatchStyles.NextButton, {marginHorizontal: 60, marginBottom:25}]} onPress={() => compile_data()}>
                    <View style={postmatchStyles.Center}>
                        <Text style={[postmatchStyles.Font, postmatchStyles.ButtonFont]}>Continue to QRCode</Text>
                    </View> 
                </TouchableOpacity>
            </View>
        </View>
    )
}

const postmatchStyles = StyleSheet.create({
    Row: {
        flexDirection: 'row',
        marginTop: 15,
        padding: 10
    },
    Font: {
        fontFamily: 'Helvetica-Light',
        fontSize: 25,
    },
    InputContainer: {
        height: 130,
        paddingLeft: 20,
        borderWidth: 2,
        borderColor: '#d4d4d4',
    },
    LabelText: {
        marginLeft: 5
    },
    NextButton: {
        flex: 1,
        backgroundColor: '#2E8B57',
        borderRadius: 7,
        borderBottomWidth: 5,
        borderColor: '#006400'
    },
    Center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonFont: {
        color: 'white',
        fontSize: 25
    },
    ButtonGroup: {
    }
})

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
export default connectComponent(Postmatch);