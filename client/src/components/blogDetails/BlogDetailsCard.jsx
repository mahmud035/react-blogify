import { Link } from 'react-router-dom';
import blogImage from '../../assets/blogs/React-Roadmap.jpg';
import Tags from './Tags';

const BlogDetailsCard = () => {
  return (
    <section>
      <div className="container text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl">
          Integer Maecenas Eget Viverra
        </h1>
        <div className="flex justify-center items-center my-4 gap-4">
          <Link to="/profile">
            <div className="flex items-center capitalize space-x-2">
              <div className="avater-img bg-indigo-600 text-white">
                <span className="">S</span>
              </div>
              <h5 className="text-slate-500 text-sm">Saad Hasan</h5>
            </div>
          </Link>
          <span className="text-sm text-slate-700 dot">June 28, 2018</span>
          <span className="text-sm text-slate-700 dot">100 Likes</span>
        </div>
        <img
          className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
          src={blogImage}
          alt=""
        />
        {/* Tags */}
        <Tags />

        {/* TODO: blog content er size boro hole 2 ta paragraph e dekhabo */}
        {/* Content */}
        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
          Today I was mob programming with Square`s Mobile & Performance
          Reliability team and we toyed with an interesting idea. Our codebase
          has classes that represent screens a user can navigate to. These
          classes are defined in modules, and these modules have an owner team
          defined. When navigating to a screen, we wanted to have the owner team
          information available, at runtime. We created a build tool that looks
          at about 1000 Screen classes, determines the owner team, and generates
          a class to do the lookup at runtime. The generated code looked like
          this:
          <br />
          mapOf(vararg pairs: Pair) is a nice utility to create a map (more
          specifically, a LinkedHashMap) but using that syntax leads to the
          creation of a temporary vararg array of size 1000, as well as 1000
          temporary Pair instances. Memory hoarding Let`s look at the retained
          size of the map we just created: ~30 characters per class name * 2
          bytes per character = 60 bytes per entry Each entry is stored as a
          LinkedHashMapEntry which adds 2 references to HashMap.Node which
          itself holds 3 references and 1 int. On a 64bit VM that`s 5 references
          * 8 bytes, plus 4 bytes for the int: 44 bytes per entry. So for the
          entries alone we`re at (60 + 44) * 1000 = 104 KB. The default load
          factor is 75%, which means the size of the array backing the hashmap
          must always be at least 25% greater than the number of entries. And
          the array size has to be a factor of 2. So, for 1000 entries, that`s
          an object array of size 2048: 2048 * 8 = 16,314 bytes. The total
          retained size of the map is ~120 KB. Can we do better? Could we make
          it... 0?
          <h2 className="font-bold text-3xl mt-4">100% code-based map</h2>
          What if we generate code that returns the right team for a given
          screen, instead of creating a map? Since we know the full list of
          screen classes, we can check ahead of time whether there`s any
          hashcode conflict, and if not, we can generate code that directly
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsCard;
