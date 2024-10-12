import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useHubState } from "../../hub.store";
import { apiClient } from "../../common/apiClient";
import { usePollingEffect } from "../../common/hooks/use-polling.hook";

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#191919",
    borderRadius: 4,
    padding: 16,

    gap: 36,

    flex: 1,
  },
  tempText: {
    fontSize: 32,
    color: "#FFF4F4",
  },
  descText: {
    fontSize: 12,
    color: "#FFF4F4",
  },
});

interface Props {
  description: string;
  temp: number;
}

function InfoComponent({ description, temp }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.descText}>{description}</Text>
      <Text style={[styles.tempText, { alignSelf: "flex-end" }]}>
        {temp | 0} °C
      </Text>
    </View>
  );
}

export function SystemInfo() {
  const hubState = useHubState();
  const [tempState, setTempState] = useState({
    water: 0,
    ambient: 0,
    heatSink: 0,
    heatSink2: 0,
  });

  async function getTemps() {
    if (!hubState.connected) return;

    const res = await apiClient.get("/temperatures");
    setTempState(res.data);
  }

  usePollingEffect(getTemps, [hubState.connected], {
    interval: 5000,
  });

  return (
    <View style={{ gap: 12, width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <InfoComponent
          description="WATER"
          temp={Math.max(tempState.water - 17, 0)}
        />
        <InfoComponent
          description="AMBIENT"
          temp={Math.max(tempState.ambient - 10)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <InfoComponent description="HEAT SINK 1" temp={tempState.heatSink} />
        <InfoComponent description="HEAT SINK 2" temp={tempState.heatSink2} />
      </View>
    </View>
  );
}
