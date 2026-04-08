import { useEffect, useState } from 'react';
import { useCms } from '../contexts/CmsContext';
import AdminPanel from './AdminPanel';

export default function AdminAccess() {
  const { refreshSnapshot } = useCms();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        await refreshSnapshot('admin');
      } finally {
        setIsInitializing(false);
      }
    })();
  }, [refreshSnapshot]);

  if (isInitializing) {
    return (
      <div className="flex h-full min-h-0 w-full items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#244d85]/15 border-t-[#244d85]" />
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Loading
          </p>
        </div>
      </div>
    );
  }

  return <AdminPanel />;
}
