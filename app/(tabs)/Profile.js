import { Stack, Tabs, router } from "expo-router";
import Countries from "../../screens/countries";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MyButton from "../../Components/MyButton";
import Profile from "../../screens/Profile";

export default function Page() {
  
  return (

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
              style={{marginRight:0,padding:10}}
              {...props}
              onPress={async () => {
                router.navigate("/account/Countries");
              }}
            >
              <Text style={{ color: props.tintColor || "white" }}>Back</Text>
            </MyButton>
          ),
        }}
      />
        <Profile/>
      </View>
);
}