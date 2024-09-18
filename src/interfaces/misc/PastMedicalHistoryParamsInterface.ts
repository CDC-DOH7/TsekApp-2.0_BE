export default interface PastMedicalHistoryParamsInterface {
  pmh_id: string;
  patient_id: string;
  pmh_hypertension: string | null;
  pmh_heart_disease: string | null;
  pmh_diabetes: string | null;
  pmh_specify_diabetes: string;
  pmh_cancer: string | null;
  pmh_specify_cancer: string;
  pmh_copd: string | null;
  pmh_asthma: string | null;
  pmh_allergies: string | null;
  pmh_specify_allergy: string;
  pmh_disorders: string | null;
  pmh_specify_disorder: string;
  pmh_vision_problems: string | null;
  pmh_previous_surgical_history: string | null;
  pmh_specify_surgical_history: string;
  pmh_thyroid_disorder: string | null;
  pmh_kidney_disorder: string | null;
}
