export class AuthUser implements IAuthUser {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  isActive: boolean;
  isAdmin: boolean;
  timestampAdded: Date;
  timestampLastLogin: Date;

  constructor(x: IAuthUser) {
    this.email = x.email;
    this.firstName = x.firstName;
    this.id = x.id;
    this.lastName = x.lastName;
    this.isActive = x.isActive;
    this.isAdmin = x.isAdmin;
    this.timestampAdded = x.timestampAdded;
    this.timestampLastLogin = x.timestampLastLogin;
  }

  static fromFirestore(doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): AuthUser | null {
    const data = doc.data();
    if (!data) return null;

    return new AuthUser({
      email: data['email'] ?? '',
      firstName: data['firstName'] ?? '',
      id: doc.id,
      lastName: data['lastName'] ?? '',
      isActive: data['isActive'] ?? true,
      isAdmin: data['isAdmin'] ?? false,
      timestampAdded: data['timestampAdded']?.toDate() ?? new Date(),
      timestampLastLogin: data['timestampLastLogin']?.toDate() ?? new Date()
    });
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

interface IAuthUser {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  isActive: boolean;
  isAdmin: boolean;
  timestampAdded: Date;
  timestampLastLogin: Date;
}
export interface IAuthUserRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isAdmin: boolean;
}

export interface IAuthUserUpdate {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isAdmin: boolean;
}
