// Client-side API wrapper for Vercel backend
// Handle all API calls to your Vercel deployment

class InventoryAPI {
  constructor(baseURL = '') {
    this.baseURL = baseURL || window.location.origin;
    this.token = localStorage.getItem('auth_token');
  }

  // Set auth token after login
  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Get authorization headers
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  }

  // ═══ AUTHENTICATION ═══

  async signup(email, password, role = 'staff') {
    try {
      const response = await fetch(`${this.baseURL}/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'signup', email, password, role })
      });
      const data = await response.json();
      if (data.token) this.setToken(data.token);
      return data;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${this.baseURL}/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password })
      });
      const data = await response.json();
      if (data.token) this.setToken(data.token);
      return data;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async verifyToken() {
    try {
      const response = await fetch(`${this.baseURL}/api/auth`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ action: 'verify' })
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ═══ INVENTORY ═══

  async getInventory() {
    try {
      const response = await fetch(`${this.baseURL}/api/inventory`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async addItem(item) {
    try {
      const response = await fetch(`${this.baseURL}/api/inventory`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(item)
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateItem(item) {
    try {
      const response = await fetch(`${this.baseURL}/api/inventory`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(item)
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteItem(id) {
    try {
      const response = await fetch(`${this.baseURL}/api/inventory?id=${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ═══ TASKS ═══

  async getTasks() {
    try {
      const response = await fetch(`${this.baseURL}/api/tasks`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async addTask(task) {
    try {
      const response = await fetch(`${this.baseURL}/api/tasks`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(task)
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateTask(task) {
    try {
      const response = await fetch(`${this.baseURL}/api/tasks`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(task)
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteTask(id) {
    try {
      const response = await fetch(`${this.baseURL}/api/tasks?id=${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ═══ AUDIT LOGS ═══

  async getAuditLogs(limit = 100) {
    try {
      const response = await fetch(`${this.baseURL}/api/audit-logs?limit=${limit}`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Export for use in browser
window.InventoryAPI = InventoryAPI;
