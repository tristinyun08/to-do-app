import { json, error } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session) {
		error(401, 'Unauthorized');
	}

	const { todos } = await request.json();

	try {
		await db.update(user).set({ todos }).where(eq(user.id, session.user.id));
	} catch (e) {
		error(500, 'Failed to save todos');
	}

	return json({ success: true });
};