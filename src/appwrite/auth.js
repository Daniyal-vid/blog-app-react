import conf from "../conf/conf";
import { Client,Account,ID } from "appwrite";
// these are the imports for the authentoication functions we will get the reference from the appwrite docs but in order to make our app platform indepedent so that if wer shhift database or service in fitutre it will not affect the functionality 
// we will proceed by creating ther class and creating its object so that we can access the class methods using the object of that class it will simply the understanding of the concept 

export class AuthService{
    client = new Client(); 
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            // creation of account
        this.account = new Account(this.client)

    }
    // now we will create a function for creating an account that will be not platform dependent
    async createAccount({email,password,name}) {
        try {
           const userAccount = await this.account.create
           (ID.unique(), email,password,name);
           if (userAccount){
                //call another method
                return this.login({email, password});
           }
           else{
                return userAccount;
           }
            
        } catch (error) {
            throw error;
            
        }
    }
    async login({email,password}){
        try {
           return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
            
        }

    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions();
            
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error);

        }

    }
}
// cretaing the object of the class
const authService = new AuthService();
export default authService