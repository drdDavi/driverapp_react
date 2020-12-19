import { mountStoreDevtool } from 'simple-zustand-devtools';
import create from 'zustand';
import { fireAuth, fireFirestore } from '../firebase/firebase';
import { AuthUser } from '../models/AuthUserModel';
import { DocumentModel } from '../models/DocumentModel';
import { NotificationModel } from '../models/NotificationModel';

type State = {
  documents: DocumentModel[];
  streamDocuments: () => void;

  notifications: NotificationModel[];
  streamNotifications: () => void;

  users: AuthUser[];
  streamUsers: () => void;

  isInitializing?: boolean;
  authUser: AuthUser | null;
  streamAuthUser: () => void;
};

export const useAppStore = create<State>((set, get) => ({
  /* ------------------------------ NOTE AUTHUSER ----------------------------- */
  isInitializing: true,
  authUser: null,

  streamAuthUser: () => {
    fireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const query = await fireFirestore.collection('users').doc(user.uid).get();

        const authUser = AuthUser.fromFirestore(query);

        set((state) => {
          return { ...state, authUser: authUser, isInitializing: false };
        });
      } else {
        set((state) => {
          return { ...state, authUser: null, isInitializing: false };
        });
      }
    });
  },

  /* ------------------------------ NOTE Users ----------------------------- */
  users: [],

  streamUsers: () => {
    if (get().users.length === 0)
      fireFirestore.collection('users').onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
        let users: AuthUser[] = [];
        querySnapshot.docs.forEach((docSnapshot) => {
          const res = AuthUser.fromFirestore(docSnapshot);
          if (res) users.push(res);
        });

        set((state) => {
          return { ...state, users: users };
        });
      });
  },
  /* ------------------------------ NOTE PRODUCTS ----------------------------- */
  documents: [],

  streamDocuments: () => {
    if (get().documents.length === 0)
      fireFirestore
        .collection('documents')
        .limit(200)
        .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          let documents: DocumentModel[] = [];

          querySnapshot.docs.forEach((docSnapshot) => {
            const res = DocumentModel.fromFirestore(docSnapshot);
            if (res) documents.push(res);
          });

          set((state) => {
            return { ...state, documents: documents };
          });
        });
  },

  notifications: [],
  streamNotifications: () => {
    if (get().notifications.length === 0)
      fireFirestore.collection('notifications').onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
        let notifications: NotificationModel[] = [];

        querySnapshot.docs.forEach((docSnapshot) => {
          const res = NotificationModel.fromFirestore(docSnapshot);
          if (res) notifications.push(res);
        });

        set((state) => {
          return { ...state, notifications: notifications };
        });
      });
  }
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useAppStore);
}
