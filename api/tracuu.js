export default async function handler(req, res) {
    const params = new URLSearchParams(req.query);
    const isThpt = params.get('_endpoint') === 'thpt';
    params.delete('_endpoint');

    const endpoint = isThpt
        ? 'https://thanhnien.vn/api/get-data-tuyen-sinh.htm'
        : 'https://thanhnien.vn/api/diem-thi-lop-10.htm';

    try {
        const response = await fetch(`${endpoint}?${params}`, {
            headers: {
                'Referer': 'https://thanhnien.vn/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
            }
        });
        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ success: false, error: 'proxy_error' });
    }
}
