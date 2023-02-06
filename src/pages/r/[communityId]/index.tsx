import { Community, communityState } from '@/src/atoms/communitiesAtom';
import About from '@/src/components/Community/About';
import CreatePostLink from '@/src/components/Community/CreatePostLink';
import Header from '@/src/components/Community/Header';
import NotFound from '@/src/components/Community/NotFound';
import PageContent from '@/src/components/Layout/PageContent';
import Posts from '@/src/components/Posts/Posts';
import { firestore } from '@/src/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import safeJsonStringify from 'safe-json-stringify';

type Props = {
  communityData: Community;
};

export default function CommunityPage({ communityData }: Props) {
  console.log(communityData);
  const setCommunityStateValue = useSetRecoilState(communityState);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData]);

  if (!communityData) {
    return <NotFound />;
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get community data and pass it to client
  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.communityId as string
    );

    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : '',
      },
    };
  } catch (error) {
    // Could add error page here
    console.log('getServerSideProps error', error);
  }
}
