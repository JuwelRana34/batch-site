import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoader() {
  return (
    <div className="min-h-screen p-6 md:p-12 space-y-6 animate-pulse">
      {/* Page Title Skeleton */}
      <Skeleton className="w-1/3 h-10 rounded-md mx-auto md:mx-0" />

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>

      {/* Charts/Table Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-1/2 rounded-md" /> {/* chart title */}
            <Skeleton className="h-64 rounded-lg" /> {/* chart/table */}
          </div>
        ))}
      </div>

      {/* List / Items Skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex-1 space-y-2">
              <Skeleton className="w-2/3 h-4 rounded-md" />
              <Skeleton className="w-1/3 h-3 rounded-md" />
            </div>
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
