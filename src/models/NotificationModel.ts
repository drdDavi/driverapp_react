export class NotificationModel implements IEventModel {
  body: string;
  title: string;
  linkUrl: string;
  id: string;
  timestampAdded: Date;

  constructor(x: IEventModel) {
    {
      this.id = x.id;
      this.linkUrl = x.linkUrl;
      this.body = x.body;
      this.timestampAdded = x.timestampAdded;
      this.title = x.title;
    }
  }

  static fromFirestore(doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): NotificationModel | null {
    const data = doc.data();
    if (!data) return null;
    return new NotificationModel({
      body: data['body'] ?? '',
      id: doc.id,
      linkUrl: data['linkUrl'] ?? '',
      timestampAdded: data['timestampAdded']?.toDate() ?? Date.now(),
      title: data['title'] ?? ''
    });
  }
}

interface IEventModel {
  body: string;
  title: string;
  linkUrl: string;
  id: string;
  timestampAdded: Date;
}
