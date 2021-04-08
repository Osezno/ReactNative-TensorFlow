import React, { useEffect, useState } from 'react';

import style from '../app.styles';

import * as ACTIONS from '../store/actions';
//import SignInForm from '../components/Forms/SignInForm.js';
import { connect } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import {
    SafeAreaView,
    ScrollView,
    View,
    Button,
    Text,
    Switch,
    StatusBar,
    FlatList,
    Alert,
    Modal,
    TouchableHighlight
} from 'react-native';

// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
//import Tuner from "../components/Tuner/Index";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

const TensorView = (props) => {
    const { addAuthUser, addToast, navigation, route, theme } = props
    //styles//
    const tema = useTheme();
    let css = style(tema)
    // states
    const [tensor1, setTensor1] = useState();
    const [tensor2, setTensor2] = useState();

    //variables
    // let tuner = new Tuner();
    // tuner.init();
    // tensor firstTest



    // const checkTuner = () => {
    //     console.log("tuner STARTED")
    //      buscar re entrar modelo para solo escuchar frecuancias  de kick
    //     tuner.start();
    //     counter = 0;
    //     tuner.onNoteDetected = (note) => {
    //         counter++
    //         console.log(note)
    //         // if (currentNote != note["name"]) {
    //         //     console.log(note["name"], counter)
    //         //     // arduinoNote(note["name"])
    //         //     // setCurrentNote(note["name"])
    //         //     counter = 0;
    //         // }
    //     };
    // }

    // const stopTuner = () => {
    //     tuner.stop();
    //     Alert.alert("Reactive audio stopped")
    // }



    // useEffect(() => {
    //     checkTuner()
    // }, [])

    /*OTHER TENSORFLOW FUNCTIONS */
    init = async () => {
        try {
            await tf.ready();
        }
        catch (error) {
            console.error(error);
        }
        try {
            const a = tf.tensor([[2, 3], [4, 5]])
            const b = tf.tensor([[1, 2], [3, 0]]).toInt();

            a.pow(b).print();

            //las operaciones simples funcionan

            //model = await tf.loadGraphModel('https://tfhub.dev/google/tfjs-model/spice/2/default/1', { fromTFHub: true });
            //buscar que el modelo se  cargue desde la app
            //console.log("model loaded")  // or tf.asin(x)fference(a, b)
        }
        catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        init()
    }, [])


    return (
        <SafeAreaView>
            {/* <View style={{ marginTop: 25, marginBottom: 25 }} onClick={checkTuner}>
                    <Text style={{ color: "#fff" }} >TENSOR TEST START</Text>
                </View>
                <View style={{ marginTop: 25, rmarginBottom: 25 }} onClick={stopTuner}>
                    <Text style={{ color: "#fff" }} >STOP</Text>
                </View> */}

            <View style={css.buttonWrap}>

                <View >
                    <Button
                        style={css.button}
                        title="Go to Home... again"
                        onPress={() => checkTuner()}
                    />
                    <Button
                        style={css.button}
                        title="Go to Home... again"
                        onPress={() => stopTuner()}
                    />
                </View>

            </View>


        </SafeAreaView>
    );
};

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: (session) => dispatch(ACTIONS.signIn(session)),
        addToast: (toast) => dispatch(ACTIONS.addToast(toast))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TensorView);

