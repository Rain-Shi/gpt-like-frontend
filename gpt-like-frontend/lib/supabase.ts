import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 示例数据接口
export interface UserData {
  id: string
  name: string
  email: string
  created_at: string
  last_login: string
  total_messages: number
  subscription_type: string
}

export interface MessageData {
  id: string
  user_id: string
  content: string
  role: 'user' | 'assistant'
  created_at: string
  tokens_used: number
}

export interface AnalyticsData {
  totalUsers: number
  totalMessages: number
  averageMessagesPerUser: number
  topUsers: UserData[]
  recentMessages: MessageData[]
}

// 获取分析数据的函数
export async function getAnalyticsData(): Promise<AnalyticsData> {
  try {
    // 这里应该连接到真实的Supabase数据库
    // 现在返回模拟数据
    return {
      totalUsers: 1250,
      totalMessages: 45678,
      averageMessagesPerUser: 36.5,
      topUsers: [
        {
          id: '1',
          name: '张三',
          email: 'zhangsan@example.com',
          created_at: '2024-01-01',
          last_login: '2024-01-15',
          total_messages: 245,
          subscription_type: 'premium'
        },
        {
          id: '2',
          name: '李四',
          email: 'lisi@example.com',
          created_at: '2024-01-02',
          last_login: '2024-01-14',
          total_messages: 189,
          subscription_type: 'basic'
        },
        {
          id: '3',
          name: '王五',
          email: 'wangwu@example.com',
          created_at: '2024-01-03',
          last_login: '2024-01-13',
          total_messages: 156,
          subscription_type: 'premium'
        }
      ],
      recentMessages: [
        {
          id: '1',
          user_id: '1',
          content: '请解释什么是机器学习',
          role: 'user',
          created_at: '2024-01-15T10:30:00Z',
          tokens_used: 15
        },
        {
          id: '2',
          user_id: '1',
          content: '机器学习是人工智能的一个分支...',
          role: 'assistant',
          created_at: '2024-01-15T10:30:05Z',
          tokens_used: 120
        },
        {
          id: '3',
          user_id: '2',
          content: '帮我写一个Python函数',
          role: 'user',
          created_at: '2024-01-15T09:15:00Z',
          tokens_used: 12
        }
      ]
    }
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    throw error
  }
}
