
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { getUser } = require('./SigninDAO');


class SigninService {
    constructor(){}

    signin = async(alias: string, password: string): Promise<boolean> => {
        const userPromise = getUser(alias);
        const user = await userPromise;
        const authenticated = await this.compareHash(password, user["hash"]);
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
    
  // fetch user
  // compare password to hash
  // return success/error
}

module.exports = SigninService