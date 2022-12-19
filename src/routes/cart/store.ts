import { browser } from "$app/environment";
import { get, writable } from "svelte/store";


export enum Status {
    None = "none",
    Checked = "checked",
}

export type CartItem = {
    id: number;
    name: string;
    quantity: number;
    price: number | null;
    estimatePrice: number;
    status: Status;
}
function createItem(name: string, estimatePrice: number, quantity: number): CartItem{
    return {
        id: Math.random(),
        name,
        quantity,
        price: null,
        estimatePrice,
        status: Status.None,
    }
}

function createCart(){
    const { subscribe, set, update } = writable<CartItem[]>([
        createItem("Mela", 0.5, 3),
        createItem("1Kg Penne integrali", 2, 1),
        createItem("Barretta di cioccolato agli arachidi", 1, 2),
        createItem("1L latte", 1.5, 1),
        createItem("Candeggina", 4, 1),
        createItem("Sacco spazzatura", 0.5, 2),
    ]);
    function checkOut(id: number, price: number){
        update((items) => {
            const item = items.find((item) => item.id === id);
            if(item){
                item.status = Status.Checked;
                item.price = price;
            }
            return items;
        });
        save();
    }
    function reset(id: number){
        update((items) => {
            const item = items.find((item) => item.id === id);
            if(item){
                item.status = Status.None;
                item.price = 0;
            }
            return items;
        });
    }
    function save(){
        const items = get({subscribe});
        localStorage.setItem("cart_demo", JSON.stringify(items));
    }

    function load(){
        const items = localStorage.getItem("cart_demo");
        if(items){
            set(JSON.parse(items));
        }
    }
    if(browser) load();
    return {
        subscribe,
        checkOut,
        reset,
    }
}


export const cart = createCart();