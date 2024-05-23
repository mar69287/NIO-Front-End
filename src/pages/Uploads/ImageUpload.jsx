import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { FaCheck } from "react-icons/fa";

const apiUrl = 'http://localhost:3000/api/upload';
const chunkSize = 10 * 1024;

const ImageUpload = ({ label, setImageViewPaths, imageViewPaths, name }) => {
    const [chunkIndex, setChunkIndex] = useState(null);
    const [baseName, setBaseName] = useState('');
    const [currentFile, setCurrentFile] = useState(null);
    const [uploaded, setUploaded] = useState(true);

    useEffect(() => {
        if (currentFile && chunkIndex === null && uploaded === false) {
            console.log("Uploading Document...");
            setBaseName(`tmp_${Date.now()}_${currentFile.name}`);
            setChunkIndex(0);
        }

        if (chunkIndex !== null && uploaded === false) readAndUploadChunk();

        if (!currentFile) {
            setChunkIndex(null);
            setUploaded(null);
        }
    }, [currentFile, chunkIndex, uploaded]);

    const handleImage = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setCurrentFile(file);
            setUploaded(false);
        }
    }

    const readAndUploadChunk = () => {
        if (!currentFile || uploaded !== false) return;

        const reader = new FileReader();
        const from = chunkIndex * chunkSize;
        const to = Math.min(from + chunkSize, currentFile.size);
        const blob = currentFile.slice(from, to);
        
        reader.onload = async (event) => {
            const totalChunks = Math.ceil(currentFile.size / chunkSize);
            const base64Data = event.target.result.split(',')[1];
            const payload = {
                ext: currentFile.name.split('.').pop(),
                chunk: `data:image/${currentFile.type.split('/')[1]};base64,${base64Data}`,
                chunkIndex: chunkIndex,
                totalChunks: totalChunks,
                baseName: baseName
            };

            try {
                console.log(`Uploading chunk ${chunkIndex + 1} of ${totalChunks}`);
                const response = await axios.post(apiUrl, payload, {
                    headers: { 'Content-Type': 'application/octet-stream' }
                });
                const chunkNum = chunkIndex + 1;
                const lastChunk = (chunkNum === totalChunks);
                if (lastChunk) {
                    const imagePath = response.data.file.replace(/^\.\//, '/');
                    console.log(imagePath)
                    setImageViewPaths((prev) => [...prev, imagePath]);
                    setUploaded(true);
                    setChunkIndex(null);
                    setCurrentFile(null);
                } else {
                    setChunkIndex(chunkNum);
                }
            } catch (error) {
                console.error(`Failed to upload chunk ${chunkIndex + 1}:`, error.response?.data || error.message);
            }
        };

        reader.readAsDataURL(blob);
    }

    return (
        <div className="mb-3 flex flex-col justify-start items-start">
            <label className="text-gray-700 text-md mb-2 font-medium" htmlFor="image">
                {label}
            </label>
            <label className="w-full flex justify-center gap-1 items-center bg-white text-blue rounded shadow tracking-wide border border-blue cursor-pointer py-[7px]">
                {
                    imageViewPaths.length < 5 ? (
                        uploaded === false ? (
                            <Loader />
                        ) : (
                            <>
                                <span className="text-base leading-normal">{imageViewPaths.length > 0 ? "Add another image" : "Add image"}</span>
                                <span className="text-base leading-normal text-slate-500">(.png, jpeg, jpg)</span>
                                <input type="file" id="image" accept=".png, .jpeg, .jpg" className="hidden" onChange={handleImage} disabled={!name || imageViewPaths.length >= 5}/>
                            </>
                        )
                    ) : (
                        <>
                            <span className="text-base leading-normal">Max Images Uploaded</span>
                            <span className="text-base text-accent1 px-1"><FaCheck /></span>
                        </>
                    )
                }
            </label>
        </div>
    );
}

export default ImageUpload;
