'use client'

import { useState, useEffect } from 'react'
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
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  
  // 用户使用统计
  const [userStats, setUserStats] = useState({
    totalUsers: 1, // 当前用户
    totalMessages: 0,
    averageMessagesPerUser: 0,
    lastLogin: new Date(),
    subscriptionType: '免费版'
  })
  
  // 实时更新统计信息
  useEffect(() => {
    const allMessages = chatHistory.flatMap(chat => chat.messages)
    const userMessages = allMessages.filter(msg => msg.role === 'user')
    
    setUserStats(prev => ({
      ...prev,
      totalMessages: allMessages.length,
      averageMessagesPerUser: allMessages.length / prev.totalUsers
    }))
  }, [chatHistory])

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

  // 删除聊天
  const deleteChat = (chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId))
    
    // 如果删除的是当前聊天，切换到新建聊天
    if (currentChatId === chatId) {
      setCurrentChatId(undefined)
      setChatKey(prev => prev + 1)
    }
    
    console.log('删除聊天:', chatId)
  }

  // 获取真实的分析数据
  const getRealAnalyticsData = () => {
    const allMessages = chatHistory.flatMap(chat => chat.messages)
    const userMessages = allMessages.filter(msg => msg.role === 'user')
    const assistantMessages = allMessages.filter(msg => msg.role === 'assistant')
    
    // 计算Token使用量（简单估算）
    const totalTokens = allMessages.reduce((sum, msg) => {
      return sum + Math.ceil(msg.content.length / 4) // 粗略估算：4个字符约等于1个token
    }, 0)
    
    // 获取最近的消息
    const recentMessages = allMessages
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10)
      .map(msg => ({
        id: msg.id,
        user_id: 'current-user',
        content: msg.content,
        role: msg.role,
        created_at: msg.timestamp.toISOString(),
        tokens_used: Math.ceil(msg.content.length / 4)
      }))
    
    return {
      totalUsers: userStats.totalUsers,
      totalMessages: userStats.totalMessages,
      averageMessagesPerUser: userStats.averageMessagesPerUser,
      topUsers: [{
        id: 'current-user',
        name: '当前用户',
        email: 'user@example.com',
        created_at: userStats.lastLogin.toISOString().split('T')[0],
        last_login: userStats.lastLogin.toISOString().split('T')[0],
        total_messages: userMessages.length,
        subscription_type: userStats.subscriptionType
      }],
      recentMessages: recentMessages
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentChatId={currentChatId}
        chatHistory={chatHistory}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        onDeleteChat={deleteChat}
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
          <AnalyticsPage 
            onBack={handleBackToChat} 
            analyticsData={getRealAnalyticsData()}
          />
        )}
      </main>
    </div>
  )
}
