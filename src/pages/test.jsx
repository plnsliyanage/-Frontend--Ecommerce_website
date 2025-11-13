import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";
import { createClient } from "@supabase/supabase-js";

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnaWhybnhxdGphbG1iZnpyZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMDI1MTMsImV4cCI6MjA3ODU3ODUxM30.WVSUpOJZBnU1d-YK2UJe_5cen1w96qI045vsuXUwer4"
const supabaseUrl = "https://kgihrnxqtjalmbfzrffn.supabase.co"

const supabase = createClient(supabaseUrl, anonKey)

export default function TestPage() {
    const [file, setFile] = useState(null)

    async function uploadImage() {
        const link = await mediaUpload(file)
        console.log(link);
    }

    return (
        <div className="w-full h-full flex justify-center items-center">

            <input type="file" onChange={
                (e) => {
                    // when file change the change file will move to the file in usestate
                    setFile(e.target.files[0])
                }
            } />
            <button className="bg-blue-500 text-white p-2 rounded" onClick={uploadImage}>
                Upload
            </button>

        </div>
    )
}