import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Data interfaces
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

// Get analytics data function
export async function getAnalyticsData(): Promise<AnalyticsData> {
  try {
    // This should connect to real Supabase database
    // Now returning mock data
    return {
      totalUsers: 1250,
      totalMessages: 45678,
      averageMessagesPerUser: 36.5,
      topUsers: [
        {
          id: '1',
          name: 'Zhang San',
          email: 'zhangsan@example.com',
          created_at: '2024-01-01',
          last_login: '2024-01-15',
          total_messages: 245,
          subscription_type: 'premium'
        },
        {
          id: '2',
          name: 'Li Si',
          email: 'lisi@example.com',
          created_at: '2024-01-02',
          last_login: '2024-01-14',
          total_messages: 189,
          subscription_type: 'basic'
        },
        {
          id: '3',
          name: 'Wang Wu',
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
          content: 'Please explain what is machine learning',
          role: 'user',
          created_at: '2024-01-15T10:30:00Z',
          tokens_used: 15
        },
        {
          id: '2',
          user_id: '1',
          content: 'Machine learning is a branch of artificial intelligence...',
          role: 'assistant',
          created_at: '2024-01-15T10:30:05Z',
          tokens_used: 120
        },
        {
          id: '3',
          user_id: '2',
          content: 'Help me write a Python function',
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