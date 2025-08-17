import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		redirect(302, '/login');
	}

	// Fetch the user with todos from the database
	const userData = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1);
	const userWithTodos = userData[0];

	return {
		user: userWithTodos || session.user
	};
};