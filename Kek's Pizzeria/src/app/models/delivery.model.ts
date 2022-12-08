export interface DeliveryModel {
    fname: string;
    lname: string;
    companyname?: string;
    town: string;
    district: string;
    street: string;
    apartment: string;
    postcode: number;
    phone: number;
    email: string;
    ordereditems: string;
    price: number;
    notes?: string;
    cashorvisa: boolean;
    cardnumber?: number;
    cardholder?: string;
    expirymonth?: number;
    expiryyear?: number;
    securitycode?: number;
    tandc: boolean;
}