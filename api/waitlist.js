export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email requis' });

    const response = await fetch(
        `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fields: { Email: email } })
        }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
}
