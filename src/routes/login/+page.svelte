<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
</script>

<h1>Sign in</h1>

<form on:submit|preventDefault={() => authClient.signIn.email({ email, password }, {
    onSuccess: () => goto('/')
})}>
	<label for="email">Email</label>
	<input type="email" bind:value={email} id="email" />
	<label for="password">Password</label>
	<input type="password" bind:value={password} id="password" />
	<button>Sign in</button>
</form>