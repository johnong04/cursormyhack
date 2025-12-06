/**
 * SPM 2024 Sejarah Prediction Dataset
 * Based on analysis of State Trial Papers (Kelantan, Terengganu, SBP)
 * Last updated: 2024
 */

export interface SejarahPrediction {
  id: string;
  bab: number;
  subtopic: string;
  probability_score: number;
  probability_label: "CRITICAL" | "VERY HIGH" | "HIGH" | "MODERATE" | "LOW";
  analysis_text: string;
  past_year_trend: string;
  mnemonic_id: string;
}

export interface SejarahPredictionMeta {
  last_updated: string;
  source: string;
  total_papers_analyzed: number;
}

export interface SejarahPredictionData {
  meta: SejarahPredictionMeta;
  predictions: SejarahPrediction[];
}

export const SEJARAH_2024_PREDICTIONS: SejarahPredictionData = {
  meta: {
    last_updated: "2024-10-15",
    source: "Aggregated State Trial Papers (Kelantan, Terengganu, SBP)",
    total_papers_analyzed: 14,
  },
  predictions: [
    {
      id: "b2_3",
      bab: 2,
      subtopic: "2.3 Ciri Utama Perlembagaan Persekutuan",
      probability_score: 95,
      probability_label: "CRITICAL",
      analysis_text: "This topic has been absent from actual SPM since 2021 but appeared in 9/14 State Trial papers this year. High chance of Essay Question.",
      past_year_trend: "COLD (Last appearance: Never in recent cycle)",
      mnemonic_id: "mn_const_features",
    },
    {
      id: "b5_4",
      bab: 5,
      subtopic: "5.4 Langkah Pembentukan Malaysia",
      probability_score: 92,
      probability_label: "VERY HIGH",
      analysis_text: "In 2023, the exam asked about 'Reaksi' (5.3). The trend usually alternates. We predict 'Langkah' (Steps) for 2024.",
      past_year_trend: "ALTERNATING",
      mnemonic_id: "mn_malaysia_steps",
    },
    {
      id: "b3_3",
      bab: 3,
      subtopic: "3.3 Yang di-Pertuan Agong (YDPA)",
      probability_score: 88,
      probability_label: "HIGH",
      analysis_text: "With the installation of the new Agong, KBAT questions regarding the function of the monarchy are statistically highly probable.",
      past_year_trend: "EVENT DRIVEN",
      mnemonic_id: "mn_agong_powers",
    },
    {
      id: "b4_3",
      bab: 4,
      subtopic: "4.3 Kerjasama Kerajaan Persekutuan & Negeri",
      probability_score: 85,
      probability_label: "HIGH",
      analysis_text: "Frequent in SBP and MRSM Trial papers. Focus on economic cooperation.",
      past_year_trend: "TRIAL FAVORITE",
      mnemonic_id: "mn_fed_state",
    },
    {
      id: "b1_1",
      bab: 1,
      subtopic: "1.1 Konsep Kedaulatan",
      probability_score: 80,
      probability_label: "MODERATE",
      analysis_text: "Last seen in SPM 2021. It is 'due' for a rotation, likely as a Structure question.",
      past_year_trend: "ROTATION DUE",
      mnemonic_id: "mn_sov_concept",
    },
    {
      id: "b10_4",
      bab: 10,
      subtopic: "10.4 Usaha Mengekalkan Kelestarian Global",
      probability_score: 65,
      probability_label: "LOW",
      analysis_text: "Appeared in SPM U 2023. Unlikely to be a major Essay, but possible for minimal marks.",
      past_year_trend: "RECENTLY TESTED",
      mnemonic_id: "mn_global_sustain",
    },
  ],
};

/**
 * Get top N Sejarah predictions sorted by probability score (highest first)
 */
export function getTopSejarahPredictions(limit: number = 5): SejarahPrediction[] {
  return [...SEJARAH_2024_PREDICTIONS.predictions]
    .sort((a, b) => b.probability_score - a.probability_score)
    .slice(0, limit);
}

/**
 * Get prediction metadata
 */
export function getSejarahPredictionMeta(): SejarahPredictionMeta {
  return SEJARAH_2024_PREDICTIONS.meta;
}

/**
 * Optional: Legacy state-based predictions for backward compatibility
 * (aligned with PRD's hardcoded example)
 */
export const PREDICTIONS_BY_STATE = {
  kelantan: 0.9,
  terengganu: 0.9,
  kl: 0.45,
  selangor: 0.4,
} as const;

