import React, { useEffect, useState } from 'react';
import { Button, View, Text, Image, FlatList, TouchableOpacity, ImageBackground, ScrollViewComponent, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Field from './Field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Btn from './Btn';
import { darkGreen } from './Constants'
import { useNavigation } from '@react-navigation/native';
import ProductCategory from './ProductCategory';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



function EmptyScreen() {
  return <View />;
}

function Feed(props, { navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Feed Screen</Text>
      <Button title="Go to Root" onPress={() => navigation.navigate('Root')} />
      <Button
        title="Go to Root, Profile"
        onPress={() => navigation.navigate('Root', { screen: 'Profile' })}
      />
    </View>
  );
}

function ShowProfile(props) {
  const [Firstname, setFirstName] = useState('');
  const [Lastname, setLastName] = useState('');
  const [MobileNumber, setMobileNumber] = useState('')
  const [Email, setEmail] = useState('')
  const [Address, setAddress] = useState('')
  const [PinCode, setPinCode] = useState('')
  const [City, setCity] = useState('')

  const navigation = useNavigation();
  const submit = () => {
    navigation.navigate("ProductCategory", {
      Firstname: Firstname,
      Lastname: Lastname,
      MobileNumber: MobileNumber,
      Email: Email,
      Address: Address,
      PinCode: PinCode,
      City: City
    })
  }

  const [selectImage, setselectImage] = useState('')
  const imagePicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(options, response => {
      // setselectImage(response.assets[0].IMG.jpg)
      console.log(response);
    });
  };

  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', top: 15 }}>
      <Text style={{ display: 'flex', top: 5, fontWeight: "bold", fontSize: 17, right: 110 }}>FirstName</Text>
      <View style={{ width: 400, display: 'flex', alignItems: 'center', bottom: 7 }}>
        <Field placeholder="First Name" value={Firstname} onChangeText={(text) => setFirstName(text)} />
      </View>
      <Text style={{ display: 'flex', bottom: 20, fontWeight: "bold", fontSize: 17, right: 110 }}>LastName</Text>
      <View style={{ width: 400, display: 'flex', alignItems: 'center', bottom: 27 }}>
        <Field placeholder="Last Name" value={Lastname} onChangeText={(text) => setLastName(text)} />
      </View>
      <Text style={{ display: 'flex', bottom: 35, fontWeight: "bold", fontSize: 17, right: 90 }}>PhoneNumber</Text>
      <View style={{ width: 400, display: 'flex', alignItems: 'center', bottom: 45 }}>
        <Field placeholder="Mobile Number" value={MobileNumber} keyboardType={'numeric'} onChangeText={(numeric) => setMobileNumber(numeric)} />
      </View>
      <Text style={{ display: 'flex', bottom: 55, fontWeight: "bold", fontSize: 17, right: 120 }}>Email</Text>
      <View style={{ width: 400, display: 'flex', alignItems: 'center', bottom: 65 }}>
        <Field placeholder="Email" value={Email} onChangeText={(text) => setEmail(text)} />
      </View>
      <Text style={{ display: 'flex', bottom: 75, fontWeight: "bold", fontSize: 17, right: 110 }}>Address</Text>
      <View style={{ width: 400, display: 'flex', alignItems: 'center', bottom: 75 }}>
        <Field placeholder="Address" value={Address} onChangeText={(text) => setAddress(text)} />
      </View>
      <Text style={{ display: 'flex', bottom: 85, fontWeight: "bold", fontSize: 17, right: 110 }}>Pin-Code</Text>
      <View style={{ width: 400, display: 'flex', alignItems: 'center', bottom: 85 }}>
        <Field placeholder="Pin-Code" value={PinCode} keyboardType={'numeric'} onChangeText={(numeric) => setPinCode(numeric)} />
      </View>
      <Text style={{ display: 'flex', bottom: 95, fontWeight: "bold", fontSize: 17, right: 130 }}>City</Text>
      <View style={{ width: 400, display: 'flex', alignItems: 'center', bottom: 95 }}>
        <Field placeholder="City" value={City} onChangeText={(text) => setCity(text)} />
      </View>
      <View>
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => {
              imagePicker()
            }}>
            <Text style={{
              display: 'flex',
              bottom: 95, fontWeight: "bold",
              fontSize: 17,
              textAlign: 'center',
              right: 5,
              height: 35,
              padding: 5,
              width: 100,
              backgroundColor: 'skyblue', borderRadius: 20
            }}>Gallery</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <View style={{ display: 'flex', alignItems: 'center', bottom: 80 }}>
        {/* <Btn textColor='white' bgColor={darkGreen} title='Submit' onPress={submit} /> */}
        <Button textColor='white' bgColor={darkGreen} btnLavel="submit" title='Submit' onPress={submit} />
      </View>
    </View>
  )

}


