import React from 'react';
import { View, Text, Switch, StyleSheet, Image, Pressable } from 'react-native';

interface Props {
    active: boolean;
    setActive: (active: boolean) => void;
}

const ToggleComponent: React.FC<Props> = ({ active, setActive }) => {
    // const toggleSwitch = () => {
    //     const newState = !active;
    //     // console.log(`Toggling to: ${newState}`); 
    //     setActive(newState);
    // };

    const icon = active
        ? require('../../../assets/power_on.png')
        : require('../../../assets/power_off.png');


    const handleToggle = () => {
        const newState = !active;
        setActive(newState); // Toggle active state
    };

    const handleAccessibilityAction = (event: any) => {
        if (event.nativeEvent.action === 'toggle') {
            handleToggle(); // Call toggle function
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {active ? 'Active' : 'Inactive'}
            </Text >
            {/* <Text style={styles.label} >Temperature</Text> */}
            {/* <Switch
                onValueChange={toggleSwitch}
                trackColor={{ false: '#767577', true: '#76FF03' }}
                thumbColor={active ? '#76FF03' : '#f4f3f4'}
                value={active}
                style={styles.switch}
            /> */}
            <Pressable
                onPress={handleToggle} // Handle regular press
                onAccessibilityAction={handleAccessibilityAction} // Handle accessibility action
                accessibilityActions={[{ name: 'toggle', label: 'Toggle state' }]}
            >
                <Image source={icon} style={{ height: 40, width: 40 }} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 20,
        paddingHorizontal: 25,
        marginTop: -40
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: "white",
        fontWeight: "bold"
    },
    switch: {
        transform: [{ scale: 1.5 }],
    },
});

export default ToggleComponent;
