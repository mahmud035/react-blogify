/** Blog-card skeleton placeholder shown while lists load. */
export default function Skeleton() {
  return (
    <div className="blog-card animate-pulse">
      <div className="bg-gray-800 rounded-md blog-thumb max-h-48 aspect-video" />
      <div className="relative mt-2">
        <h3 className="h-4 bg-gray-800 rounded-full" />
        <p className="h-8 mt-3 mb-6 bg-gray-800 rounded-full" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-800 rounded-full" />
            <div className="space-y-2">
              <div className="w-40 h-3 bg-gray-800 rounded-full" />
              <div className="w-20 h-3 bg-gray-800 rounded-full" />
            </div>
          </div>
          <div className="w-16 h-3 bg-gray-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}
