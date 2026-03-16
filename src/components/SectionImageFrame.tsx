import type { ReactNode } from 'react';

type SectionImageFrameVariant = 'blue-brass' | 'brass-blue' | 'blue-outline';

interface SectionImageFrameProps {
  children: ReactNode;
  variant?: SectionImageFrameVariant;
  className?: string;
}

const VARIANT_STYLES: Record<
  SectionImageFrameVariant,
  {
    shell: string;
    topAccent: string;
    bottomAccent: string;
    outline: string;
  }
> = {
  'blue-brass': {
    shell: 'rounded-tr-[44px] rounded-bl-[44px]',
    topAccent: 'bg-[#244d85]',
    bottomAccent: 'bg-[#c5a059]',
    outline: 'border-[#244d85]/10',
  },
  'brass-blue': {
    shell: 'rounded-tl-[40px] rounded-br-[40px]',
    topAccent: 'bg-[#c5a059]',
    bottomAccent: 'bg-[#244d85]',
    outline: 'border-[#c5a059]/20',
  },
  'blue-outline': {
    shell: 'rounded-tr-[52px] rounded-bl-[28px]',
    topAccent: 'bg-[#244d85]',
    bottomAccent: 'bg-[#244d85]/25',
    outline: 'border-[#244d85]/15',
  },
};

export default function SectionImageFrame({
  children,
  variant = 'blue-brass',
  className = '',
}: SectionImageFrameProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute -top-3 right-6 h-10 w-10 ${styles.topAccent} md:-top-4 md:h-14 md:w-14`}
      />
      <div
        className={`absolute -bottom-3 left-6 h-14 w-14 ${styles.bottomAccent} md:-bottom-5 md:h-20 md:w-20`}
      />
      <div
        className={`absolute inset-0 translate-x-3 translate-y-3 border ${styles.outline} md:translate-x-4 md:translate-y-4`}
      />
      <div className={`relative overflow-hidden border border-black/5 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] ${styles.shell}`}>
        {children}
      </div>
    </div>
  );
}
