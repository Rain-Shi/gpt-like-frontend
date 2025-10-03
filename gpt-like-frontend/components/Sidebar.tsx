'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatHistory {
  id: string
  title: string
  timestamp: Date
}

interface SidebarProps {
  currentChatId?: string
  onChatSelect: (chatId: string) => void
  onNewChat: () => void
  onAnalyticsClick: () => void
}

export default function Sidebar({ 
  currentChatId, 
  onChatSelect, 
  onNewChat, 
  onAnalyticsClick 
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  // 模拟聊天历史数据
  const chatHistory: ChatHistory[] = [
    { id: '1', title: '如何学习React', timestamp: new Date('2024-01-15') },
    { id: '2', title: 'TypeScript最佳实践', timestamp: new Date('2024-01-14') },
    { id: '3', title: 'Next.js项目结构', timestamp: new Date('2024-01-13') },
    { id: '4', title: 'Tailwind CSS样式', timestamp: new Date('2024-01-12') },
    { id: '5', title: '数据库设计', timestamp: new Date('2024-01-11') },
  ]

  return (
    <div className={cn(
      "flex flex-col h-full bg-background border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* 头部 */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold">ChatGPT</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* 新建聊天按钮 */}
      <div className="p-4">
        <Button 
          onClick={onNewChat}
          className={cn(
            "w-full justify-start",
            isCollapsed && "px-2"
          )}
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">新建聊天</span>}
        </Button>
      </div>

      {/* 聊天历史 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {!isCollapsed && (
          <div className="text-xs text-muted-foreground mb-2 px-2">
            最近聊天
          </div>
          )}
          <div className="space-y-1">
            {chatHistory.map((chat) => (
              <Button
                key={chat.id}
                variant={currentChatId === chat.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-left h-auto p-2",
                  isCollapsed && "px-2"
                )}
                onClick={() => onChatSelect(chat.id)}
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="ml-2 flex-1 min-w-0">
                    <div className="text-sm truncate">{chat.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {chat.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="p-4 border-t space-y-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            isCollapsed && "px-2"
          )}
          onClick={onAnalyticsClick}
        >
          <BarChart3 className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">数据分析</span>}
        </Button>
        
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            isCollapsed && "px-2"
          )}
        >
          <Settings className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">设置</span>}
        </Button>
      </div>
    </div>
  )
}
