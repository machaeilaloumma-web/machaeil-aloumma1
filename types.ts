import { LucideIcon } from 'lucide-react';

export interface Level {
  id: number;
  title: string;
  description: string;
  criteria: string[];
  award: string;
  presenter: string;
  color: string;
  icon: any;
}

export interface StatMetric {
  name: string;
  value: number;
  color: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SymbolFigure {
  name: string;
  title: string;
  description: string;
  category: 'historical' | 'contemporary' | 'educational';
  image?: string;
}

export interface AgeGroup {
  range: string;
  title: string;
  vision: string;
  goals: string[];
  color: string;
}

export interface ProgramPillar {
  title: string;
  content: string;
  icon: any;
}
