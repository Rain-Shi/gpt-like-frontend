'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MainChat from '@/components/MainChat'
import AnalyticsPage from '@/components/AnalyticsPage'

type PageView = 'chat' | 'analytics'

interface ChatHistory {
  id: string
  title: string
  timestamp: Date
}

export default function Home() {
  const [currentView, setCurrentView] = useState<PageView>('chat')
  const [currentChatId, setCurrentChatId] = useState<string | undefined>()
  const [chatKey, setChatKey] = useState(0) // 添加key来强制重新渲染
  
  // 聊天历史状态管理
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { id: '1', title: '如何学习React', timestamp: new Date('2024-01-15') },
    { id: '2', title: 'TypeScript最佳实践', timestamp: new Date('2024-01-14') },
    { id: '3', title: 'Next.js项目结构', timestamp: new Date('2024-01-13') },
    { id: '4', title: 'Tailwind CSS样式', timestamp: new Date('2024-01-12') },
    { id: '5', title: '数据库设计', timestamp: new Date('2024-01-11') },
  ])

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId)
    setCurrentView('chat')
  }

  const handleNewChat = () => {
    // 生成新的聊天ID
    const newChatId = Date.now().toString()
    
    // 添加到聊天历史
    const newChat: ChatHistory = {
      id: newChatId,
      title: '新对话',
      timestamp: new Date()
    }
    setChatHistory(prev => [newChat, ...prev])
    
    // 设置为当前聊天
    setCurrentChatId(newChatId)
    setCurrentView('chat')
    setChatKey(prev => prev + 1) // 强制重新渲染MainChat组件
    console.log('新建聊天按钮被点击 - 创建新聊天:', newChatId)
  }

  const handleAnalyticsClick = () => {
    setCurrentView('analytics')
  }

  const handleBackToChat = () => {
    setCurrentView('chat')
  }

  // 更新聊天标题的函数
  const updateChatTitle = (chatId: string, title: string) => {
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === chatId ? { ...chat, title } : chat
      )
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentChatId={currentChatId}
        chatHistory={chatHistory}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        onAnalyticsClick={handleAnalyticsClick}
      />
      <main className="flex-1 flex flex-col">
        {currentView === 'chat' ? (
          <MainChat 
            key={chatKey} 
            chatId={currentChatId} 
            onUpdateTitle={updateChatTitle}
          />
        ) : (
          <AnalyticsPage onBack={handleBackToChat} />
        )}
      </main>
    </div>
  )
}
