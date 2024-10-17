import { useLeftBed, useRightBed } from "../../bedStore";


export const useBedMethods = () => {
    const lBed = useLeftBed((state) => state.bed);
    const rBed = useRightBed((state) => state.bed);
    const lBedToggleActive = useLeftBed((state) => state.toggleActive)
    const lBedIncrease = useLeftBed((state) => state.increaseTemperatureValue)
    const lBedDecrease = useLeftBed((state) => state.decreaseTemperatureValue)
    const rBedIncrease = useRightBed((state) => state.increaseTemperatureValue)
    const rBedToggleActive = useRightBed((state) => state.toggleActive)
    const rBedDecrease = useRightBed((state) => state.decreaseTemperatureValue)
    return {
        lBed,
        rBed,
        lBedToggleActive,
        lBedIncrease,
        lBedDecrease,
        rBedIncrease,
        rBedToggleActive,
        rBedDecrease
    }
}
