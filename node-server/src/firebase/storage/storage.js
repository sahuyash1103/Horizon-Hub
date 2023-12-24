const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage')

async function storeProfilePic(file, uid) {
    const storageFB = getStorage();
    const fileExt = file.originalname?.split('.').pop() || 'jpeg';
    const fileName = `profile-pics/${uid}.${fileExt}`;
    const storageRef = ref(storageFB, fileName)
    const metadata = {
        contentType: 'image/jpeg',
    }
    const uploadTask = await uploadBytesResumable(storageRef, file.buffer, metadata);
    return getDownloadURL(uploadTask.ref);
}

async function storeMessageImage(file, cId, mId) {
    const storageFB = getStorage();
    const fileExt = file.originalname?.split('.').pop() || 'jpeg';
    const fileName = `files/img/${cId}/${mId}.${fileExt}`;
    const storageRef = ref(storageFB, fileName)
    const metadata = {
        contentType: 'image/jpeg',
    }
    const uploadTask = await uploadBytesResumable(storageRef, file.buffer, metadata);
    return getDownloadURL(uploadTask.ref);
}

async function storeMessageDoc(file, cId, mId) {
    const storageFB = getStorage();
    const fileExt = file.originalname?.split('.').pop() || file.name?.split('.').pop() || 'txt';
    const fileName = `files/doc/${cId}/${mId}.${fileExt}`;
    const storageRef = ref(storageFB, fileName);
    const metadata = {
    }

    const uploadTask = await uploadBytesResumable(storageRef, file.buffer, metadata);
    return getDownloadURL(uploadTask.ref);
}

module.exports = { storeProfilePic, storeMessageImage, storeMessageDoc };