CREATE DEFINER=`root`@`localhost` PROCEDURE `script_test`.`searchProfile`(
    IN entered_familyID VARCHAR(50),
    IN entered_phicID VARCHAR(50),
    IN entered_nhtsID VARCHAR(50),
    IN entered_fname VARCHAR(50),
    IN entered_mname VARCHAR(50),
    IN entered_lname VARCHAR(50),
    IN entered_barangay_id INT,
    IN entered_muncity_id INT,
    IN entered_province_id INT
)
begin
	-- Search for records based on the provided parameters
	select *
	from profile
	where 
        (familyID = entered_familyID OR entered_familyID IS NULL) AND
        (phicID = entered_phicID OR entered_phicID IS NULL) AND
        (nhtsID = entered_nhtsID OR entered_nhtsID IS NULL) AND
        (fname LIKE CONCAT('%', entered_fname, '%') OR entered_fname IS NULL) AND
        (mname LIKE CONCAT('%', entered_mname, '%') OR entered_mname IS NULL) AND
        (lname LIKE CONCAT('%', entered_lname, '%') OR entered_lname IS NULL) AND
        (barangay_id = entered_barangay_id OR entered_barangay_id IS NULL) AND
        (muncity_id = entered_muncity_id OR entered_muncity_id IS NULL) AND
        (province_id = entered_province_id OR entered_province_id IS NULL);
end