import { Text, View } from "react-native";
import { Stack, router } from "expo-router";
import MyButton from "./../../Components/MyButton";
import { logout } from "../../firebase/auth";
import Welcome from "../../screens/Welcome";
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
              style={{marginRight:5}}
              {...props}
              onPress={async () => {
                await logout();
                router.navigate("/account/login");
              }}
            >
              <Text style={{ color: props.tintColor || "white" }}>LogOut</Text>
            </MyButton>
          ),
        }}
      />
        <Welcome/>
      </View>
  );
}
