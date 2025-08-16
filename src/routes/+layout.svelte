<script>
	import 'katex/dist/katex.min.css';
	
	import '../app.css';

	let { children } = $props();
</script>

<div class="font-serif min-h-screen bg-[#bba58f] flex items-center justify-center p-4">
	{@render children()}
</div>