interface Clicks {
    // Properties
    buttons: HTMLCollection,
    logClickClass: String,
    clickedButtons: Array<String>,
    resultsId: String,

    // Methods
    init: Function,
    setupBindings: Function,
    handleClick: Function,
    logInteraction: Function
}

const clickTracker = <Clicks>{
    buttons: document.getElementsByClassName('js-button'),
    logClickClass: 'js-button',
    resultsId: 'js-clicked-results',
    clickedButtons: [],

    /**
     * Initialise
     */
    init() {
        this.setupBindings();
    },

    /**
     * Setup any event bindings such as 'click' or 'scroll'
     */
    setupBindings() {
        document.addEventListener('click', () => this.handleClick(event));
    },

    /**
     * Handle click event
     * @param event {MouseEvent}
     */
    handleClick(event: MouseEvent) {
        // We need to ensure the event target is an instance of HTMLElement.
        // This is also required for Typescript to accept the element as a HTMLElement,
        // this is correct behaviour as event.target may not necessarily be a HTMLElement
        if (event.target instanceof HTMLElement) {
            const element: HTMLElement = event.target;
            const targetClass: Array<String> = Array.from(element.classList);
            const targetId: String = element.id;

            if (targetClass.length && targetClass.includes(this.logClickClass)) {
                this.logInteraction(element);
            } else if (targetId && targetId === 'js-reset') {
                this.resetClickedButtons();
            }
        }

    },

    /**
     * Log the interaction with the button
     * @param element {HTMLElement}
     */
    logInteraction(element: HTMLElement) {
        this.updateClickedButtons(element.dataset.value);
    },

    /**
     * Pushes a value to the array storing the clicked buttons
     * @param valueToPush {String}
     */
    updateClickedButtons(valueToPush: String) {
        this.clickedButtons.push(valueToPush);
        this.renderClickedButtons();
    },

    /**
     * Empties the array that stores the clicked buttons
     */
    resetClickedButtons() {
        this.clickedButtons = [];
        this.renderClickedButtons();
    },

    /**
     * Renders the array of clicked buttons
     */
    renderClickedButtons() {
        document.getElementById(this.resultsId).innerHTML =
            this.clickedButtons.map((result) => `<li>${result}</li>`).join('');
    }
};

// Initialise the script
clickTracker.init();
