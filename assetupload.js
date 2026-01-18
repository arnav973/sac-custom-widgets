(function() {
  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: "72", Arial, sans-serif;
        padding: 20px;
      }
      .container {
        display: flex;
        gap: 20px;
        height: 100%;
      }
      .section {
        flex: 1;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        overflow: hidden;
      }
      .section-header {
        background-color: #354a5f;
        color: white;
        padding: 12px 16px;
        font-weight: bold;
        font-size: 14px;
      }
      .section-content {
        padding: 20px;
        background-color: white;
      }
      .guidelines {
        margin: 0;
        padding-left: 20px;
      }
      .guidelines li {
        margin-bottom: 12px;
        line-height: 1.6;
      }
      .format-table {
        width: 100%;
        margin: 15px 0;
        border-collapse: collapse;
        font-size: 11px;
      }
      .format-table th,
      .format-table td {
        border: 1px solid #ddd;
        padding: 4px 8px;
        text-align: left;
      }
      .format-table th {
        background-color: #f5f5f5;
        font-weight: bold;
      }
      .upload-section {
        margin-bottom: 20px;
      }
      .upload-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #32363a;
      }
      .upload-controls {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .browse-btn {
        background-color: #0854a0;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }
      .browse-btn:hover {
        background-color: #0a6ed1;
      }
      .upload-btn {
        background-color: #fff;
        color: #0854a0;
        border: 1px solid #0854a0;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }
      .upload-btn:hover {
        background-color: #f5f5f5;
      }
      .file-input {
        display: none;
      }
      .file-name {
        color: #32363a;
        font-size: 13px;
      }
      .instructions {
        margin-top: 30px;
        padding: 15px;
        background-color: #f5f5f5;
        border-radius: 4px;
      }
      .run-btn {
        background-color: #0854a0;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 15px;
      }
      .run-btn:hover {
        background-color: #0a6ed1;
      }
      .run-icon {
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 10px solid white;
      }
      .status-message {
        margin-top: 15px;
        padding: 10px;
        border-radius: 4px;
        display: none;
      }
      .status-message.success {
        background-color: #e5f5e5;
        color: #2b7c2b;
        border: 1px solid #2b7c2b;
      }
      .status-message.error {
        background-color: #fef0f0;
        color: #c00;
        border: 1px solid #c00;
      }
      .status-message.show {
        display: block;
      }
    </style>
    
    <div class="container">
      <div class="section">
        <div class="section-header">Flat File - Preparation</div>
        <div class="section-content">
          <div>Guidelines for Flat File Preparation:</div>
          <ol class="guidelines">
            <li>Download the Flat File by clicking below Format
              <table class="format-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DESCRIPTION</th>
                    <th>ASSET_TYPE</th>
                    <th>COMPANY_CODE</th>
                    <th>SUB_CLASS</th>
                    <th>COST_CENTER</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>2025_BUD_0001</td><td>Budget Asset 1</td><td>NEW_ASSETS</td><td>1000</td><td>2000001</td><td>1301900590</td></tr>
                  <tr><td>2025_BUD_0002</td><td>Budget Asset 2</td><td>NEW_ASSETS</td><td>1000</td><td>2000001</td><td>1301900590</td></tr>
                  <tr><td>2025_BUD_0003</td><td>Budget Asset 3</td><td>NEW_ASSETS</td><td>1000</td><td>2000001</td><td>1301900590</td></tr>
                </tbody>
              </table>
            </li>
            <li>The Excel File should be saved in "Microsoft Excel Macro-Enabled Worksheet (.xlsm)".</li>
          </ol>
          
          <div style="margin-top: 20px;">
            <strong>Steps to upload flat file:</strong>
            <ol class="guidelines">
              <li>Prepare the Flat File in Excel in Sequence as per the Format</li>
              <li>Click on Browse -> select the Excel File -> click on Upload.</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-header">Flat File - Upload</div>
        <div class="section-content">
          <div class="upload-section">
            <label class="upload-label">Upload:</label>
            <div class="upload-controls">
              <button class="browse-btn" id="browseBtn">Browse...</button>
              <span class="file-name" id="fileName">No file selected</span>
              <input type="file" class="file-input" id="fileInput" accept=".xlsx,.xlsm,.xls">
            </div>
            <button class="upload-btn" id="uploadBtn" style="margin-top: 10px;">Upload</button>
          </div>
          
          <div class="instructions">
            <div>Select the New Assets created under "<span id="hierarchyDisplay">NEW_ASSETS</span>" Hierarchy</div>
            <div style="margin-top: 10px;">Click on below "Run Valid Combinations"</div>
            <button class="run-btn" id="runBtn">
              <span class="run-icon"></span>
              Run Valid Combinations
            </button>
          </div>
          
          <div class="status-message" id="statusMessage"></div>
        </div>
      </div>
    </div>
  `;

  class AssetUploadWidget extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
      
      this._props = {
        title: "Asset Upload Manager",
        hierarchyName: "NEW_ASSETS"
      };
      
      this._uploadedData = null;
      this._selectedFile = null;
    }

    connectedCallback() {
      this._shadowRoot.getElementById('browseBtn').addEventListener('click', () => {
        this._shadowRoot.getElementById('fileInput').click();
      });

      this._shadowRoot.getElementById('fileInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          this._selectedFile = file;
          this._shadowRoot.getElementById('fileName').textContent = file.name;
        }
      });

      this._shadowRoot.getElementById('uploadBtn').addEventListener('click', () => {
        this._handleUpload();
      });

      this._shadowRoot.getElementById('runBtn').addEventListener('click', () => {
        this._handleValidation();
      });

      this._updateHierarchyDisplay();
    }

    _handleUpload() {
      if (!this._selectedFile) {
        this._showStatus('Please select a file first', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this._uploadedData = {
          fileName: this._selectedFile.name,
          data: e.target.result,
          uploadTime: new Date().toISOString()
        };
        this._showStatus('File uploaded successfully!', 'success');
        
        this.dispatchEvent(new CustomEvent('onUpload', {
          detail: this._uploadedData
        }));
      };
      reader.readAsArrayBuffer(this._selectedFile);
    }

    _handleValidation() {
      if (!this._uploadedData) {
        this._showStatus('Please upload a file first', 'error');
        return;
      }

      this._showStatus('Running validation...', 'success');
      
      this.dispatchEvent(new CustomEvent('onValidate', {
        detail: {
          hierarchy: this._props.hierarchyName,
          data: this._uploadedData
        }
      }));
    }

    _showStatus(message, type) {
      const statusEl = this._shadowRoot.getElementById('statusMessage');
      statusEl.textContent = message;
      statusEl.className = 'status-message show ' + type;
      
      setTimeout(() => {
        statusEl.classList.remove('show');
      }, 5000);
    }

    _updateHierarchyDisplay() {
      this._shadowRoot.getElementById('hierarchyDisplay').textContent = this._props.hierarchyName;
    }

    get title() {
      return this._props.title;
    }

    set title(value) {
      this._props.title = value;
    }

    get hierarchyName() {
      return this._props.hierarchyName;
    }

    set hierarchyName(value) {
      this._props.hierarchyName = value;
      this._updateHierarchyDisplay();
    }

    setData(data) {
      this._uploadedData = data;
    }

    getData() {
      return this._uploadedData;
    }
  }

  customElements.define('com-custom-assetupload', AssetUploadWidget);
})();