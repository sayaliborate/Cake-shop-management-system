export class Register {
    email?: string;
    username?: string;
    password?: string;
    phone_number?: string;
    first_name?: string;
    last_name?: string;
    address?: string;
  }


  export interface Order {
    user?: number;
    item_name: string;
    quantity: number;
    price: number;
    payment_method: string;

  }
  
  export interface Cake {
    id?: number;                  // optional for new cakes
    name: string;
    description: string;
    price: number;
    flavor: string;
    weight: number;               // in kilograms
    is_available: boolean;
    stock: number;
    image?: string;               // optional image URL or path
    created_at?: Date;            // optional, backend-generated
  }
  

  export interface Feedback {
  id?: number;
  name: string;
  email: string;
  message: string;
  created_at?: string;  // optional, if backend sends timestamp
}
