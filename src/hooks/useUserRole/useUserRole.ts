import type { Role } from '@prisma/client';
import { useMemo } from 'react';
import { api } from '../../utils/api';

export const useUserRole: (id: string) => Role = id => {
    const { data } = api.user.get.useQuery(
        { id },
        {
            enabled: !!id,
        }
    );

    const role = useMemo(() => {
        return data?.role === 'ADMIN' ? 'ADMIN' : 'USER';
    }, [data]);

    return role;
};
