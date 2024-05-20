import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage,Query } from "appwrite";
// just like auth.js we will create a class , constructor , and in the  class a client which is done by the constructor

export class Service{
    client = new Client();
    databases;
    bucket; //it is variable name for storage 

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        this.client.setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({
        tittle,slug,content,featuredImage,
        status, userId}){
            try {
                return await this.databases.createDocument(
                  conf.appwriteDatabseId,
                  conf.appwriteCollectionId,
                  slug,
                  {
                    tittle,
                    content,
                    featuredImage,
                    status,
                    userId,
                  }
                );
                
            } catch (error) {
                console.log("Appwrite service :: createPost :: error",error);

            }
        }
    async updatePost(slug,{tittle,content,featuredImage,
        status, userId}){
            try {
                return  await this.databases.updateDocument()
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug,{
                    tittle,
                    content,
                    featuredImage,
                    status
                }
            } catch (error) {
                console.log("Appwrite service :: updatePost :: error",error);

            }
        }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug

            )
            return true 
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false
        }            

    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
        }
    } //slug is the documentID given or set by us
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
            
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error",error);
        }
    }
    //File upload service
    //in this bucket is used which is the storage as defined above in the constructor
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwirteBucketId,
                ID.unique(),
                file

            )
            
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwirteBucketId,
                fileId
            )
            
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false
        }
        
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwirteBucketId,
            fileId
        )
    }
}
const service = new Service()
export default service