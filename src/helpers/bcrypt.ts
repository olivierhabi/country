import bcrypt from "bcryptjs";
const compare = (plainPassword: string, encrypted: string) => {
  try {
    return bcrypt.compareSync(plainPassword, encrypted);
  } catch (error) {
    throw error;
  }
};

export default { compare };
