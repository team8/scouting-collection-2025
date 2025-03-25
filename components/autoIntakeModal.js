import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';

function AutoIntakeModal(props) {
    return (
        <Modal animationInTiming={50} animationIn='fadeIn' animationOutTiming={50} animationOut='fadeOut'
        style={{ alignItems: 'center', justifyContent: 'center', height: '50%', flex: 0.6}}
        visible = {props.intakeModalVisible} isVisible={props.intakeModalVisible} onRequestClose={() => {
            props.setIntakeModalVisible(!props.intakeModalVisible)
        }}>
            <View style={{flex: 1, width: 750, height: 300, backgroundColor: 'white', borderRadius: 15, padding: 20}}>
                <View style={[intakeModalStyles.Center]}>
                    <View style={{ flex: 0.3}}>
                        <Text style={[intakeModalStyles.Font, { textAlign: 'center' }]}>Select Intake Location</Text>
                    </View>
                    <View style={{borderWidth: 0, borderColor: 'red'}}>
                        <Image style={{width: 130, height: 130}} source={require('../assets/game_pieces/coral.png')} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={intakeModalStyles.Substation} onPress={() => {
                            props.addAction('substationIntake')
                            props.setIntakeModalVisible(false)
                        }}>
                            <Text style={intakeModalStyles.ButtonFont}>Source</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={intakeModalStyles.GroundSubstation} onPress={() => {
                            props.addAction('groundIntake')
                            props.setIntakeModalVisible(false)
                        }}>
                            <Text style={intakeModalStyles.ButtonFont}>Ground</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={intakeModalStyles.FailedIntake} onPress={() => {
                            props.addAction('failedSubstationIntake')
                            props.setIntakeModalVisible(false)
                        }}>
                            <Text style={intakeModalStyles.ButtonFont}>Failed Source</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={intakeModalStyles.FailedIntake} onPress={() => {
                            props.addAction('failedGroundIntake')
                            props.setIntakeModalVisible(false)
                        }}>
                            <Text style={intakeModalStyles.ButtonFont}>Failed Ground</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.5, width: '100%' }}>
                        <TouchableOpacity style={intakeModalStyles.CancelButton} onPress={() => props.setIntakeModalVisible(false)}>
                            <Text style={intakeModalStyles.ButtonFont}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const intakeModalStyles = StyleSheet.create({
    ButtonFont: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
    Font: {
        fontFamily: 'Helvetica-Light',
        fontSize: 30
    },
    Center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Left: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    CancelButton: {
        flex: 1,
        backgroundColor: '#f74c4c',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#d63e3e',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '100%'
    },
    Substation: {
        flex: 1,
        backgroundColor: '#e3d214',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#bdae0f',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        height: '60%',
        margin: 10,
        alignContent: 'center',
        justifyContent: 'center'
    },
    GroundSubstation: {
        flex: 1,
        backgroundColor: 'purple',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#540a4d',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        height: '60%',
        margin: 10,
        alignContent: 'center',
        justifyContent: 'center'
    },
    FailedIntake: {
        flex: 1,
        backgroundColor: 'red',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#540a4d',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        width: '100%',
        height: '60%',
        alignContent: 'center',
        justifyContent: 'center'
    },
    ScoreView: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#13616d'
    },
    gamePieceIcon: {
        height: '60%',
        width: '60%',
        alignSelf: 'center'
    }
})


export default AutoIntakeModal;