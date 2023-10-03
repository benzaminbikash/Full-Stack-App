import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
const Header = () => {
  return (
    <View style={styles.main}>
      <Text>Header</Text>
      <MaterialIcons name="logout" size={24} color="black" />
    </View>
  )
}

export default Header

const styles=StyleSheet.create({
  main:{
    height:55,
    backgroundColor:'grey',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10
  }  
})