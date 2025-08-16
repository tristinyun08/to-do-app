import { pgTable, text, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';
import type { Todo } from '../../types'; 

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name'),
	email: text('email').unique(),
	emailVerified: boolean('emailVerified').default(false),
	image: text('image'),
	createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
	updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow(),
	todos: jsonb('todos').$type<Todo[]>().default([])
});
