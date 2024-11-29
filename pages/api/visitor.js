// pages/api/visitor.js
let visitorCount = 0; // Temporary storage (replace with a database in production)

export default function handler(req, res) {
  if (req.method === 'GET') {
    visitorCount += 1;  // Increment the count on each request
    res.status(200).json({ count: visitorCount });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
