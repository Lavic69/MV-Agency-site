import React from 'react';
import { AVAILABLE_SLOTS, getCurrentMonthLabel } from '@/config/availability';
import HeroBadge from './hero-badge';
import { Icons } from './icons';

export const AvailabilityPill = ({ isContactPage = false }: { isContactPage?: boolean }) => {
  if (AVAILABLE_SLOTS <= 0) return null;
  const plural = AVAILABLE_SLOTS > 1;
  const text = (
    <>
      <strong>{AVAILABLE_SLOTS} place{plural ? 's' : ''} restante{plural ? 's' : ''}</strong>
      {' · Onboarding '}{getCurrentMonthLabel()}
    </>
  );

  return (
    <div style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
      <HeroBadge
        href={isContactPage ? undefined : "/contact"}
        text={text}
        icon={<Icons.logo style={{ width: '16px', height: '16px' }} />}
        endIcon={isContactPage ? undefined : <Icons.chevronRight style={{ width: '16px', height: '16px' }} />}
      />
    </div>
  );
};
