import { StyleSheet } from 'react-native';

const box = {
    width: '100%',
    padding: 7,
    borderRadius: 4
}
const color = {
    success: "#000",
    error:"#fff"
}

const css = StyleSheet.create({
    // modal: {
    //     background: "#fff"
    // },
    input:{
        padding:5,
        marginBottom:25,
        color:'#000'
    },
    button:{
        marginTop:5,
        marginBottom:15,
    },
    error:{
        color:'#cb2d3e'
    },
    form: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        marginBottom: '10px',
    },
    formContainer:{
        marginBottom: 18,
    },
    inputs: {
        margin: 4,
        width: '100%',
    },
    success: {
        backgroundColor: color.success,
        ...box
    },
    error: {
        backgroundColor: color.error,
        ...box
    },
  
});

export default css
