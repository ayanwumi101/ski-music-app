import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().trim().required("Full name is required"),
  selectedDate: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
    .required("Birth date is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "others"], "Invalid gender")
    .required("Gender is required"),
});

const AuthMe = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const formatDateString = (text) => {
    const numericText = text.replace(/\D/g, "");
    if (numericText.length > 2 && numericText.length <= 4) {
      return `${numericText.slice(0, 2)}/${numericText.slice(2)}`;
    } else if (numericText.length > 4) {
      return `${numericText.slice(0, 2)}/${numericText.slice(
        2,
        4
      )}/${numericText.slice(4, 8)}`;
    } else {
      return numericText;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/In.png")}
          style={styles.backgroundImage}
        />
        <View style={styles.header}>
          <TouchableOpacity style={styles.goBackButton} onPress={goBack}>
            <Text style={styles.goBackButtonText}>&#x2190;</Text>
          </TouchableOpacity>
          <Image
            source={require("../assets/whiteLG.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.body}>
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
            style={styles.gradient}
          />
          <View style={styles.accordionButtonLogin}>
            <Formik
              initialValues={{ fullName: "", selectedDate: "", gender: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => navigation.navigate("AuthMain")}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
              }) => (
                <View style={styles.formContainer}>
                  <Text style={styles.title}>What is your Birth date?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="DD/MM/YYYY"
                    value={values.selectedDate}
                    onChangeText={(text) =>
                      setFieldValue("selectedDate", formatDateString(text))
                    }
                    keyboardType="numeric"
                    maxLength={10}
                  />
                  {touched.selectedDate && errors.selectedDate && (
                    <Text style={styles.errorText}>{errors.selectedDate}</Text>
                  )}

                  <Text style={styles.title}>What is your Full Name?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={values.fullName}
                    onChangeText={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                  {touched.fullName && errors.fullName && (
                    <Text style={styles.errorText}>{errors.fullName}</Text>
                  )}

                  <Text style={styles.title}>Gender</Text>
                  <View style={styles.genderSelector}>
                    {["male", "female", "others"].map((g) => (
                      <TouchableOpacity
                        key={g}
                        style={[
                          styles.genderOption,
                          values.gender === g && styles.selectedOption,
                        ]}
                        onPress={() => setFieldValue("gender", g)}
                      >
                        <Text
                          style={[
                            styles.genderText,
                            values.gender === g && styles.selectedText,
                          ]}
                        >
                          {g.charAt(0).toUpperCase() + g.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {touched.gender && errors.gender && (
                    <Text style={styles.errorText}>{errors.gender}</Text>
                  )}

                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.continueButtonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};


// Stylesheet
const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 70,
  },
  body: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  accordionLogin: {
    backgroundColor: "#ffffff",
    borderTopRightRadius: 100,
    overflow: "hidden",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60%",
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontFamily: "Trebuchet MS",
    marginBottom: 20,
    color: "#FFFFFF",
    marginTop: 30,
  },
  accordionButtonLogin: {
    backgroundColor: "#C54436",
    paddingLeft: 50,
    paddingBottom: 50,
    paddingTop: 30,
    width: "100%",
    borderTopRightRadius: 200,
    overflow: "hidden",
  },
  formContainer: {
    borderRadius: 10,
    width: "80%",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  genderSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#ffffff",
    color: "#C54436",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    marginHorizontal: 5, // Added margin to space out the gender options
  },
  selectedOption: {
    backgroundColor: "#ffffff",
    borderColor: "#293c3b",
    borderWidth: 2,
  },
  genderText: {
    color: "#293c3b",
  },
  continueButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  continueButtonText: {
    color: "#c54436",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  goBackButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  goBackButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});


export default AuthMe;
