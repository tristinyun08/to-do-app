<script lang="ts">
	let todos = $state<{ text: string; completed: boolean }[]>([]);
	let newTodoText = $state('');

	function addTodo() {
		const trimmedText = newTodoText.trim();
		if (trimmedText) {
			todos.push({ text: trimmedText, completed: false });
			newTodoText = '';
		}
	}

    function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			addTodo();
		}
	}

    function deleteTodo(index: number) {
		todos.splice(index, 1);
	}
    
    $effect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('todos', JSON.stringify(todos));
		}
	});

</script>

<div class="font-serif min-h-screen bg-[#bba58f] flex items-center justify-center p-4">
	<div class="bg-[#e8d9cd] p-5 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-center text-[#333] text-3xl font-bold my-5">To-Do List</h1>
        <div class="flex mb-5">
            <input
                type="text"
                placeholder="Add a new to-do..."
                class="flex-grow p-2.5 border border-[#ddd] rounded-l text-base bg-white"
                bind:value={newTodoText}
                onkeydown={handleKeydown}
            />
            <button
                class="py-2.5 px-4 bg-[#28a745] text-white rounded-r cursor-pointer ml-2.5 border-none text-base hover:bg-[#218838] transition-colors"
                onclick={addTodo}
            >
            Add
        </button>
        </div>
        <ul class="list-none p-0 m-0">
            {#each todos as todo, index (todo.text)}
                <li class="bg-[#eee] p-2.5 mb-2.5 rounded flex items-center">
                    <input type="checkbox" 
                    class="mr-2.5 accent-[#28a745]" 
                    bind:checked={todo.completed}
                    />
                    <span 
                    class="flex-grow"
                    class:line-through={todo.completed}
                    class:text-[#888]={todo.completed}
                >
                    {todo.text}
                </span>
                    <button 
                        class="py-1 px-2.5 bg-[#dc3545] text-white rounded cursor-pointer ml-1 border-none text-sm hover:bg-[#c82333] transition-colors">
                        onclick={() => deleteTodo(index)}
                    
                        Delete
                    </button>
                </li>
	        {/each}
        </ul>
	</div>
</div>