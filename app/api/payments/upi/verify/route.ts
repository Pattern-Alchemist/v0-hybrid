import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
export async function POST(req: NextRequest){ const { utr } = await req.json(); const { data: order, error } = await supabase.from('orders').insert({ product:'karmic_snapshot', amount:9900, currency:'INR', channel:'upi', external_id: utr, status:'paid' }).select().single(); if(error) return NextResponse.json({ error: error.message }, { status: 400 }); return NextResponse.json({ order_id: order.id }) }
