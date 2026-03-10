import { useCallback, useMemo, useState } from 'react';
import {
  Globe2,
  Images,
  Languages,
  LayoutDashboard,
  PackagePlus,
  PanelLeftClose,
  PanelLeftOpen,
  Save,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminMedia from '../components/admin/AdminMedia';
import AdminProducts from '../components/admin/AdminProducts';
import AdminSeo from '../components/admin/AdminSeo';
import AdminTranslations from '../components/admin/AdminTranslations';
import { adminPrimaryButtonClass } from '../components/admin/styles';
import type { AdminPrimaryAction } from '../components/admin/types';
import { useCms } from '../contexts/CmsContext';
import { getMediaLibrary } from '../lib/media';

type AdminTab = 'dashboard' | 'products' | 'translations' | 'seo' | 'media';

const tabs: {
  id: AdminTab;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'products',
    label: 'Products',
    icon: PackagePlus,
  },
  {
    id: 'translations',
    label: 'Content',
    icon: Languages,
  },
  {
    id: 'seo',
    label: 'SEO',
    icon: Globe2,
  },
  {
    id: 'media',
    label: 'Media',
    icon: Images,
  },
];

function isAdminTab(value: string | null): value is AdminTab {
  return tabs.some((tab) => tab.id === value);
}

export default function AdminPanel() {
  const cms = useCms();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [primaryAction, setPrimaryAction] = useState<(AdminPrimaryAction & { tab: AdminTab }) | null>(null);

  const activeTab: AdminTab = isAdminTab(searchParams.get('tab'))
    ? (searchParams.get('tab') as AdminTab)
    : 'dashboard';

  const totalOverrides = useMemo(
    () =>
      Object.values(cms.translationOverrides).reduce(
        (count, languageOverrides) => count + Object.keys(languageOverrides).length,
        0,
      ),
    [cms.translationOverrides],
  );
  const mediaLibrary = useMemo(() => getMediaLibrary(cms.mediaItems), [cms.mediaItems]);

  const handleTabChange = (tab: AdminTab) => {
    setSearchParams({ tab });
  };

  const handlePrimaryActionChange = useCallback(
    (action: AdminPrimaryAction | null) => {
      setPrimaryAction(action ? { ...action, tab: activeTab } : null);
    },
    [activeTab],
  );

  const resolvedPrimaryAction: AdminPrimaryAction =
    primaryAction?.tab === activeTab
      ? primaryAction
      : {
          label: 'Save Changes',
          onClick: () => undefined,
          disabled: true,
        };

  return (
    <div className="flex h-full w-full min-h-0 overflow-hidden bg-white text-black">
      <aside
        className={`flex h-full min-h-0 shrink-0 flex-col overflow-hidden border-r border-black/10 bg-white transition-[width] duration-200 ${
          isSidebarCollapsed ? 'w-[88px]' : 'w-[248px]'
        }`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-black/10 px-3">
          {!isSidebarCollapsed && (
            <p className="truncate text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
              Admin
            </p>
          )}

          <button
            onClick={() => setIsSidebarCollapsed((current) => !current)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:bg-neutral-100"
            aria-label={isSidebarCollapsed ? 'Expand admin navigation' : 'Collapse admin navigation'}
            title={isSidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            {isSidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3" aria-label="Admin sections">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition ${
                    active
                      ? 'border-black bg-black text-white'
                      : 'border-black/10 bg-white text-black hover:bg-neutral-100'
                  } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                  aria-label={tab.label}
                  title={tab.label}
                >
                  <Icon size={18} className="shrink-0" />
                  {!isSidebarCollapsed && <span className="truncate">{tab.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="shrink-0 border-t border-black/10 p-3">
          <button
            onClick={resolvedPrimaryAction.onClick}
            disabled={resolvedPrimaryAction.disabled}
            className={`${adminPrimaryButtonClass} h-10 w-full px-3 ${isSidebarCollapsed ? 'px-0' : ''}`}
            aria-label="Save changes"
            title="Save changes"
          >
            <Save size={16} />
            {!isSidebarCollapsed && <span>Save</span>}
          </button>
        </div>
      </aside>

      <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden p-3 lg:p-4">
          {activeTab === 'dashboard' && (
            <div className="h-full min-h-0 overflow-y-auto pr-1">
              <AdminDashboard
                productsCount={cms.products.length}
                categoriesCount={cms.categories.length}
                overridesCount={totalOverrides}
                seoCount={Object.keys(cms.seo).length}
                mediaCount={mediaLibrary.length}
                latestProducts={cms.products.slice(0, 5)}
                updatedAt={cms.updatedAt}
                onOpenProducts={() => handleTabChange('products')}
                onOpenTranslations={() => handleTabChange('translations')}
                onOpenSeo={() => handleTabChange('seo')}
                onOpenMedia={() => handleTabChange('media')}
              />
            </div>
          )}

          {activeTab === 'products' && (
            <AdminProducts
              products={cms.products}
              categories={cms.categories}
              getProductById={cms.getProductById}
              getCategoryById={cms.getCategoryById}
              upsertProduct={cms.upsertProduct}
              deleteProduct={cms.deleteProduct}
              upsertCategory={cms.upsertCategory}
              deleteCategory={cms.deleteCategory}
              mediaLibrary={mediaLibrary}
              onPrimaryActionChange={handlePrimaryActionChange}
            />
          )}

          {activeTab === 'translations' && (
            <AdminTranslations
              translationOverrides={cms.translationOverrides}
              setTranslationOverride={cms.setTranslationOverride}
              clearTranslationOverride={cms.clearTranslationOverride}
              onPrimaryActionChange={handlePrimaryActionChange}
            />
          )}

          {activeTab === 'seo' && (
            <AdminSeo
              seo={cms.seo}
              updateSeoPage={cms.updateSeoPage}
              onPrimaryActionChange={handlePrimaryActionChange}
            />
          )}

          {activeTab === 'media' && <AdminMedia />}
        </div>
      </section>
    </div>
  );
}
