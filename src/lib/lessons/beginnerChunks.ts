export interface ChunkRange {
  chunkIndex: number;
  text: string;
  startIndex: number;
  endIndex: number;
}

export function parseBeginnerChunks(chunks: string[]): {
  fullText: string;
  ranges: ChunkRange[];
} {
  const ranges: ChunkRange[] = [];
  let currentIndex = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunkText = chunks[i];
    const startIndex = currentIndex;
    const endIndex = startIndex + chunkText.length;

    ranges.push({
      chunkIndex: i,
      text: chunkText,
      startIndex,
      endIndex,
    });

    // Account for space separator between chunks
    currentIndex = endIndex + 1;
  }

  const fullText = chunks.join(" ");
  return { fullText, ranges };
}

export function getActiveChunkRange(
  ranges: ChunkRange[],
  currentIndex: number
): ChunkRange {
  if (ranges.length === 0) {
    return { chunkIndex: 0, text: "", startIndex: 0, endIndex: 0 };
  }

  for (let i = 0; i < ranges.length; i++) {
    const currentRange = ranges[i];
    const nextRange = ranges[i + 1];

    if (nextRange) {
      if (currentIndex >= currentRange.startIndex && currentIndex < nextRange.startIndex) {
        return currentRange;
      }
    } else {
      if (currentIndex >= currentRange.startIndex) {
        return currentRange;
      }
    }
  }

  return ranges[0];
}
