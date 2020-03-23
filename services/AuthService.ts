const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { getUser } = require('../data/User');

export default class AuthService {
    authenticateUser = async(alias: string, password: string): Promise<boolean> => {

        const getUserPromise = getUser(alias);
        const user = await getUserPromise;
        console.log('auth service signin: ', user);
        const authenticated = await this.compareHash(password, user["password"]);
        return authenticated;
    }

    generateHash = async (password: string): Promise<string>  => {
        const saltPromise = bcrypt.genSalt(saltRounds).then(salt => {
            return salt;
        }).catch(err => {
            console.log('error', err); 
            return `error`; 
        })

        const salt = await saltPromise;
        const hashPromise = bcrypt.hash(password, salt);
        const hash = await hashPromise;
        return hash;
    }

    compareHash = async (password: string, hash: string): Promise<boolean>  => {

        const comparisonPromise = bcrypt.compare(password, hash).then(res => {
            return res;
        }).catch(err => {
            console.log('error', err); 
            return `error`; 
        });

        const comparison = await comparisonPromise;
        return comparison; // true if match, false if no match
    }
}