import { nextServer } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';
import { cookies } from 'next/headers';

interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  searchText: string,
  page: number = 1,
  perPage: number = 12,
  tag: string,
): Promise<ApiResponse> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const response = await nextServer.get<ApiResponse>('/notes', {
    params: {
      search: searchText || undefined,
      page: page,
      perPage: perPage,
      tag: tag || undefined,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return res;
};