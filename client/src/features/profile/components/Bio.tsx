import { useState } from 'react';
import { toast } from 'react-toastify';
import checkIcon from '@/assets/icons/check.svg';
import editIcon from '@/assets/icons/edit.svg';
import { useUpdateProfile } from '../hooks/useUpdateProfile';

interface BioProps {
  bio: string;
  userId: string;
  isOwner: boolean;
}

export default function Bio({ bio, userId, isOwner }: BioProps) {
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(bio);
  const { mutate, isPending } = useUpdateProfile(userId);

  const save = () => {
    if (draft.trim().length === 0) {
      toast.warn('Please write something about yourself.');
      return;
    }
    mutate({ bio: draft }, { onSuccess: () => setEditMode(false) });
  };

  return (
    <>
      <div className="flex items-start gap-2 mt-4 lg:mt-6">
        <div className="flex-1">
          {!editMode ? (
            <p className="leading-[188%] text-muted lg:text-lg">
              {bio?.length ? bio : 'No bio information found.'}
            </p>
          ) : (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={4}
              className="w-full p-2 leading-relaxed rounded text-muted bg-background border border-slate-800 focus:outline-none focus:border-primary"
            />
          )}
        </div>

        {isOwner &&
          (!editMode ? (
            <button
              type="button"
              onClick={() => {
                setDraft(bio);
                setEditMode(true);
              }}
              className="grid rounded-full h-7 w-7 place-items-center"
              aria-label="Edit bio"
            >
              <img src={editIcon} alt="" />
            </button>
          ) : (
            <button
              type="button"
              onClick={save}
              disabled={isPending}
              className="grid rounded-full h-7 w-7 place-items-center disabled:opacity-60"
              aria-label="Save bio"
            >
              <img src={checkIcon} alt="" />
            </button>
          ))}
      </div>
      <div className="w-3/4 py-6 border-b border-slate-700 lg:py-8" />
    </>
  );
}
