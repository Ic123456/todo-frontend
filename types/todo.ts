export interface Todo {
  id?: number
  text: string
  time?: string
  day: string
  done: boolean
  tags: number[]
  notes: string
  week?: number
}

export interface CustomTag {
  id: number
  name: string
  color: string
}

export interface Template {
  id: string
  name: string
  tasks: Omit<Todo, "id" | "day">[]
}
