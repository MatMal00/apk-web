export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: IUserAddress;
    company: IUserCompany;
}

export interface IUserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

export interface IUserCompany {
    bs: string;
    catchPhrase: string;
    name: string;
}
