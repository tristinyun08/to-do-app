import { pgTable, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

import type { Todo } from '../../types';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name'), 
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	todos: jsonb('todos').$type<Todo[]>().default([])
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id)
});

export const account = pgTable('account', {
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	providerId: text('provider_id').notNull(),
	accountId: text('account_id').notNull(),
	password: text('password'),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at', {
		withTimezone: true,
		mode: 'date'
	})
});

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow()
});