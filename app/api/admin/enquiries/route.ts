'use server';

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') || '1');
  const pageSize = Number(url.searchParams.get('pageSize') || '10');
  const sortKey = url.searchParams.get('sortKey') || 'created_at';
  const sortOrder = url.searchParams.get('sortOrder') || 'desc';

  const normalizedPage = page < 1 ? 1 : page;
  const limit = pageSize === 0 ? 1000 : pageSize;
  const offset = (normalizedPage - 1) * limit;
  const supabase = getSupabase();

  const { data, count, error } = await supabase
    .from('enquiries')
    .select('*', { count: 'exact' })
    .order(sortKey, { ascending: sortOrder === 'asc' })
    .range(offset, offset + limit - 1);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data, count }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return new Response(JSON.stringify({ error: 'Missing enquiry id or status.' }), { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from('enquiries')
    .update({ status })
    .eq('id', id)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
