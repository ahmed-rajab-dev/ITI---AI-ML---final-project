import React, { useState } from 'react';

interface FormData {
  location_grouped: string;
  carpet_area_sqft: number;
  floor_num: number;
  Bathroom: number;
  Balcony: number;
  Furnishing: string;
  Transaction: string;
  Ownership: string;
  facing: string;
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    location_grouped: 'Thane West',
    carpet_area_sqft: 850,
    floor_num: 3,
    Bathroom: 2,
    Balcony: 1,
    Furnishing: 'Unfurnished',
    Transaction: 'Resale',
    Ownership: 'Freehold',
    facing: 'East',
  });

  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPredictedPrice(null);

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

    try {
      const response = await fetch(`${baseUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to backend server.');
      }

      const data = await response.json();
      setPredictedPrice(data.predicted_price);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#242424', color: 'rgba(255, 255, 255, 0.87)', padding: '2rem', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
        <h1 style={{ fontSize: '2em', textAlign: 'center', marginBottom: '1.5rem' }}>House Price Predictor</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '0.3rem' }}>Location</label>
            <input type="text" name="location_grouped" value={formData.location_grouped} onChange={handleChange} required style={{ width: '100%', padding: '0.6em', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '0.3rem' }}>Carpet Area (sqft)</label>
            <input type="number" name="carpet_area_sqft" value={formData.carpet_area_sqft} onChange={handleChange} required style={{ width: '100%', padding: '0.6em', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8em', marginBottom: '0.3rem' }}>Floor</label>
              <input type="number" name="floor_num" value={formData.floor_num} onChange={handleChange} required style={{ width: '100%', padding: '0.5em', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8em', marginBottom: '0.3rem' }}>Baths</label>
              <input type="number" name="Bathroom" value={formData.Bathroom} onChange={handleChange} required style={{ width: '100%', padding: '0.5em', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8em', marginBottom: '0.3rem' }}>Balcony</label>
              <input type="number" name="Balcony" value={formData.Balcony} onChange={handleChange} required style={{ width: '100%', padding: '0.5em', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '0.3rem' }}>Furnishing</label>
            <select name="Furnishing" value={formData.Furnishing} onChange={handleChange} style={{ width: '100%', padding: '0.6em', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', boxSizing: 'border-box' }}>
              <option value="Unfurnished">Unfurnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Furnished">Furnished</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '0.3rem' }}>Transaction</label>
            <select name="Transaction" value={formData.Transaction} onChange={handleChange} style={{ width: '100%', padding: '0.6em', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', boxSizing: 'border-box' }}>
              <option value="Resale">Resale</option>
              <option value="New Property">New Property</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '0.3rem' }}>Ownership</label>
            <select name="Ownership" value={formData.Ownership} onChange={handleChange} style={{ width: '100%', padding: '0.6em', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', boxSizing: 'border-box' }}>
              <option value="Freehold">Freehold</option>
              <option value="Leasehold">Leasehold</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '0.3rem' }}>Facing</label>
            <select name="facing" value={formData.facing} onChange={handleChange} style={{ width: '100%', padding: '0.6em', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#fff', boxSizing: 'border-box' }}>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </select>
          </div>

          <button type="submit" disabled={loading} style={{ borderRadius: '8px', border: '1px solid transparent', padding: '0.6em 1.2em', fontSize: '1em', fontWeight: '500', fontFamily: 'inherit', backgroundColor: '#1a1a1a', color: '#fff', cursor: 'pointer', marginTop: '0.5rem' }}>
            {loading ? 'Calculating...' : 'Predict Price'}
          </button>
        </form>

        {predictedPrice !== null && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #646cff', borderRadius: '8px', textAlign: 'center', backgroundColor: '#1a1a1a' }}>
            <div style={{ fontSize: '0.9em', color: '#888' }}>Predicted Price</div>
            <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#646cff', marginTop: '0.2rem' }}>
              ₹{predictedPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        )}

        {error && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #ff4646', borderRadius: '8px', color: '#ff4646', textAlign: 'center' }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}