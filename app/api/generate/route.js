import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("bitLinks")
    const collection = db.collection("url")
    const usage = db.collection("urlUsage")

    // Checking if the shorturl already exists
    const doc = await collection.findOne({
      shorturl: body.shorturl
    })

    if (doc) {
      return Response.json({
        success: false,
        error: true,
        message: 'URL already exists!'
      }, { status: 400 })
    }

    // Inserting the new URL with visits initialized to 0
    await collection.insertOne({
      url: body.url,
      shorturl: body.shorturl,
      visits: 0,
      urlUsage: body.urlUsage
    })

    // Fetching the updated list so the frontend table can refresh
    const links = await collection.find({}).sort({ visits: -1 }).toArray();

    return Response.json({
      success: true,
      error: false,
      message: 'ShortUrl generated',
      links
    })

  } catch (error) {
    console.error("API Error:", error)
    return Response.json({
      success: false,
      message: 'Server Error'
    }, { status: 500 })
  }
}