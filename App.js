import React, { useEffect, useState } from 'react';



import MainView from './src/MainView';
//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/store/reducers';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import colors from './src/constants/colors';
import  breakpoints  from './src/constants/breakpoints';
import grids from './src/constants/grids';
import typography from './src/constants/typography';
//import shadows from './src/constants/shadows';
import animations from './src/constants/animations';
import SQLite from 'react-native-sqlite-storage';

global.db = SQLite.openDatabase({
  name:'testDB.sqlite3',
  createFromLocation:'~ReactDuinoDB.db',
  location:'Library'},
  () =>{},
  error => {
    console.log("ERROR: " + error);
  }
);

const theme = {
  ...DefaultTheme,
  grids:{...grids},
  color:{...colors},
  breakpoints:{...breakpoints},
  typography:{...typography},
  //shadows:{...shadows},
  padding:'10px',
  bigPadding:'30px',
  margin:'10px',
  bigMargin:'30px',
  animations:{...animations},
  // colors: {
  //    ...DefaultTheme.colors,
  //    primary: '#3498db',
  //    accent: '#f1c40f',
  // },
};

const App: () => React$Node = () => {


  return (
    <Provider store={createStore(reducers)}>
      <PaperProvider theme={theme}>
        <MainView />
      </PaperProvider>
    </Provider>

  );
};



export default App;


