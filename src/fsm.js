class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */

     constructor(config) {
/*      let str = JSON.stringify(config);
        str = JSON.stringify(config, null, 4); 
        console.log(str); */
        this.states=config.states;
        this.initial=config.initial;
        this.prev_initial;
        this.next_initial;
        this.undo_iterator=0;
        this.redo_iterator=0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
     getState() {
        return this.initial;
        /*console.log(config["state"]);*/
    }

    /**
     * Goes to specified state.
     * @param state
     */
     changeState(state) {
        /*console.log(this.states[state]);*/
        if(this.states[state]){
            this.prev_initial=this.initial;
            this.initial = state;
        } else{
            throw new Error(e);
        }

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
     trigger(event) {
        
        let trans=this.states[this.initial].transitions,is_exist=false;
        for(let ev in trans){
            if(ev==event){
                this.changeState(trans[ev]);
                is_exist=true;
                this.undo_iterator++;
                break;
            }
        }
        if(!is_exist){
            throw new Error(e);
        }
    }

    /**
     * Resets FSM state to initial.
     */
     reset() {
        this.changeState('normal');
     }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
     getStates(event) {

        /*console.log(event);*/
        let states=[],trans;
        if(event===undefined){
            for(let state in this.states){
                states.push(state);
            }
        }else{
           for(let state in this.states){
                trans=this.states[state].transitions;
                for(let ev in trans){
                    if(ev==event){
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
        if(this.prev_initial===undefined){
            return false;
        }else{
            this.changeState(this.prev_initial);
            if (this.undo_iterator==0) {
                return false;
            }
            
            this.undo_iterator--;
            this.redo_iterator++;
            return true;
        }
     }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
     redo() {
        if (this.prev_initial===undefined||this.redo_iterator==0||this.undo_iterator==1){
            return false;
        }else{
            this.changeState(this.prev_initial);
            this.undo_iterator++;
            this.redo_iterator--;
            return true;
        }
     }

    /**
     * Clears transition history
     */
     clearHistory() {
         this.initial='normal';
         this.undo_iterator=0;
    }
 }

 module.exports = FSM;

