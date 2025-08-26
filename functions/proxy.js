const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    // 브라우저에서 보낸 요청 정보 확인
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { railway_url, options } = JSON.parse(event.body);

    try {
        const response = await fetch(railway_url, options);
        const data = await response.json();

        // Railway API의 응답을 브라우저에 그대로 전달 (CORS 헤더 포함)
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // 모든 곳에서 오는 요청을 허용
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: error.message }),
        };
    }
};
