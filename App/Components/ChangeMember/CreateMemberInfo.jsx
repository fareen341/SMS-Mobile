import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { WebView } from "react-native-webview";
import axios from "axios";

const CreateMemberInfo = ({fetchVisitors}) => {
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
      "https://society.zacoinfotech.com/api/change_member_request/",
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

      fetchVisitors()
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


  // CKEditor HTML Content
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
  }

  .ck-editor__editable { 
    min-height: 400px; 
    overflow-y: auto;
    width: 100%;
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Visitor</Text>

            <TextInput
              placeholder="Title"
              value={visitorData.title}
              style={styles.input}
              placeholderTextColor="#888"
              onChangeText={(value) => handleChange("title", value)}
            />

            {/* WebView with CKEditor */}
            <View style={{ height: 300, width: "100%" }}>
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

export default CreateMemberInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  input: {
    width: "100%",
    paddingVertical: 12, 
    paddingHorizontal: 15, 
    borderWidth: 1,
    borderColor: "#ddd", 
    borderRadius: 8,
    backgroundColor: "#f9f9f9", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
    marginBottom: 15,
  },
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
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#007bff",
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
