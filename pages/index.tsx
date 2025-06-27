// pages/index.tsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import Image from 'next/image'

const blurVariants = {
  hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(8px)',
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<null | 'nutrition' | 'mindfulness'>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white relative px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-red-600">Welcome to LEAD Hub</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
        <MenuCard
          title="🍽️ Nutrition"
          description="Explore healthy recipes and food guides."
          onClick={() => setSelected('nutrition')}
        />
        <MenuCard
          title="🧘 Mindfulness"
          description="Calm your mind with guided meditations."
          onClick={() => setSelected('mindfulness')}
        />
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            variants={blurVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-2">
                {selected === 'nutrition' ? 'Nutrition & Recipes' : 'Mindfulness & Meditation'}
              </h2>
              <p className="text-gray-600 mb-6">
                {selected === 'nutrition'
                  ? 'Discover meal ideas and build healthy habits.'
                  : 'Relax and focus with breathing and calmness exercises.'}
              </p>
              <button
                onClick={() => {
                  window.location.href = `/auth?redirect=/${selected}`
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function MenuCard({
  title,
  description,
  onClick,
}: {
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-300 rounded-xl p-6 shadow hover:shadow-md transition text-left"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </button>
  )
}
