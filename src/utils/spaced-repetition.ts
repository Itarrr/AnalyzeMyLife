// SuperMemo SM-2 algorithm implementation
export interface SM2Parameters {
  repetitions: number;  // number of times the card has been successfully recalled
  easeFactor: number;  // easiness factor
  interval: number;    // inter-repetition interval in days
}

export function calculateNextReview(
  params: SM2Parameters,
  quality: number // 0-5 rating of recall quality
): SM2Parameters {
  // Ensure quality is between 0 and 5
  quality = Math.min(5, Math.max(0, quality));

  let { repetitions, easeFactor, interval } = params;

  // If quality is less than 3, start over
  if (quality < 3) {
    return {
      repetitions: 0,
      easeFactor: Math.max(1.3, easeFactor - 0.2),
      interval: 1
    };
  }

  // Calculate new ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  easeFactor = Math.max(1.3, easeFactor);

  // Calculate new interval
  if (repetitions === 0) {
    interval = 1;
  } else if (repetitions === 1) {
    interval = 6;
  } else {
    interval = Math.round(interval * easeFactor);
  }

  return {
    repetitions: repetitions + 1,
    easeFactor,
    interval
  };
}