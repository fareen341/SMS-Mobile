import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { WebView } from "react-native-webview";
import axios from "axios";
import { TextInput } from "react-native-paper";
const { width } = Dimensions.get("window"); // Get screen width

const FlatInfoCreate = ({ fetchVisitors }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [visitorData, setVisitorData] = useState({
    title: "",
    complain_description: "",
  });
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const handleChange = (key, value) => {
    setVisitorData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  // console.log(visitorData)
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", visitorData.title);
      formData.append("complain_description", visitorData.complain_description);

      const response = await axios.post(
        "https://society.zacoinfotech.com/api/flat_repair_request/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
          },
        }
      );

      // console.log("Response:", response);

      if (response.status === 201) {
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Request submitted successfully!",
        });

        fetchVisitors();
        setVisitorData({
          title: "",
          complain_description: "",
        });

        setModalVisible(false);
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error submitting data.",
      });
    } finally {
      setLoading(false);
    }
  };

  const htmlContent = `
  <html>
    <head>
      <script src="https://cdn.ckeditor.com/ckeditor5/40.0.0/classic/ckeditor.js"></script>
      <style>
        body { margin: 0; padding: 10px; font-family: Arial, sans-serif; }
    <style>
  body { margin: 0; padding: 10px; font-family: Arial, sans-serif; }
  
  #editor-container {
    width: 100%;  
    max-width: 800px; 
    margin: 0 auto; 
    border:"

  }

  .ck-editor__editable { 
    min-height: 400px; 
    overflow-y: auto;
    width: 100%;
     font-size: 18px; /* Increase text size */
  }
      </style>
    </head>
    <body>
      <div id="editor"></div>
      <script>
        ClassicEditor
          .create(document.querySelector("#editor"))
          .then(editor => {
  
            editor.setData(\`
              <p>Dear <strong>[Admin/Support Team]</strong>,</p>
              <p>I would like to update my membership details. Please find the information below:</p>
              <p><strong>Previous Name:</strong> [Your Previous Name]</p>
              <p><strong>New Name:</strong> [Your New Name]</p>
              <p>Kindly make the necessary changes, and let me know if you need any additional information.</p>
              <p>Thank you for your assistance.</p>
              <p>Best regards,</p>
              <p><strong>[Your Name]</strong></p>
            \`);

   
            editor.model.document.on("change:data", () => {
              window.ReactNativeWebView.postMessage(editor.getData());
            });
          })
          .catch(error => console.error("CKEditor Load Error:", error));
      </script>
    </body>
  </html>
`;

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="plus-circle" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Flat Info</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="times" size={24} color="#4169E1" />
              </TouchableOpacity>
            </View>
            <View style={styles.container2}>
              <View style={styles.labelContainer2}>
                <Text style={styles.label2}>Title:</Text>
              </View>
              <TextInput
                placeholder="Enter Title"
                placeholderTextColor="#808080"
                onChangeText={(value) => handleChange("title", value)}
                mode="outlined"
                style={styles.input2}
                theme={{
                  colors: {
                    primary: "#4169E1",
                    outline: "#808080",
                  },
                }}
              />
            </View>
            <View style={styles.container2}>
              <View style={styles.labelContainer2}>
                <Text style={styles.label2}>
                  Write Your Complain in Detail:
                </Text>
              </View>
              <View style={{ height: 180, width: "100%" }}>
                <WebView
                  originWhitelist={["*"]}
                  value={visitorData.complain_description}
                  source={{ html: htmlContent }}
                  onMessage={(event) => {
                    const htmlData = event.nativeEvent.data;
                    setContent(htmlData);
                    setVisitorData((prevState) => ({
                      ...prevState,
                      complain_description: htmlData,
                    }));
                  }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  style={{ flex: 1, height: 500 }}
                />
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FlatInfoCreate;

const styles = StyleSheet.create({
  container2: {
    // padding: 15,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    marginBottom: 15,
  },
  labelContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label2: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
    color: "rgba(7, 7, 7, 0.47)",
  },
  input2: {
    backgroundColor: "rgba(243, 238, 238, 0.47)",
    width: "100%",
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    // width: "100%",
    // position: "relative",
  },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "rgba(0,0,0,0.5)",
  // },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    textAlign: "left",
    alignSelf: "flex-start",
  },
  // input: {
  //   width: "100%",
  //   paddingVertical: 12,
  //   paddingHorizontal: 15,
  //   borderWidth: 1,
  //   borderColor: "#ddd",
  //   borderRadius: 8,
  //   backgroundColor: "#f9f9f9",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  //   marginBottom: 15,
  // },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: 350,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#4169E1",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
