import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Mencegah render jika total halaman kurang dari atau sama dengan 1
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3 shadow-soft">
      {/* Tombol Sebelumnya */}
      <Button 
        variant="secondary" 
        size="sm" 
        icon={<ChevronLeft size={16} />}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </Button>

      {/* Daftar Angka Halaman */}
      <div className="flex items-center gap-1 text-sm font-semibold text-slate-500">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-9 w-9 text-xs font-bold rounded-lg transition-all ${
              currentPage === page
                ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Tombol Selanjutnya */}
      <Button 
        variant="secondary" 
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span className="flex items-center gap-1">
          Next <ChevronRight size={16} />
        </span>
      </Button>
    </div>
  );
}