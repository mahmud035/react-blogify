import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dotsIcon from '@/assets/icons/3dots.svg';
import editIcon from '@/assets/icons/edit.svg';
import deleteIcon from '@/assets/icons/delete.svg';
import type { Blog } from '@/types/entities';
import { useDeleteBlog } from '../hooks/useDeleteBlog';

interface BlogCardMenuProps {
  blog: Blog;
}

/** Owner-only edit/delete menu. Stops propagation so the parent card's
 *  navigate-on-click doesn't fire. */
export default function BlogCardMenu({ blog }: BlogCardMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { mutate: remove, isPending } = useDeleteBlog();

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div ref={menuRef} className="relative" onClick={stop}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Blog actions"
        aria-haspopup="menu"
        aria-expanded={open}
        className="transition-opacity hover:opacity-80"
      >
        <img src={dotsIcon} alt="" className="w-5 h-5 pointer-events-none" />
      </button>

      {open && (
        <div className="action-modal-container" role="menu">
          <button
            type="button"
            role="menuitem"
            className="action-menu-item"
            onClick={() => navigate(`/edit-blog/${blog.id}`)}
          >
            <img src={editIcon} alt="" className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            role="menuitem"
            className="action-menu-item"
            disabled={isPending}
            onClick={() => {
              if (window.confirm('Delete this blog permanently?')) {
                remove(blog.id, { onSuccess: () => setOpen(false) });
              }
            }}
          >
            <img src={deleteIcon} alt="" className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}
