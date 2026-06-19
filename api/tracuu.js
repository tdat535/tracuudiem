export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';
    const endpoint = req.query._endpoint || (req.body && req.body._endpoint);

    try {
        if (endpoint === 'captcha') {
            const response = await fetch('https://diemthi.hcm.edu.vn/api/captcha', {
                headers: {
                    'Referer': 'https://diemthi.hcm.edu.vn/',
                    'User-Agent': UA
                }
            });
            const data = await response.json();
            return res.status(200).json(data);
        }

        if (endpoint === 'hcm') {
            const { captchaAnswer, captchaToken, soBaoDanh } = req.body;
            const response = await fetch('https://diemthi.hcm.edu.vn/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'https://diemthi.hcm.edu.vn/',
                    'User-Agent': UA
                },
                body: JSON.stringify({ captchaAnswer, captchaToken, soBaoDanh })
            });
            const data = await response.json();
            return res.status(200).json(data);
        }

        // Legacy: THPT via thanhnien
        const params = new URLSearchParams(req.query);
        params.delete('_endpoint');
        const response = await fetch(`https://thanhnien.vn/api/get-data-tuyen-sinh.htm?${params}`, {
            headers: {
                'Referer': 'https://thanhnien.vn/',
                'User-Agent': UA
            }
        });
        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ success: false, error: 'proxy_error' });
    }
}
