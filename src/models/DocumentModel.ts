export class DocumentModel implements IDocumentModel {
  driversLicenseFront: DocumentItemModel | null;
  driversLicenseBack: DocumentItemModel | null;
  driversInsuranceCardFront: DocumentItemModel | null;
  driversInsuranceCardBack: DocumentItemModel | null;
  driversVehicleRegistrationFront: DocumentItemModel | null;
  driversVehicleRegistrationBack: DocumentItemModel | null;
  driversTaxiLimousineIdFront: DocumentItemModel | null;
  driversTaxiLimousineIdBack: DocumentItemModel | null;
  driversPicture: DocumentItemModel | null;
  id: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  timestampCreated: Date;
  state: string;
  note: string;

  constructor(x: IDocumentModel) {
    {
      this.driversInsuranceCardBack = x.driversInsuranceCardBack;
      this.driversInsuranceCardFront = x.driversInsuranceCardFront;
      this.driversLicenseBack = x.driversLicenseBack;
      this.driversLicenseFront = x.driversLicenseFront;
      this.driversPicture = x.driversPicture;
      this.driversTaxiLimousineIdBack = x.driversTaxiLimousineIdBack;
      this.driversTaxiLimousineIdFront = x.driversTaxiLimousineIdFront;
      this.driversVehicleRegistrationBack = x.driversVehicleRegistrationBack;
      this.driversVehicleRegistrationFront = x.driversVehicleRegistrationFront;
      this.email = x.email;
      this.firstName = x.firstName;
      this.id = x.id;
      this.lastName = x.lastName;
      this.note = x.note;
      this.state = x.state;
      this.timestampCreated = x.timestampCreated;
      this.uid = x.uid;
    }
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getTotalDocuments(): string {
    let totaldocuments = 0;
    if (this.driversInsuranceCardBack?.imageUrl) totaldocuments += 1;
    if (this.driversInsuranceCardFront?.imageUrl) totaldocuments += 1;
    if (this.driversLicenseBack?.imageUrl) totaldocuments += 1;
    if (this.driversLicenseFront?.imageUrl) totaldocuments += 1;
    if (this.driversTaxiLimousineIdBack?.imageUrl) totaldocuments += 1;
    if (this.driversTaxiLimousineIdFront?.imageUrl) totaldocuments += 1;
    if (this.driversVehicleRegistrationBack?.imageUrl) totaldocuments += 1;
    if (this.driversVehicleRegistrationFront?.imageUrl) totaldocuments += 1;
    if (this.driversPicture?.imageUrl) totaldocuments += 1;
    return `${totaldocuments}/9 documents`;
  }

  static fromFirestore(doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): DocumentModel | null {
    const data = doc.data();
    if (!data) return null;
    return new DocumentModel({
      id: doc.id,
      driversInsuranceCardBack: DocumentItemModel.fromMap(data['driversInsuranceCardBack']),
      driversInsuranceCardFront: DocumentItemModel.fromMap(data['driversInsuranceCardFront']),
      driversLicenseBack: DocumentItemModel.fromMap(data['driversLicenseBack']),
      driversLicenseFront: DocumentItemModel.fromMap(data['driversLicenseFront']),
      driversPicture: DocumentItemModel.fromMap(data['driversPicture']),
      driversTaxiLimousineIdBack: DocumentItemModel.fromMap(data['driversTaxiLimousineIdBack']),
      driversTaxiLimousineIdFront: DocumentItemModel.fromMap(data['driversTaxiLimousineIdFront']),
      driversVehicleRegistrationBack: DocumentItemModel.fromMap(data['driversVehicleRegistrationBack']),
      driversVehicleRegistrationFront: DocumentItemModel.fromMap(data['driversVehicleRegistrationFront']),
      email: data['email'],
      firstName: data['firstName'],
      lastName: data['lastName'],
      note: data['note'],
      state: data['state'],
      timestampCreated: data['timestampCreated'].toDate() ?? new Date(),
      uid: data['uid']
    });
  }
}

interface IDocumentModel {
  driversLicenseFront: DocumentItemModel | null;
  driversLicenseBack: DocumentItemModel | null;
  driversInsuranceCardFront: DocumentItemModel | null;
  driversInsuranceCardBack: DocumentItemModel | null;
  driversVehicleRegistrationFront: DocumentItemModel | null;
  driversVehicleRegistrationBack: DocumentItemModel | null;
  driversTaxiLimousineIdFront: DocumentItemModel | null;
  driversTaxiLimousineIdBack: DocumentItemModel | null;
  driversPicture: DocumentItemModel | null;
  id: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  timestampCreated: Date;
  state: string;
  note: string;
}

export class DocumentItemModel implements IDocumentItem {
  state: string;
  imageUrl: string;
  timestampCreated: Date;

  constructor(x: IDocumentItem) {
    this.state = x.state;
    this.imageUrl = x.imageUrl;
    this.timestampCreated = x.timestampCreated;
  }

  toMap() {
    return {
      state: this.state,
      imageUrl: this.imageUrl,
      timestampCreated: this.timestampCreated
    };
  }

  static fromMap(map: any) {
    if (map == null) return null;

    return new DocumentItemModel({
      state: map['state'],
      imageUrl: map['imageUrl'],
      timestampCreated: map['timestampCreated']?.toDate() ?? new Date()
    });
  }
}

export interface IDocumentItem {
  state: string;
  imageUrl: string;
  timestampCreated: Date;
}