function Home({ navigation }) {
  const [Mynotes, setMyNotes] = useState("");
  const [MyNotesArray, setMyNotesArray] = useState([]);
  const [refresh, setRefresh] = useState(false);

// set data
  const setData = async () => {
    try {
      const jsonValue = JSON.stringify({
        todo: Mynotes
      });
      await AsyncStorage.setItem('item', jsonValue);
      getData()
    } catch (error) {
      console.log(error)
    }
  };

// get data
  const getData = async () => {
    try {
      const Value = await AsyncStorage.getItem('item');
      // return JSON.parse(Value);
      console.log(JSON.parse(Value))
    } catch (error) {
      console.log("getting data error")
    }
  };


  //create a function to remove item from local stoarage and redirect user to login
  const Logout = async (props) => {
    const tokens = await AsyncStorage.removeItem("token")
    // console.log(token)
    if (tokens == null) {
      navigation.navigate('home');
    }

  }
  // delete function
  const onDeleteItem = (id) => {
    const filterData = MyNotesArray.filter(item => item.title !== id);
    setMyNotesArray(filterData);
    setMyNotes(" ")
  }

  // edit function
  const editItem = (id) => {
    const newEditItem = MyNotesArray.find((item) => item.title === id);
    setMyNotes(newEditItem.title);
  }


  // update function
  useEffect(() => {
    if (refresh === true) {
      setMyNotesArray([...MyNotesArray])
      setRefresh(false)
    }

  }, [refresh])

  const updateItem = (id) => {
    const newEditItem = MyNotesArray.findIndex((item) => item.title === id);
    MyNotesArray[newEditItem].title = Mynotes
    // console.log(MyNotesArray[newEditItem])
    setRefresh(true);
    setMyNotes(" ")
  }
  console.log(MyNotesArray)

  const onSubmitPress = async() => {
    var myNotesObject = {
      title: Mynotes,
      details: "demo detail"
    }
  // await AsyncStorage.setItem('',[...MyNotesArray, myNotesObject])
    setMyNotesArray([...MyNotesArray, myNotesObject])
    setMyNotes(" ")
  }

  const renderItemList = ({ item }) => {
    return (
      // delete item
      <View style={{ width: 500 }}>
        <View style={{
          display: 'flex',
          top: 30, left: 50,
          backgroundColor: 'white',
          width: 300,
          borderRadius: 50,
          padding: 10,
        }}>
          <Text style={{ fontSize: 24 }}>{item.title}</Text>
        </View>
        <TouchableOpacity onPress={() => {
          onDeleteItem(item.title);
        }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 24,
            borderRadius: 50,
            padding: 3,
            width: 60,
            height: 50,
            textAlign: 'center',
            display: 'flex', bottom: 15, left: 200,

          }}>
            <Image style={{ maxWidth: 150 }}
              source={require('./assets/custom.png')}></Image>
          </Text>
        </TouchableOpacity>


        {/* Edit item */}
        <View style={{
          fontWeight: 'bold',
          fontSize: 24,
          borderRadius: 50,
          padding: 3,
          width: 90,
          height: 80,
          textAlign: 'center',
          display: 'flex', bottom: 60, left: 225
        }}>
          <TouchableOpacity onPress={() => {
            editItem(item.title)
          }}>
            <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold' }}>
              <Image source={require('./assets/edit-button.png')}></Image>
            </Text>
          </TouchableOpacity>
          {/* update button */}
          <View>
            <TouchableOpacity onPress={() => {
              updateItem(item.title)
            }}>
              <Text style={{ display: 'flex', left: 65, bottom: 33, height: 35, width: 55, borderRadius: 50 }}>
                <Image source={require('./assets/Update-Button.jpg')}></Image>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  useEffect(() => {
    getData()
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'darkgreen', fontSize: 30 }}>Todo List</Text>
      <Field value={Mynotes} placeholder="Enter your notes title" onChangeText={value => {
        setMyNotes(value);
      }} />

      {/* Add todo-list */}
      <TouchableOpacity
        onPress={() =>
          onSubmitPress()}>
        <Text style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 30,
          backgroundColor: 'darkgreen',
          borderRadius: 25,
          width: 50,
          height: 50,
          textAlign: 'center', display: 'flex', left: 150, bottom: 65
        }} onPress={() => {
          setData();
        }}>+</Text>

      </TouchableOpacity>

      <FlatList
        data={MyNotesArray}
        renderItem={renderItemList}
        keyExtractor={item => item.title}
      />

      {/* Log out */}
      <View style={{ margin: 70, borderRadius: 20 }}>
        <Button title='Logout' onPress={Logout} />
      </View>
    </View>
  );
}

// drawer
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


function Root(props) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={ShowProfile} />
      <Drawer.Screen name="ProductCategory" component={ProductCategory} options={{
        title: "Account Details"
      }} />
      <Stack.Screen name="Settings" component={EmptyScreen} />
      {/* <Stack.Screen name="Logout" component={Logout}/> */}
    </Drawer.Navigator>
  );
}

function Homepage() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>

  );
}
export default Homepage;
