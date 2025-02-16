import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-6xl font-bold text-gray-700 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Oops! Page Not Found</h2>
            <p className="text-lg text-gray-600 max-w-md mb-8">
                We couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
            <div className="space-y-4">
                <Link 
                    to="/" 
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}