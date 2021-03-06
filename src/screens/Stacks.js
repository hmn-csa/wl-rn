import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text, StyleSheet } from 'react-native'
import { Remark, Vsf, Skip, Search } from '../components'
import { Button } from 'react-native-paper';
import Tree from './Tree'
import ProductCategories from './ProductCategories'
import ScoreCategories from './ScoreCategories'
import ListAppls from './ListAppls'
import Dashboard from './Dashboard'
import User from './User'
import ManagerStaff from './ManagerStaff'

// import Test from './test'
// import Maps from './Maps'
// import CheckinMap from './CheckinMap'
import ListUptrail from './ListUptrail'
import{ styles, colors } from '../styles'



// navigation.openDrawer();
const Stack = createStackNavigator()

function DashboardStack(props) {
  
  return (
    <Stack.Navigator
    screenOptions={{headerShown: true,}}
    >
     <Stack.Screen 
        name="Tổng quát" 
        component={Dashboard} 
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
            shadowOpacity: 0
          },
          headerTintColor: colors.secondary,
          headerTitleStyle: {
            fontWeight: 'bold',
          }, 
        }}
      />

    

   </Stack.Navigator>
  )
}


function StafflistStack(props) {
  
  return (
    <Stack.Navigator
    screenOptions={{ headerShown: true,}}
    initialRouteName="ManageStaff"
    >
     <Stack.Screen 
        name="ManageStaff" 
        component={ManagerStaff} 
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />

      {/* <Stack.Screen 
        name="CheckinMap" 
        component={CheckinMap} 
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />     */}

      
   </Stack.Navigator>
  )
}

function CategorieStack(props) {
  
  return (
    <Stack.Navigator
      initialRouteName="Tree"
      screenOptions={{ headerShown: true,}}
    >
      <Stack.Screen 
        name="Tree" 
        component={Tree} 
        
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, 
          //headerRight: CategorieStackMenu,
          headerRight: () => (
            <View style={buttonStyles.buttons}>
              <Button
                mode="contained"
                onPress={() => props.navigation.navigate('Categories', { screen: 'Product' })}
                style={buttonStyles.button}
              >
                Product
              </Button>
              <Button
                mode="contained"
                onPress={() => props.navigation.navigate('Categories', { screen: 'Score' })}
                style={buttonStyles.button}
              >
                Score
              </Button>
          </View>
          )
        }}
        
      />
      <Stack.Screen 
        name="Product" 
        component={ProductCategories}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          screenOptions: false,
          headerRight: () => (
            <View style={buttonStyles.buttons}>
              <Button
                  mode="contained"
                  onPress={() => props.navigation.navigate('Categories', { screen: 'Tree' })}
                  style={buttonStyles.button}
              >
                Tree
              </Button>
              <Button
                mode="contained"
                onPress={() => props.navigation.navigate('Categories', { screen: 'Score' })}
                style={buttonStyles.button}
              >
                Score
              </Button>
           
          </View>
          )
        }}
      />
       <Stack.Screen 
        name="Score" 
        component={ScoreCategories}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          screenOptions: false,
          headerRight: () => (
            <View style={buttonStyles.buttons}>
              <Button
                  mode="contained"
                  onPress={() => props.navigation.navigate('Categories', { screen: 'Tree' })}
                  style={buttonStyles.button}
              >
                Tree
              </Button>
              <Button
                mode="contained"
                onPress={() => props.navigation.navigate('Categories', { screen: 'Product' })}
                style={buttonStyles.button}
              >
                Product
              </Button>
          </View>
          )
        }}
      />
    </Stack.Navigator>
  );
}


function PortStack(props) {
  return (
    
      <Stack.Navigator >
      <Stack.Screen 
          name="List" 
          component={ListAppls}  
          options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          
          headerRight: () => (
            <View style={buttonStyles.buttons}>
               <Button
                  mode="contained"
                  onPress={() => props.navigation.navigate('Portfolio', { screen: 'Uptrail' })}
                  style={buttonStyles.button}
              >
                Uptrail
              </Button>

              <Button
                  icon="account-search"
                  mode="contained"
                  onPress={() => props.navigation.navigate('Portfolio', { screen: 'Search' })}
                  style={buttonStyles.button}
              >
              </Button>
              
              <Button
                icon="map"
                mode="contained"
                onPress={() => props.navigation.navigate('Portfolio', { screen: 'Maps' })}
                style={buttonStyles.button}
              >
              </Button>
            </View>
           
          )
        }}
      />

      <Stack.Screen 
        name="Uptrail" 
        component={ListUptrail} 
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />

      <Stack.Screen 
        name="Remark" 
        component={Remark} 
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen 
        name="Vsf" 
        component={Vsf} 
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen 
        name="Skip" 
        component={Skip}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />

      <Stack.Screen 
        name="Search" 
        component={Search} 
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
{/*       
      <Stack.Screen 
        name="Maps" 
        component={Maps}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />  */}
    </Stack.Navigator> 
    
  );
}
const buttonStyles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 2,
    
  },
  button: {
    marginLeft: 1,
    borderRadius: 10,
    fontSize: 50,
    fontWeight: 'bold', 
    backgroundColor: colors.primary,
    // borderColor:colors.white,
  },

  nameTxt: {
    marginLeft: 5,
    fontWeight: '600',
    color: '#222',
    fontSize: 13,
    width:190,
  },

});


export {  
  DashboardStack,
  CategorieStack,
  PortStack,
  StafflistStack,
}