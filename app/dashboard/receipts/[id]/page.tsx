import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ReceiptDetailClient from './ReceiptDetailClient'

export default async function ReceiptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Await params in Next.js 15
  const { id } = await params

  // Fetch receipt with items
  const { data: receipt } = await supabase
    .from('receipts')
    .select('*, receipt_items(*)')
    .eq('id', id)
    .eq('user_id', user!.id)
    .single()

  if (!receipt) {
    notFound()
  }

  return <ReceiptDetailClient receipt={receipt} />
}
