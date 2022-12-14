import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  ImageBackground,
  FlatList,
  Keyboard,
  View,
  ScrollView,
  Dimensions,
  ToastAndroid,
  Modal,
  TouchableOpacity
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {TextInput} from 'react-native-paper';
import {components} from '@components/index';
const {CImage, Container, CButton, CText} = components;
// image
import {styles} from '@assets/Styles/styles';

import Icon, {Icons} from '@components/CIcon/CustomIcon';

import * as Progress from 'react-native-progress';

import car from '@assets/Image/Signup_image/car.png';

// import {serviceListApi, signupWithEmail, signupWithPhone, serviceProviderSignup} from '../../Util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const SignupScreen = () => {

  const [email, setEmail] = useState('');
  const [checkBox, setCheckBox] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [step, setStep] = useState(1);
  const [progressVal, setProgressVal] = useState(0.3333);

  const [allServiceList, setAllServiceList] = useState([]);
  
  const [countryCode, setCountryCode] = useState('+31');


  const [emailVal, setEmailVal] = useState();
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [firstNameVal, setFirstNameVal] = useState('');
  const [firstNameError, setFirstNameError] = useState();
  
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState();

  const [addressVal, setAddressVal] = useState('');
  const [addressValError, setAddressValError] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  
  const [modalVisible, setModalVisible] = useState(false);

  const [userAllData, setUserAllData] = useState('');



  const step2Up = () => {
    console.log(emailVal);
        if(emailVal == ''){
            setEmailError("*please enter Email.");
            return;
        }
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (regEmail.test(emailVal) === false) {
            setEmailError("*Email is Not Correct.");
          return false;
        }
        else{
            setEmailError("");
        }
        if(password == ''){
            setPasswordError("*please enter Password.");
            return;
        }
        // let regPassword = /^(?=.*[a-z]).{2}(?=.*[A-Z]).{2}(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{3,30}$/;
        let regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/
        if (regPassword.test(password) === false) {
            setPasswordError("*Password is Not Correct.  Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters");
          return false;
        }
        else{
            setPasswordError("");
        }
        setStep(2);
        setProgressVal(0.666);
    
  };

  const step3Up = () => {
    setFirstNameError("");
    setLastNameError("");
    setAddressValError("");

    if(firstNameVal == ''){
    console.log('erf');

        setFirstNameError("*please enter First Name.");
        return;
    }
    let regFname = /^[a-zA-Z\s]+$/;
    if(regFname.test(firstNameVal) === false) {
        setFirstNameError("*First name must contain only alphabetic characters.");
      return;
    }

    if(lastName != ''){
        let regLname = /^[a-zA-Z\s]+$/;
    if(regLname.test(lastName) === false) {
        setLastNameError("*Last name must contain only alphabetic characters.");
      return;
    }
    }
   
    if(addressVal == ''){
        setAddressValError("*Please enter Address.");
        return;
    }
    console.log(addressVal.length);
    if(addressVal.length <= '9') {
        setAddressValError("Required. Minimum characters 10.");
      return;
    }
    
        
        
        setStep(3);
        setProgressVal(1);
      
  
  };

  
  const step4Up = async() => {
    if (checkBox) {
        setPhoneNumberError("")
        if(phoneNumber == ''){
            setPhoneNumberError("*Please enter Phone Number.");
            return;
        }
        if(phoneNumber.length <= 9){
            setPhoneNumberError("*Please enter 10 digit phone number.");
            return;
        }
       
        body = {
            emailId : emailVal,
            password : password,
            firstName : firstNameVal ? firstNameVal : '' ,
            lastName : lastName ? lastName : '',
            address : addressVal ? addressVal : '',
            countryCode : countryCode ? countryCode : '',
            phoneNumber : phoneNumber ? phoneNumber : ''
        }
        

        // setModalVisible(true);
        openSettingsModal(body)
    }
    return ;
  };
  const openSettingsModal = (body) => {
    setUserAllData(body);
    setModalVisible(!modalVisible);
}

  const back2Down = () => {
    setStep(2);
    setProgressVal(0.6666);
  };

  const back3Down = () => {
    setStep(3);
    setProgressVal(1);
  };

  const back1Down = () => {
    setStep(1);
    setProgressVal(0.333);
  };

  
  return (
    <View style={{flex: 1, marginHorizontal: WIDTH * 0.05}}>
                <Modal
          // animationType="slide"
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            // setModalVisible(!modalVisible);
          }}
          style={{zIndex: 2, elevation: 2}}>
          <View style={styles.centeredView}>
            <View style={styles.modalViewAddStaff}>
              <Container align="center" direction="row" justify="space-between">
                <CText size={WIDTH * 0.05}>Sign up data</CText>
                <Container
                  touchable
                  onPress={() => setModalVisible(!modalVisible)}
                  direction="row"
                  pv={4}
                  ph={4}
                  bg={'#2144C1'}
                  radius={10}>
                  <Icon
                    type={Icons.Entypo}
                    name={'cross'}
                    color={'#fff'}
                    size={20}
                  />
                </Container>
              </Container>
              <ScrollView>
                <Container mv={HEIGHT * 0.02} >
                    <CText>Email Id : {userAllData.emailId}</CText>
                    
                 {console.log(JSON.stringify(userAllData))}
                 
                 <CText>Password : {userAllData.password}</CText>
                 <CText>First Name : {userAllData.firstName}</CText>
                 <CText>Last Name : {userAllData.lastName}</CText>
                 <CText>Address : {userAllData.address}</CText>
                 <CText>Country Code : {userAllData.countryCode}</CText>
                 <CText>phone Number : {userAllData.phoneNumber}</CText>
                    


                </Container>
                <View>

    
                </View>
              </ScrollView>
            </View>
          </View>
          {/* </TouchableOpacity> */}
        </Modal>
      <Container
        align="center"
        mv={HEIGHT * 0.022}
        direction="row"
        justify="space-between">
        <Container width="20%">
          {step === 2 || step === 3 || step === 4 ? (
            <Container
              touchable
              onPress={
                step == 2
                  ? back1Down
                  : step == 3
                  ? back2Down
                  : step == 4
                  ? back3Down
                  : step == 1
                  ? ''
                  : ''
              }>
              <Icon
                type={Icons.AntDesign}
                name={'arrowleft'}
                // color={'#DFE2E7'}
                size={25}
              />
            </Container>
          ) : (
            <></>
          )}
        </Container>
        <CText size={HEIGHT * 0.028}>Sign up</CText>
        <Container width="20%">
          <CText></CText>
        </Container>
      </Container>
      <Container mh={WIDTH * 0.02} style={{marginTop: HEIGHT * 0.01}}>
        <CText color="#707070">Step {step}/3</CText>
      </Container>
      <Container align="center" mv={10} style={{marginBottom: HEIGHT * 0.03}}>
        <Progress.Bar
          progress={progressVal}
          width={WIDTH * 0.9}
          color="#DA3A2F"
          unfilledColor="#E0E0E0"
          borderColor="#fff"
        />
      </Container>

      {step === 1 && (
        <View>
          <View style={{marginVertical: 10, width: '100%'}}>
                <TextInput
                  underlineColor="transparent"
                  style={styles.inputPaper}
                  label="Your Email Id*"
                  // secureTextEntry={passwordVisible}
                  // color={'#6CBB45'}
                  value={emailVal}
                  onSubmitEditing={Keyboard.dismiss}
                  onChangeText={props => setEmailVal(props)}
                  underlineColorAndroid="transparent"
                  activeUnderlineColor={'#2144C1'}
                  theme={{
                    roundness: 10,
                  }}
                />
                 {emailError != '' &&
                <CText style={{marginHorizontal:15}} color={'red'}>{emailError}</CText>
                }
            <TextInput
                underlineColor="transparent"
                style={styles.inputPaper}
                label="Your Password"
                right={
                  <TextInput.Icon
                    name={passwordVisible ? 'eye' : 'eye-off'}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    iconColor="#22C55E"
                  />
                }
                // right={<TextInput.Icon name="eye" />}

                secureTextEntry={passwordVisible}
                value={password}
                onSubmitEditing={Keyboard.dismiss}
                onChangeText={props => setPassword(props)}
                underlineColorAndroid="transparent"
                activeUnderlineColor={'#2144C1'}
                theme={{
                  roundness: 10,
                }}
              />
              {passwordError != '' &&
                <CText style={{marginHorizontal:15}} color={'red'}>{passwordError}</CText>
            }

          </View>
          <Container
            direction="row"
            align="center"
            pv={18}
            ph={5}
            bg={'#F8F8F8'}
            radius={10}>


          </Container>

          <Container touchable width="100%" style={{marginTop: HEIGHT * 0.01}}>
            <CButton
              align="center"
              radius={8}
              width="100%"
              label="Save & Next"
              bg={'#2144C1'}
              color={'#fff'}
              padding={HEIGHT * 0.022}
              size={HEIGHT * 0.025}
              onPress={step2Up}
            />
          </Container>
        </View>
      )}
      {step === 2 && (
        <ScrollView>
          <View>
          <TextInput
              underlineColor="transparent"
              style={styles.inputPaper}
              // autoCompleteType="email"
              label="First Name*"
              underlineColorAndroid="transparent"
              activeUnderlineColor={'#2144C1'}
              outlineColor={'#000'}
              value={firstNameVal}
              keyboardDismissMode="none"
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={text => setFirstNameVal(text)}
              // onEndEditing={() => onChange(setEmail)}
              theme={{
                roundness: 10,
                colors: {
                  underlineColor: 'transparent',
                },
              }}
            />
            {firstNameError != '' && 
                <CText style={{marginHorizontal:15}} color={'red'}>{firstNameError}</CText>
            }
            <TextInput
              underlineColor="transparent"
              style={styles.inputPaper}
              // autoCompleteType="email"
              label="Last Name*"
              underlineColorAndroid="transparent"
              activeUnderlineColor={'#2144C1'}
              outlineColor={'#000'}
              value={lastName}
              keyboardDismissMode="none"
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={text => setLastName(text)}
              // onEndEditing={() => onChange(setEmail)}
              theme={{
                roundness: 10,
                colors: {
                  underlineColor: 'transparent',
                },
              }}
            />
            {lastNameError != '' &&
                <CText style={{marginHorizontal:15}} color={'red'}>{lastNameError}</CText>
            }
            <TextInput
              underlineColor="transparent"
              style={styles.inputPaper}
              // autoCompleteType="email"
              label="Address*"
              underlineColorAndroid="transparent"
              activeUnderlineColor={'#2144C1'}
              outlineColor={'#000'}
              value={addressVal}
              keyboardDismissMode="none"
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={text => setAddressVal(text)}
              // onEndEditing={() => onChange(setEmail)}
              theme={{
                roundness: 10,
                colors: {
                  underlineColor: 'transparent',
                },
              }}
            />
            
            {addressValError != '' &&
                <CText style={{marginHorizontal:15}} color={'red'}>{addressValError}</CText>
            }

            <Container touchable width="100%" mv={HEIGHT * 0.02}>
              <CButton
                align="center"
                radius={8}
                width="100%"
                label="Save & Next"
                bg={'#2144C1'}
                color={'#fff'}
                padding={HEIGHT * 0.022}
                size={HEIGHT * 0.025}
                onPress={step3Up}
              />
            </Container>
          </View>
        </ScrollView>
      )}
      {step === 3 && (
        <View>
          <View>
          <View
           style={{  
        backgroundColor: '#fff',
           borderRadius: 10,
           borderWidth: 1,
           borderColor: '#7691f5',
        //    height: HEIGHT * 0.08,
           fontSize: HEIGHT * 0.02,
           overflow: 'hidden',
           marginVertical: HEIGHT * 0.01,
        }}
            >
                <CText size={HEIGHT * 0.015} color={'#2144C1'} style={{marginHorizontal:12,}}>Country Code</CText>
            <Picker
              selectedValue={countryCode}
              onValueChange={(itemValue, itemIndex) =>
                setCountryCode(itemValue)
              }
              style={{color: '#000'}}>
                <Picker.Item label="+91 (India)" value="+91" />
              <Picker.Item label="+1 (USA)" value="+1" />
            </Picker>
          </View>
          <TextInput
                underlineColor="transparent"
                style={styles.inputPaper}
                // autoCompleteType="email"
                label="Phone Number"
                underlineColorAndroid="transparent"
                activeUnderlineColor={'#2144C1'}
                outlineColor={'#000'}
                value={phoneNumber}
                maxLength={10}
                keyboardType="numeric"
                keyboardDismissMode="none"
                onSubmitEditing={Keyboard.dismiss}
                onChangeText={text => setPhoneNumber(text)}
                theme={{
                  roundness: 10,
                  colors: {
                    underlineColor: 'transparent',
                  },
                }}
              />
               {phoneNumberError != '' &&
                <CText style={{marginHorizontal:15}} color={'red'}>{phoneNumberError}</CText>
            }
              
          <Container
            direction="row"
            align="center"
            pv={18}
            ph={5}
            bg={'#F8F8F8'}
            radius={10}>
            <Container touchable onPress={() => setCheckBox(!checkBox)}>
              <Icon
                type={Icons.MaterialCommunityIcons}
                name={
                  checkBox ? 'checkbox-intermediate' : 'checkbox-blank-outline'
                }
                color={checkBox ? '#2144C1' : '#707070'}
                size={25}
              />
            </Container>

            <Container mh={10}>
              <CText size={HEIGHT * 0.02} color={'#707070'}>
                By proceeding, you agree{' '}
              </CText>
              <Container direction="row">
                <CText size={HEIGHT * 0.02} color={'#DA3A2F'}>
                  Terms & conditions{' '}
                </CText>
                <CText size={HEIGHT * 0.02} color={'#707070'}>
                  {' '}
                  and{' '}
                </CText>
                <CText size={HEIGHT * 0.02} color={'#DA3A2F'}>
                  {' '}
                  Privacy policy
                </CText>
              </Container>
            </Container>
          </Container>
          </View>
          <Container touchable width="100%" mv={HEIGHT * 0.02}>
            <CButton
              // disabled={
              //   rating === "" || feedType === "" || reason === "" || remark === ""
              // }
              align="center"
              radius={8}
              width="100%"
              label="Submit"
              bg={checkBox ? '#2144C1' : '#9097A5'}
              color={'#fff'}
              padding={HEIGHT * 0.022}
              size={HEIGHT * 0.025}
              //   weight="bold"
              // mv={12}
              onPress={step4Up}

              // onPress={() => navigation.navigate('OtpScreen',  {name:'Jane'})}
              // style={{borderRadius: 10}}
            />
          </Container>
        </View>
      )}
    </View>
  );
};
