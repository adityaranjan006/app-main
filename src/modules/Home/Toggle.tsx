import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Bed } from '../../bedStore';
import { Toggle } from '../../constants/globalColor';

interface Props {
    bed: Bed;
    setActive: () => void;
}

const ToggleComponent: React.FC<Props> = ({ bed, setActive }) => {
    const icon = bed.isActive
        ? require('../../../assets/power_on.png')
        : require('../../../assets/power_off.png');


    const handleToggle = () => {
        setActive();
    };

    const handleAccessibilityAction = (event: any) => {
        if (event.nativeEvent.action === 'toggle') {
            handleToggle();
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {bed.isActive ? 'Active' : 'Inactive'}
            </Text >
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
        color: Toggle.TextColor.textColor,
        fontWeight: "bold"
    },
});

export default ToggleComponent;
