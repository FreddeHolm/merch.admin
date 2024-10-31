import { studentlivetclient } from '../../lib/studentlivetclient';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    // Fetch the entry from Sanity using the provided ID
    const entry = await studentlivetclient.fetch(`*[_type == "slforening" && id == $id][0]`, { id });

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    // Extract the description field from the fetched entry
    const description = entry.description || '';

    res.status(200).json({ description });
  } catch (error) {
    console.error('Error fetching entry description:', error.message);
    res.status(500).json({ error: 'Failed to fetch entry description' });
  }
}