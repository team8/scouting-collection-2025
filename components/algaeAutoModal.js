import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';

function AlgaeAutoModal(props) {
    return (
        <Modal animationInTiming={50} animationIn='fadeIn' animationOutTiming={50} animationOut='fadeOut'
               style={{ alignItems: 'center', justifyContent: 'center', height: '50%', flex: 0.6}}
               visible = {props.algaeAutoModalVisible} isVisible={props.algaeAutoModalVisible} onRequestClose={() => {
            props.setAlgaeAutoModalVisible(!props.algaeAutoModalVisible)
        }}>
            <View style={{flex: 1, width: 750, height: 300, backgroundColor: 'white', borderRadius: 15, padding: 20}}>
                <View style={[algaeAutoModalStyles.Center]}>
                    <View style={{ flex: 0.3}}>
                        <Text style={[algaeAutoModalStyles.Font, { textAlign: 'center' }]}>Select Algae Action</Text>
                    </View>
                    <View style={{borderWidth: 0, borderColor: 'red'}}>
                        <Image style={{width: 130, height: 130}} source={require('../assets/game_pieces/algae.png')} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={algaeAutoModalStyles.Substation} onPress={() => {
                            props.addAction('algaeProcessor')
                            props.setAlgaeAutoModalVisible(false)
                        }}>
                            <Text style={algaeAutoModalStyles.ButtonFont}>Algae Processor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={algaeAutoModalStyles.GroundSubstation} onPress={() => {
                            props.addAction('algaeRobotNet')
                            props.setAlgaeAutoModalVisible(false)
                        }}>
                            <Text style={algaeAutoModalStyles.ButtonFont}>Algae Net</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={algaeAutoModalStyles.FailedButton} onPress={() => {
                            props.addAction('failedAlgaeRobotNet')
                            props.setAlgaeAutoModalVisible(false)
                        }}>
                            <Text style={algaeAutoModalStyles.ButtonFont}>Failed Algae Net</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.5, width: '100%' }}>
                        <TouchableOpacity style={algaeAutoModalStyles.CancelButton} onPress={() => props.setAlgaeAutoModalVisible(false)}>
                            <Text style={algaeAutoModalStyles.ButtonFont}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        )
}

const algaeAutoModalStyles = StyleSheet.create({
    ButtonFont: {
        color: 'white',
        fontSize: 25,
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
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
        marginBottom: 10,
        width: '100%',
        height: '60%',
        marginRight: 10,
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
        marginBottom: 10,
        width: '100%',
        height: '60%',
        marginLeft: 10,
        alignContent: 'center',
        justifyContent: 'center'
    },
    FailedButton: {
        flex: 1,
        backgroundColor: '#DA4A19',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#C03D25',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        width: '100%',
        height: '60%',
        marginLeft: 10,
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
export default AlgaeAutoModal;