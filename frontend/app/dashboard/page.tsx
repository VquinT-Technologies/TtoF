'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DiagramGenerator from '@/components/DiagramGenerator';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <DiagramGenerator />
        </main>
      </div>
    </div>
  );
}
