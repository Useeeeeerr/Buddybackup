exports.handler = async function (event) {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
        };
    }
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const fetch = (await import('node-fetch')).default;

    try {
        const { railway_url, options } = JSON.parse(event.body);
        const response = await fetch(railway_url, options);
        const data = await response.json();

        return {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: error.message }),
        };
    }
};
