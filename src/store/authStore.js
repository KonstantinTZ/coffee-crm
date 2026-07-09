// src/stores/AuthStore.js
import { makeAutoObservable, runInAction } from 'mobx'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '../firebase/config'

class AuthStore {
    user = null;
    loading = true;
    error = null;

    constructor() {
        makeAutoObservable(this)

        // Слушаем изменения авторизации
        onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userData = await this.getUserData(firebaseUser.uid)
                    runInAction(() => {
                        this.user = {
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName,
                            photoURL: firebaseUser.photoURL,
                            emailVerified: firebaseUser.emailVerified,
                            ...userData
                        }
                        this.loading = false
                    })
                } catch (err) {
                    runInAction(() => {
                        this.error = 'Failed to load user data'
                        this.loading = false
                    })
                }
            } else {
                runInAction(() => {
                    this.user = null
                    this.loading = false
                })
            }
        })
    }

    // Получить доп. данные пользователя из Firestore
    async getUserData(uid) {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid))
            return userDoc.exists() ? userDoc.data() : {}
        } catch {
            return {}
        }
    }

    // Email регистрация
    async registerWithEmail(email, password, additionalData = {}) {
        try {
            this.loading = true
            this.error = null

            const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)

            // Сохраняем дополнительные данные в Firestore
            await setDoc(doc(db, 'users', firebaseUser.uid), {
                email: firebaseUser.email,
                createdAt: new Date().toISOString(),
                ...additionalData
            })

            runInAction(() => {
                this.user = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    ...additionalData
                }
            })

            return firebaseUser
        } catch (error) {
            runInAction(() => {
                this.error = this.getFirebaseErrorMessage(error.code)
                this.loading = false
            })
            throw error
        }
    }

    // Email логин
    async loginWithEmail(email, password) {
        try {
            this.loading = true
            this.error = null

            await signInWithEmailAndPassword(auth, email, password)

        } catch (error) {
            runInAction(() => {
                this.error = this.getFirebaseErrorMessage(error.code)
                this.loading = false
            })
            throw error
        }
    }


    // Выход
    async logout() {
        try {
            this.loading = true
            await signOut(auth)
            runInAction(() => {
                this.user = null
                this.loading = false
            })
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to logout'
                this.loading = false
            })
        }
    }

    // Сброс пароля
    async resetPassword(email) {
        try {
            this.loading = true
            this.error = null
            await sendPasswordResetEmail(auth, email)
            runInAction(() => {
                this.loading = false
            })
        } catch (error) {
            runInAction(() => {
                this.error = this.getFirebaseErrorMessage(error.code)
                this.loading = false
            })
            throw error
        }
    }

    // Обновить данные пользователя
    async updateUserProfile(data) {
        if (!this.user?.uid) return

        try {
            await setDoc(doc(db, 'users', this.user.uid), data, { merge: true })
            runInAction(() => {
                this.user = { ...this.user, ...data }
            })
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to update profile'
            })
        }
    }

    // Обработка ошибок Firebase
    getFirebaseErrorMessage(code) {
        const messages = {
            'auth/user-not-found': 'Пользователь не найден',
            'auth/wrong-password': 'Неверный пароль',
            'auth/email-already-in-use': 'Email уже используется',
            'auth/weak-password': 'Пароль должен быть минимум 6 символов',
            'auth/invalid-email': 'Неверный формат email',
            'auth/popup-closed-by-user': 'Окно авторизации закрыто'
        }
        return messages[code] || 'Произошла ошибка авторизации'
    }

    // Геттеры
    get isAuthenticated() {
        return !!this.user
    }

    get userDisplayName() {
        return this.user?.displayName || this.user?.email?.split('@')[0] || 'User'
    }
}

// Создаем единственный экземпляр
const authStore = new AuthStore()
export default authStore