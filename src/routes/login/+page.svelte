<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let error = $state<string | null>(null);

	function handleSignIn() {
		error = null;
		authClient.signIn.email({ email, password }, {
			onSuccess: () => goto('/'),
			onError: (ctx) => {
				// The error from the API is on `ctx.error`
				error = ctx.error?.message ?? 'An unknown error occurred.';
			}
		});
	}
</script>

<div class="bg-[#e8d9cd] p-8 rounded-lg shadow-lg w-full max-w-sm">
	<h1 class="text-center text-[#333] text-2xl font-bold mb-6">Sign In</h1>

	<form onsubmit={handleSignIn}>
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
		Don't have an account?
		<a href="/register" class="text-blue-500 hover:underline">Sign Up</a>
	</p>
</div>