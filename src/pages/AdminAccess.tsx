import { useCallback, useEffect, useRef, useState } from 'react';
import { useCms } from '../contexts/CmsContext';
import AdminPanel from './AdminPanel';

type AuthState = 'loading' | 'unauthenticated' | 'authenticated';

async function apiFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    credentials: 'same-origin',
  });
  return res;
}

export default function AdminAccess() {
  const { refreshSnapshot } = useCms();
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);

  // Check existing session on mount
  useEffect(() => {
    void (async () => {
      try {
        const res = await apiFetch('/api/admin/session');
        const data = await res.json() as { authenticated?: boolean };

        if (data.authenticated) {
          await refreshSnapshot('admin');
          setAuthState('authenticated');
        } else {
          setAuthState('unauthenticated');
        }
      } catch {
        setAuthState('unauthenticated');
      }
    })();
  }, [refreshSnapshot]);

  // Focus username field when login form appears
  useEffect(() => {
    if (authState === 'unauthenticated') {
      usernameRef.current?.focus();
    }
  }, [authState]);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError('');
      setIsSubmitting(true);

      try {
        const res = await apiFetch('/api/admin/login', {
          method: 'POST',
          body: JSON.stringify({ username: username.trim(), password }),
        });

        if (res.ok) {
          await refreshSnapshot('admin');
          setAuthState('authenticated');
        } else {
          const data = await res.json() as { error?: string };
          setLoginError(data.error ?? 'Login failed. Please try again.');
          setPassword('');
        }
      } catch {
        setLoginError('Network error. Please try again.');
        setPassword('');
      } finally {
        setIsSubmitting(false);
      }
    },
    [username, password, refreshSnapshot],
  );

  const handleLogout = useCallback(async () => {
    try {
      await apiFetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setAuthState('unauthenticated');
    setUsername('');
    setPassword('');
  }, []);

  // ── Loading ──
  if (authState === 'loading') {
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

  // ── Authenticated ──
  if (authState === 'authenticated') {
    return <AdminPanel onLogout={handleLogout} />;
  }

  // ── Login form ──
  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center bg-neutral-50 p-4">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <div className="border-b border-black/10 px-8 py-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400">
            KRANTAS Group
          </p>
          <h1 className="mt-1.5 text-xl font-bold text-black">Admin Panel</h1>
          <p className="mt-1 text-sm text-neutral-500">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 px-8 py-7">
          <div className="space-y-1.5">
            <label
              htmlFor="admin-username"
              className="block text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500"
            >
              Username
            </label>
            <input
              id="admin-username"
              ref={usernameRef}
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-neutral-50 px-3.5 py-2.5 text-sm text-black outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
              placeholder="admin"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-neutral-50 px-3.5 py-2.5 text-sm text-black outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
              placeholder="••••••••"
            />
          </div>

          {loginError && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-600"
            >
              {loginError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Signing in…
              </span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
