"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const Shorten = () => {
  const [url, setUrl] = useState("")
  const [shorturl, setShorturl] = useState("")
  const [urlUsage, setUrlUsage] = useState("")
  const [generated, setGenerated] = useState(false)
  const [allLinks, setAllLinks] = useState([]);

  const generate = () => {
    if (url.length === 0 || shorturl.length === 0) {
      alert('URL and Short URL cannot be empty!')
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "url": url,
        "shorturl": shorturl,
        "urlUsage": urlUsage
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("/api/generate", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
          setUrl("")
          setShorturl("")
          setUrlUsage("")
          alert(result.message)
          fetchLinks();
        })
        .catch((error) => console.error(error));
    }
  }

  const fetchLinks = async () => {
    const res = await fetch("/api/links");
    const data = await res.json();
    setAllLinks(data.links || []);
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  const copyLink = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (

    <div className=''>

      <div className='mx-auto max-w-lg bg-[#fafafa] shadow-2xl shadow-purple-100/50 w-[90%] my-16 p-8 rounded-2xl flex flex-col gap-6 border border-purple-50'>

        {/* Gradient Heading */}
        <h1 className='font-extrabold text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500'>
          <span className='font-bold text-slate-900'> Link</span>
          <span className='font-bold text-pink-400'>ify </span> Generator
        </h1>

        <div className='flex flex-col gap-4'>
          <input type="text"
            value={url}
            className='border border-violet-100 bg-slate-50 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all'
            placeholder='Enter Long URL'
            onChange={(e) => { setUrl(e.target.value) }} />

          <input type="text"
            value={shorturl}
            className='border border-violet-100 bg-slate-50 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all'
            placeholder='Short name'
            onChange={(e) => { setShorturl(e.target.value) }} />

          <input type="text"
            value={urlUsage}
            className='border border-violet-100 bg-slate-50 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all'
            placeholder='Usage (e.g. Social Media)'
            onChange={(e) => { setUrlUsage(e.target.value) }} />

          {/* Vibrant Gradient Button */}
          <button
            onClick={generate}
            className='w-full bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 transition-all transform hover:scale-[1.01] active:scale-95 text-white rounded-xl p-4 font-bold shadow-lg shadow-pink-200'>
            Generate Short Link
          </button>
        </div>

        {generated && (
          <div className='p-4 bg-rose-50 rounded-xl border border-rose-100 animate-in fade-in zoom-in duration-300'>
            <span className='font-bold text-rose-700 text-sm'>Success! Link created:</span>
            <div className='mt-1 bg-white p-2 rounded border border-rose-100'>
              <Link target='_blank' className='text-pink-600 font-semibold break-all text-sm' href={generated}>
                {generated}
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 w-full">
          <h2 className="text-xl font-bold mb-4 text-violet-900 flex items-center gap-2">
            <span className="w-8 h-1 bg-pink-500 rounded-full"></span>
            Recent Links
          </h2>

          <div className="w-full overflow-x-auto rounded-xl border border-violet-50">
            <table className="w-full bg-white">
              <thead className="bg-violet-50 text-violet-700">
                <tr>
                  <th className="p-4 text-left text-xs uppercase font-bold tracking-wider border-b border-violet-100">Usage</th>
                  <th className="p-4 text-left text-xs uppercase font-bold tracking-wider border-b border-violet-100">Short URL</th>
                  <th className="p-4 text-center text-xs uppercase font-bold tracking-wider border-b border-violet-100">Visits</th>
                </tr>
              </thead>
              <tbody>
                {allLinks.map((link) => (
  <tr key={link._id} className="border-b border-violet-50 hover:bg-rose-50/30 transition-colors">
    <td className="p-4 text-sm md:max-w-50 max-w-30 max-h-20 overflow-y-auto rounded-xl border border-violet-50 custom-scrollbar text-slate-600">
      {link.urlUsage || "General"}
    </td>
    <td className="p-4 text-sm font-semibold text-violet-600">
      
      <Link href={`/${link.shorturl}`} target='_blank'>
        {link.shorturl}
      </Link>
      <div className='text-end'>
        <button 
          onClick={() => copyLink(`${process.env.NEXT_PUBLIC_HOST}/${link.shorturl}`)} 
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs"
        >
          Copy
        </button>
      </div>
    </td>
    <td className="p-4 text-center">
      <span className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-black">
        {link.visits || 0}
      </span>
    </td>
  </tr>
))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Shorten




