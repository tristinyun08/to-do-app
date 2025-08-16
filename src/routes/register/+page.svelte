<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let name = ''; 
	let email = '';
	let password = '';
</script>

<h1>Create an account</h1>

<form on:submit|preventDefault={() => authClient.signUp.email({ name, email, password }, {
    onSuccess: () => goto('/')
})}>
	<label for="name">Name</label>
	<input type="text" bind:value={name} id="name" />

	<label for="email">Email</label>
	<input type="email" bind:value={email} id="email" />

	<label for="password">Password</label>
	<input type="password" bind:value={password} id="password" />
	
    <button>Continue</button>
</form>