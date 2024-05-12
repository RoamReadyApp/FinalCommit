import { Stack, Tabs, router } from "expo-router";
import Countries from "../../screens/countries";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MyButton from "../../Components/MyButton";
import Home from "../../screens/HomePage";
import { logout } from "../../firebase/auth";
// import {MaterialIcons} from '@expo/vector-icons';

export default function Page() {
  
  return (
<View style={{ flex: 1, justifyContent: "center" }}>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: " App",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "#ee3926" ,height:90 , justifyContent: "center" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          // headerTitle: props => <LogoTitle {...props} />,
          headerRight: (props) => (
            <MyButton
              style={{ backgroundColor:'#127ac1',marginRight:5}}
              {...props}
              onPress={async () => {
                await logout();
                router.navigate("/account/login");
              }}
            >
              <Text style={{ color: props.tintColor || "white" }}>Logout</Text>
            </MyButton>
          ),
        }}
      />
        <Home/>
      </View>
    );
}