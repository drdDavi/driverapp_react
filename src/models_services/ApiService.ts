import axios from 'axios';
import { fireFirebase } from '../firebase/firebase';
import { IAuthUserRegister } from '../models/AuthUserModel';

const EndPointUserAdd = '';
const EndPointUserDelete = '';

const EndPointNotificationAdd = '';
// const EndPointNotificationAdd = 'https://us-central1-livingtruthchurch-832d8.cloudfunctions.net/httpsNotifications/api/v1/sendNotificationToUsers';

export class ApiService {
  static userAdd = async function (authUser: IAuthUserRegister): Promise<boolean> {
    try {
      const response = await axios.post(EndPointUserAdd, {
        email: authUser.email,
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        password: authUser.password,
        isAdmin: authUser.isAdmin,
        isActive: true,
        timestampAdded: fireFirebase.firestore.Timestamp.now().toDate(),
        timestampUpdated: fireFirebase.firestore.Timestamp.now().toDate()
      });

      if (response.status === 200) {
        console.log(response.data);
        return true;
      } else {
        console.log(response.data);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  static userDelete = async function (uid: string): Promise<boolean> {
    try {
      const response = await axios.post(EndPointUserDelete, {
        uid: uid
      });

      if (response.status === 200) {
        console.log(response.data);
        return true;
      } else {
        console.log(response.data);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  static sendNotificationToUsers = async function ({ title, body }: { title: string; body: string }): Promise<boolean> {
    try {
      const response = await axios.post(EndPointNotificationAdd, {
        title: title,
        body: body
      });

      if (response.status === 200) {
        console.log(response.data);
        return true;
      } else {
        console.log(response.data);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}
