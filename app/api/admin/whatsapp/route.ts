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
  const range = url.searchParams.get('range') || '7';
  const limit = pageSize === 0 ? 1000 : pageSize;
  const offset = (page - 1) * limit;
  const supabase = getSupabase();
  let fromDate: string | null = null;
  if (range !== 'all') {
    // Analytics use the India calendar day because the site operates in IST.
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const istToday = new Date(Date.now() + istOffsetMs);
    istToday.setUTCHours(0, 0, 0, 0);
    istToday.setUTCDate(istToday.getUTCDate() - (Number(range) - 1));
    fromDate = new Date(istToday.getTime() - istOffsetMs).toISOString();
  }
  let query = supabase.from('whatsapp_clicks').select('*', { count: 'exact' });
  let pageQuery = supabase.from('whatsapp_clicks').select('page_url');

  if (fromDate) {
    query = query.gte('created_at', fromDate);
    pageQuery = pageQuery.gte('created_at', fromDate);
  }

  const [{ data, count, error }, { data: pageRows, error: pageError }] = await Promise.all([
    query.order(sortKey, { ascending: sortOrder === 'asc' }).range(offset, offset + limit - 1),
    pageQuery,
  ]);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  if (pageError) return Response.json({ error: pageError.message }, { status: 500 });

  const pageCounts = (pageRows ?? []).reduce<Record<string, number>>((counts, row) => {
    const page = row.page_url || 'Unknown page';
    counts[page] = (counts[page] || 0) + 1;
    return counts;
  }, {});
  const [topPageEntry] = Object.entries(pageCounts).sort(([, first], [, second]) => second - first);
  const topPage = topPageEntry?.[0] || null;
  const topPageCount = topPageEntry?.[1] || 0;

  return Response.json({ data, count, topPage, topPageCount });
}
