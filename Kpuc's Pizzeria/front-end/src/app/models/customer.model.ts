export interface Customer {
    username: string,
    name: string,
    gender:string,
    email: string,
    phone: string,
    password: string,
    repeatPassword?: string,
    role: string
}