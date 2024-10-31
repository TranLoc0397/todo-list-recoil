import { DB } from "../db-connect/firebase";

const   getTodoList = async () => {
    let arr = []
    await DB.collection("todos")
    .orderBy("time", "desc")
    .onSnapshot(async (snapshot) => {
        arr = await snapshot.docs.map((doc) => {
        let info =  doc.data()
        return {
          id: doc.id,
          ...info
        }
      });
    })
    return arr
};

export { getTodoList };
