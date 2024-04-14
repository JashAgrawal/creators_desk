import { addDoc, collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import { db } from "./firebase";

export const formatDoc=(doc:any)=>{
    return {...doc.data(),id:doc.id}
}
export const AddRecords = async (collectionName: string, data: any) => {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
};

export const GetDocs = async (collectionName: string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc=>formatDoc(doc));
};

export const GetDocsByCondition = async (collectionName: string, conds: any[]) => {
    const q = query(collection(db, collectionName), ...conds );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc=>formatDoc(doc));
};

export const GetDocById = async (collectionName: string, id: string) => {
    const querySnapshot = await getDoc(doc(db,collectionName,id));
    return formatDoc(querySnapshot);
};