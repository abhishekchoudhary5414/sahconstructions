'use server';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type EnquiryPayload = {
  name: string;
  phone: string;
  service: string;
};

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as EnquiryPayload;
  const { name, phone, service } = payload;

  if (!name?.trim() || !phone?.trim() || !service?.trim()) {
    return NextResponse.json({ error: 'Name, phone and service are required.' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase.from('enquiries').insert([{ name, phone, service, status: 'New' }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
