export interface Siminformation {
    id: string;
    adviceOfCharge: string;
    authenticationKey: string;
    mobileCountryCode: string;
    localAreaIdentity: string;
    pserviceProviderName: string;
    integratedCircuitCardId: string;
    valueAddedServices: string;
    createdDate: Date;
    createdUser: string;
    getSimInformation: () => void;
    editSimInfo: (row: any) => void;
    deleteSimInfo: (id: number) => void;
}
