import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import style from '../app.styles';
import * as ACTIONS from '../store/actions';
import SignInForm from '../components/Forms/SignInForm.js';
import { connect } from 'react-redux';
import { useTheme } from 'react-native-paper';

const LoginView = (props) => {
    const { addAuthUser, addToast, navigation, route, theme } = props
    const tema = useTheme();
    let css = style(tema)
    let body;
    if (route.params?.post) body = route.params?.post;
    else body = "no hay posts";




    return (
        <View style={css.sectionContainer}>
            <SignInForm addAuthUser={(authUser) => { addAuthUser(authUser) }} addToast={(toast) => addToast(toast)} />
            <Button
                style={css.button}
                title="Go to Home... again"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);

