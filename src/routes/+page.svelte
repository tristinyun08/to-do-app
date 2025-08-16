<script lang="ts">
	import type { Todo } from '$lib/types';
	import type { PageData } from './$types';
	import { renderKatex } from '$lib/actions/katex';
  import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	function startEditing(index: number) {
		const todo = todos[index];
		if (todo) {
			const newText = prompt('Edit your to-do:', todo.text);
			if (newText !== null && newText.trim() !== '') {
				todo.text = newText.trim();
			}
		}
	}

	function clearCompleted() {
		todos = todos.filter((todo) => !todo.completed);
	}

  interface UserWithTodos {
		id: string;
		todos: Todo[];
		email: string | null | undefined;
	}

	let { data }: { data: { user: UserWithTodos | null } } = $props();


	let todos = $state<Todo[]>(data.user?.todos || []);
	let newTodoText = $state('');

	$effect(() => {
		if (todos !== data.user?.todos) {
			fetch('/savetodos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ todos })
			});
		}
	});

	function addTodo() {
		const trimmedText = newTodoText.trim();
		if (trimmedText) {
			todos.push({
				id: crypto.randomUUID(),
				text: trimmedText,
				completed: false
			});
			newTodoText = '';
		}
	}

	function deleteTodo(id: string) {
		const index = todos.findIndex((todo) => todo.id === id);
		if (index !== -1) {
			todos.splice(index, 1);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			addTodo();
		}
	}
</script>


<div class="bg-[#e8d9cd] p-5 rounded-lg shadow-lg w-full max-w-md">
  <div class="flex justify-between items-center mb-4">
    <p class="text-sm text-stone-700 truncate">Signed in as {data.user?.email}</p>
    <button
      class="font-serif text-sm text-blue-600 hover:underline flex-shrink-0 ml-4"
      onclick={() => authClient.signOut({
          fetchOptions: {
            onSuccess: () => goto('/login')
          }
        })}
    >
      Sign Out
    </button>
  </div>
  <hr class="border-stone-400 mb-5" />

  <h1 class="text-center text-[#333] text-3xl font-bold my-5">To-Do List</h1>
  <div class="flex mb-5">
    <input
      type="text"
      placeholder="Add a new to-do..."
      class="font-serif flex-grow p-2.5 border border-[#ddd] rounded-l text-base bg-white"
      bind:value={newTodoText}
      onkeydown={handleKeydown}
    />
    <button
      class="font-serif py-2.5 px-4 bg-[#28a745] text-white rounded-r cursor-pointer ml-2.5 border-none text-base hover:bg-[#218838] transition-colors"
      onclick={addTodo}
    >
      Add
    </button>
  </div>
  <ul class="list-none p-0 m-0">
    {#each todos as todo, index (todo.id)}
      <li class="font-serif bg-[#eee] p-2.5 mb-2.5 rounded flex items-center">
        <input
          type="checkbox"
          class="mr-2.5 accent-[#28a745]"
          bind:checked={todo.completed}
        />
        <span
          class="flex-grow"
          class:line-through={todo.completed}
          class:text-[#888]={todo.completed}
          use:renderKatex={todo.text}
        >
          {todo.text}
        </span>
        <button
          class="font-serif py-1 px-2.5 bg-blue-500 text-white rounded cursor-pointer ml-auto mr-1 border-none text-sm hover:bg-blue-600 transition-colors"
          onclick={() => startEditing(index)}
        >
          Edit
        </button>
        <button
          class="font-serif py-1 px-2.5 bg-[#dc3545] text-white rounded cursor-pointer ml-1 border-none text-sm hover:bg-[#c82333] transition-colors"
          onclick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </li>
    {/each}
  </ul>
  {#if todos.length > 0 && todos.some(t => t.completed)}
          <hr class="border-stone-300 my-4" />
          <div class="text-center">
              <button
                  class="font-serif py-2 px-4 bg-gray-500 text-white rounded cursor-pointer text-sm hover:bg-gray-600 transition-colors"
                  onclick={clearCompleted}
              >
                  Clear Completed
              </button>
          </div>
      {/if}
</div>
