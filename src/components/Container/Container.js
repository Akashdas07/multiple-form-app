import React from "react";
import { TouchableNativeFeedback, View } from "react-native";
import { styles } from "./styles";
export const Container = ({
  style,
  direction,
  justify,
  align,
  bg,
  width,
  height,
  padding,
  margin,
  pv,
  ph,
  mv,
  mh,
  border,
  borderColor,
  radius,
  shadow,
  touchable,
  onPress,
  onLongPress,
  children,
}) => {
  const ReturnView = () => {
    return touchable ? (
      <TouchableNativeFeedback onPress={onPress} onLongPress={onLongPress}>
        <View
          style={styles.container(
            style,
            direction,
            justify,
            align,
            bg,
            width,
            height,
            padding,
            margin,
            pv,
            ph,
            mv,
            mh,
            border,
            borderColor,
            radius,
            shadow
          )}
        >
          {children}
        </View>
      </TouchableNativeFeedback>
    ) : (
      <View
        style={styles.container(
          style,
          direction,
          justify,
          align,
          bg,
          width,
          height,
          padding,
          margin,
          pv,
          ph,
          mv,
          mh,
          border,
          borderColor,
          radius,
          shadow
        )}
      >
        {children}
      </View>
    );
  };
  return <ReturnView />;
};
