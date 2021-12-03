import * as React from 'react';
import { Pressable, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MoodJournal from './Components/MoodJournal'

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
      Welcome to your Mood Log!
      </Text>
      <Pressable
        onPress={() => navigation.navigate('About')}
        style={{ backgroundColor: 'pink', padding: 15, marginBottom: 10, marginTop: 10 }}
      >
       <Text>About</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('MoodJournal')}
        style={{ backgroundColor: 'pink', padding: 15}}
      >
      <Text>Track Your Mood</Text>
      </Pressable>
    </View>
  );
}

function Journal({ navigation }) {
  return (
    <View>
      <moodJournal />
    </View>  
  );
}

function About() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to Mood Log!
      This is the app for you to keep track of your moods so you can do better on emotion management.</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MoodJournal" component={MoodJournal} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
