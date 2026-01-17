import clientPromise from "@/lib/mongodb"

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("bitLinks");
        const collection = db.collection("url");

        // This fetches the data when the page first loads
        const links = await collection.find({}).sort({ visits: -1 }).toArray();

        return Response.json({ success: true, links });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}