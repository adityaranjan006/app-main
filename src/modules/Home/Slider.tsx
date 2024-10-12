import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import ColorPickerSlider from "./slider-base/SemiCircularSlider";

const styles = StyleSheet.create({
  meterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "fff"
  },
  centerTextContainer: {
    position: "absolute",
    top: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#1400FF",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    margin: 10,
    width: 70,
    height: 70,
  },
  buttonTextPlus: {
    fontSize: 30,
    marginBottom: 2,
    paddingHorizontal: 3,
    fontWeight: "bold",
  },
  buttonTextMinus: {
    fontSize: 28,
    marginBottom: 2,
    paddingHorizontal: 3,
    fontWeight: "bold",
  },
  buttonPressed: {
    backgroundColor: "#0056b3",
  },
  disabled: {
    backgroundColor: "#A9A9A9",
  },
  disabledText: {
    color: "#ffffff",
  },
});

interface Props {
  min: number;
  max: number;
  val?: number;
  active?: boolean;
  onChange?: (val: number) => void;
}

export function Slider(props: Props) {
  const [value, setValue] = useState(props.val ?? 0);
  const [radius, setRadius] = useState(10);

  useEffect(() => {
    if (props.val) {
      setValue(props.val);
    }
  }, [props.val]);

  function handleSliderChange(val: number) {
    if (val === value) {
      return;
    }
    Haptics.selectionAsync();
    setValue(val);
    props.onChange?.(val);
  }

  const midNum = useMemo(() => {
    return Math.round((props.min + props.max) / 2);
  }, [props.max, props.min]);

  function decrement() {
    const newValue = value - 1;
    if (newValue < -10) {
      return;
    }
    handleSliderChange(newValue);
  }

  function increment() {
    const newValue = value + 1;
    if (newValue > 10) {
      return;
    }
    handleSliderChange(newValue);
  }

  const [isPressedPlus, setIsPressedPlus] = useState(false);
  const [isPressedMinus, setIsPressedMinus] = useState(false);

  const buttonColor = props.active ? "#505051" : "#A9A9A9";
  const buttonTextColor = props.active ? "#fff" : "#A9A9A9";

  return (
    <View style={{
      width: "100%", alignItems: "center", marginTop: -10, paddingHorizontal: 5, pointerEvents: props.active ? "auto" : "none"
    }}>
      <Text style={[styles.meterText, { paddingBottom: 0 }]}>{midNum}</Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 16, width: "100%" }}>
        <Text style={[styles.meterText, { marginBottom: 14 }, { color: "white" }]}>
          {props.min}
        </Text>

        <View
          style={{ justifyContent: "center", flexDirection: "row", flex: 1, position: "relative" }}
          onLayout={(ev) => {
            const w = ev.nativeEvent.layout.width;
            setRadius(w / 2);
          }}
        >
          <ColorPickerSlider
            thumbColor={props.active ? "white" : "#A9A9A9"}
            trackStrokeWidth={20}
            gestureDisabled={!props.active}
            trackRadius={radius}
            circleType={"Top"}
            value={value}
            onChangeColor={(color) => { }}
            onValueChange={handleSliderChange}
            linearGradient={[
              { color: props.active ? "#0000FF" : "#A9A9A9", offset: 0 },
              { color: props.active ? "#0000FF" : "#A9A9A9", offset: 0.2 },
              { color: props.active ? "#00FFF0" : "#A9A9A9", offset: 0.4 },
              { color: props.active ? "#FFFF00" : "#A9A9A9", offset: 0.6 },
              { color: props.active ? "#FF7F00" : "#A9A9A9", offset: 0.8 },
              { color: props.active ? "#FF0000" : "#A9A9A9", offset: 1 },
            ]}
            maxValue={10}
            minValue={-10}
            paddingVertical={10}
          />

          <View style={[styles.centerTextContainer]}>
            <Text style={{ fontSize: 20, color: props.active ? "#fff" : "#A9A9A9" }}>
              {(function () {
                if (value === midNum) {
                  return props.active ? "Room Temp" : "Device is OFF";
                }
                return props.active ? value < midNum ? "Cooling down" : "Warming up" : "Device is OFF";
              })()}
            </Text>
            <Text style={{ fontSize: 60, color: props.active ? "#fff" : "#A9A9A9", fontWeight: "500" }}>
              {props.active ? value : "--"}
            </Text>
          </View>
        </View>

        <Text style={{ ...styles.meterText, marginBottom: 14, color: "white" }}>
          +{props.max}
        </Text>
      </View>
      <View style={{ marginTop: 54, flexDirection: "row", gap: 20 }}>
        <Pressable
          style={[styles.button, { backgroundColor: props.active ? (isPressedMinus ? "#fff" : buttonColor) : "#A9A9A9" }]}
          onPressIn={() => {
            setIsPressedMinus(true);
            if (props.active) decrement();
          }}
          onPressOut={() => setIsPressedMinus(false)}
        >
          <Text style={[styles.buttonTextMinus, { color: props.active ? "#fff" : "#ffffff" }]}>-</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: props.active ? (isPressedPlus ? "#fff" : buttonColor) : "#A9A9A9" }]}
          onPressIn={() => {
            setIsPressedPlus(true);
            if (props.active) increment();
          }}
          onPressOut={() => setIsPressedPlus(false)}
        >
          <Text style={[styles.buttonTextPlus, { color: props.active ? "#fff" : "#ffffff" }]}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}
