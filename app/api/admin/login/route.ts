'use server';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type LoginPayload = {
  username?: string;
  password?: string;
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
  const payload = (await request.json()) as LoginPayload;
  const username = payload.username?.trim();
  const password = payload.password?.trim();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set({
    name: 'admin_session',
    value: username,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24
  });

  return response;
}
