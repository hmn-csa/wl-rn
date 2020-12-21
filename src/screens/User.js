import React, { useState, useEffect } from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { StyleSheet, Text, View , TextInput, TouchableOpacity, Button, Alert} from 'react-native';
import { connect } from "react-redux";
import { actlogoutUser, clearUptrail, 
  clearData, clearShowlist} from "../actions/index"



function User(props) {

  const outUsers = () => props.logout()

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HMN APP</Text>
     
      <Button 
        style={styles.loginBtn}
        title='SIGOUT'
        onPress={outUsers}
      />
      </View>
  )
    
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actlogoutUser())
      dispatch(clearShowlist())
      dispatch(clearUptrail())
      dispatch(clearData())
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"10%",
    backgroundColor:"#fb5b5a",
    borderRadius:50,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(User);

