const ENDPOINTS = {
  '/api/weather': 'https://api.openweathermap.org/data/2.5/weather',
  '/api/forecast': 'https://api.openweathermap.org/data/2.5/forecast',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const upstream = ENDPOINTS[url.pathname];

    if (!upstream) return new Response('Not found', { status: 404 });
    if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 });

    const q = (url.searchParams.get('q') || '').trim();
    if (!q || q.length > 100) {
      return Response.json({ cod: '400', message: 'city is required' }, { status: 400 });
    }

    const target = new URL(upstream);
    target.searchParams.set('q', q);
    target.searchParams.set('units', 'metric');
    target.searchParams.set('appid', env.OPENWEATHER_KEY);

    const res = await fetch(target);
    return new Response(res.body, {
      status: res.status,
      headers: { 'content-type': 'application/json' },
    });
  },
};