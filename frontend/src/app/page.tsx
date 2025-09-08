import Link from 'next/link';
import { Users, School, Calendar, BarChart3 } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Tutor Scheduler Admin
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Manage tutors, schools, and automated scheduling assignments all in one place.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/tutors" className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Users className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Tutors</h3>
                            <p className="text-sm text-gray-600">Manage tutor profiles and availability</p>
                        </div>
                    </div>
                </Link>

                <Link href="/schools" className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <School className="text-green-600" size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Schools</h3>
                            <p className="text-sm text-gray-600">Manage schools and class schedules</p>
                        </div>
                    </div>
                </Link>

                <Link href="/assignments" className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <Calendar className="text-purple-600" size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Assignments</h3>
                            <p className="text-sm text-gray-600">View and manage tutor assignments</p>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard" className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                        <div className="bg-orange-100 p-3 rounded-lg">
                            <BarChart3 className="text-orange-600" size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Dashboard</h3>
                            <p className="text-sm text-gray-600">Analytics and system overview</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}