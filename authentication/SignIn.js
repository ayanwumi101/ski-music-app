import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { Formik } from "formik";
import * as Yup from "yup";
import { LoginUser } from '../Apis/AuthService/authService';
import Toast from 'react-native-toast-message';


const SignIn = ({ navigation }) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  
  //validation schema
   const validationSchema = Yup.object().shape({
     email: Yup.string()
       .email("Invalid email address")
       .required("Email is required"),
     password: Yup.string()
       .min(6, "Password must be at least 6 characters")
       .required("Password is required"),
   });

  const handleLogin = async(values) => {
    console.log(values);
    setLoading(true)
    const formData = {
      username_OR_email_address: values.email,
      password: values.password
    };
    try {
      const req = await LoginUser(formData);
      
      const data = await req.data;
      navigation.navigate("NewPage");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.response.data.message,
        text2: error.response.data.message,
      });
    }
    setLoading(false)
  };

  const handleForgotPassword = () => {
    // Navigate to ForgetPassword screen
    navigation.navigate('ForgetPassword');
  };

  // dismiss the keyboard when tapping outside input fields
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              {/* Email Input */}
              <Text>Email Address</Text>
              <TextInput
                ref={emailInputRef}
                style={styles.input}
                placeholder="johndoe@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                // Add a test ID
                testID="emailInput"
                onSubmitEditing={() => passwordInputRef.current.focus()}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              {/* Password Input */}
              <Text>Password</Text>
              <TextInput
                ref={passwordInputRef}
                style={styles.input}
                placeholder="********"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                // Add a test ID
                testID="passwordInput"
                onSubmitEditing={handleSubmit}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              {/* Forgot Password Link */}
              <TouchableOpacity
                onPress={handleForgotPassword}
                style={styles.forgotPasswordContainer}
              >
                <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{loading ? <ActivityIndicator color='#ffffff' /> : "Sign In"}</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#C54436',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotPasswordLink: {
    color: '#C54436',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SignIn;
