import React, { useState } from 'react';

export default function ImageUploader({ setQuestion }) {
    const [loadingImage, setLoadingImage] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoadingImage(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result.split(',')[1];
            try {
                const response = await fetch('/api/process-image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image: base64Image }),
                });
                const data = await response.json();
                if (response.ok) {
                    setQuestion(data.text);
                } else {
                    alert(data.error || 'Failed to process image.');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('An error occurred while uploading the image.');
            } finally {
                setLoadingImage(false);
            }
        };
    };

    return (
        <div className="mb-4">
            <label htmlFor="imageUpload" className="block text-gray-700 font-bold mb-2">
                Upload Physics Question Image
            </label>
            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 box-border"
            />
            {loadingImage && <p className="text-blue-500 mt-2">Processing image...</p>}
        </div>
    );
}