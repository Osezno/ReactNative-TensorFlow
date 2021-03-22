import { StyleSheet } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { grids } from './constants/grids';
import { animations } from './constants/animations';
import css from './components/Forms/Form.styles';
let title = {
  fontSize: 18,
  fontWeight: '600',
  alignItems: "center",
}
const style = theme => {
  const css = StyleSheet.create({
    ...animations,
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    switchWrap: {
      margin: 15,

      width: "100%",
      flexDirection: "row"
    },
    buttonWrap: {
      width: "100%",
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
    },
    bpmButtonWrap: {
      width: "100%",
      flexDirection: "row",
      
    },
   
    innerButtonWrap: {
      flex: .5,
      width: "10%",
      flexDirection: "row",
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
    },
    midButton: {
      flex: 0.35,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rgbMidButton: {
      flex: 0.50,
      
    },
    largeButton: {
      flex: 0.9,
      margin: 5
    },
    sectionContainer: {
      marginTop: 32,
      marginBottom: 32,
      paddingHorizontal: 24,
      backgroundColor: theme.color.primary
    },

    titleWrap: {
      flex: 0.35,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      marginTop: 15,
    },
    rgbTitleWrap: {
      flex: 0.35,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      marginTop: 35,
    },
    colorWrap: {
      flexDirection: 'row',
      width: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      marginTop: 5,
    },
    color: {
      flex: 0.2,
      margin: 5,
      padding:.5
    },
    sectionTitle: {
      ...title,
      color: "#607d8b",
    },
    bluetootWrap: {
      backgroundColor: "#000",

    },
    sectionTitleBlue: {
      ...title,
      color: "#fff"
    },
    sectionTitleLink:(opacity) => {
      return {
        ...title,
        color: "rgb(250,0,150)",
        opacity: opacity
      }
    },
    modalText: {
      fontSize: 20,
      marginBottom: 12,
      fontWeight: '600',
      alignItems: "center",
      color: "#607d8b",
    },
    sectionTitleRGB: {
      fontSize: 18,
      fontWeight: '600',
      alignItems: "center",
      color: "#607d8b",
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    centeredView: {
      flex: 1,
      height: "40%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      marginTop: 22
    },
    submit: {
      marginRight: 40,
      marginLeft: 40,
      marginTop: 10,
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: '#68a0cf',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff'
    },
    modalView: {
      flex: 1,
      height: "100%",
      width: "100%",
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 15,
      alignItems: "center",
      shadowColor: "#000",
    },
    table: {
      flex: 1
    },
    highlight: {
      fontWeight: '700',
    },
  });
  return css
}


export default style