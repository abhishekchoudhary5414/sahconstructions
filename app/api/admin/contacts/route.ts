'use server';

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase environment variables.');
  return createClient(url, key);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get('page') || '1'));
  const pageSize = Number(url.searchParams.get('pageSize') || '10');
  const sortKey = url.searchParams.get('sortKey') || 'created_at';
  const sortOrder = url.searchParams.get('sortOrder') || 'desc';
  const limit = pageSize === 0 ? 1000 : pageSize;
  const offset = (page - 1) * limit;
  const { data, count, error } = await getSupabase().from('contacts').select('*', { count: 'exact' }).order(sortKey, { ascending: sortOrder === 'asc' }).range(offset, offset + limit - 1);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data, count });
}

export async function PATCH(request: Request) {
  const { id, status } = await request.json();
  if (!id || !status) return Response.json({ error: 'Missing contact id or status.' }, { status: 400 });
  const { error } = await getSupabase().from('contacts').update({ status }).eq('id', id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
