export const sendToAirtable = async (tableName: string, fields: any) => {
    // 1. Clean and validate credentials
    const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY?.trim().replace(/['"]/g, '');
    const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID?.trim().replace(/['"]/g, '');

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.error('Airtable credentials missing or invalid in .env');
        return { success: false, error: 'Airtable Configuration Missing. Please check your .env file.' };
    }

    try {
        const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`;

        console.log(`[Airtable Debug] Calling URL: ${url}`);
        console.log(`[Airtable Debug] Token length: ${AIRTABLE_API_KEY.length}, starts with: ${AIRTABLE_API_KEY.substring(0, 4)}`);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                records: [{ fields }],
                typecast: true
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('[Airtable Debug] Full Error Response:', data);

            // Re-throw or format based on status
            if (response.status === 401) return { success: false, error: "Invalid API Token. Regenerate the token in Airtable Developer Hub." };
            if (response.status === 403) return { success: false, error: "Token lacks 'data.records:write' scope or doesn't have access to this Base." };
            if (response.status === 404) return { success: false, error: `Table "${tableName}" or Base "${AIRTABLE_BASE_ID}" not found. Check spelling and case sensitivity.` };

            return {
                success: false,
                error: data.error?.message || `Airtable Error: ${response.statusText}`
            };
        }

        console.log(`[Airtable Debug] Success:`, data);
        return { success: true, data };
    } catch (error: any) {
        console.error('[Airtable Debug] Fetch Exception:', error);
        return { success: false, error: "Connection Failed. Check your internet or browser console." };
    }
};
