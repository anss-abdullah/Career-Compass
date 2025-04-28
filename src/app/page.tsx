'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // For now, always redirect to login.
    // In a real app, you'd check for an authentication token/session here.
    router.replace('/login');
  }, [router]);

  // Render nothing or a loading indicator while redirecting
  return null;
}
