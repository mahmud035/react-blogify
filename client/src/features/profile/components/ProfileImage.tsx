import { useRef, type ChangeEvent } from 'react';
import editIcon from '@/assets/icons/edit.svg';
import { AVATAR_FALLBACK, getAvatarUrl } from '@/utils/media';
import type { User } from '@/types/entities';
import { useUploadAvatar } from '../hooks/useUploadAvatar';

interface ProfileImageProps {
  user: Pick<User, 'id' | 'firstName' | 'avatar'>;
  isOwner: boolean;
}

export default function ProfileImage({ user, isOwner }: ProfileImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUploadAvatar(user.id);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) mutate(file);
    e.target.value = '';
  };

  return (
    <div className="relative mb-8 h-[120px] w-[120px] rounded-full lg:mb-11 lg:h-[180px] lg:w-[180px]">
      <img
        className="object-cover w-full h-full rounded-full"
        src={getAvatarUrl(user.avatar, user.firstName)}
        onError={(e) => (e.currentTarget.src = AVATAR_FALLBACK)}
        alt="Profile"
      />

      {isOwner && (
        <>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isPending}
            className="absolute bottom-0 right-0 grid rounded-full place-items-center h-8 w-8 bg-slate-700 hover:bg-slate-700/80 disabled:opacity-60"
            aria-label="Change avatar"
          >
            <img src={editIcon} alt="" />
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
        </>
      )}
    </div>
  );
}
