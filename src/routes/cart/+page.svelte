<script lang="ts">
	import { flip } from "svelte/animate";
	import { fade, slide } from "svelte/transition";
    import CartItem from "./CartItem.svelte";
    import { cart } from "./store";
</script>

<div class="page">
    <div class="page-content">
        <h1>Cart</h1>
        <div class="items-column">
            {#each $cart as item (item.id)}
            <div
                animate:flip={{duration: 200}}
                in:slide|local
                out:fade|local
            >
                    <CartItem {item} />
                </div>
            {/each}
        </div>
    </div>
</div>


<style lang="scss">
    .page{
        display: flex;
        height: 100%;
        background-color: #F6F4F3;
        color: rgb(28, 28, 28);
        flex-direction: column;
        align-items: center;
    }
    .page-content{
        display: flex;
        width: 100%;
        gap: 2rem;
        flex-direction: column;
        max-width: 50rem;
        padding: 1rem 2rem;
    }
    .items-column{
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>