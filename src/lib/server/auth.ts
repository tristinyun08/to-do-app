import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db/index.js'; 
import { user } from './db/schema.js'; 
import type { InferSelectModel } from 'drizzle-orm';


type UserAttributes = InferSelectModel<typeof user>;

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	emailAndPassword: {
		enabled: true,
        autoSignIn: false
	},
	getUserAttributes: (attributes: UserAttributes) => {
		return {
			email: attributes.email,
			todos: attributes.todos
		};
	}
});