import { useCallback, useMemo, useState } from 'react';
import {
  BriefcaseBusiness,
  Globe2,
  House,
  MapPinned,
  Inbox,
  Images,
  Languages,
  LayoutDashboard,
  Newspaper,
  PackagePlus,
  PanelLeftClose,
  PanelLeftOpen,
  Save,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminDealers from '../components/admin/AdminDealers';
import AdminHomepage from '../components/admin/AdminHomepage';
import AdminLeads from '../components/admin/AdminLeads';
import AdminMedia from '../components/admin/AdminMedia';
import AdminNews from '../components/admin/AdminNews';
import AdminProducts from '../components/admin/AdminProducts';
import AdminSeo from '../components/admin/AdminSeo';
import AdminTranslations from '../components/admin/AdminTranslations';
import AdminVacancies from '../components/admin/AdminVacancies';
import { adminPrimaryButtonClass } from '../components/admin/styles';
import type { AdminPrimaryAction } from '../components/admin/types';
import { useCms } from '../contexts/CmsContext';
import { getMediaLibrary } from '../lib/media';

type AdminTab =
  | 'dashboard'
  | 'homepage'
  | 'leads'
  | 'dealers'
  | 'products'
  | 'vacancies'
  | 'news'
  | 'translations'
  | 'seo'
  | 'media';

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
    id: 'homepage',
    label: 'Featured Products',
    icon: House,
  },
  {
    id: 'leads',
    label: 'Leads',
    icon: Inbox,
  },
  {
    id: 'dealers',
    label: 'Dealers',
    icon: MapPinned,
  },
  {
    id: 'products',
    label: 'Products',
    icon: PackagePlus,
  },
  {
    id: 'vacancies',
    label: 'Vacancies',
    icon: BriefcaseBusiness,
  },
  {
    id: 'news',
    label: 'News',
    icon: Newspaper,
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
            <Link
              to="/"
              className="truncate text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500 transition hover:text-black"
            >
              KRANTAS Group
            </Link>
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
                featuredCount={cms.featuredProductIds.length}
                leadsCount={cms.leads.length}
                dealerCount={cms.distributorLocations.length}
                vacanciesCount={cms.vacancies.length}
                newsCount={cms.newsItems.length}
                overridesCount={totalOverrides}
                seoCount={Object.keys(cms.seo).length}
                mediaCount={mediaLibrary.length}
                latestProducts={cms.products.slice(0, 5)}
                updatedAt={cms.updatedAt}
                onOpenHomepage={() => handleTabChange('homepage')}
                onOpenLeads={() => handleTabChange('leads')}
                onOpenDealers={() => handleTabChange('dealers')}
                onOpenProducts={() => handleTabChange('products')}
                onOpenVacancies={() => handleTabChange('vacancies')}
                onOpenNews={() => handleTabChange('news')}
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
              featuredProductIds={cms.featuredProductIds}
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

          {activeTab === 'homepage' && (
            <AdminHomepage
              products={cms.products}
              featuredProductIds={cms.featuredProductIds}
              setFeaturedProductIds={cms.setFeaturedProductIds}
              onPrimaryActionChange={handlePrimaryActionChange}
            />
          )}

          {activeTab === 'leads' && (
            <AdminLeads
              leads={cms.leads}
              upsertLead={cms.upsertLead}
              deleteLead={cms.deleteLead}
              onPrimaryActionChange={handlePrimaryActionChange}
            />
          )}

          {activeTab === 'dealers' && (
            <AdminDealers
              distributorLocations={cms.distributorLocations}
              upsertDistributorLocation={cms.upsertDistributorLocation}
              deleteDistributorLocation={cms.deleteDistributorLocation}
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

          {activeTab === 'vacancies' && (
            <AdminVacancies
              vacancies={cms.vacancies}
              upsertVacancy={cms.upsertVacancy}
              deleteVacancy={cms.deleteVacancy}
              onPrimaryActionChange={handlePrimaryActionChange}
            />
          )}

          {activeTab === 'news' && (
            <AdminNews
              newsItems={cms.newsItems}
              upsertNewsItem={cms.upsertNewsItem}
              deleteNewsItem={cms.deleteNewsItem}
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
