CREATE DEFINER=`root`@`localhost` PROCEDURE `script_test`.`searchConsultationLog`(
	in entered_cl_id VARCHAR(50),
	in entered_cl_description TEXT,
	in entered_cl_date DATE,
	in fetch_patient_id VARCHAR(50),
	in fetch_user_id VARCHAR(50),
	in fetch_hf_id VARCHAR(50),
	in fetch_ref_id VARCHAR(50)
)
begin
	-- Fetch consultation records based on the given parameters
    select 
        cl_id,
        cl_description,
        cl_date,
        patient_id,
        user_id,
        hf_id,
        ref_id
    from 
    	consultation_log
    where
        (cl_id = entered_cl_id OR entered_cl_id IS NULL) AND
        (patient_id = fetch_patient_id OR fetch_patient_id IS NULL) AND
        (cl_description LIKE CONCAT('%', entered_cl_description, '%') OR entered_cl_description IS NULL) AND
        (cl_date = entered_cl_date OR entered_cl_date IS NULL) AND
        (user_id = fetch_user_id OR fetch_user_id IS NULL) AND
        (hf_id = fetch_hf_id OR fetch_hf_id IS NULL) AND
        (ref_id = fetch_ref_id OR fetch_ref_id IS NULL);

end