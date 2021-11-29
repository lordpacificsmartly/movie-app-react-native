import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Home from "../screens/Home";
import Details from "../screens/Details";
import Navbar from "./Navbar";
import Search from "../screens/Search";


const Stack = createStackNavigator();

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({ navigation }) => (
              <Navbar navigation={navigation} main={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTransparent: true,
            header: ({ navigation }) => <Navbar navigation={navigation} />,
          }}
        />
         <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTransparent: true,
            header: ({ navigation }) => <Navbar navigation={navigation} />,
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
