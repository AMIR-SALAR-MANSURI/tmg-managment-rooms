'use client';

import { useParams } from 'next/navigation';

export const useGetUid = () => useParams<{ id: string }>();


