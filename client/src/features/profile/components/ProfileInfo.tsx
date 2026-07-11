import type { UserProfile } from '@/types/entities';
import Bio from './Bio';
import ProfileImage from './ProfileImage';

interface ProfileInfoProps {
  profile: UserProfile;
  isOwner: boolean;
}

export default function ProfileInfo({ profile, isOwner }: ProfileInfoProps) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <ProfileImage user={profile} isOwner={isOwner} />

      <div>
        <h3 className="text-2xl font-semibold lg:text-[28px]">
          {profile.firstName} {profile.lastName}
        </h3>
        <p className="leading-[231%] text-muted lg:text-lg">{profile.email}</p>
      </div>

      <Bio bio={profile.bio} userId={profile.id} isOwner={isOwner} />
    </div>
  );
}
