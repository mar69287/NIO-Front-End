const BASE_URL = 'http://localhost:3000/api';

export async function createABT(data) {
  try {
    const response = await fetch(`${BASE_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error minting ABT:', error);
    throw error;
  }
}

export async function fetchABT(id) {
  try {
    const response = await fetch(`${BASE_URL}/token/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error getting ABT info:', error);
    throw error;
  }
}

