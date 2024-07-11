export const CommandType = {
  SLASH_COMMAND: 1,
};

export const CommandOptionType = {
  STRING: 3,
};

export class Command {
  constructor(name, type, description, options, action) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.options = options;
    this.action = action;
  }

  registration() {
    return {
      name: this.name,
      type: this.type,
      description: this.description,
      options: this.options,
    };
  }
}

export class CommandBuilder {
  constructor() {
    this._name = '';
    this._type = '';
    this._description = '';
    this._options = [];
    this._action = () => {};
  }

  name(name) {
    this._name = name;
    return this;
  }

  /**
   * @param {number} type
   */
  type(type) {
    this._type = type;
    return this;
  }

  /**
   * @param {string} description
   */
  description(description) {
    this._description = description;
    return this;
  }

  /**
   * @param {object} option
   */
  option(option) {
    this._options.push(option);
    return this;
  }

  /**
   * @param {Function} action
   */
  action(action) {
    this._action = action;
    return this;
  }

  build() {
    return new Command(
      this._name,
      this._type,
      this._description,
      this._options,
      this._action
    );
  }
}
