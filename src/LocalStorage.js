function ShowProfile(props) {
    const [Firstname, setFirstName] = useState('');
    const [Lastname, setLastName] = useState('');
    const [MobileNumber, setMobileNumber] = useState('')
    const [Email, setEmail] = useState('')
    const [Address, setAddress] = useState('')
    const [PinCode, setPinCode] = useState('')
    const [City, setCity] = useState('')
  
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
      <ScrollView>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', top: 15 }}>
          <Text style={{ display: 'flex', top: 5, fontWeight: "bold", fontSize: 17, right: 125, color: 'black' }}>FirstName</Text>
          <View style={{ display: 'flex', alignItems: 'center', bottom: 7, width: 450 }}>
            <Field placeholder="First Name" value={Firstname} onChangeText={(text) => setFirstName(text)} />
          </View>
          <Text style={{ display: 'flex', bottom: 20, fontWeight: "bold", fontSize: 17, right: 125, color: 'black' }}>LastName</Text>
          <View style={{ width: 450, display: 'flex', alignItems: 'center', bottom: 27 }}>
            <Field placeholder="Last Name" value={Lastname} onChangeText={(text) => setLastName(text)} />
          </View>
          <Text style={{ display: 'flex', bottom: 35, fontWeight: "bold", fontSize: 17, right: 110, color: 'black' }}>PhoneNumber</Text>
          <View style={{ width: 450, display: 'flex', alignItems: 'center', bottom: 45 }}>
            <Field placeholder="Mobile Number" value={MobileNumber} keyboardType={'numeric'} onChangeText={(numeric) => setMobileNumber(numeric)} />
          </View>
          <Text style={{ display: 'flex', bottom: 55, fontWeight: "bold", fontSize: 17, right: 140, color: 'black' }}>Email</Text>
          <View style={{ width: 450, display: 'flex', alignItems: 'center', bottom: 65 }}>
            <Field placeholder="Email" value={Email} onChangeText={(text) => setEmail(text)} />
          </View>
          <Text style={{ display: 'flex', bottom: 70, fontWeight: "bold", fontSize: 17, right: 135, color: 'black' }}>Address</Text>
          <View style={{ width: 450, display: 'flex', alignItems: 'center', bottom: 75 }}>
            <Field placeholder="Address" value={Address} onChangeText={(text) => setAddress(text)} />
          </View>
          <Text style={{ display: 'flex', bottom: 80, fontWeight: "bold", fontSize: 17, right: 130, color: 'black' }}>Pin-Code</Text>
          <View style={{ width: 450, display: 'flex', alignItems: 'center', bottom: 85 }}>
            <Field placeholder="Pin-Code" value={PinCode} keyboardType={'numeric'} onChangeText={(numeric) => setPinCode(numeric)} />
          </View>
          <Text style={{ display: 'flex', bottom: 90, fontWeight: "bold", fontSize: 17, right: 150, color: 'black' }}>City</Text>
          <View style={{ width: 450, display: 'flex', alignItems: 'center', bottom: 95 }}>
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
          <TouchableOpacity>
            <View style={{ display: 'flex', alignItems: 'center', bottom: 80 }}>
              <Button textColor='white' bgColor={darkGreen} btnLavel="submit" title='Submit' onPress={submit} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }