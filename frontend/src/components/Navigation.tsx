import Link from 'next/link';
import { Users, School, Calendar, BarChart3 } from 'lucide-react';

export default function Navigation() {
    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link href="/" className="text-xl font-bold text-gray-900">
                        Tutor Scheduler
                    </Link>

                    <div className="flex space-x-6">
                        <Link href="/tutors" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                            <Users size={20} />
                            <span>Tutors</span>
                        </Link>
                        <Link href="/schools" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                            <School size={20} />
                            <span>Schools</span>
                        </Link>
                        <Link href="/assignments" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                            <Calendar size={20} />
                            <span>Assignments</span>
                        </Link>
                        <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                            <BarChart3 size={20} />
                            <span>Dashboard</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}