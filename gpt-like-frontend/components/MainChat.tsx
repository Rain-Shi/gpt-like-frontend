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
}

export default function MainChat({ chatId }: MainChatProps) {
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
    if (chatId) {
      // 这里可以根据chatId加载对应的聊天历史
      // 现在使用模拟数据
      const mockMessages: Message[] = [
        {
          id: '1',
          content: '你好！我是你的AI助手，有什么可以帮助你的吗？',
          role: 'assistant',
          timestamp: new Date()
        }
      ]
      setMessages(mockMessages)
    } else {
      setMessages([])
    }
  }, [chatId])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // 模拟AI响应
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `我收到了你的消息："${userMessage.content}"。这是一个模拟的AI响应。在实际应用中，这里会连接到真实的AI服务。`,
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
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
            <h2 className="text-2xl font-semibold mb-2">欢迎使用 ChatGPT</h2>
            <p className="text-muted-foreground mb-6">
              开始新的对话，或者从左侧选择一个历史对话
            </p>
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
