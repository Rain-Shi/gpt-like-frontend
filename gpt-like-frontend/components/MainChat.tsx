'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Bot, User, Loader2 } from 'lucide-react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface MainChatProps {
  chatId?: string
  initialMessages?: Message[]
  onUpdateTitle?: (chatId: string, title: string) => void
  onSaveMessage?: (chatId: string, message: Message) => void
}

export default function MainChat({ chatId, initialMessages, onUpdateTitle, onSaveMessage }: MainChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 根据chatId加载不同的聊天历史
  useEffect(() => {
    console.log('MainChat: chatId changed to:', chatId)
    if (chatId && initialMessages) {
      // 加载聊天历史消息
      setMessages(initialMessages)
      console.log('MainChat: Loaded messages for chatId:', chatId, 'messages count:', initialMessages.length)
    } else {
      // 新建聊天时清空消息和输入框
      setMessages([])
      setInput('')
      setIsLoading(false)
      console.log('MainChat: Cleared messages for new chat - messages cleared, input cleared, loading stopped')
    }
  }, [chatId, initialMessages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    }

      // 检查是否是第一条用户消息（在添加消息之前）
      const isFirstUserMessage = messages.length === 0
      
      setMessages(prev => [...prev, userMessage])
      setInput('')
      setIsLoading(true)

      // 保存用户消息到聊天历史
      if (chatId && onSaveMessage) {
        onSaveMessage(chatId, userMessage)
      }

      // 如果是第一条用户消息，更新聊天标题
      if (isFirstUserMessage && chatId && onUpdateTitle) {
        const title = userMessage.content.length > 20 
          ? userMessage.content.substring(0, 20) + '...' 
          : userMessage.content
        onUpdateTitle(chatId, title)
        console.log('更新聊天标题:', title)
      }

    try {
      // 准备发送给OpenAI的消息格式
      const messagesForAPI = [
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        {
          role: 'user',
          content: userMessage.content
        }
      ]

      // 调用我们的API路由
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messagesForAPI }),
      })

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date()
      }

        setMessages(prev => [...prev, assistantMessage])
        
        // 保存AI回复到聊天历史
        if (chatId && onSaveMessage) {
          onSaveMessage(chatId, assistantMessage)
        }
    } catch (error) {
      console.error('聊天请求失败:', error)
      
      // 根据错误类型显示不同的错误消息
      let errorContent = '抱歉，我暂时无法回复您的消息。'
      
      if (error instanceof Error) {
        if (error.message.includes('API请求失败: 500')) {
          errorContent = '🔑 请检查OpenAI API密钥配置。请确保在.env.local文件中设置了正确的OPENAI_API_KEY。'
        } else if (error.message.includes('API请求失败: 401')) {
          errorContent = '🔑 API密钥无效，请检查OpenAI API密钥是否正确。'
        } else if (error.message.includes('API请求失败: 429')) {
          errorContent = '⏰ 请求过于频繁，请稍后再试。'
        } else if (error.message.includes('API请求失败: 402')) {
          errorContent = '💰 账户余额不足，请检查OpenAI账户余额。'
        } else {
          errorContent = `❌ 请求失败: ${error.message}`
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorContent,
        role: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
      
      // 保存错误消息到聊天历史
      if (chatId && onSaveMessage) {
        onSaveMessage(chatId, errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">欢迎使用 Chat苑博学</h2>
            <p className="text-muted-foreground mb-6">
              开始新的对话，或者从左侧选择一个历史对话
            </p>
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 提示：请确保已配置OpenAI API密钥以使用AI聊天功能
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <h3 className="font-medium mb-2">解释概念</h3>
                <p className="text-sm text-muted-foreground">请解释什么是量子计算</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <h3 className="font-medium mb-2">代码帮助</h3>
                <p className="text-sm text-muted-foreground">帮我写一个React组件</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <h3 className="font-medium mb-2">创意写作</h3>
                <p className="text-sm text-muted-foreground">写一个科幻故事</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <h3 className="font-medium mb-2">问题解决</h3>
                <p className="text-sm text-muted-foreground">如何提高学习效率</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  } items-start space-x-3`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-lg px-4 py-3 bg-muted">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">正在思考...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex space-x-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入你的消息..."
                className="min-h-[60px] max-h-[120px] resize-none"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-[60px] w-[60px]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
