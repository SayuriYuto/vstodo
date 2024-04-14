<script lang="ts">
    import { onMount } from "svelte";

    let todos: Array<{ text: string; completed: boolean }> = [];
    let text = "";
    onMount(() => {
        // Handle messages sent from the extension to the webview
        window.addEventListener("message", (event) => {
            const message = event.data; // The json data that the extension sent
            console.log({ message });
            switch (message.type) {
                case "add-todo":
                    todos = [
                        { text: message.value, completed: false },
                        ...todos,
                    ];
                    break;
            }
        });
    });
</script>

<div>VS TODO list</div>
<form
    on:submit|preventDefault={() => {
        todos = [{ text, completed: false }, ...todos];
        text = "";
    }}
>
    <input bind:value={text} />
</form>
<ul>
    {#each todos as todo (todo.text)}
        <li
            class:complete={todo.completed}
            on:click={() => {
                todo.completed = !todo.completed;
            }}
        >
            {todo.text}
        </li>
    {/each}
</ul>

<button
    on:click={() => {
        tsvscode.postMessage({
            type: "onInfo",
            value: "info Message",
        });
    }}>Click Me fro info</button
>

<button
    on:click={() => {
        tsvscode.postMessage({
            type: "onError",
            value: "Error Message",
        });
    }}>Click Me for error</button
>

<style>
    .complete {
        text-decoration: line-through;
    }
</style>
