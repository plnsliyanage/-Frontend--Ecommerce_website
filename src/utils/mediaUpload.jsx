import { createClient } from "@supabase/supabase-js";

// Supabase credentials
const supabaseUrl = "https://kgihrnxqtjalmbfzrffn.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnaWhybnhxdGphbG1iZnpyZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMDI1MTMsImV4cCI6MjA3ODU3ODUxM30.WVSUpOJZBnU1d-YK2UJe_5cen1w96qI045vsuXUwer4";

const supabase = createClient(supabaseUrl, anonKey);
/*
//upload immage to supabase bucket called images named as file.name
        supabase.storage.from("images").upload(file.name, file, {
            upsert: false,
            cacheControl: '3600',
        }).then(
            //get url from uploaded image
            () => {
                const publicUrl = supabase.storage.from("images").getpublicUrl(file.name)
                console.log(publicUrl);
            }
        )

*/

export default function mediaUpload(file) {
    return new Promise((resolve, reject) => {
        if (file == null) {
            reject("No file selected");
        } else {
            const timestamp = new Date().getTime();
            const fileName = timestamp + file.name
            supabase.storage
                .from("images")
                .upload(fileName, file, {
                    upsert: false,
                    cacheControl: '3600',
                })
                .then(
                    //get url from uploaded image
                    () => {
                        const publicUrl = supabase.storage
                            .from("images")
                            .getPublicUrl(fileName).data.publicUrl;

                        resolve(publicUrl);

                    }).catch(
                        () => {
                            reject("An error occured")
                        }
                    )
        }
    })
}
