import bcrypt from "bcrypt";
export default class Hash {
  static  make(password: string): string {
    const numSaltRounds = 8;
    const hash = bcrypt.hashSync(password, numSaltRounds);
    return hash;
  }
  static verify(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
