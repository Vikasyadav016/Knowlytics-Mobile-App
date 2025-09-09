import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
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

const { width } = Dimensions.get("window");
const isLargeScreen = width >= 600;

export default function Register() {
  const router = useRouter();

  const [formField, setFormField] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    personalEmail: "",
    guardianEmail: "",
    studentContactNo: "",
    guardianContactNo: "",
    profession: "",
    guardianProfession: "",
    password: "",
    confirmPassword: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setFormField((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = () => {
    if (!formField.personalEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formField.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (formField.password !== formField.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!acceptTerms) {
      setError("You must accept the Terms and Conditions.");
      return;
    }
    setError(null);
    alert("Registration successful!");
  };

  const professions = [
    "",
    "Engineer",
    "Doctor",
    "Teacher",
    "Lawyer",
    "Business",
    "Other",
  ];

  return (
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
        <View style={styles.card}>
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

          <View style={styles.formRow}>
            <View style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={formField.fullName}
                onChangeText={(text) => handleChange("fullName", text)}
                placeholderTextColor="#020202ff"
              />
            </View>
            <View style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}>
              <Text style={styles.label}>Father's Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Father's Name"
                value={formField.fatherName}
                onChangeText={(text) => handleChange("fatherName", text)}
                placeholderTextColor="#020202ff"
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}>
              <Text style={styles.label}>Mother's Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Mother's Name"
                value={formField.motherName}
                onChangeText={(text) => handleChange("motherName", text)}
                placeholderTextColor="#020202ff"
              />
            </View>
            <View style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}>
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
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}>
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
            </View>
            <View style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}>
              <Text style={styles.label}>Student Contact No</Text>
              <TextInput
                style={styles.input}
                placeholder="Student Contact No"
                keyboardType="phone-pad"
                value={formField.studentContactNo}
                onChangeText={(text) => handleChange("studentContactNo", text)}
                placeholderTextColor="#020202ff"
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}>
              <Text style={styles.label}>Guardian Contact No</Text>
              <TextInput
                style={styles.input}
                placeholder="Guardian Contact No"
                keyboardType="phone-pad"
                value={formField.guardianContactNo}
                onChangeText={(text) => handleChange("guardianContactNo", text)}
                placeholderTextColor="#020202ff"
              />
            </View>

            <View style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}>
              <Text style={styles.label}>Personal Profession</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={formField.profession}
                  onValueChange={(itemValue:any) =>
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
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]}>
              <Text style={styles.label}>Guardian Profession</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={formField.guardianProfession}
                  onValueChange={(itemValue:any) =>
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
            </View>
            <View style={[styles.inputWrapper, isLargeScreen && styles.halfWidth]} />
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 30,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
    flexDirection: isLargeScreen ? "row" : "column",
    justifyContent: "space-between",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  halfWidth: {
    flexBasis: isLargeScreen ? "48%" : "100%",
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
