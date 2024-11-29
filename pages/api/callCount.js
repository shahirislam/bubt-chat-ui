let callCount = 0; // In-memory storage (reset on server restart)

export default function handler(req, res) {
  if (req.method === 'POST') {
    callCount += 1; // Increment call count
    return res.status(200).json({ callCount });
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}
