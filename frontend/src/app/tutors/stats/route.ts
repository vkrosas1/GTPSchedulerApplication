import { NextRequest, NextResponse } from 'next/server';
import { backendApi } from '@/services/api';

// Example: Frontend API route that aggregates data from C# backend
export async function GET(request: NextRequest) {
    try {
        const [tutorsResponse, assignmentsResponse] = await Promise.all([
            backendApi.get('/tutors'),
            backendApi.get('/assignments')
        ]);

        const stats = {
            totalTutors: tutorsResponse.data.length,
            activeTutors: tutorsResponse.data.filter((t: any) => t.isActive).length,
            totalAssignments: assignmentsResponse.data.length,
            pendingAssignments: assignmentsResponse.data.filter((a: any) => a.status === 'Pending').length,
        };

        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}