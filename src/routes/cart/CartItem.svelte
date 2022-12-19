<script lang="ts">
    import type { CartItem } from "./store";
    export let item: CartItem;
    let x = 0;
    let max = 100;
    let isDragging = false;

    function clamp(x: number, min: number, max: number) {
        return Math.min(Math.max(x, min), max);
    }
</script>



<div class="cart-item"
on:pointerdown={(e) => {
    max = e.currentTarget.clientWidth / 1.5;
    e.preventDefault();
    isDragging = true;
}}
on:pointerleave={(e) => {
    e.preventDefault();
    isDragging = false;
    x = 0;
}}
on:pointerup={(e) => {
    isDragging = false;
    x = 0;
}}
on:pointermove={(e) => {
    console.log(isDragging)
    if (!isDragging) return;
    e.preventDefault();
    x += e.movementX;
}}
>
    <div 
        class="draggable"
        class:isDragging
        style="transform: translateX({clamp(x, -max, max)}px)"
    >
        <div class="name" >
            {item.name}
        </div>
    </div>
    <div
        class="bg"
        class:isDragging

        class:left={x < 0}
    >
        Confirm
    </div>
</div>


<style lang="scss">
    .name{

    }

    .draggable{
        position: absolute;
        transition: all 0.2s ease-in-out;
        display: flex;
        align-items: center;
        padding: 0.8rem 2rem;    
        background-color: #d4d4d4;
        touch-action: none;
        width: 100%;
        height: 100%;
        z-index: 10;
        top: 0;
        left: 0;
         &.isDragging{
            filter: brightness(0.95);
            transition: none;
        }
    }

    .cart-item{
        display: flex;
        position: relative;
        height: 4rem;
        overflow: hidden;
        width: 100%;
        border-radius: 0.8rem;
    }
    .bg{
        position: absolute;
        display: flex;
        align-items: center;
        padding: 0.8rem;
        width: 100%;
        height: 100%;
        top: 0;
        transition: all 0.4s ease-in-out;
        left: 0;
        &.isDragging{
            transition: none;
        }
    }
    .left{
        background-color: rgb(74, 142, 74);
        color: white;
        justify-content: flex-end;
        
    }   
</style>