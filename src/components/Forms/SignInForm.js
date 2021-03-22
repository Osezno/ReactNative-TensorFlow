import React, { useState, useEffect } from 'react';
import css from './Form.styles';
import { checkEmail, checkPasswordLogin } from './validations';
import catalogs from '../../constants/catalogs';
import api from '../../constants/api';
import axios from 'axios';


import { View, TextInput, Button, Text } from 'react-native';
const { errors, toast, inputStr } = catalogs



const SignInForm = (props) => {
    const { addAuthUser, addToast } = props
    const [error, setError] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: undefined,
        password: undefined,
        showPassword: false
    });

    const { email, password, showPassword } = formData;

    //GENERAL FUNCTIONS
    const handleClickShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const validate = (data) => {
        const { password, email } = data;
        if (!email || !password) {
            setError(true)
            setErrorMessage(errors.default)
            return false
        }
        if (checkPasswordLogin(password)) {
            setError(true)
            setErrorMessage(errors.passwordReq)
            return false
        }
        if (checkEmail(email)) {
            setError(true)
            setErrorMessage(errors.mail)
            return false
        }

        setError(false)
        setErrorMessage('')
    }

    //MAIN FUNCTIONS
    const handleChange = (newText, field) => {
        setFormData({ ...formData, [field]: newText });
    };

    const handleSignIn = () => {
        
        setLoading(true)
        axios.post(api.signIn, {
            headers: api.headerConfig,
            ...formData
        }).then((res) => {
            toast['message'] = res.data.message
            if (res.data.success) {
                toast['success'] = true
            }
        }).catch(err => {
            toast['message'] = errors.serverError
        }).finally(() => {
            
            setLoading(false)
            addToast(toast)
        })
    }

    useEffect(() => {
        if (typeof email !== 'undefined') validate(formData)
    }, [formData, email])


    return (
        <View style={css.formContainer}>
            <TextInput
                style={css.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
                value={email || ''}
                type="email"
                size="small"
                name="email"
                onChangeText={(newText) => handleChange(newText, "email")}
            />
            <TextInput
                style={css.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Password"
                secureTextEntry={true} 
                label={inputStr.password}
                name="password"
                value={password || ''}
                onChangeText={(newText) => handleChange(newText, "password")}
            />
            {error && <Text  >{errorMessage}</Text>}
            <Button
                style={css.button}
                title={loading ? inputStr.load : inputStr.login}
                onPress={() => handleSignIn()}
               
                type="submit"
                disabled={error || loading}
               
            />
        </View>
    )
}





export default SignInForm;
