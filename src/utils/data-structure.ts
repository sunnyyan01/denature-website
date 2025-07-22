interface Timeslot {
    start: number;
    interval: number;
    end: number;
}

interface Product {
    id: string;
    name: string;
    category: string;
    nutrition_info: {
        energy: number;
        fibre: number;
        protein: number;
    }
    main_grain: string;
    protein: string;
    vegetables: string;
    nsw_category: string;
    timeslots: Array<Timeslot>;
    price: number;
    price_id?: string,
}

interface Order {
    id: string;
    cart: Record<string, number>;
    cartTotal: number;
    timeslot: number;
    user_id: string;
    session_id: string;
    status: string;
}