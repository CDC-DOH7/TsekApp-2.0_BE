export const calculateAgeGroup = (patientAge: number | null | undefined): number => {
    if(patientAge == null){
        return 0;
    }
    
    // young adult
    if(patientAge >= 20 && patientAge <= 39){
        return 1;
    }
    // middle-aged adult
    else if(patientAge >= 40 && patientAge <= 59){
        return 2;
    }
    // senior citizen
    else if(patientAge >= 60){
        return 3;
    }
    else{
        return 0;
    }
}