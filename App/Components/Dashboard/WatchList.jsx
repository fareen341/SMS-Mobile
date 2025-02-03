import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import Carousel from "react-native-reanimated-carousel";
import { Shirt, Dumbbell, Bike, Coins } from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const menuItems = [
  { icon: Shirt, color: "#4169E1", label: "My Complains" },
  { icon: Dumbbell, color: "#2ECC71", label: "Noc Request" },
  { icon: Bike, color: "#F39C12", label: "Change tenant Info" },
  { icon: Coins, color: "#E74C3C", label: "Change Flat Info Request" },
  // Add more items if needed
];
const WatchList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WISHLIST</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <Carousel
        loop
        width={SCREEN_WIDTH} // Use full screen width
        height={120}
        autoPlay={false}
        pagingEnabled={false} // Allow free scrolling
        data={menuItems}
        scrollAnimationDuration={1000}
        //   mode="horizontal-stack" // Helps to fit multiple items
        modeConfig={{ snapDirection: "left" }} // Align left if needed
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[styles.iconContainer, { backgroundColor: item.color }]}
            >
              <item.icon color="white" size={24} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default WatchList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  seeAll: {
    fontSize: 14,
    color: "#666",
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH / 4, // Exactly 4 items in one screen
  },

  iconContainer: {
    width: 100,
    height: 66,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
});
