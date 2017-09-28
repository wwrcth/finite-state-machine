class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    if (config === null) {
      throw Error;
    }
    this.config = config;
    this.currState = config.initial;
    this.states = [config.states];
    //???
    this.position = 0;
  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this.currState;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {
    var isExist = Object.keys(this.config.states).some(function(key) {
        return key === state;
    });

    if (isExist) {
        this.states.push(state);
        this.position = this.states.length - 1;
        this.currState = state;
    } else {
        throw Error();
    }
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    var events = this.config.states[this.currState].transitions;
    var isExist = Object.keys(events).some(function(key) {
      return key === event;
    });

    if (isExist) {
      this.states = this.states.slice(0, this.position + 1);
      this.states.push(events[event]);
      this.position = this.states.length - 1;
      this.currState = this.states[this.position];
    } else {
      throw Error();
    }
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.states = [];
    this.states.push(this.config.initial);
    this.position = 0;
    this.currState = this.config.initial;
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    var states = [];

    if (!event) {
      states = Object.keys(this.config.states);
    } else {
      Object.keys(this.config.states).forEach(state => {
        Object.keys(this.config.states[state].transitions).forEach(eventOfState => {
          if (event === eventOfState) {
            states.push(state);
          }
        })
      });
    }

    return states;
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
    var isAvailable = false;

    if (this.position != 0) {
      this.currState = this.states[this.position - 1];
      this.position--;
      isAvailable = true;
    }

    return isAvailable;
  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    var isAvailable = false;

    if (this.position + 1 < this.states.length) {
      this.currState = this.states[this.position + 1];
      this.position++;
      isAvailable = true;
    }

    return isAvailable;
  }

  /**
   * Clears transition history
   */
  clearHistory() {
    this.states = [];
    this.states.push(this.currState);
    this.position = 0;
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
