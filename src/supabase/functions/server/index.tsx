import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-c3210e8f/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all equipment
app.get("/make-server-c3210e8f/equipment", async (c) => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Error fetching equipment:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ equipment: data });
  } catch (err) {
    console.log('Error in /equipment endpoint:', err);
    return c.json({ error: String(err) }, 500);
  }
});

// Search equipment by serial number
app.get("/make-server-c3210e8f/equipment/search", async (c) => {
  try {
    const serialNumber = c.req.query('serial_number');
    
    if (!serialNumber) {
      return c.json({ error: 'Serial number is required' }, 400);
    }

    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .ilike('serial_number', `%${serialNumber}%`);

    if (error) {
      console.log('Error searching equipment:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ equipment: data });
  } catch (err) {
    console.log('Error in /equipment/search endpoint:', err);
    return c.json({ error: String(err) }, 500);
  }
});

// Add equipment (admin only)
app.post("/make-server-c3210e8f/equipment", async (c) => {
  try {
    const body = await c.req.json();
    const { serial_number, name, image_url, status } = body;

    if (!serial_number) {
      return c.json({ error: 'Serial number is required' }, 400);
    }

    const { data, error } = await supabase
      .from('equipment')
      .insert([
        {
          serial_number,
          name: name || '',
          image_url: image_url || '',
          status: status || '',
        }
      ])
      .select();

    if (error) {
      console.log('Error adding equipment:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ equipment: data[0] });
  } catch (err) {
    console.log('Error in POST /equipment endpoint:', err);
    return c.json({ error: String(err) }, 500);
  }
});

// Import equipment from Excel (bulk insert)
app.post("/make-server-c3210e8f/equipment/bulk", async (c) => {
  try {
    const body = await c.req.json();
    const { equipment } = body;

    if (!Array.isArray(equipment) || equipment.length === 0) {
      return c.json({ error: 'Equipment array is required' }, 400);
    }

    // Validate that all items have serial_number
    const invalidItems = equipment.filter(item => !item.serial_number);
    if (invalidItems.length > 0) {
      return c.json({ error: 'All equipment items must have a serial_number' }, 400);
    }

    const { data, error } = await supabase
      .from('equipment')
      .insert(equipment.map(item => ({
        serial_number: item.serial_number,
        name: item.name || '',
        image_url: item.image_url || '',
        status: item.status || '',
      })))
      .select();

    if (error) {
      console.log('Error bulk inserting equipment:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ equipment: data, count: data.length });
  } catch (err) {
    console.log('Error in POST /equipment/bulk endpoint:', err);
    return c.json({ error: String(err) }, 500);
  }
});

Deno.serve(app.fetch);