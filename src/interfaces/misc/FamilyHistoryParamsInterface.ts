export default interface FamilyHistoryParamsInterface {
  fh_id: string;
  patient_id: string;
  fh_hypertension: string | null;
  fh_stroke: string | null;
  fh_heart_disease: string | null;
  fh_diabetes_mellitus: string | null;
  fh_asthma: string | null;
  fh_cancer: string | null;
  fh_kidney_disease: string | null;
  fh_vascular_disease: string | null;
  fh_tb: string | null;
  fh_disorders: string | null;
  fh_copd: string | null;
}
