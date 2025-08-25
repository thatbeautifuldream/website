'use client';

import { Leva } from 'leva';
import { usePathname } from 'next/navigation';

export function LevaProvider() {
  const pathname = usePathname();

  const isIxdInnerPage = pathname.startsWith('/ixd/');

  return (
    <>
      <Leva hidden={!isIxdInnerPage} />
    </>
  );
}
