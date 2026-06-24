import { AlertTriangle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";

export function DeleteConfirmModal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <Modal open={open} title="Hapus Lowongan" onClose={onClose}>
      <div className="flex gap-4 rounded-xl bg-red-50 p-4 text-red-700">
        <AlertTriangle className="shrink-0" />
        <p className="text-sm leading-6">Lowongan yang dihapus tidak akan tampil lagi untuk kandidat. Pastikan lowongan ini memang sudah tidak diperlukan.</p>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Batal
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
