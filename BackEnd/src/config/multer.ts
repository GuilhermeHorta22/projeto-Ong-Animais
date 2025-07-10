import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
        const hash = crypto.randomBytes(6).toString('hex');
        const filename = `${hash}-${file.originalname}`;
        callback(null, filename);
    }
});

export const upload = multer({ storage });
