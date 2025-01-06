import { createWorker } from 'tesseract.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    const { image } = req.body;

    if (!image) {
        res.status(400).json({ error: 'No image provided' });
        return;
    }

    try {
        const worker = createWorker({
            logger: m => console.log(m),
        });

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(image);
        await worker.terminate();

        res.status(200).json({ text });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to process image' });
    }
}