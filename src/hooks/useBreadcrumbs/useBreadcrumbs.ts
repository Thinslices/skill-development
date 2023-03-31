import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { api } from '../../utils/api';

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split('?')[0];
  return pathWithoutQuery?.split('/').filter(v => v.length > 0) ?? [];
};

const isStudyView = (pathParts: string[], index: number) => {
  const isEditStudyView =
    pathParts[0] === 'studies' &&
    pathParts[2] === 'edit' &&
    pathParts.length === 3;
  const isGetStudyView = pathParts[0] === 'studies' && pathParts.length === 2;

  return (isEditStudyView || isGetStudyView) && index === 1;
};

const isUserView = (pathParts: string[], index: number) => {
  return pathParts[0] === 'users' && pathParts.length === 2 && index === 1;
};

export const useBreadcrumbs = () => {
  const router = useRouter();

  const breadcrumbs = useMemo(() => {
    const pathParts = generatePathParts(router.asPath);
    const detailedPathParts = pathParts.map((pathPart, pathPartId) => {
      if (isStudyView(pathParts, pathPartId)) {
        const studyId = pathPart;

        const { data: study } = api.study.get.useQuery(
          { id: studyId },
          { enabled: false }
        );

        return {
          textPart: study?.title,
          hrefPart: studyId,
        };
      }

      if (isUserView(pathParts, pathPartId)) {
        const userId = pathPart;

        const { data: user } = api.user.get.useQuery(
          { id: userId },
          { enabled: false }
        );

        return {
          textPart: user?.name,
          hrefPart: userId,
        };
      }

      return {
        textPart: pathPart,
        hrefPart: pathPart,
      };
    });

    const crumbList = detailedPathParts.map(({ textPart }, idx) => {
      const isLastCrumb = idx === detailedPathParts.length - 1;
      if (isLastCrumb) return { href: null, text: textPart };

      const crumbSubpath = detailedPathParts.slice(0, idx + 1);
      const crumbHref =
        '/' + crumbSubpath.map(({ hrefPart }) => hrefPart).join('/');

      return {
        href: crumbHref,
        text: textPart,
      };
    });

    return [{ href: '/', text: 'home' }, ...crumbList];
  }, [router.asPath]);

  return breadcrumbs;
};
