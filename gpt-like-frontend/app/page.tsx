'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MainChat from '@/components/MainChat'
import AnalyticsPage from '@/components/AnalyticsPage'

type PageView = 'chat' | 'analytics'

export default function Home() {
  const [currentView, setCurrentView] = useState<PageView>('chat')
  const [currentChatId, setCurrentChatId] = useState<string | undefined>()

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId)
    setCurrentView('chat')
  }

  const handleNewChat = () => {
    setCurrentChatId(undefined)
    setCurrentView('chat')
  }

  const handleAnalyticsClick = () => {
    setCurrentView('analytics')
  }

  const handleBackToChat = () => {
    setCurrentView('chat')
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentChatId={currentChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        onAnalyticsClick={handleAnalyticsClick}
      />
      <main className="flex-1 flex flex-col">
        {currentView === 'chat' ? (
          <MainChat chatId={currentChatId} />
        ) : (
          <AnalyticsPage onBack={handleBackToChat} />
        )}
      </main>
    </div>
  )
}
