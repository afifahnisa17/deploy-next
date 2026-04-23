import { 
    getFirestore, 
    collection, 
    getDocs, 
    doc, 
    getDoc,
    query,
    addDoc,
    where,
    updateDoc,
} from 'firebase/firestore';
import app from './firebase';
import bcrypt from 'bcrypt';

const db = getFirestore(app);

type UserRecord = {
    id?: string;
    email: string;
    fullname?: string;
    password?: string;
    role?: string;
    image?: string;
    type?: string;
    [key: string]: any;
};

type SignUpCallback = (result: { status: 'success' | 'error'; message: string }) => void;
type GoogleSignInCallback = (result: {
    status: boolean;
    message: string;
    data?: UserRecord;
}) => void;

async function findUserByEmail(email: string): Promise<UserRecord | null> {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const userDoc = querySnapshot.docs[0];
    return {
        id: userDoc.id,
        ...userDoc.data(),
    } as UserRecord;
}

export async function retrieveProducts(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(db, collectionName, id)); 
    const data = snapshot.data();
    return data;
}

export async function signIn(
    email: string
) {
    return findUserByEmail(email);
}


export async function signUp (
    userData: {
        email: string;
        fullname: string;
        password: string;
        role?: string;
    },
    callback: SignUpCallback,
) {
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        callback({
            status: 'error',
            message: 'Email already exists',
        });
        return;
    }

    try {
        const payload = {
            ...userData,
            password: await bcrypt.hash(userData.password, 10),
            role: 'member',
        };

        await addDoc(collection(db, 'users'), payload);

        callback({
            status: 'success',
            message: 'User registered successfully',
        });
    } catch (error: any) {
        callback({
            status: 'error',
            message: error?.message || 'Failed to register user',
        });
    }
}

export async function signInWithGoogle(userData: UserRecord, callback: GoogleSignInCallback) {
    try {
        const existingUser = await findUserByEmail(userData.email);
        const payload: UserRecord = { ...userData };

        if (existingUser?.id) {
            payload.role = existingUser.role;
            await updateDoc(doc(db, 'users', existingUser.id), payload);
        } else {
            payload.role = 'member';
            await addDoc(collection(db, 'users'), payload);
        }

        callback({
            status: true,
            message: 'User registered and logged in with Google',
            data: payload,
        });
    } catch (error: any) {
        callback({
            status: false,
            message: error?.message || 'Failed to register user with Google',
        });
    }
}
