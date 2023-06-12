/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import type { NextPage } from 'next';
import type { User, Study, Question } from '@prisma/client';
import Image from 'next/image';

import { Button, Layout, QuestionView } from '../../../components';
import { api } from '../../../utils/api';

type StudyWithUser = Study & { User: User } & { questions: Question[] };

const StudyPage: NextPage = () => {
  const router = useRouter();
  const { studyId } = router.query;
  const { data } = api.study.get.useQuery(
    { id: studyId as string },
    {
      enabled: !!studyId,
    }
  );

  if (!data || !data.questions) {
    return null;
  }

  return <StudyView study={data} />;
};

type StudyViewProps = {
  study: StudyWithUser;
};

type EditStudyButtonProps = {
  study: StudyWithUser;
};

const EditStudyButton: React.FC<EditStudyButtonProps> = props => {
  const { study } = props;
  const { data: sessionData } = useSession();

  if (!study.authorId || sessionData?.user.id !== study.authorId) {
    return null;
  }

  return (
    <Button style="secondary" href={`/studies/${study.id}/edit`}>
      Edit
    </Button>
  );
};

const StudyView: React.FC<StudyViewProps> = props => {
  const { study } = props;
  const [expanded, setExpanded] = useState<boolean>(false);
  const [uniqueId, setUniqueId] = useState<number>(0);
  const title = study && `${study.title}${study.published ? '' : ' (Draft)'}`;

  return (
    <Layout>
      <div className="align-center w-ful flex justify-between gap-4">
        <h1 className="h1">{title}</h1>
        <EditStudyButton study={study} />
      </div>
      <div className="mb-12 flex items-end justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="border-text h-16 w-16 overflow-hidden rounded-full border-2">
            <img src={study.User.image ?? ''} alt={study.User.name ?? ''} />
          </div>
          <div>
            <div className="h5">{study.User.name}</div>
            <div className="flex gap-2">
              <span>{study.createdAt.toLocaleDateString('ro-RO')}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                setExpanded(true);
                setUniqueId(id => id + 1);
              }}>
              <div>Expand all</div>
              <Image src="/arrows.svg" width={17} height={18} alt="arrow" />
            </div>
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                setExpanded(false);
                setUniqueId(id => id + 1);
              }}>
              <div>Collapse all</div>
              <Image
                className="rotate-180"
                src="/arrows.svg"
                width={17}
                height={18}
                alt="arrow"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        {study.questions.map((data, index) => {
          return (
            <QuestionView
              key={`${uniqueId}-${index}`}
              {...data}
              expanded={expanded}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default StudyPage;
