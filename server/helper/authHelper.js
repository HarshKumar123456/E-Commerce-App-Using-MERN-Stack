import "dotenv/config";
import bcrypt from "bcrypt";

const hashPassword = async (password) => {
    try {
        const saltRounds = process.env.SALT_ROUNDS || 10;
        const hash = await bcrypt.hashSync(password,saltRounds);
        return hash;
    } catch (error) {
        console.log(`Sorry Some Error occured.... ${error}`);
    }
};

const comparePassword = async (password,hashFromDatabase) => {
    const isRightPassword = await bcrypt.compareSync(password,hashFromDatabase);
    return isRightPassword;
}   

export {hashPassword,comparePassword};

