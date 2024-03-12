const LargeLoader = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-90px)] mx-auto max-w-[420px]">
      <p className="font-thin text-7xl">L</p>
      <div className="mt-5 h-10 w-10 animate-spin rounded-full border-8 border-dashed border-[#00d991]"></div>
      <p className="font-thin text-7xl">ading....</p>
    </div>
  );
};

export default LargeLoader;
