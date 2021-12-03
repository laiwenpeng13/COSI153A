import React, { useState, useEffect }  from 'react';
import { View, Button, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

 
const MoodJournal = () => {
  const [dateTime,setDateTime] = useState("")
  const [mood,setMood] = useState("")
  const [comment,setComment] = useState("")
  const [moodJournal,setMoodJournal]= useState([])

  useEffect(() => {getData()}
           ,[])

  const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@moodJournal')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setMoodJournal(data)
            console.log('Just set date/time, mood and comment')
          } else {
            console.log('just read a null value from Storage')
            // this happens the first time the app is loaded
            // as there is nothing in storage...
            setMoodJournal([])
            setDateTime("")
            setMood("")
            setComment("")
          }
        } catch(e) {
          console.log("error in getData ")
          console.dir(e)
        }
  }

  const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@moodJournal', jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
        }
  }


  const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
        } catch(e) {
          console.log("error in clearData ")
          console.dir(e)
        }
  }


  const renderMoodJournal = ({item}) => {
    return (
      <View style={styles.moodJournal}>
           <Text>{item.dateTime}</Text>
           <Text>{item.mood} </Text>
           <Text>{item.comment} </Text>
      </View>
    )
  }

  return (

    <View style={styles.container}>
      <Text style={styles.headerText}>Mood Journal</Text>
      <View
        style={{
          borderBottomColor: 'lightgrey',
          borderBottomWidth: 5,
        }}
      />
      <Text style={{fontSize:12, margin:15, color: 'grey'}}>
          Keep track of your moods below!
      </Text>

      <View style={{flexDirection:'row',
                    margin:25,
                    justifyContent:'space-around'}}>
            <TextInput // for the date/time
              style={{fontSize:15}}
              placeholder="Date/Time"
              onChangeText={text => {
                   setDateTime(text);
                 }}
              value = {dateTime}
            />

            <TextInput // for the mood
              style={{fontSize:15}}
              placeholder="Mood"
              onChangeText={text => {
                   setMood(text);
                 }}
              value = {mood}
            />

            <TextInput // for the comment
              style={{fontSize:15}}
              placeholder="Comment"
              onChangeText={text => {
                   setComment(text);
                 }}
              value = {comment}
            />
        </View>
        <View style={{flexDirection:'row',
                      justifyContent:'space-around'}}>
        <Button
               title={"Record"}
               color="green"
               onPress = {() => {
                 const newMoodJournal =
                   moodJournal.concat(
                     {'dateTime':dateTime,
                      'mood':mood,
                      'comment':comment,
                   })
                 setMoodJournal(newMoodJournal)
                 storeData(newMoodJournal)
                 setDateTime("")
                 setMood("")
                 setComment("")
               }}
               />
        <Button
                title={"Clear"}
                color="orange"
                onPress = {() => {
                  clearAll()
                  setMoodJournal([])
                }}
                />
      </View>

      <View style={{margin: 15,
                    padding: 10,
                    flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:'pink'}}>
        <Text style={{fontSize:20, color: 'white'}}>
              Your History Mood Journal
         </Text>
      </View>

      <FlatList
        data={moodJournal.reverse()}
        renderItem={renderMoodJournal}
        keyExtractor={item => item.dateTime}
      />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#eee',
    justifyContent: 'center',
    textAlign:'left',
    marginTop:20,
    padding:20,
  },
  moodJournal:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  headerText: {
    textAlign:'center',
    backgroundColor:'pink',
    fontSize: 32,
    padding:10,
    color: 'white'
  },

});


export default MoodJournal;