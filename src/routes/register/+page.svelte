<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let error = $state<string | null>(null);

	function handleSignUp() {
		error = null;
		authClient.signUp.email({ name, email, password }, {
			onSuccess: () => goto('/login'),
			onError: (ctx) => {
				error = ctx.error?.message ?? 'An unknown error occurred.';
			}
		});
	}
</script>

<div class="bg-[#e8d9cd] p-8 rounded-lg shadow-lg w-full max-w-sm">
	<h1 class="text-center text-[#333] text-2xl font-bold mb-6">Create an account</h1>

	<form onsubmit={handleSignUp}>
		<div class="mb-4">
			<label for="name" class="block text-[#333] mb-2">Name</label>
			<input
				type="text"
				bind:value={name}
				id="name"
				class="font-serif w-full p-2.5 border border-[#ddd] rounded bg-white"
			/>
		</div>
		<div class="mb-4">
			<label for="email" class="block text-[#333] mb-2">Email</label>
			<input
				type="email"
				bind:value={email}
				id="email"
				class="font-serif w-full p-2.5 border border-[#ddd] rounded bg-white"
			/>
		</div>
		<div class="mb-6">
			<label for="password" class="block text-[#333] mb-2">Password</label>
			<input
				type="password"
				bind:value={password}
				id="password"
				class="font-serif w-full p-2.5 border border-[#ddd] rounded bg-white"
			/>
		</div>

		{#if error}
			<p class="text-red-500 text-sm mb-4 text-center">{error}</p>
		{/if}

		<button
			type="submit"
			class="font-serif w-full py-2.5 px-4 bg-[#28a745] text-white rounded cursor-pointer hover:bg-[#218838] transition-colors"
		>
			Continue
		</button>
	</form>

	<p class="text-center text-sm text-gray-600 mt-4">
		Already have an account?
		<a href="/login" class="text-blue-500 hover:underline">Sign In</a>
	</p>
</div>