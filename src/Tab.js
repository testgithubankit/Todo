import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab =createBottomTabNavigator();

const Tabs=()=>{
    return(
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Find" component={FindScreen}/>
        <Tab.Screen name="Post" component={PostScreen}/>
        <Tab.Screen name="Setting" component={SettingScreen}/>
        <Tab.Screen name="Chat" component={ChatScreen}/>
      </Tab.Navigator>
    );
}

export default Tabs;
