import crypto from "crypto";

class RecordsUniqueIDGenerator {
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

  private static getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
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
    patientId: string,
    facilityId: string,
    idType: number
  ): string {
    const currentDate = this.getCurrentDate();
    const randomBits = this.getRandomBits(32);

    const combinedString = `${currentDate}-${randomBits}`;
    const hash = this.hashString(combinedString);
    const uniqueSuffix = this.base36encode(parseInt(hash.slice(0, 4), 16));

    let identifier: string = ""; // string that defines the ID's purpose

    // choose what type of ID is generated
    switch (idType) {
      // for consultation id
      case 1:
        identifier = "CON";
        break;

      // for family id
      case 2:
        identifier = "FAM";
        break;

      // for family id
      case 2:
        identifier = "MNG";
        break;

      // for NCD factor
      case 3:
        identifier = "NCD";
        break;

      // for Past Medical History
      case 4:
        identifier = "PMH";
        break;

      // for referrals
      case 5:
        identifier = "REF";
        break;

      // for risk screening
      case 6:
        identifier = "RSK";
        break;

      // default to random generation
      default:
        identifier = "RAN";
        break;
    }

    let uniqueID = `${currentDate}-${identifier}-${patientId.toUpperCase()}-${facilityId
      .slice(13, 18)
      .toUpperCase()}-${uniqueSuffix}`;

    const suffix = this.calculateSuffix(uniqueID);
    return `${uniqueID}-${suffix}`;
  }
}

export default RecordsUniqueIDGenerator;
