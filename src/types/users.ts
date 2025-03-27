export type User = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
    birthDate: string;
    image: string;
    address?: {
        address: string;
        city: string;
        state: string;
        stateCode: string;
        postalCode: string;
        country: string;
    } | null;
};
