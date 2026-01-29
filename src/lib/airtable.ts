
import Airtable from 'airtable';

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'Traffic Analysis';

export const initAirtable = () => {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.warn('Airtable credentials missing. Please add VITE_AIRTABLE_API_KEY and VITE_AIRTABLE_BASE_ID to your .env file.');
        return null;
    }

    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
    return base(AIRTABLE_TABLE_NAME);
};
