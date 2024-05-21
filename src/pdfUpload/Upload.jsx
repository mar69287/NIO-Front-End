import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = 'http://localhost:3000/api/upload';
const chunkSize = 10 * 1024; // Adjust chunk size as needed

const Upload = ({ setPdfFile, pdfFile, setUploaded, uploaded }) => {
    const [chunkIndex, setChunkIndex] = useState(null);
    const [baseName, setBaseName] = useState('');

    useEffect(() => {
        if (pdfFile !== null && chunkIndex === null && uploaded === false) {
            console.log("Uploading Document...");
            setBaseName(`tmp_${Date.now()}_${pdfFile.name}`);
            setChunkIndex(0);
        }

        if (chunkIndex !== null && uploaded === false) readAndUploadChunk();

        if (pdfFile === null) {
            setChunkIndex(null);
            setUploaded(null);
        }
    }, [pdfFile, chunkIndex, uploaded]);

    const handlePDF = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setPdfFile(file);
            setUploaded(false);
        }
    }

    const readAndUploadChunk = () => {
        if (pdfFile === null || uploaded !== false) return;

        const reader = new FileReader();
        const from = chunkIndex * chunkSize;
        const to = Math.min(from + chunkSize, pdfFile.size); // Ensure last chunk is correctly sliced
        const blob = pdfFile.slice(from, to);

        reader.onload = async (event) => {
            const totalChunks = Math.ceil(pdfFile.size / chunkSize);
            const base64Data = event.target.result.split(',')[1]; // Get base64 part of DataURL
            const payload = {
                ext: pdfFile.name.split('.').pop(),
                chunk: `data:application/pdf;base64,${base64Data}`,
                chunkIndex: chunkIndex,
                totalChunks: totalChunks,
                baseName: baseName
            };

            

            try {
                console.log(`Uploading chunk ${chunkIndex + 1} of ${totalChunks}`);
                const response = await axios.post(apiUrl, payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
                const chunkNum = chunkIndex + 1;
                const lastChunk = (chunkNum === totalChunks);
                console.log(response)
                if (lastChunk) {
                    console.log("Document Sent!");
                    setUploaded(true);
                    setChunkIndex(null);
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
            <label className="text-gray-700 text-md mb-2 font-medium" htmlFor="pdf">
                Contract document
            </label>
            <label className="w-full flex justify-center gap-1 items-center bg-white text-blue rounded shadow tracking-wide border border-blue cursor-pointer py-[7px]">
                <span className="text-base leading-normal">Add document</span>
                <span className="text-base leading-normal text-slate-500">(pdf)</span>
                <input type="file" id="pdf" accept=".pdf" name="pdf" className="hidden" onChange={handlePDF} />
            </label>
        </div>
    );
}

export default Upload;
