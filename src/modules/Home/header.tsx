import { useMemo, useState } from "react";
import { StyleSheet, View, Text, StyleProp, TextStyle } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";

// @ts-ignore:next-line
import { Switch } from "react-native-ios-kit";

import { useHubState } from "../../hub.store";
import { apiClient } from "../../common/apiClient";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // borderStyle: "solid",
    // borderColor: "red",
    // borderWidth: 1,
  },
  nameText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  connectText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
});

export function HomeHeader() {
  const hubState = useHubState();

  const [notInReach, setNotInReach] = useState(false);

  async function toggle(value: boolean) {
    try {
      useHubState.setState({
        on: value,
      });
      await apiClient.post("/toggle", { value: value });
    } catch (error) {
      setNotInReach(true);
      useHubState.setState({
        on: !value,
      });
    }
  }

  const connectText = useMemo((): [string, StyleProp<TextStyle>] => {
    if (notInReach){
      return ["Not Connected", {
        color: "red"
      }]
    }

    if (hubState.connected){
      return ["CONNECTED", {
        color: "#599636"
      }]
    }

    return ["CONNECTING...", {
      color: "#fff"
    }]
  }, [hubState.on, hubState.connected, notInReach])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.nameText}>dreamsleep.</Text>
        <Text style={[styles.connectText, connectText[1]]}>{connectText[0]}</Text>
      </View>

      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Switch value={hubState.on} onValueChange={toggle} />
      </View>
    </View>
  );
}
