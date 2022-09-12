export interface Customer {
  id?: number | string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
}

export interface CustomerEndpoint {
  users: Customer[];
}
