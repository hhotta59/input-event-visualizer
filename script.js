class InputEventVisualizer {
    constructor() {
        this.testInput = document.getElementById('test-input');
        this.eventsContainer = document.getElementById('events-container');
        this.inputTypeSelect = document.getElementById('input-type');
        this.inputModeSelect = document.getElementById('input-mode');
        this.clearButton = document.getElementById('clear-events');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupControls();
    }
    
    bindEvents() {
        const events = [
            'input', 'change', 'keydown', 'keyup', 'keypress',
            'focus', 'blur', 'focusin', 'focusout',
            'compositionstart', 'compositionupdate', 'compositionend',
            'beforeinput', 'paste', 'copy', 'cut',
            'select', 'selectstart', 'selectionchange'
        ];
        
        events.forEach(eventType => {
            this.testInput.addEventListener(eventType, (e) => {
                this.logEvent(eventType, e);
            });
        });
    }
    
    setupControls() {
        this.inputTypeSelect.addEventListener('change', (e) => {
            this.testInput.type = e.target.value;
            this.logEvent('type-changed', { newType: e.target.value });
        });
        
        this.inputModeSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                this.testInput.inputMode = e.target.value;
            } else {
                this.testInput.removeAttribute('inputmode');
            }
            this.logEvent('inputmode-changed', { newInputMode: e.target.value });
        });
        
        this.clearButton.addEventListener('click', () => {
            this.eventsContainer.innerHTML = '';
        });
    }
    
    logEvent(eventType, event) {
        const eventData = this.extractEventData(event);
        const eventElement = this.createEventElement(eventType, eventData);
        
        this.eventsContainer.appendChild(eventElement);
        this.eventsContainer.scrollTop = this.eventsContainer.scrollHeight;
    }
    
    extractEventData(event) {
        if (!event) return {};
        
        const data = {
            timestamp: new Date().toISOString(),
            value: this.testInput.value,
            selectionStart: this.testInput.selectionStart,
            selectionEnd: this.testInput.selectionEnd
        };
        
        if (event.key !== undefined) data.key = event.key;
        if (event.code !== undefined) data.code = event.code;
        if (event.keyCode !== undefined) data.keyCode = event.keyCode;
        if (event.which !== undefined) data.which = event.which;
        if (event.charCode !== undefined) data.charCode = event.charCode;
        if (event.inputType !== undefined) data.inputType = event.inputType;
        if (event.data !== undefined) data.data = event.data;
        if (event.isComposing !== undefined) data.isComposing = event.isComposing;
        if (event.ctrlKey !== undefined) data.ctrlKey = event.ctrlKey;
        if (event.shiftKey !== undefined) data.shiftKey = event.shiftKey;
        if (event.altKey !== undefined) data.altKey = event.altKey;
        if (event.metaKey !== undefined) data.metaKey = event.metaKey;
        if (event.repeat !== undefined) data.repeat = event.repeat;
        if (event.location !== undefined) data.location = event.location;
        if (event.clipboardData && event.clipboardData.getData) {
            data.clipboardData = event.clipboardData.getData('text');
        }
        
        return data;
    }
    
    createEventElement(eventType, eventData) {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-item';
        
        const time = new Date(eventData.timestamp).toLocaleTimeString();
        
        eventElement.innerHTML = `
            <div class="event-time">${time}</div>
            <div class="event-type">${eventType}</div>
            <div class="event-data">${this.formatEventData(eventData)}</div>
        `;
        
        return eventElement;
    }
    
    formatEventData(data) {
        const relevantData = { ...data };
        delete relevantData.timestamp;
        
        return Object.entries(relevantData)
            .filter(([key, value]) => value !== undefined && value !== null && value !== '')
            .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
            .join(', ');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InputEventVisualizer();
});