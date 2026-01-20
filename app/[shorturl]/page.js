import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"

export default async function Page({ params }) {
	
    const resolvedParams = await params;
    const { shorturl } = resolvedParams;
    const client = await clientPromise;
    const db = client.db("bitLinks");
    const collection = db.collection("url");
    const result = await collection.findOneAndUpdate(
        { shorturl: shorturl },
        { $inc: { visits: 1 } },
        { returnDocument: 'after' }
    );

    const doc = result?.value || result;

    if (doc && doc.url) {
        const destination = doc.url.startsWith("http") 
            ? doc.url 
            : `https://${doc.url}`;
        
        return redirect(destination);
    } else {
        return redirect(process.env.NEXT_PUBLIC_HOST || "/");
    }
}
