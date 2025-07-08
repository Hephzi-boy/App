import React from 'react'
import { Image, Text, View } from 'react-native'

export default function CustomToast({ text1, text2, props }: any) {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#48D1CC',
      borderRadius: 10,
      padding: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      marginHorizontal: 16,
    }}>
      <Image
        source={props.icon}
        style={{ width: 32, height: 32, marginRight: 12 }}
        resizeMode="contain"
      />
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{text1}</Text>
        {text2 ? <Text style={{ color: '#555' }}>{text2}</Text> : null}
      </View>
    </View>
  )
}