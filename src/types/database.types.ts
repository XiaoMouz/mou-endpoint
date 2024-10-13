export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      active_codes: {
        Row: {
          bind_roles: string[]
          create_by: string
          disabled: boolean
          end_time: string | null
          id: string
          one_time: boolean
          token: string
        }
        Insert: {
          bind_roles: string[]
          create_by: string
          disabled?: boolean
          end_time?: string | null
          id: string
          one_time?: boolean
          token: string
        }
        Update: {
          bind_roles?: string[]
          create_by?: string
          disabled?: boolean
          end_time?: string | null
          id?: string
          one_time?: boolean
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: 'invite_codes_create_by_fkey'
            columns: ['create_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      comment: {
        Row: {
          anonymous_mail: string | null
          anonymous_name: string | null
          bind_content: number | null
          bind_ticket: number | null
          content: string
          create_by: string | null
          create_time: string
          id: number
          is_anonymous: boolean
          parent_comment: number | null
          state: Database['public']['Enums']['CommentState']
          type: Database['public']['Enums']['CommentParentType']
          update_time: string
        }
        Insert: {
          anonymous_mail?: string | null
          anonymous_name?: string | null
          bind_content?: number | null
          bind_ticket?: number | null
          content: string
          create_by?: string | null
          create_time?: string
          id?: number
          is_anonymous?: boolean
          parent_comment?: number | null
          state?: Database['public']['Enums']['CommentState']
          type: Database['public']['Enums']['CommentParentType']
          update_time?: string
        }
        Update: {
          anonymous_mail?: string | null
          anonymous_name?: string | null
          bind_content?: number | null
          bind_ticket?: number | null
          content?: string
          create_by?: string | null
          create_time?: string
          id?: number
          is_anonymous?: boolean
          parent_comment?: number | null
          state?: Database['public']['Enums']['CommentState']
          type?: Database['public']['Enums']['CommentParentType']
          update_time?: string
        }
        Relationships: [
          {
            foreignKeyName: 'comment_bind_content_fkey'
            columns: ['bind_content']
            isOneToOne: false
            referencedRelation: 'contents'
            referencedColumns: ['cid']
          },
          {
            foreignKeyName: 'comment_bind_ticket_fkey'
            columns: ['bind_ticket']
            isOneToOne: false
            referencedRelation: 'ticket'
            referencedColumns: ['id']
          }
        ]
      }
      contents: {
        Row: {
          allow_anonymous_comment: boolean
          allow_comment: boolean
          author: string
          cid: number
          content: string | null
          contributors: string[] | null
          create_time: string
          description: string | null
          have_password: boolean
          head_image: string | null
          parent: number | null
          password: string | null
          slug: string | null
          stars_num: number
          state: Database['public']['Enums']['ContentState']
          title: string
          type: Database['public']['Enums']['ContentType']
          update_time: string
          views_num: number
        }
        Insert: {
          allow_anonymous_comment?: boolean
          allow_comment?: boolean
          author?: string
          cid?: number
          content?: string | null
          contributors?: string[] | null
          create_time?: string
          description?: string | null
          have_password?: boolean
          head_image?: string | null
          parent?: number | null
          password?: string | null
          slug?: string | null
          stars_num?: number
          state?: Database['public']['Enums']['ContentState']
          title: string
          type?: Database['public']['Enums']['ContentType']
          update_time?: string
          views_num?: number
        }
        Update: {
          allow_anonymous_comment?: boolean
          allow_comment?: boolean
          author?: string
          cid?: number
          content?: string | null
          contributors?: string[] | null
          create_time?: string
          description?: string | null
          have_password?: boolean
          head_image?: string | null
          parent?: number | null
          password?: string | null
          slug?: string | null
          stars_num?: number
          state?: Database['public']['Enums']['ContentState']
          title?: string
          type?: Database['public']['Enums']['ContentType']
          update_time?: string
          views_num?: number
        }
        Relationships: [
          {
            foreignKeyName: 'contents_author_fkey'
            columns: ['author']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      datasources: {
        Row: {
          content: Json
          create_by: string
          create_date: string
          id: number
          read_only: boolean
          state: Database['public']['Enums']['DataSourceState'] | null
          tips: string | null
          type: Database['public']['Enums']['DataSourceType']
          update_data: string
        }
        Insert: {
          content: Json
          create_by: string
          create_date?: string
          id?: number
          read_only?: boolean
          state?: Database['public']['Enums']['DataSourceState'] | null
          tips?: string | null
          type: Database['public']['Enums']['DataSourceType']
          update_data?: string
        }
        Update: {
          content?: Json
          create_by?: string
          create_date?: string
          id?: number
          read_only?: boolean
          state?: Database['public']['Enums']['DataSourceState'] | null
          tips?: string | null
          type?: Database['public']['Enums']['DataSourceType']
          update_data?: string
        }
        Relationships: [
          {
            foreignKeyName: 'datasources_create_by_fkey'
            columns: ['create_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      nowplaying: {
        Row: {
          icon: string | null
          id: number
          info: Json | null
          link: string | null
          name: string
          type: string
        }
        Insert: {
          icon?: string | null
          id?: number
          info?: Json | null
          link?: string | null
          name: string
          type: string
        }
        Update: {
          icon?: string | null
          id?: number
          info?: Json | null
          link?: string | null
          name?: string
          type?: string
        }
        Relationships: []
      }
      permission: {
        Row: {
          access_comment: boolean | null
          access_control: boolean | null
          access_proxy: boolean | null
          create_at: string | null
          create_by: string
          create_friendlink_ticket: boolean | null
          create_new_post: boolean | null
          edit_nodes_info: boolean | null
          edit_post: boolean | null
          edit_proxy: boolean | null
          edit_remote_api: boolean | null
          edit_service_info: boolean | null
          grant_role: boolean | null
          handle_friendlink_ticket: boolean | null
          handle_new_comment: boolean | null
          handle_new_user: boolean | null
          id: number
          invite_new_user: boolean | null
          manage_comment: boolean | null
          manage_nodes: boolean | null
          manage_post: boolean | null
          manage_proxy: boolean | null
          manage_remote_api: boolean | null
          manage_role: boolean | null
          manage_service: boolean | null
          manage_user: boolean | null
          name: string
          permission_control: boolean | null
          remote_api_access: boolean | null
          send_comment: boolean | null
          update_at: string | null
        }
        Insert: {
          access_comment?: boolean | null
          access_control?: boolean | null
          access_proxy?: boolean | null
          create_at?: string | null
          create_by?: string
          create_friendlink_ticket?: boolean | null
          create_new_post?: boolean | null
          edit_nodes_info?: boolean | null
          edit_post?: boolean | null
          edit_proxy?: boolean | null
          edit_remote_api?: boolean | null
          edit_service_info?: boolean | null
          grant_role?: boolean | null
          handle_friendlink_ticket?: boolean | null
          handle_new_comment?: boolean | null
          handle_new_user?: boolean | null
          id?: number
          invite_new_user?: boolean | null
          manage_comment?: boolean | null
          manage_nodes?: boolean | null
          manage_post?: boolean | null
          manage_proxy?: boolean | null
          manage_remote_api?: boolean | null
          manage_role?: boolean | null
          manage_service?: boolean | null
          manage_user?: boolean | null
          name: string
          permission_control?: boolean | null
          remote_api_access?: boolean | null
          send_comment?: boolean | null
          update_at?: string | null
        }
        Update: {
          access_comment?: boolean | null
          access_control?: boolean | null
          access_proxy?: boolean | null
          create_at?: string | null
          create_by?: string
          create_friendlink_ticket?: boolean | null
          create_new_post?: boolean | null
          edit_nodes_info?: boolean | null
          edit_post?: boolean | null
          edit_proxy?: boolean | null
          edit_remote_api?: boolean | null
          edit_service_info?: boolean | null
          grant_role?: boolean | null
          handle_friendlink_ticket?: boolean | null
          handle_new_comment?: boolean | null
          handle_new_user?: boolean | null
          id?: number
          invite_new_user?: boolean | null
          manage_comment?: boolean | null
          manage_nodes?: boolean | null
          manage_post?: boolean | null
          manage_proxy?: boolean | null
          manage_remote_api?: boolean | null
          manage_role?: boolean | null
          manage_service?: boolean | null
          manage_user?: boolean | null
          name?: string
          permission_control?: boolean | null
          remote_api_access?: boolean | null
          send_comment?: boolean | null
          update_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'permission_create_by_fkey'
            columns: ['create_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      profiles: {
        Row: {
          avatar_link: string | null
          display_name: string | null
          emails: string[] | null
          id: string
          invite_from: string | null
          site_owner: boolean
          username: string
        }
        Insert: {
          avatar_link?: string | null
          display_name?: string | null
          emails?: string[] | null
          id: string
          invite_from?: string | null
          site_owner?: boolean
          username: string
        }
        Update: {
          avatar_link?: string | null
          display_name?: string | null
          emails?: string[] | null
          id?: string
          invite_from?: string | null
          site_owner?: boolean
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      proxy: {
        Row: {
          create_by: string
          due_node_regex: string | null
          end_time: string | null
          id: string
          last_update_time: string | null
          name: string | null
          next_reset_cycle: string | null
          regex_due: string | null
          regex_traffic: string | null
          state: Database['public']['Enums']['ProxyState']
          subscription_url: string
          sum_traffic: number | null
          traffic_node_regex: string | null
          type: Database['public']['Enums']['ProxyType']
          used_traffice: number | null
        }
        Insert: {
          create_by?: string
          due_node_regex?: string | null
          end_time?: string | null
          id?: string
          last_update_time?: string | null
          name?: string | null
          next_reset_cycle?: string | null
          regex_due?: string | null
          regex_traffic?: string | null
          state?: Database['public']['Enums']['ProxyState']
          subscription_url: string
          sum_traffic?: number | null
          traffic_node_regex?: string | null
          type?: Database['public']['Enums']['ProxyType']
          used_traffice?: number | null
        }
        Update: {
          create_by?: string
          due_node_regex?: string | null
          end_time?: string | null
          id?: string
          last_update_time?: string | null
          name?: string | null
          next_reset_cycle?: string | null
          regex_due?: string | null
          regex_traffic?: string | null
          state?: Database['public']['Enums']['ProxyState']
          subscription_url?: string
          sum_traffic?: number | null
          traffic_node_regex?: string | null
          type?: Database['public']['Enums']['ProxyType']
          used_traffice?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'proxy_create_by_fkey'
            columns: ['create_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      role_bind: {
        Row: {
          expired_time: string | null
          granted_by: string | null
          granted_time: string
          id: number
          priority: number
          role_id: string
          special_permission: string | null
          user_id: string
        }
        Insert: {
          expired_time?: string | null
          granted_by?: string | null
          granted_time?: string
          id?: number
          priority?: number
          role_id: string
          special_permission?: string | null
          user_id: string
        }
        Update: {
          expired_time?: string | null
          granted_by?: string | null
          granted_time?: string
          id?: number
          priority?: number
          role_id?: string
          special_permission?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'role_bind_granted_by_fkey'
            columns: ['granted_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'role_bind_role_id_fkey'
            columns: ['role_id']
            isOneToOne: false
            referencedRelation: 'roles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'role_bind_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      roles: {
        Row: {
          bind_permission: number | null
          create_by: string
          id: string
          parent: string | null
          priority: number
          role_name: string
        }
        Insert: {
          bind_permission?: number | null
          create_by?: string
          id?: string
          parent?: string | null
          priority?: number
          role_name: string
        }
        Update: {
          bind_permission?: number | null
          create_by?: string
          id?: string
          parent?: string | null
          priority?: number
          role_name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'roles_bind_permission_fkey'
            columns: ['bind_permission']
            isOneToOne: false
            referencedRelation: 'permission'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'roles_create_by_fkey'
            columns: ['create_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      tags: {
        Row: {
          allow_search: boolean
          color: string | null
          create_by: string | null
          id: number
          name: string
          warn: boolean
        }
        Insert: {
          allow_search?: boolean
          color?: string | null
          create_by?: string | null
          id?: number
          name: string
          warn?: boolean
        }
        Update: {
          allow_search?: boolean
          color?: string | null
          create_by?: string | null
          id?: number
          name?: string
          warn?: boolean
        }
        Relationships: []
      }
      ticket: {
        Row: {
          assignee: string | null
          content: string
          create_at: string
          create_by: string
          forward_to: number | null
          id: number
          state: Database['public']['Enums']['TicketState']
          title: string
          update_at: string
        }
        Insert: {
          assignee?: string | null
          content: string
          create_at?: string
          create_by?: string
          forward_to?: number | null
          id?: number
          state?: Database['public']['Enums']['TicketState']
          title: string
          update_at?: string
        }
        Update: {
          assignee?: string | null
          content?: string
          create_at?: string
          create_by?: string
          forward_to?: number | null
          id?: number
          state?: Database['public']['Enums']['TicketState']
          title?: string
          update_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'ticket_assignee_fkey'
            columns: ['assignee']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'ticket_create_by_fkey'
            columns: ['create_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_permission: {
        Args: {
          user_id: string
          permission_column: string
        }
        Returns: boolean
      }
    }
    Enums: {
      CommentParentType: 'content' | 'ticket' | 'comment'
      CommentState:
        | 'deleted'
        | 'hidden'
        | 'limited'
        | 'mention-only'
        | 'normal'
        | 'close'
        | 'review'
      ContentState:
        | 'publish'
        | 'draft'
        | 'waiting'
        | 'hidden'
        | 'encrypt'
        | 'outdated'
      ContentType: 'post' | 'page' | 'document' | 'view'
      DataSourceState: 'enable' | 'limited' | 'test' | 'untrust' | 'disabled'
      DataSourceType: 'net-node' | 'service'
      ProxyState: 'active' | 'limited' | 'expired' | 'untrust' | 'disactive'
      ProxyType: 'unlimited' | 'toll' | 'sponsor' | 'limited' | 'new' | 'test'
      TicketState: 'opened' | 'solved' | 'closed' | 'moved' | 'frozen' | 'muted'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never
