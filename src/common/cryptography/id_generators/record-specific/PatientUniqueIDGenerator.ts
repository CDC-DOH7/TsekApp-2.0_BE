import crypto from "crypto";

class PatientUniqueIDGenerator {
  private static base36encode(number: number): string {
    const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let base36 = "";
    while (number) {
      const i = number % 36;
      number = Math.floor(number / 36);
      base36 = alphabet[i] + base36;
    }
    return base36 || alphabet[0];
  }

  private static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  }

  private static hashString(input: string): string {
    return crypto.createHash("sha256").update(input).digest("hex");
  }

  private static getRandomBits(bits: number): number {
    return Math.floor(Math.random() * Math.pow(2, bits));
  }

  private static calculateSuffix(input: string): string {
    const sum = input
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return String(sum % 10);
  }

  public static generateCompactUniqueID(
    firstName: string,
    middleName: string,
    lastName: string,
    birthdate: string, // new parameter for birthdate
    barangayId: string,
    muncityId: string,
    provinceId: string
  ): string {
    // Check if no middle name, if none, substitute it to last name
    if (!middleName || middleName.trim() === "") {
      middleName = lastName;
    }

    // Parse and format the birthdate
    const birthDateObject = new Date(birthdate);
    const formattedBirthdate = this.formatDate(birthDateObject);

    const randomBits = this.getRandomBits(32);
    const name = firstName + middleName + lastName;
    const combinedString = `${formattedBirthdate}-${name}-${randomBits}`;
    const hash = this.hashString(combinedString);
    const uniqueSuffix = this.base36encode(parseInt(hash.slice(0, 8), 16));

    const combinedInitials = (
      firstName.charAt(0) +
      middleName.charAt(0) +
      lastName.charAt(0)
    ).toUpperCase();

    let uniqueID = `${formattedBirthdate}-${combinedInitials
      .slice(0, 3)
      .toUpperCase()}-${barangayId}-${muncityId}-${provinceId}-${uniqueSuffix.slice(0, 6)}`;

    const suffix = this.calculateSuffix(uniqueID);
    return `${uniqueID}-${suffix}`;
  }
}

export default PatientUniqueIDGenerator;
