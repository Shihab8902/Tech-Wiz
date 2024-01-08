
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-600 text-white">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">Page Not Found</p>
            <Link
                to="/"
                className="text-lg text-white bg-gray-800 rounded-md py-3 px-6 hover:bg-gray-700 transition duration-300"
            >
                Return to Home
            </Link>
        </div>
    )
}

export default Error