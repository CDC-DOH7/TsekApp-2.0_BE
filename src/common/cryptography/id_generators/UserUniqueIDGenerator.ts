// class to generate unique IDs for supervisors and officers 

import crypto from "crypto";

class UserUniqueIDGenerator {
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
    designation: string,
    facilityCode: string
  ): string {
    // check if no middle name, if none, substitute it to last name, hence, repeating the initials
    if (!middleName || middleName.trim() === "") {
      middleName = lastName;
    }

    const randomBits = this.getRandomBits(32);
    const name = firstName + middleName + lastName;
    const combinedString = `${name}-${randomBits}`;

    const hash = this.hashString(combinedString);
    const uniqueSuffix = this.base36encode(parseInt(hash.slice(0, 8), 16));

    const combinedInitials = (
      firstName.charAt(0) +
      middleName.charAt(0) +
      lastName.charAt(0)
    ).toUpperCase();

    let uniqueID = `${facilityCode.slice(13, 18).toUpperCase()}-${designation
      .slice(0, 3)
      .toUpperCase()}-${combinedInitials}-${uniqueSuffix.slice(0, 6)}`;

    const suffix = this.calculateSuffix(uniqueID);
    return `${uniqueID}-${suffix}`;
  }
}

export default UserUniqueIDGenerator;
