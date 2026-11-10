import React from 'react';

interface SectionHeaderProps {
  number: string;
  label: string;
  tag?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  number, 
  label, 
  tag,
  className = '' 
}) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4 select-none ${className}`}>
      <div className="flex items-center gap-3">
        {/* Accent Bar */}
        <span className="w-6 h-[2px] bg-blue-600 shrink-0 rounded-full" />
        
        {/* Monospace Minimal-Weight Technical Section Title */}
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase">
          <span className="text-blue-600 font-semibold">{number} //</span>
          <span className="text-slate-600 font-normal">{label}</span>
        </div>

        {/* Hairline Divider */}
        <span className="h-[1px] flex-1 bg-slate-200 shrink" />

        {/* Optional Right-Aligned Monospace Technical Marker */}
        {tag && (
          <span className="hidden sm:inline font-mono text-[10px] tracking-wider text-slate-400 uppercase shrink-0">
            [ {tag} ]
          </span>
        )}
      </div>
    </div>
  );
};
