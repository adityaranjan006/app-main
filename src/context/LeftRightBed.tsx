import React, { createContext, useContext, ReactNode, useState } from "react";

interface MyBedContextType {
    leftValue: number;
    rightValue: number;
    leftActive: boolean;
    rightActive: boolean;
    setLeftValue: (value: number) => void;
    setRightValue: (value: number) => void;
    setLeftActive: (value: boolean) => void;
    setRightActive: (value: boolean) => void;
}

const MyBedContext = createContext<MyBedContextType | undefined>(undefined);

export const MyBedContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [leftValue, setLeftValue] = useState<number>(0);
    const [rightValue, setRightValue] = useState<number>(0);
    const [leftActive, setLeftActive] = useState<boolean>(false);
    const [rightActive, setRightActive] = useState<boolean>(false);


    return (
        <MyBedContext.Provider value={{ leftValue, rightValue, leftActive, rightActive, setLeftValue, setRightValue, setLeftActive, setRightActive }}>
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
