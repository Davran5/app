import Distributors from '../components/Distributors';

/**
 * Full-screen Find a Dealer page.
 * No hero, no footer — just the interactive map + sidebar.
 * The page fills the full viewport height minus the nav bar (~60px desktop, 64px mobile).
 */
export default function FindDealer() {
    return (
        <div
            className="w-full pt-[60px]"
            style={{ height: '100dvh' }}
        >
            <Distributors />
        </div>
    );
}
