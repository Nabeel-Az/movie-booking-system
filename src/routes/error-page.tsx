export const ErrorComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl text-gray-600">Oops! The page you're looking for does not exist.</p>
        <a
          href="/"
          className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};
