export const useFileDownload = () => {
  const completed = ref(false);
  const downloading = ref(false);
  const progress = ref(0);
  const error = ref<string | null>(null);

  const downloadFile = async (id: string, fileName: string) => {
    const config = useRuntimeConfig().public;
    completed.value = false;
    downloading.value = true;
    progress.value = 0;
    error.value = null;

    try {
      const response = await fetch(`${config.cdn}/map/${id}`);
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const contentLength = response.headers.get('content-length');

      let downloadedBytes = 0;
      const totalBytes = contentLength ? Number(contentLength) : 0;

      if (!response.body) {
        throw new Error('Streaming is not supported');
      }

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        downloadedBytes += value.length;

        if (totalBytes > 0) {
          progress.value = Math.min(100, Math.round((downloadedBytes / totalBytes) * 100));
        }
      }

      const blob = new Blob(chunks);

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = blobUrl;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(blobUrl);

      progress.value = 100;
      completed.value = true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Download failed';

      throw err;
    } finally {
      downloading.value = false;
    }
  };

  return {
    downloading,
    error,
    downloadFile,
    completed,
    progress,
  };
};
