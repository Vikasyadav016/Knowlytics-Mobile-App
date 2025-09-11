import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Pressable,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import Loader from "@/commonComponents/Loader";
import { dev_Auth_Url } from "@/configUrl";
import ApiMethods from "@/ApiMethods/ApiMethos";
import DynamicModal from "@/commonComponents/PopUpModels";

export default function Register() {
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const isLargeScreen = screenWidth >= 600;
  const cardWidth = Math.min(screenWidth * 0.9, 800);
  const [visible, setVisible] = useState(false);
  const [formField, setFormField] = useState<any>({
    fullName: "",
    fatherName: "",
    motherName: "",
    personalEmail: "",
    guardianEmail: "",
    personalContactNo: "",
    guardianContactNo: "",
    profession: "",
    guardianProfession: "",
    standardOfStudent: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [respnseMsg, setResponseMsg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);

  const validateField = (key: string, value: string) => {
    let error = "";
    switch (key) {
      case "fullName":
      case "fatherName":
      case "motherName":
      case "personalContactNo":
      case "guardianContactNo":
      case "guardianEmail":
        if (!value.trim()) {
          error = "This field is required.";
        }
        break;
      case "personalEmail":
        if (!value.trim()) {
          error = "This field is required.";
        } else if (!value.includes("@")) {
          error = "Invalid email address.";
        }
        break;
      case "password":
        if (!value.trim()) {
          error = "This field is required.";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters.";
        }
        break;
      case "confirmPassword":
        if (!value.trim()) {
          error = "This field is required.";
        } else if (value !== formField.password) {
          error = "Passwords do not match.";
        }
        break;
      case "profession":
        if (!value.trim()) {
          error = "Please select a profession.";
        }
        break;
      case "guardianProfession":
        if (!value.trim()) {
          error = "Please select a guardian profession.";
        }
        break;
      case "standardOfStudent":
        if (formField.profession === "Student" && !value.trim()) {
          error = "Please enter the standard.";
        }
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [key]: error,
    }));
  };

  const handleChange = (key: string, value: string) => {
    setFormField((prev: any) => ({ ...prev, [key]: value }));
    validateField(key, value);
  };

  const handleRegister = async () => {
    const fieldsToValidate = Object.keys(formField);
    const newErrors: Record<string, string> = {};

    fieldsToValidate.forEach((field) => {
      const value = formField[field];
      validateField(field, value);
      const errorMessage = getFieldError(field, value);
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });

    if (!acceptTerms) {
      newErrors.acceptTerms = "You must accept the Terms and Conditions.";
    }
    setFormErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    } else {
      setLoader(true);
      const response = await ApiMethods.post(
        `${dev_Auth_Url}/v1/register`,
        formField
      );
      if (response?.status === 200) {
        setResponseMsg(response?.msgScs)
        setLoader(false);
        setVisible(true);
      } else {
         setResponseMsg(response?.msgeErr)
        setLoader(false);
        setVisible(true);
      }
      setLoader(false);
    }
  };

  const getFieldError = (key: string, value: string): string => {
    switch (key) {
      case "fullName":
      case "fatherName":
      case "motherName":
      case "personalContactNo":
      case "guardianContactNo":
      case "guardianEmail":
        return !value.trim() ? "This field is required." : "";
      case "personalEmail":
        if (!value.trim()) return "This field is required.";
        if (!value.includes("@")) return "Invalid email address.";
        return "";
      case "password":
        if (!value.trim()) return "This field is required.";
        if (value.length < 6) return "Password must be at least 6 characters.";
        return "";
      case "confirmPassword":
        if (!value.trim()) return "This field is required.";
        if (value !== formField.password) return "Passwords do not match.";
        return "";
      case "profession":
      case "guardianProfession":
        return !value.trim() ? "Please select a profession." : "";
      case "standardOfStudent":
        return formField.profession === "Student" && !value.trim()
          ? "Please enter the standard."
          : "";
      default:
        return "";
    }
  };

  const professions = [
    "",
    "Student",
    "Engineer",
    "Doctor",
    "Teacher",
    "Lawyer",
    "Business",
    "Other",
  ];

  return (
    <>
      <Loader visible={loader} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <LinearGradient
          colors={["#a8310aff", "#105a06ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.background}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.card, { width: cardWidth }]}>
            <Text style={styles.title}>Register here</Text>

            {error && (
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>{error}</Text>
                <Pressable
                  onPress={() => setError(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>×</Text>
                </Pressable>
              </View>
            )}

            <View
              style={[
                styles.formRow,
                isLargeScreen && { flexDirection: "row" },
              ]}
            >
              <View
                style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}
              >
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={formField.fullName}
                  onChangeText={(text) => handleChange("fullName", text)}
                  placeholderTextColor="#020202ff"
                />
                {formErrors.fullName && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {formErrors.fullName}
                  </Text>
                )}
              </View>
              <View
                style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}
              >
                <Text style={styles.label}>Father's Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Father's Name"
                  value={formField.fatherName}
                  onChangeText={(text) => handleChange("fatherName", text)}
                  placeholderTextColor="#020202ff"
                />
                {formErrors.fatherName && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {formErrors.fatherName}
                  </Text>
                )}
              </View>
            </View>

            <View
              style={[
                styles.formRow,
                isLargeScreen && { flexDirection: "row" },
              ]}
            >
              <View
                style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}
              >
                <Text style={styles.label}>Mother's Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Mother's Name"
                  value={formField.motherName}
                  onChangeText={(text) => handleChange("motherName", text)}
                  placeholderTextColor="#020202ff"
                />
                {formErrors.motherName && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {formErrors.motherName}
                  </Text>
                )}
              </View>
              <View
                style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}
              >
                <Text style={styles.label}>Personal Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Personal Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formField.personalEmail}
                  onChangeText={(text) => handleChange("personalEmail", text)}
                  placeholderTextColor="#020202ff"
                />
                {formErrors.personalEmail && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {formErrors.personalEmail}
                  </Text>
                )}
              </View>
            </View>

            <View
              style={[
                styles.formRow,
                isLargeScreen && { flexDirection: "row" },
              ]}
            >
              <View
                style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}
              >
                <Text style={styles.label}>Guardian Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Guardian Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formField.guardianEmail}
                  onChangeText={(text) => handleChange("guardianEmail", text)}
                  placeholderTextColor="#020202ff"
                />
                {formErrors.guardianEmail && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {formErrors.guardianEmail}
                  </Text>
                )}
              </View>
              <View
                style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}
              >
                <Text style={styles.label}>Personal Contact No</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Student Contact No"
                  keyboardType="phone-pad"
                  value={formField.personalContactNo}
                  maxLength={10}
                  onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, "");
                    if (numericText.length <= 10) {
                      handleChange("personalContactNo", numericText);
                    }
                  }}
                  placeholderTextColor="#020202ff"
                />
                {formErrors.personalContactNo && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {formErrors.personalContactNo}
                  </Text>
                )}
              </View>
            </View>

            <View
              style={[
                styles.formRow,
                isLargeScreen && { flexDirection: "row" },
              ]}
            >
              <View
                style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}
              >
                <Text style={styles.label}>Guardian Contact No</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Guardian Contact No"
                  keyboardType="phone-pad"
                  value={formField.guardianContactNo}
                  maxLength={10}
                  onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, "");
                    if (numericText.length <= 10) {
                      handleChange("guardianContactNo", numericText);
                    }
                  }}
                  placeholderTextColor="#020202ff"
                />
                {formErrors.guardianContactNo && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {formErrors.guardianContactNo}
                  </Text>
                )}
              </View>

              <View
                style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}
              >
                <Text style={styles.label}>Personal Profession</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={formField.profession}
                    onValueChange={(itemValue: any) =>
                      handleChange("profession", itemValue)
                    }
                    style={styles.picker}
                    dropdownIconColor="#020202ff"
                  >
                    {professions.map((prof) => (
                      <Picker.Item
                        key={prof}
                        label={prof === "" ? "Select Profession" : prof}
                        value={prof}
                      />
                    ))}
                  </Picker>
                </View>
                {formErrors.profession && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {formErrors.profession}
                  </Text>
                )}
              </View>
            </View>
            {formField.profession === "Student" && (
              <View
                style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}
              >
                <Text style={styles.label}>Standard Of Student</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Standard of student"
                  keyboardType="phone-pad"
                  value={formField.standardOfStudent}
                  onChangeText={(text) =>
                    handleChange("standardOfStudent", text)
                  }
                  placeholderTextColor="#020202ff"
                />
                {formErrors.standardOfStudent && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {formErrors.standardOfStudent}
                  </Text>
                )}
              </View>
            )}

            <View
              style={[
                styles.formRow,
                isLargeScreen && { flexDirection: "row" },
              ]}
            >
              <View
                style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}
              >
                <Text style={styles.label}>Guardian Profession</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={formField.guardianProfession}
                    onValueChange={(itemValue: any) =>
                      handleChange("guardianProfession", itemValue)
                    }
                    style={styles.picker}
                    dropdownIconColor="#020202ff"
                  >
                    {professions.map((prof) => (
                      <Picker.Item
                        key={prof}
                        label={prof === "" ? "Select Profession" : prof}
                        value={prof}
                      />
                    ))}
                  </Picker>
                </View>
                {formErrors.guardianProfession && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    {formErrors.guardianProfession}
                  </Text>
                )}
              </View>
              <View
                style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={formField.password}
                onChangeText={(text) => handleChange("password", text)}
                placeholderTextColor="#020202ff"
              />
              {formErrors.password && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  {formErrors.password}
                </Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={formField.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                placeholderTextColor="#020202ff"
              />
              {formErrors.confirmPassword && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  {formErrors.confirmPassword}
                </Text>
              )}
            </View>

            <View style={styles.termsContainer}>
              <Switch
                value={acceptTerms}
                onValueChange={setAcceptTerms}
                trackColor={{ false: "#ccc", true: "#105a06ff" }}
                thumbColor={acceptTerms ? "#065a03" : "#f4f3f4"}
              />
              <Text style={styles.termsText}>
                I accept the{" "}
                <Text style={{ color: "#105a06ff", fontWeight: "bold" }}>
                  Terms and Conditions
                </Text>
              </Text>
            </View>
            {formErrors.acceptTerms && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                {formErrors.acceptTerms}
              </Text>
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={handleRegister}
                activeOpacity={0.8}
                style={styles.buttonWrapper}
              >
                <LinearGradient
                  colors={["#a8310aff", "#105a06ff"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Register</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <DynamicModal
          visible={visible}
          onClose={() => setVisible(false)}
          title={''}
          message={respnseMsg}
          position="center"
          width="95%"
          height={250}
        />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 30,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#333",
  },
  tooltip: {
    flexDirection: "row",
    backgroundColor: "#ffdddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ff5c5c",
    borderWidth: 1,
  },
  tooltipText: {
    color: "#a80000",
    flex: 1,
    fontSize: 14,
  },
  closeButton: {
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  closeText: {
    color: "#a80000",
    fontSize: 20,
    fontWeight: "bold",
  },

  formRow: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  halfWidth: {
    flexBasis: "48%",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
    color: "#105a06ff",
    fontSize: 14,
  },
  input: {
    height: 50,
    borderColor: "#105a06ff",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#020202ff",
    backgroundColor: "#fafafa",
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#105a06ff",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fafafa",
  },
  picker: {
    height: 50,
    color: "#020202ff",
  },

  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  termsText: {
    marginLeft: 8,
    color: "#105a06ff",
    fontSize: 14,
    flexShrink: 1,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#105a06ff",
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
  },
  cancelText: {
    color: "#105a06ff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
