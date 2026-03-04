// Local remedy type - NOT from backend. Remedies are stored client-side only.
export interface RemedyData {
  name: string;
  abbreviation: string;
  miasmaticClassification: string;
  keynotes: string;
  materiaMedicaSummary: string;
  synopticKeyHighlights: string;
  clinicalIndications: string;
  rubrics: string;
  relationships: {
    complementary: string;
    antidotes: string;
    inimical: string;
    followsWell: string;
    followedBy: string;
  };
}
