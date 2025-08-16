import type { Todo } from '$lib/types';

declare global {
	namespace App {

		interface Locals {
			user: import('better-auth').User | null;
			session: import('better-auth').Session | null;
		}
	
	}

	namespace BetterAuth {
		interface UserAttributes {
			email: string;
			todos: Todo[];
		}
	}
}

export {};