import React, { useEffect, useState } from 'react';
import { Button, View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, ImageBackground, ScrollViewComponent, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import Field from './Field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Btn from './Btn';
import { darkGreen } from './Constants'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import ProductCategory from './ProductCategory';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-ionicons';


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


function ShowProfile() {
  const [Firstname, setFirstName] = useState('');
  const [Lastname, setLastName] = useState('');
  const [MobileNumber, setMobileNumber] = useState('')
  const [Email, setEmail] = useState('')
  const [Address, setAddress] = useState('')
  const [PinCode, setPinCode] = useState('')
  const [City, setCity] = useState('')
  const [selectImage, setselectImage] = useState('')

  const set = async () => {
    var number = [['Firstname', Firstname],
    ['Lastname', Lastname],
    ['MobileNumber', MobileNumber],
    ['Email', Email],
    ['Address', Address],
    ['PinCode', PinCode],
    ['City', City]];
    await AsyncStorage.multiSet(number);
    get()
  };

  const get = async (props) => {
    await AsyncStorage.multiGet(['Firstname',], (err, items) => {
      setFirstName(items)
      //  console.log(items)
    });
    await AsyncStorage.multiGet(['Lastname'], (err, items) => {
      setLastName(items)
    });
    await AsyncStorage.multiGet(['MobileNumber'], (err, items) => {
      setMobileNumber(items)
    });
    await AsyncStorage.multiGet(['Email'], (err, items) => {
      setEmail(items)
    });
    await AsyncStorage.multiGet(['Address'], (err, items) => {
      setAddress(items)
    });
    await AsyncStorage.multiGet(['PinCode'], (err, items) => {
      setPinCode(items)
    });
    await AsyncStorage.multiGet(['City'], (err, items) => {
      setCity(items)
    });
  }

  useEffect(() => {
    get();
  }, []);


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
    set()
  }

  const addImageToLocal = async (item) => {
    await AsyncStorage.setItem('profileimage', item)
  }

  const getImageFromLocal = async () => {
    const image = await AsyncStorage.getItem('profileimage');
    setselectImage(image)
  }

  useEffect(() => {
    getImageFromLocal();
  }, []);

  const imagePicker = (props) => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(options, response => {
      setselectImage(response?.assets[0]?.uri)
      addImageToLocal(response?.assets[0]?.uri)
    });
  };
  return (
    <ScrollView>
      <View style={styles.profileContainer}>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={selectImage ? { uri: selectImage } : require("./assets/IMG.jpg")} />
          <TouchableOpacity onPress={() => {
            imagePicker()
          }}>
            <Text style={{
              backgroundColor: 'orange',
              width: 100,
              left: 6,
              height: 30,
              borderRadius: 20,
              padding: 5,
              color: 'white',
              textAlign: 'center',
            }}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}></View>
      </View>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', top: 60 }}>
        <Text style={{
       display:'flex',
       left:17,
       paddingHorizontal: 8,
       backgroundColor: "white",
       marginStart: 10,
       zIndex: 1,
       elevation: 1,
       shadowColor: "white",
       position: "absolute",
       top: -12
       }}>FirstName</Text>
        <View style={{
          display: 'flex', bottom: 5,
          width: 370, borderWidth: 1,
          borderColor: 'grey', borderRadius: 8,
          marginBottom: 7 ,
          zIndex:0,
        }}>
          <Field placeholder="enter a name" value={Firstname} onChangeText={(text) => setFirstName(text)} />
        </View>
        <Text style={{ display: 'flex', bottom: 10, margin: 7, fontSize: 17, right: 125, 
        color: 'grey',zIndex:1,
        backgroundColor: "white", }}>LastName</Text>
        <View style={{
          width: 370, display: 'flex',
          bottom: 27, borderWidth: 1,
          borderColor: 'grey', borderRadius: 5, height: 50,
          zIndex:0
        }}>
          <Field placeholder="Last Name" value={Lastname} onChangeText={(text) => setLastName(text)} />
        </View>
        <Text style={{ display: 'flex', bottom: 27, margin: 8, fontSize: 17, 
        right: 110, color: 'grey',backgroundColor:'white',zIndex:1 }}>PhoneNumber</Text>
        <View style={{
          width: 370, display: 'flex', bottom: 45,
          borderWidth: 1,
          borderColor: 'grey', borderRadius: 5, height: 50
        }}>
          <Field placeholder="Mobile Number" value={MobileNumber} keyboardType={'numeric'} onChangeText={(numeric) => setMobileNumber(numeric)} />
        </View>
        <Text style={{ display: 'flex', bottom: 47, margin: 8, fontSize: 17, right: 140, 
        color: 'grey',backgroundColor:'white',zIndex:1}}>Email</Text>
        <View style={{
          width: 370, display: 'flex', bottom: 65,
          borderWidth: 1,
          borderColor: 'grey', borderRadius: 5, height: 50
        }}>
          <Field placeholder="Email" value={Email} onChangeText={(text) => setEmail(text)} />
        </View>
        <Text style={{ display: 'flex', bottom: 58, fontSize: 17, margin: 7, 
        right: 135, color: 'grey',backgroundColor:'white',zIndex:1}}>Address</Text>
        <View style={{
          width: 370, display: 'flex', bottom: 75,
          borderWidth: 1,
          borderColor: 'grey', borderRadius: 5, height: 50
        }}>
          <Field placeholder="Address" value={Address} onChangeText={(text) => setAddress(text)} />
        </View>
        <Text style={{ display: 'flex', bottom: 67, margin: 7, fontSize: 17, 
        right: 130, color: 'grey',backgroundColor:'white',zIndex:1}}>Pin-Code</Text>
        <View style={{
          width: 370, display: 'flex', bottom: 85,
          borderWidth: 1,
          borderColor: 'grey', borderRadius: 5, height: 50
        }}>
          <Field placeholder="Pin-Code" value={PinCode} keyboardType={'numeric'} onChangeText={(numeric) => setPinCode(numeric)} />
        </View>
        <Text style={{ display: 'flex', bottom: 79, margin: 5, fontSize: 17, 
        right: 150, color: 'grey',backgroundColor:'white',zIndex:1 }}>City</Text>
        <View style={{
          width: 370, display: 'flex', bottom: 95,
          borderWidth: 1,
          borderColor: 'grey', borderRadius: 5, height: 50
        }}>
          <Field placeholder="City" value={City} onChangeText={(text) => setCity(text)} />
        </View>
        {/* image picker */}
        <TouchableOpacity>
          <View style={{ display: 'flex', alignItems: 'center', bottom: 90 }}>
            <Button textColor='white' bgColor={darkGreen} btnLavel="submit" title='Submit' onPress={submit} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

