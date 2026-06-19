import https from 'https';

function httpsRequest(urlStr, options = {}) {
    const url = new URL(urlStr);
    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: url.hostname,
            port: url.port || 443,
            path: url.pathname + url.search,
            method: options.method || 'GET',
            headers: options.headers || {},
        }, (resp) => {
            const cookies = resp.headers['set-cookie'] || [];
            let data = '';
            resp.on('data', chunk => data += chunk);
            resp.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ json, cookies });
                } catch {
                    resolve({ json: { _raw: data.substring(0, 500), _status: resp.statusCode }, cookies });
                }
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
            const { json, cookies } = await httpsRequest('https://diemthi.hcm.edu.vn/api/captcha', {
                headers: {
                    'Referer': 'https://diemthi.hcm.edu.vn/',
                    'User-Agent': UA
                }
            });
            json._cookies = cookies.map(c => c.split(';')[0]).join('; ');
            return res.status(200).json(json);
        }

        if (endpoint === 'hcm') {
            const { captchaAnswer, captchaToken, soBaoDanh, _cookies } = req.body;
            const { json } = await httpsRequest('https://diemthi.hcm.edu.vn/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'https://diemthi.hcm.edu.vn/',
                    'User-Agent': UA,
                    'Cookie': _cookies || ''
                },
                body: JSON.stringify({ captchaAnswer, captchaToken, soBaoDanh })
            });
            return res.status(200).json(json);
        }

        const params = new URLSearchParams(req.query);
        params.delete('_endpoint');
        const { json } = await httpsRequest('https://thanhnien.vn/api/get-data-tuyen-sinh.htm?' + params.toString(), {
            headers: {
                'Referer': 'https://thanhnien.vn/',
                'User-Agent': UA
            }
        });
        return res.status(200).json(json);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message || 'proxy_error' });
    }
}
