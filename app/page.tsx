import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Receipt Scanner</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Upload, organize, and track your expenses with ease.
          <br />
          Automatically extract data from receipts using OCR technology.
        </p>

        <div className="flex gap-4 justify-center items-center flex-col sm:flex-row">
          <Link
            href="/auth/signup"
            className="bg-black text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/auth/login"
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Login
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Upload Receipts</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Take photos of your receipts and upload them instantly from any device.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Auto Extract Data</h3>
            <p className="text-gray-600 dark:text-gray-400">
              OCR technology automatically extracts merchant, date, and amount information.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Track Expenses</h3>
            <p className="text-gray-600 dark:text-gray-400">
              View all your expenses in one place with detailed analytics and reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
