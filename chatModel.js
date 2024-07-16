import { getDB } from "./mongodb.js";


export default  class ChatModel{

 constructor(userName,message,timestamp)
 {
    this.userName=userName;
    this.message=message;
    this.timestamp=timestamp;
 }

 
 async getChat()
 {
   const db=getDB();

  const messages= await db.collection("chat").find().toArray();
//   console.log(messages)
  return messages;
 }

}