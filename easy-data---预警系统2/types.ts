
export interface DataItem {
  id: number;
  title: string;
  content: string;
  source: string;
  category: string;
  author: string;
  date: string;
  views: number;
  comments: number;
  shares: number;
  likes: number;
  tags: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  isDelayed?: boolean;
}

export interface TopicItem {
  id: number;
  name: string;
  platform: string;
  date: string;
  reads: string;
  discuss: string;
  likes: string;
  type: string;
}

export interface AlertGroup {
  id: number;
  name: string;
  monitoringItem: string;
  topicCount: number;
  topics: TopicItem[];
}