// Todo list
function Home({ navigation }) {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  // set data
  const saveTasks = async (tasks) => {
    try {
      const tasksJSON = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', tasksJSON);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  // get data
  const loadTasks = async () => {
    try {
      const tasksJSON = await AsyncStorage.getItem('tasks');
      if (tasksJSON) {
        setTasks(JSON.parse(tasksJSON));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleAddTask = () => {
    if (task.trim() === '') return;

    // uniq id 
    const newTask = {
      id: Date.now(),
      text: task,
    };


    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTask('');
  };

  // edit 
  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setUpdatedText(taskToEdit.text);
  };

  // update task
  const handleUpdate = () => {
    if (updatedText.trim() === '') return;
    const updatedTasks = tasks.map((taskItem) => {
      if (taskItem.id === editingTaskId) {
        return { ...taskItem, text: updatedText };
      }
      return taskItem;
    });
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditingTaskId(null);
  };

  // Remove task
  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      {editingTaskId === item.id ? (
        <TextInput
          style={styles.editInput}
          value={updatedText}
          onChangeText={(text) => setUpdatedText(text)}
          autoFocus
          onBlur={handleUpdate}
        />
      ) : (
        <Text style={styles.taskText}>{item.text}</Text>
      )}

      <View style={styles.buttonsContainer}>
        {/* Edit text then update text */}
        {editingTaskId === item.id ? (
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdate}
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(item.id)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveTask(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={(text) => setTask(text)}
        placeholder="Enter a new task"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1
  },
  textContainer: {
    alignItems: 'center'
  },
  profileContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    top: 40
  },
  image: {
    width: 110,
    height: 100,
    borderRadius: 55,
    borderColor: 'black',
    borderWidth: 3
  },

  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  taskText: {
    flex: 1,
  },
  editButton: {
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: 'white',
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  updateButton: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  updateButtonText: {
    color: 'white',
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  taskList: {
    flex: 1,
  },
  
});


// drawer
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


const CustomDrawer = (props) => {
  const [addImage, setaddImage] = useState('')
  const [Name,setName]=useState('')
  const[EmailDrawer,setEmailDrawer]=useState('')

  const get = async () => {
    const image = await AsyncStorage.getItem('Firstname');
    setName(image)
    const images = await AsyncStorage.getItem('Email');
   setEmailDrawer(images)
  }
  
  useEffect(() => {
    get();
  }, []);
    const getImageFromLocal = async () => {
      const image = await AsyncStorage.getItem('profileimage');
      setaddImage(image)
    }
    useEffect(() => {
      getImageFromLocal();
    }, []);

    const navigation = useNavigation()
    const Logout = async (props) => {
      const tokens = await AsyncStorage.removeItem("token")
      if (tokens == null) {
        navigation.navigate('home');
      }
    }

    return (
      <View style={{ flex: 1, width: '100%' }}>
        <DrawerContentScrollView {...props}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 30,
            alignItems: 'center',
            backgroundColor: 'darkblue',
            marginBottom: 20
          }}>
            <View>
              <Text style={{ fontWeight: 'bold',color:'white' }}>{Name}</Text>
              <Text style={{ fontWeight: 'bold',color:'white' }}>{EmailDrawer}</Text>
            </View>
            <Image
              style={{ width: 60, height: 60, borderRadius: 30 }}
              source={{ 'uri': addImage }} />
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <TouchableOpacity style={{
          position: 'absolute',
          right: 0, left: 0, bottom: 50, padding: 20
        }}>
          <Text style={{
            fontWeight: 'bold',
            backgroundColor: 'darkred', color: 'white', fontSize: 15,
            padding: 10, borderRadius: 10, width: 120, textAlign: 'center'
          }} onPress={Logout}>
            LogOut</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function Root(props) {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />
      } screenOptions={{
        headerStyle: {
          backgroundColor: "yellow"
        }
      }}>
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Profile" component={ShowProfile}/>
        <Drawer.Screen name="ProductCategory" component={ProductCategory} options={{
          title: "Account Details"
        }} />
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
