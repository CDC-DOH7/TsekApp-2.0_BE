export const calculateAgeGroup = (patientAge: number | null | undefined): number => {
    if(patientAge == null){
        return 0;
    }
    
    // young adult 1
    if(patientAge >= 20 && patientAge <= 29){
        return 1;
    }
    // young adult 2
    if(patientAge >= 30 && patientAge <= 39){
        return 2;
    }
    // middle-aged adult
    else if(patientAge >= 40 && patientAge <= 49){
        return 3;
    }
    // middle-aged adult
    else if(patientAge >= 50 && patientAge <= 59){
        return 4;
    }
    // senior citizen
    else if(patientAge >= 60){
        return 5;
    }
    else{
        return 0;
    }
}