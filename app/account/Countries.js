import { Stack, Tabs, router } from "expo-router";
import Countries from "../../screens/countries";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MyButton from "../../Components/MyButton";
// import {MaterialIcons} from '@expo/vector-icons';

export default function Page() {
  
  return (
    // <View>
    // <Tabs.Screen options={{
    //   title: 'Flights',
    //   tabBarIcon: () => (
    //       <MaterialIcons name="flight" size={20} color='black'/>
    //   ),
    //   headerLeft: () => (
    //       <Pressable onPress={() => router.back()} style={styles.back}>
    //           <MaterialIcons name="arrow-back" size={20} color='black' />
    //       </Pressable>
    //   ),

  // }}/>
    // <Countries/>
    // {/* </View> */}

<View style={{ flex: 1, justifyContent: "center" }}>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "My home",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          // headerTitle: props => <LogoTitle {...props} />,
          headerRight: (props) => (
            <MyButton
              style={{marginRight:5}}
              {...props}
              onPress={async () => {
                // await logout();
                router.navigate("/Profile");
              }}
            >
              <Text style={{ color: props.tintColor || "white" }}>Profile</Text>
            </MyButton>
          ),
        }}
      />
        <Countries/>
      </View>

    );
}
// const styles = StyleSheet.create({
//   logText: {
//       fontSize: 5,
//       color: 'white'
//   },
//   back:{
//       margin :10
//   }
// })