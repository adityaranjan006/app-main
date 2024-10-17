import { create } from 'zustand';

export interface Bed {
    id: number;
    temperatureValue: number;
    isActive: boolean;
    isLeftSide: boolean;
}

interface BedMattressStore {
    bed: Bed;
    setTemperatureValue(value: number): void;
    increaseTemperatureValue(): void;
    decreaseTemperatureValue(): void;
    toggleActive(): void;
}

export const useBedStore = (isLeftSide: boolean) => create<BedMattressStore>((set) => ({
    bed: {
        id: 1,
        temperatureValue: 0,
        isActive: false,
        isLeftSide,
    },
    setTemperatureValue: (value: number) =>
        set((state) => ({
            bed: { ...state.bed, temperatureValue: value }
        })),
    increaseTemperatureValue: () =>
        set((state) => ({
            bed: { ...state.bed, temperatureValue: state.bed.temperatureValue + 1 }
        })),
    decreaseTemperatureValue: () =>
        set((state) => ({
            bed: { ...state.bed, temperatureValue: state.bed.temperatureValue - 1 }
        })),
    toggleActive: () =>
        set((state) => ({
            bed: { ...state.bed, isActive: !state.bed.isActive }
        }))
}));



export const useLeftBed = useBedStore(true)
export const useRightBed = useBedStore(false)

