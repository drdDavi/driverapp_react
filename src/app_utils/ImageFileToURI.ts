import Resizer from 'react-image-file-resizer';
import { fireFirebase } from '../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

const imageResizeFileUri = ({ file }: { file: File }): Promise<string> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1500,
      1500,
      'JPEG',
      95,
      0,
      (uri: any) => {
        resolve(uri as string);
      },
      'base64'
    );
  });

const getFirebaseStorageDownloadUrl = async ({ file }: { file: File }): Promise<string> => {
  let downloadUrl = '';

  const imageUri = await imageResizeFileUri({ file: file });
  const storageRef = fireFirebase.storage().ref().child('images').child(`${uuidv4()}.jpeg`);

  try {
    await storageRef.putString(imageUri, 'data_url');
    downloadUrl = await storageRef.getDownloadURL();
  } catch (error) {
    console.log(error);
  }

  return downloadUrl;
};
const getFirebaseStorageDownloadUrlList = async ({ files }: { files: Array<File> }): Promise<Array<string>> => {
  let downloadUrls = [];

  for (const file of files) {
    const downloadUrl = await getFirebaseStorageDownloadUrl({ file: file });
    if (downloadUrl !== '') downloadUrls.push(downloadUrl);
  }

  return downloadUrls;
};

export { imageResizeFileUri, getFirebaseStorageDownloadUrl, getFirebaseStorageDownloadUrlList };
