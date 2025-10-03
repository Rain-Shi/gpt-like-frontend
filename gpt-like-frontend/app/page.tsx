'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MainChat from '@/components/MainChat'
import AnalyticsPage from '@/components/AnalyticsPage'

type PageView = 'chat' | 'analytics'

export default function Home() {
  const [currentView, setCurrentView] = useState<PageView>('chat')
  const [currentChatId, setCurrentChatId] = useState<string | undefined>()
  const [chatKey, setChatKey] = useState(0) // 添加key来强制重新渲染

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId)
    setCurrentView('chat')
  }

  const handleNewChat = () => {
    setCurrentChatId(undefined)
    setCurrentView('chat')
    setChatKey(prev => prev + 1) // 强制重新渲染MainChat组件
    console.log('新建聊天按钮被点击 - 重置聊天状态')
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
          <MainChat key={chatKey} chatId={currentChatId} />
        ) : (
          <AnalyticsPage onBack={handleBackToChat} />
        )}
      </main>
    </div>
  )
}
