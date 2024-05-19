import { GetDocById, formatDoc } from "@/services/database";
import { db } from "@/services/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useReducer, useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRoot } from "./root";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
};

function reducer(state: any, { type, payload }: { type: any; payload: any }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
}

export function useFolder(
  folderId: null | string | undefined = null,
  folder = null
) {
  const { ROOT_FOLDER } = useRoot();
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);

  useEffect(() => {
    if (!folderId) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    GetDocById("folders", folderId)
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: doc },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    const qFolders = query(
      collection(db, "folders"),
      where("parentId", "==", folderId),
      where("userId", "==", currentUser?.uid),
      orderBy("createdAt")
    );
    return onSnapshot(qFolders, (snapshot) => {
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { childFolders: snapshot.docs.map((doc) => formatDoc(doc)) },
      });
    });
  }, [folderId, currentUser]);

  useEffect(() => {
    const q = query(
      collection(db, "files"),
      where("folderId", "==", folderId),
      where("userId", "==", currentUser?.uid),
      orderBy("createdAt")
    );
    return onSnapshot(q, (snapshot) => {
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: { childFiles: snapshot.docs.map((doc) => formatDoc(doc)) },
      });
    });
  }, [folderId, currentUser]);
  useEffect(() => {
    console.log(folder);
  }, [folderId, currentUser, folder]);
  return state;
}
