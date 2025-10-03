'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Trash2,
  MoreHorizontal
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatHistory {
  id: string
  title: string
  timestamp: Date
}

interface ChatHistory {
  id: string
  title: string
  timestamp: Date
}

interface SidebarProps {
  currentChatId?: string
  chatHistory: ChatHistory[]
  onChatSelect: (chatId: string) => void
  onNewChat: () => void
  onDeleteChat: (chatId: string) => void
  onAnalyticsClick: () => void
}

export default function Sidebar({ 
  currentChatId, 
  chatHistory,
  onChatSelect, 
  onNewChat, 
  onDeleteChat,
  onAnalyticsClick 
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const handleDeleteClick = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation()
    setShowDeleteConfirm(chatId)
  }

  const handleDeleteConfirm = (chatId: string) => {
    onDeleteChat(chatId)
    setShowDeleteConfirm(null)
  }

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(null)
  }

  return (
    <div className={cn(
      "flex flex-col h-full bg-background border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* 头部 */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold">Chat苑博学</h2>
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
              <div
                key={chat.id}
                className="relative group"
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId(null)}
              >
                <Button
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
                
                {/* 删除按钮 - 只在悬停时显示 */}
                {!isCollapsed && hoveredChatId === chat.id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleDeleteClick(e, chat.id)}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                )}
                
                {/* 删除确认对话框 */}
                {showDeleteConfirm === chat.id && (
                  <div className="absolute inset-0 bg-background border border-destructive rounded-md p-2 z-10">
                    <div className="text-xs text-destructive mb-2">确认删除？</div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-6 px-2 text-xs"
                        onClick={() => handleDeleteConfirm(chat.id)}
                      >
                        删除
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 text-xs"
                        onClick={handleDeleteCancel}
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                )}
              </div>
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
