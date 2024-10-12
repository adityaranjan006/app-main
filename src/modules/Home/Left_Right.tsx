import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Animated, Easing } from "react-native";
import { Slider } from "./Slider";
import { useMyBedContext } from "../../context/LeftRightBed";
import ToggleComponent from "./Toggle";


const LFTRFT = () => {
    const [activeButton, setActiveButton] = useState(1);
    const { leftValue, rightValue, leftActive, rightActive, setLeftValue, setRightValue, setLeftActive, setRightActive } = useMyBedContext();
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const handleButtonPress = (button: number) => {
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

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.button, { opacity: activeButton === 1 ? 1 : 0.5 }, activeButton === 1 && styles.activeButton]}
                        onPress={() => handleButtonPress(1)}
                    >
                        <Text style={styles.buttonText}>LEFT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { opacity: activeButton === 2 ? 1 : 0.5 }, activeButton === 2 && styles.activeButton]}
                        onPress={() => handleButtonPress(2)}
                    >
                        <Text style={styles.buttonText}>RIGHT</Text>
                    </TouchableOpacity>
                </View>

                <Animated.View style={{ flexGrow: 1, justifyContent: "center", opacity: fadeAnim, marginVertical: 10 }}>
                    {activeButton === 1 && (
                        <ToggleComponent
                            active={leftActive}
                            setActive={setLeftActive}
                        />
                    )}
                    {activeButton === 2 && (
                        <ToggleComponent
                            active={rightActive}
                            setActive={setRightActive}
                        />
                    )}
                    {activeButton === 1 && (
                        <Slider
                            min={-10}
                            max={10}
                            val={leftValue}
                            active={leftActive}
                            onChange={setLeftValue}
                        />
                    )}

                    {activeButton === 2 && (
                        <Slider
                            min={-10}
                            max={10}
                            val={rightValue}
                            active={rightActive}
                            onChange={setRightValue}
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
        backgroundColor: "#323233",
        borderRadius: 5,
        marginHorizontal: 4,
        elevation: 5, // For Android shadow
        shadowColor: "#000", // Default shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 3, // Shadow blur radius
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
    activeButton: {
        backgroundColor: "#505051",
        fontWeight: "800",
    },
});

export default LFTRFT;
