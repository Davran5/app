import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { LockKeyhole } from 'lucide-react';
import { toast } from 'sonner';
import {
  adminCardClass,
  adminInputClass,
  adminPrimaryButtonClass,
} from '../components/admin/styles';
import AdminPanel from './AdminPanel';

type AdminAccessState = 'checking' | 'locked' | 'open';

interface AdminSessionResponse {
  authenticated?: boolean;
}

export default function AdminAccess() {
  const [accessState, setAccessState] = useState<AdminAccessState>('checking');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refreshSession = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/session', {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Session check failed with ${response.status}`);
      }

      const payload = (await response.json()) as AdminSessionResponse;
      setAccessState(payload.authenticated ? 'open' : 'locked');
    } catch {
      setAccessState('locked');
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!password.trim()) {
        toast.error('Access denied.');
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ password }),
        });

        if (!response.ok) {
          throw new Error(`Access denied with ${response.status}`);
        }

        setPassword('');
        setAccessState('open');
        toast.success('Admin access granted.');
      } catch {
        toast.error('Access denied.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [password],
  );

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });
    } finally {
      setPassword('');
      setAccessState('locked');
      toast.success('Admin session closed.');
    }
  }, []);

  if (accessState === 'open') {
    return <AdminPanel onLogout={handleLogout} />;
  }

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f3f3f0] p-4 lg:p-8">
      <div className={`${adminCardClass} w-full max-w-[440px] p-6 sm:p-8`}>
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
            <LockKeyhole size={20} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Admin Access
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-black">
              {accessState === 'checking' ? 'Checking access' : 'Enter password'}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              The admin panel is protected. Enter the password to continue.
            </p>
          </div>
        </div>

        {accessState === 'checking' ? (
          <div className="mt-8 flex items-center gap-3 text-sm text-neutral-500">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/15 border-t-black" />
            <span>Validating session</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={adminInputClass}
                autoComplete="current-password"
                placeholder="Enter admin password"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${adminPrimaryButtonClass} w-full rounded-2xl py-3`}
            >
              {isSubmitting ? 'Unlocking...' : 'Unlock Admin'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
