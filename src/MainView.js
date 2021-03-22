import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
//redux
import { connect } from 'react-redux';
import * as ACTIONS from './store/actions';
// aqui tiene que  haber un snackbar
const Stack = createStackNavigator();
import { Snackbar } from 'react-native-paper';


const MainView = (props) => {

    const { toast, removeToast } = props;
    // const css = useStyles();
    const [open, setOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState({});


    const openToast = (message, success) => {
        setToastMessage(message)
        // if (success) setToastType(css.success)
        // else setToastType(css.error)
        setOpen(true)
    }

    const onDismissSnackBar = () => {
        removeToast()
        setOpen(false);
    }

    useEffect(() => {
        if (toast?.open) {
            openToast(toast.message, toast.success);
        } else setOpen(false);
    }, [toast])

    // useEffect(() => {
    //   //  fetchAuthUser();
    // }, [])

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="@Osezno"
                        component={HomeView}
                        options={{
                            title:'Osezno Room Control',
                            headerStyle: {
                                backgroundColor: '#000',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            }
                        }}
                    />
                    <Stack.Screen name="Details" component={LoginView} />
                </Stack.Navigator>
            </NavigationContainer>
            <Snackbar
                visible={open}
                onDismiss={onDismissSnackBar}
                duration={5000}
            >
                {toastMessage}
            </Snackbar>

        </>
    );
};

const mapStateToProps = state => {
    return {
        //authUser: state.sessionState.authUser,
        toast: state.toastState,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAuthUser: () => dispatch(ACTIONS.fetchAuthUser()),
        removeToast: () => dispatch(ACTIONS.removeToast()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);


