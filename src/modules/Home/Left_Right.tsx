import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Animated, Easing } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import ToggleComponent from "./Toggle";
import { useBedMethods } from "../../common/hooks/useBedMethods";
import Slider from "./Slider";
import { Bed } from "../../bedStore";
import { Dashboard } from "../../constants/globalColor";

enum ActiveButton {
    Left = 1,
    Right = 2,
}

const LFTRFT = () => {
    const [activeButton, setActiveButton] = useState(ActiveButton.Left);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const isInitialMount = useRef(true);
    const {
        lBed,
        rBed,
        lBedToggleActive,
        lBedIncrease,
        lBedDecrease,
        rBedToggleActive,
        rBedIncrease,
        rBedDecrease,
    } = useBedMethods();

    const handleButtonPress = (button: ActiveButton) => {
        if (activeButton !== button) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.ease,
            }).start(() => {
                setActiveButton(button);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                    easing: Easing.ease,
                }).start();
            });
        }
    };

    const debouncedCallback = useDebouncedCallback(async (values: { bed: Bed, value: number }) => {
        const { bed, value } = values;
        if (value !== undefined) {
            const side = bed.isLeftSide ? "Left" : "Right";
            try {
                if (!bed.isActive) {
                    console.log(`${side} Side API called to Turn Off ${side} Bed`);
                } else {
                    console.log(`${side} Side API called`, value);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, 1000);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (activeButton === ActiveButton.Left) {
                debouncedCallback({ bed: lBed, value: lBed.temperatureValue });
            } else {
                debouncedCallback({ bed: rBed, value: rBed.temperatureValue });
            }
        }
        return () => {
            debouncedCallback.cancel();
        };
    }, [lBed, rBed, debouncedCallback]);


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.button, { opacity: activeButton === ActiveButton.Left ? 1 : 0.5 }, activeButton === ActiveButton.Left && styles.activeButton]}
                        onPress={() => handleButtonPress(ActiveButton.Left)}
                    >
                        <Text style={styles.buttonText}>LEFT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { opacity: activeButton === ActiveButton.Right ? 1 : 0.5 }, activeButton === ActiveButton.Right && styles.activeButton]}
                        onPress={() => handleButtonPress(ActiveButton.Right)}
                    >
                        <Text style={styles.buttonText}>RIGHT</Text>
                    </TouchableOpacity>
                </View>

                <Animated.View style={{ flexGrow: 1, justifyContent: "center", opacity: fadeAnim, marginVertical: 10 }}>
                    {activeButton === ActiveButton.Left && (
                        <ToggleComponent
                            bed={lBed}
                            setActive={lBedToggleActive}
                        />
                    )}
                    {activeButton === ActiveButton.Right && (
                        <ToggleComponent
                            bed={rBed}
                            setActive={rBedToggleActive}
                        />
                    )}
                    {activeButton === ActiveButton.Left && (
                        <Slider
                            min={-15}
                            max={15}
                            val={lBed.temperatureValue}
                            active={lBed.isActive}
                            bed={lBed}
                            increase={lBedIncrease}
                            decrease={lBedDecrease}
                        />
                    )}

                    {activeButton === ActiveButton.Right && (
                        <Slider
                            min={-15}
                            max={15}
                            val={rBed.temperatureValue}
                            active={rBed.isActive}
                            bed={rBed}
                            increase={rBedIncrease}
                            decrease={rBedDecrease}
                        />
                    )}
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        marginBottom: -40,
        paddingVertical: 10,
        width: "100%",

    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingHorizontal: 5,
    },
    button: {
        flex: 1,
        padding: 15,
        backgroundColor: Dashboard.Button.Inactive,
        borderRadius: 5,
        marginHorizontal: 4,
        elevation: 5, // For Android shadow
        shadowColor: "#000", // Default shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 3, // Shadow blur radius
    },
    buttonText: {
        color: Dashboard.TextColor.Active,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
    activeButton: {
        backgroundColor: Dashboard.Button.Active,
        color: Dashboard.TextColor.Active,
        fontWeight: "800",
    },
});

export default LFTRFT;
