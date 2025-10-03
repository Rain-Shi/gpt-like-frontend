'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MainChat from '@/components/MainChat'
import AnalyticsPage from '@/components/AnalyticsPage'

type PageView = 'chat' | 'analytics'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface ChatHistory {
  id: string
  title: string
  timestamp: Date
  messages: Message[]
}

export default function Home() {
  const [currentView, setCurrentView] = useState<PageView>('chat')
  const [currentChatId, setCurrentChatId] = useState<string | undefined>()
  const [chatKey, setChatKey] = useState(0) // 添加key来强制重新渲染
  
  // 聊天历史状态管理
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { 
      id: '1', 
      title: '如何学习React', 
      timestamp: new Date('2024-01-15'),
      messages: [
        { id: '1-1', content: '你好！我是你的AI助手，有什么可以帮助你的吗？', role: 'assistant', timestamp: new Date('2024-01-15') },
        { id: '1-2', content: '如何学习React？', role: 'user', timestamp: new Date('2024-01-15') },
        { id: '1-3', content: '学习React可以从基础开始...', role: 'assistant', timestamp: new Date('2024-01-15') }
      ]
    },
    { 
      id: '2', 
      title: 'TypeScript最佳实践', 
      timestamp: new Date('2024-01-14'),
      messages: [
        { id: '2-1', content: '你好！我是你的AI助手，有什么可以帮助你的吗？', role: 'assistant', timestamp: new Date('2024-01-14') },
        { id: '2-2', content: 'TypeScript有什么最佳实践？', role: 'user', timestamp: new Date('2024-01-14') }
      ]
    },
    { 
      id: '3', 
      title: 'Next.js项目结构', 
      timestamp: new Date('2024-01-13'),
      messages: [
        { id: '3-1', content: '你好！我是你的AI助手，有什么可以帮助你的吗？', role: 'assistant', timestamp: new Date('2024-01-13') }
      ]
    },
    { 
      id: '4', 
      title: 'Tailwind CSS样式', 
      timestamp: new Date('2024-01-12'),
      messages: [
        { id: '4-1', content: '你好！我是你的AI助手，有什么可以帮助你的吗？', role: 'assistant', timestamp: new Date('2024-01-12') }
      ]
    },
    { 
      id: '5', 
      title: '数据库设计', 
      timestamp: new Date('2024-01-11'),
      messages: [
        { id: '5-1', content: '你好！我是你的AI助手，有什么可以帮助你的吗？', role: 'assistant', timestamp: new Date('2024-01-11') }
      ]
    },
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
      timestamp: new Date(),
      messages: []
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

  // 保存消息到聊天历史
  const saveMessage = (chatId: string, message: Message) => {
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    )
  }

  // 获取当前聊天的消息
  const getCurrentChatMessages = (chatId?: string): Message[] => {
    if (!chatId) return []
    const chat = chatHistory.find(c => c.id === chatId)
    return chat?.messages || []
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
            initialMessages={getCurrentChatMessages(currentChatId)}
            onUpdateTitle={updateChatTitle}
            onSaveMessage={saveMessage}
          />
        ) : (
          <AnalyticsPage onBack={handleBackToChat} />
        )}
      </main>
    </div>
  )
}
