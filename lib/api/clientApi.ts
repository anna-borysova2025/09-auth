import { User } from '@/types/user';
import { Note } from '@/types/note';
import { nextServer } from './api';

interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const fetchNotes = async (
  searchText: string,
  page: number = 1,
  perPage: number = 12,
  tag: string,
): Promise<ApiResponse> => {
  const response = await nextServer.get<ApiResponse>('/notes', {
    params: {
      search: searchText || undefined,
      page: page,
      perPage: perPage,
      tag: tag || undefined,
    },
  });
  return response.data;
};

export const createNote = async (newNote: NewNote) => {
  const response = await nextServer.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await nextServer.get<Note>(`/notes/${noteId}`);
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async () => {
  const res = await nextServer.get<User | null>('/auth/session');
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const updateMe = async (data: { username: string }): Promise<User> => {
  const res = await nextServer.patch<User>('/users/me', data);
  return res.data;
};