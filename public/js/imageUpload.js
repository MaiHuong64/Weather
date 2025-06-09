const IMGBB_API_KEY = '9d96edf88cd1a4f124f6cd2a8fbfffba';

async function uploadToImgBB(file) {
    try {
        // Tạo FormData
        const formData = new FormData();
        formData.append('image', file);

        // Gọi API ImgBB
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (data.success) {
            return data.data.url;
        } else {
            throw new Error('Upload failed');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

async function handleImageSelect(input) {
    const file = input.files[0];
    if (!file) return null;

    if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh!');
        return null;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước ảnh không được vượt quá 5MB!');
        return null;
    }

    try {
        console.log("Uploading to ImgBB...");
        const imageUrl = await uploadToImgBB(file);
        console.log("Upload thành công:", imageUrl);
        
        return imageUrl;
    } catch (error) {
        alert('Lỗi khi upload ảnh: ' + error.message);
        return null;
    }
}

export { handleImageSelect }; 