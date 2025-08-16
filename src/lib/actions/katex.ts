import katex from 'katex';

export function renderKatex(node: HTMLElement, text: string) {
	const render = (newText: string) => {
		if (!newText) {
			node.innerHTML = '';
			return;
		}
		node.innerHTML = newText.replace(/\$(.*?)\$/g, (match, latex) => {
			try {
				return katex.renderToString(latex, {
					throwOnError: false,
					displayMode: false
				});
			} catch (e) {
				return match;
			}
		});
	};

	render(text);

	return {
		update(newText: string) {
			render(newText);
		}
	};
}