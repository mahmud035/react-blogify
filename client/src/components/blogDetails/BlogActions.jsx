import commentIcon from '../../assets/icons/comment.svg';
import heartIcon from '../../assets/icons/heart.svg';
import likeIcon from '../../assets/icons/like.svg';

const BlogActions = () => {
  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <img src={likeIcon} alt="like" />
          <span>10</span>
        </li>

        <li>
          {/* There is heart-filled.svg in the icons folder  */}
          <img src={heartIcon} alt="Favorite" />
        </li>
        <a href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>3</span>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default BlogActions;
