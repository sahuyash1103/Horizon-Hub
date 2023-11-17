const { getStorage, ref ,uploadBytesResumable, getDownloadURL } = require('firebase/storage')

async function storeProfilePic(file, uid) {
    const storageFB = getStorage();
    const fileName = `profile-pics/${uid}`;
    const storageRef = ref(storageFB, fileName)
    const metadata = {
        contentType: 'image/jpeg',
    }
    const uploadTask = await uploadBytesResumable(storageRef, file.buffer, metadata);
    return getDownloadURL(uploadTask.ref);
}

module.exports = { storeProfilePic };