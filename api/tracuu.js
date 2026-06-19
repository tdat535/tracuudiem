import https from 'https';

function httpsRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, {
            method: options.method || 'GET',
            headers: options.headers || {},
        }, (resp) => {
            let data = '';
            resp.on('data', chunk => data += chunk);
            resp.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch { resolve({ _raw: data }); }
            });
        });
        req.on('error', reject);
        if (options.body) req.write(options.body);
        req.end();
    });
}

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
            const data = await httpsRequest('https://diemthi.hcm.edu.vn/api/captcha', {
                headers: {
                    'Referer': 'https://diemthi.hcm.edu.vn/',
                    'User-Agent': UA
                }
            });
            return res.status(200).json(data);
        }

        if (endpoint === 'hcm') {
            const { captchaAnswer, captchaToken, soBaoDanh } = req.body;
            const data = await httpsRequest('https://diemthi.hcm.edu.vn/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'https://diemthi.hcm.edu.vn/',
                    'User-Agent': UA
                },
                body: JSON.stringify({ captchaAnswer, captchaToken, soBaoDanh })
            });
            return res.status(200).json(data);
        }

        // Legacy: THPT via thanhnien
        const params = new URLSearchParams(req.query);
        params.delete('_endpoint');
        const data = await httpsRequest(`https://thanhnien.vn/api/get-data-tuyen-sinh.htm?${params}`, {
            headers: {
                'Referer': 'https://thanhnien.vn/',
                'User-Agent': UA
            }
        });
        return res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message || 'proxy_error' });
    }
}
