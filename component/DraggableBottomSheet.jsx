import {
  Animated,
  PanResponder,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { WINDOW_HEIGHT } from "../utils/constant";
import { useRef } from "react";

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.4;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.15;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const DraggableBottomSheet = ({ children, setIsHorizontal }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation("up");
            setIsHorizontal(false); //set flatlist to vertical layout
          } else {
            springAnimation("down");
            setIsHorizontal(true); //set flatlist to horizontal layout
          }
        } else {
          // dragging up
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation("down");
            setIsHorizontal(true); //set flatlist to horizontal layout
          } else {
            springAnimation("up");
            setIsHorizontal(false); //set flatlist to vertical layout
          }
        }
      },
    })
  ).current;

  const springAnimation = (direction) => {
    lastGestureDy.current =
      direction === "down" ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: "clamp",
        }),
      },
    ],
  };
  return (
    <Animated.View style={[styles.bottomSheetWrapper, bottomSheetAnimation]}>
      <View style={styles.draggableArea} {...panResponder.panHandlers}>
        <View style={styles.dragHandle}></View>
      </View>
      <View style={styles.contentWrapper}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheetWrapper: {
    position: "absolute",
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    left: 0,
    width: "100%",
    height: BOTTOM_SHEET_MAX_HEIGHT,
    borderRadius: 12,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#a8bed2",
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  draggableArea: {
    width: 132,
    height: 32,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default DraggableBottomSheet;
