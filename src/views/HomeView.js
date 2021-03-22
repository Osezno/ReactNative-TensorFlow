import React, { useEffect, useState } from 'react';
import moment from "moment";


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
import BluetoothSerial from 'react-native-bluetooth-serial'
import catalogs from '../constants/catalogs'
import style from '../app.styles';
import { useTheme, DataTable, Snackbar } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Tuner from "../components/Tuner/Index";

const HomeView = ({ navigation }) => {
    // USEsTATE
    const tema = useTheme();
    let css = style(tema)
    const { arduino, Tones } = catalogs;
    const { onOFF, BPM, patrones, patronesDos, modos, colorSelected, colorSelected2, colores, colores2, colores3 } = arduino;
    const [isEnabled, setIsEnabled] = useState(false);
    const [devices, setDevices] = useState([]);
    const [discovering, setDiscovering] = useState(false);
    const [connected, setConnected] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalHistorial, setModalHistorial] = useState(false);
    const [modalTones, setModalTones] = useState(false);
    const [modalAudio, setModalAudio] = useState(false);
    const [timerBegin, setTimerBegin] = useState(new Date());
    const [timerOn, setTimerOn] = useState(false);
    const [historial, setHistorial] = useState([]);
    // const [audioMode, setAudioMode] = useState(false);
    // const [recording, setRecording] = useState(false);
    const [cardioActive, setCardioActive] = useState(1);
    const [toneActive, setToneActive] = useState(1);
    const [Do, setDo] = useState("w");
    const [Re, setRe] = useState("Y");
    const [Mi, setMi] = useState("y");
    const [Fa, setFa] = useState("g");
    const [Sol, setSol] = useState("b");
    const [La, setLa] = useState("c");
    const [Si, setSi] = useState("m");
    const [doSos, setDoSos] = useState("v");
    const [reSos, setReSos] = useState("n");
    const [faSos, setFaSos] = useState("o");
    const [solSos, setSolSos] = useState("r");
    const [laSos, setLaSos] = useState("p");
    const [currentNote, setCurrentNote] = useState("");
    let tuner = new Tuner();
    let currentInterval;

    tuner.init();
    //BLUETOOTH

    const arduinoNote = (note) => {
        switch (note) {
            case "C":
                BluetoothWrite(Do)
                break;
            case "C♯":
                BluetoothWrite(doSos)
                break;
            case "D":
                BluetoothWrite(Re)
                break;
            case "D♯":
                BluetoothWrite(reSos)
                break;
            case "E":
                BluetoothWrite(Mi)
                break;
            case "F":
                BluetoothWrite(Fa)
                break;
            case "F♯":
                BluetoothWrite(faSos)
                break;
            case "G":
                BluetoothWrite(Sol)
                break;
            case "G♯":
                BluetoothWrite(solSos)
                break;
            case "A":
                BluetoothWrite(La)
                break;
            case "A♯":
                BluetoothWrite(laSos)
                break;
            case "B":
                BluetoothWrite(Si)
                break;
        }
    }

    const audioColorSelection = (note, color) => {
        switch (note) {
            case "C":
                setDo(color)
                break;
            case "C♯":
                setDoSos(color)
                break;
            case "D":
                setRe(color);
                break;
            case "D♯":
                setReSos(color);
                break;
            case "E":
                setMi(color);
                break;
            case "F":
                setFa(color);
                break;
            case "F♯":
                setFaSos(color);
                break;
            case "G":
                setSol(color);
                break;
            case "G♯":
                setSolSos(color);
                break;
            case "A":
                setLa(color);
                break;
            case "A♯":
                setLaSos(color);
                break;
            case "B":
                setSi(color);
                break;
        }
        Alert.alert(`Tono ${note} actualizado`)
    }
    const BluetoothWrite = (code) => {
        console.log(code)
        if (code == "StartAudio") {
            tuner.start();
            counter = 0;
            tuner.onNoteDetected = (note) => {
                counter++
                console.log(note)
                if (currentNote != note["name"] || counter > 2) {
                    console.log(note["name"], counter)
                    arduinoNote(note["name"])
                    setCurrentNote(note["name"])
                    counter = 0;

                }
            };
            setModalAudio(true)
            BluetoothSerial.write("A")
            BluetoothSerial.write("V")
            //interval("A")
            return;
        }

        if (code == "StopAudio") {
            tuner.stop();
            Alert.alert("Reactive audio stopped")
            return;

        }


        BluetoothSerial.write(code)
            .then((res) => {
                if (code == "E") {
                    setTimerOn(true);
                    setTimerBegin(Date.now());
                    //interval("E")
                }
                if (code == "e") {
                    if (timerOn) {
                        const startDate = moment(timerBegin);
                        const timeEnd = moment(Date.now());
                        const diff = timeEnd.diff(startDate);
                        const diffDuration = moment.duration(diff);
                        InsertQuery(diffDuration.minutes());
                        Query();
                        setTimerOn(false);
                      //  clearInterval(currentInterval);
                      
                    }
                }
            })
            .catch((err) => console.log(err.message))
    }

    const connectDevice = async (id) => {

        BluetoothSerial.disconnect().then((res) => {
            BluetoothSerial.connect(id)
                .then((res) => {

                    Alert.alert(res["message"]);
                    setConnected(res)
                    // if (res["message"].search("Connected") > 0) {
                    //     setConnected(res)
                    // }
                })
                .catch((err) => console.log(err.message))
        })
            .catch((err) => console.log(err.message))
    }

    const toggleBluetooth = (value) => {
        if (value) {
            BluetoothSerial.enable()
                .then((res) => setIsEnabled(true))
                .catch((err) => console.log(err))
        }
        else {
            BluetoothSerial.disable()
                .then((res) => setIsEnabled(false))
                .catch((err) => console.log(err))
        }
    }
    //SQLQUERY

    const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
                (error) => {
                    reject(error);
                });
        });
    });

    const createTable = () => {
        db.transaction((txn) => {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='rutinasCompletadas'",
                [],
                (tx, res) => {
                    if (res.rows.length == 0) {
                        create = txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS rutinasCompletadas(id INTEGER PRIMARY KEY AUTOINCREMENT, created TEXT NOT NULL, minutos INTEGER NOT NULL, tipo TEXT NOT NULL)',
                            []
                        );
                    }
                }
            );
        })
    };

    const createTableAudio = () => {
        db.transaction((txn) => {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='rutinasCompletadas'",
                [],
                (tx, res) => {
                    if (res.rows.length == 0) {
                        create = txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS rutinasCompletadas(id INTEGER PRIMARY KEY AUTOINCREMENT, created TEXT NOT NULL, minutos INTEGER NOT NULL, tipo TEXT NOT NULL)',
                            []
                        );
                    }
                }
            );
        })
    };

    const Query = async () => {
        let selectQuery = await ExecuteQuery("SELECT * FROM rutinasCompletadas", []);
        var rows = selectQuery.rows;
        let items = [];
        for (let i = 0; i < rows.length; i++) {
            var item = rows.item(i);
            items.push(item);
        }
        setHistorial(items)
    }

    const InsertQuery = async (minutes) => {
        let current_time = moment().format("YYYY Do MM")
        let singleInsert = await ExecuteQuery("INSERT INTO rutinasCompletadas(created, minutos, tipo) VALUES (?, ?, ?)", [current_time, minutes, "Cardio"]);
    }

    // GENERAL FUNCTION

    const colorSelect = (code) => {
        BluetoothSerial.write(code)
            .then((res) => { setModalVisible(true) })
            .catch((err) => console.log(err.message))
    }

    const colorSelection = (code) => {
        BluetoothSerial.write(code)
            .then((res) => { setModalVisible(false) })
            .catch((err) => console.log(err.message))
    }
    // const interval = (type) => {
    //     if (type == "E") {
    //         let e = 1;
    //         currentInterval = setInterval(() => {

    //             if (e == 1) {
    //                 e = 0;
    //                 setCardioActive(0);
    //             } else {
    //                 e = 1;
    //                 setCardioActive(1);
    //             }
    //         }, 400);
    //     } else {
    //         let a = 1;
    //         currentInterval = setInterval(() => {

    //             if (a == 1) {
    //                 a = 0;
    //                 setToneActive(0);
    //             } else {
    //                 a = 1;
    //                 setToneActive(1);
    //             }
    //         }, 400);
    //     }

    // }
    const renderItem = (item) => {
        return (<View key={item.item.id} >

            <View style={css.titleWrap}>
                <Text style={css.sectionTitleBlue} >{item.item.name}</Text>
                {connected ? <Icon
                    reverse
                    name='close-circle-outline'
                    type='ionicon'
                    color='#807c7c'
                    onPress={() => BluetoothSerial.disconnect()}
                /> : <Icon
                    reverse
                    name='bluetooth'
                    type='ionicon'
                    color='#807c7c'
                    onPress={() => connectDevice(item.item.id)}
                />
                }
            </View>

        </View>)
    }
    // buttons
    const onOffButton = (name, on, off, icon, color) => {
        return (
            <View key={on}>
                <View style={css.buttonWrap}>
                    <View style={css.titleWrap}>
                        {(name == "Cardio") ?
                            <Text style={css.sectionTitleLink(cardioActive)} onPress={() => setModalHistorial(true)}>{name}</Text> :
                            (name == "React to audio") ? <Text style={css.sectionTitleLink(toneActive)} onPress={() => setModalTones(true)}>{name}</Text> :
                                <Text style={css.sectionTitle}>{name}</Text>
                        }
                    </View>
                    <View style={css.innerButtonWrap}>
                        <View style={css.midButton}>
                            <Icon

                                reverse
                                name={icon}
                                type='ionicon'
                                color={color}
                                onPress={() => BluetoothWrite(on)}
                            />
                        </View>
                        <View style={css.midButton}>
                            <Icon
                                reverse
                                name={icon}
                                type='ionicon'
                                color='#000'
                                onPress={() => BluetoothWrite(off)}
                            />
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    const bpmButton = (name, on, off, icon) => {
        return (
            <View key={on} >
                <View style={css.titleWrap}>
                    <Text style={css.sectionTitle}>{name}</Text>
                </View>
                <View style={css.buttonWrap}>
                    <View style={css.midButton}>
                        <Icon
                            reverse
                            name={icon}
                            type='ionicon'
                            color='#000'
                            onPress={() => BluetoothWrite(on)}
                        />
                        {/* <Button color={"#000"} title={`${on}`} onPress={() => BluetoothWrite(on)} /> */}
                    </View>
                    <View style={css.midButton}>
                        <Icon
                            reverse
                            name={icon}
                            type='ionicon'
                            color='#9d2ab9'
                            onPress={() => BluetoothWrite(off)}
                        />
                        {/* <Button color={"#9d2ab9"} title={`${(off == "N") ? "NP" : off}`} onPress={() => BluetoothWrite(off)} /> */}
                    </View>
                </View>
            </View>
        )
    }

    const patternButtons = (name, code,) => {
        return (
            <View style={css.buttonWrap} key={code}>
                <View style={css.largeButton}>
                    <Button color={code === "a" ? "#000" : "#ff1ecf"} title={`${name}`} onPress={() => BluetoothWrite(code)} />
                </View>
            </View>
        )
    }
    // AUDIO PROCESSING

    useEffect(() => {

        Promise.all([
            BluetoothSerial.isEnabled(),
            BluetoothSerial.list()
        ]).then((values) => {
            setIsEnabled(values[0])
            setDevices(values[1])
        })

        BluetoothSerial.on('bluetoothEnabled', () => {
            Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list()
            ]).then((values) => {
                setDevices(values[1])
            })
            BluetoothSerial.on('bluetoothDisabled', () => {
                setDevices([])
            })
            BluetoothSerial.on('readFromDevice', (data) => {
                console.log(`DATA FROM BLUETOOTH: ${data.data}`);
                console.log(data, data)
            })
            BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))
        })
    }, [BluetoothSerial])

    useEffect(() => {
        BluetoothSerial.isConnected().then((res) => {
            setConnected(res)
        })
        createTable(); //readFromDevice
        Query();
    }, [BluetoothSerial, connected])



    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={css.switchWrap}>
                <Text style={css.midButton}>Dispositivos Bluetooth</Text>
                <Icon
                    name='radio-outline'
                    type='ionicon'
                    color='#517fa4'
                />
                <Switch
                    style={css.midButton}
                    value={isEnabled}
                    onValueChange={(val) => toggleBluetooth(val)}
                />
            </View>
            <View style={css.bluetootWrap}>
                <FlatList
                    data={devices}
                    keyExtractor={item => item.id}
                    renderItem={(item) => renderItem(item)}
                />


            </View>
            <ScrollView>
                <SafeAreaView>
                    <View style={{ marginTop: 25 }}>
                        {Object.keys(onOFF).map((prop) => onOffButton(onOFF[prop][0], onOFF[prop][1], onOFF[prop][2], onOFF[prop][3], onOFF[prop][4]))}
                        {Object.keys(modos).map((prop) => onOffButton(modos[prop][0], modos[prop][1], modos[prop][2], modos[prop][3], modos[prop][4]))}
                    </View>

                    <View style={css.rgbTitleWrap}>
                        <Text style={css.sectionTitleRGB}>RGB</Text>
                    </View>
                    <View style={css.colorWrap}>
                        {Object.keys(colorSelected).map((prop) =>
                            <View style={css.rgbMidButton} key={prop}>
                                <Button color={"#607d8b"} title={`${colorSelected[prop][0]}`} onPress={() => colorSelect(colorSelected[prop][1])} />
                            </View>
                        )}
                    </View>
                    <View style={css.colorWrap}>
                        {Object.keys(colorSelected2).map((prop) =>
                            <View style={css.rgbMidButton} key={prop}>
                                <Button color={"#607d8b"} title={`${colorSelected2[prop][0]}`} onPress={() => colorSelect(colorSelected2[prop][1])} />
                            </View>
                        )}
                    </View>
                    {Object.keys(patronesDos).map((prop) => bpmButton("Repetir", patronesDos[prop][0], patronesDos[prop][1], patronesDos[prop][2]))}
                    {Object.keys(BPM).map((prop) => bpmButton("Velocidad", BPM[prop][0], BPM[prop][1], BPM[prop][2]))}
                    <View style={css.titleWrap}>
                        <Text style={css.sectionTitleRGB}>Secuencias</Text>
                    </View>
                    {Object.keys(patrones).map((prop) => patternButtons(patrones[prop][0], patrones[prop][1], true))}

                </SafeAreaView>

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Color Seleccionado");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <Text style={css.modalText}>Elige un color</Text>
                        <View style={css.colorWrap}>
                            {Object.keys(colores).map((prop) =>
                                <View style={css.color} key={prop}>
                                    <Button color={colores[prop][1]} title={""} onPress={() => colorSelection(colores[prop][2])} />
                                </View>
                            )}
                        </View>
                        <View style={css.colorWrap}>
                            {Object.keys(colores2).map((prop) =>
                                <View style={css.color} key={prop}>
                                    <Button color={colores2[prop][1]} title={""} onPress={() => colorSelection(colores2[prop][2])} />
                                </View>
                            )}
                        </View>
                        <View style={css.colorWrap}>
                            {Object.keys(colores3).map((prop) =>
                                <View style={css.color} key={prop}>
                                    <Button color={colores3[prop][1]} title={""} onPress={() => colorSelection(colores2[prop][2])} />
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={css.buttonWrap} key={"?"}>
                        <View style={css.largeButton}>
                            <Button color={"#000"} title={"Cancelar"} onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalHistorial}
                onRequestClose={() => {
                    setModalHistorial(!modalHistorial);
                }}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <Text style={css.modalText}>Historial</Text>
                        {/* <ScrollView> */}
                        <DataTable style={css.table}>
                            <DataTable.Header>
                                <DataTable.Title >Minutos</DataTable.Title>
                                <DataTable.Title >Tipo</DataTable.Title>
                                <DataTable.Title >Fecha</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {historial.map((obj) =>
                                    <DataTable.Row key={obj.id}>
                                        <DataTable.Cell >{obj["minutos"]}</DataTable.Cell>
                                        <DataTable.Cell > {obj["tipo"]}</DataTable.Cell>
                                        <DataTable.Cell >{obj["created"]}</DataTable.Cell>
                                    </DataTable.Row>
                                )}
                            </ScrollView>
                            <DataTable.Pagination
                                page={1}
                                numberOfPages={3}
                                onPageChange={page => {
                                    console.log(page);
                                }}
                                label="1-1"
                            />
                        </DataTable>
                        {/* </ScrollView> */}

                    </View>
                    <View style={css.buttonWrap} key={"?"}>
                        <View style={css.largeButton}>
                            <Button color={"#000"} title={"Cerrar"} onPress={() => setModalHistorial(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalTones}
                onRequestClose={() => {
                    setModalHistorial(!modalTones);
                }}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <Text style={css.modalText}>Elegir Color por Tono</Text>

                        <DataTable style={css.table}>
                            <DataTable.Header>
                                <DataTable.Title >Tono</DataTable.Title>
                                <DataTable.Title style={{ flex: 4 }} >colores</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {Tones.map((tone) =>

                                    <DataTable.Row key={tone}>
                                        <DataTable.Cell >{tone}</DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 8 }}>
                                            {Object.keys(colores).map((prop) =>
                                                <View style={css.color} key={prop}>
                                                    <Button color={colores[prop][1]} title={""} onPress={() => audioColorSelection(tone, colores[prop][2])} />
                                                </View>
                                            )}
                                            {Object.keys(colores2).map((prop) =>
                                                <View style={css.color} key={prop}>
                                                    <Button color={colores2[prop][1]} title={""} onPress={() => audioColorSelection(tone, colores2[prop][2])} />
                                                </View>
                                            )}
                                            {Object.keys(colores3).map((prop) =>
                                                <View style={css.color} key={prop}>
                                                    <Button color={colores3[prop][1]} title={""} onPress={() => audioColorSelection(tone, colores2[prop][2])} />
                                                </View>
                                            )}

                                        </DataTable.Cell>


                                    </DataTable.Row>
                                )}
                            </ScrollView>
                        </DataTable>
                    </View>
                    <View style={css.buttonWrap} key={"?"}>
                        <View style={css.largeButton}>
                            <Button color={"#000"} title={"Cerrar"} onPress={() => setModalTones(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAudio}
                onRequestClose={() => {
                    setModalAudio(!modalAudio);
                }}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <Text style={css.modalText}>Tono Actual</Text>
                        <View style={css.colorWrap}>
                            <Text style={css.modalText}>{currentNote}</Text>
                        </View>
                    </View>
                    <View style={css.buttonWrap} key={"?"}>
                        <View style={css.largeButton}>
                            <Button color={"#000"} title={"Cerrar"} onPress={() => setModalAudio(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};


export default HomeView;
