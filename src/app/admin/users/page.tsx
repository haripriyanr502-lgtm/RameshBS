import { redirect } from 'next/navigation';
import { getSession } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login?from=/admin/users');
  }

  if (session.role !== 'owner' && session.role !== 'admin') {
    redirect('/admin/dashboard?denied=users');
  }

  redirect('/admin/dashboard?tab=users');
}
