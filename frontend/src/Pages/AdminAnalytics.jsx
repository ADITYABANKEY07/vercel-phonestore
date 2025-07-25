import React from 'react'
import { useNavigate } from 'react-router-dom';

function AdminAnalytics() {
    const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div>
          <button
        onClick={() => navigate('/admin')}
        className="mb-4 px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        ← Back to Dashboard
      </button>
    AdminAnalytics
    </div>
  )
}

export default AdminAnalytics