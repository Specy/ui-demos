<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { fade, fly } from "svelte/transition";


    export let price: number | undefined
    export let basePrice: number | undefined
    const dispatcher = createEventDispatcher<{setPrice: number, cancel: void}>()
</script>


<div class="overlay"
    in:fly={{y: -20}}
    out:fly={{y: -20}}
>
    <div class="content">
        What's the price?
        <input 
            placeholder={basePrice === undefined ? "New item" : basePrice.toString()}
            bind:value={price}
            class="price-input"
        />
        <div class="row">
            <button
                on:click={() => dispatcher("cancel")}
                class="button"
                style="background-color: transparent;"
            >
                Cancel
            </button>
            <button
                on:click={() => dispatcher("setPrice", basePrice ?? price ?? 0)}
                disabled={basePrice === undefined ? price <= 0 : false}
                class="button"
                style="background-color: #159393; font-weight: bold; color: white;"
            >
                Ok
            </button>
        </div>
    </div>
</div>



<style lang="scss">
    .row{
        display: flex;
        justify-content: space-between;

    }
    .button{
        background-color: red;
        border: none;
        flex: 1;
        max-width: 7rem;
        padding: 0.6rem 1rem;
        
        border-radius: 0.4rem;
        &:disabled{
            opacity: 0.8;
        }
    }
    .overlay{
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        backdrop-filter: blur(3px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .price-input{
        height: 2.5rem;
        padding: 0.4rem 1rem;
        border-radius: 0.3rem;
        border: solid 2px #666;
    }
    .content{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 90%;
        padding: 1rem;
        border-radius: 1rem;
        background-color:#d2d1d1;
        box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

        max-width: 30rem;
    }
</style>