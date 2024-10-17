import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import ColorPickerSlider from "./slider-base/SemiCircularSlider";
import { Bed } from "../../bedStore";
import { SliderStyle } from "../../constants/globalColor";


interface Props {
  min: number;
  max: number;
  val?: number;
  active?: boolean;
  bed: Bed;
  increase: () => void;
  decrease: () => void;
}

const Slider: React.FC<Props> = ({ min, max, val, increase, decrease, active, bed }) => {
  const [radius, setRadius] = useState(15);

  function handleSliderChange(val: number) {
    if (val === bed.temperatureValue) {
      return;
    }
    // Round the value to the nearest integer
    const roundedVal = Math.round(val);
    // Only update if the rounded value has changed
    if (roundedVal !== bed.temperatureValue) {
      // Update the bed temperature
      if (roundedVal > bed.temperatureValue) {
        increase();
      } else if (roundedVal < bed.temperatureValue) {
        decrease();
      }
      Haptics.selectionAsync();
    }
  }

  const midNum = useMemo(() => {
    return Math.round((min + max) / 2);
  }, [max, min]);

  function decrement() {
    if (bed.temperatureValue <= -15) {
      return;
    }
    decrease();
    Haptics.selectionAsync();
  }

  function increment() {
    if (bed.temperatureValue >= 15) {
      return;
    }
    increase();
    Haptics.selectionAsync();
  }

  const [isPressedPlus, setIsPressedPlus] = useState(false);
  const [isPressedMinus, setIsPressedMinus] = useState(false);

  const buttonColor = active ? SliderStyle.Button.Active : SliderStyle.Button.Inactive;
  const buttonTextColor = active ? SliderStyle.TextColor.Active : SliderStyle.TextColor.Inactive;

  return (
    <View style={{
      width: "100%", alignItems: "center", marginTop: -10, paddingHorizontal: 5, pointerEvents: active ? "auto" : "none"
    }}>
      <Text style={[styles.meterText, { paddingBottom: 0 }]}>{midNum}</Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 16, width: "100%" }}>
        <Text style={[styles.meterText, { marginBottom: 14 }, { color: "white" }]}>
          {min}
        </Text>

        <View
          style={{ justifyContent: "center", flexDirection: "row", flex: 1, position: "relative" }}
          onLayout={(ev) => {
            const w = ev.nativeEvent.layout.width;
            setRadius(w / 2);
          }}
        >
          <ColorPickerSlider
            thumbColor={active ? SliderStyle.Thumb.Active : SliderStyle.Thumb.Inactive}
            trackStrokeWidth={20}
            gestureDisabled={!active}
            trackRadius={radius}
            circleType={"Top"}
            value={bed.temperatureValue}
            onChangeColor={(color) => { }}
            onValueChange={handleSliderChange}
            linearGradient={[
              { color: active ? "#0000FF" : "#A9A9A9", offset: 0 },
              { color: active ? "#0000FF" : "#A9A9A9", offset: 0.2 },
              { color: active ? "#00FFF0" : "#A9A9A9", offset: 0.4 },
              { color: active ? "#FFFF00" : "#A9A9A9", offset: 0.6 },
              { color: active ? "#FF7F00" : "#A9A9A9", offset: 0.8 },
              { color: active ? "#FF0000" : "#A9A9A9", offset: 1 },
            ]}
            maxValue={15}
            minValue={-15}
            paddingVertical={10}
          />

          <View style={[styles.centerTextContainer]}>
            <Text style={{ fontSize: 20, color: buttonTextColor }}>
              {(function () {
                if (bed.temperatureValue === midNum) {
                  return active ? "Room Temp" : "Device is OFF";
                }
                return active ? bed.temperatureValue < midNum ? "Cooling down" : "Warming up" : "Device is OFF";
              })()}
            </Text>
            <Text style={{ fontSize: 60, color: buttonTextColor, fontWeight: "500" }}>
              {active ? bed.temperatureValue : "--"}
            </Text>
          </View>
        </View>

        <Text style={{ ...styles.meterText, marginBottom: 14, color: SliderStyle.TextColor.Active }}>
          +{max}
        </Text>
      </View>
      <View style={{ marginTop: 54, flexDirection: "row", gap: 20 }}>
        <Pressable
          style={[styles.button, { backgroundColor: active ? (isPressedMinus ? SliderStyle.Pressed.Active : buttonColor) : "#A9A9A9" }]}
          onPressIn={() => {
            setIsPressedMinus(true);
            if (active) decrement();
          }}
          onPressOut={() => setIsPressedMinus(false)}
        >
          <Text style={[styles.buttonTextMinus, { color: active ? "#fff" : "#ffffff" }]}>-</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: active ? (isPressedPlus ? SliderStyle.Pressed.Active : buttonColor) : "#A9A9A9" }]}
          onPressIn={() => {
            setIsPressedPlus(true);
            if (active) increment();
          }}
          onPressOut={() => setIsPressedPlus(false)}
        >
          <Text style={[styles.buttonTextPlus, { color: active ? "#fff" : "#ffffff" }]}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  meterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: SliderStyle.TextColor.Active
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
});
export default Slider;
