import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";
import { BedMatress } from "../classMattress";

interface MyBedContextType {
    leftBed: BedMatress;
    rightBed: BedMatress;
    incTemperature: (bed: BedMatress) => void;
    decTemperature: (bed: BedMatress) => void;
    toggleActive: (bed: BedMatress) => void;
    updateBed: (bed: BedMatress) => void;
    setTemperature: (bed: BedMatress, value: number) => void;
}

const MyBedContext = createContext<MyBedContextType | undefined>(undefined);

export const MyBedContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [leftBed, setLeftBed] = useState(() => new BedMatress(true));
    const [rightBed, setRightBed] = useState(() => new BedMatress(false));

    const updateBed = useCallback((bed: BedMatress) => {
        if (bed.getIsLeftSide()) {
            setLeftBed(prevBed => {
                const newBed = new BedMatress(true, bed);
                console.log('Updated left bed state:', newBed.getState());
                return newBed;
            });
        } else {
            setRightBed(prevBed => {
                const newBed = new BedMatress(false, bed);
                console.log('Updated right bed state:', newBed.getState());
                return newBed;
            });
        }
    }, []);

    const incTemperature = useCallback((bed: BedMatress) => {
        bed.increaseTemperature();
        updateBed(bed);
    }, [updateBed]);

    const decTemperature = useCallback((bed: BedMatress) => {
        bed.decreaseTemperature();
        updateBed(bed);
    }, [updateBed]);

    const toggleActive = useCallback((bed: BedMatress) => {
        bed.changeActive();
        updateBed(bed);
    }, [updateBed]);

    const setTemperature = useCallback((bed: BedMatress, value: number) => {
        bed.setValue(value);
        updateBed(bed);
    }, [updateBed]);

    return (
        <MyBedContext.Provider value={{ leftBed, rightBed, incTemperature, decTemperature, toggleActive, updateBed, setTemperature }}>
            {children}
        </MyBedContext.Provider>
    );
};

export const useMyBedContext = () => {
    const context = useContext(MyBedContext);
    if (!context) {
        throw new Error("useMyBedContext must be used within a MyBedContextProvider");
    }
    return context;
};
