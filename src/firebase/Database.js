
import { db } from "./firebaseAuth";
import { ref,onValue } from "@firebase/database";


//read data from db
export const readData=()=>{
    const dataArr = [];
    const query = ref(db,"chats")
    onValue(query,(snapshot)=>{
        const data = snapshot.val()
        dataArr.push(data)
    })
    return dataArr
}


// write data into db
export const writeData =(content,userId)=>{
return set(ref(db,'chats'),{
    content:content,
    uid:userId
})
}