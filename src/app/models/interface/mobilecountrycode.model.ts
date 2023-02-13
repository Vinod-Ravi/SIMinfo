export interface Mobilecountrycode {
    id: string;
    countryCode: string;
    countryName: string;
    codeName: string;
    getMobileCountryCode: () => void;
    editCountryCode: (row: any) => void;
    deleteCountryCode: (id: number) => void;
}
