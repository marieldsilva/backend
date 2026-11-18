import * as usermodel from "../models/userModel.js";
import ValidationError from "../utils/ValidationError.js";
import validator from 'validator';
import bcrypt from 'bcryptjs';

const doesuserExist = async(email) => {
    const existing = await usermodel.finduserbyEmail(email);

     if(existing.length > 0) {
        return {result: true, user: existing[0]};
    }

    return {result: false, user: undefined};
}
export const createAccount = async(user) => {
    if(!user.name || !user.email || !user.password){
        throw new ValidationError('Name, email and password is required!', 400);
    }

    if(!validator.isEmail(user.email)){
        throw new ValidationError('Improper email format!', 400);
    }
    if(!validator.isStrongPassword(user.password)){
        throw new ValidationError('Password is not strong enough.', 400)
    }
    const existing = await doesuserExist(user.email);

    if(existing.result){
        throw new ValidationError('An account with that email already exist', 400)
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    const result = await usermodel.insert(user.name, user.email, hashedPassword);

    if(!result || result <= 0){
        throw new Error('Unable to create an account. Please try again later')
    }

    return "Account created successfully";
}
export const login = async(user) => {
     if(!user.email || !user.password){
        throw new ValidationError('email and password is required!', 400);
    }
    const existing = await doesuserExist(user.email);

    if (!existing.result){
        throw new ValidationError('An account with that emaildoes not exist', 400);
    }

    const isCorrectPassword = await bcrypt.compare(user.password, existing.user.password);

    if(isCorrectPassword){
        throw new Error('Incorrect Password');
    }

    return 'Login successfully!';
}