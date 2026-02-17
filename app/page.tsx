'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Bookmark = {
  id: number
  title: string
  url: string
  user_id: string
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  // ================= AUTH =================
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://smart-bookmark-appriya.vercel.app?_vercel_share=DKo07BSKFUf33desQoYirpECvK6cawhT',
      },
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  // ================= FETCH + REALTIME =================
  useEffect(() => {
    if (!user) return

    // Initial fetch
    fetchBookmarks()

    // Realtime subscription
    const channel = supabase
      .channel('realtime-bookmarks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchBookmarks()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('id', { ascending: false })

    if (!error) {
      setBookmarks(data || [])
    }
  }

  // ================= ADD =================
  const addBookmark = async () => {
    if (!title || !url) return

    const { error } = await supabase.from('bookmarks').insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ])

    if (!error) {
      setTitle('')
      setUrl('')
    }
  }

  // ================= DELETE =================
  const deleteBookmark = async (id: number) => {
    await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
  }

  // ================= UI =================

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <button
          onClick={signInWithGoogle}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Smart Bookmark App 🚀</h1>
        <button
          onClick={signOut}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Add Form */}
      <div className="flex flex-col gap-3 mb-8">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={addBookmark}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Bookmark
        </button>
      </div>

      {/* Bookmark List */}
      <div className="space-y-4">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{bookmark.title}</h2>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {bookmark.url}
            </a>
            <div className="mt-2">
              <button
                onClick={() => deleteBookmark(bookmark.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
