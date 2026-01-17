import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"

export default async function Page({ params }) {

	const { shorturl } = await params
	const client = await clientPromise;
	const db = client.db("bitLinks")
	const collection = db.collection("url")
	const doc = await collection.findOneAndUpdate(
		{ shorturl: shorturl },
		{ $inc: { visits: 1 } },
		{ returnDocument: 'after' }
	);
	console.log(doc);

	// if document exists redirect to page
	if (doc) {
		const destination = doc.url.startsWith("http") ? doc.url : `https://${doc.url}`;
		redirect(destination);
	} else {
		redirect(process.env.NEXT_PUBLIC_HOST)
	}


	// return <div>My Post: {url}</div>
}