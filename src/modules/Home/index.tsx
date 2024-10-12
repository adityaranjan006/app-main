import { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { apiClient } from "../../common/apiClient";
import { useHubState } from "../../hub.store";
import { Slider } from "./Slider";
import { HomeHeader } from "./header";
import { SystemInfo } from "./info";
import { SolonoidSwitchView } from "./solonoid-switch";
import { useAssets } from "expo-asset";
import LFTRFT from "./Left_Right";
import { MyBedContextProvider } from "../../context/LeftRightBed";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",

    paddingTop: 10,
    paddingBottom: 50,
    paddingLeft: 12,
    paddingRight: 12,
  },
});


export function Home() {
  const hubState = useHubState();
  // LEFT STATE
  // RIGHT STATE
  // DEFAULT TOGGLE VALUE INITIALLY TRUE STATE
  useEffect(() => {
    async function getState() {
      try {
        const res = await apiClient.get("/");

        useHubState.setState({
          connected: true,
          on: res.data.on as boolean,
          value: res.data.value as number,
          solonoidOn: res.data.solonoidOn as boolean,
        });

        console.log({
          on: res.data.on as boolean,
          value: res.data.value as number,
        });
      } catch (error) {
        useHubState.setState({
          connected: false,
        });
      }
    }

    getState();
  }, []);

  async function setValue(value: number) {
    useHubState.setState({
      value,
    });

    await apiClient.post("/set", { value });
  }

  const setValueDebounced = useDebouncedCallback(setValue, 1000);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: Dimensions.get("screen").height, paddingTop: 64 }}>
        <View style={styles.gradient}>
          {/* LEFT BUTTON && RIGHT BUTTON */}
          <MyBedContextProvider>
            <HomeHeader />
            <LFTRFT />
          </MyBedContextProvider>

          {/* 
          <View style={{ flex: 1, paddingBottom: 64 }}>
            <SystemInfo />
          </View> */}

          {/* <View>
            <SolonoidSwitchView />
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
