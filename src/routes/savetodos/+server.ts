import { json, error } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session) {
		console.error('SAVE FAILED: No active session.');
		error(401, 'Unauthorized');
	}

	try {
		const { todos } = await request.json();
		
		console.log(`Received todos for user ${session.user.id}:`, todos);

		await db.update(user).set({ todos }).where(eq(user.id, session.user.id));

		console.log(`Successfully saved todos for user ${session.user.id}.`);
		
		return json({ success: true });

	} catch (e) {
		console.error('DATABASE SAVE FAILED:', e);
		error(500, 'Failed to save todos to the database.');
	}
};