export class DocumentEntryModel implements IDocumentModel {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber: string;
  driversLicenseId: string;
  driversLicenseIssueDate: Date | null;
  driversLicenseExpiryDate: Date | null;
  gender: string;
  eyeColor: string;
  address1: string;
  address2: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  insurancePolicyId: string;
  insuranceIssueDate: Date | null;
  insuranceExpiryDate: Date | null;
  alternateId: string;
  alternateIdName: string;
  alternateIdIssueDate: Date | null;
  alternateIdExpiryDate: Date | null;
  vehicleVin: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleRegistrationDate: Date | null;
  vehicleRegistrationExpDate: Date | null;
  state: string;
  timestampCreated: Date | null;
  uid: string;
  userId: string;

  constructor(x: IDocumentModel) {
    {
      this.phoneNumber = x.phoneNumber;
      this.driversLicenseId = x.driversLicenseId;
      this.driversLicenseIssueDate = x.driversLicenseIssueDate;
      this.driversLicenseExpiryDate = x.driversLicenseExpiryDate;
      this.gender = x.gender;
      this.eyeColor = x.eyeColor;
      this.addressZip = x.addressZip;
      this.insurancePolicyId = x.insurancePolicyId;
      this.insuranceIssueDate = x.insuranceIssueDate;
      this.alternateIdName = x.alternateIdName;
      this.insuranceExpiryDate = x.insuranceExpiryDate;
      this.email = x.email;
      this.firstName = x.firstName;
      this.id = x.id;
      this.lastName = x.lastName;
      this.state = x.state;
      this.timestampCreated = x.timestampCreated;
      this.uid = x.uid;
      this.address1 = x.address1;
      this.address2 = x.address2;
      this.addressCity = x.addressCity;
      this.addressCountry = x.addressCountry;
      this.addressState = x.addressState;
      this.alternateId = x.alternateId;
      this.userId = x.userId;
      this.vehicleMake = x.vehicleMake;
      this.alternateIdExpiryDate = x.alternateIdExpiryDate;
      this.alternateIdIssueDate = x.alternateIdIssueDate;
      this.vehicleRegistrationDate = x.vehicleRegistrationDate;
      this.vehicleRegistrationExpDate = x.vehicleRegistrationExpDate;
      this.vehicleVin = x.vehicleVin;
      this.vehicleModel = x.vehicleModel;
      this.vehicleYear = x.vehicleYear;
    }
  }

  static fromFirestore(doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): DocumentEntryModel | null {
    const data = doc.data();
    if (!data)
      return new DocumentEntryModel({
        id: doc.id,
        email: '',
        firstName: '',
        lastName: '',
        state: '',
        timestampCreated: null,
        uid: '',
        address1: '',
        address2: '',
        addressCity: '',
        addressCountry: '',
        addressState: '',
        addressZip: '',
        alternateId: '',
        alternateIdExpiryDate: null,
        alternateIdIssueDate: null,
        alternateIdName: '',
        driversLicenseExpiryDate: null,
        driversLicenseId: '',
        driversLicenseIssueDate: null,
        eyeColor: '',
        gender: '',
        insuranceExpiryDate: null,
        insuranceIssueDate: null,
        insurancePolicyId: '',
        phoneNumber: '',
        userId: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleRegistrationDate: null,
        vehicleRegistrationExpDate: null,
        vehicleVin: '',
        vehicleYear: ''
      });

    return new DocumentEntryModel({
      id: doc.id,
      email: data['email'] ?? '',
      firstName: data['firstName'] ?? '',
      lastName: data['lastName'] ?? '',
      state: data['state'] ?? '',
      timestampCreated: data['timestampCreated']?.toDate() ?? null,
      uid: data['uid'] ?? '',
      address1: data['address1'] ?? '',
      address2: data['address2'] ?? '',
      addressCity: data['addressCity'] ?? '',
      addressCountry: data['addressCountry'] ?? '',
      addressState: data['addressState'] ?? '',
      addressZip: data['addressZip'] ?? '',
      alternateId: data['alternateId'] ?? '',
      alternateIdExpiryDate: data['alternateIdExpiryDate']?.toDate() ?? null,
      alternateIdIssueDate: data['alternateIdIssueDate']?.toDate() ?? null,
      alternateIdName: data['alternateIdName'] ?? '',
      driversLicenseExpiryDate: data['driversLicenseExpiryDate']?.toDate() ?? null,
      driversLicenseId: data['driversLicenseId'] ?? '',
      driversLicenseIssueDate: data['driversLicenseIssueDate']?.toDate() ?? null,
      eyeColor: data['eyeColor'] ?? '',
      gender: data['gender'] ?? '',
      insuranceExpiryDate: data['insuranceExpiryDate']?.toDate() ?? null,
      insuranceIssueDate: data['insuranceIssueDate']?.toDate() ?? null,
      insurancePolicyId: data['insurancePolicyId'] ?? '',
      phoneNumber: data['phoneNumber'] ?? '',
      userId: data['userId'] ?? '',
      vehicleMake: data['vehicleMake'] ?? '',
      vehicleModel: data['vehicleModel'] ?? '',
      vehicleRegistrationDate: data['vehicleRegistrationDate']?.toDate() ?? null,
      vehicleRegistrationExpDate: data['vehicleRegistrationExpDate']?.toDate() ?? null,
      vehicleVin: data['vehicleVin'] ?? '',
      vehicleYear: data['vehicleYear'] ?? ''
    });
  }
}

interface IDocumentModel {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber: string;
  driversLicenseId: string;
  driversLicenseIssueDate: Date | null;
  driversLicenseExpiryDate: Date | null;
  gender: string;
  eyeColor: string;
  address1: string;
  address2: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  insurancePolicyId: string;
  insuranceIssueDate: Date | null;
  insuranceExpiryDate: Date | null;
  alternateId: string;
  alternateIdName: string;
  alternateIdIssueDate: Date | null;
  alternateIdExpiryDate: Date | null;
  vehicleVin: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleRegistrationDate: Date | null;
  vehicleRegistrationExpDate: Date | null;
  state: string;
  timestampCreated: Date | null;
  uid: string;
  userId: string;
}
