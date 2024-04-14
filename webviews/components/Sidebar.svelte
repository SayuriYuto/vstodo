<script lang="ts">
  let todos: Array<{ text: string; completed: boolean }> = [];
  let text = "";
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
      command: "onInfo",
      text: "info Message",
    });
  }}>Click Me fro info</button
>

<button
  on:click={() => {
    tsvscode.postMessage({
      command: "onError",
      text: "Error Message",
    });
  }}>Click Me for error</button
>

<style>
  .complete {
    text-decoration: line-through;
  }
</style>
