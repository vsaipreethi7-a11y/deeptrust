export const sendToAirtable = async (tableName: string, fields: any) => {
    const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.error('Airtable credentials missing in .env');
        return { success: false, error: 'Configuration missing' };
    }

    try {
        console.log(`Sending to Airtable [${tableName}]:`, fields);

        const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`, {
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
            console.error('Airtable API Error:', data);
            return {
                success: false,
                error: data.error?.message || response.statusText
            };
        }

        console.log(`Airtable Success [${tableName}]:`, data);
        return { success: true, data };
    } catch (error: any) {
        console.error('Airtable Network Error:', error);
        return { success: false, error: error.message };
    }
};
