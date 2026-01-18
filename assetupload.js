(function() {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: "72", "72full", Arial, sans-serif;
        width: 100%;
        height: 100%;
      }
      .widget-container {
        display: flex;
        gap: 16px;
        padding: 16px;
        height: 100%;
        box-sizing: border-box;
      }
      .panel {
        flex: 1;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        background: white;
        display: flex;
        flex-direction: column;
      }
      .panel-header {
        background: #354a5f;
        color: white;
        padding: 12px 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .panel-body {
        padding: 16px;
        flex: 1;
        overflow: auto;
      }
      .info-text {
        margin-bottom: 12px;
        font-size: 13px;
        color: #32363a;
      }
      .sample-table {
        width: 100%;
        border-collapse: collapse;
        margin: 12px 0;
        font-size: 11px;
      }
      .sample-table th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 6px 8px;
        text-align: left;
        font-weight: 600;
      }
      .sample-table td {
        border: 1px solid #ddd;
        padding: 4px 8px;
      }
      .upload-area {
        margin: 20px 0;
      }
      .btn {
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        border: none;
        transition: all 0.2s;
      }
      .btn-primary {
        background: #0854a0;
        color: white;
      }
      .btn-primary:hover {
        background: #0a6ed1;
      }
      .btn-secondary {
        background: white;
        color: #0854a0;
        border: 1px solid #0854a0;
      }
      .btn-secondary:hover {
        background: #f5f5f5;
      }
      .file-input {
        display: none;
      }
      .file-name {
        display: inline-block;
        margin: 0 12px;
        color: #32363a;
      }
      .instructions {
        background: #f5f5f5;
        padding: 16px;
        border-radius: 4px;
        margin-top: 20px;
      }
      .run-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 12px;
      }
      .play-icon {
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 8px solid white;
      }
      .message {
        margin-top: 16px;
        padding: 12px;
        border-radius: 4px;
        display: none;
      }
      .message.show {
        display: block;
      }
      .message.success {
        background: #e5f5e5;
        color: #2b7c2b;
        border: 1px solid #2b7c2b;
      }
      .message.error {
        background: #fef0f0;
        color: #c00;
        border: 1px solid #c00;
      }
    </style>
    
    <div class="widget-container">
      <div class="panel">
        <div class="panel-header">Flat File - Preparation</div>
        <div class="panel-body">
          <div class="info-text"><strong>Guidelines for Flat File Preparation:</strong></div>
          <ol style="padding-left: 20px; margin: 0;">
            <li style="margin-bottom: 12px;">
              Download the Flat File by clicking below Format
              <table class="sample-table">
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
                  <tr>
                    <td>2025_BUD_0001</td>
                    <td>Budget Asset 1</td>
                    <td>NEW_ASSETS</td>
                    <td>1000</td>
                    <td>2000001</td>
                    <td>1301900590</td>
                  </tr>
                  <tr>
                    <td>2025_BUD_0002</td>
                    <td>Budget Asset 2</td>
                    <td>NEW_ASSETS</td>
                    <td>1000</td>
                    <td>2000001</td>
                    <td>1301900590</td>
                  </tr>
                  <tr>
                    <td>2025_BUD_0003</td>
                    <td>Budget Asset 3</td>
                    <td>NEW_ASSETS</td>
                    <td>1000</td>
                    <td>2000001</td>
                    <td>1301900590</td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li style="margin-bottom: 12px;">
              The Excel File should be saved in "Microsoft Excel Macro-Enabled Worksheet (.xlsm)".
            </li>
          </ol>
          
          <div style="margin-top: 20px;">
            <strong>Steps to upload flat file:</strong>
            <ol style="padding-left: 20px; margin: 8px 0 0 0;">
              <li style="margin-bottom: 8px;">Prepare the Flat File in Excel in Sequence as per the Format</li>
              <li>Click on Browse → select the Excel File → click on Upload.</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div class="panel">
        <div class="panel-header">Flat File - Upload</div>
        <div class="panel-body">
          <div class="upload-area">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Upload:</label>
            <div>
              <button class="btn btn-primary" id="browseBtn">Browse...</button>
              <span class="file-name" id="fileName">No file selected</span>
              <input type="file" class="file-input" id="fileInput" accept=".xlsx,.xlsm,.xls">
            </div>
            <button class="btn btn-secondary" id="uploadBtn" style="margin-top: 12px;">Upload</button>
          </div>
          
          <div class="instructions">
            <div>Select the New Assets created under "<strong id="hierarchyName">NEW_ASSETS</strong>" Hierarchy</div>
            <div style="margin-top: 8px;">Click on below "Run Valid Combinations"</div>
            <button class="btn btn-primary run-button" id="validateBtn">
              <span class="play-icon"></span>
              Run Valid Combinations
            </button>
          </div>
          
          <div class="message" id="message"></div>
        </div>
      </div>
    </div>
  `;

  class AssetUploadWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      
      this._selectedFile = null;
      this._uploadedData = null;
      this._hierarchyName = 'NEW_ASSETS';
    }

    connectedCallback() {
      this.shadowRoot.getElementById('browseBtn').onclick = () => {
        this.shadowRoot.getElementById('fileInput').click();
      };

      this.shadowRoot.getElementById('fileInput').onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          this._selectedFile = file;
          this.shadowRoot.getElementById('fileName').textContent = file.name;
        }
      };

      this.shadowRoot.getElementById('uploadBtn').onclick = () => {
        this.handleUpload();
      };

      this.shadowRoot.getElementById('validateBtn').onclick = () => {
        this.handleValidate();
      };
    }

    handleUpload() {
      if (!this._selectedFile) {
        this.showMessage('Please select a file first', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this._uploadedData = {
          fileName: this._selectedFile.name,
          fileSize: this._selectedFile.size,
          fileType: this._selectedFile.type,
          uploadTime: new Date().toISOString(),
          data: e.target.result
        };
        
        this.showMessage('File uploaded successfully: ' + this._selectedFile.name, 'success');
        
        this.dispatchEvent(new CustomEvent('onUpload', {
          detail: {
            fileName: this._selectedFile.name,
            fileSize: this._selectedFile.size
          }
        }));
      };
      
      reader.onerror = () => {
        this.showMessage('Error reading file', 'error');
      };
      
      reader.readAsArrayBuffer(this._selectedFile);
    }

    handleValidate() {
      if (!this._uploadedData) {
        this.showMessage('Please upload a file first', 'error');
        return;
      }

      this.showMessage('Running validation for ' + this._hierarchyName + ' hierarchy...', 'success');
      
      this.dispatchEvent(new CustomEvent('onValidate', {
        detail: {
          hierarchy: this._hierarchyName,
          fileName: this._uploadedData.fileName,
          timestamp: new Date().toISOString()
        }
      }));
    }

    showMessage(text, type) {
      const msg = this.shadowRoot.getElementById('message');
      msg.textContent = text;
      msg.className = 'message show ' + type;
      
      setTimeout(() => {
        msg.classList.remove('show');
      }, 5000);
    }

    get hierarchyName() {
      return this._hierarchyName;
    }

    set hierarchyName(value) {
      this._hierarchyName = value;
      const elem = this.shadowRoot.getElementById('hierarchyName');
      if (elem) {
        elem.textContent = value;
      }
    }

    getUploadedData() {
      return this._uploadedData;
    }

    clearData() {
      this._uploadedData = null;
      this._selectedFile = null;
      this.shadowRoot.getElementById('fileName').textContent = 'No file selected';
      this.shadowRoot.getElementById('fileInput').value = '';
    }
  }

  customElements.define('com-custom-assetupload', AssetUploadWidget);
})();