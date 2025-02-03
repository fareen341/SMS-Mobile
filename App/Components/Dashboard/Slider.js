import { View, Text, FlatList, Image, Dimensions } from "react-native";
import React from "react";

const slider = [
  {
    image:
      "https://res.cloudinary.com/dt0j68vdr/image/upload/v1704952952/ygfarhwqdeickqkw3619.png",
  },
  {
    image:
      "https://res.cloudinary.com/dt0j68vdr/image/upload/v1704952952/ygfarhwqdeickqkw3619.png",
  },
  {
    image:
      "https://res.cloudinary.com/dt0j68vdr/image/upload/v1704952952/ygfarhwqdeickqkw3619.png",
  },
];

export default function Slider() {
  const renderItem = ({ item }) => (
    <View>
      <Image
        source={{ uri: item.image }}
        style={{
          width: Dimensions.get("screen").width * 0.89,
          height: 155,
          borderRadius: 10,
          marginRight: 15,
        }}
      />
    </View>
  );

  return (
    <View style={{ marginTop: 20 }}>
      {/* <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={slider}
        renderItem={renderItem}
      /> */}

      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        key={slider.id}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.image }}
              style={{
                width: Dimensions.get("screen").width * 0.89,
                height: 155,
                borderRadius: 10,
                marginRight: 15,
              }}
            />
          </View>
        )}
      />
    </View>
  );
}