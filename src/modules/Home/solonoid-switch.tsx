import { View } from "react-native";
// @ts-ignore:next-line
import { Switch } from "react-native-ios-kit";
import { apiClient } from "../../common/apiClient";
import { useHubState } from "../../hub.store";

export function SolonoidSwitchView() {
  const hubState = useHubState();

  async function handleToggle() {
    const value = !hubState.solonoidOn;
    await apiClient.post("/solonoid/toggle", {
      value: value,
    });

    useHubState.setState({ solonoidOn: value });
  }

  return (
    <View>
      <Switch value={hubState.solonoidOn} onValueChange={handleToggle} />
    </View>
  );
}
