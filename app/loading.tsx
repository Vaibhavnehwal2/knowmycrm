export default function Loading() {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Hero skeleton */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto mb-6" />
            <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>
        </div>
      </section>
      
      {/* Content skeleton */}
      <section className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl border bg-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-gray-200 rounded-lg" />
                <div className="h-6 bg-gray-200 rounded w-32" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
