import React, { useEffect, useState } from 'react';
import { Button, View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, ImageBackground, ScrollViewComponent, SafeAreaView } from 'react-native';
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

// function show() {
//   const [user, setuser] = useState('')
//   const setData = async () => {
//     await AsyncStorage.setItem('user',"anil sidhu")
//   }
//   const getData = async () => {
//     const name = await AsyncStorage.getItem('user');
//     // console.warn(name)
//     setuser(name);
//   }
//   return (
//     <View style={{ marginTop: 100, marginLeft: 30, padding: 20 }}>
//       <Text>Hii | {user}</Text>
//       <Button title='setData' onPress={setData} />
//       <Button title='getData' onPress={getData} />
//     </View>
//   )
// }


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
      console.log(response);
    });
  };

  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', top: 15 }}>
      <Text style={{ display: 'flex', top: 5, fontWeight: "bold", fontSize: 17, right: 110 }}>FirstName</Text>
      <View style={{ display: 'flex', alignItems: 'center', bottom: 7, width: 400 }}>
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

      {/* image picker */}
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

// Todo list
function Home({ navigation }) {
  const [Mynotes, setMyNotes] = useState("");
  const [MyNotesArray, setMyNotesArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [user, setuser] = useState([])
  // set data

  const setData = async () => {
    try {
      await AsyncStorage.setItem(
        'item', Mynotes
      );
      getData()
    } catch (error) {
      // Error saving data
    }
  };

  // get data
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('item');
      setuser(value)
    } catch (error) {
      // Error retrieving data
    }
  };
  useEffect(() => {
    getData()
  }, [])

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
  // console.log(MyNotesArray)


  const onSubmitPress = async () => {
    var myNotesObject = {
      title: Mynotes,
      details: "demo detail"
    }
    // await AsyncStorage.setItem(JSON.stringify('Mynotes'), [...MyNotesArray, myNotesObject])
    setMyNotesArray([...MyNotesArray, myNotesObject])
    setMyNotes(" ")
  }

  const renderItemList = ({ item }) => {
    return (
      <View>
        <View>
          <Text style={{ fontSize: 24 }}>{item.title}</Text>
        </View>
        <View style={{
          display: 'flex',
          left: 210,
          backgroundColor: '#ff4500',
          width: 100,
          padding: 10,
          borderRadius: 5, marginBottom: 10
        }}>
          <TouchableOpacity
            // style={styles.addButton}
            onPress={() => {
              onDeleteItem(item.title);
            }}
          >
            <Text style={styles.addButtonText}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>


        {/* Edit item */}
        <View>
          <View style={{
            display: 'flex',
            bottom: 52,
            backgroundColor: '#ffd700',
            width: 100,
            padding: 10,
            borderRadius: 5, marginBottom: 10
          }}>
            <TouchableOpacity
              onPress={() => {
                editItem(item.title)
              }}
            >
              <Text style={styles.addButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* update button */}
          <View style={{ display: 'flex', left: 105, bottom: 107 }}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                updateItem(item.title)
              }}
            >
              <Text style={styles.addButtonText}>
                update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={Mynotes}
        onChangeText={(value) => setMyNotes(value)}
      />
      {/* Add todo-list */}
      <View style={{
        backgroundColor: '#1e90ff',
        width: 100, borderRadius: 5, padding: 10, marginBottom: 10
      }}>
        <TouchableOpacity
          // style={styles.addButton}
          onPress={() =>
            onSubmitPress()}>
          <Text style={styles.addButtonText}
            onPress={() => setData()}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 30 }}>{user}</Text>
      <View style={{
        backgroundColor: '#ff4500',
        width: 100, borderRadius: 5, padding: 10, marginBottom: 10,
        display: 'flex', left: 250
      }}>
        <TouchableOpacity
          onPress={() =>
            setuser('')
          }>
          <Text style={styles.addButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        backgroundColor: '#ffd700',
        width: 100, borderRadius: 5, padding: 10, marginBottom: 10,
        display: 'flex', bottom: 50
      }}>
        <TouchableOpacity
          onPress={() =>
           setuser('')}>
          <Text style={styles.addButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        backgroundColor: '#90ee15',
        width: 100, borderRadius: 5, padding: 10, marginBottom: 10,
        display: 'flex', left: 125, bottom: 105
      }}>
        <TouchableOpacity
          onPress={() =>
            setuser('')}
        >
          <Text style={styles.addButtonText}>update</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={MyNotesArray}
        renderItem={renderItemList}
        keyExtractor={item => item.title}
      />
      {/* Log out */}
      <View style={{
        display: 'flex',
        alignItems: 'center',
        bottom: 35
      }}>
        <Button title='Logout' onPress={Logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginTop: 5
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "green",
  },
  input: {
    borderWidth: 5,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#90ee15",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 100

  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontSize: 18,
  },
  itemList: {
    fontSize: 19,
  },
  taskButtons: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
});




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
      {/* <Drawer.Screen name="Logout" component={Logout} /> */}
      <Stack.Screen name="Settings" component={EmptyScreen} />
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
