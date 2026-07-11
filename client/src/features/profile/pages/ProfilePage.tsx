import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '@/components/ui/Loader';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getErrorMessage } from '@/lib/axios';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useProfile } from '../hooks/useProfile';
import ProfileInfo from '../components/ProfileInfo';
import MyBlogs from '../components/MyBlogs';

export default function ProfilePage() {
  const { profileId } = useParams();
  const { user } = useAuth();
  const { data: profile, isLoading, isError, error } = useProfile(profileId);
  useDocumentTitle('Profile');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [profileId]);

  if (isLoading) return <Loader />;
  if (isError || !profile) {
    return <ErrorMessage message={getErrorMessage(error)} />;
  }

  const isOwner = user?.id === profile.id;
  const heading = isOwner
    ? 'Your Blogs'
    : `${profile.firstName} ${profile.lastName}'s Blogs`;

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container min-h-[calc(100vh-90px)]">
        <ProfileInfo profile={profile} isOwner={isOwner} />
        <MyBlogs
          blogs={profile.blogs}
          heading={heading}
          emptyMessage="No blogs yet."
        />
      </div>
    </main>
  );
}
