import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_SETTINGS,
  readImageItem,
  validateFile,
  type FileRejection,
  type PdfSettings,
  type QueuedImage,
  type Rotation,
} from "@/lib/image-utils";

/**
 * Single source of truth for the conversion queue.
 * All state is in-memory; object URLs are revoked on removal and unmount.
 */
export function useImageQueue() {
  const [items, setItems] = useState<QueuedImage[]>([]);
  const [settings, setSettings] = useState<PdfSettings>(DEFAULT_SETTINGS);
  const [rejections, setRejections] = useState<FileRejection[]>([]);
  const itemsRef = useRef<QueuedImage[]>([]);
  itemsRef.current = items;

  // Revoke any remaining object URLs when the tool unmounts.
  useEffect(() => {
    return () => {
      for (const item of itemsRef.current) URL.revokeObjectURL(item.objectUrl);
    };
  }, []);

  const addFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    let total = itemsRef.current.reduce((sum, item) => sum + item.size, 0);
    const rejected: FileRejection[] = [];
    const accepted: File[] = [];

    for (const file of files) {
      const reason = validateFile(file, total);
      if (reason) {
        rejected.push({ name: file.name || "pasted-image", reason });
      } else {
        total += file.size;
        accepted.push(file);
      }
    }

    const loaded = await Promise.all(
      accepted.map(async (file) => {
        try {
          return await readImageItem(file);
        } catch {
          rejected.push({
            name: file.name || "pasted-image",
            reason: "Could not read this image — the file may be corrupt",
          });
          return null;
        }
      }),
    );

    const valid = loaded.filter((item): item is QueuedImage => item !== null);
    if (valid.length > 0) setItems((prev) => [...prev, ...valid]);
    setRejections(rejected);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.objectUrl);
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const clear = useCallback(() => {
    for (const item of itemsRef.current) URL.revokeObjectURL(item.objectUrl);
    setItems([]);
    setRejections([]);
  }, []);

  const move = useCallback((id: string, direction: -1 | 1) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      const next = index + direction;
      if (index < 0 || next < 0 || next >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[next]] = [copy[next], copy[index]];
      return copy;
    });
  }, []);

  const moveToIndex = useCallback((id: string, targetIndex: number) => {
    setItems((prev) => {
      const from = prev.findIndex((item) => item.id === id);
      if (from < 0 || targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(from, 1);
      copy.splice(targetIndex, 0, moved);
      return copy;
    });
  }, []);

  const rotate = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, rotation: ((item.rotation + 90) % 360) as Rotation }
          : item,
      ),
    );
  }, []);

  const updateSettings = useCallback((patch: Partial<PdfSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const dismissRejections = useCallback(() => setRejections([]), []);

  return {
    items,
    settings,
    rejections,
    addFiles,
    remove,
    clear,
    move,
    moveToIndex,
    rotate,
    updateSettings,
    dismissRejections,
  };
}
