
export const readFiles = async (files, type) => {
    const reader = new FileReader();
    const fileObjects = await Promise.all(Array.from(files).map((file) => {
        return new Promise(
            (resolve, reject) => {
                reader.onload = (e) => {
                    const ArrayBuffer = e.target.result;
                    const blob = new Blob([ArrayBuffer], { type: file.type });
                    const url = URL.createObjectURL( blob );
                    return resolve({
                        buffer: ArrayBuffer,
                        url: url,
                        name: file.name,
                        fileType: file.type,
                        size: file.size,
                        type: type
                    })
                }
                reader.onerror = (err) => {
                    return reject(err);
                }
                reader.readAsArrayBuffer(file);
            }
        )
    }));
    return fileObjects;
}