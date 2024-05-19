import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";

const apiUrl = 'http://localhost:3000/api/upload';
const chunkSize = 10 * 1024;

const Upload =({ setPdfFile, pdfFile, setUploaded, uploaded}) => {
    const [chunkIndex, setChunkIndex] = useState(null);

    useEffect(() => { 
        if(pdfFile !== null && chunkIndex === null && uploaded === false) { 
            console.log("Uploading Document...");
            setChunkIndex(0);
        } 

        if(chunkIndex !== null && uploaded === false) readAndUploadChunk();

        if(pdfFile === null) {
            setChunkIndex(null);
            setUploaded(null);
        }
        
    }, [pdfFile, chunkIndex, uploaded]);

    const handlePDF = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (chunkIndex === null) {
            setPdfFile(file);
            setUploaded(false);
        }
        // setPdfFile({ name: file.name, size: file.size, type: file.type });
        // console.log(`File Name: ${file.name}`);
        // console.log(`File Size: ${file.size} bytes`);
        // console.log(`File Type: ${file.type}`);
    }

    function readAndUploadChunk() {
        if (pdfFile === null || uploaded !== false) { return }
        const reader = new FileReader();
        const from = chunkIndex * chunkSize;
        const to = from + chunkSize;
        const blob = pdfFile.slice(from, to);
  
        function uploadChunk(event) {
            const totalChunks = Math.ceil(pdfFile.size / chunkSize);
            const dataString = JSON.stringify({
                chunk: event.target.result,
                ext: pdfFile.name.split('.').pop(), 
                chunkIndex: chunkIndex,
                totalChunks: totalChunks
            });

            const data = Buffer.from(dataString);
            const headers = {'Content-Type': 'application/octet-stream'};


            axios.post(apiUrl, data, {headers}).then(res => {
                const chunkNum = chunkIndex + 1;
                // console.log(`Posted!`);
                const lastChunk = (chunkNum === totalChunks);
                if (lastChunk) {
                    console.log("Document Sent!");
                    pdfFile.finalName = res.data.finalName;
                    setUploaded(true);
                    setChunkIndex(null);
                } else { 
                    if (pdfFile.tmpName !== null) { pdfFile.tmpName = res.data.tmpName }
                    setChunkIndex(chunkNum); 
                }
            });
        }
        reader.readAsDataURL(blob);
        reader.onload = (event) => uploadChunk(event);
    }

  return (
    <div className="mb-3 flex flex-col justify-start items-start ">
        <label className="text-gray-700 text-md mb-2 font-medium" htmlFor="pdf">
            Contract document
        </label>
        <label className="w-full flex justify-center gap-1 items-center bg-white text-blue rounded shadow tracking-wide border border-blue cursor-pointer py-[7px]">
            <span className="text-base leading-normal">Add document</span>
            <span className="text-base leading-normal text-slate-500">(pdf)</span>
            <input type='file' id="pdf" accept=".pdf" name="pdf" className="hidden" onChange={handlePDF}/>
        </label>
    </div>
  )
}

export default Upload