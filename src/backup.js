class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */

    constructor(config) {
        this.states = config.states;
        this.initial = config.initial;
        this.history = [config.initial];
        this.history_iterator = 1;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.states[state]) {
            /*this.prev_history_index++;*/
            /*this.history_index++;*/
            this.initial = state;
        } else {
            throw new Error(e);
        }

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

        let trans = this.states[this.initial].transitions,
            is_exist = false;
        for (let ev in trans) {
            if (ev == event) {
                this.changeState(trans[ev]);
                this.history.push(trans[ev]);
                is_exist = true;
                break;
            }
        }
        if (!is_exist) {
            throw new Error(e);
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        console.log(this.history);
        this.initial = this.history[0];
        this.history = [];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {

        /*console.log(event);*/
        let states = [],
            trans;
        if (event === undefined) {
            for (let state in this.states) {
                states.push(state);
            }
        } else {
            for (let state in this.states) {
                trans = this.states[state].transitions;
                for (let ev in trans) {
                    if (ev == event) {
                        states.push(state);
                    }
                }
            }
        }
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length !== 1 && this.history[this.history.length - 1 - this.history_iterator] !== null) {
            this.changeState(this.history[this.history.length - 1 - this.history_iterator]);
            this.history_iterator++;
            return true;
        } else {
            return false;
        }
        /*        if(this.history_iterator>1&&this.history[this.history.length-this.history_iterator]!==null){
                    this.changeState(this.history[length-this.history_iterator]);
                    this.history_iterator++;
                    return true;
                }else{
                    return false;
                }*/
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.history[this.history.length - this.history_iterator] !== undefined) {
            changeState(this.history[this.history.length - this.history_iterator]);
            this.history_iterator--;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.initial = 'normal';
    }
}

module.exports = FSM;
