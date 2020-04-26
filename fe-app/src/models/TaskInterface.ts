export interface Boomer {
    name: string;
    residence: {
        street: string;
        homeNumber: number;
        aptNumber?: number;
    };
    phoneNumber: string;
    due: string;
    listID: number;
}