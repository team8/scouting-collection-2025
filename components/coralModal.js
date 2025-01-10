import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';

function CoralModal(props) {
    return (
        <Modal animationInTiming={50} animationIn='fadeIn' animationOutTiming={50} animationOut='fadeOut'
                           style={{ alignItems: 'center', justifyContent: 'center', height: '50%', flex: 0.6}}
                           visible = {props.coralModalVisible} isVisible={props.coralModalVisible} onRequestClose={() => {
        props.setCoralModalVisible(!props.coralModalVisible)
    }}>
            <View style={{flex: 1, width: 750, height: 300, backgroundColor: 'white', borderRadius: 15, padding: 20}}>
                <View style={[coralModalStyles.Center]}>
                    <View style={{ flex: 0.3}}>
                        <Text style={[coralModalStyles.Font, { textAlign: 'center' }]}>Select Action</Text>
                    </View>
                    <View style={{borderWidth: 0, borderColor: 'red', flexDirection: 'row'}}>
                        <Image style={{width: 130, height: 130, marginRight: 100}} source={require('../assets/game_pieces/coral.png')} />

                        <Image style={{width: 130, height: 130, marginLeft: 100}} source={require('../assets/game_pieces/algae.png')} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={coralModalStyles.Substation} onPress={() => {
                            // if (props.coralLevel===3) props.addAction('coral3')
                            // else if (props.coralLevel===2) props.setCoral2(props.coral2+1)
                            props.addAction("coral"+props.coralLevel)
                            props.setCoralModalVisible(false)
                        }}>
                            <Text style={coralModalStyles.ButtonFont}>Coral Level {props.coralLevel}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={coralModalStyles.GroundSubstation} onPress={() => {
                            if (props.coralLevel===3) {
                                props.addAction('algaeRemovedHigh')
                                props.setCoralModalVisible(false)
                            }
                            else if (props.coralLevel===2) props.addAction('algaeRemovedLow')
                            props.setCoralModalVisible(false)
                        }}>
                            <Text style={coralModalStyles.ButtonFont}>
                                {props.coralLevel === 2 ? "Remove Low Algae" : props.coralLevel === 3 ? "Remove High Algae" : "Algae Level"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.5, width: '100%' }}>
                        <TouchableOpacity style={coralModalStyles.CancelButton} onPress={() => props.setCoralModalVisible(false)}>
                            <Text style={coralModalStyles.ButtonFont}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const coralModalStyles = StyleSheet.create({
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

export default CoralModal;