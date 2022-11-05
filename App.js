import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const DummyDATA = [
  { id: "b1", title: "book 1" },
  { id: "b2", title: "book 2" },
  { id: "b3", title: "book 3" },
  { id: "b4", title: "book 4" },
  { id: "b5", title: "book 5" },
  { id: "b6", title: "book 6" },
  { id: "b7", title: "book 7" },
  { id: "b8", title: "book 8" },
  { id: "b9", title: "book 9" },
  { id: "b10", title: "book 10" },
  { id: "b11", title: "book 11" },
  { id: "b12", title: "book 12" },
];

export default function App() {
  let animatedHeaderValue = useRef(new Animated.Value(0)).current;

  const Header_Max_Height = 250;
  const Header_Min_Height = 80;

  const animationHeaderBackgroundColor = animatedHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: ["blue", "red"],
    extrapolate: "clamp",
  });

  const animationHeaderHeight = animatedHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.header,
            {
              height: animationHeaderHeight,
              backgroundColor: animationHeaderBackgroundColor,
            },
          ]}
        >
          <Text style={styles.headerText}>A List of Books</Text>
        </Animated.View>
        <View style={styles.scrollContainer}>
          <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: animatedHeaderValue } } }],
              { useNativeDriver: false }
            )}
          >
            {DummyDATA.map((item, index) => (
              <View key={item.id}>
                <Text style={styles.textStyle}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textStyle: {
    textAlign: "center",
    fontSize: 20,
    padding: 20,
    color: "#000",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    paddingTop: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
    marginVertical: 1,
    paddingTop: 25,
    paddingBottom: 20,
  },
});
