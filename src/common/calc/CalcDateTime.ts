import dateTimeFormatOptions from "../constants/DateTimeFormatConfig";

const calculateCurrentDateTime = (): string => {
    const now: Date = new Date();
    return now.toLocaleString('en-US', dateTimeFormatOptions);
}

export default calculateCurrentDateTime;