import Link from 'next/link';
import React from 'react';
import { useBreadcrumbs } from '../../hooks';

export const Breadcrumbs: React.FC = () => {
    const breadcrumbs = useBreadcrumbs();

    return (
        <div className="flex gap-2 capitalize">
            {breadcrumbs.map((crumb, index) => {
                return (
                    <React.Fragment key={crumb.href}>
                        <Link href={crumb.href}>{crumb.text}</Link>
                        {index < breadcrumbs.length - 1 && <div>&raquo;</div>}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
