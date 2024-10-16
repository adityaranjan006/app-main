export interface BedInterface {
    setValue: (value: number) => void;
    changeActive: () => void;
    increaseTemperature: () => void;
    decreaseTemperature: () => void;
}

export class BedMatress implements BedInterface {
    public temperatureVal: number;
    public isActive: boolean;
    public isLeftSide: boolean;
    public id: number;

    constructor(isLeftSide: boolean, otherBed?: BedMatress) {
        this.isLeftSide = isLeftSide;

        if (otherBed) {
            this.id = otherBed.id;
            this.temperatureVal = otherBed.temperatureVal;
            this.isActive = otherBed.isActive;
            this.isLeftSide = otherBed.isLeftSide;
        } else {
            this.id = 1;
            this.temperatureVal = 0;
            this.isActive = false;
            this.isLeftSide = isLeftSide;
        }
    }

    setValue(value: number): void {
        this.temperatureVal = value;
    }


    changeActive(): void {
        this.isActive = !this.isActive;
    }

    increaseTemperature(): void {
        this.temperatureVal += 1;
    }

    decreaseTemperature(): void {
        this.temperatureVal -= 1;
    }

    public getTemperatureVal(): number {
        return this.temperatureVal;
    }

    public getIsActive(): boolean {
        return this.isActive;
    }

    public getIsLeftSide(): boolean {
        return this.isLeftSide;
    }
    public getState() {
        return {
            temperatureVal: this.temperatureVal,
            isActive: this.isActive,
            isLeftSide: this.isLeftSide
        };
    }
}






