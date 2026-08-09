 'use server';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type Payload = {
  href?: string;
  page_url?: string | null;
  browser?: string;
  user_agent?: string | null;
};

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Payload;
  const { href, page_url, browser, user_agent } = payload;

  if (!href) {
    return NextResponse.json({ error: 'Missing href' }, { status: 400 });
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('whatsapp_clicks').insert([
      { href, page_url, browser, user_agent }
    ]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
