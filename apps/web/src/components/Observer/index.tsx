import { useEffect, useRef } from 'react';

import type { PropsWithChildren } from 'react';

interface ObserverProps {
  className?: string;
  onIntersect: () => Promise<void>;
}

const Observer: React.FC<PropsWithChildren<ObserverProps>> = ({
  className,
  children,
  onIntersect,
}) => {
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entities => {
        const target = entities[0];

        if (target && target.isIntersecting) {
          onIntersect();
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      },
    );
  }, [onIntersect]);

  useEffect(() => {
    if (loadingRef.current && observerRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => observerRef.current.disconnect();
  }, [loadingRef.current, observerRef.current]);

  return (
    <div className={className && className} ref={loadingRef}>
      {children}
    </div>
  );
};

export default Observer;
